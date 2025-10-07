import { Exam } from "@/types/models"

export const bodyValid = {
  grade: "4 de primaria",
  subject: "matemáticas",
  topics: [
    "Números naturales hasta el millón",
    "Suma y resta con llevadas",
    "Multiplicaciones de varias cifras",
    "Divisiones exactas y con resto",
    "Propiedades de la multiplicación (conmutativa, asociativa, distributiva)",
    "Problemas con varias operaciones",
    "Introducción a las fracciones",
    "Figuras geométricas básicas",
    "Unidades de medida de longitud, masa y capacidad",
  ],
}

export const BODY_NOT_VALID = {
  grade: 2,
  subject: 5,
  topics: {},
}

export const EXAM_RESPONSE: Exam | null = {
  id_examen: "exam_id1234",
  chat_examen: "Examen cualquiera",
  createdAt: new Date(),
  userId: "pepito_id_39424",
  correction: "Esta es la corrección del examamen",
}
