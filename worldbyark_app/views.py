from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models.functions import Lower
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from django.conf import settings
from bs4 import BeautifulSoup

from django.core.mail import send_mail
from django.contrib import messages

from .forms import BlogForm, ContactForm, TestimonialForm, GalleryImageForm, CategoryForm, TourPackageForm, DestinationForm
from .models import Blog, Category, ContactMessage, GalleryImage, Testimonial, TourPackage, Destination, BookingEnquiry

from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json

from django.db.models import Q
from payment.models import PaymentTransaction

# ==========================================
# FRONTEND VIEWS
# ==========================================



def home(request):
    packages = TourPackage.objects.all().order_by("-created_at")[:6]
    testimonials = Testimonial.objects.all()
    destinations = Destination.objects.all().order_by("-created_at")[:8]
    latest_blogs = list(Blog.objects.all().order_by("-created_at")[:6])
    latest_blogs.reverse()

    category_images = []
    categories = Category.objects.all()

    for category in categories:
        image = GalleryImage.objects.filter(
            category=category
        ).order_by("-uploaded_at").first()

        if image:
            category_images.append(image)

    # -----------------------------
    # Payment Result
    # -----------------------------
    payment_result = request.session.pop("payment_result", None)

    return render(request, "frontend/index.html", {
        "packages": packages,
        "testimonials": testimonials,
        "destinations": destinations,
        "latest_blogs": latest_blogs,
        "category_images": category_images,
        "payment_result": payment_result,
    })

def about(request):
    testimonials = Testimonial.objects.all()
    destinations = Destination.objects.all().order_by("-created_at")[:8]
    return render(request, 'frontend/about.html', {
        "testimonials": testimonials,
        "destinations": destinations,
    })


def packages(request):
    packages_qs = TourPackage.objects.all().order_by("-created_at")
    paginator = Paginator(packages_qs, 6)
    page_number = request.GET.get("page")
    packages_page = paginator.get_page(page_number)
    return render(request, 'frontend/packages.html', {"packages": packages_page})


# def package_detail(request, slug):
#     package = get_object_or_404(TourPackage, slug=slug)
#     related_packages = TourPackage.objects.exclude(slug=slug).order_by("-created_at")[:4]
#     return render(request, 'frontend/package-detail.html', {
#         "package": package,
#         "related_packages": related_packages,
#     })

def package_detail(request, slug):
    package = get_object_or_404(TourPackage, slug=slug)
    related_packages = TourPackage.objects.exclude(slug=slug).order_by("-created_at")[:4]

    def extract_list_items(html_content):
        """Parse CKEditor HTML content into a clean list of items.
        Handles real <ul>/<ol><li> lists, one-<p>-per-line output,
        and single <p> blocks separated by <br> tags."""
        if not html_content:
            return []

        soup = BeautifulSoup(html_content, "html.parser")

        # Normalize all <br> tags into newlines everywhere in the document
        for br in soup.find_all("br"):
            br.replace_with("\n")

        items = []

        # Case 1: actual <ul>/<ol> lists
        list_tags = soup.find_all(["ul", "ol"])
        if list_tags:
            for tag in list_tags:
                for li in tag.find_all("li"):
                    for line in li.get_text().split("\n"):
                        line = line.strip()
                        if line:
                            items.append(line)
            if items:
                return items

        # Case 2: <p> tags (possibly containing <br>-separated lines)
        paragraphs = soup.find_all("p")
        if paragraphs:
            for p in paragraphs:
                for line in p.get_text().split("\n"):
                    line = line.strip()
                    if line:
                        items.append(line)
            if items:
                return items

        # Case 3: fallback - raw text separated by line breaks
        text = soup.get_text(separator="\n")
        return [line.strip() for line in text.split("\n") if line.strip()]

    highlights_list = extract_list_items(package.highlights)
    inclusions_list = extract_list_items(package.inclusions)

    return render(request, 'frontend/package-detail.html', {
        "package": package,
        "related_packages": related_packages,
        "highlights_list": highlights_list,
        "inclusions_list": inclusions_list,
    })

