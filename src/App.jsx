import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodList from "./components/FoodList";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          query
        )}&search_simple=1&json=1`
      );

      const data = await res.json();

      const filtered = data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ""
      );

      setResults(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>FoodFacts</h1>
      <h2>Food Search App 🍎</h2>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}

      {!loading && results.length === 0 && (
        <p>Search for a food to see nutrition info</p>
      )}

      {!loading && results.length > 0 && (
        <FoodList products={results} />
      )}
    </div>
  );
}

export default App;