import { AxiosError } from 'axios'

const handleAPIError = (err: AxiosError) => {
  if (err.response) {
    window.alert(`요청을 실패했습니다.\n에러코드: ${err.response.status}`)
    return
  }
  window.alert('요청을 실패했습니다.')
}

export default handleAPIError
