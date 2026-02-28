export const transporteData = {
    name: "Pases de transporte",
    description: "Es una credencial que sirve para viajar gratis en colectivos, trenes o subtes, usar estacionamiento reservado y tener prioridad en algunos servicios.",
    image: "/assets/icons/transporte_portada.jpg",

    contentBlocks: [
        {
            id: "transporte-group",
            type: "expandedCardsGroup",
            cards: [
                {
                    id: 1,
                    order: 1,
                    card: {
                        id: 1,
                        icon: "pase-nacional",
                        title: "Pase Nacional",
                        description: "Se usa en todo el país para transporte y beneficios nacionales",
                    },
                    content: [
                        {
                            id: 1,
                            type: "steps",
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
                    ]
                },
                {
                    id: 2,
                    order: 2,
                    card: {
                        id: 2,
                        icon: "pase-provincial",
                        title: "Pase Provincial",
                        description: "Se utiliza para gestiones y beneficios dentro de la provincia",
                    },
                    content: [
                        {
                            id: 1,
                            type: "steps",
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
                            id: 2,
                            type: "map",
                            title: "Ubicación en el mapa",
                            section: "transporte",
                            institutionId: "8"
                        },
                    ]
                },
                {
                    id: 3,
                    order: 3,
                    card: {
                        id: 3,
                        icon: "pase-local",
                        title: "Pase Local",
                        description: "Permite cargar los beneficios en la tarjeta SUBE para el transporte urbano de Tandil",
                    },
                    content: [
                        {
                            id: 1,
                            type: "steps",
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
                            id: 2,
                            type: "map",
                            title: "Ubicación en el mapa",
                            section: "transporte",
                            institutionId: "8"
                        },

                    ]
                }
            ]
        }
    ],
};
