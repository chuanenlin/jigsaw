import string
import random
import validators
import requests
from io import BytesIO
from config.settings import S3_BUCKET_NAME

def random_name(length: int = 42) -> str:
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def is_url(string: str) -> bool:
    return bool(validators.url(string))

def url_to_img(url: str) -> BytesIO:
    response = requests.get(url)
    response.raise_for_status()
    return BytesIO(response.content) 