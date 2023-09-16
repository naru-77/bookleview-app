describe("ログインページのテスト", () => {
  beforeEach(() => {
    // ログインページにアクセス
    cy.visit("http://localhost:3000/login");
  });

  it("両方のフィールドが空の場合、エラーメッセージが表示される", () => {
    // ログインボタンをクリック
    cy.get("button[type=submit]").click();

    // エラーメッセージを確認
    cy.get("p").should("contain", "メールアドレスとパスワードは必須です。");
  });

  it("パスワードが未入力の場合、エラーメッセージが表示される", () => {
    // メールアドレスだけを入力
    cy.get("input[name=email]").type("test@example.com");

    // ログインボタンをクリック
    cy.get("button[type=submit]").click();

    // エラーメッセージを確認
    cy.get("p").should("contain", "メールアドレスとパスワードは必須です。");
  });

  it("メールアドレスが未入力の場合、エラーメッセージが表示される", () => {
    // パスワードだけを入力
    cy.get("input[name=password]").type("testpassword");

    // ログインボタンをクリック
    cy.get("button[type=submit]").click();

    // エラーメッセージを確認
    cy.get("p").should("contain", "メールアドレスとパスワードは必須です。");
  });

  // 以下のテストは、サーバの応答に依存するため、実際の環境で動作するかどうかを確認する必要があります。
  it("メールアドレスとパスワードが正しい場合、成功の応答を受け取る", () => {
    // メールアドレスとパスワードを入力
    cy.get("input[name=email]").type("s2320631@u.tsukuba.ac.jp");
    cy.get("input[name=password]").type("testpassword");

    // ログインボタンをクリック
    cy.get("button[type=submit]").click();
  });
});
