import { useState, useCallback } from 'react';

export const usePaginate = () => {
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = useCallback(
    (array: any = [], pageSize: number) => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      setPaginatedData(array.slice(startIndex, endIndex) as any);
    },
    [currentPage]
  );

  return { paginatedData, paginate, currentPage, setCurrentPage };
};
