'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import TableCountries from '@/components/TableCountries';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import SearchInput from '@/components/SearchInput';
import { getCountries } from '@/actions/CountriesActions';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePaginate } from '@/hooks/usePaginate';

export default function Home() {
  const { paginatedData, paginate, currentPage, setCurrentPage } = usePaginate();

  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: () => getCountries(),
  });

  useEffect(() => {
    if (data?.length) {
      paginate(data, 5);
    }
  }, [data, paginate]);


  return (
    <main className="top-[200px] px-5 pb-10 absolute w-full flex items-center flex-col">
      <Card className="w-full xl:w-3/4 rounded-2xl border-[0.5px] border-neutral-700 px-6 py-5 overflow-auto max-h-[70vh] relative">
        <div className="flex justify-between items-center">
          <div className=" text-neutral-500 font-semibold">
            Found {data?.length || 0} countries
          </div>
          <SearchInput />
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex-1 pr-7 min-w-[250px]">
            <SideFilters />
          </div>
          <div className="flex-auto">
            <TableCountries data={paginatedData} isLoading={isLoading} />
          </div>
        </div>
      </Card>
      <div className='mt-3'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage-1)}/>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={() => setCurrentPage(currentPage+1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}

const SideFilters = () => {
  return (
    <div className="sticky top-0">
      <div className="mb-5">
        <h2 className="text-neutral-500 font-semibold text-xs mb-2 mt-3">
          Sort by
        </h2>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Population" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <h3 className="text-xs text-neutral-500 font-semibold mb-4">Region</h3>
      <div className="flex flex-wrap gap-2 w-full">
        <Badge variant="secondary" className="p-2 rounded-lg">
          Americas
        </Badge>
        <Badge variant="secondary" className="p-2 rounded-lg">
          Antartic
        </Badge>
        <Badge variant="outline" className="p-2 rounded-lg">
          Africa
        </Badge>
        <Badge variant="secondary" className="p-2 rounded-lg">
          Asia
        </Badge>
        <Badge variant="secondary" className="p-2 rounded-lg">
          Europe
        </Badge>
        <Badge variant="outline" className="p-2 rounded-lg">
          Oceania
        </Badge>
      </div>
      <h3 className="text-xs text-neutral-500 font-semibold my-4">Status</h3>
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Member of United Nations
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 checked:bg-sky-500"
          >
            Independent
          </label>
        </div>
      </div>
    </div>
  );
};
