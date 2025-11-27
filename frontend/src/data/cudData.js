export const cudData = {
  name: "Certificado Único de Discapacidad",
  description: "El CUD (Certificado Único de Discapacidad) es un documento oficial que entrega el Estado para reconocer la discapacidad de una persona.",
  image: "/assets/icons/cud_portada.svg",

  contentBlocks: [
    {
      id: 1,
      type: "steps",
      order: 1,
      steps: [
        {
          id: 1,
          icon: "/assets/icons/cud_step1.svg",
          description:
            "Descargá y completá la planilla de solicitud. Reuní la documentación necesaria."
        },
        {
          id: 2,
          icon: "/assets/icons/cud_step2.svg",
          description:
            "Acercate a la oficina y pedí un turno con la Junta Evaluadora."
        },
        {
          id: 3,
          icon: "/assets/icons/cud_step3.svg",
          description: "Asistí a la evaluación."
        },
        {
          id: 4,
          icon: "/assets/icons/cud.svg",
          description: "Retirá el certificado."
        }
      ]
    }
  ]
};
