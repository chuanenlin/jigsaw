import { AutoChainData } from '../service/autochain.service'

export interface TextResponse {
  text_output: string
}

export interface ImageResponse {
  image_output: string
}

export interface AudioResponse {
  audio_output: string
}

export interface VideoResponse {
  video_output: string
}

export interface A3dResponse {
  '3d_response': string
}

export interface SelectedFile {
  name: string
  content: string
}

export type InputBlockResponse = SelectedFile

export type BlockResponse =
  | TextResponse
  | ImageResponse
  | AudioResponse
  | VideoResponse
  | A3dResponse
  | InputBlockResponse

export interface AutoChainRequest {
  task: string
}

export interface AutoChainResponse {
  autochain_output: AutoChainData
}

export interface BlockSearchRequest {
  task: string
}

export interface BlockSearchResponse {
  list_output: Array<string>
}
