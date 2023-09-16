import React, { useState } from "react";
import axios from "axios";
import Compressor from "compressorjs";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
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

  const API_BASE_URL =
    "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.password || !formData.email) {
      setError("全てのフィールドは必須です。");
      return;
    }
    const userData = {
      name: formData.name,
      password: formData.password,
      email: formData.email,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/users`, {
        ...userData,
        userIconUrl: formData.userIconUrl, // アイコンのURLを追加
      });
      console.log("SignUp Response:", response.status, response.data);
      navigate("/login"); // 登録成功後、ログイン画面にリダイレクト
    } catch (error) {
      console.error("データのアップロード中にエラーが発生しました:", error);
      setError("サインアップ中にエラーが発生しました。再度お試しください。");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    new Compressor(file, {
      quality: 0.6,
      async success(result) {
        try {
          const formData = new FormData();
          formData.append("icon", result);

          const response = await axios.post(
            `${API_BASE_URL}/uploads`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer YOUR_JWT_TOKEN`,
              },
            }
          );
          setFormData({ ...formData, userIconUrl: response.data.iconUrl });
        } catch (error) {
          console.error(
            "アイコンのアップロード中にエラーが発生しました:",
            error
          );
          setError(
            "アイコンのアップロード中にエラーが発生しました。再度お試しください。"
          );
        }
      },
      error(err) {
        console.log(err.message);
        setError("画像のリサイズ中にエラーが発生しました。");
      },
    });
  };

  return (
    <div>
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>メールアドレス:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ユーザーアイコン:</label>
          <input type="file" name="userIcon" onChange={handleImageUpload} />
        </div>
        <button type="submit">登録</button>
        <div>{error && <p>{error}</p>}</div>
      </form>
      <p>
        既にアカウントをお持ちの方は<Link to="/login">こちら</Link>
        からログインしてください。
      </p>
    </div>
  );
}

export default SignUp;
