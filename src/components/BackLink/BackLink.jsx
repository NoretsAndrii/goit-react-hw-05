import { Link } from "react-router-dom";
// import css from "./BackLink.module.css";

export const BackLink = ({ to, children }) => {
  return <Link to={to}>{children}</Link>;
};
