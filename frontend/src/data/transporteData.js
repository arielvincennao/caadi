export const transporteData = {
  name: "Pases de transporte",
  description: "Es una credencial que sirve para viajar gratis en colectivos, trenes o subtes, usar estacionamiento reservado y tener prioridad en algunos servicios.",
  image: "/assets/icons/transporte_portada.jpg",
  
  contentBlocks: [
    {
      id: 2,
      type: "text",
      order: 2,
      title: "Pase Nacional",
      list: [
        {
          id: 1,
          text: "Se usa en todo el país para transporte y beneficios nacionales.",
        } 
      ]
    },
    {
      id: 3,
      type: "steps",
      order: 3,
      title: "Cómo presentarlo para usarlo",
      steps: [
        {
          id: 1,
          icon: "/assets/icons/cud.svg",
          description:
            "El Pase Nacional viene impreso en el mismo CUD.",
        },
        {
          id: 2,
          icon: "/assets/icons/cud_step2.svg",
          description:
            "Se debe sacar una fotocopia del original.",
        },
        {
          id: 3,
          icon: "/assets/icons/cud_step3.svg",
          description: "Se debe recortar la parte inferior del pase (marcada con línea punteada) de la fotocopia.",
        },
      ],
    },

     {
      id: 4,
      type: "text",
      order: 4,
      title: "Pase Provincial",
      list: [
        {
          id: 1,
          text: "Se utiliza para gestiones y beneficios dentro de la provincia.",
        } 
      ]
    },
    {
      id: 5,
      type: "steps",
      order: 5,
      title: "Cómo tramitarlo",
      steps: [
        {
          id: 1,
          icon: "/assets/icons/cud.svg",
          description:
            "Vas a necesitar fotocopia y original del DNI y del CUD.",
        },
        {
          id: 2,
          icon: "/assets/icons/cud_step2.svg",
          description:
            "Dirigite a la Oficina de Discapacidad de Tandil",
        },
      ],
    },
  
  ],
};
