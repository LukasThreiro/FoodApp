import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import DishContext, { Dish } from "../../context/dish";

export default function Home() {
  const router = useRouter();
  const dishContext = useContext(DishContext);

  const uniques: { [key: string]: Dish[] } = {};
  for (var i = 0; i < dishContext.dishes.length; i++) {
    const id = dishContext.dishes[i]._id;
    if (uniques[id]) {
      uniques[id].push(dishContext.dishes[i]);
    } else {
      uniques[id] = [dishContext.dishes[i]];
    }
  }

  let total: number = 0;
  for (var key in uniques) {
    if (Object.prototype.hasOwnProperty.call(uniques, key)) {
      for (const dish of uniques[key]) {
        total += dish.price;
      }
    }
  }

  let shipping: number = 0;
  if (dishContext.dishes.length != 0 && total < 50) {
    shipping = 10;
  }

  type Request = {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    card: string;
    total: number;
  };

  const [input, setInput] = useState<Request>({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    card: "",
    total: 0,
  });

  const [error, setError] = useState<string>("");
  const validate = (): string => {
    if (input.name.length < 2 || input.name.length > 50) {
      return "Name has to be in range of 2 to 50 characters";
    }

    if (!/\S+@\S+\.\S+/.test(input.email)) {
      return "please provide valid email address";
    }

    if (input.address.length < 2 || input.address.length > 50) {
      return "Address has to be in range of 2 to 50 characters";
    }

    if (input.city.length < 2 || input.city.length > 50) {
      return "City has to be in range of 2 to 50 characters";
    }

    if (input.state.length < 2 || input.state.length > 50) {
      return "State has to be in range of 2 to 50 characters";
    }

    if (input.card.length != 10) {
      return "Invalid card number";
    }

    return "";
  };

  const create = () => {
    const message = validate();
    if (message !== "") {
      setError(message);
      return;
    }

    let data = new FormData();
    data.append("name", input.name);
    data.append("address", input.address);
    data.append("city", input.city);
    data.append("state", input.state);
    data.append("card", input.card);
    data.append("total", input.total.toString());
    data.append("items", JSON.stringify(dishContext.dishes));

    axios
      .post(`http://localhost:6003/order/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((_: AxiosResponse) => {
        setError("");
        dishContext.setDishes([]);
        router.push("/success");
      })
      .catch((err: AxiosError) => {
        setError(err.message);
        console.log(err);
      });
  };

  return (
    <>
      <header className="flex flex-wrap">
        <nav className="flex w-screen justify-between bg-slate-50 text-gray-600">
          <div className="w-full xl:px-12 py-6 px-5 flex space-x-12 items-center ">
            <a className="text-2xl font-bold" href="#">
              Your Logo
            </a>
            <ul className="hidden md:flex mx-auto px-5 font-semibold space-x-12">
              <li>
                <a className="hover:text-gray-900" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900" href="#">
                  Products
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
            <div className="flex-grow border-2 py-1 px-3 lg:flex justify-between round hidden">
              <input
                className="flex-grow text-gray-600 focus:outline-none"
                type="text"
                placeholder="Search Product ..."
              />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400 hover:text-gray-600 transition duration-100 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
            <div className="hidden xl:flex items-center text-gray-600 space-x-5 items-center">
              <a className="hover:text-gray-900" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </a>
              <a className="flex items-center hover:text-gray-900" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute flex ml-4 -mt-5">
                  <span className="h-3 w-3 animate-ping absolute inline-flex rounded-full bg-pink-500 opacity-75"></span>
                  <span className="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
                </span>
              </a>
            </div>
          </div>
          <a
            className="flex xl:hidden items-center mr-6 hover:text-gray-900"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="flex absolute -mt-5 ml-4">
              <span className="h-3 w-3 absolute bg-pink-500 opacity-75 inline-flex rounded-full animate-ping"></span>
              <span className="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
            </span>
          </a>
          <a
            className="xl:hidden self-center mr-12 hover:text-gray-900"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </a>
        </nav>
      </header>
      <div className="h-screen grid grid-cols-3">
        <div className="lg:col-span-2 col-span-3 bg-slate-50 space-y-8 px-12">
          <div className="rounded-md">
            <form id="payment-form" method="POST" action="">
              <section>
                {error && <p className="text-red-500 text-xl">{error}</p>}
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                  Shipping & Billing Information
                </h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded-lg text-gray-600">
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">Name</span>
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
                      name="name"
                      className="focus:outline-none px-3"
                      placeholder="Try Odinsson"
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">Email</span>
                    <input
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => {
                        setInput({
                          ...input,
                          email: event.target.value,
                        });
                      }}
                      value={input.email}
                      name="email"
                      type="email"
                      className="focus:outline-none px-3"
                      placeholder="try@example.com"
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">Address</span>
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
                      name="address"
                      className="focus:outline-none px-3"
                      placeholder="10 Street XYZ 654"
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">City</span>
                    <input
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => {
                        setInput({
                          ...input,
                          city: event.target.value,
                        });
                      }}
                      value={input.city}
                      name="city"
                      className="focus:outline-none px-3"
                      placeholder="San Francisco"
                    />
                  </label>
                  <label className="inline-flex w-2/4 border-gray-200 py-3">
                    <span className="text-right px-2">State</span>
                    <input
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => {
                        setInput({
                          ...input,
                          state: event.target.value,
                        });
                      }}
                      value={input.state}
                      name="state"
                      className="focus:outline-none px-3"
                      placeholder="CA"
                    />
                  </label>
                </fieldset>
              </section>
            </form>
          </div>
          <div className="rounded-md">
            <section>
              <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Payment Information
              </h2>
              <fieldset className="mb-3 bg-white shadow-lg rounded-lg text-gray-600">
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="text-right px-2">Card</span>
                  <input
                    name="card"
                    className="focus:outline-none px-3 w-full"
                    placeholder="Card number MM/YY CVC"
                  />
                </label>
              </fieldset>
            </section>
          </div>
          <button
            disabled={total != 0 ? false : true}
            onClick={create}
            className="submit-button px-4 py-3 rounded-full bg-blue-800 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
          >
            Pay €{total + shipping}
          </button>
        </div>
        <div className="col-span-1 bg-white lg:block hidden">
          <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
            Order Summary
          </h1>
          <ul className="py-6 border-b space-y-6 px-8">
            {Object.keys(uniques).map((dish) => (
              <li
                key={uniques[dish][0]._id}
                className="grid grid-cols-6 gap-2 border-b-1"
              >
                <div className="col-span-1 self-center">
                  <img
                    src={uniques[dish][0].image}
                    alt="Product"
                    className="rounded w-full"
                  />
                </div>
                <div className="flex flex-col col-span-3 pt-2">
                  <span className="text-gray-600 text-md font-semi-bold">
                    {uniques[dish][0].name}
                  </span>
                  <span className="text-gray-400 text-sm inline-block pt-2">
                    {uniques[dish][0].description}
                  </span>
                </div>
                <div className="col-span-2 pt-3">
                  <div className="flex items-center space-x-2 text-sm justify-between">
                    <span className="text-gray-400">
                      {uniques[dish].length} x €{uniques[dish][0].price}
                    </span>
                    <span className="text-blue-800 font-semibold inline-block">
                      €
                      {uniques[dish].length *
                        uniques[dish].reduce(
                          (_: number, dish: Dish) => dish.price,
                          0
                        )}
                    </span>
                    <span
                      onClick={() =>
                        dishContext.setDishes(
                          dishContext.dishes.filter(
                            (item) => item._id !== uniques[dish][0]._id
                          )
                        )
                      }
                      className="cursor-pointer bg-red-500 rounded-xl px-2 text-white font-semibold inline-block"
                    >
                      -
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-8 border-b">
            <div className="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-blue-800">€{total}</span>
            </div>
            <div className="flex justify-between py-4 text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-blue-800">
                {shipping == 0 ? "Free" : "€10"}
              </span>
            </div>
          </div>
          <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>€{total + shipping}</span>
          </div>
        </div>
      </div>
    </>
  );
}