# def destinations(request):
#     destinations_qs = Destination.objects.all().order_by("-created_at")
#     paginator = Paginator(destinations_qs, 8)
#     page_number = request.GET.get("page")
#     destinations_page = paginator.get_page(page_number)
#     packages_qs = TourPackage.objects.all().order_by("-created_at")[:8]
#     return render(request, 'frontend/destinations.html', {
#         "destinations": destinations_page,
#         "packages": packages_qs,
#     })


def destinations(request):
    destinations_qs = Destination.objects.all().order_by("-created_at")

    dest_type = request.GET.get("type", "all")
    if dest_type in [Destination.DOMESTIC, Destination.INTERNATIONAL]:
        destinations_qs = destinations_qs.filter(destination_type=dest_type)

    paginator = Paginator(destinations_qs, 8)
    page_number = request.GET.get("page")
    destinations_page = paginator.get_page(page_number)
    packages_qs = TourPackage.objects.all().order_by("-created_at")[:8]

    return render(request, 'frontend/destinations.html', {
        "destinations": destinations_page,
        "packages": packages_qs,
        "active_type": dest_type,
    })



def destination_detail(request, slug):
    destination = get_object_or_404(Destination, slug=slug)
    related_destinations = Destination.objects.exclude(slug=slug).order_by("-created_at")[:6]

    soup = BeautifulSoup(destination.description, "html.parser")
    
    plain_paragraphs = []
    list_items = []
    has_real_lists = False

    for element in soup.children:
        if element.name in ["ul", "ol"]:
            has_real_lists = True
            for li in element.find_all("li"):
                text = li.get_text(strip=True)
                if text:
                    list_items.append(text)
        elif element.name in ["p", "h1", "h2", "h3", "h4", "h5", "h6"]:
            text = element.get_text(strip=True)
            if text:
                plain_paragraphs.append(text)
        elif isinstance(element, str) and element.strip():
            plain_paragraphs.append(element.strip())

    if not has_real_lists:
        list_items = []

    return render(request, 'frontend/destination-detail.html', {
        "destination": destination,
        "related_destinations": related_destinations,
        "plain_paragraphs": plain_paragraphs,
        "list_items": list_items,
        "has_real_lists": has_real_lists,
    })



def blogs(request):
    blogs_qs = Blog.objects.all().order_by("-created_at")
    paginator = Paginator(blogs_qs, 4)
    page_number = request.GET.get("page")
    blogs_page = paginator.get_page(page_number)
    from .models import GalleryImage
    gallery_images = GalleryImage.objects.all()[:6]
    return render(request, 'frontend/blogs.html', {
        "blogs": blogs_page,
        "recent_blogs": Blog.objects.order_by("-created_at")[:3],
        "latest_blogs": Blog.objects.order_by("-created_at")[:6],
        "gallery_images": gallery_images,
    })




def blog_detail(request, slug):
    blog = get_object_or_404(Blog, slug=slug)
    recent_blogs = Blog.objects.exclude(slug=slug).order_by("-created_at")[:4]
    from .models import GalleryImage
    gallery_images = GalleryImage.objects.all()[:6]
    soup = BeautifulSoup(blog.description, "html.parser")
    prev_blog = Blog.objects.filter(created_at__lt=blog.created_at).order_by("-created_at").first()
    next_blog = Blog.objects.filter(created_at__gt=blog.created_at).order_by("created_at").first()


    plain_paragraphs = []
    list_items = []
    has_real_lists = False  # Track if there are actual <ul>/<ol> tags

    for element in soup.children:
        if element.name in ["ul", "ol"]:
            has_real_lists = True
            for li in element.find_all("li"):
                text = li.get_text(strip=True)
                if text:
                    list_items.append(text)
        elif element.name in ["p", "h1", "h2", "h3", "h4", "h5", "h6"]:
            text = element.get_text(strip=True)
            if text:
                plain_paragraphs.append(text)
        elif isinstance(element, str) and element.strip():
            plain_paragraphs.append(element.strip())
    if not has_real_lists:
        list_items = []

    return render(request, 'frontend/blog-detail.html', {
        "blog": blog,
        "recent_blogs": recent_blogs,
        "gallery_images": gallery_images,
        "plain_paragraphs": plain_paragraphs,
        "list_items": list_items,
        "has_real_lists": has_real_lists,
        "prev_blog": prev_blog,
        "next_blog": next_blog,
    })



