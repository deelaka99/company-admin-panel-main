import React from "react";
import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";

function Payment() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-full w-full flex items-center justify-center">
        <div className=" h-5/6 w-11/12">
          <div className="h-full w-full flex flex-col overflow-hidden">
            <div className="w-full h-2/4 flex items-center justify-center">
              <div className="w-full h-5/6 rounded-md bg-primary-blue border-2 border-ternary-blue dark:bg-dark-primary dark:border-dark-ternary">
                <div className="w-full h-1/12 text-center text-white p-2">
                  <h1 className="text-lg font-medium">Make Payment</h1>
                  <p className="text-sm font-inter">Choose payment method</p>
                </div>
                <div className="w-full h-11/12 p-2 flex items-center justify-center">
                  <div className="flex items-center justify-center pr-1">
                    <button className="bg-ternary-blue rounded-md flex items-center justify-center hover:drop-shadow-lg active:bg-white dark:bg-dark-secondary dark:drop-shadow-lg dark:active:bg-dark-ternary">
                      <img src={visa} alt="visa" className="h-1/5 w-1/5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-center pl-1">
                    <button className="bg-ternary-blue rounded-md flex items-center justify-center hover:drop-shadow-lg active:bg-white dark:bg-dark-secondary dark:drop-shadow-lg dark:active:bg-dark-ternary">
                      <img
                        src={mastercard}
                        alt="mastercard"
                        className="h-1/5 w-1/5"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-2/4 pt-3 flex items-center justify-center overflow-y-auto">
              <div className="w-full  rounded-md">
                <table className="bg-ternary-blue dark:bg-dark-ternary p-3 h-full w-full ">
                  <thead className="">
                    <tr className="bg-secondary-blue dark:bg-dark-secondary">
                      <th className="p-1">Lab ID</th>
                      <th className="p-1">Name</th>
                      <th className="p-1">Address</th>
                      <th className="p-1">Contact</th>
                      <th className="p-1">Status</th>
                      <th className="p-1">Action</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr className="text-center">
                      <td>001</td>
                      <td>A</td>
                      <td>Galle</td>
                      <td>07713377130</td>
                      <td>Active</td>
                      <td>
                        <div className="flex items-center justify-center">
                          <div className="w-1/3">
                            <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Update
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Remove
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Block
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>001</td>
                      <td>A</td>
                      <td>Galle</td>
                      <td>07713377130</td>
                      <td>Active</td>
                      <td>
                        <div className="flex items-center justify-center">
                          <div className="w-1/3">
                            <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Update
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Remove
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Block
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>001</td>
                      <td>A</td>
                      <td>Galle</td>
                      <td>07713377130</td>
                      <td>Active</td>
                      <td>
                        <div className="flex items-center justify-center">
                          <div className="w-1/3">
                            <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Update
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Remove
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Block
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>001</td>
                      <td>A</td>
                      <td>Galle</td>
                      <td>07713377130</td>
                      <td>Active</td>
                      <td>
                        <div className="flex items-center justify-center">
                          <div className="w-1/3">
                            <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Update
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Remove
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Block
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>001</td>
                      <td>A</td>
                      <td>Galle</td>
                      <td>07713377130</td>
                      <td>Active</td>
                      <td>
                        <div className="flex items-center justify-center">
                          <div className="w-1/3">
                            <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Update
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Remove
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Block
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>001</td>
                      <td>A</td>
                      <td>Galle</td>
                      <td>07713377130</td>
                      <td>Active</td>
                      <td>
                        <div className="flex items-center justify-center">
                          <div className="w-1/3">
                            <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Update
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Remove
                            </button>
                          </div>
                          <div className="w-1/3">
                            <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                              Block
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
