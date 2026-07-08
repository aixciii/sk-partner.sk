import { prisma } from '@/lib/prisma';
import { Navbar } from "@/components/navbar"
import { Footer } from '@/components/footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | Fotovoltaika a solárne systémy | SK Partner',
  description: 'Odborné články o fotovoltaike, hybridných meničoch a batériových systémoch Deye. Poradíme vám s výberom, inštaláciou a návratnosťou investície.',
  keywords: 'fotovoltaika blog, hybridný menič návod, solárne panely Slovensko, Deye menič recenzia',
  alternates: { canonical: 'https://www.sk-partner.sk/blog' },
  openGraph: {
    title: 'Blog | SK Partner',
    description: 'Odborné články o fotovoltaike a solárnych systémoch Deye.',
    url: 'https://www.sk-partner.sk/blog',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: { id: true, slug: true, title: true, perex: true, imageUrl: true, publishedAt: true },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-foreground">Blog</h1>
            <p className="mt-3 text-lg text-muted-foreground">Odborné články o fotovoltaike a solárnych systémoch</p>
          </div>
          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card py-20 text-center">
              <p className="text-muted-foreground">Čoskoro pribudnú prvé články.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-md transition-all">
                  {post.imageUrl ? (
                    <div className="h-48 overflow-hidden bg-muted">
                      <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="text-4xl">☀️</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs text-muted-foreground mb-2">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                    </p>
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">{post.perex}</p>
                    <span className="mt-4 text-sm font-medium text-primary">Čítať viac →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
