import time
from django.conf import settings
import jwt
from app.models import User
def decode_token(token):
        try:
            payload = jwt.decode(token, settings.JWT["secret"], algorithms=[settings.JWT["algo"]])

            # Return the decoded payload (user details)
            return payload

        except jwt.ExpiredSignatureError:
            return {"error": "Token has expired"}
        except jwt.InvalidTokenError:
            return {"error": "Invalid token"}

def generate_token(user: User):
    # Set expiration time for the access token (e.g., 15 minutes)
    expiration = time.time() + settings.JWT["exp"]
    print(expiration)
    # Create JWT payload (user details + role)
    payload = {
        'email': user.email,
        'role': user.role,  
        'exp': expiration,
        'iat': time.time(),
    }
    access_token = jwt.encode(payload, settings.JWT["secret"], algorithm='HS256')
    return access_token