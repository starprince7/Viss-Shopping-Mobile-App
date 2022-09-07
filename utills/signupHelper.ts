import { BASE_URL } from "@env";
import { SignupApiError, SignupData, SignupFulfilled } from "../types";

type SignupResponse = {
  error: SignupApiError | null;
  data: SignupFulfilled | null;
};

async function signupCustomer(data: SignupData): Promise<SignupResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/customer/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    const res_data = await res.json();
    
    // If err return error response
    if (res_data.error) return { error: res_data.error, data: null };
    // If no error return success response
    return { error: null, data: res_data };
  } catch (e) {
    console.log("Error! error signing up: ", e);
    // @ts-ignore
    return { error: e, data: null };
  }
}

export default signupCustomer;
