import axios from "axios";
import React from "react";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthProvider";
import "./AddItem.module.css";

function AddItem({ user }) {
  console.log(user);
  const { id } = useParams();
  const imgbbApiKey = "c442e6714115f58c39b00b3070af9fab";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    let imgData = new FormData();
    imgData.append("image", data.fishImage[0]);

    const url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;
    await axios
      .post(url, imgData)
      .then((res) => {
        console.log("object", res);

        // setTimeout(() => {
        if (res.data.success) {
          console.log("yeah...finally", res);
          const fishImage = res?.data?.data?.url;
          const newProduct = {
            ...data,
            fishImage: fishImage,
            sellerId: user.uid,
          };
          console.log(fishImage, newProduct);
          if (id) {
            axios
              .put(`${process.env.REACT_APP_API_URL}/product/${id}`, newProduct)
              .then((res) => toast.success("Product updated successfully!"))
              .catch((error) => toast.error("Product update failed!"));
          } else {
            axios
              .post(`${process.env.REACT_APP_API_URL}/product/add`, newProduct)
              .then((res) => toast.success("Product added successfully!"))
              .catch((error) => toast.error("Product added failed!"));
          }
        }
        // }, 2000)
      })
      .catch((err) => toast.error("Product upload failed"));
  };

  return (
    <form className="add-item" onSubmit={handleSubmit(onSubmit)}>
      <Container className="my-2">
        <h3>Add New Item</h3>
        <hr />
        {/* <!-- fish category --> */}
        <label for="category">
          <b>Choose Category: </b>
        </label>
        <select id="category" {...register("category", { required: true })}>
          <option value="crab">Crab</option>
          <option value="prawn">Prawn</option>
          <option value="dry fish">Dry fish</option>
          <option value="farmed fish">Farmed fish</option>
          <option value="pond">Pond</option>
          <option value="howl">Howl</option>
          <option value="beel">Beel</option>
          <option value="river">River</option>
          <option value="sea">Sea</option>
          <option value="deshi">Deshi</option>
        </select>{" "}
        <br /> <br />
        {/* <!-- fish name --> */}
        <label for="name">
          <b>Fish Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter fish name"
          {...register("name", { required: true })}
        />
        <br />
        {/* <!-- fish weight --> */}
        <label for="weight">
          <b>Weight</b>
        </label>
        <input
          type="text"
          placeholder="Enter minimum weight"
          {...register("weight", { required: true })}
        />
        <br />
        {/* <!-- fish unit price --> */}
        <label for="price">
          <b>Price</b>
        </label>
        <input
          type="text"
          placeholder="Enter unit price"
          {...register("price", { required: true })}
        />
        <br />
        {/* <!-- fish image --> */}
        <label for="image">
          <b>Image</b>
        </label>
        <input
          type="file"
          placeholder="Enter image data"
          {...register("fishImage", { required: true })}
        />
        <br />
        <div className="my-3">
          <button type="submit" className="btn btn-light border-secondary">
            Upload
          </button>
        </div>
      </Container>
    </form>
  );
}

export default AddItem;
