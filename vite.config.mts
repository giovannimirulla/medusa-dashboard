import inject from "@medusajs/admin-vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import inspect from "vite-plugin-inspect"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const BASE = env.VITE_MEDUSA_BASE || "/"
  const BACKEND_URL = env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const STOREFRONT_URL =
    env.VITE_MEDUSA_STOREFRONT_URL || "http://localhost:8000"

  /**
   * Add this to your .env file to specify the project to load admin extensions from.
   * VITE_MEDUSA_PROJECT: Load from backend project (local dev)
   * VITE_MEDUSA_SOURCES: Load from npm packages (comma-separated)
   */
  const MEDUSA_PROJECT = env.VITE_MEDUSA_PROJECT || null
  const MEDUSA_SOURCES = env.VITE_MEDUSA_SOURCES 
    ? env.VITE_MEDUSA_SOURCES.split(',').map(s => s.trim())
    : []
  
  const sources = MEDUSA_PROJECT 
    ? [MEDUSA_PROJECT, ...MEDUSA_SOURCES]
    : MEDUSA_SOURCES

  console.log('🔌 Medusa Admin Plugin Sources:', sources)

  return {
    plugins: [
      inspect(),
      react(),
      inject({
        sources,
      }),
    ],
    define: {
      __BASE__: JSON.stringify(BASE),
      __BACKEND_URL__: JSON.stringify(BACKEND_URL),
      __STOREFRONT_URL__: JSON.stringify(STOREFRONT_URL),
    },
    server: {
      open: true,
    },
  }
})
