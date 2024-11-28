import axios, { AxiosHeaders } from 'axios'

// Temporary fix for CORS issue in dev
// To enable CORS in dev open https://cors-anywhere.herokuapp.com in your browser and enable it
// TODO: Remove this when the API is deployed
export const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jigsaw-psi.vercel.app'
// export const BASE_URL = 'http://0.0.0.0:8080'

export type RequestHandler<TRequest, TResponse> = (requestBody: TRequest) => Promise<TResponse>

export async function makeApiCall<TRequest, TResponse>(
  endpoint: string,
  requestBody: TRequest,
  headers?: AxiosHeaders,
): Promise<TResponse> {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, requestBody, {
      headers,
    })
    return response.data as TResponse
  } catch (error) {
    console.error(error)
    throw error
  }
}
