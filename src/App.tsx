import React from "react";
import { Layout } from "antd";
import { useResizable } from "react-resizable-layout";
import { classSplitter } from "./app/utils/classSplitter";
import SplitterLayout from "./app/components/SplitterLayout";
import { ClaimPanel } from "./app/components/ClaimPanel";
import { MapPanel } from "./app/components/MapPanel";

import "./App.css";

const App = () => {
  const { Content } = Layout;

  const {
    isDragging: isClaimPanelDragging,
    position: claimPanel,
    splitterProps: claimPanelDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 700,
    min: 0,
  });

  return (
    <Layout id="layout">
      <Content className="site-layout">
        <div className="flex flex-column font-mono overflow-hidden">
          <div className="flex grow">
            <div
              className={classSplitter(
                "shrink-0 contents",
                isClaimPanelDragging && "dragging"
              )}
              style={{ width: claimPanel }}
            >
              <ClaimPanel />
            </div>

            <SplitterLayout
              isDragging={isClaimPanelDragging}
              {...claimPanelDragBarProps}
            />

            <div className={"flex grow"}>
              <div
                className={classSplitter(
                  "shrink-0 contents",
                  isClaimPanelDragging && "dragging"
                )}
              >
                <MapPanel />
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
