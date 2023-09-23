import { useState } from "react";
import axios from "axios";
import API_URL from "../../config/config";
import generateNewAccessToken from "../../config/generateRefreshToken";
import Cookies from "js-cookie";

const AdminDashBoard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [selectedImages, setSelectedImages] = useState([null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...selectedImages];
        newImages[index] = e.target.result;
        setSelectedImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);

    selectedImages.forEach((imageData, index) => {
      if (imageData) {
        formData.append(`image${index + 1}`, imageData);
      }
    });

    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken misiing");
      }

      const response = await axios.post(`${API_URL}/product/create`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="w-full overflow-hidden h-screen flex justify-center items-center bg-slate-200">
      <form
        encType="multipart/form-data"
        className="flex flex-col w-4/5 bg-slate-400 h-4/6 p-5 rounded-xl justify-center items-center"
        onSubmit={handleSubmit}
      >
        {/* left part */}
        <div className="flex w-full bg-slate-400 h-full p-5 rounded-xl">
          <div className="w-1/2 p-2 flex flex-col gap-3 ">
            <div className="flex flex-col">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Name of The Product"
                className="p-1 outline-cyan-300 rounded-md "
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Description:s</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="p-1 outline-cyan-300 rounded-md "
                cols={2}
                placeholder="description about the product"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">price:</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Price of the product"
                className="p-1 outline-cyan-300 rounded-md "
              />
            </div>

            <div className="flex w-full gap-4 mt-2 ">
              <label htmlFor="category" className="font-semibold text-sm">
                Category:
              </label>
              <select
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                className="border font-semibold text-sm"
                required
              >
                <option value="" className="">
                  Select Category
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Beauty & Personal Care">
                  Beauty & Personal Care
                </option>
              </select>
            </div>
          </div>
          {/* right part */}
          <div className="w-4/5 h-full flex  items-start  ">
            <div className="">
              <label htmlFor="file">Image 1:</label>
              <label
                htmlFor="fileInput1"
                type="button"
                id="file1"
                className="flex justify-center items-center ml-1 h-7 w-40 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-1.5 text-center "
              >
                Choose an image
              </label>
              <input
                accept=".png,.jpg,.jpeg"
                type="file"
                id="fileInput1"
                onChange={(e) => handleImageChange(e, 0)}
                className="invisible"
              />
              <div className="border-4 w-64 h-48 rounded-lg ">
                {selectedImages[0] && (
                  <div className="w-full object-contain h-full">
                    <img
                      className="rounded-lg h-full w-full object-cover"
                      src={selectedImages[0]}
                      alt="Selected 1"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Second Image Upload */}
            <div className="">
              <label htmlFor="file">Image 2:</label>
              <label
                htmlFor="fileInput2"
                type="button"
                id="file2"
                className="flex justify-center items-center ml-1 h-7 w-40 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-1.5 text-center "
              >
                Choose an image
              </label>
              <input
                accept=".png,.jpg,.jpeg"
                type="file"
                id="fileInput2"
                onChange={(e) => handleImageChange(e, 1)}
                className="invisible"
              />
              <div className="border-4 w-64 h-48 rounded-lg">
                {selectedImages[1] && (
                  <div className="w-full object-contain h-full">
                    <img
                      className="rounded-lg h-full w-full object-cover"
                      src={selectedImages[1]}
                      alt="Selected 2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/*  */}
        </div>

        <button
          type="submit"
          className="flex justify-center items-center w-40 h-9 text-white bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-1.5 text-center "
        >
          Submit Item
        </button>
      </form>
    </div>
  );
};
export default AdminDashBoard;
