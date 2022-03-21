import ApiContext from './apicontext';
import { useState } from 'react';

const Apistate=(props)=>{
    const host = `http://localhost:5000`;
    const categorydata =[];
    const productdata =[];
    const [category,setcategory] =useState(categorydata);
    const [product,setproduct] =useState(productdata);

    
    //Get ALl Category
    const getAllCategory =async()=>{
        const url =`${host}/category`
        const response = await fetch(url,
          {method:"GET",
          headers:{"Content-Type": "application/json"}
        })
        const json = await response.json();
        console.log(json);
        setcategory(json);
      };
    //   getAllCategory();

    //Get ALl Product
    const getAllProduct =async()=>{
        const url =`${host}/product`
        const response = await fetch(url,
          {method:"GET",
          headers:{"Content-Type": "application/json"}
        })
        const json = await response.json();
        setproduct(json);
      };

      //Post- Category

      const addCategory = async (categoryname)=>{
        const url =`${host}/category`
        const response = await fetch(url,
          {method:"POST",
          headers:{
            "Content-Type": "application/json",
         },
          body: JSON.stringify({categoryname})
        })
        const json = await response.json();
        setcategory(category.concat(json));//Push add element in array. Concat return new array
      }

      //Post- Product

      const addProduct = async (productname,category,price)=>{
        const url =`${host}/product`
        const response = await fetch(url,
          {method:"POST",
          headers:{
            "Content-Type": "application/json",
         },
          body: JSON.stringify({productname,category,price})
        })
        const json = await response.json();
        console.log(json);

        setproduct(product.concat(json));//Push add element in array. Concat return new array
      }


      //Delete a category
      const deleteCategory =async (id)=>{
        const url =`${host}/deletecategory/${id}`
        console.log(url);

        const response = await fetch(url,
          {method:"DELETE",
          headers:{
            "Content-Type": "application/json"}
        });
        console.log(response);
        const data = await response.json();
        const newCategoryAfterDelete =category.filter((ele)=> {return ele._id !== id})
        setcategory(newCategoryAfterDelete);
      }

      const deleteProduct=async (id)=>{
        const url =`${host}/deleteproduct/${id}`
        console.log(url);

        const response = await fetch(url,
          {method:"DELETE",
          headers:{
            "Content-Type": "application/json"}
        });
        const data = await response.json();
        console.log(data);
        const newProductAfterDelete =product.filter((ele)=> {return ele._id !== id})
        setproduct(newProductAfterDelete);
      }


      const editCategory = async (id,categoryname) => {
        const url =`${host}/editcategory/${id}`;
        const response = await fetch(url,
          {method:"PUT",
          headers:{
            "Content-Type": "application/json",
         },
          body: JSON.stringify({categoryname})
        })
        const json = await response.json();
        
        let newCategory=JSON.parse(JSON.stringify(category));
        //For Client Side
        for (let index = 0; index < category.length; index++) {
            const element = newCategory[index];
            if(element._id===id)
            {
                newCategory[index].categoryname =categoryname;
                break; 
            }
        }
        setcategory(newCategory)
      }

      const editProduct = async (id,productname,category,price) => {
        const url =`${host}/editproduct/${id}`;
        const response = await fetch(url,
          {method:"PUT",
          headers:{
            "Content-Type": "application/json",
         },
          body: JSON.stringify({productname,category,price})
        })

      
        const json = await response.json();
        
        let newProduct=JSON.parse(JSON.stringify(product));
        console.log(JSON.parse(JSON.stringify(product)));
        //For Client Side
        for (let index = 0; index < product.length; index++) {
            const element = newProduct[index];
            if(element._id===id)
            {
                newProduct[index].productname =productname;
                newProduct[index].category =category;
                newProduct[index].price =price;
                break; 
            }
        }
        setproduct(newProduct)
      }

    return (
        <ApiContext.Provider value={{category,product,setproduct,setcategory,getAllCategory,getAllProduct,addProduct,deleteProduct,addCategory,deleteCategory,editCategory,editProduct}}>
            {props.children}
        </ApiContext.Provider>
        )
}

export default Apistate;