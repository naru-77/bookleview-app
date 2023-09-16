import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Paper, Text } from "@mantine/core";
import Pagination from "./Pagination";

function BookReviews() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const API_BASE_URL =
    "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";
  const token = localStorage.getItem("token");

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
    <Container size={700} style={{ marginTop: 50 }}>
      {books.map((book) => (
        <Paper padding="md" style={{ marginBottom: 20 }} key={book.id}>
          <Text align="center" size="xl">
            {book.title}
          </Text>
          <Text style={{ marginTop: 10 }}>{book.review}</Text>
        </Paper>
      ))}
      {error && <Text color="red">{error}</Text>}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </Container>
  );
}

export default BookReviews;
