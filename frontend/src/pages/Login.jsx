import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "YOUR_APP_ID",
        cookie: true,
        xfbml: true,
        version: "v20.0",
      });
    };
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Logged in!", response);
        } else {
          console.log("User cancelled login");
        }
      },
      { scope: "pages_show_list,pages_read_engagement" },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px] text-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome 👋</h1>
        <p className="text-gray-500 mb-6">Login to continue</p>

        {/* Facebook Button */}
        <button
          onClick={handleFacebookLogin}
          className="w-full flex items-center cursor-pointer justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-300"
        >
          {/* Facebook Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path
              d="M22 12c0-5.523-4.477-10-10-10S2 
            6.477 2 12c0 4.991 3.657 9.128 
            8.438 9.878v-6.988H7.898v-2.89h2.54V9.845c0-2.507 
            1.492-3.89 3.777-3.89 1.094 0 
            2.238.195 2.238.195v2.46h-1.26c-1.243 
            0-1.63.771-1.63 1.562v1.875h2.773l-.443 
            2.89h-2.33v6.988C18.343 21.128 22 
            16.991 22 12z"
            />
          </svg>
          Continue with Facebook
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Optional Info */}
        <p className="text-sm text-gray-500">
          We only access your basic profile & pages.
        </p>
      </div>
    </div>
  );
};

export default Login;
