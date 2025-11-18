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

    // Select model based on membership tier (Booking Genius-style)
    // Gold (Genius Level 2): Gemini 2.5 Pro - highest quality, 10% discount
    // Silver (Genius Level 1): Gemini 2.5 Flash - standard quality, 5% discount + priority
    // Standard: Gemini 2.5 Flash - basic, free (with rate limits)
    // Note: Silver uses same model as Standard but gets priority API access and discounts
    let modelName: string;
    if (membershipTier === 'gold') {
      modelName = 'gemini-2.5-pro';
    } else {
      // Both silver and standard use gemini-2.5-flash
      // Difference is in discounts and priority access (handled separately)
      modelName = 'gemini-2.5-flash';
    }
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
