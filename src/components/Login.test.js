import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

describe("ログイン画面", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  test("メールアドレスの入力フォームが存在する", () => {
    const emailInput = screen.getByLabelText(/メールアドレス:/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  test("パスワードの入力フォームが存在する", () => {
    const passwordInput = screen.getByLabelText(/パスワード:/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("ログインボタンが存在する", () => {
    const loginButton = screen.getByRole("button", { name: /ログイン/i });
    expect(loginButton).toBeInTheDocument();
  });
});
