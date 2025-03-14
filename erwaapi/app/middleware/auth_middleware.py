from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from app.util import auth_util
class AuthMiddleware(MiddlewareMixin):
    EXCLUDED_PATHS = ["/v1/user/login","/v1/user/register"]
    
    def process_view(self, request, view_func, view_args, view_kwargs):
        print("in auth")
        if request.path in self.EXCLUDED_PATHS:
            return 
        auth_header = request.headers.get("Authorization")

        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            try:
                decoded_token = auth_util.decode_token(token)
                if(decoded_token.get("error", "") != ""):
                    raise Exception(decoded_token["error"])
                request.role = decoded_token["role"]  # Attach role to request
                request.email = decoded_token["email"]
                request.userId = decoded_token["userId"]
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=401)
        else:   
            return JsonResponse({"error": "Token Required"}, status=401)
