import { BASE_URL } from "@env"
import axios from "axios"

export default async function getProcessingFee(amount: number) : Promise<number> {
    const res = await axios.post(`${BASE_URL}/api/payments/processing_fee`, { amount }
    )
    console.log(res.data)
    return res.data.processingFee as number
}