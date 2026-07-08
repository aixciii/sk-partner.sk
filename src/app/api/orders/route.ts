import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendOrderConfirmation } from '@/lib/email'

function generateOrderNum() {
  const d = new Date()
  const y = d.getFullYear().toString().slice(2)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `DS${y}${m}${day}-${rand}`
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { company, ico, dic, icdph, address, email, phone, note, items } = body

  if (!company || !ico || !address || !email || !phone || !items?.length) {
    return NextResponse.json({ error: 'Chýbajú povinné polia' }, { status: 400 })
  }

  let totalNet = 0
  let totalVat = 0
  const orderItems = []

  for (const item of items) {
    // Try by cuid first, then by slug
    let product = await prisma.product.findUnique({ where: { id: item.productId } }).catch(() => null)
    if (!product) {
      product = await prisma.product.findUnique({ where: { slug: item.productId } }).catch(() => null)
    }
    if (!product) {
      console.warn('Product not found:', item.productId)
      continue
    }
    const itemNet = product.priceNet * item.qty
    const itemVat = itemNet * product.vatRate
    totalNet += itemNet
    totalVat += itemVat
    orderItems.push({
      productId: product.id,
      name: product.name,
      model: product.model,
      qty: item.qty,
      priceNet: product.priceNet,
      vatRate: product.vatRate,
      totalNet: itemNet,
    })
  }

  if (!orderItems.length) {
    return NextResponse.json({ error: 'Žiadne platné produkty v objednávke' }, { status: 400 })
  }

  const totalGross = totalNet + totalVat
  const orderNum = generateOrderNum()

  const order = await prisma.order.create({
    data: {
      orderNum,
      guestName: company,
      guestEmail: email,
      company,
      ico,
      address,
      phone,
      note,
      totalNet,
      totalVat,
      totalGross,
      status: 'NEW',
      items: { create: orderItems },
    },
    include: { items: true },
  })

  try {
    await sendOrderConfirmation(order)
  } catch (e) {
    console.error('Email error:', e)
  }

  return NextResponse.json({ success: true, orderNum: order.orderNum })
}
