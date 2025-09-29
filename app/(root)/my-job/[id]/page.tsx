import React from "react";
import MyJobDetail from "./MyJobDetail";

interface Props {
  params: { id: string };
}

const Page = ({ params: { id } }: Props) => {
  return <MyJobDetail id={id} />;
};

export default Page;