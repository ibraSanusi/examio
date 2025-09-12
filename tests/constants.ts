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

export const bodyNotValid = {
  grade: 2,
  subject: 5,
  topics: {},
}
