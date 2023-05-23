import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  const [textColor, SetTextColor] = useState(`rgb(${colors[0]?.toString()})`);
  return (
    <main
      className="h-screen w-screen"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <section>
        {colors.map((color) => (
          <div
            className="h-4 w-4 inline-block"
            key={color.toString()}
            style={{ backgroundColor: `rgb(${color.toString()})` }}
          ></div>
        ))}
      </section>
      <section>
        <nav
          className="w-full h-16 flex font-bold items-center"
          style={{ backgroundColor: secondaryColor }}
        >
          <Link href="/Home" className="border-l-2 first:border-none text-center px-2 border-solid border-white">Home</Link>
          <Link href="/About" className="border-l-2 border-solid first:border-none text-center px-2 border-white">About</Link>
          <Link href="/FAQ" className="border-l-2 border-solid first:border-none text-center px-2 border-white">FAQ</Link>
        </nav>
        <button
          className="p-4 rounded-xl shadow-lg border-black outline-white border-2 font-bold hover:shadow-2xl ease-in-out duration-300 border-solid transition-all"
          style={{ backgroundColor: interactiveColor }}
        >
          Click Me!
        </button>
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
