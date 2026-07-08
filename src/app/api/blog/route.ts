import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        perex: true,
        imageUrl: true,
        publishedAt: true,
      },
    });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ error: 'Chyba servera' }, { status: 500 });
  }
}
