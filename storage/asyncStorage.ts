import { Transaction } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getName<T>(name: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error(`AsyncStorage getItem error for key "${name}":`, err);
    return null;
  }
}

export async function setName<T>(name: string, value: T): Promise<void> {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(name, json);
  } catch (err) {
    console.error(`AsyncStorage setItem error for key "${name}":`, err);
  }
}

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error("Failed to clear storage", e);
  }
};
