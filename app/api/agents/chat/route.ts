import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAgentById } from '@/lib/agents';
import { MembershipTier } from '@/types';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { agentId, message, conversationHistory, userToken, membershipTier } = await request.json();

    if (!agentId || !message) {
      return NextResponse.json(
        { error: 'Agent ID and message are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if user provided token
    if (!userToken) {
      return NextResponse.json(
        { error: 'Please set your Gemini API token in Settings' },
        { status: 401, headers: corsHeaders }
      );
    }

    // Get agent configuration
    const agent = getAgentById(agentId);
    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    // Initialize Gemini API with user token
    const genAI = new GoogleGenerativeAI(userToken);

    // Use gemini-pro which is available in v1beta API
    // Note: gemini-1.5-flash is NOT available in v1beta
    // Available models: gemini-pro, gemini-1.5-pro
    const modelName = 'gemini-pro';

    // Previous tier-based selection (commented out temporarily):
    // if (membershipTier === 'gold') {
    //   modelName = 'gemini-2.5-pro';
    // } else {
    //   modelName = 'gemini-2.5-flash';
    // }

    console.log(`Using model: ${modelName} for user with tier: ${membershipTier || 'standard'}`);
    const model = genAI.getGenerativeModel({ model: modelName });

    // Build conversation history for context
    // Filter out the current message and ensure it starts with a user message
    let history = conversationHistory?.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })) || [];

    // Remove the last message (current message being sent)
    if (history.length > 0 && history[history.length - 1].parts[0].text === message) {
      history = history.slice(0, -1);
    }

    // Ensure history starts with a user message (Gemini API requirement)
    while (history.length > 0 && history[0].role !== 'user') {
      history.shift();
    }

    // Ensure alternating user/model pattern
    const validHistory = [];
    let lastRole = null;
    for (const msg of history) {
      if (msg.role !== lastRole) {
        validHistory.push(msg);
        lastRole = msg.role;
      }
    }

    console.log(`Processed history: ${validHistory.length} messages (original: ${conversationHistory?.length || 0})`);
    if (validHistory.length > 0) {
      console.log(`First message role: ${validHistory[0].role}, Last message role: ${validHistory[validHistory.length - 1].role}`);
    }

    // Start chat with valid history
    const chat = model.startChat({
      history: validHistory,
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
    }, { headers: corsHeaders });
  } catch (error) {
    // Enhanced error logging with more details
    console.error('=== Gemini API Error ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    // Check for specific error types
    let errorMessage = 'Failed to generate response';
    let errorDetails = error instanceof Error ? error.message : 'Unknown error';

    // Handle specific Gemini API errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'Invalid API token';
        errorDetails = 'Please check your Gemini API token in Settings';
      } else if (error.message.includes('quota')) {
        errorMessage = 'API quota exceeded';
        errorDetails = 'You have exceeded your Gemini API quota. Please check your Google Cloud Console.';
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Network connection failed';
        errorDetails = 'Unable to connect to Gemini API. Please check your network connection.';
      } else if (error.message.includes('model')) {
        errorMessage = 'Model not available';
        errorDetails = 'The selected Gemini model may not be available. Try a different membership tier.';
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
        timestamp: new Date().toISOString(),
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
