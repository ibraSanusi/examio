import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // 👤 Crear usuario
  const user = await prisma.user.create({
    data: {
      name: "Juan Pérez",
      username: "juanp",
      email: "juan@example.com",
      grade: "10",
      age: "16",
      image: "https://i.pravatar.cc/150?img=3",
    },
  })

  // 🔑 Crear cuenta asociada
  await prisma.account.create({
    data: {
      userId: user.id,
      type: "oauth", // ✅
      provider: "github", // ✅
      providerAccountId: "juanp123", // ✅
      access_token: "token_de_prueba", // ✅
    },
  })

  // 🗝️ Crear sesión
  await prisma.session.create({
    data: {
      userId: user.id,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 día
      sessionToken: "session_token_demo",
    },
  })

  // 📝 Crear examen
  await prisma.exam.create({
    data: {
      chat_examen: "Primer examen de matemáticas",
      userId: user.id,
    },
  })

  console.log("✅ Seed completado con éxito")
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
