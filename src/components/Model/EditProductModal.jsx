/* eslint-disable react/prop-types */
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import useMutation from "./../../hooks/useMutate";
import cn from "../../utils/cn";

function EditProductModal({
  handleModel,
  openModal,
  refetchProducts,
  product,
}) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [skinCFields, setSkinCFields] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addSkinCondition = () => {
    if (inputValue.trim()) {
      setSkinCFields([...skinCFields, inputValue.trim()]); // Add the condition to the list
      setInputValue(""); // Reset the input field
      clearErrors("skinCondition");
    }
  };

  const removeSkinCondition = (indexToRemove) => {
    setSkinCFields(skinCFields.filter((_, index) => index !== indexToRemove)); // Remove the condition
  };

  const { isLoading, isError, error, mutate } = useMutation(
    "/admin/product",
    "put"
  );

  const [image, setImage] = useState({
    imgUrl: product?.imageUrl,
    file: null,
    userSelected: false,
  });

  const onSubmit = async (data) => {
    if (skinCFields.length < 1) {
      setError("skinCondition", {
        type: "manual",
        message: "At least one skin condition is required",
      });
      return;
    }

    const formData = new FormData();

    formData.append("price", Number(data.price));
    formData.append("stock", Number(data.stock));
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);

    skinCFields.forEach((condition, index) => {
      formData.append(`skinCondition[${index}]`, condition);
    });

    if (image.userSelected) {
      formData.append("image", image.file);
    }

    const res = await mutate(
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
      product?.id
    );

    if (res?.status === 201 || res?.status === 200) {
      setSkinCFields([]);
      reset();
      await refetchProducts();
      handleModel(false);
    }
  };

  useEffect(() => {
    setValue("name", product?.name);
    setValue("description", product?.description);
    setValue("price", product?.price);
    setValue("category", product?.category);
    setValue("stock", product?.stock);
    setValue("price", product?.price);

    const temp = [];
    product?.skinCondition.map((val) => {
      temp.push(val);
      //   setSkinCFields((prev) => prev.push(val));
    });
    setSkinCFields(temp);
  }, [product, setValue]);

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => handleModel(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Edit Product
              </h3>
              {/* {"name"} */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Enter Product Name"
                  {...register("name", {
                    minLength: { message: "Min length is 3", value: 3 },
                    maxLength: { message: "Max length is 255", value: 255 },
                    required: "Name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-600 mt-1 text-sm ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* {"description"} */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" />
                </div>
                <TextInput
                  id="description"
                  placeholder="Description"
                  {...register("description", {
                    maxLength: { message: "Max length is 1000", value: 1000 },
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-600 mt-1 text-sm ml-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* {"skinCondition"} */}
              <div className="flex flex-col ">
                <div className="mb-2 block">
                  <Label htmlFor="skinC" value="Skin Condition" />
                </div>
                <div className="flex flex-row flex-wrap gap-2 justify-start items-start">
                  {skinCFields.map((f, i) => {
                    return (
                      <span
                        key={i}
                        className="flex items-center bg-gray-600 w-fit text-white rounded-md px-2 py-1 mb-2"
                      >
                        <p className="px-0 mx-0">{f}</p>
                        <div className="pl-2">
                          <IoIosClose
                            className="hover:cursor-pointer"
                            onClick={() => removeSkinCondition(i)}
                          />
                        </div>
                      </span>
                    );
                  })}
                </div>
                <div className="flex items-center space-x-2">
                  <TextInput
                    id="skinC"
                    placeholder="Skin Condition"
                    className="w-full"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission
                        addSkinCondition(); // Add on enter
                      }
                    }}
                  />
                  {inputValue && (
                    <Button
                      onClick={addSkinCondition}
                      type="button"
                      className="w-fit"
                    >
                      Add
                    </Button>
                  )}
                </div>
                {errors.skinCondition && (
                  <p className="text-red-600 mt-1 text-sm ml-1">
                    {errors.skinCondition.message}
                  </p>
                )}
              </div>

              {/* {"category"} */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="category" value="Category" />
                </div>
                <TextInput
                  id="category"
                  placeholder="Enter Product Category"
                  {...register("category", {
                    maxLength: { message: "Max length is 255", value: 255 },
                    required: "Category is required",
                  })}
                />
                {errors.category && (
                  <p className="text-red-600 mt-1 text-sm ml-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* {"Stock"} */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="stock" value="Stock" />
                </div>
                <input
                  type="number"
                  placeholder="Stock"
                  id="stock"
                  className="rounded-md w-full bg-[#f9fafb] border-[#eaecef]"
                  {...register("stock", {
                    max: { message: "Max is 9999999", value: 9999999 },
                    required: "Stock is required",
                  })}
                />
                {errors.stock && (
                  <p className="text-red-600 mt-1 text-sm ml-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Price" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  id="price"
                  className="rounded-md w-full bg-[#f9fafb] border-[#eaecef]"
                  {...register("price", {
                    max: { message: "Max is 999999999", value: 999999999 },
                    required: "Price is required",
                    validate: (value) =>
                      value > 0 || "Price must be greater than 0",
                  })}
                />
                {errors.price && (
                  <p className="text-red-600 mt-1 text-sm ml-1">
                    {errors.price.message}
                  </p>
                )}
                {/* <TextInput id="price" placeholder="Price" required /> */}
              </div>

              {/* Image Preview */}
              <div className="mt-2">
                <img src={image.imgUrl} alt="" className="aspect-square" />
              </div>

              {/* Image Upload */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="image" value="Product Image" />
                </div>
                <input
                  type="file" // File input for image
                  id="image"
                  accept="image/*" // Only accept image file types
                  className="rounded-md w-full bg-[#f9fafb] border-[#eaecef]"
                  {...register("image", {
                    validate: {
                      // Optional: Validate file size (max 5MB) or file type
                      lessThan5MB: (files) =>
                        !files?.[0] ||
                        files?.[0]?.size < 5000000 ||
                        "Max file size is 5MB",
                      acceptedFormats: (files) =>
                        !files?.[0] ||
                        ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                        "Only JPEG and PNG formats are allowed",
                    },
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImage({
                          file,
                          imgUrl: URL.createObjectURL(file),
                          userSelected: true,
                        });
                      }
                    },
                  })}
                />
                {errors.image && (
                  <p className="text-red-600 mt-1 text-sm ml-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                {isError && (
                  <p className="text-red-600 mt-1 text-sm ml-1">
                    {error?.message}
                  </p>
                )}
                <Button
                  className={cn(
                    `w-full bg-main ${
                      isLoading && "bg-main/40 cursor-not-allowed "
                    }`
                  )}
                  type="submit"
                  disabled={isLoading}
                >
                  Edit Product
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditProductModal;
