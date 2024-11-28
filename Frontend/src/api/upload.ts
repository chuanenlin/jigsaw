import { Modality } from '../types'
import { makeApiCall } from './api'
import { UploadEndpoint } from '../constants'
import { AxiosHeaders } from 'axios'
import { SelectedFile } from './types'

interface UploadResponse {
  file_url: string
}

const headers = new AxiosHeaders()
headers.set('accept', 'application/json')
headers.set('Content-Type', 'multipart/form-data')

export const uploadImage = async (formData: FormData): Promise<UploadResponse> =>
  makeApiCall(UploadEndpoint.UploadImage, formData, headers)

export const uploadAudio = async (formData: FormData): Promise<UploadResponse> =>
  makeApiCall(UploadEndpoint.UploadAudio, formData, headers)

export const uploadVideo = async (formData: FormData): Promise<UploadResponse> =>
  makeApiCall(UploadEndpoint.UploadVideo, formData, headers)

export const upload3D = async (formData: FormData): Promise<UploadResponse> =>
  makeApiCall(UploadEndpoint.Upload3D, formData, headers)

export const uploadFile = async (data: SelectedFile, type: Modality) => {
  // Convert DataUrl to Blob to be used in FormData
  const fetchResponse = await fetch(data.content)
  const blob = await fetchResponse.blob()

  const formData = new FormData()

  formData.append('file', blob, data.name)

  if (type === Modality.Image) {
    return uploadImage(formData)
  } else if (type === Modality.Audio) {
    return uploadAudio(formData)
  } else if (type === Modality.Video) {
    return uploadVideo(formData)
  } else if (type === Modality.ThreeDimentional) {
    return upload3D(formData)
  }

  throw new Error(`Unsupported file type: ${type}`)
}
