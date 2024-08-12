import React, { ReactNode, useEffect, useState } from "react";
import classes from "./TabbedComponent.module.scss";

interface tabArrObj {
  text: string;
  svg: ReactNode;
  id: number;
  path?: string;
}

interface tabbedComponentProps {
  tabArr: tabArrObj[];
  activeTab?: number;
  onChange?: (index: number) => void;
}

const TabbedComponent = ({
  tabArr,
  activeTab = 0,
  onChange,
}: tabbedComponentProps) => {
  const [tabArrRec, setTabArrRec] = useState<tabArrObj[]>([]);
  const [activeTabRec, setActiveTabRec] = useState<number>(activeTab);

  useEffect(() => {
    setTabArrRec(tabArr);
  }, [tabArr]);

  useEffect(() => {
    setActiveTabRec(activeTab);
  }, [activeTab]);

  const tabClickHandler = (recIndex: number) => () => {
    setActiveTabRec(recIndex);
    onChange?.(recIndex);
  };

  return (
    <div className={classes["tabbed-component"]}>
      {tabArrRec &&
        tabArrRec.length > 0 &&
        tabArrRec.map((tab: tabArrObj, index: number) => {
          return (
            <>
              <div
                key={tab.id}
                className={
                  activeTabRec === index
                    ? `${classes["tab-element-container"]} ${classes["tab-element-container-active"]}`
                    : `${classes["tab-element-container"]}`
                }
                onClick={tabClickHandler(index)}
              >
                <div className={classes["tab-svg-container"]}>{tab.svg}</div>
                <div className={classes["tab-text-container"]}>{tab.text}</div>
              </div>
              {index !== tabArrRec.length - 1 && (
                <div className={classes["tab-separator"]}></div>
              )}
            </>
          );
        })}
    </div>
  );
};

export default TabbedComponent;
