import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAgentById } from '@/lib/agents';
import { MembershipTier } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { agentId, message, conversationHistory, userToken, membershipTier } = await request.json();

    if (!agentId || !message) {
      return NextResponse.json(
        { error: 'Agent ID and message are required' },
        { status: 400 }
      );
    }

    // Check if user provided token
    if (!userToken) {
      return NextResponse.json(
        { error: 'Please set your Gemini API token in Settings' },
        { status: 401 }
      );
    }

    // Get agent configuration
    const agent = getAgentById(agentId);
    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    // Initialize Gemini API with user token
    const genAI = new GoogleGenerativeAI(userToken);

    // Select model based on membership tier
    // Gold members get Gemini 1.5 Pro (better quality, more expensive)
    // Standard members get Gemini 2.0 Flash (faster, cheaper)
    const modelName = membershipTier === 'gold' ? 'gemini-1.5-pro' : 'gemini-2.0-flash-exp';
    const model = genAI.getGenerativeModel({ model: modelName });

    // Build conversation history for context
    const history = conversationHistory?.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })) || [];

    // Start chat with history
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    // Send message with system prompt context
    const prompt = conversationHistory && conversationHistory.length > 0
      ? message
      : `${agent.systemPrompt}\n\n用户问题：${message}`;

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      message: text,
      agentId,
      modelUsed: modelName,
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate response',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
