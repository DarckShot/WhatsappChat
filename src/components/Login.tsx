import React, { useState } from "react";
import { LoginProps } from "../types";

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [idInstance, setIdInstance] = useState("1103185513");
  const [apiTokenInstance, setApiTokenInstance] = useState(
    "93b86d976bd84833b81f91ae9fdcffee760a9ddbdcc041ba80",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(idInstance, apiTokenInstance);
  };

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <div className="login-input-box">
          <input
            type="text"
            placeholder="ID Instance"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
          />
          <input
            type="text"
            placeholder="API Token Instance"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
