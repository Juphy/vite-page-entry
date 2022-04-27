// https://gitee.com/sevenzyh/learn-webrtc/tree/master
const Koa = require("koa")
const koaSend = require("koa-send")
const static = require("koa-static")
const socket = require("socket.io")

const path = require("path")
const http = require("http")

const port = 3000
const app = new Koa()

app.use(static(
    path.join(__dirname, './dist')
))

app.use(async(ctx, next) => {
    if(!/\./.test(ctx.request.url)){
        await koaSend(
            ctx,
            'index.html',
            {
                root: path.join(__dirname, './'),
                maxage: 1000 * 60 * 60 * 24 * 7,
                gzip: true
            }
        )
    }else{
        await next()
    }
})

const httpServer = http.createServer(app.callback()).listen(4200, () => {
    console.log('httpServer app started at port ...' + port)
})

const options = {
    ioOptions: {
        pingTimeout: 10000,
        pingInterval: 5000
    }
}

const httpIo = socket(httpServer, options)
const rooms = {}
const socks = {}
const httpConnectIoCallBack = (sock) => {

}

socket(httpServer).on("connection", (sock) => {
    // 用户离开房间
    sock.on("userleave", () => {})

    // 检查房间是否可加入
    sock.on("checkRoom", () => {})
})
