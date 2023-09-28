import React, { useState } from "react";
import axios from "axios";
import { Container, Paper, Input, Button, Notification } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAPI } from "./APIContext";

function NewBookReview() {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    detail: "",
    review: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = useAPI();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/books`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/reviews"); // 投稿成功後、レビュー一覧画面にリダイレクト
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.ErrorMessageJP
      ) {
        setError(error.response.data.ErrorMessageJP);
      } else {
        setError("書籍の投稿中にエラーが発生しました。");
      }
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px", marginTop: "45px" }}>
          <Input
            label="タイトル *"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="書籍のタイトルを入力してください"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Input
            label="URL (オプション)"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="書籍のリンクを入力してください (オプション)"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Input
            label="詳細 *"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            placeholder="書籍の詳細を入力してください"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Input
            label="レビュー *"
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="書籍のレビューを入力してください"
          />
        </div>
        <Button type="submit" variant="light" color="blue" radius="md">
          投稿
        </Button>
      </form>
      {error && (
        <Notification color="red" style={{ marginTop: "15px" }}>
          {error}
        </Notification>
      )}
    </Container>
  );
}

export default NewBookReview;
