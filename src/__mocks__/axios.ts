window.alert = jest.fn()

import a from 'axios'

const axios = jest.createMockFromModule('axios') as jest.Mocked<typeof a>

axios.create.mockReturnThis()

export default axios
