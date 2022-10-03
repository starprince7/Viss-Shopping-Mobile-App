import { BASE_URL } from "@env";
import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";

type CategotyContextProps = {
  categories: Category[];
  category: string;
  isFetchingCategories: boolean;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export type Category = {
  _id: string;
  name: string;
  type?: string;
};
type Response = { data: Category[] };

type CategoryContextProps = {
  children: React.ReactNode
}


export const CategoryContext = createContext({} as CategotyContextProps)
// ::> Hook
export const useCategory = () => {
  return useContext(CategoryContext)
};

export const CategoryContextProvider = ({ children }: CategoryContextProps) => {
  const [category, setCategory] = useState<string>("watch");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetchingCategories, setIsFetchingCategories] = useState(true)

  useEffect(() => {
    async function getCategories() {
      setIsFetchingCategories(true)
      const res: Response = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(res.data);
      setIsFetchingCategories(true)
    }
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategory, category, isFetchingCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}
