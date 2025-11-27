"use client";
import React from "react";
import { Newspaper, Clock, Search, Menu, Share2 } from "lucide-react";

export default function NewsAgencyHomePage() {
  const [article, setArticle] = React.useState({});
  const [text, setText] = React.useState("");
  // Função para compartilhar no WhatsApp
  const shareOnWhatsApp = (news) => {
    const shareText = encodeURIComponent(`Confira essa notícia: ${news}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;
    window.open(whatsappUrl, "_blank");
  };

  const geraNoticia = async () => {
    if (text) {
      const response = await fetch("/api/chatGoogle", {
        method: "POST",
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: input }],
        }),
      });

      const { messages: newMessages } = await response.json();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-gray-300 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Newspaper className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Portal de Notícias</h1>
          </div>

          <div className="flex items-center space-x-1">
            <input
              type="text"
              className="rounded-md p-2 w-10/12"
              placeholder="noticia ?"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Search className="h-6 w-6" />
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Artigos em Destaque */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Artigos em Destaque
            </h2>
            <div className="space-y-6">
              <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{article.author}</span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" /> {article.date}
                  </span>
                </div>
              </article>
            </div>
          </div>

          {/* Últimas Notícias */}
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-blue-300 text-white py-2 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Portal de Notícias. Todos os direitos reservados.</p>
          <nav className="mt-4 space-x-4">
            <a href="#" className="hover:text-blue-200">
              Sobre Nós
            </a>
            <a href="#" className="hover:text-blue-200">
              Contato
            </a>
            <a href="#" className="hover:text-blue-200">
              Política de Privacidade
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
