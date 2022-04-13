import vue from "@vitejs/plugin-vue"
import { defineConfig, loadEnv } from "vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import path from "path"
import { rollupInput } from "./vite/utils"

export default ({ mode, command }) => {
  const root = process.cwd(),
    env = loadEnv(mode, root),
    port = env.VITE_PORT ? Number(env.VITE_PORT) : 3366
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: "css"
          })
        ]
      })
    ],
    server: {
      host: "0.0.0.0",
      port: port,
      proxy: {},
      hmr: {
        overlay: false
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        '@coms': path.resolve(__dirname, "src/components")
      }
    },
    base: "./",
    build: {
      assetsDir: "./assets",
      rollupOptions: {
        input: rollupInput(command, port)
      },
      target: "modules"
    }
  }
}
