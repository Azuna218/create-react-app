import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, getPaginationRowModel, ColumnDef } from '@tanstack/react-table';
import Pagination from './Pagination';
import Filters from './Filter';
import './ProductTable.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  rating: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products;
};

const ProductTable: React.FC = () => {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  const [filterQuery, setFilterQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(filterQuery.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true) &&
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    setFilteredProducts(filtered);
  }, [products, filterQuery, categoryFilter, priceRange]);

  const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));

  const table = useReactTable({
    data: filteredProducts,
    columns: [
      { accessorKey: 'title', header: 'Title' },
      { accessorKey: 'price', header: 'Price' },
      { accessorKey: 'description', header: 'Description' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'stock', header: 'Stock' },
      { accessorKey: 'rating', header: 'Rating' },
    ] as ColumnDef<Product, unknown>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Filters 
        setFilterQuery={setFilterQuery} 
        setCategoryFilter={setCategoryFilter} 
        setPriceRange={setPriceRange} 
        categories={uniqueCategories}  
      />

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {typeof header.column.columnDef.header === 'function'
                    ? (header.column.columnDef.header as (props: any) => React.ReactNode)({ column: header.column, table })
                    : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.getValue() as React.ReactNode}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pageIndex={pagination.pageIndex}
        pageCount={Math.ceil(filteredProducts.length / pagination.pageSize)}
        nextPage={() => setPagination((prev) => ({
          ...prev,
          pageIndex: Math.min(prev.pageIndex + 1, Math.ceil(filteredProducts.length / prev.pageSize) - 1)
        }))}
        previousPage={() => setPagination((prev) => ({
          ...prev,
          pageIndex: Math.max(prev.pageIndex - 1, 0)
        }))}
        setPageSize={(size) => setPagination((prev) => ({ ...prev, pageSize: size }))}
        gotoPage={(pageIndex: number) => setPagination((prev) => ({ ...prev, pageIndex }))}
      />
    </div>
  );
};

export default ProductTable;
