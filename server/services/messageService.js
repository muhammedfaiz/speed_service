import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export const addMessage = async (data) => {
  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [data.sender, data.receiver] },
    });
    if (!conversation) {
      conversation = new Conversation({
        participants: [data.sender, data.receiver],
      });
    }
    const newMessage = new Message(data);
    if (newMessage) {
      conversation.messages.push(newMessage);
    }
    await conversation.save();
    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw new Error("Failed to add message");
  }
};

export const getMessagesService = async (senderId, receiverId) => {
  try {
    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      }).populate("messages");
      if(!conversation){
        return [];
      }
    return conversation.messages;
  } catch (error) {
    throw new Error("Failed to get messages");
  }
};
