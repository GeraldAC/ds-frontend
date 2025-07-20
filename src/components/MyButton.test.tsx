import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import MyButton from "./MyButton";

test("Renderiza el botón con el texto correcto y responde al clic", async () => {
  const mockClick = vi.fn();

  render(
    <ChakraProvider>
      <MyButton onClick={mockClick} label="Presionar" />
    </ChakraProvider>,
  );

  const button = screen.getByRole("button", { name: /Presionar/i });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(mockClick).toHaveBeenCalledTimes(1);
});
