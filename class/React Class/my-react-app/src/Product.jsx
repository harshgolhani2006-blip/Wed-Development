import { useEffect, useState } from "react";
import "./App.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProducts(data.products);
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      alert("Please enter product name");
      return;
    }

    const res = await fetch(
      `https://dummyjson.com/products/search?q=${search}`
    );

    const data = await res.json();
    setProducts(data.products);
    setCurrentPage(1);
  };

  let filteredProducts = [...products];

  if (brand !== "All") {
    filteredProducts = filteredProducts.filter(
      (item) => item.brand === brand
    );
  }

  if (sort === "priceLow") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceHigh") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const brands = [
    "All",
    ...new Set(products.map((item) => item.brand)),
  ];

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentProducts = filteredProducts.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  return (
    <div className="container">
      <h1>Product Listing App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filters">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price Low to High</option>
          <option value="priceHigh">Price High to Low</option>
          <option value="rating">Rating</option>
        </select>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {brands.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {currentProducts.map((item) => (
          <div className="card" key={item.id}>
            <img
              src={item.thumbnail}
              alt={item.title}
            />
            <h3>{item.title}</h3>
            <p>{item.description.slice(0, 60)}...</p>
            <h4>${item.price}</h4>
            <span>⭐ {item.rating}</span>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Product;