"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [pdfSrc, setPdfSrc] = useState("/amachi-catalog1.pdf");

  useEffect(() => {
    const updatePdfSrc = () => {
      // 画面の向きを判定
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setPdfSrc(isPortrait ? "/amachi-catalog1.pdf" : "/amachi-catalog2.pdf");
    };

    // 初回実行
    updatePdfSrc();

    // 画面の向きが変わったときに再判定
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const handleOrientationChange = () => {
      updatePdfSrc();
    };

    // イベントリスナーを追加（古いブラウザ対応）
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleOrientationChange);
    } else {
      // 古いブラウザ対応
      mediaQuery.addListener(handleOrientationChange);
    }

    // リサイズ時も再判定（念のため）
    window.addEventListener("resize", updatePdfSrc);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleOrientationChange);
      } else {
        mediaQuery.removeListener(handleOrientationChange);
      }
      window.removeEventListener("resize", updatePdfSrc);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* PDF表示用のiframe */}
      <iframe
        src={pdfSrc}
        className="w-full h-full border-0"
        title="PDF Catalog"
        aria-label="PDFカタログ"
        key={pdfSrc}
      />

      {/* 透明なオーバーレイリンク */}
      <a
        href="https://example.com"
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label="外部サイトへ遷移"
      >
        {/* 透明な要素でクリック領域を確保 */}
        <span className="sr-only">外部サイトへ遷移</span>
      </a>
    </div>
  );
}
