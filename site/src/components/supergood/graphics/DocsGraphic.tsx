import React from "react";

import { useReveal } from "../useInView";

import ui from "./miniature-ui.module.scss";
import s from "./DocsGraphic.module.scss";
import SupergoodBrowser from "./SupergoodBrowser";

const xxxs = ui["text-xxxs"];

const Param = ({
  name,
  type,
  required,
}: {
  name: string;
  type: string;
  required?: boolean;
}) => (
  <div className={s["param"]}>
    <div>
      <span className={`${xxxs} ${s["param-name"]}`}>{name}</span>
      <span className={`${xxxs} ${s["param-type"]}`}>{type}</span>
      {required && <span className={`${xxxs} ${s["required"]}`}>REQUIRED</span>}
    </div>
  </div>
);

const DocsGraphic = () => {
  const reveal = useReveal();

  return (
    <div className={`${s["root"]} ${ui["container"]}`} data-reveal={reveal}>
      <SupergoodBrowser
        scaled={false}
        breadcrumb={
          <>
            <span className={s["crumb-strong"]}>API Documentation</span>
            {" › "}VendorCo{" › "}Create Work Order
          </>
        }
      >
        <div className={s["full"]}>
          <div className={s["split"]}>
            <div className={s["sidebar"]}>
              <div className={`${xxxs} ${s["search"]}`}>🔍 Search docs...</div>

              <div className={`${xxxs} ${s["nav-heading"]}`}>
                Getting Started
              </div>
              <div className={s["nav-group"]}>
                <div className={`${xxxs} ${s["nav-item"]}`}>⚙ Quickstart</div>
                <div className={`${xxxs} ${s["nav-item"]}`}>
                  🔑 Authentication
                </div>
              </div>

              <div className={`${xxxs} ${s["nav-heading"]}`}>API Docs</div>
              <div className={s["nav-list"]}>
                <div className={`${xxxs} ${s["nav-parent"]}`}>▾ VendorCo</div>
                <div className={`${xxxs} ${s["nav-child"]}`}>
                  List Work Orders
                </div>
                <div className={`${xxxs} ${s["nav-child-active"]}`}>
                  Create Work Order
                </div>
                <div className={`${xxxs} ${s["nav-child"]}`}>Get Work Order</div>
                <div className={`${xxxs} ${s["nav-child"]}`}>Update Status</div>
                <div className={`${xxxs} ${s["nav-collapsed"]}`}>▸ Ye Olde</div>
              </div>
            </div>

            <div className={s["main"]}>
              <div className={s["banner"]}>
                <span className={ui["text-xxs"]}>✨</span>
                <span className={`${xxxs} ${s["banner-text"]}`}>
                  Docs autoupdated after priority field fix
                </span>
                <span className={`${xxxs} ${s["banner-time"]}`}>· 2 min ago</span>
                <span className={`${xxxs} ${s["banner-action"]}`}>View diff</span>
              </div>

              <div className={s["content"]}>
                <div className={`${xxxs} ${s["kicker"]}`}>VendorCo</div>
                <div className={`${ui["text-md"]} ${s["title"]}`}>
                  Create Work Order
                </div>

                <div className={s["tabs"]}>
                  <span className={`${xxxs} ${s["tab-active"]}`}>Overview</span>
                  <span className={`${xxxs} ${s["tab"]}`}>Background</span>
                  <span className={`${xxxs} ${s["tab"]}`}>Troubleshooting</span>
                  <span className={`${xxxs} ${s["tab"]}`}>History</span>
                </div>

                <div className={`${xxxs} ${s["intro"]}`}>
                  Creates a new work order in the VendorCo portal with the
                  specified parameters.
                </div>

                <div className={s["endpoint"]}>
                  <span className={`${xxxs} ${s["method"]}`}>POST</span>
                  <span className={`${xxxs} ${s["path"]}`}>/api/work-orders</span>
                </div>

                <div className={`${xxxs} ${s["body-label"]}`}>
                  Body <span>application/json</span>
                </div>
                <div className={s["params"]}>
                  <Param name="description" type="string" required />
                  <div className={s["priority-row"]}>
                    <div>
                      <span className={`${xxxs} ${s["param-name"]}`}>
                        priority
                      </span>
                      <span className={`${xxxs} ${s["param-type"]}`}>string</span>
                      <span className={`${xxxs} ${s["required"]}`}>
                        REQUIRED
                      </span>
                      <span className={`${xxxs} ${s["updated"]}`}>UPDATED</span>
                    </div>
                  </div>
                  <Param name="assignee" type="string" />
                  <Param name="dueDate" type="string" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SupergoodBrowser>
    </div>
  );
};

export default DocsGraphic;
