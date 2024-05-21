import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return <ThreeDots color="grey" wrapperClass={css.wrapper} />;
}
