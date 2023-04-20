import { BASE_URL } from "@env"
import axios from "axios"
import { getFromSecureStore } from "./secureStoreHelper";

export default async function getProcessingFee(amount: number) : Promise<number> {
  const authToken = await getFromSecureStore("auth_token")
    const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };

    const res = await axios.post(`${BASE_URL}/api/payments/processing_fee`, { amount }, config)
    console.log(res.data)
    return res.data.processingFee as number
}