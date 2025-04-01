import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    let searchField = req.nextUrl.searchParams.get('searchField');
    if (searchField) {
      searchField = searchField.trim();
    }
    console.log('Search Field:', searchField);

    if (!searchField) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Check if participant exists
    const participant = await prisma.participant.findFirst({
      where: {
        email: { equals: searchField },
      },
    });

    if (participant) {
      const entries = await prisma.entry.findMany({
        where: {
          email: participant.email,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Calculate total distance for "VERIFIED" entries only
      const totalVerifiedDistance = entries
        .filter((entry) => entry.status === 'VERIFIED')
        .reduce((sum, entry) => sum + entry.distance, 0);

      console.log({
        participant,
        entries,
        totalVerifiedDistance,
      });
      return NextResponse.json(
        {
          participant,
          entries,
          totalVerifiedKm: totalVerifiedDistance.toFixed(2),
        },
        { status: 200 }
      );
    } else {
      //if participant does not exist
      return NextResponse.json({ data: null }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
