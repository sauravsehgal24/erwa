import jwt
from django.conf import settings

def decode_token(token):
        try:
            payload = jwt.decode(token, settings.JWT["secret"], algorithms=[settings.JWT["algo"]])

            # Return the decoded payload (user details)
            return payload

        except jwt.ExpiredSignatureError:
            return {"error": "Token has expired"}
        except jwt.InvalidTokenError:
            return {"error": "Invalid token"}