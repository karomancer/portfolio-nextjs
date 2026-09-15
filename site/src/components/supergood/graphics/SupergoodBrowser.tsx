import React from "react";

import ui from "./miniature-ui.module.scss";
import { TrafficLights } from "./shared-rows";

const FAVICON = "/optimized/portfolio/supergood/sg-favicon.ico";

const Chrome = ({ breadcrumb }: { breadcrumb: React.ReactNode }) => (
  <div className={ui["browser-bar"]}>
    <TrafficLights />
    <div className={ui["browser-favicon"]}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={FAVICON} alt="" role="presentation" width={16} height={16} />
    </div>
    <span className={`${ui["text-xxxs"]} ${ui["breadcrumb"]}`}>
      {breadcrumb}
    </span>
  </div>
);

const SupergoodBrowser = ({
  breadcrumb,
  children,
  scaled = true,
}: {
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
  scaled?: boolean;
}) => (
  <div
    className={`${ui["browser"]} ${
      scaled ? ui["scaled"] : ui["unscaled"]
    }`}
  >
    {scaled ? (
      <div className={ui["browser-inner-scaled"]}>
        <Chrome breadcrumb={breadcrumb} />
        {children}
      </div>
    ) : (
      <div className={ui["browser-inner-full"]}>
        <Chrome breadcrumb={breadcrumb} />
        <div className={ui["browser-body"]}>{children}</div>
      </div>
    )}
  </div>
);

export default SupergoodBrowser;
