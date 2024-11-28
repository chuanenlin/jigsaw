from pydantic import BaseModel
from typing import List, Optional

# Text Models
class GPTRequest(BaseModel):
    task: str = ""
    task_detail: str = ""
    mode: str = "Custom"
    prompt: str = ""
    model: str = "gpt-4"
    max_length: int = 20
    temperature: float = 0.5

class SDXLRequest(BaseModel):
    prompt: str = "a chair that looks like an avocado, photorealistic, 8k"
    num_inference_steps: int = 50
    guidance_scale: float = 7.5
    width: int = 1024
    height: int = 1024
    seed: int = 1234

class AnimateDiffRequest(BaseModel):
    prompt: str = "a teddy bear dancing in times square"
    guidance_scale: float = 7.5
    steps: int = 10
    seed: int = 1

class ShapeERequest(BaseModel):
    prompt: str = "a toy car"
    guidance_scale: float = 15

class AudiogenRequest(BaseModel):
    prompt: str = "footsteps in a city"
    duration: int = 5
    guidance: int = 3

class MusicGenRequest(BaseModel):
    prompt: str = "an upbeat, melodic edm"
    model_version: str = "large"
    duration: int = 5
    seed: int = 0

class BarkRequest(BaseModel):
    prompt: str = "the octopus and oliver went to the opera in october"

# Image Models
class BLIPRequest(BaseModel):
    image: str = "image/cafe.jpg"

class RAMGroundedSAM(BaseModel):
    image: str = "image/cafe.jpg"

class StableVideoDiffusion(BaseModel):
    image: str = "image/cafe.jpg"
    guidance_scale: float = 15

class RealESRGANRequest(BaseModel):
    image: str = "image/dog.jpg"
    scale: float = 4
    face_enhance: bool = False

class GFPGANRequest(BaseModel):
    image: str = "image/dog.jpg"
    version: str = "v1.4"
    scale: float = 1

class BigColorRequest(BaseModel):
    image: str = "image/vintage.jpg"

class GrayscaleRequest(BaseModel):
    image: str = "Desktop/jigsaw-backend/image/cafe.jpg"

class PyTesseractRequest(BaseModel):
    image: str = "image/receipt.jpg"

class RembgRequest(BaseModel):
    image: str = "image/dog.jpg"

class PeopleRemoval(BaseModel):
    image: str = "image/cafe.jpg"

class YOLOXRequest(BaseModel):
    image: str = "Desktop/jigsaw-backend/image/cafe.jpg"

class DeticRequest(BaseModel):
    image: str = "image/cafe.jpg"

class ImageMiscRequest(BaseModel):
    image: str = "image/breakdance.jpg"

class ShapeEImgRequest(BaseModel):
    image: str = "image/dog.jpg"
    guidance_scale: float = 15

class RMNRequest(BaseModel):
    image: str = "image/eminem.jpg"

class StyleCLIPRequest(BaseModel):
    image: str = "image/eminem.jpg"
    prompt: str = "a happy face"
    manipulation_strength: float = 4.1

class SadTalkerRequest(BaseModel):
    source_image: str = "image/eminem.jpg"
    driven_audio: str = "audio/speech-short.wav"

# Video Models
class XCLIPRequest(BaseModel):
    video: str = "video/bicycle.mp4"

class RealBasicVSRRequest(BaseModel):
    video: str = "video/bicycle.mp4"

class RIFERequest(BaseModel):
    video: str = "video/bicycle.mp4"
    interpolation_factor: int = 2

class RobustVideoMattingRequest(BaseModel):
    video: str = "video/bicycle.mp4"

# Audio Models
class MusicClassificationRequest(BaseModel):
    audio: str = "audio/edm.wav"

class WhisperSubtitlesRequest(BaseModel):
    audio: str = "audio/houston.mp3"
    model: str = "large-v2"
    transcription: str = "text"
    translate: bool = False
    language: str = "en"

class FreeVCRequest(BaseModel):
    source_audio: str = "audio/speech-short.wav"
    reference_audio: str = "audio/bieber.wav"
    model_type: str = "FreeVC"

# Multimodal Models
class InstructPix2PixRequest(BaseModel):
    image: str = "image/dog.jpg"
    prompt: str = "corgi"
    num_inference_steps: int = 100
    guidance_scale: float = 7.5
    seed: int = 0

class ControlNetPoseRequest(BaseModel):
    image: str = "image/dog.jpg"
    prompt: str = "corgi, photorealistic, 4k"
    seed: int = 0

class ControlNetSegRequest(BaseModel):
    image: str = "image/dog.jpg"
    prompt: str = "corgi, photorealistic, 4k"
    seed: int = 0

class ControlNetDepthRequest(BaseModel):
    image: str = "image/dog.jpg"
    prompt: str = "corgi, photorealistic, 4k"
    seed: int = 0

class ControlNetNormalRequest(BaseModel):
    image: str = "image/dog.jpg"
    prompt: str = "corgi, photorealistic, 4k"
    seed: int = 0

class ControlNetEdgeRequest(BaseModel):
    image: str = "image/dog.jpg"
    prompt: str = "corgi, photorealistic, 4k"
    seed: int = 0

class ControlNetSketchRequest(BaseModel):
    image: str = "image/sketch.jpg"
    prompt: str = "a futuristic toyota, flat design"
    seed: int = 0

class ScribbleStoriesRequest(BaseModel):
    image: str = "image/sketch.jpg"
    prompt: str = "a futuristic toyota, flat design"
    num_inference_steps: int = 20
    guidance_scale: float = 7.5
    seed: int = 0

# Chain Models
class SDXLPromptRequest(BaseModel):
    task: str = "Today is raining all day. Can you please give me a image of a pretty sunset?"
    logs: List[str] = ["No logs"]

class FooocusPromptRequest(BaseModel):
    prompt: str = "forest elf"
    negative_prompt: str = ""
    style_selections: str = "Fooocus V2,Default (Slightly Cinematic)"
    performance_selection: str = "Speed"
    guidance_scale: float = 7.5
    image_number: int = 1

class SemanticSearchRequest(BaseModel):
    task: str = "Please give me a function that can generate a picture from text."

class AutochainRequest(BaseModel):
    task: str = "turn an image into immersive sounds"
    logs: List[str] = [""] 