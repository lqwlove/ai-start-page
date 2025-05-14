import React, { useState } from 'react';

const ModelSelector = ({ models, currentModel, onModelChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleModelSelect = (model) => {
    onModelChange(model);
    setIsOpen(false);
  };

  return (
    <div className="border-b border-gray-200 bg-white p-3 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <h2 className="text-sm text-gray-500">当前模型:</h2>
        <div className="relative">
          <button
            className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
            onClick={toggleDropdown}
          >
            <div className={`w-3 h-3 rounded-full ${currentModel.color}`}></div>
            <span className="font-medium">{currentModel.name}</span>
            <span className="text-xs text-gray-500">{currentModel.provider}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none animate-fade-in">
              <div className="py-1">
                {models.map((model) => (
                  <button
                    key={model.id}
                    className={`${
                      currentModel.id === model.id ? 'bg-gray-100' : ''
                    } w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between`}
                    onClick={() => handleModelSelect(model)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${model.color}`}></div>
                      <span>{model.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{model.provider}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelSelector; 