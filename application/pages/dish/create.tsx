import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface Dish {
  name: string;
  price: string;
  description: string;
  restaurant_key: string;
  image: string;
}

export default function Create() {
  const router = useRouter();
  const [dish, setDish] = useState<Dish>({
    name: "my new dish name",
    price: "20.00",
    description: "my new dish description",
    restaurant_key: router.query.restaurant_key as string,
    image:
      "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1200",
  });

  const create = () => {
    let data = new FormData();
    data.append("name", dish.name);
    data.append("price", dish.price);
    data.append("description", dish.description);
    data.append("image", dish.image);
    data.append("restaurant_key", dish.restaurant_key);

    axios
      .post(`http://localhost:6003/dish/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res: AxiosResponse) => {
        router.push({
          pathname: "/dish/home",
          query: {
            restaurant_key: router.query.restaurant_key,
          },
        });
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
          <div className="flex flex-col justify-start items-start w-full space-y-9">
            <div className="mt-6 flex justify-start flex-col items-start space-y-2">
              <button className="flex flex-row items-center text-gray-600 dark:text-white hover:text-gray-500 space-x-1">
                <svg
                  className="fill-stroke"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.91681 7H11.0835"
                    stroke="currentColor"
                    strokeWidth="0.666667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.91681 7L5.25014 9.33333"
                    stroke="currentColor"
                    strokeWidth="0.666667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.91681 7.00002L5.25014 4.66669"
                    stroke="currentColor"
                    strokeWidth="0.666667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Link
                  href={{
                    pathname: "/dish/home",
                    query: {
                      restaurant_key: router.query.restaurant_key,
                    },
                  }}
                  className="text-sm leading-none"
                >
                  Back
                </Link>
              </button>
              <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-gray-50">
                Add dish
              </p>
            </div>

            <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
              <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
                <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                  <img src={dish.image} alt="headphones" />
                </div>
              </div>

              <div className="p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5">
                <label className="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                  Name
                </label>
                <div className="mt-8">
                  <input
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setDish({
                        ...dish,
                        name: event.target.value,
                      });
                    }}
                    value={dish.name}
                    className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    name=""
                    id=""
                    placeholder="Name"
                  />
                </div>

                <label className="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                  Price
                </label>
                <div className="mt-2 flex-col">
                  <div>
                    <input
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => {
                        setDish({
                          ...dish,
                          price: event.target.value,
                        });
                      }}
                      value={dish.price}
                      className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      name=""
                      id=""
                      placeholder="Price"
                    />
                  </div>
                </div>

                <label className="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                  Description
                </label>
                <div className="mt-2 flex-col">
                  <div>
                    <input
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => {
                        setDish({
                          ...dish,
                          description: event.target.value,
                        });
                      }}
                      value={dish.description}
                      className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      name=""
                      id=""
                      placeholder="Description"
                    />
                  </div>
                </div>

                <label className="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                  Image
                </label>
                <div className="mt-2 flex-col">
                  <input
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setDish({
                        ...dish,
                        image: event.target.value,
                      });
                    }}
                    value={dish.image}
                    className="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    name=""
                    id=""
                    placeholder="Image"
                  />
                </div>

                <button
                  onClick={create}
                  className="mt-8 border border-transparent bg-blue-600 text-white flex justify-center items-center py-4 rounded w-full"
                >
                  <div>
                    <p className="text-base leading-4">Add </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
