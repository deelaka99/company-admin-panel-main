import React from "react";
import AddNewLab from "../../components/management/AddNewLab";
import Manage from "../../components/management/Manage";
import Payment from "../../components/management/Payment";

const Management = () => {
  return (
    <div className=" w-full h-full flex flex-col overflow-y-scroll dark:text-white">
      <div className="h-full w-full">
        <AddNewLab />
      </div>
      <div className="h-full w-full">
        <Manage />
      </div>
      <div className="h-full w-full">
        <Payment />
      </div>
    </div>
  );
};

export default Management;
