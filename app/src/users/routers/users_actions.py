# from app.src.tourism.schemas.tourism import TourismItem
# from app.src.users.repository import user_actions_repo
# from fastapi import APIRouter, HTTPException, status

# router = APIRouter(
#     prefix="/users/action",
#     tags=["Users"],
# )


# @router.post("/request")
# async def create_user_request(username: str, request: TourismItem) -> dict:
#     """Create user request"""
#     try:
#         return user_actions_repo.create_user_request(username, request)
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
#         )
