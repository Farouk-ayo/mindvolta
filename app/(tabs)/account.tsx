import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

const Account = () => {
  const { userId, isSignedIn, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-lg font-semibold mb-4">
        {isSignedIn ? `Signed in as: ${userId}` : "Not signed in"}
      </Text>

      {isSignedIn && (
        <TouchableOpacity onPress={handleLogout}>
          <Text className="text-red-500 underline text-base">Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Account;
