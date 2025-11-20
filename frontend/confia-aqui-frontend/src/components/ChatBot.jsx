import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modelRef = useRef(null);

  // Carrega histórico salvo
  useEffect(() => {
    const saved = sessionStorage.getItem("chatHistory");
    if (saved) setChatHistory(JSON.parse(saved));
  }, []);

  // Salva histórico
  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Inicia Gemini
  useEffect(() => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      modelRef.current = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    } catch (e) {
      console.warn("Erro ao inicializar GoogleGenerativeAI", e);
    }
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setChatHistory((prev) => [...prev, { type: "user", message: userInput }]);

    try {
      const model = modelRef.current;
      let result = await model.generateContent(userInput);

      const botText =
        result?.response?.text?.() ||
        result?.response?.outputText ||
        result?.outputText ||
        "(sem resposta)";

      setChatHistory((prev) => [...prev, { type: "bot", message: botText }]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [...prev, { type: "bot", message: "(erro ao enviar)" }]);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  //  Toda vez que o chat for fechado → limpa as mensagens
  const handleToggle = () => {
    if (open) {
      // Está aberto → e o usuário vai fechar agora
      setChatHistory([]);
      sessionStorage.removeItem("chatHistory");
    }
    setOpen(!open);
  };

  return (
    <div className="flex flex-col items-end">

      {/* Botão flutuante */}
      <button
        onClick={handleToggle}
        className="w-14 h-14 rounded-full bg-azul text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-all"
      >
        <FontAwesomeIcon icon={faCommentDots} className="text-2xl" />
      </button>

      {/* Janela do chat */}
      {open && (
        <div className="mt-3 bg-white border rounded-2xl shadow-xl p-4 w-80 md:w-96 h-[480px] flex flex-col">

          <h2 className="text-lg font-semibold text-center mb-3 text-azul">
            Assistente Virtual
          </h2>

          <div className="flex-1 overflow-y-auto space-y-2 mb-3 p-2 bg-gray-50 rounded-xl border">
            <ChatHistory chatHistory={chatHistory} />
            <Loading isLoading={isLoading} />
          </div>

          {/* Área de input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-grow border border-gray-300 p-2 rounded-xl bg-white 
              text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 
              focus:ring-azul outline-none"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="px-4 py-2 bg-azul text-white rounded-xl hover:bg-blue-700 transition shadow-sm"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatBot;