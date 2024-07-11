import React, { useState } from "react";
import { Delete, LongLeftArrow } from "../../../../public/Assets/index";
import { useDispatch, useSelector } from "react-redux";
import convertToIST from "../../../Hook/userCovertDate";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function CustomerRowData(data, sr) {
  const { $createdAt, productList } = data;
  const [isShow, setIsShow] = useState(false);
  let createdDate = convertToIST($createdAt)?.fullDate;
  createdDate = createdDate.split(" ")[1];
  const productListContainer = useRef(null);
  const totalAmount = productList.reduce(
    (acc, current) => (acc = acc + current.productAmount),
    0,
  );
  useGSAP(() => {
    if (isShow) {
      gsap.to(productListContainer.current, {
        left: 0,
        ease: "power3.out",
        duration: 0.5,
      });
    } else {
      gsap.to(productListContainer.current, {
        left: "100%",
        ease: "power3.in",
        duration: 0.5,
      });
    }
  }, [isShow]);
  return (
    <>
      <tr>
        <td>
          <div
            ref={productListContainer}
            className="absolute left-[100%] top-0 z-10 h-full w-full bg-slate-100 text-2xl"
          >
            <div className="bg-yellow flex h-[13%] items-center px-4">
              <button
                className="transition-color rounded-full border bg-slate-100 p-2 text-gray-500 shadow-md hover:bg-slate-300"
                onClick={() => setIsShow(false)}
              >
                <LongLeftArrow />
              </button>
            </div>
            <div className={`h-[80%] overflow-auto pb-3`}>
              <table className="w-full table-fixed">
                <thead className="sticky top-0">
                  <tr className="text-center text-lg">
                    <th className="bg-blue-400 py-2.5 text-white">Sr No.</th>
                    <th className="bg-blue-400 py-2.5 text-white">
                      Product Name
                    </th>
                    <th className="bg-blue-400 py-2.5 text-white">Quantity</th>
                    <th className="bg-blue-400 py-2.5 text-white">
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-scroll text-center text-xl">
                  {productList &&
                    productList.map((productData, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-300 py-1 text-center"
                        >
                          <td className="py-1.5">{index + 1}</td>
                          <td className="py-1.5">{productData.productName}</td>
                          <td className="py-1.5">
                            {productData.productQuantity}
                          </td>
                          <td className="py-1.5">
                            {productData.productAmount}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="flex h-[7%] items-center justify-between bg-blue-400 px-5 text-white">
              <p>Total Amount:-</p>
              <p>{totalAmount}</p>
            </div>
          </div>
        </td>
      </tr>
      <tr className="col-span-1 border-b-2 border-black font-medium">
        <td className="flex justify-center py-1.5 text-center text-lg">
          {sr + 1}
        </td>
        <td className="py-1.5 text-center text-lg">{createdDate}</td>
        <td
          className="cursor-pointer py-1.5 text-center text-lg underline-offset-1 hover:underline"
          onClick={() => setIsShow(true)}
        >
          See Details
        </td>
        <td className="gap-x-8 py-1.5 text-center text-lg">
          <div className="flex items-center justify-center gap-x-6 py-1.5 text-xl">
            <span className="cursor-pointer text-xl" onClick={() => {}}>
              <Delete />
            </span>
          </div>
        </td>
      </tr>
    </>
  );
}

export default CustomerRowData;
