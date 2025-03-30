import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  const { token } = await req.json();
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    new URLSearchParams({ secret: secretKey, response: token })
  );

  const data = res.data;

  if (data.success && data.score > 0.5) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
