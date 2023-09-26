import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Paper, Loader, Notification } from "@mantine/core";
import { useParams } from "react-router-dom";

function BookDetail() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const API_BASE_URL =
    "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";
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

  if (loading) return <Loader />; // ローディング中はローダーを表示

  return (
    <Container>
      <Paper padding="md" shadow="xs">
        {error && <Notification color="red">{error}</Notification>}
        {book && (
          <>
            <h2>{book.title}</h2>
            <p>{book.detail}</p>
            <p>{book.review}</p>
            <p>Reviewed by: {book.reviewer}</p> {/* レビュアーの名前を表示 */}
          </>
        )}
      </Paper>
    </Container>
  );
}

export default BookDetail;
