import io from 'socket.io-client';
// const HOST = 'http://localhost:4200'
const HOST = 'https://api.juphy.cn'
const socket = io.connect(HOST);
export default socket;