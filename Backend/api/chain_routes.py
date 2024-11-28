from fastapi import APIRouter
import replicate
import json
import re
from collections import deque
from openai import OpenAI
from config.settings import LOG_SIZE
from models.schemas import (
    SDXLPromptRequest, FooocusPromptRequest, SemanticSearchRequest, AutochainRequest
)

router = APIRouter()

class SDXLGPTdialog:
    def __init__(self, task=""):
        self.task = task
        self.dialogs = deque()
        
    def getDall(self):
        client = OpenAI()
        completion = client.images.generate(
            model="dall-e-3",
            prompt=self.task,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        img_url = completion.data[0].url
        img_prompt = completion.data[0].revised_prompt
        self.dialogs.append({"img_url": img_url, "img_prompt": img_prompt})

    def getlog(self):
        return self.dialogs

SDXLGPT = SDXLGPTdialog()

@router.post("/sdxl_prompt/")
def sdxl_prompt(request: SDXLPromptRequest):
    SDXLGPT.task = request.task
    SDXLGPT.dialogs = deque(request.logs)
    SDXLGPT.getDall()
    logs = SDXLGPT.getlog()

    if logs[0] == "No logs":
        logs.popleft()

    return {"sdxl_prompt": logs[-1]["img_prompt"]} 