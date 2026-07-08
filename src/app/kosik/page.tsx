import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer";
import { CartContent } from "@/components/cart-content";

export const metadata = {
  title: "Košík | SK Partner",
  description: "Váš nákupný košík na SK Partner - oficiálny importér Deye na Slovensku.",
  robots: "noindex, nofollow",
};

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-foreground">Košík</h1>
          <CartContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
