import React, { useRef, useEffect } from "react";
import f3 from "family-chart"; // npm install family-chart@0.7.2 or yarn add family-chart@0.7.2

import FAMILY_DATA from "./family-tree.json";

import "family-chart/styles/family-chart.css";
import styles from "./styles.module.scss";

function create(data) {
  const f3Chart = f3
    .createChart("#FamilyChart", data)
    .setTransitionTime(1000)
    .setCardXSpacing(300)
    .setCardYSpacing(150)
    .setSingleParentEmptyCard(false, { label: "ADD" })
    .setShowSiblingsOfMain(false)
    .setOrientationVertical()
    .setSortChildrenFunction((a, b) =>
      a.data["first name"] === b.data["first name"]
        ? 0
        : a.data["first name"] > b.data["first name"]
        ? 1
        : -1
    );

  const f3Card = f3Chart
    .setCard(f3.CardHtml)
    .setCardDisplay([["first name", "last name"], ["birthday"]])
    .setCardDim({ width: 270, height: 85 })
    .setMiniTree(true)
    .setStyle("imageRect")
    .setOnHoverPathToMain();

  const f3EditTree = f3Chart
    .editTree()
    .fixed(true)
    .setFields(["first name", "last name", "birthday", "avatar"])
    .setEditFirst(false)
    .setCardClickOpen(f3Card);

  f3EditTree.setNoEdit();

  f3Chart.updateTree({ initial: true });
  //   f3EditTree.open(f3Chart.getMainDatum());

  f3Chart.updateTree({ initial: true });
}

const FamilyTree = () => {
  const cont = useRef();

  useEffect(() => {
    if (!cont.current) return;
    create(FAMILY_DATA);
  }, [cont.current]);

  return (
    <div
      className={`f3 f3-cont ${styles["family-chart"]}`}
      id="FamilyChart"
      ref={cont}
    ></div>
  );
};

export default FamilyTree;
