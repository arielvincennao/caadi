export const turismoData = {
  name: "Turismo accesible",
  description: "Aquí podrás encontrar las opciones de turismo que ofrecen los Parques Nacionales argentinos.",
  image: "/assets/icons/turismo_portada.jpg",

  contentBlocks: [

    {
      id: 1,
      type: "card",
      order: 1,
      cards: [
        {
          id: 1,
          icon: "buscar-mapa",
          title: "Buscá por parque",
          description: "Navegá por el mapa de áreas protegidas de Argentina",
          href: "https://www.argentina.gob.ar/interior/ambiente/parquesnacionales/areas-protegidas",
        },
        {
          id: 2,
          icon: "buscar-actividad",
          title: "Buscá por experiencia",
          description: "Conocé las actividades que ofrecen los parques",
          href: "https://www.argentina.gob.ar/interior/ambiente/parquesnacionales/experiencias-del-turismo-de-naturaleza"
        }
      ]
    }
  
  ]
};
