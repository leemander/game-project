export default function SearchBar({ searchTerm, setSearchTerm }) {
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = `/search/${searchTerm}`;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Search for a game:</label>
      <input
        id="search"
        name="sarch"
        onChange={handleChange}
        required
        type="text"
        value={searchTerm}
      />
      <button>Search</button>
    </form>
  );
}
