from datetime import datetime
from typing import Union, List

from ninja import Router, Schema, NinjaAPI
from pydantic import Field, validator

from IRZ_web.services.external_api_service import ExternalApiService
from my_stack_exchange.models import Question

router = Router()
api = NinjaAPI()


class Author(Schema):
    display_name: str


class QuestionIn(Schema):
    creation_date: datetime
    title: str
    author: Union[str, dict] = Field(alias='owner')
    answered: bool = Field(alias='is_answered')
    link: str

    class Config:
        allow_population_by_field_name = True

    @validator('author')
    def get_author_name_from_dict(cls, v: dict) -> str:
        if not v.get('display_name'):
            raise ValueError('not dict or not key "display_name"')
        return v['display_name']


class QuestionOut(Schema):
    creation_date: datetime
    title: str
    author: str
    answered: bool
    link: str


class Response(Schema):
    items: List[QuestionIn]


class Params(Schema):
    page: int = 1
    fromdate: int = None
    todate: int = None
    order: str = 'desc'
    sort: str = 'activity'
    tagged: str = ''
    site: str = 'stackoverflow'


my_stack_exchange = ExternalApiService(
    url='https://api.stackexchange.com/2.3/search',
    model=Question,
)


@router.get('', response=List[QuestionOut])
def get_operation(request) -> List[dict]:
    return my_stack_exchange.get_all_records_from_db()


@router.delete('')
def delete_operation(request) -> dict:
    return my_stack_exchange.delete_all_records_from_db()


@router.post('')
def post_operation(request, data: Params) -> List:
    result = my_stack_exchange.extract_data_from_external_api(data)
    records = Response.parse_raw(result).items
    my_stack_exchange.save_records_to_db(records)
    return my_stack_exchange.get_all_records_from_db()
