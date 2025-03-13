ROLE_PATHS = {
        "ADMIN": [
            "/v1/hello",
            "/v1/admin/get_user_list",
            "/v1/admin/get_expenses",
            "/v1/admin/update_expense_status",
            "/v1/admin/delete_expense"
        ],  # Paths only Admin can access
        "USER": [
            "/v1/hello","/v1/user/users",
            "/v1/user/settings",
            "/v1/user/profile",
            "/v1/user/get_user_by_id",
            "/v1/user/get_expenses_by_user",
            "/v1/user/get_user_by_email",
            "/v1/user/submit_expense",
        ],   # Paths only Employee can access
    }
