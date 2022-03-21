import React, { useContext, useState, useEffect,useRef } from "react";
import apiContext from "../context/apicontext";

const Category = () => {
  const categorList = useContext(apiContext);
  const { addCategory, getAllCategory, category, deleteCategory,editCategory } = categorList;
  const [newcategory, setnewcategory] = useState({ categoryname: "" });
  const [ecategory, setecategory] = useState({ id: "", ecategoryname: "" });
  useEffect(() => getAllCategory(), []);

  const refclose=useRef(null);

  const onChange = (e) => {
    setnewcategory({ ...newcategory, [e.target.name]: e.target.value });
  };
  const onChangeUpdate= (e) => {
    console.log(e.target.value);
    setecategory({ ...ecategory, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addCategory(newcategory.categoryname);
  };

  const handleEdit=(e)=>{
    e.preventDefault();
    editCategory(ecategory.id,ecategory.ecategoryname);
    refclose.current.click();
  }

  const updateCategory = (category) => {
    setecategory({ id: category._id, ecategoryname: category.categoryname });
  };

  return (
    <>
      <div
        className="container px-5 py-2 rounded mx-3 my-2"
        style={{ background: "#f2f2f2", width: "500px" }}
      >
        <h1>Add New Category</h1>
        <form
          action="/category"
          method="POST"
          encType="multipart/form-data"
          className="form-group mx-auto py-2"
        >
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="categoryname" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                name="categoryname"
                id="categoryname"
                className="form-control"
                required
                onChange={onChange}
              />
            </div>

            <div className="col-12">
              <input
                type="submit"
                value="Add Category"
                className="btn btn-primary"
                onClick={handleClick}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="px-5 py-2">
        <h1>Category List</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Srno</th>
              <th>Date</th>
              <th>Category Id</th>
              <th>Category Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(category).map((ele,i) => {
              return (
                <tr>
                  <td>{i+1}</td>
                  <td>{ele.date.slice(0, 10)}</td>
                  <td>{`category${ele._id.slice(20, 25)}`}</td>
                  <td>{ele.categoryname}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => updateCategory(ele)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteCategory(ele._id);
                      }}
                      className="btn btn-sm btn-danger"
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
                Edit Category
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
                action="/editcategory"
                method="PUT"
                encType="multipart/form-data"
                className="form-group mx-auto py-2"
              >
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="ecategoryname" className="form-label">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="ecategoryname"
                      id="ecategoryname"
                      className="form-control"
                      required
                      value={ecategory.ecategoryname}
                      onChange={onChangeUpdate}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="submit"
                      value="Save changes"
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
                data-bs-dismiss="modal" ref={refclose}
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

export default Category;


