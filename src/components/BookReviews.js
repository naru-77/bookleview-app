import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Paper,
  Text,
  Divider,
  Notification,
  Button,
  Group,
} from "@mantine/core";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAPI } from "./APIContext";

function BookReviews() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const API_BASE_URL = useAPI();
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
      <Button
        component={Link}
        to="/new"
        style={{ marginBottom: "20px" }}
        variant="light"
        color="blue"
        fullWidth
        radius="md"
      >
        新しいレビューを投稿
      </Button>
      {books.map((book, index) => (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          key={book.id}
          style={{ marginBottom: 20 }}
        >
          <Group justify="space-between" mt="md" mb="xs">
            <Text
              fw={500}
              component={Link}
              to={`/detail/${book.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {book.title}
            </Text>
            {book.isMine && (
              <Button
                component={Link}
                to={`/edit/${book.id}`}
                variant="light"
                color="blue"
                radius="md"
              >
                Edit
              </Button>
            )}
          </Group>
          <Text size="sm" c="dimmed">
            {book.review}
          </Text>
          {index < books.length - 1 && <Divider style={{ margin: "20px 0" }} />}
        </Card>
      ))}
      {error && <Notification color="red">{error}</Notification>}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </Container>
  );
}

export default BookReviews;
