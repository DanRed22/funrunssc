// /app/api/admin/login/route.js (or .jsx)
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; // Import cookies() from next/headers

const prisma = new PrismaClient();
const SECRET_KEY = process.env.API_KEY;

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }
    let user = await prisma.user.findFirst({
      where: { email: email },
    });

    // console.log(user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: 'Invalid Credentials' },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '30m' });
    // Access cookies and await them before setting
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 60, // 30 minutes
    });

    delete user['password'];
    return NextResponse.json({
      user: user,
      token: token,
      success: true,
      message: 'Login successful',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
