import { BASE_URL } from "@env";
import { getFromSecureStore } from "./secureStoreHelper";

export type ChangePasswordData = {
  id: string;
  oldPassword: string;
  newPassword: string;
};

export default async function changePassword(data: ChangePasswordData) {
  const authToken = await getFromSecureStore("auth_token");
  try {
    const res = await fetch(`${BASE_URL}/api/customer/password/change`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        "Authorization": authToken as string,
      },
    });
    const res_data = await res.json();
    console.log("API response : ", res_data);

    // If err return error response
    if (res_data.error) return { error: res_data.error, msg: null };
    // If no error return success response
    return { error: null, msg: res_data.msg };
  } catch (e) {
    console.log("Error! error signing up: ", e);
    // @ts-ignore
    return { error: e, msg: null };
  }
}
