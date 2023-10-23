import { useState } from "react";
import axios from "axios";
import API_URL from "../../config/config";
import generateNewAccessToken from "../../config/generateRefreshToken";
import Cookies from "js-cookie";
import "./adminDashBoard.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

const AdminDashBoard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState([]);
  const [aboutitem, setAboutitem] = useState("");
  const [productinfo, setProductinfo] = useState("");
  const [fileLimites, setFileLimites] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("aboutitem", aboutitem);
    formData.append("productinfo", productinfo);
    formData.append("price", price);
    formData.append("category", category);

    //append the file
    file.forEach((photo) => {
      formData.append(`imageUrl`, photo);
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
      if (response.status === 201) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleFile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFile(selectedFiles);

    if (selectedFiles.length > 5) {
      setFileLimites("Please select up to 5 files.");
      setFile([]);
    } else {
      setFileLimites(""); // Clear any previous error message
      setFile(selectedFiles);
    }
  };

  const handleAboutItemChange = (value) => {
    setAboutitem(value);
  };
  const handleInfoChange = (value) => {
    setProductinfo(value);
  };
  const handleDescChange = (value) => {
    setDescription(value);
  };

  return (
    <div className="w-full  h-auto min-h-screen flex flex-col  justify-center items-center bg-slate-200">
      <h2 className="title">Create Product</h2>
      <div className="text-green-600 font-semibold text-lg">{message}</div>
      <form
        encType="multipart/form-data"
        className="h-auto flex flex-col w-96  bg-white  p-3 rounded-xl justify-center items-center gap-2"
        onSubmit={handleSubmit}
      >
        <div className="w-full p-2 flex flex-col borderColroDb">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Name of The Product"
            className=" p-1 outline-cyan-300 rounded-md   "
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full p-2 flex flex-col ">
          <label htmlFor="">About Item:</label>
          <ReactQuill value={aboutitem} onChange={handleAboutItemChange} />
        </div>
        <div className="w-full p-2 flex flex-col ">
          <label htmlFor="">Product information:</label>
          <ReactQuill value={productinfo} onChange={handleInfoChange} />
        </div>
        <div className="w-full p-2 flex flex-col ">
          <label htmlFor="">Product Description :</label>
          <ReactQuill value={description} onChange={handleDescChange} />
        </div>
        <div className="w-full p-2 flex flex-col borderColroDb">
          <label htmlFor="">price:</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            step="0.01"
            placeholder="Price of the product"
            className="p-1 outline-cyan-300 rounded-md "
          />
        </div>
        <div className="w-full p-2 flex  gap-4 mt-2 h-10 ">
          <label htmlFor="category" className="font-semibold text-sm">
            Category:
          </label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="border font-semibold text-sm outline-none rounded-md "
            required
          >
            <option value="" className="">
              Select Category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Books">Books</option>
            <option value="Beauty & Personal Care">
              Beauty & Personal Care
            </option>
          </select>
        </div>
        <div className="w-full p-2 h-auto imageuploadCont">
          <div className="text-red-600 font-semibold">{fileLimites}</div>

          <label htmlFor="file">Select Images:</label>
          <input
            type="file"
            id="fileupload"
            onChange={handleFile}
            accept=".jpg, .png, .webp"
            multiple
            max={5}
            className="hidden"
            required
          />
          <label
            htmlFor="fileupload"
            className="fileupload bg-blue-500 hover:bg-blue-400 hover:text-white p-1 rounded-lg"
          >
            Upload File
          </label>
          <div className="imagePreviewCont bg-slate-100 ">
            {file &&
              file.map((selectedFile, idx) => (
                <div key={idx} className="border-4 w-full object-contain ">
                  <img
                    className="rounded-lg h-full w-full object-cover"
                    src={URL.createObjectURL(selectedFile)}
                    alt={`Preview ${idx + 1}`}
                    name="imageUrl"
                    multiple
                  />
                </div>
              ))}

            {file.length === 0 && (
              <div className="imageUploadCont">Upload image</div>
            )}
          </div>
        </div>
        {/*  */}
        <button type="submit" className="button">
          <span className="button__text">Add Item</span>
          <span className="button__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              height="24"
              fill="none"
              className="svg"
            >
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg>
          </span>
        </button>
      </form>
    </div>
  );
};
export default AdminDashBoard;
