import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { checkTest } from "./axeHelper";
import ExpandedCardsGroup from "../components/sections/blocks/ExpandedCardsGroup";
import { test, expect, beforeAll } from "vitest";
import { fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/react";

beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = () => { };
});

const mockBlock = {
    id: "block-1",
    children: [
        {
            id: "1",
            data: {
                icon: "estacionamiento",
                title: "Test card desplegable",
                description: "Descripción breve",
            },
            children: [
                {
                    "steps": [
                        {
                            "id": 1,
                            "icon": "documentos",
                            "description": "Vas a necesitar fotocopia y original del DNI y del CUD."
                        },
                        {
                            "id": 2,
                            "icon": "oficina",
                            "description": "Dirigite a la Oficina de Discapacidad de Tandil"
                        }
                    ],
                    "title": "Cómo tramitarlo"
                }
            ]
        },
    ]
};


test("ExpandedCardsGroup accesible en estado inicial", async () => {
    const { container } = render(
        <ExpandedCardsGroup
            block={mockBlock}
            isEditing={false}
            isAdmin={false}
        />
    );

    const results = await checkTest(container);

    expect(results.violations.length).toBe(0);
});


test("ExpandedCardsGroup accesible al expandir", async () => {
  const { container } = render(
    <ExpandedCardsGroup
      block={mockBlock}
      isEditing={false}
      isAdmin={false}
    />
  );

  const buttons = screen.getAllByRole("button");

  fireEvent.click(buttons[0]);

  // Esperar a que el contenido expandido exista
  const region = await screen.findByRole("region");

  // Verificar que cambió el estado accesible
  expect(buttons[0]).toHaveAttribute("aria-expanded", "true");

  //verificar que el region está vinculado correctamente
  expect(region).toHaveAttribute("aria-labelledby");

  const results = await checkTest(container);

  expect(results.violations.length).toBe(0);
});

