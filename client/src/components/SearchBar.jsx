export default function SearchBar({ searchTerm, setSearchTerm }) {
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = `./search/${searchTerm}`;
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <label htmlFor="search">
        <input
          id="search"
          name="sarch"
          onChange={handleChange}
          placeholder="Search for a game"
          required
          type="text"
          value={searchTerm}
        />
      </label>
      <button>Search</button>
    </form>
  );
}
