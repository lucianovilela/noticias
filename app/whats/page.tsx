"use client"
import React, { useState } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';

const WhatsAppClone = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá, tudo bem?', sender: 'other' },
    { id: 2, text: 'Tudo ótimo! Como posso ajudar?', sender: 'me' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([
        ...messages, 
        { 
          id: messages.length + 1, 
          text: inputMessage, 
          sender: 'me' 
        }
      ]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-[360px] bg-gray-100 border rounded-xl shadow-lg">
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
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[70%] p-2 rounded-lg 
                ${msg.sender === 'me' 
                  ? 'bg-green-100' 
                  : 'bg-white'
                }
              `}
            >
              {msg.text}
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
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        
        {inputMessage ? (
          <Send 
            className="text-[#008069]" 
            onClick={handleSendMessage}
          />
        ) : (
          <Mic className="text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default WhatsAppClone;