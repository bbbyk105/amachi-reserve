"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [bgImage, setBgImage] = useState("/images/amachi-catalog1-1.png");
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showHexagon, setShowHexagon] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const updateBgImage = () => {
      const width = window.innerWidth;
      const desktop = width >= 1024;
      setIsDesktop(desktop);
      setBgImage(
        desktop
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

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setShowHexagon(true);
    }
  };

  const handleMouseLeave = () => {
    setShowHexagon(false);
    setIsHovered(false);
  };

  return (
    <a
      ref={containerRef}
      href="https://example.com"
      className="block w-screen h-screen relative cursor-pointer overflow-hidden bg-black group"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
      aria-label="予約ページへ遷移"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* EMERGENCY ヘキサゴン - カーソル位置に表示（PCのみ） */}
      {isDesktop && showHexagon && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: "translate(-50%, -50%)",
            animation: "hexagon-appear 0.4s ease-out 0s, hexagon-pulse 1.5s ease-in-out 0.4s infinite",
          }}
        >
          <img
            src="/images/emergency.png"
            alt="EMERGENCY"
            className="w-auto h-auto"
            style={{
              width: "250px",
              height: "auto",
            }}
          />
        </div>
      )}
      {/* スキャンライン */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(transparent 50%, rgba(139, 92, 246, 0.03) 50%)",
          backgroundSize: "100% 4px",
          animation: "scanline 3s linear infinite",
        }}
      />

      {/* グリッチエフェクト */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "screen",
          animation: "glitch 0.3s infinite",
        }}
      />

      {/* 警告フラッシュ */}
      <div
        className="absolute inset-0 pointer-events-none z-15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "rgba(139, 92, 246, 0.1)",
          animation: "warning-flash 1s ease-in-out infinite",
        }}
      />

      {/* 応募ボタン - エヴァンゲリオン風 */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-500 ${
          isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div
          style={{
            position: "relative",
            padding: "16px 48px",
            background: "#dc2626",
            border: "3px solid #000",
            clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
            fontFamily: "monospace",
            animation: "button-glow 2s ease-in-out infinite",
            cursor: "pointer",
          }}
        >
          {/* 左上の切り欠き */}
          <div
            style={{
              position: "absolute",
              top: "-3px",
              right: "17px",
              width: "20px",
              height: "20px",
              background: "#000",
              clipPath: "polygon(0 0, 100% 0, 100% 100%)",
            }}
          />
          {/* 右下の切り欠き */}
          <div
            style={{
              position: "absolute",
              bottom: "-3px",
              left: "17px",
              width: "20px",
              height: "20px",
              background: "#000",
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          />
          <div className="flex items-center gap-4">
            {/* 左側の警告アイコン */}
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
              style={{
                color: "#000",
                fontSize: "18px",
                fontWeight: "900",
                letterSpacing: "3px",
                textTransform: "uppercase",
                animation: "text-blink 1.5s ease-in-out infinite",
                fontFamily: "monospace",
              }}
            >
              応募する
            </span>
            {/* 右側の警告アイコン */}
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
      </div>

      {/* 幾何学的パターン（コーナー） */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute top-4 left-4 w-16 h-16 border-2 border-purple-400/50"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute top-4 right-4 w-16 h-16 border-2 border-cyan-400/50"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 70% 30%, 0 30%)",
            animation: "pulse-glow 2s ease-in-out 1s infinite",
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute bottom-4 left-4 w-16 h-16 border-2 border-purple-400/50"
          style={{
            clipPath: "polygon(0 0, 30% 0, 30% 70%, 100% 70%, 100% 100%, 0 100%)",
            animation: "pulse-glow 2s ease-in-out 0.5s infinite",
          }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute bottom-4 right-4 w-16 h-16 border-2 border-cyan-400/50"
          style={{
            clipPath: "polygon(70% 0, 100% 0, 100% 100%, 0 100%, 0 70%, 70% 70%)",
            animation: "pulse-glow 2s ease-in-out 1.5s infinite",
          }}
        />
      </div>

      <span className="sr-only">予約ページへ遷移</span>
    </a>
  );
}
