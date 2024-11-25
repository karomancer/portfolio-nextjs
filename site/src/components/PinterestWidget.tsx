import React from "react";
import Script from "next/script";

// TODO: intersection observer so it doesn't appear until after the fold
const PinterestWidget = () => (
  <Script
    type="text/javascript"
    src="https://assets.pinterest.com/js/pinit.js"
  />
);

export default PinterestWidget;
