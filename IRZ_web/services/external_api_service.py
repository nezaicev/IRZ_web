from typing import List, Any

import requests
from ninja import Schema


class ExternalApiService:

    def __init__(self, url: str, model: Any):
        self.api_url = url
        self.model = model

    def _validation_of_data_scheme(self, scheme: Schema):
        pass

    def extract_data_from_external_api(self, params:Any) -> bytes:
        try:
            result = requests.api.get(self.api_url, params)
            result.raise_for_status()
            return result.content
        except requests.exceptions.HTTPError as e:
            print(e.response.text)

    def delete_all_records_from_db(self) -> dict:
        r = self.model.objects.all().delete()
        return {"result": "deleted {} records".format(r[0])}

    def get_all_records_from_db(self) -> List[dict]:
        return list(self.model.objects.all().values())

    def save_records_to_db(self, records: List):
        self.model.objects.bulk_create(
            [self.model(**r.dict()) for r in records])


