import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.deyesolar.sk'

  const products = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true },
  })

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' as const, lastModified: new Date() },
    { url: `${baseUrl}/katalog`, priority: 0.9, changeFrequency: 'daily' as const, lastModified: new Date() },
    { url: `${baseUrl}/katalog/hybridne-menice-lv-1f`, priority: 0.85, changeFrequency: 'weekly' as const, lastModified: new Date() },
    { url: `${baseUrl}/katalog/hybridne-menice-lv-3f`, priority: 0.85, changeFrequency: 'weekly' as const, lastModified: new Date() },
    { url: `${baseUrl}/katalog/hybridne-menice-hv-3f`, priority: 0.85, changeFrequency: 'weekly' as const, lastModified: new Date() },
    { url: `${baseUrl}/katalog/on-grid-menice`, priority: 0.85, changeFrequency: 'weekly' as const, lastModified: new Date() },
    { url: `${baseUrl}/katalog/baterie-lv`, priority: 0.85, changeFrequency: 'weekly' as const, lastModified: new Date() },
    { url: `${baseUrl}/katalog/baterie-hv-rack`, priority: 0.85, changeFrequency: 'weekly' as const, lastModified: new Date() },
    { url: `${baseUrl}/dokumenty`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: new Date() },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'weekly' as const, lastModified: new Date() },
    { url: `${baseUrl}/o-nas`, priority: 0.6, changeFrequency: 'monthly' as const, lastModified: new Date() },
    { url: `${baseUrl}/podpora`, priority: 0.6, changeFrequency: 'monthly' as const, lastModified: new Date() },
    { url: `${baseUrl}/vop`, priority: 0.3, changeFrequency: 'yearly' as const, lastModified: new Date() },
    { url: `${baseUrl}/gdpr`, priority: 0.3, changeFrequency: 'yearly' as const, lastModified: new Date() },
  ]

  const productPages = products.map((p) => ({
    url: `${baseUrl}/produkt/${p.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
    lastModified: new Date(),
  }))

  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, publishedAt: true },
  })

  const blogPages = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: p.publishedAt ?? new Date(),
  }))

  return [...staticPages, ...productPages, ...blogPages]
}
