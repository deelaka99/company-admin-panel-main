import React from "react";
import AddNewLab from "../../components/management/AddNewLab";
import Manage from "../../components/management/Manage";
import Payment from "../../components/management/Payment";

const Management = () => {
  return (
    <div className=" w-full h-full flex flex-col overflow-y-scroll dark:text-white">
      <div className="h-fit">
        <AddNewLab />
      </div>
      <div className="h-fit">
        <Manage />
      </div>
      <div className="h-fit">
        <Payment />
      </div>
    </div>
  );
};

export default Management;
