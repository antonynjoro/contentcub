import React from "react";
import { HiCheckCircle } from "react-icons/hi2";
import LandingPageNav from "./components/LandingPageNav";
import Image from "next/image";

const meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function Index() {
  return (
    <React.Fragment>
      <>
        <section
        style={{
          backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
          backgroundPosition: "center",
        }}
        >
          <div className="py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="-mx-4 flex flex-wrap xl:items-center">
                <div className="mb-16 w-full px-4 md:mb-0 md:w-1/2">
                  <h1 className="mb-6 text-3xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl ">
                    The web design content you need without the email pingpong
                  </h1>
                  <p className="text-gray-500 mb-8 text-lg md:text-xl ">
                    Spend your time creating that website, not hunting for
                    content in emails. ConentCub simplifies the content
                    collection process, delivering what you need from clients
                    with minimal fuss.
                  </p>
                  <div className="flex flex-wrap">
                    <div className="w-full py-1 md:mr-4 md:w-auto md:py-0">
                      <a
                        className="inline-block w-full rounded-md border border-fuchsia-900 bg-fuchsia-950 px-10 py-5 text-center text-base font-medium leading-4 text-white shadow-sm hover:bg-fuchsia-900 focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50 md:text-lg"
                        href="/sign-up"
                      >
                        Get Stared for Free
                      </a>
                      <p className="pl-1 pt-1 text-sm text-gray-500">
                        No credit card required.
                      </p>
                    </div>
                    <div className="w-full py-1 md:w-auto md:py-0">
                      <a
                        className="text-coolGray-800 hover:bg-coolGray-100 focus:ring-coolGray-200 border-coolGray-200 inline-block w-full rounded-md border bg-white px-7 py-5 text-center text-base font-medium leading-4 shadow-sm focus:ring-2 focus:ring-opacity-50 md:text-lg"
                        href="#"
                      >
                        Sign Up
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="relative mx-auto max-w-max md:mr-0">
                    <img
                      className="absolute -left-14 -top-12 z-10 w-28 md:w-auto"
                      src="flex-ui-assets/elements/circle3-red.svg"
                      alt=""
                    />
                    <img
                      className="absolute -bottom-8 -right-7 z-10 w-28 md:w-auto"
                      src="flex-ui-assets/elements/dots3-green.svg"
                      alt=""
                    />
                    <Image
                      className="rounded-xl relative border-8 border-fuchsia-900/50 "
                      src="/contentcub-workflow-square.gif"
                      alt=""
                      width={600}
                      height={600}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" flex justify-center pt-20" id="product">
        <div className="w-full px-4 md:w-3/4">
          <div className="mb-10 flex items-center flex-col justify-center ">
            <h2 className=" text-2xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl mb-2 ">
              How it Works
            </h2>
            <p className=" text-center text-lg text-gray-700 md:text-x w-3/4">
              ContentCub is a simple, intuitive tool that streamlines the task of collecting and organizing content from clients. The video below provides a brief overview of how it works.
            </p>
          </div>
          <div className="relative mx-auto flex md:mr-0">
            <img
              className="absolute -right-14 -top-12 z-10 w-28 md:w-auto"
              src="flex-ui-assets/elements/circle3-red.svg"
              alt=""
            />
            <img
              className="absolute -bottom-8 -left-7 z-10 w-28 md:w-auto"
              src="flex-ui-assets/elements/dots3-green.svg"
              alt=""
            />
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Th-6bI1IlRQ?si=fJLShVu8Fw2oPAFO"
              title="YouTube video player"
              allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; "
              allowFullScreen
              className="rounded-7xl relative h-[600px] w-full rounded-md"
            ></iframe>
          </div>
        </div>
      </section>
        <section
          className="relative bg-white py-24"
          style={{
            backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
            backgroundPosition: "center",
          }}
          id="features"
        >
          <div className="mb-16 px-4 md:absolute md:-left-96 md:top-28 md:-ml-56 md:mb-0 md:transform lg:top-1/2 lg:-ml-20 lg:-translate-y-1/2 xl:-left-80 xl:-ml-0">
            <div className="relative max-w-max">
              <img
                className="absolute left-1/2 top-1/2 z-20 -mt-1 w-10/12 -translate-x-1/2 -translate-y-1/2 transform p-7"
                src="images/ContentCub-9-18pm-12-23.jpeg"
                alt=""
              />
              <img
                className="relative z-10"
                src="flex-ui-assets/elements/applications/macbook.png"
                alt=""
              />
              <img
                className="absolute -top-24 left-0 w-28 text-fuchsia-500 md:left-96 md:ml-52 md:mt-px md:w-auto lg:ml-16 xl:-ml-20"
                src="flex-ui-assets/elements/dots2-green.svg"
              />
              <img
                className="absolute -bottom-24 right-0 w-28 text-fuchsia-500 md:left-96 md:ml-52 md:mt-px md:w-auto lg:ml-16 xl:-ml-20"
                src="flex-ui-assets/elements/dots2-red.svg"
              />
              <img
                className="absolute right-0 top-1/2 w-28 -translate-y-1/2 transform text-fuchsia-400 md:w-auto"
                src="flex-ui-assets/elements/circle2-red.svg"
              />
            </div>
          </div>
          <div className="container mx-auto px-4">
            <div className="pl-4 md:ml-auto md:w-1/2">
              <h3 className="text-coolGray-900 mb-6 text-4xl font-semibold leading-tight tracking-tighter md:text-5xl">
                Design, Not Drudgery: Centralize Client Content with Ease
              </h3>
              <p className="text-coolGray-500 mb-12 text-lg md:text-xl ">
                We simplify the content handover from your clients,
                consolidating everything you need in one central hub, far from
                the abyss of endless email threads.
              </p>
              <div className="mb-10 flex flex-wrap text-center md:text-left">
                <div className="mb-6 w-full md:mb-0 md:w-auto md:pr-6">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-lg bg-fuchsia-800 text-white">
                    <svg
                      width={21}
                      height={21}
                      viewBox="0 0 24 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 18.63H5C4.20435 18.63 3.44129 18.3139 2.87868 17.7513C2.31607 17.1887 2 16.4257 2 15.63V7.63C2 7.36479 1.89464 7.11043 1.70711 6.9229C1.51957 6.73536 1.26522 6.63 1 6.63C0.734784 6.63 0.48043 6.73536 0.292893 6.9229C0.105357 7.11043 0 7.36479 0 7.63L0 15.63C0 16.9561 0.526784 18.2279 1.46447 19.1655C2.40215 20.1032 3.67392 20.63 5 20.63H17C17.2652 20.63 17.5196 20.5246 17.7071 20.3371C17.8946 20.1496 18 19.8952 18 19.63C18 19.3648 17.8946 19.1104 17.7071 18.9229C17.5196 18.7354 17.2652 18.63 17 18.63ZM21 0.630005H7C6.20435 0.630005 5.44129 0.946075 4.87868 1.50868C4.31607 2.07129 4 2.83436 4 3.63V13.63C4 14.4257 4.31607 15.1887 4.87868 15.7513C5.44129 16.3139 6.20435 16.63 7 16.63H21C21.7956 16.63 22.5587 16.3139 23.1213 15.7513C23.6839 15.1887 24 14.4257 24 13.63V3.63C24 2.83436 23.6839 2.07129 23.1213 1.50868C22.5587 0.946075 21.7956 0.630005 21 0.630005ZM20.59 2.63L14.71 8.51C14.617 8.60373 14.5064 8.67813 14.3846 8.7289C14.2627 8.77966 14.132 8.8058 14 8.8058C13.868 8.8058 13.7373 8.77966 13.6154 8.7289C13.4936 8.67813 13.383 8.60373 13.29 8.51L7.41 2.63H20.59ZM22 13.63C22 13.8952 21.8946 14.1496 21.7071 14.3371C21.5196 14.5246 21.2652 14.63 21 14.63H7C6.73478 14.63 6.48043 14.5246 6.29289 14.3371C6.10536 14.1496 6 13.8952 6 13.63V4L11.88 9.88C12.4425 10.4418 13.205 10.7574 14 10.7574C14.795 10.7574 15.5575 10.4418 16.12 9.88L22 4V13.63Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:flex-1 md:pt-3">
                  <div className="md:max-w-sm">
                    <h3 className="text-coolGray-900 mb-4 text-xl font-semibold leading-tight md:text-2xl">
                      Effortless Client Forms
                    </h3>
                    <p className="text-coolGray-500 ">
                      Our client-facing form is sleek and straightforward,
                      minimizing confusion and clearly defining your content
                      needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-10 flex flex-wrap text-center md:text-left">
                <div className="mb-6 w-full md:mb-0 md:w-auto md:pr-6">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-lg bg-fuchsia-800 text-white">
                    <svg
                      width={21}
                      height={21}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 18H9.24C9.37161 18.0008 9.50207 17.9755 9.62391 17.9258C9.74574 17.876 9.85656 17.8027 9.95 17.71L16.87 10.78L19.71 8C19.8037 7.90704 19.8781 7.79644 19.9289 7.67458C19.9797 7.55272 20.0058 7.42201 20.0058 7.29C20.0058 7.15799 19.9797 7.02728 19.9289 6.90542C19.8781 6.78356 19.8037 6.67296 19.71 6.58L15.47 2.29C15.377 2.19627 15.2664 2.12188 15.1446 2.07111C15.0227 2.02034 14.892 1.9942 14.76 1.9942C14.628 1.9942 14.4973 2.02034 14.3754 2.07111C14.2536 2.12188 14.143 2.19627 14.05 2.29L11.23 5.12L4.29 12.05C4.19732 12.1434 4.12399 12.2543 4.07423 12.3761C4.02446 12.4979 3.99924 12.6284 4 12.76V17C4 17.2652 4.10536 17.5196 4.29289 17.7071C4.48043 17.8946 4.73478 18 5 18ZM14.76 4.41L17.59 7.24L16.17 8.66L13.34 5.83L14.76 4.41ZM6 13.17L11.93 7.24L14.76 10.07L8.83 16H6V13.17ZM21 20H3C2.73478 20 2.48043 20.1054 2.29289 20.2929C2.10536 20.4804 2 20.7348 2 21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21C22 20.7348 21.8946 20.4804 21.7071 20.2929C21.5196 20.1054 21.2652 20 21 20Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:flex-1 md:pt-3">
                  <div className="md:max-w-sm">
                    <h3 className="text-coolGray-900 mb-4 text-xl font-semibold leading-tight md:text-2xl">
                      Effortless Asset Management
                    </h3>
                    <p className="text-coolGray-500 ">
                      ContentCub organizes all submitted assets—photos, text,
                      documents—neatly, eliminating the hassle of sorting. Quick
                      copy and download buttons enable instant content
                      retrieval, allowing you to stay in flow.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap text-center md:text-left">
                <div className="mb-6 w-full md:mb-0 md:w-auto md:pr-6">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-lg bg-fuchsia-800 text-white">
                    <svg
                      width={21}
                      height={21}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 13H3C2.73478 13 2.48043 13.1054 2.29289 13.2929C2.10536 13.4804 2 13.7348 2 14V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H10C10.2652 22 10.5196 21.8946 10.7071 21.7071C10.8946 21.5196 11 21.2652 11 21V14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13ZM9 20H4V15H9V20ZM21 2H14C13.7348 2 13.4804 2.10536 13.2929 2.29289C13.1054 2.48043 13 2.73478 13 3V10C13 10.2652 13.1054 10.5196 13.2929 10.7071C13.4804 10.8946 13.7348 11 14 11H21C21.2652 11 21.5196 10.8946 21.7071 10.7071C21.8946 10.5196 22 10.2652 22 10V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2V2ZM20 9H15V4H20V9ZM21 13H14C13.7348 13 13.4804 13.1054 13.2929 13.2929C13.1054 13.4804 13 13.7348 13 14V21C13 21.2652 13.1054 21.5196 13.2929 21.7071C13.4804 21.8946 13.7348 22 14 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V14C22 13.7348 21.8946 13.4804 21.7071 13.2929C21.5196 13.1054 21.2652 13 21 13ZM20 20H15V15H20V20ZM10 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V10C2 10.2652 2.10536 10.5196 2.29289 10.7071C2.48043 10.8946 2.73478 11 3 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V3C11 2.73478 10.8946 2.48043 10.7071 2.29289C10.5196 2.10536 10.2652 2 10 2V2ZM9 9H4V4H9V9Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full md:flex-1 md:pt-3">
                  <div className="md:max-w-sm">
                    <h3 className="text-coolGray-900 mb-4 text-xl font-semibold leading-tight md:text-2xl">
                      Provide clarity with interactive checklists
                    </h3>
                    <p className="text-coolGray-500 ">
                      Checklist comments bridge any gaps between what you ask
                      and what clients understand, ensuring both clarity and
                      accuracy in submissions.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="overflow-hidden bg-white py-20 xl:py-24"
          style={{
            backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
            backgroundPosition: "center",
          }}
          id="pricing"
        >
          <div className="container mx-auto px-4">
            <div className="">
              <span className="mb-4 inline-block rounded-xl bg-fuchsia-100 px-2 py-px text-xs font-medium uppercase leading-5 text-fuchsia-900">
                Pricing
              </span>
              <h3 className="text-coolGray-900 mb-4 text-3xl font-semibold tracking-tighter md:text-5xl">
                One Simple price
              </h3>
              <p className="text-coolGray-500 mb-6 text-lg md:text-xl ">
                Choose ease and transparency! Our straightforward pricing means
                no surprises, just one monthly fee that covers everything you
                need. Whether you are a solo designer or part of a larger team,
                our single-tier plan is designed to grow with you.
              </p>
              <div className="border-coolGray-200 mx-auto mb-12 flex max-w-max overflow-hidden rounded-md border shadow-lg"></div>
            </div>
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full p-4 md:w-2/3">
                <div className="bg-coolGray-50 flex flex-col rounded-md pb-8 pt-8 shadow-md transition duration-500 hover:scale-105">
                  <div className="flex items-center justify-between px-8">
                    <div>
                      <h3 className="text-coolGray-800 text-2xl font-semibold tracking-tighter md:text-3xl">
                        Pay as you go
                      </h3>
                      <p className="text-coolGray-400 ">
                        For professionals who value flexibility and control.
                      </p>
                    </div>
                    <div>
                      <span className="text-coolGray-900 relative -top-10 right-1 text-3xl font-bold">
                        $
                      </span>
                      <span className="text-coolGray-900 tracking-snug text-6xl font-semibold md:text-7xl">
                        9<span className="text-4xl">.94</span>
                      </span>
                      <span className="text-coolGray-500 ml-1 inline-block font-semibold">
                        /mo
                      </span>
                    </div>
                  </div>
                  <div className="border-coolGray-100 border-b" />
                  <ul className="self-start px-8 pb-16 pt-8">
                    <li className="text-coolGray-500 mb-4 flex items-center ">
                      <HiCheckCircle className="mr-3 h-6 w-6 text-gray-900" />
                      <span>
                        Full Access: Unlock every feature ContentCub has to
                        offer.
                      </span>
                    </li>
                    <li className="text-coolGray-500 mb-4 flex items-center ">
                      <HiCheckCircle className="mr-3 h-6 w-6 text-gray-900" />
                      <span>
                        Unlimited checklists to gather as much content as you
                        need.
                      </span>
                    </li>
                    <li className="text-coolGray-500 mb-4 flex items-center ">
                      <HiCheckCircle className="mr-3 h-6 w-6 text-gray-900" />
                      <span>Cancel any time.</span>
                    </li>
                  </ul>
                  <div className="border-coolGray-100 border-b" />
                  <div className="px-8 pt-8">
                    <a
                      className="focus:ring-gray -500 inline-block w-full rounded-md bg-fuchsia-950 px-7 py-4 text-center text-base font-medium leading-6 text-white shadow-sm hover:bg-fuchsia-900 focus:ring-2 focus:ring-opacity-50 md:text-lg"
                      href="#"
                    >
                      Proceed to Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="bg-white py-24"
          style={{
            backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="-mx-4 flex flex-wrap">
              <div className="mb-20 w-full px-4 md:mb-0 md:w-1/2">
                <div className="max-w-md">
                  <span className="mb-4 inline-block rounded-full bg-fuchsia-100 px-2 py-px text-xs font-medium leading-5 text-fuchsia-900 shadow-sm">
                    FAQ
                  </span>
                  <h2 className="text-coolGray-900 mb-4 text-4xl font-bold leading-tight tracking-tighter md:text-5xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-coolGray-500 text-lg md:text-xl ">
                    ContentCub saves you the endless back and forth in dealing
                    with clients for content allowing you to get back to the
                    thing you actually love, designing.
                  </p>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2">
                <div className="mb-10 flex w-full flex-wrap text-left">
                  <div className="mb-2 w-full md:mb-0 md:w-auto md:pr-10">
                    <h3 className="text-coolGray-900 mb-4 text-xl font-bold">
                      What is ContentCub?
                    </h3>
                    <p className="text-coolGray-500 max-w-md ">
                      ContentCub is a content collection tool for designers. It
                      allows you to easily collect and organize content from
                      your clients in one central location. No more endless
                      email threads or confusing shared folders.
                    </p>
                  </div>
                  <div className="ml-auto text-fuchsia-500"></div>
                </div>
                <div className="mb-10 flex w-full flex-wrap text-left">
                  <div className="mb-2 w-full md:mb-0 md:w-auto md:pr-10">
                    <h3 className="text-coolGray-900 mb-4 text-xl font-bold">
                      Is there a free trial?
                    </h3>
                    <p className="text-coolGray-500 max-w-md ">
                      Yes. You can try ContentCub for free by creating one free
                      checklist. No credit card required.
                    </p>
                  </div>
                  <div className="ml-auto text-fuchsia-500"></div>
                </div>
                <div className="mb-10 flex w-full flex-wrap text-left">
                  <div className="mb-2 w-full md:mb-0 md:w-auto md:pr-10">
                    <h3 className="text-coolGray-900 mb-4 text-xl font-bold">
                      Are there any limits on the number of checklists I can
                      create?
                    </h3>
                    <p className="text-coolGray-500 max-w-md ">
                      Once you have a paid account, you can create as many
                      checklists as you need.
                    </p>
                  </div>
                  <div className="ml-auto text-fuchsia-500"></div>
                </div>
                <div className="mb-10 flex w-full flex-wrap text-left">
                  <div className="mb-2 w-full md:mb-0 md:w-auto md:pr-10">
                    <h3 className="text-coolGray-900 mb-4 text-xl font-bold">
                      What types of content can I collect?
                    </h3>
                    <p className="text-coolGray-500 max-w-md ">
                      You can collect any type of content you need from your
                      clients. Images, text, documents, etc.
                    </p>
                  </div>
                  <div className="ml-auto text-fuchsia-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}
