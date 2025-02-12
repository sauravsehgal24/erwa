from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from .role_access_paths import ROLE_PATHS

# from django.urls import get_resolver, URLPattern, URLResolver

# def get_all_urls(urlpatterns, prefix=""):
#     urls = []
#     for pattern in urlpatterns:
#         if isinstance(pattern, URLPattern):  # Regular path
#             urls.append(prefix + str(pattern.pattern))
#         elif isinstance(pattern, URLResolver):  # Included path
#             urls.extend(get_all_urls(pattern.url_patterns, prefix + str(pattern.pattern)))
#     return urls

# def list_all_urls():
#     return get_all_urls(get_resolver().url_patterns)





class RoleMiddleware(MiddlewareMixin):
    EXCLUDED_PATHS = ["/v1/user/login","/v1/user/register"]
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