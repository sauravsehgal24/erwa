ROLE_PATHS = {
        "ADMIN": ["/v1/hello","/v1/admin/get_admin_list"],  # Paths only admins can access
        "USER": ["/v1/hello","/v1/user/users", "/v1/user/settings","/v1/user/profile"],   # Paths only users can access
    }
