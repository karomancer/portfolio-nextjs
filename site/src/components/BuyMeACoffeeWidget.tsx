import Script from "next/script";
import { useEffect, useState } from "react";

const BuyMeACoffeeWidget = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render on client to avoid hydration issues
  if (!mounted) return null;

  return (
    <Script
      id="bmc-widget-script"
      src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
      strategy="afterInteractive"
      data-name="BMC-Widget"
      data-cfasync="false"
      data-id="karomancer"
      data-description="Support me on Buy me a coffee!"
      data-message="Hey! If you enjoy what I'm doing and want to support me in my creative journey, consider buying me a tea 💚"
      data-color="#40DCA5"
      data-position="Right"
      data-x_margin="18"
      data-y_margin="18"
      onLoad={() => {
        // Ensure the widget button has a high enough z-index
        setTimeout(() => {
          const btn = document.getElementById("bmc-wbtn");
          if (btn) {
            btn.style.zIndex = "99999";
          }
        }, 100);
      }}
    />
  );
};

export default BuyMeACoffeeWidget;
