export const cnrtData = {
  name: "Comision Nacional de Regulacion del Transporte (CNRT)",
  description:
    "Sistema nacional para reservar pasajes gratuitos de larga distancia para personas con CUD o credencial INCUCAI. Se aplica en todo el país.",
  image: "/assets/icons/cnrt_portada.jpg", 

  contentBlocks: [
    {
      id: 1,
      type: "steps",
      order: 1,
      title: "¿Como funciona?",
      steps: [
        {
          id: 1,
          icon: "ingresar-sitio",
          description:
            "El usuario ingresa al Sistema de Solicitud de Pasajes CNRT.",
        },
        {
          id: 2,
          icon: "turno",
          description:
            "Accede con su DNI/CUIL y el número de su credencial CUD.",
        },
        {
          id: 3,
          icon: "completar-online",
          description: "Completa los datos del viaje (origen, destino, fecha).",
        },
      ],
    },
    {
      id: 2,
      type: "list",
      order: 2,
      title: " Anticipación/plazos útiles:",
      list: [
        {
          id: 1,
          text: "Los cupos se habilitan con 3O días de antelación (práctica habitual del sistema y de las empresas)",
        },
         {
          id: 2,
          text: "La empresa debe emitir y enviar el boleto (suele hacerlo hasta 48 horas antes de la salida)",
        }
      ]
    },
  ],
};
