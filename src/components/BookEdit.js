import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Notification,
  TextInput,
  Loader,
  Group,
} from "@mantine/core";
import { useAPI } from "./APIContext";

function BookEdit() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = useAPI();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchBookDetail() {
      try {
        const response = await axios.get(`${API_BASE_URL}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBook(response.data);
      } catch (error) {
        setError("書籍の取得中にエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetail();
  }, [id, token]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/books/${id}`,
        {
          title: book.title,
          url: book.url,
          detail: book.detail,
          review: book.review,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/reviews`);
    } catch (error) {
      setError("書籍の更新中にエラーが発生しました。");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/reviews");
    } catch (error) {
      setError("書籍の削除中にエラーが発生しました。");
    }
  };

  if (loading) return <Loader />;

  return (
    <Container>
      {error && <Notification color="red">{error}</Notification>}
      {book && (
        <>
          <TextInput
            label="Title"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.currentTarget.value })}
          />
          <TextInput
            label="URL"
            value={book.url}
            onChange={(e) => setBook({ ...book, url: e.currentTarget.value })}
          />
          <TextInput
            label="Detail"
            value={book.detail}
            onChange={(e) =>
              setBook({ ...book, detail: e.currentTarget.value })
            }
          />
          <TextInput
            label="Review"
            value={book.review}
            onChange={(e) =>
              setBook({ ...book, review: e.currentTarget.value })
            }
          />
          <Group style={{ marginTop: "20px" }}>
            <Button
              onClick={handleUpdate}
              variant="light"
              color="blue"
              radius="md"
            >
              Update
            </Button>
            <Button
              onClick={handleDelete}
              variant="light"
              color="red"
              radius="md"
            >
              Delete
            </Button>
          </Group>
        </>
      )}
    </Container>
  );
}

export default BookEdit;
