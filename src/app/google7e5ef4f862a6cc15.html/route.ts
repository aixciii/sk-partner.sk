import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('google-site-verification: google7e5ef4f862a6cc15.html', {
    headers: { 'Content-Type': 'text/html' },
  })
}
