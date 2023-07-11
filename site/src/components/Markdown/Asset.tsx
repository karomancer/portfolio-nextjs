import React from "react";

import PDFViewer from "@/components/PDFViewer";

import { Image as ImageType } from "./types";

const IMG_PATTERN = /(.*)[.jpeg|.jpg|.png|.gif]$/;
const VIDEO_PATTERN = /(.*)[.mp4|.mov]$/;
const PDF_PATTERN = /(.*)[.pdf]$/;

const Asset = (asset: ImageType) => {
  const isVideo = asset?.src.match(VIDEO_PATTERN);
  const isPDF = asset?.src.match(PDF_PATTERN);
  const isImg = asset?.src.match(IMG_PATTERN);

  if (isVideo) {
    return (
      <video controls>
        <source src={asset.src} type="video/mp4" />
        {asset.alt}
      </video>
    );
  }

  if (isPDF) {
    return <PDFViewer pdfUrl={`https:${asset.src}`} />;
  }

  if (isImg) {
    return <img alt={asset.alt} src={asset.src} />;
  }

  return null;
};

export default Asset;
