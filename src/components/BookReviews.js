import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Paper, Text, Divider, Notification } from "@mantine/core";
import Pagination from "./Pagination";
import AuthContext from "./AuthContext";

function BookReviews() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const API_BASE_URL =
    "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";
  const token = localStorage.getItem("token");
  const { isLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUsername() {
      // ユーザー情報取得APIを呼び出してユーザー名を取得します。
      const response = await axios.get(`${API_BASE_URL}/username`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(response.data.username);
    }

    if (isLoggedIn) {
      fetchUsername();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/books?offset=${(currentPage - 1) * 10}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
  }, [currentPage]);

  return (
    <Container size={700} style={{ marginTop: 50, padding: 20 }}>
      <Text align="center" size="xl" style={{ marginBottom: 30 }}>
        Book Reviews
      </Text>
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
