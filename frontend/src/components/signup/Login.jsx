import { useState, useEffect } from "react";
import axios from "axios"; // npm install axios
import { loginFields } from "./constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // useEffect(() => {
    authenticateUser();
    // }, [loginState]);
  };

  //Handle Login API Integration here

  const authenticateUser = async () => {
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
    try {
      const responses = await axios({
        method: "post",
        url: "http://localhost:3001/api/v1/user/login",
        data: data,
        headers: headers,
      });
      console.log(responses.data.message);
      localStorage.setItem("accessToken", responses.data.data.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
}
