import { useDispatch } from "react-redux";
import { Edit, Delete, Phone } from "../../../public/Assets";
import { useNavigate } from "react-router-dom";

const AllCustomerData = (data) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <tr className="border-b-2 border-black col-span-1">
      <td className="text-center text-lg py-1.5 flex justify-center">
        <div className="h-14 w-14 rounded-full bg-lightgray overflow-hidden">
          <img
            src={
              "https://images.unsplash.com/photo-1618083707368-b3823daa2726?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"abdur Rab"}
            className="h-full w-full object-cover"
          />
        </div>
      </td>
      <td className="text-center text-lg py-1.5">{"Abdur Rab"}</td>
      <td className="text-center text-lg py-1.5">{9004757089}</td>
      <td className="text-center text-lg py-1.5">{15000}</td>
      <td className="text-center text-lg underline cursor-pointer py-1.5">
        <span
          onClick={() =>
            navigate(`customerdetails/${555}`, { state: "/allcustomer" })
          }
        >
          See More
        </span>
      </td>
      <td className="text-center text-lg gap-x-8 py-1.5">
        <div className="flex items-center justify-center gap-x-6 text-xl py-1.5">
          <a href={`tel:${9004757089}`}>
            <Phone />
          </a>
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate(`editcontact/${33}`, {
                state: "/allcustomer",
              });
            }}
          >
            <Edit />
          </span>
          <span
            className="cursor-pointer text-xl"
            onClick={() => {
              dispatch(showDeleteSection({ id: 54, showDelete: true }));
            }}
          >
            <Delete />
          </span>
        </div>
      </td>
    </tr>
  );
};
export default AllCustomerData;
