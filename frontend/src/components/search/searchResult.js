import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";  // Dùng useLocation để lấy dữ liệu từ state

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (location.state && location.state.searchResults) {
      setResults(location.state.searchResults);  // Lấy dữ liệu từ state và lưu vào state local của trang này
    }
  }, [location.state]);

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.jobTitle}</li> // Hiển thị các công việc tìm được
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
