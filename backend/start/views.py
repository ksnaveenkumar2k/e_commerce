from django.shortcuts import render
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pymongo import MongoClient
from bson.objectid import ObjectId
from django.contrib.auth.models import User

# MongoDB connection
client = MongoClient("mongodb+srv://naveensanthosh1213:KSN%40123@admin.hutoj.mongodb.net/")
db = client['admin_upload']
users_collection = db['users']
products_collection = db['products']

@api_view(['POST'])
def signup(request):
    data = request.data
    data['password'] = make_password(data['password'])

    # Set role to "user" by default if not provided
    data['role'] = data.get('role', 'user')

    if users_collection.find_one({"email": data['email']}):
        return Response({'detail': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user_id = users_collection.insert_one(data).inserted_id
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    user['_id'] = str(user['_id'])
    return Response(user, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    data = request.data
    user = users_collection.find_one({"email": data['email']})

    if user and check_password(data['password'], user['password']):
        user['_id'] = str(user['_id'])
        return Response({'_id': user['_id'], 'email': user['email'], 'role': user['role']}, status=status.HTTP_200_OK)

    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def check_email(request):
    email = request.query_params.get('email')

    # Check if the email already exists in the MongoDB collection
    if users_collection.find_one({"email": email}):
        return Response({"exists": True}, status=status.HTTP_200_OK)
    return Response({"exists": False}, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_product(request):
    """
    Endpoint to add a new product with image upload.
    """
    data = request.data

    # Validate required fields
    required_fields = ['product_name', 'product_price', 'discount', 'description']
    for field in required_fields:
        if field not in data or not data[field]:
            return Response(
                {"detail": f"{field} is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

    # Handle file upload
    product_image = request.FILES.get('product_image')
    if not product_image:
        return Response({"detail": "Product image is required."}, status=status.HTTP_400_BAD_REQUEST)

    # Save the file to the media directory
    file_path = default_storage.save(
        f'product_images/{product_image.name}',
        ContentFile(product_image.read())
    )

    # Build the file URL (if using local storage)
    file_url = request.build_absolute_uri(default_storage.url(file_path))

    # Prepare product data
    product_data = {
        "product_name": data['product_name'],
        "product_image": file_url,  # Store the URL of the uploaded image
        "product_price": data['product_price'],
        "discount": data['discount'],
        "description": data['description']
    }

    # Insert product into the MongoDB database
    product_id = products_collection.insert_one(product_data).inserted_id
    product = products_collection.find_one({"_id": ObjectId(product_id)})
    product['_id'] = str(product['_id'])  # Convert ObjectId to string for JSON response

    return Response(product, status=status.HTTP_201_CREATED)