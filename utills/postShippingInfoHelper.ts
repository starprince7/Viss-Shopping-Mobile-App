import { BASE_URL } from "@env";
import { ShippingInfo } from "../types";

type PostShippingInfoResponse = {
  error: string | null;
  msg: null | ResponseData;
};

type ResponseData = {
  msg: string;
  customerShippingInfo: {
    _id: string, shippingInfo: ShippingInfo[]
  }
};

type PostShippingInfo = {
  id: string | number;
} & ShippingInfo

async function postShippingInfo(data: PostShippingInfo): Promise<PostShippingInfoResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/customer/shipping-info/add`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    const res_data = await res.json();
    console.log("API response : ", res_data);
    
    // If err return error response
    if (res_data.error) return { error: res_data.error, msg: null };
    // If no error return success response
    return { error: null, msg: res_data };
  } catch (e) {
    console.log("Error! error signing up: ", e);
    // @ts-ignore
    return { error: e, msg: null };
  }
}

export default postShippingInfo;
