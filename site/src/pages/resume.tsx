import styles from "./resume.module.scss";

import React from "react";

import PDFViewer from "@/components/richtext/PDFViewer";

import CircuitsHeader from "@/components/CircuitsHeader";

const RESUME_URL = "/pdfs/resume.pdf";

const Resume = () => (
  <>
    <CircuitsHeader>Let's get professional.</CircuitsHeader>
    <main className={`page ${styles["resume"]}`}>
      <div className={styles["resume-links"]}>
        <a
          href={RESUME_URL}
          className={styles["upload-link"]}
          download="KarinaChow_resume"
        >
          Download
        </a>
      </div>
      <PDFViewer pdfUrl={RESUME_URL} />
    </main>
  </>
);

export default Resume;
