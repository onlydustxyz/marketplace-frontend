import Skeleton from 'src/components/Skeleton';

export default {
    title: 'Skeleton',
    component: Skeleton,
  };
  
  export const Card = {
    render: () => <Skeleton variant="card" />,
  };
  
  export const Filters = {
    render: () => <Skeleton variant="filters" />,
  };
  
  export const Header = {
    render: () => <Skeleton variant="header" />,
  };
  
  export const Search = {
    render: () => <Skeleton variant="search" />,
  };
  
  export const Sort = {
    render: () => <Skeleton variant="sort" />,
  };