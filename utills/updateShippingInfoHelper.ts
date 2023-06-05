import { BASE_URL } from "@env";
import { ShippingInfo } from "../types";
import { getFromSecureStore } from "./secureStoreHelper";

type PostShippingInfoUpdateResponse = {
  error: string | null;
  msg: null | ResponseData;
};

type ResponseData = {
  msg: string;
  customerShippingInfo: {
    _id: string;
    shippingInfo: ShippingInfo[];
  };
};

type PostShippingInfoUpdate = {
  id: string | number;
  shippingInfo_Id: string | number;
} & ShippingInfo;

async function postShippingInfoUpdate(
  data: PostShippingInfoUpdate
): Promise<PostShippingInfoUpdateResponse> {
  const authToken = await getFromSecureStore("auth_token") as string
  try {
    const res = await fetch(`${BASE_URL}/api/customer/shipping-info/update`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        "Authorization": authToken
      },
    });
    const res_data = await res.json();

    //> If err. return error response
    if (res_data.error) return { error: res_data.error, msg: null };

    //> If no error return success response
    return { error: null, msg: res_data };
  } catch (e) {
    console.log("Error! error signing up: ", e);
    // @ts-ignore
    return { error: e, msg: null };
  }
}

export default postShippingInfoUpdate;
