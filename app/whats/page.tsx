"use client";
import React, { useState } from "react";
import { Send, Paperclip, Smile, Mic } from "lucide-react";

function formatarWhatsApp(texto) {
  let formatado = texto;

  // 1. Sanitização básica (opcional, mas recomendada para evitar injeção de HTML malicioso)
  formatado = formatado
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Formatações
  // Monoespaçado (```texto```)
  formatado = formatado.replace(/```(.*?)```/g, "<code>$1</code>");

  // Negrito (*texto*)
  formatado = formatado.replace(/\*(.*?)\*/g, "<b>$1</b>");

  // Itálico (_texto_)
  formatado = formatado.replace(/_(.*?)_/g, "<i>$1</i>");

  // Tachado (~texto~)
  formatado = formatado.replace(/~(.*?)~/g, "<strike>$1</strike>");

  // 3. Quebras de linha (\n para <br>)
  formatado = formatado.replace(/\n/g, "<br>");

  return formatado;
}

// Para exibir no HTML (exemplo):
// document.getElementById('mensagem-box').innerHTML = htmlFinal;

const WhatsAppClone = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá, tudo bem? Como posso te ajudar?", sender: "other" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: messages.length + 1,
          text: inputMessage.trim(),
          sender: "me",
        },
      ]);
      const response = await fetch("/api/chatGoogle", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: inputMessage.trim() }],
        }),
      });

      const { messages: newMessages } = await response.json();
      console.log(newMessages);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: messages.length + 1,
          text: formatarWhatsApp(newMessages.text),
          sender: "other",
        },
      ]);
    }

    setInputMessage("");
  };

  return (
    <div className="flex flex-col  bg-gray-100 border rounded-xl shadow-lg">
      {/* Header */}
      <div className="bg-[#008069] text-white p-4 flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        <div>
          <h2 className="font-bold">Contato</h2>
          <p className="text-xs text-gray-200">online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`
                max-w-[70%] p-2 rounded-lg 
                ${msg.sender === "me" ? "bg-green-100" : "bg-white"}
              `}
            >
              <p dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 flex items-center space-x-2 border-t">
        <Smile className="text-gray-500" />
        <Paperclip className="text-gray-500" />

        <input
          type="text"
          placeholder="Digite uma mensagem"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow bg-gray-100 rounded-full px-4 py-2"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />

        {inputMessage ? (
          <Send className="text-[#008069]" onClick={handleSendMessage} />
        ) : (
          <Mic className="text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default WhatsAppClone;
