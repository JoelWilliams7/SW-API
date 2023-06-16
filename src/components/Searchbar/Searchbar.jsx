import "./Searchbar.css";
import searchIcon from "../../assets/Groupsearchicon.svg";

function Searchbar({ inputValue, onChange, onSearch }) {
  function handleEnter(event) {
    if (event.key !== "Enter") return;
    onSearch();
  }
  return (
    <div className="searchbar-container">
      <label htmlFor="">
        <img src={searchIcon} alt="" />
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        placeholder="Search"
        onKeyDown={handleEnter}
      />
    </div>
  );
}

export default Searchbar;