def gallery(request):
    categories = Category.objects.prefetch_related("images").all()
    destinations = Destination.objects.all().order_by("-created_at")
    
    selected_category = request.GET.get('category', 'all')
    
    if selected_category and selected_category != 'all':
        all_images = GalleryImage.objects.filter(
            category__name=selected_category
        ).order_by("-uploaded_at")
    else:
        all_images = GalleryImage.objects.all().order_by("-uploaded_at")
    
    return render(request, 'frontend/gallery.html', {
        "categories": categories,
        "all_images": all_images,
        "destinations": destinations,
        "selected_category": selected_category,
    })

def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            contact_msg = form.save()
            try:
                send_mail(
                    subject=f"For Enquiry The Package Details from {contact_msg.first_name} {contact_msg.last_name}",
                    message=f"""
Name    : {contact_msg.first_name} {contact_msg.last_name}
Phone   : {contact_msg.phone}
Email   : {contact_msg.email}
Message : {contact_msg.message}
                    """,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.ADMIN_EMAIL],
                    fail_silently=False,
                )
                # Confirmation email to user
                if contact_msg.email:
                    send_mail(
                        subject="We received your message! - World By ARK",
                        message=f"""Hi {contact_msg.first_name},

Thank you for reaching out! We have received your message and will get back to you shortly.

Best regards,
World By ARK Team
+91 81 38 999 007
info@worldbyark.com""",
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[contact_msg.email],
                        fail_silently=True,
                    )
            except Exception as e:
                messages.warning(request, "Message saved but email failed.")
                return redirect("contact")

            messages.success(request, "Your message has been sent. We will get back to you soon!")
            return redirect("contact")
        else:
            messages.error(request, "Please check the form and try again.")
    else:
        form = ContactForm()
    return render(request, 'frontend/contact.html', {"form": form})


def page_not_found(request, exception):
    return render(request, 'frontend/404.html', status=404)


@require_POST
def save_booking_enquiry(request):
    try:
        data = json.loads(request.body)

        name       = data.get('name', '').strip()
        phone      = data.get('phone', '').strip()
        package    = data.get('package', '').strip()
        start_date = data.get('start_date')
        end_date   = data.get('end_date')
        adults     = data.get('adults', 1)
        children   = data.get('children', 0)

        # Basic validation
        if not all([name, phone, start_date, end_date, adults]):
            return JsonResponse({
                'status': 'error',
                'message': 'All required fields must be filled.'
            }, status=400)

        enquiry = BookingEnquiry.objects.create(
            name       = name,
            phone      = phone,
            package    = package,
            start_date = start_date,
            end_date   = end_date,
            adults     = int(adults),
            children   = int(children),
        )

        return JsonResponse({
            'status': 'success',
            'id': enquiry.id
        })

    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=400)



def terms_and_conditions(request):
    return render(
        request,
        "frontend/terms-and-conditions.html"
    )


# ==========================================
# ADMIN AUTH
# ==========================================

def admin_login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        if not username or not password:
            messages.error(request, "Both fields are required.")
            return render(request, "authenticate/login.html")
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            messages.success(request, f"Welcome back, {user.username}!")
            return redirect("admin_dashboard")
        messages.error(request, "Invalid credentials or unauthorized access.")
    return render(request, "authenticate/login.html")


@login_required(login_url="admin_login")
def admin_logout(request):
    logout(request)
    messages.success(request, "You have been logged out.")
    return redirect("admin_login")


# ==========================================
# ADMIN DASHBOARD
# ==========================================

