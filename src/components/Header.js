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
  const { username, setUsername, userIconUrl } = useUser();

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
        backgroundColor: "#f5f5f5",
        position: "fixed",
        width: "100%",
        height: 90, // ヘッダーの高さを広げる
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Container>
        <Grid>
          <Col span={4}></Col>
          <Col span={8}>
            <Flex
              align="center"
              style={{
                height: "100%",
                marginLeft: "100px",
                marginTop: "5px",
              }}
            >
              {" "}
              {/* 中央配置のためのFlexを追加 */}
              <Title order={4} align="center">
                <Link
                  to="/reviews"
                  style={{
                    textDecoration: "none",
                    color: "#333",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                >
                  Book Reviews
                </Link>
              </Title>
            </Flex>
          </Col>
          <Col span={8}>
            <div style={{ marginLeft: "190px" }}>
              {username ? (
                <Flex
                  align="center"
                  justify="space-between"
                  style={{ gap: 10 }}
                >
                  {userIconUrl && (
                    <img
                      src={userIconUrl}
                      alt="user icon"
                      width={50}
                      height={50}
                    />
                  )}
                  <Button
                    component={Link}
                    to="/profile"
                    variant="light"
                    color="blue"
                  >
                    プロフィール編集
                  </Button>
                  <Button onClick={handleLogout} variant="light" color="red">
                    ログアウト
                  </Button>
                  <span>ユーザー名: {username}</span>
                </Flex>
              ) : (
                <Link
                  component={Button}
                  to="/login"
                  variant="light"
                  color="blue"
                >
                  Login
                </Link>
              )}
            </div>
          </Col>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Header;
