import { Spinner } from "flowbite-react";
import React from "react";

const Loading = () => {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-[60%]">
      <Spinner size="xl" color="warning" />
    </div>
  );
};

export default Loading;
