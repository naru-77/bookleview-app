import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Title,
  Input,
  Button,
  Notification,
} from "@mantine/core";
import { useUser } from "../components/UserProvider";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { username, setUsername } = useUser();
  const [newUsername, setNewUsername] = useState(username); // 新しいユーザー名を保持するためのステート

  const [error, setError] = useState(null);
  const API_BASE_URL =
    "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.name);
      } catch (error) {
        setError("ユーザー情報の取得中にエラーが発生しました。");
      }
    }
    fetchUserInfo();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/users`,
        { name: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsername(newUsername);
      navigate("/reviews");
    } catch (error) {
      setError("ユーザー情報の更新中にエラーが発生しました。");
    }
  };

  return (
    <Container>
      <Title order={2}>ユーザー情報編集</Title>
      <div style={{ marginBottom: 10 }}>
        <label>ユーザー名:</label>
        <Input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>

      <Button onClick={handleUpdate}>更新</Button>
      {error && <Notification color="red">{error}</Notification>}
    </Container>
  );
}

export default UserProfile;
