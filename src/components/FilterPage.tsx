import React from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { useResturant } from '@/store/useResturantStore';

export interface IFilterOptions {
  id: string,
  label: string
};

const filterOptions: IFilterOptions[] = [
  { 
    id: "burger",
    label: "Burger"
  },
  { 
    id: "thali",
    label: "Thali"
  },
  { 
    id: "biriyani",
    label: "Biriyani"
  },
  { 
    id: "momos",
    label: "Momos"
  },
];


const FilterPage:React.FC = () => {
  const { setAppliedFilter, appliedFilter, resetFilter } = useResturant();
  const appliedFilterHandler = (val: string) => {
    setAppliedFilter(val);
  };

  return (
    <div className='md:w-72'>
      <div className='flex items-center justify-between'>
        <h1 className='font-medium text-lg'>Filter by cuisines</h1>
        <Button variant={'link'} onClick={() => resetFilter()}>Reset</Button>
      </div>
        {
          filterOptions.map((x: IFilterOptions) => (
            <div key={x.id} className='flex items-center space-x-2 my-5'>
              <Checkbox 
                id={x.id}
                checked={appliedFilter.includes(x.label)}
                onClick={() => appliedFilterHandler(x.label)}
              />
              <Label className='tetx-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                {x.label}
              </Label>
            </div>
          ))
        }
    </div>
  )
}

export default FilterPage