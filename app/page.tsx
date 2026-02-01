"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [bgImage, setBgImage] = useState("/images/amachi-catalog1-1.png");
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showHexagon, setShowHexagon] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBgImage = () => {
      const width = window.innerWidth;
      const desktop = width >= 1024;
      setIsDesktop(desktop);
      setBgImage(
        desktop
          ? "/images/amachi-catalog2-1.png"
          : "/images/amachi-catalog1-1.png"
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
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      setCursorPos({
        x: cursorX,
        y: cursorY,
      });

      // ボタンの範囲内かチェック
      if (buttonRef.current && isHovered) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const buttonLeft = buttonRect.left;
        const buttonRight = buttonRect.right;
        const buttonTop = buttonRect.top;
        const buttonBottom = buttonRect.bottom;

        const isOverButton =
          e.clientX >= buttonLeft &&
          e.clientX <= buttonRight &&
          e.clientY >= buttonTop &&
          e.clientY <= buttonBottom;

        setShowHexagon(!isOverButton);
      } else {
        setShowHexagon(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setShowHexagon(false);
    setIsHovered(false);
  };

  const handleButtonMouseEnter = () => {
    setShowHexagon(false);
  };

  const handleButtonMouseLeave = () => {
    setShowHexagon(true);
  };

  const showCta = isDesktop ? isHovered : true;

  return (
    <a
      ref={containerRef}
      href="https://forms.gle/tpgzDMQnH2XbABPSA"
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
            animation:
              "hexagon-appear 0.4s ease-out 0s, hexagon-pulse 1.5s ease-in-out 0.4s infinite",
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
        className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 ${
          isDesktop ? "opacity-0 group-hover:opacity-100" : "opacity-70"
        }`}
        style={{
          backgroundImage: `linear-gradient(transparent 50%, ${
            isDesktop ? "rgba(139, 92, 246, 0.03)" : "rgba(139, 92, 246, 0.06)"
          } 50%)`,
          backgroundSize: "100% 4px",
          backgroundRepeat: "repeat",
          animation: "scanline 3s linear infinite",
        }}
      />

      {/* グリッチエフェクト */}
      <div
        className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${
          isDesktop ? "opacity-0 group-hover:opacity-30" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "screen",
          animation: isDesktop ? "glitch 0.3s infinite" : "none",
        }}
      />

      {/* 警告フラッシュ */}
      <div
        className={`absolute inset-0 pointer-events-none z-15 transition-opacity duration-300 ${
          isDesktop ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
        style={{
          background: isDesktop
            ? "rgba(139, 92, 246, 0.1)"
            : "rgba(139, 92, 246, 0.06)",
          animation: isDesktop
            ? "warning-flash 1s ease-in-out infinite"
            : "warning-flash 2.4s ease-in-out infinite",
        }}
      />

      {/* 応募ボタン - エヴァンゲリオン風 */}
      <div
        ref={buttonRef}
        className={`absolute left-1/2 transform -translate-x-1/2 z-30 transition-all duration-500 ${
          isDesktop ? "bottom-32" : "bottom-12"
        } ${
          showCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
      >
        <div
          style={{
            position: "relative",
            padding: isDesktop ? "16px 48px" : "12px 32px",
            background: "#dc2626",
            border: isDesktop ? "3px solid #000" : "2px solid #000",
            clipPath: isDesktop
              ? "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))"
              : "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
            fontFamily: "monospace",
            animation: "button-glow 2s ease-in-out infinite",
            cursor: "pointer",
          }}
        >
          {/* 左上の切り欠き */}
          <div
            style={{
              position: "absolute",
              top: isDesktop ? "-3px" : "-2px",
              right: isDesktop ? "17px" : "12px",
              width: isDesktop ? "20px" : "15px",
              height: isDesktop ? "20px" : "15px",
              background: "#000",
              clipPath: "polygon(0 0, 100% 0, 100% 100%)",
            }}
          />
          {/* 右下の切り欠き */}
          <div
            style={{
              position: "absolute",
              bottom: isDesktop ? "-3px" : "-2px",
              left: isDesktop ? "17px" : "12px",
              width: isDesktop ? "20px" : "15px",
              height: isDesktop ? "20px" : "15px",
              background: "#000",
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          />
          <div className={`flex items-center ${isDesktop ? "gap-4" : "gap-2"}`}>
            {/* 左側の警告アイコン */}
            <div
              style={{
                width: "0",
                height: "0",
                borderLeft: isDesktop
                  ? "8px solid transparent"
                  : "6px solid transparent",
                borderRight: isDesktop
                  ? "8px solid transparent"
                  : "6px solid transparent",
                borderBottom: isDesktop ? "12px solid #000" : "9px solid #000",
                animation: "text-blink 1s ease-in-out infinite",
              }}
            />
            <span
              style={{
                color: "#000",
                fontSize: isDesktop ? "18px" : "14px",
                fontWeight: "900",
                letterSpacing: isDesktop ? "3px" : "2px",
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
                borderLeft: isDesktop
                  ? "8px solid transparent"
                  : "6px solid transparent",
                borderRight: isDesktop
                  ? "8px solid transparent"
                  : "6px solid transparent",
                borderTop: isDesktop ? "12px solid #000" : "9px solid #000",
                animation: "text-blink 1s ease-in-out 0.5s infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* 幾何学的パターン（コーナー） */}
      <div
        className={`absolute top-0 left-0 w-32 h-32 pointer-events-none z-20 transition-opacity duration-500 ${
          isDesktop ? "opacity-0 group-hover:opacity-100" : "opacity-30"
        }`}
      >
        <div
          className="absolute top-4 left-4 w-16 h-16 border-2 border-purple-400/50"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />
      </div>
      <div
        className={`absolute top-0 right-0 w-32 h-32 pointer-events-none z-20 transition-opacity duration-500 ${
          isDesktop ? "opacity-0 group-hover:opacity-100" : "opacity-30"
        }`}
      >
        <div
          className="absolute top-4 right-4 w-16 h-16 border-2 border-cyan-400/50"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 70% 30%, 0 30%)",
            animation: "pulse-glow 2s ease-in-out 1s infinite",
          }}
        />
      </div>
      <div
        className={`absolute bottom-0 left-0 w-32 h-32 pointer-events-none z-20 transition-opacity duration-500 ${
          isDesktop ? "opacity-0 group-hover:opacity-100" : "opacity-30"
        }`}
      >
        <div
          className="absolute bottom-4 left-4 w-16 h-16 border-2 border-purple-400/50"
          style={{
            clipPath:
              "polygon(0 0, 30% 0, 30% 70%, 100% 70%, 100% 100%, 0 100%)",
            animation: "pulse-glow 2s ease-in-out 0.5s infinite",
          }}
        />
      </div>
      <div
        className={`absolute bottom-0 right-0 w-32 h-32 pointer-events-none z-20 transition-opacity duration-500 ${
          isDesktop ? "opacity-0 group-hover:opacity-100" : "opacity-30"
        }`}
      >
        <div
          className="absolute bottom-4 right-4 w-16 h-16 border-2 border-cyan-400/50"
          style={{
            clipPath:
              "polygon(70% 0, 100% 0, 100% 100%, 0 100%, 0 70%, 70% 70%)",
            animation: "pulse-glow 2s ease-in-out 1.5s infinite",
          }}
        />
      </div>

      <span className="sr-only">予約ページへ遷移</span>
    </a>
  );
}
