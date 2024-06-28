import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
// import { URL } from "window";


const AddProducts = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    seller: "",
    brand: "",
    stock: 0,
    images: [],
    colors: [],
    sizes: [],
    ratings: 0,
    reviews: 0,
    isFreeDelivery: false,
    category: "",
    user: "",
  });
  const [picMessage,setPicMessage] = useState("")
  const [imagePreviews, setImagePreviews] = useState([]);

  const dispatch = useDispatch();
    const navigate = useNavigate();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [dispatch, success]);

  const handleChange =(e)=>{
    const {name, value, type} = e.target
    setFormData((prev)=> ({
      ...prev,
      [name] : type === 'number' ? Number(value) : value
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const validFiles = selectedFiles.filter((file) =>
      allowedExtensions.includes(file.name.split(".").pop().toLowerCase())
    );
    if (validFiles.length !== selectedFiles.length) {
      console.error("Invalid file types. Only jpg, jpeg, and png are allowed.");
      return;
    }
setFormData((prev)=>({
  ...prev, images:validFiles
}))
    const imagePreviews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(imagePreviews);
  };

  const handleColorsChange = (e) => {
    const newColor = e.target.value
    setFormData((prev)=>({...prev, colors :[...prev.colors, newColor]}))
  };

  const handleSizesChange = (e) => {
     const newSize = e.target.value;
     setFormData((prevData) => ({
       ...prevData,
       sizes: [...prevData.sizes, newSize],
     }));
  };

 

  const resetHandler = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      seller: "", 
      brand: "",
      stock: 1, 
      images: [],
      colors: [],
      sizes: [],
      category: "", 
      ratings: 0,
      reviews: 0,
      isFreeDelivery: false,
      deliveryCharge: function () {
        return this.isFreeDelivery ? null : 0;
      },
    });
  };
  
   const postDetails = async (pics) => {
     const uploadedImages = [];
     for (let pic of pics) {
       if (!pic) {
         setPicMessage("Please Select an Image");
         return;
       }
       setPicMessage(null);
       if (pic.type === "image/jpeg" || pic.type === "image/png") {
         const data = new FormData();
         data.append("file", pic);
         data.append("upload_preset", "TaskManage");
         data.append("cloud_name", "taskpic");
         try {
           const res = await fetch(
             "https://api.cloudinary.com/v1_1/taskpic/image/upload",
             {
               method: "post",
               body: data,
             }
           );
           const result = await res.json();
           uploadedImages.push(result.url.toString());
         } catch (err) {
           console.error(err);
           setPicMessage("Image upload failed");
         }
       } else {
         setPicMessage("Please Select an Image");
       }
     }
     return uploadedImages;
   };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const uploadedImages = await postDetails(formData.images);
     if (uploadedImages.length !== formData.images.length) {
       alert("Some images failed to upload.");
       return;
     }

    dispatch(
      createProduct(
       {...formData,
        images: uploadedImages
       }
      )
    );
    //  resetHandler()
    //  navigate("/")
  };

  return (
    <div className="my-4">
      <div className="p-5 w-[60vw] border shadow shadow-slate-300 rounded mx-auto">
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {picMessage && (
          <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
        )}
        <div className="text-3xl w-full text-center mb-4 font-light">
          Create a Product as seller
        </div>
        <hr />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 mt-8 *:px-4 gap-y-1"
        >
          <div>
            <label htmlFor="title" className="text-gray-900">
              Enter title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                required
                placeholder="Title"
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="price" className="text-gray-900">
              Enter Product Price
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                required
                min={1}
                placeholder="like 230"
                onChange={(e) => {
                  const newPrice = parseFloat(e.target.value);
                  if (isNaN(newPrice)) {
                    console.error("Invalid price. Please enter a number.");
                    return;
                  }
                  setFormData((prevData) => ({
                    ...prevData,
                    price: newPrice,
                  }));
                }}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="discountPercent" className="text-gray-900">
              Enter Discount in Percentage
            </label>
            <div className="mt-2">
              <input
                id="discountPercent"
                name="discountPercent"
                type="number"
                value={formData.discountPercentage}
                min={1}
                max={99}
                required
                placeholder="like 230"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, discountPercentage: e.target.value }))
                }
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="seller" className="text-gray-900">
              Seller name
            </label>
            <div className="mt-2">
              <input
                id="sellerr"
                name="seller"
                type="text"
                required
                value={formData.seller}
                placeholder="Seller name"
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="brand" className="text-gray-900">
              Brand
            </label>
            <div className="mt-2">
              <input
                id="brand"
                name="brand"
                type="text"
                required
                value={formData.brand}
                placeholder="Brand name"
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="text-gray-900">
              Category
            </label>
            <div className="mt-2">
              <input
                id="category"
                name="category"
                type="text"
                required
                value={formData.category}
                placeholder="Category"
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="stock" className="text-gray-900">
              Stock
            </label>
            <div className="mt-2">
              <input
                id="stock"
                name="stock"
                type="number"
                required
                min={1}
                value={formData.stock}
                placeholder="In Stock"
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="ratings" className="text-gray-900">
              Rating
            </label>
            <div className="mt-2">
              <input
                id="ratings"
                name="rating"
                type="number"
                required
                min={0}
                max={5}
                value={formData.ratings}
                placeholder="Rating"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ratings: e.target.value }))
                }
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="review" className="text-gray-900">
              Review
            </label>
            <div className="mt-2">
              <input
                id="review"
                name="review"
                type="number"
                min={1}
                required
                value={formData.reviews}
                placeholder="review"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, reviews: e.target.value }))
                }
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="images" className="text-gray-900">
              Images
            </label>
            <div className="mt-2">
              <input
                id="images"
                name="images"
                type="file"
                multiple
                required
                placeholder="Images"
                onChange={handleImageChange}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ul>
                {formData.images.map((img, index) => (
                  <li className="bg-slate-100" key={index}>
                    {img.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {imagePreviews.length > 0 && (
            <div>
              <div className="w-[12vw]">
                {imagePreviews.map((preview, i) => (
                  <img src={preview} key={preview} alt="Not working" />
                ))}
              </div>
            </div>
          )}

          <div className="mt-2">
            <label className="text-gray-900">Colors</label>
            <select
              // multiple
              onChange={handleColorsChange}
              className="bg-white border rounded px-1 mx-2"
            >
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
            </select>
            <ul className="p-1 my-2 *:bg-slate-50/60 *:py-0.5 *:px-1.5 *:rounded flex flex-wrap space-x-1 *:my-1">
              {formData.colors.map((color, index) => (
                <li key={index}>{color}</li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <label>Sizes</label>
            <select
              onChange={handleSizesChange}
              className="bg-white border rounded px-1 mx-2"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="X-Large">X-Large</option>
            </select>
            <ul className="p-1 my-2 *:bg-slate-50/60 *:py-0.5 *:px-1.5 *:rounded flex flex-wrap space-x-1 *:my-1">
              {formData.sizes.map((size, index) => (
                <li key={index}>{size}</li>
              ))}
            </ul>
          </div>

          <div>
            <input
              id="freeDelivery"
              type="checkbox"
              checked={formData.isFreeDelivery}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isFreeDelivery: !prev.isFreeDelivery,
                }))
              }
            />
            <label htmlFor="freeDelivery" className="px-1.5 text-gray-900">
              Free delivery
            </label>
          </div>

          <div>
            <label htmlFor="deliveryCharge" className="text-gray-900">
              Delivery charge
            </label>
            <div className="mt-2">
              <input
                id="deliveryCharge"
                name="deliveryCharge"
                type="number"
                min={0}
                value={formData.deliveryCharge}
                disabled={formData.isFreeDelivery}
                placeholder="Delivery charge"
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-2 mt-2">
            <label>Description</label>
            <textarea
            name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="border w-full my-1"
            ></textarea>
          </div>
          <div className="col-span-2 text-center space-x-2">
            <button type="submit" className="bg-green-500 hover:bg-green-700 rounded-sm py-1 px-2 text-white">
              Submit
            </button>
            <button onClick={resetHandler} className="bg-pink-700 hover:bg-pink-800 rounded-sm py-1 px-2 text-white">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
