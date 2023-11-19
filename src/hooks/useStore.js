import { useSelector } from 'react-redux';

//? Would making this a class let me ditch the quotation marks when I call it?
    //? e.g. useStore(reducer) instead of useStore('reducer')
export default function useStore (reducer) {

  return useSelector((store) => store[reducer]);
};