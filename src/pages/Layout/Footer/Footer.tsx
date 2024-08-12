import { ReactNode, useEffect, useState } from "react";
import classes from "./Footer.module.scss";
import TabbedComponent from "../../../components/TabbedComponent/TabbedComponent";
import StopWatch from "../../../assets/icons/stopwatch";
import Timer from "../../../assets/icons/Timer";
import Globe from "../../../assets/icons/Globe";
import { useNavigate } from "react-router-dom";

let staticTabArr = [
  {
    id: 1,
    text: "World Clock",
    svg: <Globe height={22} width={22} color="rgb(200, 200, 200)" />,
    path: "/worldclock",
  },
  {
    id: 2,
    text: "Stopwatch",
    svg: <StopWatch height={22} width={22} color="rgb(200, 200, 200)" />,
    path: "/stopwatch",
  },
  {
    id: 3,
    text: "Timers",
    svg: <Timer height={22} width={22} color="rgb(200, 200, 200)" />,
    path: "/timers",
  },
] as any;

const Footer = ({}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const extractedPath = window.location.pathname ?? "";

    const extracedIndex = staticTabArr.findIndex(
      (el: any) => el.path === extractedPath
    );

    setActiveTab(extracedIndex);
  });

  const tabChangeHandler = (receivedIndex: number) => {
    navigate(staticTabArr[receivedIndex].path);
  };

  return (
    <div>
      <TabbedComponent
        tabArr={staticTabArr}
        onChange={tabChangeHandler}
        activeTab={activeTab}
      />
    </div>
  );
};

export default Footer;
