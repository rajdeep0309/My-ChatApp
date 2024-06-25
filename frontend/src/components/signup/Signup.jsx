import { useState } from "react";
import { signupFields } from "./constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "axios";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    console.log(typeof signupState.avatar);
    var data = new FormData();
    data.append("username", signupState.username);
    // data.append('fullname', signupState.fullname)
    // data.append('email', signupState.email)
    // data.append('file', signupState.avatar[0])
    // data.append('password', signupState.password)
    // data.append('gender', signupState.gender)
    const data = {
      username: signupState.username,
      fullname: signupState.fullname,
      email: signupState.email,
      avatar: signupState.avatar,
      password: signupState.password,
      github: signupState.github,
      linkedin: signupState.linkedin,
      twitter: signupState.twitter,
      phone: signupState.phone,
      address: signupState.address,
      gender: signupState.gender,
    };

    // console.log({ data });
    const headers = {
      "Content-Type": "application/json",
      // 'Content-Type': 'multipart/form-data'
    };
    try {
      const responses = await axios({
        method: "post",
        url: "http://localhost:3001/api/v1/user/register",
        data: data,
        formData: true,
        headers: headers,
      });
      console.log(responses.data.data.accessToken);
    } catch (error) {
      console.log(error);
    }
    // localStorage.setItem('accessToken',responses.data.data.accessToken);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
