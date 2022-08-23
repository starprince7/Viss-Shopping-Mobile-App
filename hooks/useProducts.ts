import { BASE_URL } from "@env";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { setProducts } from "../redux/slices/productSlice";

const useProducts = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        dispatch(setProducts(data))
        setIsLoading(false);
      }
      catch (e) {
        console.log("Error No Products found :>>>>>", e)
      }
    }

    fetchProducts();
  }, []);

  return { isLoading };
};

export default useProducts