import React from 'react';
import ProductTable from './components/ProductTable/ProductTable'; // Import the ProductTable component

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Product List</h1>
      <ProductTable /> {/* Render the ProductTable */}
    </div>
  );
};

export default App;
