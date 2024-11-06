import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import useMutation from "../hooks/useMutate";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";

function ForgotPassword() {
  const { mutate, isLoading, error, isError } = useMutation(
    "/admin/forgot-password"
  );

  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email } = formData;
      if (!email) {
        return console.log("Enter Email");
      }

      const res = await mutate({ email });
      if (res.status === 200) {
        // if (res?.data.token) {
        //   localStorage.setItem(LS_TOKEN, res?.data.token);
        //   nav("/");
        // }
        toast(res.data, {
          type: "success",
        });
        nav("/new-password");
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
    <>
      <Modal show={true} size="md">
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Forgot Password
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Enter Your Email" />
                </div>
                <TextInput
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                {isError && (
                  <p className="text-red-500">
                    {JSON.stringify(error?.message)}
                  </p>
                )}
              </div>
              <div className="flex justify-end w-full">
                <Link
                  to={"/signin"}
                  className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
                >
                  Sign In
                </Link>
              </div>
              <div className="w-full">
                <Button
                  type="submit"
                  isProcessing={isLoading}
                  disabled={isLoading}
                  processingSpinner={
                    <AiOutlineLoading className="h-6 w-6 animate-spin" />
                  }
                >
                  Send Code
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ForgotPassword;
