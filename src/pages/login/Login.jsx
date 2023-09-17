import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [_user, setUser] = useState("");
  const { userTypeError } = props;

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUser(user);
        console.log(user);
        localStorage.setItem("gmail", true);
        if (user) navigate("/admin/dashboard");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div
        className="bg-cover bg-center h-full w-full"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="flex justify-center items-center bg-secondary-blue h-full w-full opacity-80">
          <div className="flex justify-center items-center bg-primary-blue h-2/3 w-1/3 rounded-3xl border-4 border-ternary-blue">
            <div className="p-10 flex justify-center items-center h-full w-full flex flex-col">
              <div className="h-1/4 w-full flex flex-col items-center justify-center">
                <h1 className="text-white text-4xl font-bold p-3">LOGIN</h1>
                <h3 className="text-white text-xl p-3">
                  Please enter your login and password
                </h3>
              </div>
              <div className="h-3/4 w-full flex items-center justify-center">
                <form
                  onSubmit={signIn}
                  className="flex flex-col items-center justify-center w-full p-8"
                >
                  <input
                    className="p-3 w-full bg-ternary-blue rounded-full text-center text-lg text-primary-blue font-medium"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <br />
                  <input
                    className="p-3 w-full bg-ternary-blue rounded-full text-center text-lg text-primary-blue font-medium"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <div className="text-red font-bold p-3">
                    {error && <span>Invalid Email or Password!</span>}
                    {userTypeError === 1 ? <span>Invalid Email or Password!</span> : null}
                  </div>
                  <button
                    type="submit"
                    className="p-2 w-2/3 bg-quternary-blue rounded-full text-white text-2xl border-4 hover:bg-black"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
