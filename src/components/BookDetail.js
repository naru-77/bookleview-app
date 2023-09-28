import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Loader,
  Notification,
  Text,
  Button,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useAPI } from "./APIContext";
import "../style/Loader.css";
import { Link } from "react-router-dom";

function BookDetail() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const API_BASE_URL = useAPI();
  const token = localStorage.getItem("token"); // ローカルストレージからトークンを取得

  useEffect(() => {
    async function fetchBookDetail() {
      try {
        const response = await axios.get(`${API_BASE_URL}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // トークンをヘッダーに設定
          },
        });
        setBook(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.ErrorMessageJP); // エラーメッセージを設定
        } else {
          setError("書籍の取得中にエラーが発生しました。");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetail();
  }, [id, token]);

  useEffect(() => {
    console.log(`Book with ID ${id} has been viewed.`); // ログをコンソールに出力
    // APIにログを送信
    async function sendLog() {
      try {
        await axios.post(
          `${API_BASE_URL}/logs`,
          { selectBookId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("ログの送信中にエラーが発生しました。", error);
      }
    }
    sendLog();
  }, [id, token]);

  if (loading)
    return (
      <div className="loaderContainer">
        <Loader />
      </div>
    );

  return (
    <Container className="containerCentered">
      <Card
        padding="md"
        shadow="xs"
        style={{ borderRadius: "15px", width: "80%", marginBottom: "20px" }}
      >
        {error && <Notification color="red">{error}</Notification>}
        {book && (
          <>
            <Text align="center" size="xl">
              {book.title}
            </Text>
            <Text>{book.detail}</Text>
            <Text>{book.review}</Text>
            <Text>Reviewed by: {book.reviewer}</Text>
          </>
        )}
      </Card>
      <Button
        component={Link}
        to="/reviews"
        style={{ marginBottom: "20px" }}
        variant="light"
        color="blue"
        radius="md"
      >
        戻る
      </Button>
    </Container>
  );
}

export default BookDetail;
