import React, { useState, useRef, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import ModelSelector from './components/ModelSelector';
import './styles/index.css';

// 模拟可用的 AI 模型
const availableModels = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', color: 'bg-green-100' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', color: 'bg-green-50' },
  { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', color: 'bg-purple-100' },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', color: 'bg-blue-100' },
  { id: 'llama-3', name: 'Llama 3', provider: 'Meta', color: 'bg-yellow-100' },
];

const App = () => {
  const [messages, setMessages] = useState([]);
  const [currentModel, setCurrentModel] = useState(availableModels[0]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // 当消息更新时滚动到底部
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // 模拟发送消息
  const handleSendMessage = (content) => {
    if (!content.trim()) return;

    // 添加用户消息
    setMessages(prev => [...prev, { id: Date.now(), content, sender: 'user' }]);
    
    // 模拟 AI 响应
    setIsTyping(true);
    
    // 模拟网络延迟
    setTimeout(() => {
      setIsTyping(false);
      // 生成 AI 响应
      const aiResponses = {
        'gpt-4': `这是来自 GPT-4 的回应：\n${content} 是一个很有趣的问题。作为一个先进的语言模型，我认为...`,
        'gpt-3.5-turbo': `GPT-3.5 Turbo 回应：\n关于"${content}"，我的看法是...`,
        'claude-3': `Claude 3 思考中...\n对于"${content}"，从多个角度来看...`,
        'gemini-pro': `Gemini Pro 分析：\n你提到的"${content}"是一个很好的起点，让我们深入探讨...`,
        'llama-3': `Llama 3 正在处理：\n"${content}"是一个值得思考的话题。根据我的理解...`,
      };
      
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        content: aiResponses[currentModel.id], 
        sender: 'ai',
        model: currentModel.name
      }]);
    }, 1500);
  };

  const handleModelChange = (model) => {
    setCurrentModel(model);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden">
        <ModelSelector 
          models={availableModels} 
          currentModel={currentModel} 
          onModelChange={handleModelChange} 
        />
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          isTyping={isTyping}
          currentModel={currentModel}
          messagesEndRef={messagesEndRef}
        />
      </main>
    </div>
  );
};

export default App; 