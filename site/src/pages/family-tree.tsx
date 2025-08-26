import React, { useEffect } from "react";

import FamilyTree from "@/components/FamilyTree";

import styles from "@/components/FamilyTree/styles.module.scss";

const FamilyTreePage: React.FC = () => {
  return (
    <div className={styles["family-tree-page"]}>
      <h1>Chow Family Tree</h1>
      <FamilyTree />
    </div>
  );
};

export default FamilyTreePage;
