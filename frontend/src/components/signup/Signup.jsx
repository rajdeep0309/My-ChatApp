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
  const [avatar, setAvatar] = useState(null);
  const [progress, setProgress] = useState({ starte: false, percentage: 0 });

  const handleChange = (e) => {
    if (e.target.type === "file") setAvatar(e.target.files[0]);
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(signupState);
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    console.log(typeof avatar);
    if (!avatar) {
      console.log("Please upload Profile Picture");
      return;
    }
    // console.log(avatar);
    const fd = new FormData();
    fd.append("username", signupState.username);
    fd.append("fullname", signupState.fullname);
    fd.append("email", signupState.email);
    fd.append("avatar", avatar);
    fd.append("password", signupState.password);
    fd.append("gender", signupState.gender);
    fd.append("github", signupState.github);
    fd.append("linkedin", signupState.linkedin);
    fd.append("twitter", signupState.twitter);
    fd.append("phone", signupState.phone);
    fd.append("address", signupState.address);
      try {
        const response = await axios.post("http://localhost:3001/api/v1/user/register", fd, {
          onUploadProgress: (progressEvent) => {
        console.log(
          "Upload Progress: " +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            "%"
        );
          },
          // headers: headers,
          headers: {
            "Content-Type": 'multipart/form-data',
          },
        });

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      
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
