"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";
import { useNavigate } from "react-router-dom";
import messageicon from "./assets/message-icon.svg";
import ham from "./assets/ham2.svg";
import { useState, useEffect } from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { Tabs } from "antd";
import fm from "./assets/fm.png";
const NavComponents = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div
        className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] relative pt-0 overflow-clip"
        ref={ref}
      >
        <div className="nav fixed">
          <span>
            <img src={messageicon} alt="message-icon" height="40px" />
            <h1>ZenChat</h1>
          </span>
          <img
            height="30px"
            className="hamMenu"
            src={ham}
            alt="ham.svg"
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </div>
        <div
          className={
            showSidebar
              ? "HomeSidebar sidebarActive"
              : "HomeSidebar fixed bg-black h-[80vh] backdrop-blur-sm	"
          }
        >
          <button
            onClick={() => {
              navigate("login-page");
              setShowSidebar(false);
            }}
          >
            Log In
          </button>
          <button
            onClick={() => {
              navigate("signUp-page");
              setShowSidebar(false);
            }}
          >
            Sign up
          </button>
        </div>
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div>
      {/* <BackgroundGradientAnimation className="z-0"> */}
      <div className="bgimage">
        <div className="flex gap-5 flex-col pt-24  p-10 pb-0 h-screen bg-[#373c4290]">
          <h1 className="text-white">What's New?</h1>
          <Tabs
            className="tabs"
            tabPosition={screenWidth < 800 ? "top" : "left"}
          >
            <Tabs.TabPane
              tab={<span className="text-xl font-bold">Focus Mode</span>}
              key="Tab1"
            >
              <div>
                <div class="bg-[#5a6d8c47] rounded-md py-8 px-4 h-[34rem] w-[100%] overflow-auto scroll-smooth z-50">
                  <h1 class="text-3xl font-bold text-center text-[#e8e6e6e3] mb-8">
                    Welcome to Focus Mode: Your Gateway to Productivity
                  </h1>

                  <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8 mb-8">
                    <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                      What is Focus Mode?
                    </h2>
                    <p class="text-[#eeeeeed7] text-lg leading-relaxed">
                      Focus Mode is your personal productivity booster,
                      meticulously crafted to help you achieve peak performance.
                      It's a feature that allows you to temporarily block out
                      distractions, enabling you to dive deep into your work
                      without interruptions.
                    </p>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8">
                      <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                        Key Features:
                      </h2>
                      <ul class="list-disc text-[#eeeeeed7] text-lg pl-6">
                        <li class="mb-2">Distraction-Free Environment</li>
                        <li class="mb-2">Customizable Settings</li>
                      </ul>
                    </div>

                    <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8">
                      <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                        Why Choose Focus Mode?
                      </h2>
                      <ul class="list-disc text-lg text-[#eeeeeed7] pl-6">
                        <li class="mb-2">Boost Productivity</li>
                        <li class="mb-2">Enhance Concentration</li>
                        <li class="mb-2">Improve Well-being</li>
                      </ul>
                    </div>
                  </div>

                  <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8 mt-8 text-center">
                    <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                      Ready to Unleash Your Potential?
                    </h2>
                    <p class="text-[#eeeeeed7] text-lg mb-6">
                      Embrace the power of Focus Mode and unlock your true
                      productivity potential. Whether you're a student,
                      professional, or creative thinker, Focus Mode is your
                      secret weapon for achieving your goals and living life
                      with purpose.
                    </p>
                    <button
                      onClick={() => navigate("login-page")}
                      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg z-[100%]"
                    >
                      Try Focus Mode Now
                    </button>
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              colo
              tab={
                <span className=" text-xl font-bold">Message Scheduling</span>
              }
              key="Tab2"
            >
              <div class="bg-[#5a6d8c47] rounded-md py-8 px-4 h-[34rem] w-[100%] overflow-auto scroll-smooth">
                <h1 class="text-3xl font-bold text-center text-[#e8e6e6e3] mb-8">
                  Welcome to Message Scheduling: Organize Your Communication
                  Effortlessly
                </h1>

                <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8 mb-8">
                  <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                    What is Message Scheduling?
                  </h2>
                  <p class="text-[#eeeeeed7] text-lg leading-relaxed">
                    Message Scheduling is a powerful tool designed to streamline
                    your communication workflow. It allows you to plan and
                    schedule your messages in advance, ensuring timely delivery
                    and effective communication with your contacts or audience.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8">
                    <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                      Key Features:
                    </h2>
                    <ul class="list-disc text-[#eeeeeed7] text-lg pl-6">
                      <li class="mb-2">Schedule Messages in Advance</li>
                      <li class="mb-2">Automate Communication Processes</li>
                      <li class="mb-2">Increase Efficiency and Productivity</li>
                    </ul>
                  </div>

                  <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8">
                    <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                      Why Choose Message Scheduling?
                    </h2>
                    <ul class="list-disc text-lg text-[#eeeeeed7] pl-6">
                      <li class="mb-2">Stay Organized and Prepared</li>
                      <li class="mb-2">
                        Reach Your Audience at the Right Time
                      </li>
                      <li class="mb-2">
                        Effortlessly Manage Multiple Communication Channels
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8 mt-8 text-center">
                  <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                    Ready to Streamline Your Communication?
                  </h2>
                  <p class="text-[#eeeeeed7] text-lg mb-6">
                    Experience the convenience and efficiency of Message
                    Scheduling and take control of your communication efforts
                    like never before. Whether you're a business professional,
                    marketer, or social media influencer, Message Scheduling is
                    your ultimate solution for organized and effective
                    communication.
                  </p>
                  <button
                    onClick={() => navigate("login-page")}
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg z-50"
                  >
                    Try Message Scheduling Now
                  </button>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span className=" text-xl font-bold">
                  Positive Interactions
                </span>
              }
              key="Tab3"
            >
              <div class="bg-[#5a6d8c47] rounded-md py-8 px-4 h-[34rem] w-[100%] overflow-auto scroll-smooth">
                <h1 class="text-3xl font-bold text-center text-[#e8e6e6e3] mb-8">
                  Welcome to Positive Interactions: Ensuring Respectful
                  Communication
                </h1>

                <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8 mb-8">
                  <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                    What are Positive Interactions?
                  </h2>
                  <p class="text-[#eeeeeed7] text-lg leading-relaxed">
                    Positive Interactions is a feature dedicated to fostering a
                    respectful and inclusive environment within our chat app. It
                    prevents the use of offensive language and promotes
                    constructive dialogue among users.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8">
                    <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                      Key Features:
                    </h2>
                    <ul class="list-disc text-[#eeeeeed7] text-lg pl-6">
                      <li class="mb-2">
                        Automatic Detection of Offensive Language
                      </li>
                      <li class="mb-2">
                        Real-time Prevention of Negative Interactions
                      </li>
                      <li class="mb-2">
                        Promotion of Respectful Communication
                      </li>
                    </ul>
                  </div>

                  <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8">
                    <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                      Why Choose Positive Interactions?
                    </h2>
                    <ul class="list-disc text-lg text-[#eeeeeed7] pl-6">
                      <li class="mb-2">
                        Create a Safe and Welcoming Community
                      </li>
                      <li class="mb-2">Foster Mutual Respect Among Users</li>
                      <li class="mb-2">Enhance Overall User Experience</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8 mt-8 text-center">
                  <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                    Ready to Promote Respectful Communication?
                  </h2>
                  <p class="text-[#eeeeeed7] text-lg mb-6">
                    Join us in creating a positive and respectful online
                    community by embracing the Positive Interactions feature.
                    Whether you're a chat app user or administrator, Positive
                    Interactions ensures that every interaction contributes to a
                    welcoming and inclusive environment.
                  </p>
                  <button
                    onClick={() => navigate("login-page")}
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Experience Positive Interactions Now
                  </button>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={<span className=" text-xl font-bold">Limits on Usage</span>}
              key="Tab4"
            >
              <div class="bg-[#5a6d8c47] rounded-md py-8 px-4 h-[34rem] w-[100%] overflow-auto scroll-smooth z-50">
                <h1 class="text-3xl font-bold text-center text-[#e8e6e6e3] mb-8">
                  Welcome to App Usage Limits: Empowering Healthy Digital Habits
                </h1>

                <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8 mb-8">
                  <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                    What are App Usage Limits?
                  </h2>
                  <p class="text-[#eeeeeed7] text-lg leading-relaxed">
                    App Usage Limits is a feature designed to promote healthy
                    digital habits by setting daily usage limits for the chat
                    app. Parents can monitor and manage their child's usage,
                    ensuring a balanced approach to screen time.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8">
                    <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                      Key Features:
                    </h2>
                    <ul class="list-disc text-[#eeeeeed7] text-lg pl-6">
                      <li class="mb-2">Customizable Daily Usage Limits</li>
                      <li class="mb-2">Parental Control and Monitoring</li>
                      <li class="mb-2">Automatic Reset of Limits Every Day</li>
                    </ul>
                  </div>

                  <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8">
                    <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                      Why Choose App Usage Limits?
                    </h2>
                    <ul class="list-disc text-lg text-[#eeeeeed7] pl-6">
                      <li class="mb-2">Encourage Balanced Screen Time</li>
                      <li class="mb-2">Promote Healthy Digital Habits</li>
                      <li class="mb-2">Ensure Child Safety and Well-being</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-[#3c4f7166] rounded-lg shadow-md p-8 mt-8 text-center">
                  <h2 class="text-2xl font-semibold text-[#b473d7] mb-4">
                    Ready to Foster Healthy Digital Habits?
                  </h2>
                  <p class="text-[#eeeeeed7] text-lg mb-6">
                    Take control of your digital lifestyle by implementing App
                    Usage Limits. Whether you're a concerned parent or an
                    individual seeking to manage screen time, this feature
                    empowers you to create a balanced and healthy relationship
                    with technology.
                  </p>
                  <button
                    onClick={() => navigate("login-page")}
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Set Your Limits Now
                  </button>
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      {/* </BackgroundGradientAnimation> */}
    </>
  );
};
export const Nav = NavComponents;
