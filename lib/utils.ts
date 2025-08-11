import { Alert } from "react-native";

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ErrorResponseData {
  message?: string;
  error?: string;
  [key: string]: any;
}

interface ErrorResponse {
  data?: ErrorResponseData;
  [key: string]: any;
}

interface CustomError {
  response?: ErrorResponse;
  message?: string;
  [key: string]: any;
}

export const handleErrorGlobal = (error: CustomError) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";
  Alert.alert("Error", message);
};
