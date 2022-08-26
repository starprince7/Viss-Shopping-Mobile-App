import { BASE_URL } from "@env";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { setProducts } from "../redux/slices/productSlice";

const useProducts = () => {
  const dispatch = useDispatch()
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);

  async function fetchProducts() {
    setIsFetchingProduct(true);
    
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await res.json();
      dispatch(setProducts(data))
      setIsFetchingProduct(false);
    }
    catch (e) {
      console.log("Error No Products found :>>>>>", e)
    }
  }

  useEffect(() => {

    fetchProducts();
  }, []);

  return { isFetchingProduct, fetchProducts };
};

export default useProducts