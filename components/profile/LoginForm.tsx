import Router from "next/router";
import React from "react";
import { mutate } from "swr";
import UserAPI from "../../lib/api/user";

const LoginForm = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = React.useCallback(
    (e: any) => setUserName(e.target.value),
    []
  );
  const handlePasswordChange = React.useCallback(
    (e: any) => setPassword(e.target.value),
    []
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, status } = await UserAPI.login(userName, password);
      if (status !== 200) {
        //setErrors(data.errors);
        alert("Sai mật khẩu hoặc tên đăng nhập")
      }
      if (data) {
        window.localStorage.setItem("user", JSON.stringify(data));
        mutate("user", data);
        Router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <ListErrors errors={errors} /> */}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset className="form-group mt-3">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Tên đăng nhập"
              value={userName}
              onChange={handleEmailChange}
            />
          </fieldset>

          <fieldset className="form-group mt-3">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={handlePasswordChange}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right mt-3"
            type="submit"
            disabled={isLoading}
          >
            Đăng nhập
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default LoginForm;
