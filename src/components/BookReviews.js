import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Paper, Text, Divider, Notification } from "@mantine/core";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

function BookReviews() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const API_BASE_URL =
    "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchBooks() {
      const endpoint = token ? "/books" : "/public/books"; // トークンの有無に応じてエンドポイントを変更
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // トークンがある場合のみ、Authorizationヘッダーを設定

      try {
        const response = await axios.get(
          `${API_BASE_URL}${endpoint}?offset=${(currentPage - 1) * 10}`,
          { headers }
        );
        setBooks(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.ErrorMessageJP);
        } else {
          setError("書籍の取得中にエラーが発生しました。");
        }
      }
    }
    fetchBooks();
  }, [currentPage, token]);

  useEffect(() => {
    async function fetchUserInfo() {
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsername(response.data.name); // APIのレスポンスからユーザー名を取得
        } catch (error) {
          console.error("ユーザー情報の取得中のエラー:", error);
        }
      }
    }
    fetchUserInfo();
  }, [token]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // トークンを削除
    navigate("/login"); // ログイン画面にリダイレクト
  };

  return (
    <Container size={700} style={{ marginTop: 50, padding: 20 }}>
      <Header />
      {/* <Text align="center" size="xl" style={{ marginBottom: 30 }}>
        Book Reviews
      </Text>
      {username ? (
        <>
          <span>Welcome, {username}</span>
          <Link to="/profile">プロフィール編集</Link>
          <button onClick={handleLogout}>ログアウト</button>
        </>
      ) : (
        <button>Login</button>
      )} */}
      {books.map((book, index) => (
        <Paper padding="md" style={{ marginBottom: 20 }} key={book.id}>
          <Text align="center" size="xl" color="red" weight={700}>
            {book.title}
          </Text>
          <Text style={{ marginTop: 10 }} size="sm">
            {book.review}
          </Text>
          {index < books.length - 1 && <Divider style={{ margin: "20px 0" }} />}
        </Paper>
      ))}
      {error && <Notification color="red">{error}</Notification>}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </Container>
  );
}

export default BookReviews;
