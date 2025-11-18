'use client';

import { useState } from 'react';

export default function APITestPage() {
  const [agentId, setAgentId] = useState('travel-planner');
  const [message, setMessage] = useState('你好，我想去东京旅行');
  const [userToken, setUserToken] = useState('');
  const [membershipTier, setMembershipTier] = useState('standard');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log('Testing API with:', { agentId, message, membershipTier, tokenLength: userToken.length });

      const res = await fetch('/api/agents/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId,
          message,
          conversationHistory: [],
          userToken,
          membershipTier,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data);
      } else {
        setError(`Error ${res.status}: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gemini API Test Page</h1>

        {/* Configuration */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Configuration</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent ID
              </label>
              <select
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="travel-planner">旅行规划大师</option>
                <option value="destination-expert">目的地专家</option>
                <option value="budget-optimizer">预算优化师</option>
                <option value="culture-guide">文化导览员</option>
                <option value="itinerary-optimizer">行程优化器</option>
                <option value="travel-companion">旅行小助手</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gemini API Token
              </label>
              <input
                type="password"
                value={userToken}
                onChange={(e) => setUserToken(e.target.value)}
                placeholder="输入你的Gemini API Token"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">
                获取Token: <a href="https://makersuite.google.com/app/apikey" target="_blank" className="text-blue-600 hover:underline">Google AI Studio</a>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Membership Tier
              </label>
              <select
                value={membershipTier}
                onChange={(e) => setMembershipTier(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="standard">Standard</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <button
              onClick={testAPI}
              disabled={loading || !userToken}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? '测试中...' : '测试 API'}
            </button>
          </div>
        </div>

        {/* Response */}
        {response && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-900 mb-4">✓ 成功响应</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Model Used:</span> {response.modelUsed}
              </div>
              <div>
                <span className="font-medium">Agent ID:</span> {response.agentId}
              </div>
              <div>
                <span className="font-medium">Response:</span>
                <div className="mt-2 p-4 bg-white rounded border border-green-200 whitespace-pre-wrap">
                  {response.message}
                </div>
              </div>
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                查看原始JSON
              </summary>
              <pre className="mt-2 p-4 bg-gray-900 text-green-400 rounded text-xs overflow-auto">
                {JSON.stringify(response, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-900 mb-4">✗ 错误</h2>
            <pre className="p-4 bg-red-100 rounded text-sm overflow-auto text-red-900 whitespace-pre-wrap">
              {error}
            </pre>
          </div>
        )}

        {/* Debug Info */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">调试信息</h2>
          <div className="space-y-2 text-sm font-mono">
            <div><span className="font-bold">API Endpoint:</span> POST /api/agents/chat</div>
            <div><span className="font-bold">Token Set:</span> {userToken ? '✓ Yes' : '✗ No'}</div>
            <div><span className="font-bold">Token Length:</span> {userToken.length} characters</div>
            <div><span className="font-bold">Current Model:</span> gemini-pro</div>
          </div>

          <div className="mt-4 p-4 bg-white rounded border border-gray-300">
            <div className="text-sm font-semibold mb-2">Request Payload:</div>
            <pre className="text-xs overflow-auto">
              {JSON.stringify({
                agentId,
                message,
                conversationHistory: [],
                userToken: userToken ? `***${userToken.slice(-4)}` : '',
                membershipTier,
              }, null, 2)}
            </pre>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">使用说明</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-900">
            <li>前往 <a href="https://makersuite.google.com/app/apikey" target="_blank" className="underline">Google AI Studio</a> 获取API密钥</li>
            <li>将API密钥粘贴到上方的 Gemini API Token 输入框</li>
            <li>选择要测试的Agent和会员等级</li>
            <li>输入测试消息</li>
            <li>点击 测试 API 按钮</li>
            <li>查看响应或错误信息</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
