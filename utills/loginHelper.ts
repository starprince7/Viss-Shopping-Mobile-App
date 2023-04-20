import { BASE_URL } from "@env";
import axios from "axios";
import { Alert } from "react-native";
import { LoginData, LoginFulfilled } from "../types";

type LoginResponse = {
  error: string | null;
  data: LoginFulfilled | null;
};

async function loginCustomer(data: LoginData): Promise<LoginResponse> {
  try {
    const res = await fetch(`${BASE_URL}/api/customer/login`, {
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
    // @ts-ignore
    Alert.alert("Error: Network request failed, please check you network connection.")
    return { error: "", data: null };
  }
}

export default loginCustomer;
