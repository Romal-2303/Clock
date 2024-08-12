import Footer from "./Footer/Footer";
import classes from "./Layout.module.scss";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={classes["layout-container"]}>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
