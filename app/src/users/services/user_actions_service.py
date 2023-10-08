# from app.src.tourism.logic.tourism_logic import create_tourism_item
# from app.src.users.constants import ACTIONS
# from app.src.users.services.users_service import get_user_by_username, update_user


# def make_an_action(username, action_name, action_data):
#     user = get_user_by_username(username)
#     if action_name in ACTIONS:
#         if action_name == "request":
#             action_data["is_active"] = False
#             action_data["created_by"] = {
#                 "type": "user",
#                 "id": user["id"],
#                 "username": user["username"],
#             }
#             create_tourism_item(action_data)
#             return user

#         user[action_name + "d"].append(action_data)
#         user["activity_log"].append(action_data)
#         return update_user(user)
#     return "Action not allowed"
