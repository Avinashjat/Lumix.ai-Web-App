// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { FaUserCircle } from "react-icons/fa";
// import { RiRobot2Fill } from "react-icons/ri";
// import { FiSend, FiPaperclip } from "react-icons/fi";
// import { useAuth } from "@clerk/clerk-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const Chat = () => {
//   const [prompt, setPrompt] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { getToken } = useAuth();

//   const navigate = useNavigate();

//   const bottomRef = useRef();

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if ((!prompt && !file) || loading) return;

//     const formData = new FormData();
//     formData.append("prompt", prompt);

//     if (file) {
//       formData.append("file", file);
//     }

//     setMessages((prev) => [...prev, { role: "user", text: prompt }]);
//     setPrompt("");

//     try {
//       setLoading(true);

//       const token = await getToken();

//       const { data } = await axios.post("/api/ai/chat", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (data.success) {
//         setMessages((prev) => [...prev, { role: "ai", text: data.message }]);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//       setFile(null);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="flex justify-center bg-gray-50 min-h-screen px-4 lg:px-16 py-6">
//       {/* Chat Container */}
//       <div className="flex flex-col w-full max-w-7xl bg-white shadow-lg rounded-xl overflow-hidden">
//         {/* Header */}
//         <div className="border-b px-6 py-3 flex items-center justify-between">
//           {/* Left Section */}
//           <div
//             className="flex items-center cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             <img className="w-12 sm:w-14 " src={assets.logo} alt="logo" />
//             <span className="text-2xl pt-3 font-bold bg-gradient-to-r from-[#3C81F6] to-[#9234EA] bg-clip-text text-transparent">
//               MIX
//             </span>
//           </div>

//           {/* Center Section */}
//           <div className="flex items-center gap-2 absolute sm:left-1/2 transform -translate-x-1/2">
//             <RiRobot2Fill size={24} />
//             <h1 className="font-semibold text-lg">Lumix AI Assistant</h1>
//           </div>

//           {/* Right Spacer */}
//           <div className="w-16"></div>
//         </div>

//         {/* Messages Area */}
//         <div className="flex-1  overflow-y-auto px-6 lg:px-10 py-8 space-y-6">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`flex gap-3  ${msg.role === "user" ? "justify-end" : ""}`}
//             >
//               {msg.role === "ai" && (
//                 <RiRobot2Fill size={28} className="text-gray-600  shrink-0" />
//               )}

//               <div
//                 className={`max-w-4xl p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
//                   msg.role === "user"
//                     ? "bg-black text-white"
//                     : "bg-gray-50  border"
//                 }`}
//               >
//                 <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                   {msg.text}
//                 </ReactMarkdown>
//               </div>

//               {msg.role === "user" && (
//                 <FaUserCircle size={28} className="text-gray-700 shrink-0" />
//               )}
//             </div>
//           ))}

//           {loading && (
//             <div className="flex gap-3">
//               <RiRobot2Fill size={28} />
//               <div className="bg-gray-50 border px-4 py-3 rounded-xl text-gray-500">
//                 AI is thinking...
//               </div>
//             </div>
//           )}

//           <div ref={bottomRef}></div>
//         </div>

//         {/* Input Area */}
//         <div className="border-t px-6 py-5 bg-white">
//           <div className="flex items-center gap-3">
//             {/* File Upload */}
//             <label className="cursor-pointer">
//               <FiPaperclip size={22} />
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//             </label>

//             {/* Input */}
//             <input
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Message Lumix AI..."
//               className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-black"
//             />

//             {/* Send */}
//             <button
//               disabled={loading}
//               onClick={sendMessage}
//               className="bg-black text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-50"
//             >
//               <FiSend size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { FiSend, FiPaperclip } from "react-icons/fi";
import { useAuth } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();
  const navigate = useNavigate();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if ((!prompt && !file) || loading) return;

    const formData = new FormData();
    formData.append("prompt", prompt);

    if (file) formData.append("file", file);

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setPrompt("");

    try {
      setLoading(true);
      const token = await getToken();

      const { data } = await axios.post("/api/ai/chat", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setMessages((prev) => [...prev, { role: "ai", text: data.message }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen px-2 sm:px-4 lg:px-16 py-2 sm:py-6">
      {/* Chat Container */}
      <div className="flex flex-col w-full max-w-7xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="border-b px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="w-9 sm:w-12" src={assets.logo} alt="logo" />
            <span className="text-lg sm:text-2xl pt-1 sm:pt-3 font-bold bg-gradient-to-r from-[#3C81F6] to-[#9234EA] bg-clip-text text-transparent">
              MIX
            </span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-2">
            <RiRobot2Fill size={20} />
            <h1 className="font-semibold text-sm sm:text-lg">Lumix AI</h1>
          </div>

          <div className="w-6 sm:w-16"></div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-8 space-y-5 sm:space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 sm:gap-3 ${
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              {msg.role === "ai" && (
                <RiRobot2Fill size={22} className="text-gray-600 shrink-0" />
              )}

              <div
                className={`max-w-[85%] sm:max-w-xl lg:max-w-4xl p-3 sm:p-4 rounded-xl text-xs sm:text-sm lg:text-base leading-relaxed whitespace-pre-wrap break-words ${
                  msg.role === "user"
                    ? "bg-black text-white"
                    : "bg-gray-50 border"
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              </div>

              {msg.role === "user" && (
                <FaUserCircle size={22} className="text-gray-700 shrink-0" />
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 sm:gap-3">
              <RiRobot2Fill size={22} />
              <div className="bg-gray-50 border px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-gray-500 text-xs sm:text-sm">
                AI is thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="border-t px-3 sm:px-6 py-3 sm:py-5 bg-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <label className="cursor-pointer">
              <FiPaperclip size={18} />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Message Lumix AI..."
              className="flex-1 border rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-black"
            />

            <button
              disabled={loading}
              onClick={sendMessage}
              className="bg-black text-white p-2 sm:p-3 rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
