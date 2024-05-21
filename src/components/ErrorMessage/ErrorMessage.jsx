import { GoAlertFill } from "react-icons/go";
import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div className={css.error}>
      <GoAlertFill size={100} color="red" />
      <p>Whoops, something went wrong! Please try reloading this page!</p>
    </div>
  );
}
