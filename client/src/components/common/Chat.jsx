/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaCommentAlt, FaTimes, FaUser } from "react-icons/fa";
import {
  getMessagesService,
  sendMessageService,
} from "../../services/messageService";
import { extractChatTime } from "../../utils/utils";
import { useSocketContext } from "../../context/SocketContext";

const Chat = ({ isOpen, setIsOpen, isEmployee, receiver }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChange, setIsChange] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (isOpen && isEmployee) {
        const response = await getMessagesService(
          receiver._id,
          localStorage.getItem("employee_access_token")
        );
        setMessages(response.messages);
      }
      if (isOpen && !isEmployee) {
        const response = await getMessagesService(
          receiver._id,
          localStorage.getItem("access_token")
        );
        setMessages(response.messages);
      }
    };
    fetchMessages();
  }, [receiver, isOpen, isEmployee, isChange]);

  const lastMessageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [isChange]);

  const sendMessage = async () => {
    const data = {
      receiverId: receiver._id,
      message: input,
      token: isEmployee
        ? localStorage.getItem("employee_access_token")
        : localStorage.getItem("access_token"),
    };
    const response = await sendMessageService(data);
    if (response.status == 200) {
      setInput("");
      setIsChange(!isChange);
    }
  };
  const { socket } = useSocketContext();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      setIsChange(!isChange);
    });
    return () => socket?.off("newMessage");
  }, [socket, isChange]);
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && !isEmployee && (
        <button
          onClick={togglePopup}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none flex items-center justify-center"
        >
          <FaCommentAlt className="text-xl" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-lg shadow-lg flex flex-col justify-between">
          <div className="bg-primary-blue text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaUser />
              <h2 className="text-lg">{receiver?.name}</h2>
            </div>
            <button onClick={togglePopup} className="text-white text-xl">
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((item) => (
                <div
                  key={item._id}
                  ref={lastMessageRef}
                  className={`mb-2 p-2 rounded-lg w-fit ${
                    item.sender !== receiver._id
                      ? "bg-blue-100 ml-auto"
                      : "bg-gray-100"
                  }`}
                >
                  <div>{item.message}</div>
                  <div className="text-xs text-gray-500">
                    {extractChatTime(item.createdAt)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400">No messages yet</div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="mt-2 w-full bg-primary-blue text-white p-2 rounded-lg hover:bg-secondary-blue focus:outline-none flex items-center justify-center"
            >
              <FaPaperPlane className="text-lg mr-2" /> Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