@login_required(login_url="admin_login")
def admin_dashboard(request):
    now = timezone.now()
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    stats = {
        'total_blogs': Blog.objects.count(),
        'blogs_this_month': Blog.objects.filter(created_at__gte=month_start).count(),
        'total_packages': TourPackage.objects.count(),
        'total_destinations': Destination.objects.count(),
        'total_contacts': ContactMessage.objects.count(),
        'total_gallery': GalleryImage.objects.count(),
        'total_enquiries': BookingEnquiry.objects.count(),
    }

    recent_blogs = Blog.objects.all().order_by('-created_at')[:4]
    recent_contacts = ContactMessage.objects.all().order_by('-created_at')[:4]
    recent_packages = TourPackage.objects.all().order_by('-created_at')[:4]
    recent_destinations = Destination.objects.all().order_by('-created_at')[:4]

    month_labels = []
    blogs_counts = []
    contacts_counts = []

    for i in range(5, -1, -1):
        target_month = now - relativedelta(months=i)
        month_labels.append(target_month.strftime('%b'))
        blogs_counts.append(Blog.objects.filter(
            created_at__year=target_month.year,
            created_at__month=target_month.month
        ).count())
        contacts_counts.append(ContactMessage.objects.filter(
            created_at__year=target_month.year,
            created_at__month=target_month.month
        ).count())

    service_labels = []
    service_counts = []
    for category in Category.objects.all()[:6]:
        service_labels.append(category.name)
        service_counts.append(category.images.count())
    if not service_labels:
        service_labels = ['No Data']
        service_counts = [1]

    return render(request, "admin_pages/dashboard.html", {
        'stats': stats,
        'recent_blogs': recent_blogs,
        'recent_contacts': recent_contacts,
        'recent_packages': recent_packages,
        'recent_destinations': recent_destinations,
        'month_labels': month_labels,
        'blogs_counts': blogs_counts,
        'contacts_counts': contacts_counts,
        'service_labels': service_labels,
        'service_counts': service_counts,
    })


# ==========================================
# BLOGS (ADMIN)
# ==========================================

@login_required(login_url="admin_login")
def admin_blog_list(request):
    blogs_qs = Blog.objects.all().order_by("-created_at")
    paginator = Paginator(blogs_qs, 6)
    blogs = paginator.get_page(request.GET.get("page"))
    return render(request, "admin_pages/blog_list.html", {"blogs": blogs})


@login_required(login_url="admin_login")
def blog_create(request):
    form = BlogForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        messages.success(request, "Blog post created!")
        return redirect("admin_blog_list")
    return render(request, "admin_pages/create_blog.html", {"form": form})


@login_required(login_url="admin_login")
def blog_update(request, pk):
    blog = get_object_or_404(Blog, pk=pk)
    form = BlogForm(request.POST or None, request.FILES or None, instance=blog)
    if form.is_valid():
        form.save()
        messages.success(request, "Blog updated!")
        return redirect("admin_blog_list")
    return render(request, "admin_pages/create_blog.html", {"form": form, "blog": blog})


@login_required(login_url="admin_login")
def blog_delete(request, pk):
    blog = get_object_or_404(Blog, pk=pk)
    if request.method == "POST":
        blog.delete()
        messages.success(request, "Blog deleted!")
    return redirect("admin_blog_list")


# ==========================================
# TOUR PACKAGES (ADMIN)
# ==========================================

@login_required(login_url="admin_login")
def admin_package_list(request):
    packages_qs = TourPackage.objects.all().order_by("-created_at")
    packages = Paginator(packages_qs, 10).get_page(request.GET.get("page"))
    return render(request, "admin_pages/package_list.html", {"packages": packages})


@login_required(login_url="admin_login")
def package_create(request):
    form = TourPackageForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        messages.success(request, "Tour Package created successfully!")
        return redirect("admin_package_list")
    return render(request, "admin_pages/create_package.html", {"form": form})


@login_required(login_url="admin_login")
def package_update(request, pk):
    package = get_object_or_404(TourPackage, pk=pk)
    form = TourPackageForm(request.POST or None, request.FILES or None, instance=package)
    if form.is_valid():
        form.save()
        messages.success(request, "Tour Package updated successfully!")
        return redirect("admin_package_list")
    return render(request, "admin_pages/create_package.html", {"form": form, "package": package})


