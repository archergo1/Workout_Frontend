import { useState } from "react";
// import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    // 防止跳轉頁面
    e.preventDefault();
    // console.log(email, password);
    setIsLoading(true);
    setError(null);
    try {
      // 等待登入結果
      const result = await login(email, password);

      // 如果 login 函數返回錯誤訊息，設置錯誤狀態
      if (result && result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "登入失敗，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
