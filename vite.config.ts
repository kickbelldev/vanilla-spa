import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  plugins: [tsconfigPaths(), EnvironmentPlugin(['VITE_API_BASE_URL', 'VITE_UNSPLASH_API_KEY'])],
})