@login_required(login_url="admin_login")
def package_delete(request, pk):
    package = get_object_or_404(TourPackage, pk=pk)
    if request.method == "POST":
        package.delete()
        messages.success(request, "Tour Package deleted successfully!")
    return redirect("admin_package_list")


# ==========================================
# DESTINATIONS (ADMIN)
# ==========================================

@login_required(login_url="admin_login")
def admin_destination_list(request):
    destinations_qs = Destination.objects.all().order_by("-created_at")
    destinations = Paginator(destinations_qs, 10).get_page(request.GET.get("page"))
    return render(request, "admin_pages/destination_list.html", {"destinations": destinations})


@login_required(login_url="admin_login")
def destination_create(request):
    form = DestinationForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        messages.success(request, "Destination created successfully!")
        return redirect("admin_destination_list")
    return render(request, "admin_pages/create_destination.html", {"form": form})


@login_required(login_url="admin_login")
def destination_update(request, pk):
    destination = get_object_or_404(Destination, pk=pk)
    form = DestinationForm(request.POST or None, request.FILES or None, instance=destination)
    if form.is_valid():
        form.save()
        messages.success(request, "Destination updated successfully!")
        return redirect("admin_destination_list")
    return render(request, "admin_pages/create_destination.html", {"form": form, "destination": destination})


@login_required(login_url="admin_login")
def destination_delete(request, pk):
    destination = get_object_or_404(Destination, pk=pk)
    if request.method == "POST":
        destination.delete()
        messages.success(request, "Destination deleted successfully!")
    return redirect("admin_destination_list")


# ==========================================
# transaction (ADMIN)
# ==========================================

@login_required(login_url="admin_login")
def admin_transaction_list(request):
    transactions_qs = PaymentTransaction.objects.all().order_by("-created_at")

    search_query = request.GET.get("q", "").strip()
    if search_query:
        transactions_qs = transactions_qs.filter(
            Q(name__icontains=search_query) |
            Q(email__icontains=search_query) |
            Q(phone__icontains=search_query) |
            Q(package__icontains=search_query) |
            Q(merchant_txn_id__icontains=search_query) |
            Q(gateway_txn_id__icontains=search_query)
        )

    status_filter = request.GET.get("status", "").strip()
    if status_filter:
        transactions_qs = transactions_qs.filter(status__iexact=status_filter)

    transactions = Paginator(transactions_qs, 10).get_page(request.GET.get("page"))
    return render(request, "admin_pages/transaction_list.html", {
        "transactions": transactions,
        "search_query": search_query,
        "status_filter": status_filter,
    })


@login_required(login_url="admin_login")
def transaction_detail(request, pk):
    transaction = get_object_or_404(PaymentTransaction, pk=pk)
    return render(request, "admin_pages/transaction_detail.html", {"transaction": transaction})


@login_required(login_url="admin_login")
def transaction_delete(request, pk):
    transaction = get_object_or_404(PaymentTransaction, pk=pk)
    if request.method == "POST":
        transaction.delete()
        messages.success(request, "Transaction deleted successfully!")
    return redirect("admin_transaction_list")
# ==========================================
# GALLERY (ADMIN)
# ==========================================

@login_required(login_url="admin_login")
def gallery_images(request):
    categories = Category.objects.all().prefetch_related("images")
    category_pages = {}
    for category in categories:
        images_qs = category.images.all().order_by("-uploaded_at")
        paginator = Paginator(images_qs, 8)
        page_number = request.GET.get(f"page_{category.id}", 1)
        try:
            page_obj = paginator.page(page_number)
        except PageNotAnInteger:
            page_obj = paginator.page(1)
        except EmptyPage:
            page_obj = paginator.page(paginator.num_pages)
        category_pages[category.id] = page_obj

    return render(
        request, "admin_pages/image_list.html",
        {"categories": categories, "category_pages": category_pages},
    )


@login_required(login_url="admin_login")
def add_image(request):
    categories = Category.objects.all()
    if request.method == "POST":
        category_id = request.POST.get("category")
        category = Category.objects.get(id=category_id)
        files = request.FILES.getlist("images")
        for file in files:
            GalleryImage.objects.create(
                category=category,
                title=file.name,
                image=file,
            )
        messages.success(request, "Images uploaded successfully!")
        return redirect("list_image")

    return render(request, "admin_pages/add_image.html", {"categories": categories})


