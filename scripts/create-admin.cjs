const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@deyesolar.sk'
  const password = 'DeYeAdmin2026!'
  const passwordHash = await bcrypt.hash(password, 10)

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    await prisma.user.update({ where: { email }, data: { role: 'ADMIN', approved: true } })
    console.log('✅ User updated to ADMIN')
  } else {
    await prisma.user.create({ data: { email, passwordHash, name: 'Admin', role: 'ADMIN', approved: true } })
    console.log('✅ Admin created')
  }
  console.log('Email:', email)
  console.log('Password:', password)
}

main().catch(console.error).finally(() => prisma.$disconnect())
