import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config.js";
export default function Login({ setUid }) {
  const [login, setLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (loginEmail !== "" && loginPassword !== "") {
      signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredentials) => {
          localStorage.setItem("uid", userCredentials.user.uid);
          setUid(userCredentials.user.uid);
          fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "",
              uid: userCredentials.user.uid,
            }),
          })
            .then(async (res) => {
              let response = await res.json();
              console.log(response);
              navigate("/");
              // setLogin(true);
            })
            .catch((err) => {
              console.log(err);
              window.alert("please try again after some time...");
            });
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    }
    else
    {
        window.alert('Enter valid email address and password');
    }
  };

  const handleRegister = () => {
    if (registerEmail === '' || registeredPassword === '' || userName === '')
    {   
        window.alert('Enter valid username,password,email');
    }
    else
    {
        if (confirmPassword === registeredPassword) {
            createUserWithEmailAndPassword(auth, registerEmail, registeredPassword)
              .then((res) => {
                fetch("http://localhost:8000/register", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ username: userName, uid: res.user.uid }),
                })
                  .then(async (res) => {
                    let response = await res.json();
                    console.log(response);
                    setLogin(true);
                  })
                  .catch((err) => {
                    console.log(err);
                    window.alert("please try again after some time...");
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            window.alert("password mismatch");
          }
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mt-8 items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full mt-5">
        {login === false && (
          <>
            {" "}
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="bg-gray-100 focus:ring-2 outline-none p-3 lg:mr-4 mb-2 lg:mb-4 w-full"
              required
            />
            <br />
          </>
        )}
        {login === true ? (
          <>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
              className="bg-gray-100 focus:ring-2 outline-none p-3 mb-5"
              required
            />
            <br />
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setRegisterEmail(e.target.value);
              }}
              className="bg-gray-100 focus:ring-2 outline-none p-3 mb-4"
              required
            />
            <br />
          </>
        )}
        {login === true ? (
          <>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
              className="bg-gray-100 focus:ring-2 outline-none p-3"
              required
            />
            <br />
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setRegisteredPassword(e.target.value);
              }}
              className="bg-gray-100 focus:ring-2 outline-none p-3 mb-4 w-full"
              required
            />
            <br />
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="bg-gray-100 focus:ring-2 outline-none p-3 w-full"
              required
            />
            <br />
          </>
        )}
        <div className="mt-5">
          {login === true ? (
            <button
              onClick={handleLogin}
              className="bg-pink-700 rounded-full ml-72 text-white px-24 py-4 mt-4 transition hover:bg-cyan-800"
            >
              {" "}
              Login{" "}
            </button>
          ) : (
            <button
              onClick={handleRegister}
              className="bg-pink-700 rounded-full ml-72 text-white px-24 py-4 mt-4 transition hover:bg-cyan-800"
            >
              {" "}
              Register{" "}
            </button>
          )}
          {login === true ? (
            <div className="mt-5 items-center ml-60">
              <p className="inline">If you dont have an account create one </p>
              <button
                onClick={() => {
                  setLogin(false);
                }}
                className="rounded-full bg-purple-400 hover:bg-blue-500 text-white px-6 py-3"
              >
                Register
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
