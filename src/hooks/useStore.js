import { useSelector } from 'react-redux';


export default function useStore (reducer) {

  return useSelector((store) => store[reducer]);
};