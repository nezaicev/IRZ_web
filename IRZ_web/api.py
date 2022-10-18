from ninja import NinjaAPI
from my_stack_exchange.api import router as my_stack_exchange_router

api = NinjaAPI()

api.add_router("/my_stack_exchange/", my_stack_exchange_router)