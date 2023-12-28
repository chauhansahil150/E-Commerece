import React, { useState, useEffect } from "react";
import ProductItem from "../components/productItem/productItem";
import styles from "./css/home.module.css";
// import './css/home.module.css';
import { getAllProducts,countAllProducts } from "../api/apiFunction";
import SquareShimmer from "../components/SquareShimmer";
// import Pagination from "../components/Pagination";
import { Pagination } from 'antd';
import { BACKEND_URL } from "../config.jsX";
import useTotalProducts from "../customHooks/useTotalProducts";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [currPage,setCurrPage] = useState(1)
  const [currentProducts,setCurrentProducts]=useState([]);
  const [pageSize,setPageSize]=useState(10);
  // const [toatlProducts,setTotalProducts]=useState(0);

  const totalProducts=useTotalProducts();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
      
       const res = await fetch(`${BACKEND_URL}/product/products?start=${currPage}&no_of_products=${pageSize}`)
        const products = await res.json()
       
          setAllProducts(products);
       
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching products:', error);
        // Handle the error as needed, e.g., show an error message to the user
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [currPage,pageSize]);
  // Include start and pageSize in the dependency array
  
    // Update currentProducts whenever allProducts changes
   
  function onChange(page, pageSize) {
    setCurrPage(page)
    setPageSize(pageSize);
  }
  return !isLoading? (
   <>
    <div className={styles.products}>
    {allProducts.map((product, ind) => {
      return <ProductItem key={ind} product={product}/>
    })} 
    <br />
  </div>
   <div className="text-center">
   <Pagination onChange={onChange} pageSizeOptions={[5,10,50,100]} current={currPage} total={totalProducts} />
   </div>
   </>
  ):(
           <SquareShimmer /> 
  )
};



export default Home;
