"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(Math.random() > 0.5 ? "404" : "ERROR");
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* 背景のグリッドパターン */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* スキャンライン */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "linear-gradient(transparent 50%, rgba(220, 38, 38, 0.05) 50%)",
          backgroundSize: "100% 4px",
          animation: "scanline 3s linear infinite",
        }}
      />

      {/* メインコンテンツ */}
      <div className="relative z-20 text-center px-4">
        {/* 404 テキスト - グリッチエフェクト */}
        <div className="mb-8">
          <h1
            className="text-9xl md:text-[12rem] font-black text-red-600 relative"
            style={{
              fontFamily: "monospace",
              textShadow: `
                0 0 10px rgba(220, 38, 38, 0.8),
                0 0 20px rgba(220, 38, 38, 0.6),
                0 0 30px rgba(220, 38, 38, 0.4),
                4px 4px 0 #000,
                -4px -4px 0 #000,
                4px -4px 0 #000,
                -4px 4px 0 #000
              `,
              animation: "glitch 0.3s infinite",
              letterSpacing: "0.1em",
            }}
          >
            {glitchText}
          </h1>
        </div>

        {/* エラーメッセージ */}
        <div className="mb-12">
          <div
            className="inline-block px-6 py-3 mb-4"
            style={{
              background: "#dc2626",
              border: "3px solid #000",
              clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
              fontFamily: "monospace",
            }}
          >
            <span
              className="text-black font-bold text-lg md:text-xl uppercase tracking-wider"
              style={{
                animation: "text-blink 1.5s ease-in-out infinite",
              }}
            >
              PAGE NOT FOUND
            </span>
          </div>
          <p
            className="text-red-400 text-sm md:text-base font-mono tracking-wider"
            style={{
              animation: "text-blink 2s ease-in-out infinite",
            }}
          >
            指定されたページは存在しません
          </p>
        </div>

        {/* ホームに戻るボタン */}
        <Link
          href="/"
          className="inline-block relative group"
          style={{
            fontFamily: "monospace",
          }}
        >
          <div
            className="px-8 py-4 md:px-12 md:py-5"
            style={{
              background: "#dc2626",
              border: "3px solid #000",
              clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
              animation: "button-glow 2s ease-in-out infinite",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {/* 左上の切り欠き */}
            <div
              className="absolute top-0 right-5 w-5 h-5 bg-black"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%)",
              }}
            />
            {/* 右下の切り欠き */}
            <div
              className="absolute bottom-0 left-5 w-5 h-5 bg-black"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
              }}
            />
            <div className="flex items-center gap-4 relative z-10">
              <div
                style={{
                  width: "0",
                  height: "0",
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "12px solid #000",
                  animation: "text-blink 1s ease-in-out infinite",
                }}
              />
              <span
                className="text-black font-black text-base md:text-lg uppercase tracking-widest"
                style={{
                  animation: "text-blink 1.5s ease-in-out infinite",
                }}
              >
                RETURN
              </span>
              <div
                style={{
                  width: "0",
                  height: "0",
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: "12px solid #000",
                  animation: "text-blink 1s ease-in-out infinite",
                  animationDelay: "0.5s",
                }}
              />
            </div>
          </div>
        </Link>
      </div>

      {/* コーナーの幾何学的パターン */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none z-10">
        <div
          className="absolute top-4 left-4 w-16 h-16 border-2 border-red-600/50"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none z-10">
        <div
          className="absolute top-4 right-4 w-16 h-16 border-2 border-red-600/50"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 70% 30%, 0 30%)",
            animation: "pulse-glow 2s ease-in-out 1s infinite",
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none z-10">
        <div
          className="absolute bottom-4 left-4 w-16 h-16 border-2 border-red-600/50"
          style={{
            clipPath: "polygon(0 0, 30% 0, 30% 70%, 100% 70%, 100% 100%, 0 100%)",
            animation: "pulse-glow 2s ease-in-out 0.5s infinite",
          }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none z-10">
        <div
          className="absolute bottom-4 right-4 w-16 h-16 border-2 border-red-600/50"
          style={{
            clipPath: "polygon(70% 0, 100% 0, 100% 100%, 0 100%, 0 70%, 70% 70%)",
            animation: "pulse-glow 2s ease-in-out 1.5s infinite",
          }}
        />
      </div>

      {/* 警告フラッシュ */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: "rgba(220, 38, 38, 0.1)",
          animation: "warning-flash 1s ease-in-out infinite",
        }}
      />
    </div>
  );
}
