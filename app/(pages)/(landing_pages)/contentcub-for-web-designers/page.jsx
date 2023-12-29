import LandingPageNav from "../components/LandingPageNav"
import Image from "next/image"

export default function page() {
  return (
    <>
      <section>
        <div className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="-mx-4 flex flex-wrap xl:items-center">
              <div className="mb-16 w-full px-4 md:mb-0 md:w-1/2">
                <h1 className="mb-6 text-3xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl ">
                  ContentCub is great for web designers
                </h1>
                <p className="text-coolGray-500 mb-2 text-lg md:text-xl ">
                  Instead of spending most of their day doing what they love,
                  web designers are often bogged down by the tedious task of
                  collecting and organizing content from clients. Spending most
                  of their time lost in the maze of email threads, designers
                  find themselves managing content rather than designing.
                  ContentCub streamlines this process, allowing designers to
                  focus on what they do best - design. We do this by providing a
                  simple, intuitive interface that makes it easy for clients to
                  submit content. We also provide a powerful backend that allows
                  designers to find what they need quickly without the need to
                  dig through email threads.
                </p>
                <p className="text-coolGray-500 mb-8 text-lg md:text-xl ">
                  <span className=" font-semibold">Design, Not Drudgery:</span>{" "}
                  ContentCub recognizes the value of your creative time. We have
                  developed a tool that streamlines the content collection
                  process, transforming it from a frustrating chore into a
                  smooth, efficient workflow.
                </p>
                <div className="flex flex-wrap">
                  <div className="w-full py-1 md:mr-4 md:w-auto md:py-0">
                    <a
                      className="inline-block w-full rounded-md border border-fuchsia-900 bg-fuchsia-950 px-10 py-5 text-center text-base font-medium leading-4 text-white shadow-sm hover:bg-fuchsia-900 focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50 md:text-lg"
                      href="/sign-up"
                    >
                      Get Started for Free
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
                      How it Works
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
                    className="rounded-7xl relative rounded-md"
                    src="/web-designer-working.png"
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
      <section className=" flex justify-center pt-20">
        <div className="w-full px-4 md:w-3/4">
          <div className="mb-10 flex items-center flex-col justify-center ">
            <h2 className=" text-2xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl mb-2 ">
              How it Works
            </h2>
            <p className=" text-center text-base text-gray-700 w-3/4">
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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
              allowFullScreen
              className="rounded-7xl relative h-[600px] w-full rounded-md"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

