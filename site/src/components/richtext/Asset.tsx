import React from 'react';

import PDFViewer from './PDFViewer';

import { ContentfulMedia } from '../../types/contentful';

interface Props {
  asset: ContentfulMedia;
}

const Asset = ({ asset }: Props) => {
  switch (asset.file.contentType) {
    case 'application/pdf':
      return <PDFViewer pdfUrl={`https:${asset.file.url}`} />;
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
      return <img alt={asset.title} src={asset.file.url} />;
    case 'video/mp4':
      return (
        <video controls>
          <source src={asset.file.url} type={asset.file.contentType} />
        </video>
      );
    default:
      return null;
  }
};

export default Asset;
