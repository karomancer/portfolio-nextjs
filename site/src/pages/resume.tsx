import styles from "@/sass/resume.module.scss";

import React from "react";

import Head from "@/components/Head";
import PDFViewer from "@/components/PDFViewer";

import CircuitsHeader from "@/components/CircuitsHeader";

const RESUME_URL = "/pdfs/resume.pdf";

const Resume = () => (
  <>
    <Head
      title="Resume"
      description="Fine, let's get professional. Here's my resume."
      ogUrl="/resume"
      ogImage="/images/og_image.png"
      keywords={[
        "karina chow",
        "karina",
        "chow",
        "portfolio site",
        "portfolio",
        "personal site",
        "personal website",
        "resume",
        "download",
        "linkedin",
        "links",
        "contact",
      ]}
    ></Head>
    <CircuitsHeader>Let's get professional.</CircuitsHeader>
    <main className={styles["resume"]}>
      <PDFViewer pdfUrl={RESUME_URL} withBoxShadow />
    </main>
  </>
);

Resume.displayName = "Resume";

export default Resume;