@login_required(login_url="admin_login")
def delete_image(request, image_id):
    image = get_object_or_404(GalleryImage, id=image_id)
    if request.method == "POST":
        image.delete()
        messages.success(request, "Image deleted successfully!")
    return redirect("list_image")


# ==========================================
# CATEGORIES (ADMIN)
# ==========================================

@login_required(login_url="admin_login")
def category_list(request):
    categories = Category.objects.all().order_by(Lower("name"))
    return render(request, "admin_pages/category_list.html", {"categories": categories})


@login_required(login_url="admin_login")
def add_category(request):
    form = CategoryForm(request.POST or None)
    if form.is_valid():
        form.save()
        messages.success(request, "Category added!")
        return redirect("category_list")
    return render(request, "admin_pages/add_category.html", {"form": form})


@login_required(login_url="admin_login")
def update_category(request, pk):
    category = get_object_or_404(Category, pk=pk)
    form = CategoryForm(request.POST or None, instance=category)
    if form.is_valid():
        form.save()
        messages.success(request, "Category updated!")
        return redirect("category_list")
    return render(request, "admin_pages/add_category.html", {"form": form, "category": category})


@login_required(login_url="admin_login")
def delete_category(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if request.method == "POST":
        category.delete()
        messages.success(request, "Category deleted!")
    return redirect("category_list")


# ==========================================
# TESTIMONIALS (ADMIN)
# ==========================================

@login_required(login_url="admin_login")
def testimonial_list(request):
    testimonials = Paginator(Testimonial.objects.all().order_by("-created_at"), 10).get_page(request.GET.get("page"))
    return render(request, "admin_pages/review_list.html", {"testimonials": testimonials})


@login_required(login_url="admin_login")
def testimonial_create(request):
    form = TestimonialForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        messages.success(request, "Testimonial added!")
        return redirect("review_list")
    return render(request, "admin_pages/create_review.html", {"form": form})


@login_required(login_url="admin_login")
def testimonial_update(request, pk):
    testimonial = get_object_or_404(Testimonial, pk=pk)
    form = TestimonialForm(request.POST or None, request.FILES or None, instance=testimonial)
    if form.is_valid():
        form.save()
        messages.success(request, "Testimonial updated!")
        return redirect("review_list")
    return render(request, "admin_pages/create_review.html", {"form": form, "testimonial": testimonial})


@login_required(login_url="admin_login")
def testimonial_delete(request, pk):
    testimonial = get_object_or_404(Testimonial, pk=pk)
    if request.method == "POST":
        testimonial.delete()
        messages.success(request, "Testimonial deleted!")
    return redirect("review_list")


# ==========================================
# CONTACTS (ADMIN)
# ==========================================

@login_required(login_url="admin_login")
def view_contacts(request):
    contacts = Paginator(ContactMessage.objects.all().order_by("-created_at"), 10).get_page(request.GET.get("page"))
    return render(request, "admin_pages/view_contacts.html", {"contacts": contacts})


@login_required(login_url="admin_login")
def delete_contact(request, pk):
    contact = get_object_or_404(ContactMessage, pk=pk)
    if request.method == "POST":
        contact.delete()
        messages.success(request, "Contact deleted!")
    return redirect("view_contacts")

# ==========================================
# booking enquiry (ADMIN)
# ==========================================


@login_required(login_url="admin_login")
def admin_enquiry_list(request):
    enquiries = Paginator(
        BookingEnquiry.objects.all().order_by("-created_at"), 10
    ).get_page(request.GET.get("page"))
    return render(request, "admin_pages/enquiry_list.html", {"enquiries": enquiries})


@login_required(login_url="admin_login")
def admin_enquiry_delete(request, pk):
    enquiry = get_object_or_404(BookingEnquiry, pk=pk)
    if request.method == "POST":
        enquiry.delete()
        messages.success(request, "Enquiry deleted successfully!")
    return redirect("admin_enquiry_list")