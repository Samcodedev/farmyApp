import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from "../../config/firebase";

const ChatPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
//   const [messages, setMessages] = useState('');
  const [input, setInput] = useState('');
  const messagesRef = collection(db, 'messages')

//   console.log(auth.currentUser.displayName);
  

  useEffect(() => {
    
    const queryMessages = query(
      messagesRef,
      where("room", "==", userId),   
      orderBy("createdAt")          
    )
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        let message = []
        snapshot.forEach((doc)=>{
            
            message.push({...doc.data(), id: doc.id}) 
        })
        // console.log(message);
        
        setMessages(message)
    })

    return () => unsubscribe()
  }, [])
  




  const handleSend = async (e) => {
    e.preventDefault()

    if (input === '') return;
    
    
    await addDoc(messagesRef, {
        text: input,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room: userId ,
    })
    setInput('')


    // if (input.trim()) {
    //   setMessages([...messages, { sender: "You", text: input }]);
    //   setInput("");
    // }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col h-[80vh]">
      <div className="flex justify-between items-center pb-4 border-b">
        <button onClick={() => navigate(-1)} className="text-main">
          Back
        </button>
        <h3 className="font-bold text-lg text-bold_main">{userId}</h3>
      </div>

      <div className="flex-1 mt-4 overflow-y-scroll scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`
                ${
                    msg.user === auth.currentUser.displayName
                    ? "text-right flex justify-end"
                    : "text-left flex justify-start"
                }
            `}>
            <div className={`mb-2 text-gray-800 py-2 pt-1 pr-2 w-fit rounded-lg
                ${
                    msg.user === auth.currentUser.displayName
                    ? "text-left bg-green-100"
                    : "text-left bg-gray-300"
                }
            `}>
                <span className="text-xs pl-2 text-gray-500">{msg.user}</span>
                <span className="block px-2 w-fit rounded-lg font-medium">{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4">
        <form onSubmit={handleSend} className="w-full flex justify-center">
           
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg w-3/4"
                // onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
                type="submit"
                className="ml-2 px-4 py-2 bg-main text-white rounded-lg"
            >
            Send
            </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;

