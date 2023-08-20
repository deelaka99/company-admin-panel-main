import React, {useState} from "react";
import database from "../../firebase";

function AddNewLab() {
  const [userName, setUserName] = useState();
  const [LabName, setLabName] = useState();
  const [district, setDistrict] = useState();
  const [telephone, setTelephone] = useState();
  const [paymentDate, setPaymentDate] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [province, setProvince] = useState();
  const [email, setEmail] = useState();
  const [amount, setAmount] = useState();
  return (
    <div className="flex flex-col w-full h-full ">
      
      <div className="h-full w-full flex items-center justify-center">
        <div className="border-2 border-secondary-blue bg-primary-blue dark:bg-dark-primary dark:border-dark-ternary h-5/6 w-11/12 rounded-3xl flex flex-col">
          <div className="h-4/5 w-full p-2 flex text-white">
            {/**first column */}
            <div className="w-1/2 h-full p-3">
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">User name</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter user name"
                    className="w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Lab name</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter Lab name"
                    className="w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">District</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter district"
                    className="w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Telephone</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter telephone number"
                    className="w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">
                  Payment date
                </div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter payment date"
                    className="w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                  />
                </div>
              </div>
            </div>
            {/**Second column */}
            <div className="w-1/2 h-full p-3">
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Password</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Address</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter address"
                    className="w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Province</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter province"
                    className="w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Email</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter email"
                    className="w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Amount</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-1/5 w-full flex">
            <div className="h-full w-3/5 p-2"></div>
            <div className="h-full w-2/5 p-5 flex items-center justify-center">
              <button className="bg-secondary-blue hover:opacity-90 dark:bg-dark-ternary h-full w-full rounded-md text-xl shadow-xl text-white">
                Add Lab
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewLab;
