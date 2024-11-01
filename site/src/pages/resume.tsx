import styles from "@/sass/resume.module.scss";

import React from "react";
import Head from "next/head";

import PDFViewer from "@/components/PDFViewer";

import CircuitsHeader from "@/components/CircuitsHeader";

const RESUME_URL = "/pdfs/resume.pdf";

const Resume = () => (
  <>
    <Head>
      <title>Karina Chow | Resume </title>
      <meta
        name="description"
        content="Fine, let's get professional.  Here's my resume."
      />
      <meta
        name="keywords"
        content="karina chow, karina, chow, portfolio site, portfolio, personal site, personal website, resume, download, linkedin, links, contact"
      />
      <meta property="og:title" content="Karina Chow | Resume" key="title" />
      <meta property="og:url" content="http://www.karinachowtime.com/resume" />
    </Head>
    <CircuitsHeader>Let's get professional.</CircuitsHeader>
    <main className={`page ${styles["resume"]}`}>
      <PDFViewer pdfUrl={RESUME_URL} withBoxShadow />
    </main>
  </>
);

Resume.displayName = "Resume";

export default Resume;
