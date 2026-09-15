import React from "react";

import { useReveal } from "../useInView";

import ui from "./miniature-ui.module.scss";
import s from "./RunDetailGraphic.module.scss";
import SupergoodBrowser from "./SupergoodBrowser";

const xxxs = ui["text-xxxs"];
const xxs = ui["text-xxs"];

const Metric = ({ label, value, error }: { label: string; value: string; error?: boolean }) => (
  <div className={s["metric"]}>
    <div className={`${xxxs} ${s["label"]}`}>{label}</div>
    <div className={`${xxs} ${error ? s["value-error"] : s["value"]}`}>
      {value}
    </div>
  </div>
);

const Event = ({
  time,
  text,
  tone,
}: {
  time: string;
  text: string;
  tone: "blue" | "red";
}) => (
  <div className={s["event"]}>
    <div className={`${s["dot"]} ${s[tone]}`}>
      <span />
    </div>
    <div>
      <div className={`${xxxs} ${s["label"]}`}>{time}</div>
      <div className={`${xxxs} ${tone === "red" ? s["text-error"] : s["text"]}`}>
        {text}
      </div>
    </div>
  </div>
);

const Arg = ({ name, value, last }: { name: string; value: string; last?: boolean }) => (
  <>
    {"  "}
    <span className={s["key"]}>{`"${name}"`}</span>
    {": "}
    <span className={s["string"]}>{`"${value}"`}</span>
    {!last && <br />}
  </>
);

