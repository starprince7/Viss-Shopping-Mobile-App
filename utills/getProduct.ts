import { BASE_URL } from "@env";
import { CartItemType } from "../redux/slices/cartSlice";

type AsyncResponse = {
    error: Promise<any> | null;
    data: CartItemType | null;
}

export async function getSingleProduct(id: string): Promise<AsyncResponse> {
  let returned_response = {
    error: null,
    data: null,
  };

    try {
        const res = await fetch(`${BASE_URL}/api/products/${id}`)
        const res_data = await res.json();
        returned_response.data = res_data;
     }
    catch (e) {
        console.log("Error No Product found :>>>>>", e)
        returned_response.error = e as any;
    }

  return returned_response;
}
