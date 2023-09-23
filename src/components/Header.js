import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Col,
  Grid,
  Flex,
  Paper,
  Button,
} from "@mantine/core";
import { useUser } from "../components/UserProvider";

function Header() {
  //   const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const { username, setUsername } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  console.log("Username in Header:", username);

  return (
    <Paper
      padding="md"
      shadow="xs"
      style={{
        backgroundColor: "#e0f2f1",
        position: "fixed",
        width: "100%",
        height: 60,
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Container>
        <Grid>
          <Col span={4}></Col> {/* 左側のスペースを確保 */}
          <Col span={4}>
            <Title order={4} align="center">
              <Link to="/reviews">Book Reviews</Link>
            </Title>
          </Col>
          <Col span={4} style={{ textAlign: "right" }}>
            {username ? (
              <Flex align="center" style={{ gap: 10 }}>
                <span>ユーザー名: {username}</span>
                <Link component={Button} to="/profile" color="blue">
                  プロフィール編集
                </Link>
                <Button onClick={handleLogout} color="green">
                  ログアウト
                </Button>
              </Flex>
            ) : (
              <Link component={Button} to="/login" color="blue">
                Login
              </Link>
            )}
          </Col>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Header;
