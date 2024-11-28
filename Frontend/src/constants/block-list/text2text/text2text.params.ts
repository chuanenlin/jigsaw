import { JSONSchemaType } from 'ajv'
import { BlockParameters, Modality } from '../../../types'

export interface Text2TextParams {
  mode: string
  task: string
  task_detail: string
  prompt: string
  model: string
  maxLength: number
  temperature: number
}

export const text2TextParams: BlockParameters = {
  model: {},
  schema: {
    type: 'object',
    properties: {
      mode: {
        type: 'string',
        title: 'Mode',
        enum: ['Translation', 'Ideation', 'Custom'],
        default: 'Translation',
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      task: {
        type: 'string',
        title: 'Task',
        enum: [
          'Write your task',
          'Fix grammar and spelling',
          'Identify emotion',
          'Improve writing',
          'Remove duplicates',
          'Summarize',
          'Elaborate',
          'Rephrase to active voice',
          'Rephrase to passive voice',
          'Simple english',
          'Suggest title',
          'Turn into image generation prompt',
          'Turn into video generation prompt',
          'Turn into 3D generation prompt',
          'Turn into sound effects generation prompt',
          'Turn into music generation prompt',
          'Turn into haiku',
          'Turn into lyrics',
          'Turn into poem',
          'Turn into speech',
          'Yes or no',
        ],
        default: 'Write your task',
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
          dependenciesToBeVisible: [
            {
              // a hack to hide this field for now
              field: 'impossible',
              value: '',
            },
          ],
        },
      },
      // eslint-disable-next-line camelcase
      task_detail: {
        type: 'string',
        title: 'Custom Task',
        default: '',
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
          dependenciesToBeVisible: [
            {
              field: 'task',
              value: 'Write your task',
            },
          ],
        },
      },
      model: {
        type: 'string',
        title: 'Model',
        default: 'gpt-4',
        enum: ['gpt-4', 'gpt-4 turbo', 'gpt-3.5-turbo'],
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      maxLength: {
        type: 'integer',
        title: 'Maximum Length',
        default: 20,
        minimum: 1,
        maximum: 100,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
      temperature: {
        type: 'number',
        title: 'Temperature',
        default: 0.5,
        minimum: 0.0,
        maximum: 1.0,
        uniforms: {
          help: 'Some explanation of what this parameter actually does',
        },
      },
    },
    dependencies: {
      task: {
        oneOf: [
          {
            properties: {
              task: {
                enum: ['Write your task'],
              },
              // eslint-disable-next-line camelcase
              task_detail: {
                type: 'string',
              },
            },
          },
          {
            properties: {
              task: {
                not: {
                  enum: ['Write your task'],
                },
              },
            },
            required: ['task'],
          },
        ],
      },
    },
    required: ['mode', 'model', 'maxLength', 'temperature'],
  } as JSONSchemaType<Omit<Text2TextParams, 'prompt'>>,
}
