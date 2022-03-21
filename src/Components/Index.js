import React, { useContext, useState, useEffect, useRef } from "react";
import apiContext from "../context/apicontext";
import load from "lodash";

const Index = () => {
  useEffect(() => {
    getAllProduct();
  }, []);
  const productList = useContext(apiContext);
  const { getAllProduct, product, editProduct, deleteProduct } = productList;
  const [eproduct, seteproduct] = useState({
    eid: "",
    eproductname: "",
    ecategory: "",
    eprice: "",
  });
 
  const refclose = useRef(null);

  //Pagination part
  const pagesize = 10;
  const trim=load(product).slice(0).take(pagesize).value();

  const [paginated, setpaginated] = useState(trim);
  const [current, setcurrent] = useState(1);

  const pagecount = product ? Math.ceil(product.length / pagesize) : 0;
  const pages = load.range(1, pagecount + 1);

  const onChange = (e) => {
    seteproduct({ ...eproduct, [e.target.name]: e.target.value });
  };
  //Pagination
  const pagination = (pageno) => {
    setcurrent(pageno);
    const startIndex = (pageno - 1) * pagesize;
    let pageinatedData = load(product).slice(startIndex).take(pagesize).value();
    setpaginated(pageinatedData);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editProduct(
      eproduct.eid,
      eproduct.eproductname,
      eproduct.ecategory,
      eproduct.eprice
    );
    refclose.current.click();
  };

  const updateProduct = (product) => {
    seteproduct({
      eid: product._id,
      eproductname: product.productname,
      ecategory: product.category,
      eprice: product.price,
    });
  };
  return (
    <>
      <div className="container px-5 py-2">
        <h1>Product List</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Srno</th>
              <th>Date</th>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Category Name</th>
              <th>Category id</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(paginated).map((ele, i) => {
              return (
                <tr>
                  <td>{i+1}</td>
                  <td>{ele.date.slice(0, 10)}</td>
                  <td>{`product${ele._id.slice(20,25)}`}</td>
                  <td>{ele.productname}</td>
                  <td>{ele.category}</td>
                  <td>{`category${ele.categoryid.slice(20,25)}`}</td>
                  <td>{`$${ele.price}`}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => updateProduct(ele)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        deleteProduct(ele._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((ele) => {
            return (
              <li
                className={ele === current ? "page-item active" : "page-item"}
              >
                <p
                  className="page-link"
                  onClick={() => {
                    pagination(ele);
                  }}
                >
                  {ele}
                </p>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Product Edit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                action="/editproduct"
                method="PUT"
                encType="multipart/form-data"
                className="form-group mx-auto py-2"
              >
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="productname" className="form-label">
                      Product Name
                    </label>
                    <input
                      onChange={onChange}
                      type="text"
                      name="eproductname"
                      id="email"
                      className="form-control"
                      value={eproduct.eproductname}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      name="ecategory"
                      id="category"
                      className="form-control"
                      onChange={onChange}
                      value={eproduct.ecategory}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="peice" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      name="eprice"
                      id="price"
                      className="form-control"
                      onChange={onChange}
                      value={eproduct.eprice}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="submit"
                      value="Save Changes"
                      className="btn btn-primary"
                      onClick={handleEdit}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
