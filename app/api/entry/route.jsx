import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, distance, link } = await req.json();

    if (!name || !email || !distance || !link) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    if (distance <= 0) {
      return NextResponse.json(
        {
          error: 'Distance must be greater than 0',
        },
        { status: 400 }
      );
    }

    // Create new entry
    const entry = await prisma.entry.create({
      data: {
        name,
        email: email.trim(),
        distance: parseFloat(distance),
        link,
      },
    });

    return NextResponse.json(
      { message: 'Entry submitted successfully', entry },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
