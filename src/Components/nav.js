import React,{useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import Category from './category';
import Index from './Index';
import Product from './product';


const Nav = (props) => {
  const location = useLocation();
  useEffect(()=>{
    },[location])
 

    const handleToggle =(event)=>{

  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector('#sidebarToggle');

  event.preventDefault();
  document.body.classList.toggle('sb-sidenav-toggled');
  localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'))
}

  return (
    <>
       <div className="d-flex" id="wrapper">
            <div className="border-end bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom bg-light">Nimap Test</div>
                <div className="list-group list-group-flush">
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/">Dashboard</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/product">Products</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/category">Category</Link>
                    
                </div>
            </div>
          
            <div id="page-content-wrapper">
        
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="container-fluid">
                        <button className="btn btn-primary" id="sidebarToggle" onClick={handleToggle}>Toggle Menu</button> 
                       </div>
                </nav>
      {location.pathname==='/'?<Index /> : null}       
      {location.pathname==='/product'?<Product /> : null}       
      {location.pathname==='/category'?<Category /> : null}       
       </div>
       </div>

    </>
  )
}

export default Nav
