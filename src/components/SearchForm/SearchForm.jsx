import { PiMagnifyingGlassBold } from "react-icons/pi";
import css from "./SearchForm.module.css";

export default function SearchForm({ onSearch, notify }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear("query");
    const form = e.target;
    const query = form.elements.input.value.toLowerCase().trim();
    if (query === "") return notify();
    onSearch(query);
    form.reset();
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        name="input"
      />
      <button className={css.button} type="submit">
        <PiMagnifyingGlassBold />
      </button>
    </form>
  );
}
