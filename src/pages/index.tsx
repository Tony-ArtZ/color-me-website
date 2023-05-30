import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineMenu, AiOutlineQuestionCircle } from "react-icons/ai";
import { IoCloseSharp, IoPersonSharp } from "react-icons/io5"

export default function Home({ colors }: { colors: Array<number[]> }) {
  const [backgroundColor, SetBackgroundColor] = useState(
    `rgb(${colors[4]?.toString()})`
  );
  const [primaryColor, SetPrimaryColor] = useState(
    `rgb(${colors[2]?.toString()})`
  );
  const [secondaryColor, SetSecondaryColor] = useState(
    `rgb(${colors[3]?.toString()})`
  );
  const [interactiveColor, SetInteractiveColor] = useState(
    `rgb(${colors[1]?.toString()})`
  );
  const [textColor, SetTextColor] = useState(
    `rgb(${colors[0]?.toString()})`
  );
  const [sideBarActive, SetSideBarActive] = useState(false);

  const getColors = async ()=>{
  const res = await fetch("http://colormind.io/api/", {
    method: "POST",
    body: JSON.stringify({ model: "ui" }),
  });
  const data = await res.json();
  const colorResponse = data.result
  SetBackgroundColor(
    `rgb(${colorResponse[4]?.toString()})`
  )
  SetSecondaryColor(
    `rgb(${colorResponse[3]?.toString()})`
  )
  SetPrimaryColor(
    `rgb(${colorResponse[2]?.toString()})`
  )
  SetInteractiveColor(
    `rgb(${colorResponse[1]?.toString()})`
  )
  SetTextColor(
    `rgb(${colorResponse[0]?.toString()})`
  )

  }
  return (
    <main
      className="w-screen h-screen font-Inter"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <section>
        {colors.map((color) => (
          <div
            className="inline-block w-4 h-4"
            key={color.toString()}
            style={{ backgroundColor: `rgb(${color.toString()})` }}
          ></div>
        ))}
        <button onClick={getColors}>Regenerate</button>
      </section>
      <section>
        <div
          className={`absolute z-20 w-9/12 h-full ${sideBarActive?"translate-x-0":"-translate-x-full"} transform transition-allease-in-out duration-300 shadow-xl`}
          style={{ backgroundColor: secondaryColor }}
        >
          <div className="flex items-center w-full h-16 px-2 text-3xl">
            <button
              onClick={()=>SetSideBarActive(false)}
            >
              <IoCloseSharp/>
            </button>
          </div>
          <section className="flex w-full p-4 rounded-lg shadow-lg bordeer-solid gap-4" style={{backgroundColor:primaryColor, borderColor: backgroundColor}}>
              <div className="w-24 h-24 p-2 border-4 border-solid rounded-full text-7xl grid place-items-center" style={{backgroundColor:interactiveColor, color:textColor, borderColor: backgroundColor}}>
                  <IoPersonSharp/>
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
              <li><Link href="/" className="flex items-center p-4 border-b-2 border-solid"><AiOutlineHome/> Home</Link></li>
              <li><Link href="/home" className="flex items-center p-4 border-b-2 border-solid"><AiOutlineInfoCircle/>About</Link></li>
              <li><Link href="/home" className="flex items-center p-4 border-b-2 border-solid"><AiOutlineQuestionCircle/>FAQ</Link></li>
            </ul>
          </section>
        </div>
        <nav
          className="relative flex items-center w-full h-16 px-2 font-bold shadow-lg"
          style={{ backgroundColor: secondaryColor }}
        >
          <button
            onClick={()=>SetSideBarActive(true)}
            className="absolute z-10 text-3xl font-bold md:hidden drop-shadow-md"
            style={{ color: textColor }}
          >
            <AiOutlineMenu />
          </button>
          <h1
            className="w-full text-lg text-center md:w-fit bg-clip-text drop-shadow-lg font-Pacifico"
            style={{
              background: `-webkit-linear-gradient(${textColor}, ${primaryColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Color Me Website
          </h1>

          <section className="hidden ml-auto mr-0 md:block">
            <Link
              href="/Home"
              className="px-2 text-center border-l-2 border-white border-solid first:border-none"
              style={{ borderColor: interactiveColor }}
            >
              Home
            </Link>
            <Link
              href="/About"
              className="px-2 text-center border-l-2 border-white border-solid first:border-none"
              style={{ borderColor: interactiveColor }}
            >
              About
            </Link>
            <Link
              href="/FAQ"
              className="px-2 text-center border-l-2 border-white border-solid first:border-none"
              style={{ borderColor: interactiveColor }}
            >
              FAQ
            </Link>
          </section>
        </nav>
        <section
          className="flex flex-col items-center justify-center h-64 gap-4"
          style={{ backgroundColor: primaryColor }}
        >
          <h1
            className="text-4xl text-center font-BebasNeue"
            style={{ color: textColor }}
          >
            Welcome to Color me website
          </h1>
          <button
            className="p-4 px-6 font-bold shadow-lg rounded-xl outline-white hover:shadow-2xl ease-in-out duration-300 transition-all"
            style={{ backgroundColor: interactiveColor }}
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
  console.log(data);

  return {
    props: {
      colors: data.result,
    },
  };
};
