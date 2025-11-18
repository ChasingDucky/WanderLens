import { NextResponse } from 'next/server';

// Health check endpoint to verify API is working
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    version: '1.0.0',
    services: {
      api: 'operational',
      database: 'not_configured', // Placeholder for future database
    },
  });
}
