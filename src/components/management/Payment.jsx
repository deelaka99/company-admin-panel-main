import React from "react";
import applepay from "../../assets/images/apple-pay.png";
import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
import paypal from "../../assets/images/paypal.png";

function Payment() {
  return (
    <div className="flex flex-col w-full h-full">
      {/**Title */}
      <div className="h-1/6 w-full flex items-center justify-center">
        <h1 className="text-5xl font-medium p-2">Payment</h1>
      </div>
      <div className="h-5/6 w-full flex items-center justify-center">
        <div className=" h-5/6 w-5/6 flex flex-col">
          <div className="h-4/5 w-full flex flex-col">
            <div className="w-full h-3/4 flex items-center justify-center">
              <div className="w-5/6 h-5/6 rounded-xl bg-primary-blue">
                <div className="w-full h-1/12 text-center text-white text-lg p-2">
                  Make Payment
                </div>
                <div className="w-full h-11/12 flex  p-3">
                  <div className="w-full h-1/4 ">
                    <button className="hover:opacity-90">
                      <div className="flex items-center justify-center w-11/12 h-11/12 bg-secondary-blue rounded-lg">
                        <img src={visa} alt="visa" className="h-1/4 w-1/4" />
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/4 ">
                    <button className="hover:opacity-90">
                      <div className="flex items-center justify-center w-11/12 h-11/12 bg-secondary-blue rounded-lg">
                        <img
                          src={mastercard}
                          alt="mastercard"
                          className="h-1/4 w-1/4"
                        />
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/4 ">
                    <button className="hover:opacity-90">
                      <div className="flex items-center justify-center w-11/12 h-11/12 bg-secondary-blue rounded-lg">
                        <img
                          src={paypal}
                          alt="paypal"
                          className="h-1/4 w-1/4"
                        />
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/4 ">
                    <button className="hover:opacity-90">
                      <div className="flex items-center justify-center w-11/12 h-11/12 bg-secondary-blue rounded-lg">
                        <img
                          src={applepay}
                          alt="applepay"
                          className="h-1/4 w-1/4"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-1/4 flex items-center justify-center">
              <div className="w-5/6 h-5/6">
                <table className="bg-white dark:bg-dark-primary p-3 h-full w-full ">
                  <thead>
                    <tr className="bg-secondary-blue dark:bg-quternary-blue">
                      <th className="p-1">Lab ID</th>
                      <th className="p-1">Name</th>
                      <th className="p-1">Address</th>
                      <th className="p-1">Contact</th>
                      <th className="p-1">Status</th>
                      <th className="p-1">Action</th>
                    </tr>
                  </thead>
                  <tbody className="overflow-x-auto">
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
