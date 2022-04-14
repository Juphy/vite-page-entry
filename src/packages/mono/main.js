import { createApp } from "vue"
import App from "./App.vue"
import { setupDirectives } from "@/plugins"

const app = createApp(App)

function setupPlugins() {
  // 注册全局指令
  setupDirectives(app)
}

app.config.errorHandler = (err) => {
  // 处理错误
}

setupPlugins()
app.mount("#app")
