import { useState } from "react";
import frame from "../assets/images/login-frame.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleuserName = (e) => setUserName(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  const handlePasswordShow = () => setShow(!show);
  return (
    <div className="w-full min-h-screen">
      <img
        src={frame}
        className="absolute object-cover w-full h-full "
        alt="login background"
      />
      <div className="relative flex items-center justify-center w-full h-full ">
        <div className=" bg-white/50 backdrop-blur-lg rounded-[40px] py-20 px-24 space-y-8">
          <h1
            className="text-3xl text-center uppercase login-title drop-shadow-xl text-gray-50"
            style={{ textShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)" }}
          >
            Promocode Dashboard
          </h1>
          <div className="px-4 font-normal space-y-7">
            <h2 className="text-4xl font-normal text-gray-50">Login</h2>
            <form className="px-0.5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-50">Usermane</label>
                <input
                  type="text"
                  className="w-full px-5 py-3 rounded-md"
                  placeholder="Usermane"
                  value={userName}
                  onChange={handleuserName}
                />
              </div>
              <div className="flex flex-col gap-2 mt-8">
                <label className="text-sm text-gray-50">Password</label>
                <div className="relative w-full bg-white rounded-md">
                  <input
                    type={show ? "text" : "password"}
                    className="w-full max-w-xs px-5 py-3 rounded-md"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                  />
                  <div
                    className="absolute -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    onClick={handlePasswordShow}
                  >
                    {show ? (
                      <EyeIcon className="w-5 stroke-gray-400 hover:stroke-gray-900" />
                    ) : (
                      <EyeSlashIcon className="w-5 stroke-gray-400 hover:stroke-gray-900" />
                    )}
                  </div>
                </div>
              </div>

              <button className="w-full text-xl rounded-md submit text-gray-50 bg-gradient-to-r mt-12 py-3 hover:scale-105 transition-all from-[#F25019] to-[#F79E1B]">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
