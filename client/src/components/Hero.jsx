import React from "react";
import FancyHeader from "./FancyHeader.jsx";

export default function Hero({
  onGenerate,
  onExportXlsx,
  onExportPdf,
  disableExports,
}) {
  return (
    <header className="relative z-[1]">
      <div className="container">
        <FancyHeader
          onGenerate={onGenerate}
          onExportXlsx={onExportXlsx}
          onExportPdf={onExportPdf}
          disableExports={disableExports}
        />
      </div>
    </header>
  );
}
