import React, { useRef, useEffect, useState } from "react";
import { Add, Upload } from "../../../public/Assets";
import { Button } from "../UI";
import { useForm } from "react-hook-form";

function AddContact({ contactData }) {
  const [customerImg, setCustomerImg] = useState("");
  const { register, handleSubmit } = useForm();
  const [textAreaHeight, setTextAreaHeight] = useState(50);
  const addImg = useRef();
  const uploadIcon = useRef();
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
  const submitContact = (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <div className="w-full h-full relative">
      <form onSubmit={handleSubmit(submitContact)} className="h-full">
        <div className="h-[92%] overflow-hidden overflow-y-scroll">
          <div
            ref={addImg}
            className="ml-2.5 overflow-hidden rounded-xl w-[280px] h-[280px] text-white bg-darkblue flex justify-center cursor-pointer relative select-none items-center flex-col gap-y-1"
          >
            <div className="flex flex-col items-center relative z-10 justify-center">
              <span className="text-3xl peer transition-all" ref={uploadIcon}>
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
              className="absolute w-full h-full opacity-0 z-10 peer"
              onChange={handleCustomerImg}
            />
            <div className="absolute overflow-hidden h-full w-full z-0">
              {customerImg && (
                <img src={customerImg} className="w-full h-full object-cover" />
              )}
            </div>
          </div>
          <div className="pl-2.5">
            <input
              type="text"
              required={true}
              placeholder="Enter Customer Name"
              {...register("customerName", { required: true })}
              className="outline-none border-none font-medium bg-lightgray w-full py-3 px-3 mt-3 rounded-md"
            />
          </div>
          <div className="pl-2.5">
            <input
              type="phone"
              required={true}
              placeholder="Enter Phone Number"
              {...register("customerPhone", { required: true })}
              className="outline-none border-none font-medium bg-lightgray w-full py-3 px-3 mt-3 rounded-md"
            />
          </div>
          <div className="pl-2.5">
            <textarea
              placeholder="Enter Customer Address (optional)"
              {...register("customerAddress")}
              className={`outline-none resize-none border-none font-medium bg-lightgray w-full py-3 px-3 mt-3 rounded-md`}
              style={{ height: `${textAreaHeight}px` }}
              onChange={handleTextAreaHeight}
            />
          </div>
        </div>
        {/* Submit button */}
        <div className="w-full flex justify-end absolute bottom-0 right-3 mb-4">
          <Button
            type={"submit"}
            className={
              "bg-lightblue text-white hover:bg-darkblue transition-all px-8 py-1"
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
