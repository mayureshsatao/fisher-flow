import { NextRequest, NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { protocol_name } = body;

    if (!protocol_name || typeof protocol_name !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    // Check if Google API key is configured
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    const instructions = `Given this protocol: ${protocol_name}. Generate all the information about the ingredients and machinery that will be used to conduct the experiment. For every product/reagent, its crucial to know the supplier, description, average shipping time to Boston, MA, and atleast 3 URLs to buy it online. Provide the information in JSON format.`
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API key is not configured. Please set GOOGLE_GENERATIVE_AI_API_KEY in your environment variables.' },
        { status: 500 }
      );
    }

    // Generate text using Google Gemini via Vercel AI SDK
    const { text } = await generateText({
      model: google(process.env.GOOGLE_MODEL || 'gemini-2.5-flash'),
      prompt: instructions,
      temperature: 0.7,
    });

    return NextResponse.json({ 
      response: text 
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
