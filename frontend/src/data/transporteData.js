export const transporteData = {
  name: "Pases de transporte",
  description: "Es una credencial que sirve para viajar gratis en colectivos, trenes o subtes, usar estacionamiento reservado y tener prioridad en algunos servicios.",
  image: "/assets/icons/transporte_portada.jpg",
  
  contentBlocks: [

     {
      id: 1,
      type: "card",
      order: 1,
      cards: [
        {
          id: 1,
          icon: "buscar-mapa",
          title: "Pase Nacional",
          description: "Se usa en todo el país para transporte y beneficios nacionales",
          href: "",
        },
        {
          id: 2,
          icon: "buscar-mapa",
          title: "Pase Provincial",
          description: "Se utiliza para gestiones y beneficios dentro de la provincia",
          href: ""
        },
        {
          id: 3,
          icon: "buscar-mapa",
          title: "Pase Local",
          description: "Permite cargar los beneficios en la tarjeta SUBE para el transporte urbano de Tandil",
          href: ""
        }
      ]
    },

    {
      id: 2,
      type: "steps",
      order: 2,
      title: "Cómo presentarlo para usarlo",
      steps: [
        {
          id: 1,
          icon: "cud",
          description:
            "El Pase Nacional viene impreso en el mismo CUD.",
        },
        {
          id: 2,
          icon: "fotocopia",
          description:
            "Se debe sacar una fotocopia del original.",
        },
        {
          id: 3,
          icon: "recortar",
          description: "Se debe recortar la parte inferior del pase (marcada con línea punteada) de la fotocopia.",
        },
      ],
    },

    {
      id: 3,
      type: "steps",
      order: 3,
      title: "Cómo tramitarlo",
      steps: [
        {
          id: 1,
          icon: "documentos",
          description:
            "Vas a necesitar fotocopia y original del DNI y del CUD.",
        },
        {
          id: 2,
          icon: "oficina",
          description:
            "Dirigite a la Oficina de Discapacidad de Tandil",
        },
      ],
    },

   {
      id: 4,
      type: "link",
      order: 4,
      name: "Ubicación en el mapa",
      href: "/map-test",
      icon: "ubicacion"
    },

     {
      id: 5,
      type: "steps",
      order: 5,
      title: "Cómo tramitarlo",
      steps: [
        {
          id: 1,
          icon: "oficina",
          description:
            "Dirigite a la oficina SUBE de Tandil",
        }
      ],
    },

    {
      id: 6,
      type: "link",
      order: 6,
      name: "Ubicación en el mapa",
      href: "/map-test",
      icon: "ubicacion"
    },
  
  ],
};
