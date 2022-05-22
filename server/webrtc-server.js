const Koa = require("koa")
const koaSend = require("koa-send")
const statics = require("koa-static")
const socket = require("socket.io")

const path = require("path")
const http = require("http")

const port = 4200
const app = new Koa()

// 设置静态资源放置的地址，可以写多个，多个静态资源文件
// static(root, option)接收两个参数
// root: 为路径，表示文件所在的相对路径
// option: {
//     maxage: 浏览器默认的最大缓存时长  max - age, 单位为毫秒，默认值为0，也就是不启用缓存。
//     hidden: 是否允许传输隐藏的文件，默认为false， 不传输。
//     index: 默认的文件名，默认值为index.html。
//     defer: 是否推迟响应，如果为true, koa - static 将会咋其他中间件执行完成之后在执行。
//     gzip: 如果客户端支持gzip压缩且资源文件后缀为.gz， 则进行gzip压缩，默认为true, 也就是支持gzip压缩。
//     setHeaders: 设置请求头函数，格式为： fn(res, path, stats)。
//     extensions: 当资源匹配不到的时候。根据传入的数组参数依次进行匹配，返回匹配到的第一个资源。
// }

app.use(statics(
    path.join( __dirname,  './dist')
));
app.use(async (ctx, next) => {
    if (!/\./.test(ctx.request.url)) {
        await koaSend(
            ctx,
            'index.html',
            {
                root: path.join(__dirname, './'),
                maxage: 1000 * 60 * 60 * 24 * 7,
                gzip: true,
            }
        );
    } else {
        await next();
    }
});
const httpServer = http.createServer(app.callback()).listen(port, ()=>{
    console.log('httpServer app started at port ...' + port);
});
const options = {
    ioOptions: {
        pingTimeout: 10000,
        pingInterval: 5000,
    },
    cors: {
        // origin: 'http://localhost:18101',
        origin: 'https://www.juphy.cn',
        credentials: true
    }
};
const httpIo = socket(httpServer, options);
const rooms = {};
const socks = {};
const httpConnectIoCallBack = (sock) => {
    console.log(`sockId:${sock.id}连接成功!!!`);
    sock.emit('connectionSuccess', sock.id);
    // 用户断开连接
    sock.on('userLeave', ({ userName, roomId, sockId} = user)=> {
        console.log(`userName:${userName}, roomId:${roomId}, sockId:${sockId} 断开了连接...`);
        if (roomId && rooms[roomId] && rooms[roomId].length) {
            rooms[roomId] = rooms[roomId].filter(item => item.sockId!==sockId);
            httpIo.in(roomId).emit('userLeave', rooms[roomId]);
            console.log(`userName:${userName}, roomId:${roomId}, sockId:${sockId} 离开了房间...`);
        }
    });
    // 用户加入房间
    sock.on('checkRoom', ({ userName, roomId, sockId})=> {
        rooms[roomId] = rooms[roomId] || [];
        sock.emit('checkRoomSuccess', rooms[roomId]);
        if (rooms[roomId].length > 3) return false;
        rooms[roomId].push({ userName, roomId, sockId});
        sock.join(roomId);
        httpIo.in(roomId).emit('joinRoomSuccess', rooms[roomId]);
        socks[sockId] = sock;
        console.log(`userName:${userName}, roomId:${roomId}, sockId:${sockId} 成功加入房间!!!`);
    });
    // 发送视频
    sock.on('toSendVideo', (user) => {
        httpIo.in(user.roomId).emit('receiveVideo', user);
    });
    // 取消发送视频
    sock.on('cancelSendVideo', (user) => {
        httpIo.in(user.roomId).emit('cancelSendVideo', user);
    });
     // 接收视频邀请
     sock.on('receiveVideo', (user) => {
        httpIo.in(user.roomId).emit('receiveVideo', user);
    });
    // 拒绝接收视频
    sock.on('rejectReceiveVideo', (user) => {
        httpIo.in(user.roomId).emit('rejectReceiveVideo', user);
    });
    // 接听视频
    sock.on('answerVideo', (user) => {
        httpIo.in(user.roomId).emit('answerVideo', user);
    });
    // 挂断视频
    sock.on('hangupVideo', (user) => {
        httpIo.in(user.roomId).emit('hangupVideo', user);
    });
    // addIceCandidate
    sock.on('addIceCandidate', (data) => {
        const toUser = rooms[data.user.roomId].find(item=>item.sockId!==data.user.sockId);
        socks[toUser.sockId].emit('addIceCandidate', data.candidate);
    });
    sock.on('receiveOffer', (data) => {
        const toUser = rooms[data.user.roomId].find(item=>item.sockId!==data.user.sockId);
        socks[toUser.sockId].emit('receiveOffer', data.offer);
    });
    sock.on('receiveAnsewer', (data) => {
        const toUser = rooms[data.user.roomId].find(item=>item.sockId!==data.user.sockId);
        socks[toUser.sockId].emit('receiveAnsewer', data.answer);
    });
};
httpIo.on('connection', httpConnectIoCallBack);
