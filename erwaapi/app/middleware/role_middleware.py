from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from .role_access_paths import ROLE_PATHS

class RoleMiddleware(MiddlewareMixin):
    EXCLUDED_PATHS = ["/v1/user/login","/v1/user/register","/v1/ocr/health"]
    def process_view(self, request, view_func, view_args, view_kwargs):
        print("in role")
        if request.path in self.EXCLUDED_PATHS:
            return  # Skip authentication for login
        if not hasattr(request, "role"):  # Ensure AuthMiddleware ran first
            return JsonResponse({"error": "Authentication Required"}, status=401)

        user_role = request.role
        _paths = ROLE_PATHS.get(user_role,[])
        if(len(_paths) == 0 or request.path not in _paths):
            return JsonResponse({"error": "Unauthorized"}, status=403)