const RunDetailGraphic = () => {
  const reveal = useReveal();

  return (
    <div className={`${s["root"]} ${ui["container"]}`} data-reveal={reveal}>
      <SupergoodBrowser
        scaled={false}
        breadcrumb={
          <>
            <span className={s["crumb-strong"]}>Integration Runs</span>
            {" › "}VendorCo{" › "}Run a3f8b2
          </>
        }
      >
        <div className={s["scroll-breath"]}>
          <div className={s["run-header"]}>
            <div className={s["run-title-row"]}>
              <span className={`${xxxs} ${s["status-pill"]}`}>Failed</span>
              <span className={`${ui["text-mini"]} ${s["run-name"]}`}>
                Create Work Order
              </span>
            </div>
            <div className={`${xxxs} ${s["label"]}`}>
              Started Mar 30, 2026 08:01 AM · Duration: 1.24s
            </div>
          </div>

          <div className={s["metrics"]}>
            <Metric label="Status" value="Failed" error />
            <Metric label="Duration" value="1.24s" />
            <Metric label="Events" value="4" />
            <Metric label="Anomalies" value="1" />
          </div>

          <div className={s["columns"]}>
            <div className={`${s["main-column"]} ${s["stack"]}`}>
              <div className={s["error-card"]}>
                <div className={`${xxs} ${s["error-title"]}`}>Primary Error</div>
                <div className={`${xxxs} ${s["stack-trace"]}`}>
                  Error: Request failed with status 422
                  <br />
                  {"    at submitWorkOrder (create.js:6:12)"}
                  <br />
                  {"    at ConnectedStoreV2.run (lib/store.js:84:9)"}
                  <br />
                  {"    at process.processTimers (node:internal/timers:523:7)"}
                </div>
              </div>

              <div className={s["analysis-card"]}>
                <div className={s["analysis-head"]}>
                  <span className={`${xxs} ${s["value"]}`}>
                    ✨ AI Error Analysis
                  </span>
                  <span className={`${xxxs} ${s["analysis-tag"]}`}>
                    Service Error
                  </span>
                </div>
                <div className={s["section"]}>
                  <div className={`${xxxs} ${s["sub-label"]}`}>Summary</div>
                  <div className={`${xxxs} ${s["text"]}`}>
                    VendorCo updated their portal and now requires a
                    &quot;Priority&quot; field on work order submissions.
                  </div>
                </div>
                <div className={s["section"]}>
                  <div className={`${xxxs} ${s["sub-label"]}`}>
                    Probable Cause
                  </div>
                  <div className={`${xxxs} ${s["text"]}`}>
                    The integration submits without the new required field,
                    triggering a 422 validation error.
                  </div>
                </div>
                <div>
                  <div className={`${xxxs} ${s["sub-label"]}`}>Suggested Fix</div>
                  <div className={`${xxxs} ${s["text"]}`}>
                    Add &quot;Priority&quot; to the request body with a default
                    value.
                  </div>
                </div>
              </div>

              <div className={s["card"]}>
                <div className={`${xxs} ${s["card-title"]}`}>
                  ↔ Event Timeline
                </div>
                <div className={`${xxxs} ${s["timeline-note"]}`}>
                  4 events captured during this run
                </div>
                <div className={s["stack"]}>
                  <Event time="0.12s" text="POST /work-orders" tone="blue" />
                  <Event time="0.84s" text="Submitting form data" tone="blue" />
                  <Event time="1.24s" text="Error: Status 422" tone="red" />
                  <Event
                    time="1.24s"
                    text="Anomaly: SCHEMA_VALIDATION"
                    tone="red"
                  />
                </div>
              </div>
            </div>

            <div className={`${s["side-column"]} ${s["stack"]}`}>
              <div className={s["card"]}>
                <div className={`${xxs} ${s["card-title-spaced"]}`}>
                  ⚙ Arguments
                </div>
                <div className={`${xxxs} ${s["args"]}`}>
                  <span className={s["punctuation"]}>{"{"}</span>
                  <br />
                  <Arg name="location" value="Unit 4B" />
                  <Arg name="description" value="Fix water leak" />
                  <Arg name="assignee" value="alex@acme.com" />
                  <span className={s["punctuation"]}>{"}"}</span>
                </div>
              </div>

              <div className={s["card"]}>
                <div className={`${xxs} ${s["card-title-spaced"]}`}>
                  Quick Actions
                </div>
                <div className={s["stack-tight"]}>
                  <div className={`${xxxs} ${s["action-primary"]}`}>
                    ↻ Resend Request
                  </div>
                  <div className={`${xxxs} ${s["action-secondary"]}`}>
                    📋 Export as JSON
                  </div>
                </div>
              </div>

              <div className={s["card"]}>
                <div className={`${xxs} ${s["card-title-spaced"]}`}>
                  ⓘ Run Details
                </div>
                <div className={s["detail-row"]}>
                  <div>
                    <div className={`${xxxs} ${s["label"]}`}>Started</div>
                    <div className={`${xxxs} ${s["text"]}`}>Mar 30, 08:01 AM</div>
                  </div>
                  <div>
                    <div className={`${xxxs} ${s["label"]}`}>Ended</div>
                    <div className={`${xxxs} ${s["text"]}`}>Mar 30, 08:01 AM</div>
                  </div>
                </div>
              </div>

              <div className={s["card"]}>
                <div className={`${xxs} ${s["card-title-spaced"]}`}>
                  Related Runs
                </div>
                <div className={s["stack-tight"]}>
                  <div>
                    <div className={`${xxxs} ${s["sub-label"]}`}>
                      Last Successful Run
                    </div>
                    <div className={`${xxxs} ${s["label"]}`}>
                      Run b7c2d1 · Mar 29, 07:45 AM
                    </div>
                  </div>
                  <div>
                    <div className={`${xxxs} ${s["sub-label"]}`}>Auth Run</div>
                    <div className={`${xxxs} ${s["label"]}`}>
                      Run e4f901 · Mar 30, 08:00 AM
                    </div>
                  </div>
                </div>
              </div>

              <div className={s["card"]}>
                <div className={`${xxs} ${s["card-title-spaced"]}`}>
                  ▷ Session Recording
                </div>
                <div className={`${xxxs} ${s["recording"]}`}>
                  ▷ Load Recording
                </div>
              </div>
            </div>
          </div>
        </div>
      </SupergoodBrowser>
    </div>
  );
};

export default RunDetailGraphic;
