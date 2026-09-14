import React from "react";

import { useReveal } from "../useInView";

import ui from "./miniature-ui.module.scss";
import s from "./SlackAlertGraphic.module.scss";
import { TrafficLights } from "./shared-rows";

const FAVICON = "/optimized/portfolio/supergood/sg-favicon.ico";

const SlackAlertGraphic = () => {
  const reveal = useReveal();

  return (
    <div className={`${s["root"]} ${ui["container"]}`} data-reveal={reveal}>
      <div className={s["window"]}>
        <div className={s["split"]}>
          {/* Sidebar */}
          <div className={s["sidebar"]}>
            <div className={s["sidebar-lights"]}>
              <TrafficLights />
            </div>
            <div className={`${s["workspace-badge"]} ${ui["text-md"]}`}>A</div>
            <div className={s["channels"]}>
              <div className={`${s["channel-stub"]} ${s["w10"]}`} />
              <div className={`${s["channel-stub"]} ${s["w8"]}`} />
              <div className={s["channel-active"]}>
                <span>#supergood-alerts</span>
                <div className={s["badge"]}>
                  <div>1</div>
                </div>
              </div>
              <div className={`${s["channel-stub"]} ${s["w9"]}`} />
            </div>
          </div>

          {/* Chat area */}
          <div className={s["chat"]}>
            <div className={`${s["chat-header"]} ${ui["text-sm"]}`}>
              # supergood-alerts
            </div>
            <div className={s["chat-body"]}>
              <div className={s["message"]}>
                <div className={s["avatar"]}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={FAVICON} alt="" role="presentation" />
                </div>
                <div className={s["message-body"]}>
                  <div className={s["message-meta"]}>
                    <span className={`${ui["text-sm"]} ${s["bold"]}`}>
                      Supergood Triager
                    </span>
                    <span className={`${ui["text-xxxs"]} ${s["app-tag"]}`}>
                      APP
                    </span>
                    <span
                      className={ui["text-mini"]}
                      style={{ color: "#9B9C9E" }}
                    >
                      8:01 AM
                    </span>
                  </div>
                  <div>
                    <div className={`${ui["text-sm"]} ${s["headline"]}`}>
                      FAILED · VendorCo › Create Work Order
                    </div>
                    <div className={s["quote"]}>
                      <div className={`${ui["text-sm"]} ${s["semibold"]}`}>
                        Error Response:{" "}
                      </div>
                      <pre className={`${ui["text-mini"]} ${s["error-block"]}`}>
                        {
                          '\'Unprocessable Entity: Missing required\n field "priority" in request body\''
                        }
                      </pre>
                      <span
                        className={ui["text-sm"]}
                        style={{ color: "#E8AB00" }}
                      >
                        🟡
                      </span>
                      <span className={`${ui["text-sm"]} ${s["bold"]}`}>
                        {" "}
                        Summary:{" "}
                      </span>
                      <span
                        className={ui["text-sm"]}
                        style={{ color: "#D1D2D3" }}
                      >
                        VendorCo updated their portal and added a required{" "}
                        <span className={s["code-inline"]}>priority</span> field
                        to the Create Work Order form. The integration submits
                        without it, triggering a 422 validation error on every
                        request.
                      </span>
                      <div className={`${s["facts"]} ${ui["text-sm"]}`}>
                        <div>
                          <div className={s["fact-label"]}>Likely Cause:</div>
                          <div className={s["fact-value"]}>
                            SCHEMA_VALIDATION
                          </div>
                        </div>
                        <div>
                          <div className={s["fact-label"]}>Severity:</div>
                          <div className={s["fact-value"]}>medium</div>
                        </div>
                      </div>
                      <div className={s["recommended"]}>
                        <span className={`${ui["text-sm"]} ${s["bold"]}`}>
                          Recommended:{" "}
                        </span>
                        <span
                          className={ui["text-sm"]}
                          style={{ color: "#D1D2D3" }}
                        >
                          Add the{" "}
                          <span className={s["code-inline"]}>priority</span>{" "}
                          field to the request body with a default value. The
                          portal now requires it on all work order submissions.
                          This typically happens when a vendor updates their
                          form without notice.
                        </span>
                      </div>
                      <div className={s["actions"]}>
                        <button
                          type="button"
                          className={`${ui["text-sm"]} ${s["action"]}`}
                        >
                          View Run
                        </button>
                        <button
                          type="button"
                          className={`${ui["text-sm"]} ${s["action"]}`}
                        >
                          Suggest Filter
                        </button>
                        <button
                          type="button"
                          className={`${s["glow-pulse"]} ${ui["text-sm"]} ${s["action-primary"]}`}
                        >
                          Generate Fix
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlackAlertGraphic;
