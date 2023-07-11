import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import styles from "./styles.module.scss";

const isWindowDefined = typeof window !== "undefined";

if (isWindowDefined) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
}

interface Props {
  pdfUrl: string;
}

const PDFViewer = ({ pdfUrl }: Props) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(0);

  type OnDocumentLoadSuccess = { numPages: number };
  function onDocumentLoadSuccess({ numPages }: OnDocumentLoadSuccess) {
    setNumPages(numPages);
  }

  useEffect(() => {
    setWidth(
      document.querySelector(".pdf-viewer")?.clientWidth || window.innerWidth
    );
  });

  return (
    isWindowDefined && (
      <div className={`pdf-viewer ${styles["embedded-pdf"]}`}>
        <Document
          file={pdfUrl}
          onLoadError={console.error}
          onLoadSuccess={onDocumentLoadSuccess}
          externalLinkTarget="_blank"
        >
          <Page
            pageIndex={0}
            width={width}
            height={1400}
            renderAnnotationLayer={true}
            onRenderAnnotationLayerSuccess={console.log}
            renderTextLayer={false}
          />
        </Document>
        {numPages > 1 && (
          <>
            <div className={styles["page-controls"]}>
              {pageNumber > 1 && (
                <button
                  className={styles["previous-page"]}
                  onClick={() => setPageNumber(pageNumber - 1)}
                  aria-label="Previous page"
                >
                  ‹
                </button>
              )}
              {pageNumber < numPages && (
                <button
                  className={styles["next-page"]}
                  onClick={() => setPageNumber(pageNumber + 1)}
                  aria-label="Next page"
                >
                  ›
                </button>
              )}
            </div>
            <span className={styles["slide-numbers"]}>
              Slide {pageNumber} of {numPages}
            </span>
          </>
        )}
      </div>
    )
  );
};

export default PDFViewer;
