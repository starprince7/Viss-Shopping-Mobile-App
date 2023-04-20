import { BASE_URL } from "@env";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux'
import { Product, setProductsAction } from "../store/slices/productSlice";
import { useCategory } from "./categories";

const useProducts = () => {
  const dispatch = useDispatch()
  const { category } = useCategory()
  const [products, setProducts] = useState<Product[]>([])
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);

  const fetchProducts = useCallback( async (signal: AbortSignal) => {
    setIsFetchingProduct(true);
    try {
      const res = await fetch(`${BASE_URL}/api/products/category/${category}`, { signal });
      const data = await res.json();
      dispatch(setProductsAction(data))
      setProducts(data)
      setIsFetchingProduct(false);
    }
    catch (e) {
      console.log("Error No Products found :>>>>>", e)
    }
  }, [category])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    fetchProducts(signal);

    return () => controller.abort()
  }, [category]);

  return { isFetchingProduct, products, fetchProducts }

};

export default useProducts