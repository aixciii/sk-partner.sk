import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Brands } from "@/components/brands"
import { WhyUs } from "@/components/why-us"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Brands />
      <WhyUs />
      <SiteFooter />
    </main>
  )
}
