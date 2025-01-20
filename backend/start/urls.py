from django.urls import path
from .views import signup, login, check_email, add_product

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('check-email/', check_email, name='check-email'),
    path('add-product/', add_product, name='add_product'),  # This is correct
]
