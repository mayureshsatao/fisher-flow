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

    const instructions = `Given this protocol: ${protocol_name}. Generate all the information about the ingredients and machinery that will be used to conduct the experiment. For every product/reagent, its crucial to know the supplier, description, average shipping time to Boston, MA, and atleast 3 URLs to buy it online. 

Return the response as a JSON array of objects. Each object should have the following structure:
{
  "name": "product name",
  "description": "detailed description",
  "supplier": "supplier name",
  "shippingTime": "shipping time to Boston, MA",
  "urls": ["url1", "url2", "url3"],
  "price": "price if available"
}

Return ONLY valid JSON, no markdown formatting or additional text.`
    
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

    // Try to parse JSON from the response
    let items = [];
    try {
      // Extract JSON from the response (handle cases where AI adds markdown code blocks)
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
      const jsonText = jsonMatch ? jsonMatch[1] : text;
      const parsed = JSON.parse(jsonText.trim());
      
      // Handle both array and object with items property
      if (Array.isArray(parsed)) {
        items = parsed;
      } else if (parsed.items && Array.isArray(parsed.items)) {
        items = parsed.items;
      } else if (parsed.ingredients && Array.isArray(parsed.ingredients)) {
        items = parsed.ingredients;
      } else if (parsed.reagents && Array.isArray(parsed.reagents)) {
        items = parsed.reagents;
      } else {
        // If it's an object, try to convert it to an array
        items = [parsed];
      }
    } catch (parseError) {
      console.error('Failed to parse JSON from AI response:', parseError);
      // Return the raw text as a fallback
      return NextResponse.json({ 
        response: text,
        items: [],
        error: 'Failed to parse JSON response from AI'
      });
    }

    return NextResponse.json({ 
      response: text,
      items: items
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
