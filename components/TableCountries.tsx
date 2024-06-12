import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Skeleton } from './ui/skeleton';

type Props = {
  data: any[];
  isLoading?: boolean;
};

const TableCountries = ({ data = [], isLoading = false }: Props) => {
  const heads = ['Flag', 'Name', 'Population', 'Area(km2)', 'Region'];

  if (data.length === 0)
    return (
      <div className="flex justify-center items-center h-full w-full pb-10">
        No Data to show
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {heads.map((item, index) => (
            <TableHead
              key={index}
              className="text-neutral-500 font-semibold text-xs"
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <Loading />
        ) : (
          data.map((item: any, index: number) => (
            <>
              <TableRow key={index}>
                <TableCell className="w-[100px]">
                  <div
                    className="overflow-hidden rounded-sm w-[60px] h-[40px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.flags.png})` }}
                  />
                </TableCell>
                <TableCell className="w-[150px]">{item.name.common}</TableCell>
                <TableCell className="w-[150px]">{item.population}</TableCell>
                <TableCell className="w-[150px]">{item.area} Km2</TableCell>
                <TableCell className="w-[150px]">{item.region}</TableCell>
              </TableRow>
            </>
          ))
        )}
      </TableBody>
    </Table>
  );
};

const Loading = () => (
  <>
    {Array.from({ length: 5 }, (_, item) => (
      <TableRow key={item}>
        <TableCell>
          <Skeleton className="h-10 w-14 rounded-lg" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default TableCountries;
