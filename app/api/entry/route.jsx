import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, userId, distance, link } = await req.json();

    if (!name || !userId || !distance || !link) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.participant.findUnique({
      where: { unique_id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not in database yet!' },
        { status: 400 }
      );
    }

    // Create new entry
    const entry = await prisma.entry.create({
      data: {
        name,
        userId,
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
