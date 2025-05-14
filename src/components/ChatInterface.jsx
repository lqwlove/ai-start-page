import React, { useState } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

const ChatInterface = ({ messages, onSendMessage, isTyping, currentModel, messagesEndRef }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 md:px-6">
      <div className="flex-1 overflow-y-auto py-4 message-container">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-6 bg-white rounded-2xl shadow-message max-w-lg">
              <div className="text-2xl font-bold text-primary-600 mb-3">欢迎使用 AI 聊天</div>
              <p className="text-gray-600 mb-6">
                选择一个 AI 模型，开始进行对话。您可以询问任何问题，AI 将尽力提供帮助。
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-left bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 mb-1">示例问题：</div>
                  <div className="text-sm text-gray-600">"请帮我写一首关于春天的诗"</div>
                </div>
                <div className="text-left bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 mb-1">示例问题：</div>
                  <div className="text-sm text-gray-600">"解释量子计算的基本原理"</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <Message key={message.id} message={message} currentModel={currentModel} />
            ))}
            {isTyping && <TypingIndicator model={currentModel} />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            className="input pr-16"
            placeholder={`发送消息给 ${currentModel.name}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-primary py-1 px-3"
            disabled={inputValue.trim() === '' || isTyping}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
        <div className="text-xs text-gray-500 mt-2 text-center">
          {isTyping ? `${currentModel.name} 正在思考...` : '提示：尝试问一个复杂的问题来测试不同模型的能力'}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 