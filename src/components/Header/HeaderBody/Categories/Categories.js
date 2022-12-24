import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Categories.css";

function Categories() {
  const [fishCategories, setFishCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setFishCategories(data));
  }, []);

  return (
    <div>
      <div className="dropdown open categories">
        <button
          className="btn  categories-btn"
          type="button"
          aria-expanded="true"
        >
          Categories
        </button>
        <ul className="dropdown-menu show">
          {fishCategories.map((fish) => (
            <div key={fish.id}>
              <li>
                <Link className="dropdown-item" to={`/categories/${fish.name}`}>
                  {" "}
                  {fish.name}
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
