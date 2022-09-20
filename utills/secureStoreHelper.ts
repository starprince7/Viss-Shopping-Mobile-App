import * as SecureStore from "expo-secure-store";

export async function saveToSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getFromSecureStore(key: string) {
  const value = await SecureStore.getItemAsync(key);
  if (!value) return null;
  return value;
}

export async function removeFromSecureStore(key: string) {
  await SecureStore.deleteItemAsync(key)
}
