// This is needed for AutChain. Because the backend uses the endpoint name as the block type.
// TODO: Maybe we can ask the backend to change this.

import { ReadType } from 'use-file-picker'
import { BlockMeta, Modality } from '../types'

export enum Endpoint {
  Text2Text = 'text2text',
  Text2Img = 'text2img',
  Text2Speech = 'text2speech',
  Text2Video = 'text2video',
  Text23D = 'text23d',
  Text2Audio = 'text2audio',
  Text2Music = 'text2music',
  TextAndPose2Image = 'textandpose2img',
  TextAndSeg2Image = 'textandseg2img',
  TextAndDepth2Image = 'textanddepth2img',
  TextAndNormal2Image = 'textandnormal2img',
  TextAndEdge2Image = 'textandedge2img',
  TextAndSketch2Image = 'textandsketch2img',
  TextAndSketch2Art = 'textandsketch2art',
  Image2Character = 'img2character',
  Image2Tags = 'img2tags',
  Image2Text = 'img2text',
  Image2SuperImage = 'img2superimg',
  Image2NoPeopleImage = 'img2nopeopleimg',
  Image2Pose = 'img2pose',
  Image2Depth = 'img2depth',
  Image2Normal = 'img2normal',
  Image2Edge = 'img2edge',
  Image2Seg = 'img2seg',
  Image23d = 'img23d',
  Image2GoodFaceImage = 'img2goodfaceimg',
  ImageGray2ImageColor = 'imggray2imgcolor',
  ImageColor2ImageGray = 'imgcolor2imggray',
  Image2Cutout = 'img2cutout',
  Image2Box = 'img2box',
  Image2Video = 'img2video',
  ImageAndText2Image = 'imgandtext2img',
  Music2Text = 'music2text',
  Speech2Text = 'speech2text',
  Video2Text = 'video2text',
  Video2SuperVideo = 'video2supervideo',
  Video2SmoothVideo = 'video2smoothvideo',
  Video2Cutout = 'video2cutout',
  SpeechSpeech2Speech = 'speech_speech2speech',
  Face2TalkingHead = 'face2talkinghead',
}

// Separate enum for upload endpoints because they are not part of the autochain response
// We would have to do extra checks in the places using Endpoint to check if it's an upload endpoint
export enum UploadEndpoint {
  UploadImage = 'upload_image',
  UploadVideo = 'upload_video',
  UploadAudio = 'upload_audio',
  Upload3D = 'upload_3d',
}

export const EndpointToBlockType: Record<string, string> = {
  [Endpoint.Text2Text]: 'Text to text',
  [Endpoint.Text2Img]: 'Text to image',
  [Endpoint.Text2Video]: 'Text to video',
  [Endpoint.Text23D]: 'Text to 3D',
  [Endpoint.Text2Audio]: 'Text to audio',
  [Endpoint.Text2Music]: 'Text to music',
  [Endpoint.Image2Text]: 'Image to text',
  [Endpoint.Image2SuperImage]: 'Image to super image',
  [Endpoint.Image2GoodFaceImage]: 'Image to good face',
  [Endpoint.ImageGray2ImageColor]: 'Image Gray to Image Color',
  [Endpoint.Image2Cutout]: 'Image to cutout',
  [Endpoint.Image2Box]: 'Image to box',
  [Endpoint.Image2Video]: 'Image to video',
  [Endpoint.Music2Text]: 'Music to text',
  [Endpoint.Speech2Text]: 'Speech to text',
}

export const ModalityToInputType = {
  [Modality.Text]: ['Text'],
  [Modality.Image]: ['.jpg', '.png'],
  [Modality.Audio]: ['.wav', '.mp3'],
  [Modality.Video]: ['.mp4'],
  [Modality.ThreeDimentional]: ['.obj'],
  // TODO: find out what is the correct type for the following
  [Modality.Custom]: ['custom/*'],
  [Modality.Sketch]: ['sketch/*'],
}

export const ModalityToDataReadType: Record<Modality, ReadType> = {
  [Modality.Text]: 'Text',
  [Modality.Image]: 'DataURL',
  [Modality.Audio]: 'DataURL',
  [Modality.Video]: 'DataURL',
  [Modality.ThreeDimentional]: 'DataURL',
  [Modality.Custom]: 'DataURL',
  [Modality.Sketch]: 'DataURL',
}

export const DummyBlockMeta: BlockMeta = {
  description: 'Generates a short caption for an image.',
  exampleInput: {
    [Modality.Audio]: 'https://download.samplelib.com/mp3/sample-9s.mp3',
    [Modality.Video]:
      'https://www.shutterstock.com/shutterstock/videos/1057665724/preview/stock-footage-a-seconds-countdown-introduction-with-beautiful-slick-graphics.mp4',
  },
  exampleOutput: 'A living room filled with furniture and a clock on the wall',
  properties: {
    maxRuntime: '1s',
  },
}
