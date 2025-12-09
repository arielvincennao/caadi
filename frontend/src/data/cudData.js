export const cudData = {
  name: "Certificado Único de Discapacidad",
  description: "El CUD (Certificado Único de Discapacidad) es un documento oficial que entrega el Estado para reconocer la discapacidad de una persona. Es gratuito y válido en todo el país.",
  image: "/assets/icons/cud_portada.svg",

  contentBlocks: [

    {
      id: 1,
      type: "steps",
      title: "Pasos para tramitarlo",
      order: 1,
      steps: [
        {
          id: 1,
          icon: "/assets/icons/cud_step1.svg",
          description:
            "Pedir turno en la oficina de INFORME del Hospital Ramón Santamarina, Tandil."
        },
        {
          id: 2,
          icon: "/assets/icons/cud_step2.svg",
          description:
            "Presentar DNI y estudios médicos actualizados."
        },
        {
          id: 3,
          icon: "/assets/icons/cud_step3.svg",
          description: "Asistir a la Junta Evaluadora, donde profesionales revisan la documentación y realizan la evaluación"
        },
        {
          id: 4,
          icon: "/assets/icons/cud.svg",
          description: "Retirar el CUD cuando te avisen que está listo."
        }
      ]
    },
    {
      id: 2,
      type: "link",
      order: 2,
      name: "Leer más en Mi Argentina",
      href: "https://www.argentina.gob.ar/servicio/como-obtener-el-certificado-unico-de-discapacidad-cud"
    },
  ]
};
