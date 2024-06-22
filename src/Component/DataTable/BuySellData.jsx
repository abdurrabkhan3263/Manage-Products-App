import { useDispatch } from "react-redux";
import { Print, Delete, image__not__available } from "../../../public/Assets";
import { useNavigate } from "react-router-dom";
import convertToIST from "../../Hook/userCovertDate";

const BuySellData = (data) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    $id,
    customerName,
    customerImage,
    phoneNumber,
    totalPrice,
    productList,
    $createdAt,
  } = data;
  const formatedDate = convertToIST($createdAt)?.fullDate;
  return (
    <tr className="col-span-1 border-b-2 border-black">
      <td className="py-1.5 text-center text-lg font-medium">{formatedDate}</td>
      <td className="flex justify-center py-1.5 text-center text-lg font-medium">
        <div className="h-14 w-14 overflow-hidden rounded-full bg-lightgray">
          <img
            src={customerImage || image__not__available}
            className="h-full w-full object-cover"
          />
        </div>
      </td>
      <td className="py-1.5 text-center text-lg font-medium">{customerName}</td>
      <td className="py-1.5 text-center text-lg font-medium">{phoneNumber}</td>
      <td className="py-1.5 text-center text-lg font-medium">{totalPrice}</td>
      <td className="cursor-pointer py-1.5 text-center text-lg underline">
        <span
          onClick={() =>
            navigate(`seeproductdetails/${555}`, { state: "/buysell" })
          }
        >
          See More
        </span>
      </td>
      <td className="gap-x-8 py-1.5 text-center text-lg">
        <div className="flex items-center justify-center gap-x-6 py-1.5 text-xl">
          <span
            className="cursor-pointer text-xl"
            onClick={() => {
              console.log("print Karna Hai");
            }}
          >
            <Print />
          </span>
          <span
            className="cursor-pointer text-xl"
            onClick={() => {
              dispatch(showDeleteSection({ id: 55, showDelete: true }));
            }}
          >
            <Delete />
          </span>
        </div>
      </td>
    </tr>
  );
};
export default BuySellData;
