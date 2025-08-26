import React from "react";
import f3 from "family-chart"; // npm install family-chart@0.7.2 or yarn add family-chart@0.7.2

import FAMILY_DATA from "./family-tree.json";

import "family-chart/styles/family-chart.css";

export default class FamilyTree extends React.Component {
  cont = React.createRef();

  componentDidMount() {
    if (!this.cont.current) return;

    create(FAMILY_DATA);

    function create(data) {
      const f3Chart = f3
        .createChart("#FamilyChart", data)
        .setTransitionTime(1000)
        .setCardXSpacing(250)
        .setCardYSpacing(150)
        .setSingleParentEmptyCard(false, { label: "ADD" })
        .setShowSiblingsOfMain(false)
        .setSortChildrenFunction((a, b) =>
          a.data["first name"] === b.data["first name"]
            ? 0
            : a.data["first name"] > b.data["first name"]
            ? 1
            : -1
        )
        .setOrientationVertical();

      const f3Card = f3Chart
        .setCard(f3.CardHtml)
        .setCardDisplay([["first name", "last name"], ["birthday"]])
        .setCardDim({ width: 220, height: 85 })
        .setMiniTree(true)
        .setStyle("imageRect")
        .setOnHoverPathToMain();

      //   const f3EditTree = f3Chart
      //     .editTree()
      //     .fixed(true)
      //     .setFields(["first name", "last name", "birthday", "avatar"])
      //     .setEditFirst(true)
      //     .setCardClickOpen(f3Card);

      //   f3EditTree.setEdit();

      f3Chart.updateTree({ initial: true });
      //   f3EditTree.open(f3Chart.getMainDatum());

      f3Chart.updateTree({ initial: true });
    }
  }

  render() {
    return <div className="f3 f3-cont" id="FamilyChart" ref={this.cont}></div>;
  }
}
