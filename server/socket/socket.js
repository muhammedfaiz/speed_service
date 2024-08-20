import {Server} from 'socket.io';
import http from 'http';
import express from 'express';


const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: 'http://localhost:5173',
        credentials: true
    }
});

export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on('connection', (socket)=>{
    const userId = socket.handshake.query.userId;
    const employeeId = socket.handshake.query.employeeId;
    if(userId!=undefined) userSocketMap[userId]=socket.id;
    if(employeeId!=undefined) userSocketMap[employeeId]=socket.id;
    socket.on('disconnect', ()=>{
        console.log('a user disconnected',socket.id);
    });
});

export {app,io,server};