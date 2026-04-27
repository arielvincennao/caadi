import React from "react";
import { render } from "@testing-library/react";
import { checkTest } from "./axeHelper";
import CardSection from "../components/sections/CardSection";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import { AuthProvider } from "../context/AuthContext";


const mockCard = {
    icon: "cud",
    title: "Evento de prueba",
    description: "Descripción de prueba",
};

test("Card básica accesible", async () => {
    const { container } = render(
        <BrowserRouter>
            <AuthProvider>
                <CardSection card={mockCard} />
            </AuthProvider>
        </BrowserRouter>);
    const results = await checkTest(container);

    expect(results.violations.length).toBe(0);
});