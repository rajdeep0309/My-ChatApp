import { useState } from "react";
import { signupFields } from "./constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate();
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

    // const data = {
    //   username: signupState.username,
    //   fullname: signupState.fullname,
    //   email: signupState.email,
    //   avatar: signupState.avatar,
    //   password: signupState.password,
    //   github: signupState.github,
    //   linkedin: signupState.linkedin,
    //   twitter: signupState.twitter,
    //   phone: signupState.phone,
    //   address: signupState.address,
    //   gender: signupState.gender,
    // };

    // console.log({ data });
    // const headers = {
    //   // "Content-Type": "application/json",
    //   'Content-Type': 'multipart/form-data'
    // };
  
      try {
        const response = await axios.post("http://localhost:3001/api/v1/user/register", fd,{
          // headers: headers,
          headers: {
            "Content-Type": 'multipart/form-data',
          },
        });

        if(response.data.success) {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
      // axios.post("http://localhost:3001/api/v1/user/register", fd, {
      //   onUploadProgress: (progressEvent) => {
      //     console.log(
      //       "Upload Progress: " +
      //         Math.round((progressEvent.loaded / progressEvent.total) * 100) +
      //         "%"
      //     );
      //   },
      //   headers: {
      //     "Content-Type": 'form-data',
      //   },

      // })
      // .then((response) => {
      //   console.log(response.data);
      // }).catch((error) => {
      //   console.log(error);
      // });
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
