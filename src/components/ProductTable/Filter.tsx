import React, { useState, useEffect } from 'react';

interface FiltersProps {
  setFilterQuery: React.Dispatch<React.SetStateAction<string>>;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  categories: string[];  // New prop to pass all available categories
}

const Filters: React.FC<FiltersProps> = ({ setFilterQuery, setCategoryFilter, setPriceRange, categories }) => {
  const [category, setCategory] = useState('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    setCategoryFilter(event.target.value);  // Set category filter in parent component
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: Number(event.target.value),
    }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        onChange={handleInputChange}
      />

      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {}
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div>
        <label>
          Price Range:
          <input type="number" onChange={(e) => handlePriceChange(e, 'min')} />
          to
          <input type="number" onChange={(e) => handlePriceChange(e, 'max')} />
        </label>
      </div>
    </div>
  );
};

export default Filters;
