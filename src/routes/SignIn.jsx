import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import useMutation from "../hooks/useMutate";
import { LS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

function SignIn() {
  // const [email, setEmail] = useState("");

  const { mutate, isLoading, error, isError } = useMutation("/admin/login");

  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = formData;
      if (!email || !password) {
        return console.log("Enter both");
      }

      const res = await mutate({ email, password });
      if (res.status === 200) {
        if (res?.data.token) {
          localStorage.setItem(LS_TOKEN, res?.data.token);
          nav("/");
        }
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
                Sign in to our platform
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
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
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
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
                <a
                  href="#"
                  className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
                >
                  Lost Password?
                </a>
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
                  Log in to your account
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignIn;
