export const examContentMock = `
   En ExamPage:
   ## Sección 1: Opción Múltiple
    1. ¿Cuál es el resultado de 6 + 7?
    <MultipleChoice id="pregunta-1" options={[{"label":"12"},{"label":"13"},{"label":"14","correct": true},{"label":"15"}]} />

    2. ¿Cuál es el siguiente número después del 29?
    <MultipleChoice id="pregunta-2" options={[{"label":"28"},{"label":"29"},{"label":"30","correct": true},{"label":"31"}]} />

    3. ¿Qué número resulta de la suma 15 + 9?
    <MultipleChoice id="pregunta-3" options={[{"label":"22"},{"label":"23","correct": true},{"label":"24"},{"label":"25"}]} />

    ## Sección 2: Verdadero/Falso
    4. 10 - 6 es igual a 4.
    <TrueFalse id="pregunta-4" answer="false" />

    5. 5 + 4 es mayor que 8.
    <TrueFalse id="pregunta-5" answer="true" />

    ## Sección 3: Respuesta Corta
    6. Realiza la siguiente suma: 34 + 16 =
    <ShortAnswer id="pregunta-6" />

    7. Realiza la siguiente resta: 45 - 20 =
    <ShortAnswer id="pregunta-7" />

    ## Sección 4: Ensayo
    8. Describe cómo se realiza una suma utilizando números hasta 100 y da un ejemplo.
    <Essay id="pregunta-8" />
    `
