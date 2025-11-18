import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAgentById } from '@/lib/agents';

// Initialize Gemini API
// In production, this should be stored in environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDIuMHYKDv8tI35XYe0EIoVJfQp_h6Hgzc');

export async function POST(request: NextRequest) {
  try {
    const { agentId, message, conversationHistory } = await request.json();

    if (!agentId || !message) {
      return NextResponse.json(
        { error: 'Agent ID and message are required' },
        { status: 400 }
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

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

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
