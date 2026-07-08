import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Navbar } from "@/components/navbar"
import { Footer } from '@/components/footer';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: 'Článok nenájdený | DeyeSolar.sk' };

  return {
    title: `${post.title} | DeyeSolar.sk`,
    description: post.perex,
    alternates: { canonical: `https://www.deyesolar.sk/blog/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.perex,
      url: `https://www.deyesolar.sk/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      ...(post.imageUrl && { images: [{ url: post.imageUrl, alt: post.title }] }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } });
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.perex,
    'datePublished': post.publishedAt?.toISOString(),
    'dateModified': post.updatedAt.toISOString(),
    'author': { '@type': 'Organization', 'name': 'SK Partner s.r.o.', 'url': 'https://www.deyesolar.sk' },
    'publisher': { '@type': 'Organization', 'name': 'SK Partner s.r.o.', 'logo': { '@type': 'ImageObject', 'url': 'https://sk-partner.sk/favicon.svg' } },
    ...(post.imageUrl && { 'image': post.imageUrl }),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Domov</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>›</span>
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>

          <article>
            {post.imageUrl && (
              <div className="mb-8 overflow-hidden rounded-xl">
                <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover sm:h-80" />
              </div>
            )}
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{post.title}</h1>
            <p className="mt-3 text-muted-foreground">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
              {' · '} SK Partner s.r.o.
            </p>
            <p className="mt-4 text-lg text-muted-foreground border-l-4 border-primary pl-4">{post.perex}</p>
            <div
              className="mt-8 prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <div className="mt-12 rounded-xl border-2 border-primary/20 bg-primary/5 p-8">
            <p className="text-xs font-medium uppercase tracking-wide text-primary mb-2">Pre inštalačné firmy a resellerov</p>
            <h3 className="text-xl font-bold text-foreground">Ste inštalačná firma alebo reseller?</h3>
            <p className="mt-2 text-sm text-muted-foreground">SK Partner s.r.o. je oficiálny importér Deye na Slovensku. Dodávame priamo zo skladu v Bratislave — bez medzičlánkov.</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Individuálna veľkoobchodná cena podľa objemu</li>
              <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Dodanie 1–2 pracovné dni po celej SR</li>
              <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Všetky modely skladom — žiadne čakanie</li>
              <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Oficiálna záruka 10 rokov od výrobcu Deye</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/stat-partnerom" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                Stať sa partnerom →
              </Link>
              <a href="tel:+421948450458" className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary text-primary px-6 py-3 text-sm font-medium hover:bg-primary/10 transition-colors">
                +421 948 450 458
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
