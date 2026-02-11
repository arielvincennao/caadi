
export const beneficiosData = {
  name: "Beneficios sociales",
  description: "",
  image: "/assets/icons/beneficios_portada.jpg",

  contentBlocks: [

    {
      id: 1,
      type: "expandedCard",
      order: 1,
      card: {
          id: 1,
          icon: "beneficios",
          title: "Pensión por Discapacidad",
          description: "Prestacion económica para personas que no registran trabajo ni ingresos propios."
          
      },
      content: [
      {
      id: 1,
      type: "text",
      order: 1,
      title: "Requisitos principales",
      list: [
        {
          id: 1,
          text: "Certificado Único de Discapacidad vigente.",
        },
         {
          id: 2,
          text: "No tener trabajo registrado ni ingresos propios.",
        },
        {
          id: 3,
          text: "No contar con bienes o prestaciones que superen los límites establecidos por ANSES.",
        }
      ]
    },
    {
        id: 2,
        type: "steps",
        title: "Dónde tramitarlo",
        steps: [
          {
            id: 1,
            icon: "turno-medico",
            description:
              "Vas a necesitar un turno en ANSES.",
          },
          {
            id: 2,
            icon: "documentos",
            description:
              "Presentar DNI, CUD y documentación que soliciten según el caso.",
          },
          
        ],
      },
       {
      id: 3,
      type: "link",
      order: 3,
      name: "Reservar turno en ANSES",
      href: "https://www.anses.gob.ar/turnos"
    },
      ]
    },
     {
    id: 2,
    type: "expandedCard",
    order: 2,
    card: {
        id: 2,
        icon: "buscar-mapa",
        title: "Exención de Patente",
        description: "Beneficio que permite no pagar la patente del vehículo destinado a su traslado"
    },
    content: [
       {
      id: 1,
      type: "text",
      order: 1,
      title: "Requisitos principales",
      list: [
        {
          id: 1,
          text: "Certificado Único de Discapacidad vigente.",
        },
         {
          id: 2,
          text: "El vehículo debe estar a nombre de la persona con discapacidad o de un familiar/tutor que use para su traslado.",
        },
        {
          id: 3,
          text: "No debe superar los valores permitidos para exención (depende de cada provincia).",
        }
      ]
    },
      {
        id: 2,
        type: "steps",
        title: "Cómo tramitarlo",
        steps: [
          {
            id: 1,
            icon: "ingresar-sitio",
            description:
              "Vas a necesitar cargar DNI, CUD y documentación del vehículo en la página de ARBA (Provincia de Buenos Aires).",
          },
         
        ],
      },
      {
        id: 3,
        type: "link",
        order: 4,
        name: "Iniciá el trámite en ARBA",
        href: "https://www.arba.gov.ar/GuiaTramites/TramiteSeleccionado.asp?tramite=249&categ=37",
      },
    ]
  },
  {
      id: 3,
      type: "expandedCard",
      order: 1,
      card: {
          id: 1,
          icon: "beneficios",
          title: "Exención de peajes",
          description: "Habilita a circular por autopistas y rutas sin pagar peaje."
          
      },
      content: [
      {
      id: 1,
      type: "text",
      order: 1,
      title: "Requisitos principales",
      list: [
        {
          id: 1,
          text: "Certificado Único de Discapacidad vigente.",
        },
         {
          id: 2,
          text: "Vehiculo registrado para uso de la persona con discapacidad.",
        },
        
      ]
    },
    {
        id: 2,
        type: "steps",
        title: "Dónde tramitarlo",
        steps: [
          {
            id: 1,
            icon: "turno-medico",
            description:
              "En la provincia de Buenos Aires, se gestiona online o por formulario de la concesionaria, adjuntando CUD y cédula del auto.",
          },
        ],
      },
      ]
    },
    {
      id: 4,
      type: "expandedCard",
      order: 1,
      card: {
          id: 1,
          icon: "beneficios",
          title: "Estacionamiento libre",
          description: "Permite estacionar en zonas permitidas sin límite de tiempo y acceder a lugares reservados para personas con discapacidad"
          
      },
      content: [
      {
      id: 1,
      type: "text",
      order: 1,
      title: "Requisito obligatorio",
      list: [
        {
          id: 1,
          text: "Debés tener la calcomanía/credencial de discapacidad visible en el parabrisas.",
        },
        ]
      },
    ]
    },
     {
      id: 5,
      type: "expandedCard",
      order: 5,
      card: {
          id: 1,
          icon: "beneficios",
          title: "Tarifa social",
          description: "Reduce el costo mensual de luz, gas, agua y otros servicios"
          
      },
      content: [
      {
      id: 1,
      type: "text",
      order: 1,
      title: "Requisitos principales",
      list: [
        {
          id: 1,
          text: "CUD o situación social que justifique el beneficio.",
        },
        {
          id: 2,
          text: "Último DNI y número de cliente del servicio.",
        }
        ]
      },
    ]
    },
  ]
};
