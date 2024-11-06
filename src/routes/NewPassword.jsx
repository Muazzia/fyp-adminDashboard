import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useMutation from "../hooks/useMutate";
import OTPInput from "react-otp-input";
import cn from "../utils/cn";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const { isLoading, mutate } = useMutation("/admin/new-password");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const nav = useNavigate();

  const [pageNo, setPageNo] = useState(1);
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState("");

  const onSubmit = async (data) => {
    if (otp.length !== 6) {
      setOtpErr("Enter Otp");
      setPageNo(1);
      return;
    }

    try {
      const res = await mutate({ ...data, otp });
      toast(res.message, {
        type: "success",
      });

      nav("/signin");

      console.log(res, "r");
    } catch (error) {
      console.log(error, "e");
    }

    setOtpErr("");

    console.log("Form Data:", data, otp);
  };

  const handlePageChange = (val) => {
    if (val > 0 && pageNo === 1) setPageNo(2);
    if (val < 0 && pageNo === 2) setPageNo(1);
  };

  return (
    <div>
      <Modal show={true} size="md">
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Change Password
              </h3>
              <div className="flex justify-between items-center">
                <FaArrowLeft
                  onClick={() => handlePageChange(-1)}
                  style={{ color: `${pageNo === 1 ? "#808080" : "black"}` }}
                  className={cn(
                    `hover:cursor-pointer ${
                      pageNo === 1 && "hover:cursor-not-allowed "
                    }`
                  )}
                />
                <FaArrowRight
                  onClick={() => handlePageChange(1)}
                  style={{ color: `${pageNo === 2 ? "#808080" : "black"}` }}
                  className={cn(
                    `hover:cursor-pointer ${
                      pageNo === 2 && "hover:cursor-not-allowed "
                    }`
                  )}
                />
              </div>
              <div>
                {pageNo === 1 ? (
                  <Otp otp={otp} setOtp={setOtp} error={otpErr} />
                ) : (
                  <Passwords
                    register={register}
                    errors={errors}
                    watch={watch}
                  />
                )}
              </div>

              <div className="w-full mt-4">
                {pageNo === 2 && (
                  <Button
                    type="submit"
                    isProcessing={isLoading}
                    disabled={isLoading}
                    processingSpinner={
                      <AiOutlineLoading className="h-6 w-6 animate-spin" />
                    }
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const Otp = ({ otp, setOtp, error }) => {
  return (
    <div className="flex flex-col items-center">
      <OTPInput
        inputStyle="w-[40px] h-[40px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-center text-lg mx-1"
        value={otp}
        onChange={setOtp}
        numInputs={6}
        isInputNum
        placeholder="000000"
        skipDefaultStyles
        shouldAutoFocus
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input className="text-black" {...props} />}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const Passwords = ({ register, errors, watch }) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="New password" />
        </div>
        <TextInput
          id="newPassword"
          type="password"
          {...register("newPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirmPassword" value="Confirm password" />
        </div>
        <TextInput
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === watch("newPassword") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
