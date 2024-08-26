import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios"; // npm install axios
import { loginFields } from "./constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import Toaster from "./Toaster";
const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));
export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [loading, setLoading] = useState(false);
  const [logInStatus, setLogInStatus] = useState("");
  const [signInStatus, setSignInStatus] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here

  const authenticateUser = async () => {
    setLoading(true);
    console.log(loginState.email, loginState.password);
    const data = {
      email: loginState.email,
      password: loginState.password,
    };
    console.log({ data });
    const headers = {
      "Content-Type": "application/json",
    };

    //

    // console.log(import.meta.env.URL);
    try {
      const responses = await axios({
        method: "post",
        url: `https://my-chatapp-ygrg.onrender.com/api/v1/user/login`,
		// url: `${import.meta.env.URL}/user/login`,
        data: data,
        headers: headers,
      });
      console.log(responses.data.message);
      setLogInStatus({ msg: "Success", key: Math.random() });

      localStorage.setItem("accessToken", responses.data.data.accessToken);
      localStorage.setItem(
        "userData",
        JSON.stringify(responses.data.data.user)
      );
      navigate("/chat");
      setLoading(false);
    } catch (error) {
      setLogInStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <FormExtra />
        <FormAction handleSubmit={handleSubmit} text="Login" />
      </form>
      {logInStatus ? (
        <Toaster key={logInStatus.key} message={logInStatus.msg} />
      ) : null}
    </>
  );
}
