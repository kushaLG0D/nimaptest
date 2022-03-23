import React, { useContext, useState} from "react";
import apiContext from "../context/apicontext";
import {Navigate} from "react-router-dom";
import Index from "./Index";


const Product = () => {
  const productList = useContext(apiContext);
  const { addProduct} = productList;
  const [newproduct,setnewproduct]=useState({productname:"",category:"",price:""});

  const onChange = (e) => {
    setnewproduct({ ...newproduct, [e.target.name]: e.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    addProduct(newproduct.productname,newproduct.category,newproduct.price);
    <Navigate to="/index" />
    
  };

  return (
    <>
      <div
        className="container px-5 py-2 rounded mx-3 my-2"
        style={{ background: "#f2f2f2", width: "500px" }}
      >
        <h1>Add New Product</h1>
        <form
           action="/product"
           method="POST"
           encType="multipart/form-data"
         
          className="form-group mx-auto py-2"
        >
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="productname" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                name="productname"
                id="email"
                className="form-control"
                required
                onChange={onChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                className="form-control"
                required
                onChange={onChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="peice" className="form-label">
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                className="form-control"
                required
                onChange={onChange}
              />
            </div>
            <div className="col-12">
              <input
                type="submit"
                value="Add Product"
                className="btn btn-primary"
                onClick={handleClick}
              />
            </div>
          </div>
        </form>
      </div>
      <Index />
    </>
  );
};

export default Product;
