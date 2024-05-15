import { Input } from '@/components/ui/input';
import Image from 'next/image';
import SearchIcon from '@/public/img/Search.svg';

type Props = {};

const SearchInput = (props: Props) => {
  return (
    <div className="flex items-center">
      <div className="bg-neutral-800 p-[7px] rounded-l-xl">
        <Image src={SearchIcon} width={26} height={26} alt="search-icon" />
      </div>
      <Input
        type="text"
        placeholder="Search"
        className="max-w-[300px] sm:w-[300px] w-full bg-neutral-800 border-0 rounded-l-none rounded-r-xl"
      />
    </div>
  );
};

export default SearchInput;
