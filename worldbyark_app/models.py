from django.db import models
from django.utils.text import slugify


class OptimizedImageModel(models.Model):
    image_fields = []

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        for field in self.image_fields:
            image_field = getattr(self, field, None)
            if image_field and hasattr(image_field, "path"):
                try:
                    from .utils.image_optimizer import optimize_image
                    optimize_image(image_field.path)
                except Exception:
                    pass


class TourPackage(OptimizedImageModel):
    image_fields = ["main_image"]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    main_image = models.ImageField(upload_to="packages/")
    duration = models.CharField(max_length=100, blank=True, help_text="e.g. 7 Days / 6 Nights")
    price_from = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    highlights = models.TextField(blank=True, help_text="Key highlights, one per line")
    inclusions = models.TextField(blank=True, help_text="What is included, one per line")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Tour Packages"

    def __str__(self):
        return self.name

    @property
    def highlights_list(self):
        return [h.strip() for h in self.highlights.splitlines() if h.strip()]

    @property
    def inclusions_list(self):
        return [i.strip() for i in self.inclusions.splitlines() if i.strip()]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while TourPackage.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


# class Destination(OptimizedImageModel):
#     image_fields = ["image"]

#     name = models.CharField(max_length=200)
#     slug = models.SlugField(unique=True, blank=True)
#     description = models.TextField()
#     image = models.ImageField(upload_to="destinations/")
#     location = models.CharField(max_length=200, blank=True, help_text="Country or region")
#     created_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         ordering = ["-created_at"]
#         verbose_name_plural = "Destinations"

#     def __str__(self):
#         return self.name

#     def save(self, *args, **kwargs):
#         if not self.slug:
#             base_slug = slugify(self.name)
#             slug = base_slug
#             counter = 1
#             while Destination.objects.filter(slug=slug).exists():
#                 slug = f"{base_slug}-{counter}"
#                 counter += 1
#             self.slug = slug
#         super().save(*args, **kwargs)


class Destination(OptimizedImageModel):
    image_fields = ["image"]

    # Destination Type Choices
    DOMESTIC = "domestic"
    INTERNATIONAL = "international"

    DESTINATION_TYPE_CHOICES = [
        (DOMESTIC, "Domestic"),
        (INTERNATIONAL, "International"),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to="destinations/")
    location = models.CharField(
        max_length=200,
        blank=True,
        help_text="Country or region"
    )

    # New Field
    destination_type = models.CharField(
        max_length=20,
        choices=DESTINATION_TYPE_CHOICES,
        default=DOMESTIC,
        help_text="Select destination type"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Destinations"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Destination.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class GalleryImage(OptimizedImageModel):
    image_fields = ["image"]

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="images")
    title = models.CharField(max_length=150, blank=True, null=True)
    image = models.ImageField(upload_to="gallery/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title if self.title else f"Image {self.id}"


class Blog(OptimizedImageModel):
    image_fields = ["image"]

    image = models.ImageField(upload_to="blogs/")
    slug = models.SlugField(unique=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Blog.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class Testimonial(OptimizedImageModel):
    image_fields = ["image"]

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.phone}"


class BookingEnquiry(models.Model):
    name        = models.CharField(max_length=150)
    phone       = models.CharField(max_length=20)
    package     = models.CharField(max_length=200, blank=True, null=True)
    start_date  = models.DateField()
    end_date    = models.DateField()
    adults      = models.PositiveIntegerField()
    children    = models.PositiveIntegerField(default=0)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Booking Enquiries"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.package} ({self.created_at.date()})"