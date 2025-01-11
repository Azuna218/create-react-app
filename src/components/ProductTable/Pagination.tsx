import React from 'react';

interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  nextPage: () => void;
  previousPage: () => void;
  gotoPage: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  pageCount,
  nextPage,
  previousPage,
  gotoPage,
  setPageSize,
}) => {
  return (
    <div>
      <button onClick={previousPage} disabled={pageIndex === 0}>
        Previous
      </button>
      <span>
        Page {pageIndex + 1} of {pageCount}
      </span>
      <button onClick={nextPage} disabled={pageIndex + 1 === pageCount}>
        Next
      </button>
      <select
        onChange={(e) => setPageSize(Number(e.target.value))}
        defaultValue={10}
      >
        {[10, 20, 30, 40, 50].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
