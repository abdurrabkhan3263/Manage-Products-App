import { useRef, useEffect, useState } from "react";
import { Upload } from "../../../public/Assets";
import { Button } from "../UI";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseService } from "../../appwrite";
import { useSelector } from "react-redux";
import { toastFunction } from "../../utils/toastFunction";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleLoader from "../../Assets/SimpleLoader";
function AddContact({ contactData }) {
  const currentUser = useSelector((state) => state.user?.user);
  const [customerImg, setCustomerImg] = useState(
    (contactData && contactData?.customerImage) || "",
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      customerName: (contactData && contactData?.customerName) || "",
      customerAddress: (contactData && contactData?.customerAddress) || "",
      phoneNumber: (contactData && contactData?.phoneNumber) || "",
    },
  });
  const [textAreaHeight, setTextAreaHeight] = useState(50);
  const addImg = useRef();
  const uploadIcon = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleMouseEnter = () => {
      uploadIcon.current.style.transform = `translateY(-4px)`;
    };

    const handleMouseLeave = () => {
      uploadIcon.current.style.transform = `translateY(0px)`;
    };
    addImg.current.addEventListener("mouseenter", handleMouseEnter);
    addImg.current.addEventListener("mouseleave", handleMouseLeave);
  }, []);
  const handleCustomerImg = (e) => {
    if (e.target.files[0]) {
      setCustomerImg(URL.createObjectURL(e.target.files[0]));
    } else {
      setCustomerImg("");
    }
  };
  const handleTextAreaHeight = (e) => {
    const { scrollHeight, clientHeight } = e.target;
    if (scrollHeight > clientHeight) {
      setTextAreaHeight(scrollHeight);
    } else {
      setTextAreaHeight(clientHeight);
    }
  };
  const client = useQueryClient();
  const customerAdd = useMutation({
    mutationKey: ["add"],
    mutationFn: async (data) => {
      return await databaseService.createCustomer(data);
    },
    onSuccess: () => {
      navigate(location.state);
      client.invalidateQueries({
        queryKey: ["customer"],
        refetchType: "active",
      });
      toastFunction({
        type: "success",
        message: "Customer Added SuccessFully",
      });
    },
  });
  const customerUpdate = useMutation({
    mutationKey: ["update"],
    mutationFn: async (data) => {
      return await databaseService.updateCustomer(contactData.$id, {
        ...data,
      });
    },
    onSuccess: () => {
      navigate(location.state);
      client.invalidateQueries({ queryKey: ["customer"] });
      toastFunction({
        type: "success",
        message: "Customer Updated SuccessFully",
      });
    },
  });
  const submitContact = async (data) => {
    const addImage = async (newImage) => {
      if (!newImage) return "";
      const imageId = await databaseService.addProductImg(newImage);
      if (!imageId) return "";
      const imageFile = databaseService.getProductImgForPreview(imageId.$id);
      return { id: imageId.$id, href: imageFile.href };
    };
    const updateImage = async (oldImage, newImage) => {
      if (!newImage) return "";
      const imageFile = await addImage(newImage);
      if (!imageFile) return "";
      if (oldImage) await databaseService.deleteProductImg(oldImage);
      return imageFile;
    };
    if (contactData?.$id) {
      const imageData = await updateImage(
        contactData?.customerImageId,
        data.customerImage[0],
      );
      data.customerImage = imageData.href;
      data.customerImageId = imageData.id;
      customerUpdate.mutate(data);
    } else {
      const imageData = await addImage(data.customerImage[0]);
      data.customerImage = imageData.href;
      data.customerImageId = imageData.id;
      data.belongsTo = currentUser.$id;
      customerAdd.mutate(data);
    }
  };
  if (customerAdd.isPending || customerUpdate.isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <SimpleLoader />
      </div>
    );
  }
  return (
    <div className="relative h-full w-full">
      <form onSubmit={handleSubmit(submitContact)} className="h-full">
        <div className="h-[92%] overflow-hidden overflow-y-scroll">
          <div
            ref={addImg}
            className="relative ml-2.5 flex h-[280px] w-[280px] cursor-pointer select-none flex-col items-center justify-center gap-y-1 overflow-hidden rounded-xl bg-darkblue text-white"
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="peer text-3xl transition-all" ref={uploadIcon}>
                <Upload />
              </span>
              <p className="text-xl font-semibold peer-hover:translate-x-2">
                {!customerImg
                  ? "Upload Customer Image"
                  : "Change Customer Image"}
              </p>
            </div>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              {...register("customerImage")}
              className="peer absolute z-10 h-full w-full opacity-0"
              onChange={handleCustomerImg}
            />
            <div className="absolute z-0 h-full w-full overflow-hidden">
              {customerImg && (
                <img src={customerImg} className="h-full w-full object-cover" />
              )}
            </div>
          </div>
          <div className="pl-2.5">
            <input
              type="text"
              required={true}
              placeholder="Enter Customer Name"
              {...register("customerName", { required: true })}
              className="mt-3 w-full rounded-md border-none bg-lightgray px-3 py-3 font-medium outline-none"
            />
          </div>
          <div className="pl-2.5">
            <input
              type="text"
              required={true}
              placeholder="Enter Phone Number"
              {...register("phoneNumber", { required: true })}
              className="mt-3 w-full rounded-md border-none bg-lightgray px-3 py-3 font-medium outline-none"
            />
          </div>
          <div className="pl-2.5">
            <textarea
              placeholder="Enter Customer Address (optional)"
              {...register("customerAddress")}
              className={`mt-3 w-full resize-none rounded-md border-none bg-lightgray px-3 py-3 font-medium outline-none`}
              style={{ height: `${textAreaHeight}px` }}
              onChange={handleTextAreaHeight}
            />
          </div>
        </div>
        {/* Submit button */}
        <div className="absolute bottom-0 right-3 mb-4 flex w-full justify-end">
          <Button
            type={"submit"}
            className={
              "bg-lightblue px-8 py-1 text-white transition-all hover:bg-darkblue"
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddContact;
