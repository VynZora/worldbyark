from django import forms
from .models import Blog, Testimonial, Category, GalleryImage, ContactMessage, TourPackage, Destination


class BlogForm(forms.ModelForm):
    class Meta:
        model = Blog
        fields = ["image", "title", "description"]


class TestimonialForm(forms.ModelForm):
    class Meta:
        model = Testimonial
        fields = ["name", "image", "review"]


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ["name"]


class GalleryImageForm(forms.ModelForm):
    class Meta:
        model = GalleryImage
        fields = ["category", "title", "image"]


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ["first_name", "last_name", "phone", "email", "message"]


class TourPackageForm(forms.ModelForm):
    class Meta:
        model = TourPackage
        fields = ["name", "description", "main_image", "duration", "price_from", "highlights", "inclusions"]

class DestinationForm(forms.ModelForm):
    class Meta:
        model = Destination
        fields = ["name", "description", "image", "location", "destination_type"]