import axios, { AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import Context, { User } from "../../context/user";

interface Input {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const FormData = require("form-data");
  const [error, setError] = useState<string>("");
  const [input, setInput] = useState<Input>({
    email: "",
    password: "",
  });
  const userContext = useContext(Context);

  const login = () => {
    if (!/\S+@\S+\.\S+/.test(input.email)) {
      setError("please provide valid email address");
      return;
    }

    if (input.password.length < 2) {
      setError("password cannot be shorter than 2 characters");
      return;
    }

    if (input.password.length < 2) {
      setError("password cannot be shorter than 2 characters");
      return;
    }

    let data = new FormData();

    data.append("email", input.email);
    data.append("password", input.password);

    axios
      .post(`http://localhost:6003/account/login`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res: AxiosResponse<User>) => {
        setError("");
        userContext.setUser(res.data);
        router.push("/");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        setError("error has occurred, try again later");
      });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">Brand</h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                  Brand
                </h2>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Sign in to access your account
                </p>
                {error != "" && <p className="text-red-500">{error}</p>}
              </div>

              <div className="mt-8">
                <div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Email
                    </label>
                    <input
                      value={input.email}
                      type="email"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => {
                        setInput({
                          ...input,
                          email: event.target.value,
                        });
                      }}
                      placeholder="your email"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Password
                    </label>
                    <input
                      type="password"
                      value={input.password}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => {
                        setInput({
                          ...input,
                          password: event.target.value,
                        });
                      }}
                      placeholder="your password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={login}
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Sign in
                    </button>
                  </div>
                </div>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{" "}
                  <Link
                    href="/authentication/register"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
