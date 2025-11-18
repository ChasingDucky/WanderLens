'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { AI_AGENTS } from '@/lib/agents';
import { ChatMessage, AgentType, MembershipTier } from '@/types';
import { getMembershipByTier } from '@/lib/membership';
import { Send, Loader2, ArrowLeft, Sparkles, Bot, Settings, AlertCircle } from 'lucide-react';

export default function AgentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialAgent = searchParams.get('agent') as AgentType | null;

  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(initialAgent);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState<string>('');
  const [membershipTier, setMembershipTier] = useState<MembershipTier>('standard');
  const [currentModel, setCurrentModel] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentAgent = selectedAgent ? AI_AGENTS.find(a => a.id === selectedAgent) : null;

  // Load user settings from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('geminiToken');
      const storedTier = localStorage.getItem('membershipTier') as MembershipTier;
      if (storedToken) setUserToken(storedToken);
      if (storedTier) setMembershipTier(storedTier);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedAgent || isLoading) return;

    // Check if token is set
    if (!userToken) {
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '请先在设置中配置您的 Gemini API Token。点击右上角的"Settings"进行配置。',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agents/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: selectedAgent,
          message: inputMessage,
          conversationHistory: messages,
          userToken,
          membershipTier,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentModel(data.modelUsed);
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error instanceof Error ? error.message : '抱歉，我现在无法回答。请检查您的API Token是否正确。';
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectAgent = (agentId: AgentType) => {
    setSelectedAgent(agentId);
    setMessages([]);
    const agent = AI_AGENTS.find(a => a.id === agentId);
    if (agent) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `您好！我是${agent.name}。${agent.description}。\n\n我可以帮您：\n${agent.capabilities.map(c => `• ${c}`).join('\n')}\n\n请告诉我您的需求，我很乐意为您提供帮助！`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  if (!selectedAgent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                AI旅行助手
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              选择一个专业的AI助手，为您提供个性化的旅行建议和规划服务
            </p>
            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>
                  由 {getMembershipByTier(membershipTier).aiModel} 驱动 • {getMembershipByTier(membershipTier).displayName}
                </span>
              </div>
              {!userToken && (
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>请先在设置中配置 API Token</span>
                  <button
                    onClick={() => router.push('/settings')}
                    className="ml-2 px-3 py-1 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  >
                    前往设置
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AI_AGENTS.map((agent) => (
              <div
                key={agent.id}
                onClick={() => selectAgent(agent.id)}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-purple-200"
              >
                <div className={`h-3 bg-gradient-to-r ${agent.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-5xl">{agent.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {agent.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      核心能力
                    </div>
                    <div className="space-y-1">
                      {agent.capabilities.slice(0, 3).map((capability, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${agent.color}`}></div>
                          <span>{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => selectAgent(agent.id)}
                    className={`mt-6 w-full py-3 bg-gradient-to-r ${agent.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all group-hover:scale-105`}
                  >
                    开始对话
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6 h-[calc(100vh-80px)] flex flex-col">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedAgent(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="text-4xl">{currentAgent?.icon}</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentAgent?.name}</h2>
                <p className="text-sm text-gray-500">{currentAgent?.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentModel && (
                <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {currentModel}
                </div>
              )}
              <div className={`px-4 py-2 bg-gradient-to-r ${currentAgent?.color} text-white rounded-full text-sm font-medium`}>
                在线
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? `bg-gradient-to-r ${currentAgent?.color} text-white`
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                    {msg.content}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      msg.role === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString('zh-CN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 text-gray-600 animate-spin" />
                  <span className="text-sm text-gray-600">正在思考...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-end space-x-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入您的问题..."
                rows={3}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-4 bg-gradient-to-r ${currentAgent?.color} text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>按 Enter 发送，Shift + Enter 换行</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
