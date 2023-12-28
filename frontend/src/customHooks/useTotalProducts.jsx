import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config.jsX';

function useTotalProducts() {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const countRes = await fetch(`${BACKEND_URL}/product/products/count`, {
          method: 'get',
          credentials: 'include'
        });

        const countData = await countRes.json();
        setTotalProducts(countData.count);
      } catch (error) {
        console.error('Error fetching total products:', error);
        // Handle the error as needed
      }
    };

    fetchTotalProducts();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return totalProducts;
}

export default useTotalProducts;
