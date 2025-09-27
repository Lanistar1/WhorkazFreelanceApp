// import React from 'react'
// import ExploreDetails from './ExploreDetails'

// interface Props {
//   params : {id:string}
// }
// const page = ({params:{id}}:Props) => {
//   return (
//     <ExploreDetails id={id}/>
//   )
// }

// export default page



import React from "react";
import ExploreDetails from "./ExploreDetails";

interface Props {
  params: { id: string };
}

const Page = ({ params: { id } }: Props) => {
  return <ExploreDetails id={id} />;
};

export default Page;