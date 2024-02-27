"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";
import { useNavigate } from "react-router-dom";
import messageicon from "./assets/message-icon.svg";
import ham from "./assets/ham2.svg";
import { useState } from "react";
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
    </>
  );
};
export const Nav = NavComponents;
