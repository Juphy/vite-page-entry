import io from 'socket.io-client';
// const HOST = 'http://localhost:4200'
const HOST = '134.175.100.205:4200'
const socket = io.connect(HOST);
export default socket;