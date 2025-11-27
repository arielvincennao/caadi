export const pagesSteps = {
  cud: {
    steps: [
      {
        id: 1,
        icon: "assets/icons/paso1.svg",
        stepNumber: 1,
        description: "Descargá y completa la planilla de solicitud. Reuní la documentación necesaria."
      },
      {
        id: 2,
        icon: "assets/icons/paso2.svg",
        stepNumber: 2,
        description: "Acercate a la oficina, con la documentación necesaria, y pedí un turno con la Junta Evaluadora"
      },
      {
        id: 3,
        icon: "assets/icons/paso3.svg",
        stepNumber: 3,
        description: "Asistí a la evaluación."
      },
      {
        id: 4,
        icon: "/assets/icons/cud.svg",
        stepNumber: 4,
        description: "Retirá el certificado."
      },
    ],
  },

  transporte: {
    steps: [
      {
        id: 1,
        title: "Seleccioná tu tipo de trámite",
        description: "Elegí qué tipo de trámite querés realizar.",
        fields: ["tramiteType"],
      },
      {
        id: 2,
        title: "Ingresá tu DNI",
        description: "Necesitamos tu DNI para verificar información.",
        fields: ["dni"],
      },
      {
        id: 3,
        title: "Confirmación",
        description: "Revisá que los datos estén correctos.",
        fields: [],
      },
    ],
  },
};
