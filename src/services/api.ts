import axios from "axios";
import Constants from "expo-constants";
import { Crop, CropWithConstant } from "../types";


let API_URL = ''
if (process.env.EXPO_PUBLIC_ENVIRONMENT === 'dev') {
  // automatically get the localhost IP 
  API_URL = Constants?.expoConfig?.hostUri ? Constants.expoConfig.hostUri.split(`:`).shift()!.concat(`:3333`) : String(process.env.EXPO_PUBLIC_API_URL)
  if (!API_URL.includes('http://')) {
    API_URL = `http://${API_URL}`
  }
} else {
  API_URL = String(process.env.EXPO_PUBLIC_API_URL)
}
console.log('API_URL:', API_URL)

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
  },
});

// ROUTES 

export async function getCropsList() {
  // fake delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  const { data } = await API.get<Omit<Crop, 'constants'>[]>("/crops");
  return data
}

export async function getCropsDetails(id: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const { data } = await API.get<{ crop: CropWithConstant }>(`/crops/${id}`);
  return data
}