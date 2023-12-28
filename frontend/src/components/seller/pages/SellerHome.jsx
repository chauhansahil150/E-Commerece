import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../../api/apiFunction';
import ProductUpdate from '../ProductUpdate';
import { Pagination } from 'antd';
import { BACKEND_URL } from '../../../config.jsX';
import useTotalProducts from '../../../customHooks/useTotalProducts';

function SellerHome() {
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
      
       const res = await fetch(`${BACKEND_URL}/product/products?start=${currPage}&no_of_products=${pageSize}`,
       {
        method:'get',
        credentials:'include'
       }
       )
        const products = await res.json();
        setAllProducts(products);
          // const countRes= await fetch(`${BACKEND_URL}/product/products/count`,{
          //   method:'get',
          //   credentials:'include'
          //  });
          //  const countData=await countRes.json();
          //  setTotalProducts(countData.count);
          //  console.log(toatlProducts);
          // setTotalProducts(countData);
       
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

  function onChange(page, pageSize) {
    setCurrPage(page)
    setPageSize(pageSize);
  }
  return (
   <>
    <div className='mt-3 flex  flex-row  flex-wrap'>
      {
        allProducts.map((p,ind)=>{
          return(
            <ProductUpdate key={ind} product={p}/>
          )
        })
      }
    </div>
       <div className="text-center">
   <Pagination onChange={onChange} pageSizeOptions={[5,10,50,100]} current={currPage} total={totalProducts} />
   </div>
   </>
  )
}

export default SellerHome
