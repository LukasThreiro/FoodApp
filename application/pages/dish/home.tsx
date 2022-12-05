import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DishContext from "../../context/dish";
import { Dish } from "../../context/dish";
import UserContext from "../../context/user";

export default function Home() {
  const router = useRouter();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const dishContext = useContext(DishContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const restaurant_key = router.query.restaurant_key as string;
    const data = new FormData();
    if (restaurant_key !== undefined) {
      data.append("restaurant_key", restaurant_key);
    }

    axios
      .post(`http://localhost:6003/dish/all`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res: AxiosResponse<Dish[]>) => {
        setDishes(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto pt-24">
          {userContext.user && (
            <Link
              className="bg-blue-500 text-white px-8 py-2 rounded-md"
              href={{
                pathname: "/dish/create",
                query: {
                  restaurant_key: router.query.restaurant_key,
                },
              }}
            >
              Add dish
            </Link>
          )}

          <h1 className="mt-12 text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
            Our Executive Team
          </h1>

          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            incidunt ex placeat modi magni quia error alias, adipisci rem
            similique, at omnis eligendi optio eos harum.
          </p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
            {dishes.map((dish) => (
              <div
                key={dish._id}
                className="flex flex-col items-center p-8 transition-colors duration-200 transform group rounded-xl"
              >
                <img
                  className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                  src={dish.image}
                  alt=""
                />

                <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                  {dish.name}
                </h1>

                <p className="mt-2 text-gray-500 capitalize">{dish.price} $</p>

                <p
                  onClick={() =>
                    dishContext.setDishes([...dishContext.dishes, dish])
                  }
                  className="px-8 bg-blue-600 text-white rounded-md cursor-pointer"
                >
                  Add to cart
                </p>

                <div className="flex mt-3 -mx-2">{dish.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
