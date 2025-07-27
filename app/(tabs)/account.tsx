import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

const Account = () => {
  const { userId, isSignedIn } = useAuth();
  console.log("User:", userId);
  console.log("Is signed in:", isSignedIn);
  return (
    <View>
      <Text>account</Text>
    </View>
  );
};

export default Account;
