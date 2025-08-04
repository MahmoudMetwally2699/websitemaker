import { NextRequest, NextResponse } from 'next/server';
import { GenerateRequest } from '../../types';

// For this example, we'll simulate a NestJS backend call
// In production, you would call your actual NestJS backend
export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();

    if (!body.idea || body.idea.trim().length === 0) {
      return NextResponse.json(
        { message: 'Website idea is required' },
        { status: 400 }
      );
    }    // Call the actual NestJS backend with MongoDB
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    console.log('Calling backend at:', apiUrl);

    const response = await fetch(`${apiUrl}/sections/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea: body.idea }),
    });

    console.log('Backend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      throw new Error(`Backend responded with status: ${response.status} - ${errorText}`);
    }

    const nestjsResponse = await response.json();
    return NextResponse.json(nestjsResponse, { status: 201 });

  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );  }
}
