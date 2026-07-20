from __future__ import annotations
from typing import Any
from django.conf import settings
from .models import TourPackage
from .models import Destination


def google_reviews(request) -> dict[str, Any]:
    rating = getattr(settings, "GOOGLE_REVIEW_RATING", 0.0)
    count = getattr(settings, "GOOGLE_REVIEW_COUNT", 0)
    url = getattr(settings, "GOOGLE_REVIEW_URL", "")
    return {
        "google_review_rating": rating,
        "google_review_count": count,
        "google_review_url": url,
    }


def footer_packages(request) -> dict[str, Any]:
    packages = TourPackage.objects.only("name", "slug").order_by("-created_at")[:5]
    return {"footer_packages": packages}


def nav_destinations(request) -> dict[str, Any]:
    destinations = Destination.objects.only("name", "slug").order_by("name")
    return {"nav_destinations": destinations}

def footer_destinations(request):
    destinations = Destination.objects.all().order_by("-created_at")[:4]
    return {
        "footer_destinations": destinations,
    }

def package_types(request) -> dict[str, Any]:
    return {"package_types": TourPackage.PACKAGE_TYPE_CHOICES}

def nav_packages(request) -> dict[str, Any]:
    packages = TourPackage.objects.only("name", "slug", "package_type").order_by("name")
    return {"nav_packages": packages}