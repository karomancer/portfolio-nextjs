import React from "react";

import PDFViewer from "@/components/PDFViewer";

import { Image as ImageType } from "./types";

import styles from "./styles.module.scss";

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

// `![alt](/path/clip.webm#phone)` renders the media inside a phone bezel at a
// fixed height. A fragment rather than a query so the request is byte-identical.
const PHONE_MARKER = "#phone";

const Asset = (rawAsset: ImageType) => {
  const isPhone = !!rawAsset?.src?.endsWith(PHONE_MARKER);
  const asset = isPhone
    ? { ...rawAsset, src: rawAsset.src!.slice(0, -PHONE_MARKER.length) }
    : rawAsset;

  const isVideo = asset?.src.match(VIDEO_PATTERN);
  const isPDF = asset?.src.match(PDF_PATTERN);
  const isImg = asset?.src.match(IMG_PATTERN);
  const isVideoGif = asset?.src.match(VIDEO_GIF_PATTERN);
  const posterSrc = asset.title?.startsWith("/") ? asset.title : undefined;

  const framed = (el: JSX.Element) =>
    isPhone ? <span className={styles["phone-frame"]}>{el}</span> : el;

  if (isPDF) {
    return <PDFViewer pdfUrl={asset.src} isEmbedded />;
  }

  if (isImg) {
    return (
      <>
        {framed(
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={asset.src}
            className="p-asset"
            alt={asset.alt}
            src={asset.src}
            data-protected="true"
            data-original-src={asset.src}
          />
        )}
        <Caption text={asset.title} />
      </>
    );
  }

  if (isVideoGif) {
    return (
      <>
        {framed(
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
        )}
        <Caption text={asset.title} />
      </>
    );
  }

  if (isVideo) {
    return (
      <>
        {framed(
          <video
            aria-label={asset.alt}
            controls
            className="p-asset"
            poster={posterSrc}
          >
            <source src={asset.src} type="video/mp4" />
            {asset.alt}
          </video>
        )}
        <Caption text={posterSrc ? undefined : asset.title} />
      </>
    );
  }

  return null;
};

export default Asset;
