import { Modality } from '../../../../types'

export const uploadFileSchema = (title: string, type: Modality) => ({
  type: 'object',
  title,
  properties: {
    content: {
      title: 'content',
      type: 'string',
    },
    fileName: {
      title: 'File Name',
      type: 'string',
    },
    type: {
      title: 'Type',
      type: 'string',
      default: type,
    },
  },
  required: [],
  uniforms: {
    componentName: 'file_upload',
    help: 'Some explanation of what this parameter actually does',
  },
})
