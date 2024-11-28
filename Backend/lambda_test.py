import requests
import json
from io import BytesIO
from PIL import Image

def url_to_img(url):
    response = requests.get(url)
    response.raise_for_status()
    image = BytesIO(response.content)
    return image

# img2gray
def img2gray(image_url):
    img2gray_url = "https://q1y4ub70uk.execute-api.us-west-1.amazonaws.com/default/imagecolor2imggray"
    data = {
        'input_image': image1_url
    }

    response = requests.post(img2gray_url, json=data)
    response_data = response.json()
    print(response_data)
    image = url_to_img(response_data['output_image_url'])
    # Image.open(image).save("output.png")
    return image

# img2character
def img2character(image_url):
    img2character_url = "https://q1y4ub70uk.execute-api.us-west-1.amazonaws.com/default/img2character"

    data = {
        'input_image': image_url
    }

    response = requests.post(img2character_url, json=data)
    response_data = response.json()
    # print(response_data['recognized_text'])
    return response_data

# img2box
def img2box(image_url):
    img2box_url = "https://q1y4ub70uk.execute-api.us-west-1.amazonaws.com/default/img2box"
    data = {
        'input_image': image_url
    }

    response = requests.post(img2box_url, json=data)
    response_data = response.json()
    # print(response_data['results'])
    return response_data

# test
image1_url = "https://saveuploadimage.s3.ap-northeast-1.amazonaws.com/upload/deeplab1.png"
image2_url = "https://raw.githubusercontent.com/madmaze/pytesseract/master/tests/data/test.jpg"
image3_url = "https://saveuploadimage.s3.ap-northeast-1.amazonaws.com/upload/deeplab1.png"
image = img2gray(image1_url)
ocr_data = img2character(image2_url)
box_data = img2box(image3_url)