/// <reference types="vitest" />
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import MyProductCard from "./MyProductCard";

test("Muestra correctamente los datos del producto y responde al botón 'Ver más'", async () => {
  const mockOnView = vi.fn();

  render(
    <ChakraProvider>
      <MyProductCard
        title="Mermelada de Aguaymanto"
        description="Mermelada artesanal con frutos cultivados en Cusco."
        producer="EcoAndes"
        createdAt="19/07/2025"
        onView={mockOnView}
      />
    </ChakraProvider>,
  );

  expect(
    screen.getByRole("heading", { name: /mermelada de aguaymanto/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByText(/mermelada artesanal con frutos/i),
  ).toBeInTheDocument();

  expect(screen.getByText(/ecoandes/i)).toBeInTheDocument();
  expect(screen.getByText(/publicado el 19\/07\/2025/i)).toBeInTheDocument();

  // Verifica el botón
  const button = screen.getByRole("button", { name: /ver más/i });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(mockOnView).toHaveBeenCalledTimes(1);
});
