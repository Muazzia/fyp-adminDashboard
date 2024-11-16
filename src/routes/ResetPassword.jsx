import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import useMutation from "../hooks/useMutate";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading } = useMutation("/admin/reset-password");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { confirmPassword, newPassword, oldPassword } = formData;
      if (
        !confirmPassword ||
        !newPassword ||
        !oldPassword ||
        confirmPassword !== newPassword
      ) {
        return toast("Data is not accurate", {
          type: "error",
        });
      }

      const res = await mutate({ confirmPassword, newPassword, oldPassword });
      if (res.status === 201) {
        toast(res.message, { type: "success" });
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-5">
      <p className="font-bold text-lg ">Reset Passowrd</p>

      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full flex flex-col gap-5 mt-4"
      >
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="oldPassword" value="Old Password*" />
          </div>
          <TextInput
            id="oldPassword"
            type="password"
            name="oldPassword"
            required
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="newPassword" value="New password*" />
          </div>
          <TextInput
            id="newPassword"
            type="password"
            name="newPassword"
            required
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPassword" value="Confirm password*" />
          </div>
          <TextInput
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex justify-center">
          <Button
            type="submit"
            className="w-[80%] bg-main hover:bg-main outline-main focus:outline-main"
            isProcessing={isLoading}
            disabled={isLoading}
            processingSpinner={
              <AiOutlineLoading className="h-6 w-6 animate-spin" />
            }
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
