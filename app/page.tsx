'use client';

import { useEffect, useState } from 'react';
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
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';

enum FilterType {
  name = 'name',
  unMember = 'unMember',
  region = 'region',
  population = 'population',
  independent = 'independent',
}

type IFilter = {
  [key in FilterType]?: any;
};

interface IChip {
  name: string;
  isActive: boolean;
}

const chipList: IChip[] = [
  { name: 'Americas', isActive: false },
  { name: 'Antartic', isActive: false },
  { name: 'Africa', isActive: false },
  { name: 'Asia', isActive: false },
  { name: 'Europe', isActive: false },
  { name: 'Oceania', isActive: false },
];

export default function Home() {
  const [filterBy, setFilterBy] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const { paginatedData, paginate, currentPage, setCurrentPage } =
    usePaginate();

  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: () => getCountries(),
  });

  useEffect(() => {
    if (data?.length) {
      setFilteredData(data);
    }
  }, [data]);

  const handleFilter = (filter: IFilter) => {
    
    if(filter?.region && !filter?.region){
      delete filter.region
    }
    console.log(filter);

    let filtered = data.filter((item: any) => {
      for (var key in filter) {
        if (item[key] === undefined || item[key] != filter[key as FilterType])
          return false;
      }

      return true;
    });

    setFilteredData(filtered);

    console.log(filtered);
  };

  useEffect(() => {
    if (filteredData?.length) {
      paginate(filteredData, 10);
    } else {
      paginate([], 0);
    }
  }, [filteredData, paginate]);

  return (
    <main className="top-[200px] px-5 pb-10 absolute w-full flex items-center flex-col">
      <Card className="w-full xl:w-3/4 rounded-2xl border-[0.5px] border-neutral-700 px-6 py-5 overflow-auto max-h-[65vh] relative">
        <div className="flex justify-between items-center">
          <div className=" text-neutral-500 font-semibold">
            Found {filteredData?.length || 0} countries
          </div>          
          <SearchInput />
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex-1 pr-7 max-w-[300px] min-w-[200px]">
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
              <h3 className="text-xs text-neutral-500 font-semibold mb-4">
                Region
              </h3>
              <ChipList
                chips={chipList}
                onClick={(region) =>
                  handleFilter({ [FilterType.region]: region })
                }
              />
              <h3 className="text-xs text-neutral-500 font-semibold my-4">
                Status
              </h3>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Checkbox
                    id={FilterType.unMember}
                    onCheckedChange={(e) =>
                      handleFilter({ [FilterType.unMember]: e })
                    }
                  />
                  <label
                    htmlFor={FilterType.unMember}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Member of United Nations
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={FilterType.independent}
                    onCheckedChange={(e) =>
                      handleFilter({ [FilterType.unMember]: e })
                    }
                  />
                  <label
                    htmlFor={FilterType.independent}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 checked:bg-sky-500"
                  >
                    Independent
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto">
            <TableCountries data={paginatedData} isLoading={isLoading} />
          </div>
        </div>
      </Card>
      <div className="mt-3">
        {paginatedData.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </main>
  );
}

const ChipList = ({
  chips,
  onClick,
}: {
  chips: any[];
  onClick: (region: string) => void;
}) => {
  const [list, setChips] = useState<IChip[]>(chips);
  const handleClick = (chip: IChip) => {
    setChips(
      list.map((el) =>
        el.name === chip.name ? { ...el, isActive: !el.isActive } : el
      )
    );

    if (onClick) {
      onClick(chip.isActive ? '' : chip.name);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {list.map((chip: IChip) => (
        <Badge
          key={chip.name}
          variant={chip.isActive ? 'secondary' : 'outline'}
          className="p-2 rounded-lg cursor-pointer"
          onClick={() => handleClick(chip)}
        >
          {chip.name}
        </Badge>
      ))}
    </div>
  );
};
