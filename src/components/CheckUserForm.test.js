import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckUserForm } from "./CheckUserForm";

test("check initial values", () => {
  render(<CheckUserForm />);
  const usernameInput = screen.getByRole("textbox", { name: /username/i });
  const checkButton = screen.getByRole("button", { name: /check/i });
  const acceptanceCheckbox = screen.getByRole("checkbox", {
    name: /accept terms and conditions/i,
  });

  expect(usernameInput).not.toHaveValue();
  expect(acceptanceCheckbox).not.toBeChecked();
  expect(checkButton).toBeDisabled();
});

test("button enables when form is filled", () => {
  render(<CheckUserForm />);
  const usernameInput = screen.getByRole("textbox", { name: /username/i });
  const checkButton = screen.getByRole("button", { name: /check/i });
  const acceptanceCheckbox = screen.getByRole("checkbox", {
    name: /accept terms and conditions/i,
  });

  userEvent.type(usernameInput, "exampleUser");
  userEvent.click(acceptanceCheckbox);

  expect(checkButton).toBeEnabled();
});

test("Validate form results and reset", async () => {
  render(<CheckUserForm />);
  const usernameInput = screen.getByRole("textbox", { name: /username/i });
  const acceptanceCheckbox = screen.getByRole("checkbox", {
    name: /accept terms and conditions/i,
  });
  const checkButton = screen.getByRole("button", { name: /check/i });

  userEvent.type(usernameInput, "existinguser");
  userEvent.click(acceptanceCheckbox);

  expect(checkButton).toBeEnabled();
  userEvent.click(checkButton);

  const existsMessage = await screen.findByText(/exists/i);
  expect(existsMessage).toBeInTheDocument();
  expect(existsMessage).toHaveStyle({ color: "red" });

  expect(usernameInput).not.toHaveValue();
  expect(acceptanceCheckbox).not.toBeChecked();
  expect(checkButton).toBeDisabled();

  userEvent.type(usernameInput, "availableuser");
  userEvent.click(acceptanceCheckbox);

  expect(checkButton).toBeEnabled();
  userEvent.click(checkButton);

  const availableMessage = await screen.findByText(/available/i);
  expect(usernameInput).not.toHaveValue();
  expect(acceptanceCheckbox).not.toBeChecked();
  expect(checkButton).toBeDisabled();
  expect(availableMessage).toBeInTheDocument();
  expect(availableMessage).toHaveStyle({ color: "green" });
});
