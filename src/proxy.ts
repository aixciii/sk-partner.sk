import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

const ALLOWED_IPS = ["62.176.182.18", "85.216.151.104"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("auth")?.value
    const session = token ? verifyToken(token) : null
    if (!session || session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    return NextResponse.next()
  }

  if (pathname === "/coming-soon") return NextResponse.next()
  if (pathname.startsWith("/api")) return NextResponse.next()
  if (pathname.startsWith("/_next")) return NextResponse.next()

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || ""
  if (ALLOWED_IPS.includes(ip.trim())) return NextResponse.next()

  return NextResponse.redirect(new URL("/coming-soon", request.url))
}
