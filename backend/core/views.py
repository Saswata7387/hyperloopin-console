from rest_framework import generics, permissions
from .models import User, Attendance
from .serializers import UserSerializer, AttendanceSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import PermissionDenied 

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserSerializer

class AttendanceListCreateView(generics.ListCreateAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'admin':
            return Attendance.objects.all()
        return Attendance.objects.filter(user=user)

    def perform_create(self, serializer):
        if self.request.user.user_type != 'admin':
            raise PermissionDenied("Only admin can mark attendance.")
        serializer.save()