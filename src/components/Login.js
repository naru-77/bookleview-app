import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";

function Login() {
  const { setUsername } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/reviews");
    }
  }, []);

  const API_BASE_URL =
    "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("メールアドレスとパスワードは必須です。");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/signin`, formData);
      console.log("ログインのレスポンス:", response.status, response.data);
      const userInfoResponse = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      localStorage.setItem("token", response.data.token);
      setUsername(userInfoResponse.data.name);
      navigate("/reviews");
    } catch (error) {
      console.error("ログイン中のエラー:", error);
      setError("ログイン中にエラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">ログイン</button>
        <div>{error && <p>{error}</p>}</div>
      </form>
      <p>
        アカウントをお持ちでない方は<Link to="/signup">こちら</Link>
        からサインアップしてください。
      </p>
    </div>
  );
}

export default Login;
