import axios, { AxiosResponse, AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user";

interface Restaurant {
  _id: string;
  name: string;
  address: string;
  telephone: string;
  description: string;
  image: string;
  createdAt: Date;
}

export default function Home() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    axios
      .post(`http://localhost:6003/restaurant/all`, new FormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res: AxiosResponse) => {
        setRestaurants(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="pt-32 px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
          Restaurants
        </h1>
        <h4 className="text-xl my-4">What would you like to eat?</h4>
        {userContext.user && (
          <Link
            className="bg-blue-500 text-white px-8 py-2 rounded-md"
            href="/restaurant/create"
          >
            Create new restaurant
          </Link>
        )}
        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
          {restaurants.map((restaurant) => (
            <div
              onClick={() =>
                router.push({
                  pathname: `/dish/home`,
                  query: { restaurant_key: restaurant._id },
                })
              }
              className="lg:flex cursor-pointer"
              key={restaurant._id}
            >
              <img
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src={restaurant.image}
                alt=""
              />

              <div className="flex flex-col justify-between py-6 lg:mx-6">
                <a
                  href="#"
                  className="text-xl font-semibold text-gray-800 hover:underline dark:text-white "
                >
                  {restaurant.name}
                </a>
                <span className="text-md">{restaurant.description}</span>

                <span className="text-sm text-gray-500 dark:text-gray-300">
                  Created: {restaurant.createdAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
