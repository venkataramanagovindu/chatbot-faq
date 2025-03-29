"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For smooth animations
import { Moon, Sun, Send, Menu } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button"; // ShadCN UI

interface Message {
  text: string;
  sender: "user" | "bot";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { text: input, sender: "user" };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      const botMessage: Message = { text: data.answer, sender: "bot" };

      setMessages([...newMessages, botMessage]);
      setHistory((prev) => [...prev, input]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-[#121212] text-[#E0E0E0]" : "bg-[#F8F9FA] text-[#333333]"}`}>
      {/* Sidebar with Smooth Animation */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "25%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`overflow-hidden h-full ${darkMode ? "bg-[#181818] text-[#E0E0E0]" : "bg-[#ffffff] shadow-sm"}`}
          >
            <div className="flex justify-between items-center p-4 whitespace-nowrap min-w-0">
              <h2 className="text-lg font-bold truncate">Chat History</h2>
              <Button variant="ghost" onClick={() => setSidebarOpen(false)}>✖</Button>
            </div>

            <div className="p-4 overflow-y-auto h-full">
              {history.length === 0 ? (
                <p className="text-gray-400">No history yet.</p>
              ) : (
                <ul className="space-y-2">
                  {history.map((item, index) => (
                    <motion.li
                      key={index}
                      className="p-2 rounded-md"
                      style={{ backgroundColor: darkMode ? "#252525" : "#EAEAEA" }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className={`flex justify-between items-center p-4 border-b ${darkMode ? "bg-[#181818]" : "bg-[#ffffff] shadow-sm"}`}>
          <div className="flex items-center space-x-2">
            {!sidebarOpen && (
              <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
                <Menu size={30} />
              </Button>
            )}
            <h1 className="text-xl font-semibold">Chatbot</h1>
          </div>
          <Button variant="ghost" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={30} /> : <Moon size={30} />}
          </Button>
        </div>

        {/* Chat Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${darkMode ? "bg-[#121212]" : "bg-[#ffffff]"}`}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-lg max-w-[75%] ${
                msg.sender === "user"
                  ? "self-end ml-auto shadow-md"
                  : "self-start shadow-md"
              }`}
              style={{
                backgroundColor: msg.sender === "user" ? (darkMode ? "#007AFF" : "#1E90FF") : (darkMode ? "#252525" : "#EAEAEA"),
                color: msg.sender === "user" ? "#ffffff" : darkMode ? "#E0E0E0" : "#333333",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {msg.text}
            </motion.div>
          ))}
          {loading && (
            <motion.div
              className="p-3 rounded-lg shadow-md"
              style={{ backgroundColor: darkMode ? "#252525" : "#EAEAEA", color: darkMode ? "#E0E0E0" : "#333333" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
              Typing...
            </motion.div>
          )}
          <div ref={messagesEndRef} /> {/* Auto-scroll target */}
        </div>

        {/* Input Box */}
        <div className={`flex items-center border-t p-4 ${darkMode ? "bg-[#181818] border-[#252525]" : "bg-[#ffffff] border-[#D1D5DB]"}`}>
          <input
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none"
            style={{
              backgroundColor: darkMode ? "#121212" : "#ffffff",
              borderColor: darkMode ? "#252525" : "#D1D5DB",
              color: darkMode ? "#E0E0E0" : "#333333",
            }}
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button className="ml-3 rounded-lg" style={{ backgroundColor: darkMode ? "#007AFF" : "#1E90FF", color: "#ffffff" }} onClick={sendMessage}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
