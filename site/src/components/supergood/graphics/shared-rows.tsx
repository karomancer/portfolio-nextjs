import React from "react";

import ui from "./miniature-ui.module.scss";

export const TrafficLights = () => (
  <div className={ui["traffic-lights"]}>
    <span />
    <span />
    <span />
  </div>
);

const METHOD_CLASS: Record<string, string> = {
  GET: ui["method-get"],
  POST: ui["method-post"],
  PUT: ui["method-put"],
  DELETE: ui["method-delete"],
};

const STATUS_CLASS: Record<string, string> = {
  "2": ui["status-2"],
  "4": ui["status-4"],
  "5": ui["status-5"],
};

export const NetworkLogRow = ({
  method,
  path,
  status,
  anim,
}: {
  method: string;
  path: string;
  status: number;
  anim: string;
}) => {
  const methodClass = METHOD_CLASS[method] || ui["method-other"];
  const statusClass =
    STATUS_CLASS[String(Math.floor(status / 100))] || ui["status-other"];

  return (
    <div className={`${anim} ${ui["log-row"]}`}>
      <span className={`${ui["text-xxs"]} ${ui["pill"]} ${methodClass}`}>
        {method}
      </span>
      <span className={`${ui["text-xxs"]} ${ui["log-path"]}`}>{path}</span>
      <span className={`${ui["text-xxs"]} ${ui["pill"]} ${statusClass}`}>
        {status}
      </span>
    </div>
  );
};

export const IntegrationRow = ({
  name,
  path,
  position,
}: {
  name: string;
  path: string;
  position: "first" | "middle" | "last" | "only";
}) => {
  const divided =
    position === "first" || position === "only" ? "" : ui["divided"];

  return (
    <div className={`${ui["integration-row"]} ${divided}`}>
      <div>
        <div className={`${ui["text-mini"]} ${ui["integration-name"]}`}>
          {name}
        </div>
        <div className={`${ui["text-xxs"]} ${ui["integration-path"]}`}>
          {path}
        </div>
      </div>
      <div className={ui["integration-actions"]}>
        <div className={`${ui["btn"]} ${ui["btn-primary"]}`}>{"▶"} Run</div>
        <div className={`${ui["btn"]} ${ui["btn-secondary"]}`}>Edit Code</div>
      </div>
    </div>
  );
};
