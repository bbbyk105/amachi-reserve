"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [bgImage, setBgImage] = useState("/images/amachi-catalog1-1.png");

  useEffect(() => {
    const updateBgImage = () => {
      const width = window.innerWidth;
      setBgImage(
        width >= 1024
          ? "/images/amachi-catalog2-1.png"
          : "/images/amachi-catalog1-1.png",
      );
    };

    updateBgImage();

    window.addEventListener("resize", updateBgImage);

    return () => {
      window.removeEventListener("resize", updateBgImage);
    };
  }, []);

  return (
    <a
      href="https://example.com"
      className="block w-screen h-screen relative cursor-pointer overflow-hidden bg-black"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
      aria-label="予約ページへ遷移"
    >
      <span className="sr-only">予約ページへ遷移</span>
    </a>
  );
}
