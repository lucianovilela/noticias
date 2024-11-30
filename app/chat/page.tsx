'use client';

import { CoreMessage } from 'ai';
//import React from 'react';
import React, { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<CoreMessage[]>([]);

  return (
    <div className="bg-slate-5 px-5 mr-5">
      <label className=" mr-5">tema</label>
      <input
        className="p-3"
        id="inputTema"
        value={input}
        onChange={event => {
          setInput(event.target.value);
        }}
        onKeyDown={async event => {
          if (event.key === 'Enter') {
            setMessages(currentMessages => [
              
              { role: 'user', content: input },
            ]);

            const response = await fetch('/api/chatGoogle', {
              method: 'POST',
              body: JSON.stringify({
                messages: [ { role: 'user', content: input }],
              }),
            });

            const { messages: newMessages } = await response.json();
            console.log(newMessages)
            setMessages(currentMessages => [
              ...currentMessages,
              ...newMessages.response.messages,
            ]);
          }
        }}
      />

      {messages.map((message, index) => (
        <div key={`${message.role}-${index}`}>
          {typeof message.content === 'string'
            ? message.content
            : message.content
                .filter(part => part.type === 'text')
                .map((part, partIndex) => (
                  <pre key={partIndex}>{part.text}</pre>
                ))}
        </div>
      ))}
    </div>
  );
}