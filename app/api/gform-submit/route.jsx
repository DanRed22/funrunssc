import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function decodeBase64(encodedData) {
  // Decode the base64 string
  return Buffer.from(encodedData, 'base64').toString('utf-8');
}

export async function POST(req) {
  try {
    // Parse the JSON body from the request
    const { email, fullName, skrt } = await req.json();

    // Check if email and fullName are provided
    if (!email || !fullName || !skrt) {
      return NextResponse.json({ error: 'Missing Data' }, { status: 400 });
    }

    // Decode the Base64 encoded email and full name
    const decodedEmail = decodeBase64(email);
    const decodedFullName = decodeBase64(fullName);
    const decodedSecret = decodeBase64(skrt);

    if (decodedSecret !== process.env.API_KEY) {
      return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    // Log the decoded values (or save them to a database, etc.)
    const user = await prisma.participant.create({
      data: {
        email: decodedEmail,
        name: decodedFullName,
      },
    });

    // Return a response to the client
    return NextResponse.json(
      { message: 'Data received and decoded successfully', data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
