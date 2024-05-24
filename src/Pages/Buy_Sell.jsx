import React from "react";
import Container from "../Container/Container";
import { Input } from "../Component/UI";
import {
  Delete,
  Edit,
  Print,
  Search,
  LeftArrow,
  RightArrow,
} from "../../public/Assets/index";

function Buy_Sell() {
  return (
    <Container>
      <div className="flex items-center justify-between h-[5%]">
        <input
          type="text"
          placeholder={"Search"}
          className="outline-none bg-[#f1f1f1] focus:bg-[#e4e4e4] px-2 py-2 rounded-md w-full text-black"
        />
        <button className="flex justify-center items-center gap-4 text-xl ml-7 bg-darkblue rounded-md px-4 py-1 text-white">
          Search <Search />
        </button>
      </div>
      <div className="h-[95%] w-full pt-4 relative">
        <div className="bg-white">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-lightblue text-white border py-2 text-lg">
                  Name
                </th>
                <th className="bg-lightblue text-white border py-2 text-lg">
                  Phone Number
                </th>
                <th className="bg-lightblue text-white border py-2 text-lg">
                  Total Price
                </th>
                <th className="bg-lightblue text-white border py-2 text-lg">
                  Products
                </th>
                <th className="bg-lightblue text-white border py-2 text-lg">
                  Action
                </th>
              </tr>
            </thead>
            {/* Add The Data */}
            <tbody>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="text-center text-lg py-1.5">Abdur Rab Khan</td>
                <td className="text-center text-lg py-1.5">9004757089</td>
                <td className="text-center text-lg py-1.5">$50000</td>
                <td className="text-center text-lg underline py-1.5">
                  See Details
                </td>
                <td className="text-center text-lg gap-x-8 py-1.5">
                  <div className="flex items-center justify-center gap-x-8 text-xl py-1.5">
                    <span className="cursor-pointer">
                      <Print />
                    </span>
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="absolute bottom-0 flex justify-between w-full">
            <button className="bg-darkblue text-white p-2 rounded-md">
              <LeftArrow />
            </button>
            <div className="flex gap-x-3">
              <button className="bg-lightgray text-black px-4 rounded-md">
                1
              </button>
              <button className="bg-lightgray text-black px-4 rounded-md">
                2
              </button>
              <button className="bg-lightgray text-black px-4 rounded-md">
                3
              </button>
              <button className="bg-lightgray text-black px-4 rounded-md">
                4
              </button>
            </div>
            <button className="bg-darkblue text-white p-2 rounded-md">
              <RightArrow />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Buy_Sell;
