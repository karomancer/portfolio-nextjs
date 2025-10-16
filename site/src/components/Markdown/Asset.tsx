import React from "react";

import PDFViewer from "@/components/PDFViewer";

import { Image as ImageType } from "./types";

const IMG_PATTERN = /(.*)[.jpeg|.jpg|.png|.gif|.webp]$/;
const VIDEO_GIF_PATTERN = /(.*)[.webm]$/;
const VIDEO_PATTERN = /(.*)[.mp4|.mov]$/;
const PDF_PATTERN = /(.*).pdf$/;

const Asset = (asset: ImageType) => {
  const isVideo = asset?.src.match(VIDEO_PATTERN);
  const isPDF = asset?.src.match(PDF_PATTERN);
  const isImg = asset?.src.match(IMG_PATTERN);
  const isVideoGif = asset?.src.match(VIDEO_GIF_PATTERN);

  if (isPDF) {
    return <PDFViewer pdfUrl={asset.src} isEmbedded />;
  }

  if (isImg) {
    return (
      <img
        className="p-asset"
        alt={asset.alt}
        src={asset.src}
        data-protected="true"
        data-original-src={asset.src}
      />
    );
  }

  if (isVideoGif) {
    return (
      <video autoPlay loop muted playsInline className="p-asset">
        <source src={asset.src} type="video/webm" />
        {asset.alt}
      </video>
    );
  }

  if (isVideo) {
    return (
      <video controls className="p-asset">
        <source src={asset.src} type="video/mp4" />
        {asset.alt}
      </video>
    );
  }

  return null;
};

export default Asset;
