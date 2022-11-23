export default function Home() {
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="bg-white relative pt-40 pb-20 lg:pt-44 dark:bg-gray-900">
          <div className="relative xl:container m-auto px-6 md:px-12 lg:px-6">
            <h1 className="sm:mx-auto sm:w-10/12 md:w-2/3 font-black text-blue-900 text-4xl text-center sm:text-5xl md:text-6xl lg:w-auto lg:text-left xl:text-7xl dark:text-white">
              Run successful remote and <br className="lg:block hidden" />{" "}
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                Hybrid teams
              </span>
              .
            </h1>
            <div className="lg:flex">
              <div className="relative mt-8 md:mt-16 space-y-8 sm:w-10/12 md:w-2/3 lg:ml-0 sm:mx-auto text-center lg:text-left lg:mr-auto lg:w-7/12">
                <p className="sm:text-lg text-gray-700 dark:text-gray-300 lg:w-11/12">
                  DailyBot takes chat and collaboration to the next level: daily
                  standups, team check-ins, surveys, kudos, best companion bot
                  for your virtual watercooler, 1:1 intros, motivation tracking
                  and more.
                </p>
                <span className="block font-semibold text-gray-500 dark:text-gray-400">
                  The best companion bot for your chat app.
                </span>
                <div className="grid grid-cols-3 space-x-4 md:space-x-6 md:flex md:justify-center lg:justify-start">
                  <a
                    aria-label="add to slack"
                    href="#"
                    className="p-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-full duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20 dark:hover:border-cyan-300/30"
                  >
                    <div className="flex justify-center space-x-4">
                      <img
                        className="w-6 h-6"
                        src="https://tailus.io/sources/blocks/tech-startup/preview/images/slack.png"
                        alt="slack logo"
                        loading="lazy"
                        width="128"
                        height="128"
                      />
                      <span className="hidden font-medium md:block dark:text-white">
                        Slack
                      </span>
                    </div>
                  </a>
                  <a
                    aria-label="add to chat"
                    href="#"
                    className="p-4 border border-gray-200 dark:bg-gray-800  dark:border-gray-700 rounded-full duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-lime-600/20 dark:hover:border-green-300/30"
                  >
                    <div className="flex justify-center space-x-4">
                      <img
                        className="w-6 h-6"
                        src="https://tailus.io/sources/blocks/tech-startup/preview/images/chat.png"
                        alt="chat logo"
                        loading="lazy"
                        width="128"
                        height="128"
                      />
                      <span className="hidden font-medium md:block dark:text-white">
                        Google Chat
                      </span>
                    </div>
                  </a>
                  <a
                    aria-label="add to zoom"
                    href="#"
                    className="p-4 border border-gray-200 dark:bg-gray-800  dark:border-gray-700 rounded-full duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/20 dark:hover:border-blue-300/30"
                  >
                    <div className="flex justify-center space-x-4">
                      <img
                        className="w-6 h-6"
                        src="https://tailus.io/sources/blocks/tech-startup/preview/images/zoom.png"
                        alt="chat logo"
                        loading="lazy"
                        width="128"
                        height="128"
                      />
                      <span className="hidden font-medium md:block dark:text-white">
                        Zoom
                      </span>
                    </div>
                  </a>
                </div>

                <div className="dark:text-gray-300">
                  🔥🌟
                  <span>Other integrations :</span>
                  <a
                    href="#"
                    className="font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Discord,
                  </a>
                  <a
                    href="#"
                    className="font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Telegram
                  </a>
                </div>

                <div className="pt-12 flex gap-6 lg:gap-12 justify-between grayscale lg:w-2/3">
                  <img
                    src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/airbnb.svg"
                    className="h-8 sm:h-10 w-auto lg:h-12"
                    alt=""
                  />
                  <img
                    src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/ge.svg"
                    className="h-8 sm:h-10 w-auto lg:h-12"
                    alt=""
                  />
                  <img
                    src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/coty.svg"
                    className="h-8 sm:h-10 w-auto lg:h-12"
                    alt=""
                  />
                  <img
                    src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/microsoft.svg"
                    className="h-8 sm:h-10 w-auto lg:h-12"
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-12 md:mt-0 lg:absolute -right-10 lg:w-7/12">
                <div className="relative w-full">
                  <div
                    aria-hidden="true"
                    className="absolute scale-75 md:scale-110 inset-0 m-auto w-full h-full md:w-96 md:h-96 rounded-full rotate-45 bg-gradient-to-r from-sky-500 to-cyan-300 blur-3xl"
                  ></div>
                  <img
                    src="https://tailus.io/sources/blocks/tech-startup/preview/images/globalization-cuate.svg"
                    className="relative w-full"
                    alt="wath illustration"
                    loading="lazy"
                    width="320"
                    height="280"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center p-10 bg-white">
        <div className="container grid max-w-screen-xl gap-8 lg:grid-cols-2 lg:grid-rows-2">
          <div className="row-span-2 flex flex-col rounded-md border border-slate-200">
            <div className="h-1/2 flex-1">
              <img
                src="https://d33wubrfki0l68.cloudfront.net/c43307b88fb814366e4f3a181c788796cba83faa/4c05c/new/landing/omnichannel.png"
                className="w-full object-cover object-right-top"
                alt="omnichannel"
              />
            </div>
            <div className="p-10">
              <h3 className="text-xl font-medium text-gray-700">
                Omnichannel support center
              </h3>
              <p className="mt-2 text-slate-500">
                Chatwoot connects with popular customer communication channels
                like Email, Website live-chat, Facebook, Twitter, WhatsApp,
                Instagram, Line, etc., and helps you deliver a consistent
                customer experience across channels.
              </p>
              <a href="" className="mt-2 inline-flex text-sky-500">
                Read More →
              </a>
            </div>
          </div>
          <div className="flex rounded-md border border-slate-200">
            <div className="flex-1 p-10">
              <h3 className="text-xl font-medium text-gray-700">
                A live-chat that fits your brand
              </h3>
              <p className="mt-2 text-slate-500">
                Connect with your website visitors, communicate with them in
                realtime and give them quality support with a live-chat widget
                that fits your brand.
              </p>
              <a href="" className="mt-2 inline-flex text-sky-500">
                Read More →
              </a>
            </div>

            <div className="relative hidden h-full w-1/3 overflow-hidden lg:block">
              <div className="absolute inset-0">
                <img
                  src="https://d33wubrfki0l68.cloudfront.net/e5290c26cc1703e54e0afe3d1472046098ecd819/53775/new/landing/live-chat.png"
                  className="h-full w-full object-cover object-left-top"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex rounded-md border border-slate-200">
            <div className="flex-1 p-10">
              <h3 className="text-xl font-medium text-gray-700">
                Respond faster, with automated chatbots
              </h3>
              <p className="mt-2 text-slate-500">
                Integrate with chatbots using Rasa or Dialogflow to automate
                conversations. Qualify using chatbots and seamlessly handoff to
                human agents.
              </p>
              <a href="" className="mt-2 inline-flex text-sky-500">
                Read More →
              </a>
            </div>

            <div className="relative hidden h-full w-1/3 overflow-hidden lg:block">
              <div className="absolute inset-0">
                <img
                  src="https://d33wubrfki0l68.cloudfront.net/1205a454c4b64452a51930c9b0043f8db9ff8271/d202e/new/landing/chat-bot.png"
                  className="h-full w-full object-cover object-left-top"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
