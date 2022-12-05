import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import UserContext from "../../context/user";

interface Input {
  name: string;
  address: string;
  telephone: string;
  description: string;
  image: string;
}

export default function Create() {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [error, setError] = useState<string>("");
  const [input, setInput] = useState<Input>({
    name: "",
    address: "",
    telephone: "",
    description: "",
    image:
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200",
  });

  const validate = (): string => {
    if (input.name.length < 2 || input.name.length > 50) {
      return "Name has to be in range of 2 to 50 characters";
    }

    if (input.address.length < 2 || input.address.length > 50) {
      return "Address has to be in range of 2 to 50 characters";
    }

    if (input.telephone.length != 9) {
      return "Telephone in to valid";
    }

    if (input.description.length < 2 || input.description.length > 50) {
      return "Address has to be in range of 2 to 50 characters";
    }

    if (userContext.user === null) {
      return "you need to be logged in to perform this operation";
    }

    return "";
  };

  const createRestaurant = () => {
    const message = validate();
    if (message !== "") {
      setError(message);
      return;
    }

    let data = new FormData();
    data.append("name", input.name);
    data.append("address", input.address);
    data.append("telephone", input.telephone);
    data.append("description", input.description);
    data.append("image", input.image);
    data.append("restaurant_key", userContext.user?._id);

    axios
      .post(`http://localhost:6003/restaurant/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res: AxiosResponse) => {
        setError("");
        router.push("/restaurant/home");
      })
      .catch((err: AxiosError<string>) => {
        setError(err.message);
      });
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="flex justify-center min-h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/5"
            style={{
              backgroundImage: `url('${input.image}')`,
            }}
          ></div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Create your restaurant
              </h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
              </p>

              {error && <p className="mt-8 text-red-500 text-lg">{error}</p>}

              <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Name
                  </label>
                  <input
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setInput({
                        ...input,
                        name: event.target.value,
                      });
                    }}
                    value={input.name}
                    type="text"
                    placeholder="your perfect name"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Address
                  </label>
                  <input
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setInput({
                        ...input,
                        address: event.target.value,
                      });
                    }}
                    value={input.address}
                    type="text"
                    placeholder="2419 Diane Street"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Telephone
                  </label>
                  <input
                    value={input.telephone}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setInput({
                        ...input,
                        telephone: event.target.value,
                      });
                    }}
                    placeholder="22 489 64 00"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Description
                  </label>
                  <input
                    value={input.description}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setInput({
                        ...input,
                        description: event.target.value,
                      });
                    }}
                    placeholder="your@restaurant.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Image
                  </label>
                  <input
                    value={input.image}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setInput({
                        ...input,
                        image: event.target.value,
                      });
                    }}
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <hr />
                <p
                  onClick={() => createRestaurant()}
                  className="cursor-pointer flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <span>Create restaurant</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
