import { Fragment } from "react";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default Layout;
