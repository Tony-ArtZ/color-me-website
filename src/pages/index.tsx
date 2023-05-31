import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineMenu,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { IoCloseSharp, IoColorPalette, IoPersonSharp } from "react-icons/io5";

const ColorSwatch = ({ color, index }: { color: number[]; index: number }) => (
  <div
    className="inline-block w-24 h-24 mx-1 border-4 border-white border-solid rounded-lg drop-shadow-md"
    style={{ backgroundColor: `rgb(${color.toString()})` }}
  >
  </div>
);

export default function Home({ colors }: { colors: Array<number[]> }) {
  const [colorPalette, SetColorPalette] = useState(colors);
  const [sideBarActive, SetSideBarActive] = useState(false);

  const getColors = async () => {
    const res = await fetch("http://colormind.io/api/", {
      method: "POST",
      body: JSON.stringify({ model: "ui" }),
    });
    const data = await res.json();
    const colorResponse = data.result;
    SetColorPalette(colorResponse);
  };

  return (
    <main
      className="w-screen h-screen font-Inter"
      style={{
        backgroundColor: `rgb(${colorPalette[4]?.toString()})`,
        color: `rgb(${colorPalette[0]?.toString()})`,
      }}
    >
      <section className="flex justify-between py-4 bg-slate-800">
        {colorPalette.map((color, index) => (
          <ColorSwatch key={index} color={color} index={index} />
        ))}
        {/* <button onClick={getColors}>Regenerate</button> */}
      </section>
      <section>
        <div
          className={`absolute z-20 w-9/12 h-full ${
            sideBarActive ? "translate-x-0" : "-translate-x-full"
          } transform transition-allease-in-out duration-300 shadow-xl`}
          style={{ backgroundColor: `rgb(${colorPalette[3]?.toString()})` }}
        >
          <div className="flex items-center w-full h-16 px-2 text-3xl">
            <button onClick={() => SetSideBarActive(false)}>
              <IoCloseSharp />
            </button>
          </div>
          <section
            className="flex w-full p-4 rounded-lg shadow-lg bordeer-solid gap-4"
            style={{
              backgroundColor: `rgb(${colorPalette[2]?.toString()})`,
              borderColor: `rgb(${colorPalette[4]?.toString()})`,
            }}
          >
            <div
              className="w-24 h-24 p-2 border-4 border-solid rounded-full text-7xl grid place-items-center"
              style={{
                backgroundColor: `rgb(${colorPalette[1]?.toString()})`,
                color: `rgb(${colorPalette[0]?.toString()})`,
                borderColor: `rgb(${colorPalette[4]?.toString()})`,
              }}
            >
              <IoPersonSharp />
            </div>
            <div>
              <div className="flex flex-col items-center justify-center h-full">
                <h4 className="text-3xl font-BebasNeue">Jhon Doe</h4>
                <h6 className="font-Inter">Followers: 0</h6>
              </div>
            </div>
          </section>
          <section>
            <ul className="p-6 text-2xl font-bold font-Inter">
              <li>
                <Link
                  href="/"
                  className="flex items-center p-4 border-b-2 border-solid"
                >
                  <AiOutlineHome /> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/home"
                  className="flex items-center p-4 border-b-2 border-solid"
                >
                  <AiOutlineInfoCircle />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/home"
                  className="flex items-center p-4 border-b-2 border-solid"
                >
                  <AiOutlineQuestionCircle />
                  FAQ
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <nav
          className="relative flex items-center w-full h-16 px-2 font-bold shadow-lg"
          style={{ backgroundColor: `rgb(${colorPalette[3]?.toString()})` }}
        >
          <button
            onClick={() => SetSideBarActive(true)}
            className="absolute z-10 text-3xl font-bold md:hidden drop-shadow-md"
            style={{ color: `rgb(${colorPalette[0]?.toString()})` }}
          >
            <AiOutlineMenu />
          </button>
          <h1
            className="w-full text-center text-transparent md:w-fit drop-shadow-lg font-Pacifico"
            style={{
              background: `-webkit-linear-gradient(${`rgb(${colorPalette[0]?.toString()})`}, ${`rgb(${colorPalette[2]?.toString()})`})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Color Me Website
          </h1>

          <section className="hidden ml-auto mr-0 md:block">
            <Link
              href="/Home"
              className="px-2 text-center border-l-2 border-white border-solid first:border-none"
              style={{ borderColor: `rgb(${colorPalette[1]?.toString()})` }}
            >
              Home
            </Link>
            <Link
              href="/About"
              className="px-2 text-center border-l-2 border-white border-solid first:border-none"
              style={{ borderColor: `rgb(${colorPalette[1]?.toString()})` }}
            >
              About
            </Link>
            <Link
              href="/FAQ"
              className="px-2 text-center border-l-2 border-white border-solid first:border-none"
              style={{ borderColor: `rgb(${colorPalette[1]?.toString()})` }}
            >
              FAQ
            </Link>
          </section>
        </nav>
        <section
          className="flex flex-col items-center justify-center h-64 gap-4"
          style={{ backgroundColor: `rgb(${colorPalette[2]?.toString()})` }}
        >
          <h1
            className="text-4xl text-center font-BebasNeue"
            style={{ color: `rgb(${colorPalette[0]?.toString()})` }}
          >
            Welcome to Color me website
          </h1>
          <button
            className="p-4 px-6 font-bold shadow-lg rounded-xl outline-white hover:shadow-2xl ease-in-out duration-300 transition-all"
            style={{ backgroundColor: `rgb(${colorPalette[1]?.toString()})` }}
            onClick={getColors}
          >
            Click Me!
          </button>
        </section>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch("http://colormind.io/api/", {
    method: "POST",
    body: JSON.stringify({ model: "ui" }),
  });
  const data = await res.json();

  return {
    props: {
      colors: data.result,
    },
  };
};
