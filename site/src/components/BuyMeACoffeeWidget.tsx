import React from "react";
import Script from "next/script";

// TODO: intersection observer so it doesn't appear until after the fold
const BuyMeACoffeeWidget = () => (
  <Script
    src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
    strategy="beforeInteractive"
    data-name="BMC-Widget"
    data-cfasync="false"
    data-id="karomancer"
    data-description="Support me on Buy me a coffee!"
    data-message="Hey! If you enjoy what I'm doing and want to support me in my creative journey while I'm in graduate school, consider buying me a tea 💚"
    data-color="#40DCA5"
    data-position="Right"
    data-x_margin="18"
    data-y_margin="18"
  />
);

export default BuyMeACoffeeWidget;
