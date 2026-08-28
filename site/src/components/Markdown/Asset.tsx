import React from "react";

import PDFViewer from "@/components/PDFViewer";

import { Image as ImageType } from "./types";

const IMG_PATTERN = /(.*)[.jpeg|.jpg|.png|.gif|.webp]$/;
const VIDEO_GIF_PATTERN = /(.*)[.webm]$/;
const VIDEO_PATTERN = /(.*)[.mp4|.mov]$/;
const PDF_PATTERN = /(.*).pdf$/;

const Caption = ({ text }: { text?: string }) =>
  text ? (
    <span className="p-figcaption" aria-hidden="true">
      {text}
    </span>
  ) : null;

const Asset = (asset: ImageType) => {
  const isVideo = asset?.src.match(VIDEO_PATTERN);
  const isPDF = asset?.src.match(PDF_PATTERN);
  const isImg = asset?.src.match(IMG_PATTERN);
  const isVideoGif = asset?.src.match(VIDEO_GIF_PATTERN);
  const posterSrc = asset.title?.startsWith("/") ? asset.title : undefined;

  if (isPDF) {
    return <PDFViewer pdfUrl={asset.src} isEmbedded />;
  }

  if (isImg) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="p-asset"
          alt={asset.alt}
          src={asset.src}
          data-protected="true"
          data-original-src={asset.src}
        />
        <Caption text={asset.title} />
      </>
    );
  }

  if (isVideoGif) {
    return (
      <>
        <video
          aria-label={asset.alt}
          autoPlay
          loop
          muted
          playsInline
          className="p-asset"
        >
          <source src={asset.src} type="video/webm" />
          {asset.alt}
        </video>
        <Caption text={asset.title} />
      </>
    );
  }

  if (isVideo) {
    return (
      <>
        <video
          aria-label={asset.alt}
          controls
          className="p-asset"
          poster={posterSrc}
        >
          <source src={asset.src} type="video/mp4" />
          {asset.alt}
        </video>
        <Caption text={posterSrc ? undefined : asset.title} />
      </>
    );
  }

  return null;
};

export default Asset;
