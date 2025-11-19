import inject from "@medusajs/admin-vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import inspect from "vite-plugin-inspect"
import path from "path"
import { createRequire } from "module"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const BASE = env.VITE_MEDUSA_BASE || "/"
  const BACKEND_URL = env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const STOREFRONT_URL =
    env.VITE_MEDUSA_STOREFRONT_URL || "http://localhost:8000"

  /**
   * Add this to your .env file to specify the project to load admin extensions from.
   */
  const MEDUSA_PROJECT = env.VITE_MEDUSA_PROJECT || null
  // Comma-separated list of npm package names to include as admin sources, e.g. "@scope/medusa-product-reviews,@scope/medusa-fulfillment-paccofacile"
  const MEDUSA_SOURCES = (env.VITE_MEDUSA_SOURCES || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  // Resolve package roots from names (works on Vercel) so the inject plugin can find ./admin exports
  const require = createRequire(import.meta.url)
  const resolvePkgRoot = (pkg: string) => {
    try {
      const resolved = path.dirname(require.resolve(`${pkg}/package.json`))
      console.log(`✅ Resolved plugin: ${pkg} → ${resolved}`)
      return resolved
    } catch (error) {
      console.error(`❌ Failed to resolve plugin: ${pkg}`, error)
      throw error
    }
  }

  const pkgSources = MEDUSA_SOURCES.map(resolvePkgRoot)
  const sources = [
    ...(MEDUSA_PROJECT ? [MEDUSA_PROJECT] : []),
    ...pkgSources,
  ]

  console.log('\n🔌 Medusa Admin Plugin Sources:')
  console.log('  VITE_MEDUSA_PROJECT:', MEDUSA_PROJECT)
  console.log('  VITE_MEDUSA_SOURCES:', MEDUSA_SOURCES)
  console.log('  Resolved sources:', sources)
  console.log('')

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
