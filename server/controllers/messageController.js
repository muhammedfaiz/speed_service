import { addMessage, getMessagesService } from "../services/messageService.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { verifyToken } from "../utils/utils.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message,token } = req.body;
    const decode = verifyToken(token);
    if(decode){
        const newMessage = await addMessage({sender:decode.id,receiver:receiverId,message})
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage);
        }
        res.status(200).json({message:"success"});
    }else{
        res.status(401).json({message:"Invalid token"});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to send message" });
  }
};

export const getMessages = async(req,res)=>{
    try {
        const {id,token}=req.params;
        const decode=verifyToken(token);
        if(decode){
            const messages=await getMessagesService(decode.id,id);
            if(messages){
                res.status(200).json({messages});
            }else{
                res.status(404).json({message: "No messages found"});
            }
        }
    } catch (error) {
        res.status(404).json({message: "Failed to get messages"});
    }
}
