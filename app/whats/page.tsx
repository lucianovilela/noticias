"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";

function formatarWhatsApp(texto) {
  let formatado = texto;
  formatado = formatado
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  formatado = formatado.replace(
    /```(.*?)```/g,
    "<code class='bg-gray-200 px-1 rounded'>$1</code>"
  );
  formatado = formatado.replace(/\*(.*?)\*/g, "<b>$1</b>");
  formatado = formatado.replace(/_(.*?)_/g, "<i>$1</i>");
  formatado = formatado.replace(/~(.*?)~/g, "<strike>$1</strike>");
  formatado = formatado.replace(/\n/g, "<br>");
  return formatado;
}

const WhatsAppClone = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🚨 *URGENTE!* Bem-vindo ao gerador de notícias _VERDADEIRAS_ com estética duvidosa! 😱📱\n\nMe conte um fato real e eu vou transformá-lo em uma mensagem com cara de fake news de grupo de família! ⚠️",
      sender: "other",
      time: "10:30",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newTime = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now(),
          text: inputMessage.trim(),
          sender: "me",
          time: newTime,
        },
      ]);

      const userMessage = inputMessage.trim();
      setInputMessage("");
      setIsTyping(true);

      try {
        const response = await fetch("/api/chatGoogle", {
          method: "POST",
          body: JSON.stringify({
            messages: [{ role: "user", content: userMessage }],
          }),
        });

        const { messages: newMessages } = await response.json();

        setTimeout(() => {
          setIsTyping(false);
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              id: Date.now() + 1,
              text: formatarWhatsApp(newMessages.text),
              sender: "other",
              time: new Date().toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
        }, 500);
      } catch (error) {
        setIsTyping(false);
        console.error("Erro ao enviar mensagem:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Moderno */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-md">
                <span className="text-xl font-bold">AI</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-bold text-lg">Gerador de FakeFatos 🚨</h2>
              <p className="text-xs text-emerald-100">
                {isTyping
                  ? "criando fake news verdadeiras..."
                  : "pronto para viralizar"}
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Video className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
            <Phone className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
            <MoreVertical className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>

      {/* Messages Container com padrão de fundo */}
      <div
        className="flex-grow overflow-y-auto p-6 space-y-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            } animate-in slide-in-from-bottom-2 duration-300`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={`
                max-w-[75%] p-3 rounded-2xl shadow-md relative group
                ${
                  msg.sender === "me"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm"
                }
                hover:shadow-lg transition-all duration-200
              `}
            >
              <p
                dangerouslySetInnerHTML={{ __html: msg.text }}
                className="text-sm leading-relaxed"
              />
              <span
                className={`text-xs mt-1 block text-right ${
                  msg.sender === "me" ? "text-emerald-100" : "text-gray-400"
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-bottom-2">
            <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-md">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area Moderno */}
      <div className="bg-white p-4 shadow-xl border-t border-gray-200">
        <div className="flex items-end space-x-3 max-w-full">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Smile className="w-6 h-6 text-gray-500 hover:text-emerald-600 transition-colors" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Paperclip className="w-6 h-6 text-gray-500 hover:text-emerald-600 transition-colors" />
          </button>

          <div className="flex-grow bg-gray-50 rounded-3xl px-5 py-3 border border-gray-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all">
            <input
              type="text"
              placeholder="Digite um fato verdadeiro aqui... 📰"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>

          {inputMessage.trim() ? (
            <button
              onClick={handleSendMessage}
              className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          ) : (
            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
              <Mic className="w-6 h-6 text-gray-500 hover:text-emerald-600 transition-colors" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppClone;
