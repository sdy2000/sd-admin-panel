import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  return (
    <div className="bg-black min-h-screen grid place-items-center">
      <button
        className="bg-white px-8 py-4 flex gap-2 items-center hover:bg-gray-400 duration-200 rounded-lg"
        onClick={() => signIn("google")}
      >
        <FcGoogle size={30} /> Sign In with Google
      </button>
    </div>
  );
};
