import React from 'react';

import PDFViewer from '@/components/PDFViewer';

import {Image as ImageType } from "./types"

const VIDEO_PATTERN = /(.*)[.mp4|.mov]$/;
const PDF_PATTERN = /(.*)[.pdf]$/;

const Asset = (asset: ImageType) => {
  const isVideo = asset.src.match(VIDEO_PATTERN);
  const isPDF = asset.src.match(PDF_PATTERN);

  const contentType = isVideo ? "video/mp4" : (isPDF ? "application/pdf" : `image/${asset.src.slice(-3)}`)

  switch (contentType) {
    case 'application/pdf':
      return <PDFViewer pdfUrl={`https:${asset.src}`} />;
    case 'video/mp4':
      return (
        <video controls>
          <source src={asset.src} type="video/mp4" />
          {asset.alt}
        </video>
      );
    default:
      return <img alt={asset.alt} src={asset.src} />;
  }
};

export default Asset;
