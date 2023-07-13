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
  withBoxShadow?: boolean;
}

const PDFViewer = ({ pdfUrl, withBoxShadow }: Props) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState(0);
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
      <div className={`pdf-viewer ${styles["embedded-pdf"]} ${withBoxShadow ? styles["with-box-shadow"] : ""}`}>
        <Document
          file={pdfUrl}
          onLoadError={console.error}
          onLoadSuccess={onDocumentLoadSuccess}
          externalLinkTarget="_blank"
        >
          <Page
            pageIndex={pageNumber}
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
                />
              )}
              {pageNumber < numPages && (
                <button
                  className={styles["next-page"]}
                  onClick={() => setPageNumber(pageNumber + 1)}
                  aria-label="Next page"
                />
              )}
            </div>
            <span className={styles["slide-numbers"]}>
              Slide {pageNumber + 1} of {numPages}
            </span>
          </>
        )}
      </div>
    )
  );
};

export default PDFViewer;
