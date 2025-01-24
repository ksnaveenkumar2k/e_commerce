from django.urls import path
from .views import signup, login, check_email, add_product,get_products,get_user_profile

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('check-email/', check_email, name='check-email'),
    path('add-product/', add_product, name='add_product'),  # This is correct
    path('products/', get_products, name='get_products'),
    path('/user-profile/',get_user_profile, name='get_user_profile'),
]
