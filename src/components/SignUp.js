import React, { useEffect, useState } from "react";
import axios from "axios";
import Compressor from "compressorjs";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    userIconUrl: null,
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
    if (!formData.name || !formData.password || !formData.email) {
      setError("全てのフィールドは必須です。");
      return;
    }

    try {
      //  ユーザー情報を登録
      const signUpResponse = await axios.post(`${API_BASE_URL}/users`, {
        name: formData.name,
        password: formData.password,
        email: formData.email,
      });

      // トークンをlocalStorageに保存
      const token = signUpResponse.data.token;
      localStorage.setItem("token", token);

      // ユーザー名をUserContextにセット
      setUsername(formData.name);

      // アイコンをアップロード（存在する場合）
      if (formData.userIconUrl) {
        await handleImageUpload(token);
        setUserIconUrl(response.data.iconUrl);
      }

      navigate("/reviews"); // 登録成功後、ログイン画面にリダイレクト
    } catch (error) {
      if (error.response && error.response.data.ErrorCode) {
        setError(error.response.data.ErrorMessageJP);
      } else {
        setError("サインアップ中にエラーが発生しました。再度お試しください。");
      }
    }
  };

  const handleImageUpload = async (token) => {
    if (!formData.userIconUrl) return;

    const data = new FormData();
    data.append("icon", formData.userIconUrl);

    try {
      const response = await axios.post(`${API_BASE_URL}/uploads`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setFormData({ ...formData, userIconUrl: response.data.iconUrl });
    } catch (error) {
      setError(
        "アイコンのアップロード中にエラーが発生しました。再度お試しください。"
      );
    }
  };

  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    // ファイルのサイズと拡張子をチェック
    const validFileTypes = ["image/jpeg", "image/png"];
    if (file.size > 1 * 1024 * 1024 || !validFileTypes.includes(file.type)) {
      setError(
        "ファイルサイズは1MB以下で、フォーマットはjpgまたはpngである必要があります。"
      );
      return;
    }
    new Compressor(file, {
      quality: 0.6,
      success(result) {
        setFormData({ ...formData, userIconUrl: result });
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
          <input type="file" name="userIcon" onChange={handleImageSelection} />
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
