import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Account = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/screens/auth/LoginScreen");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-lg font-semibold mb-4">
        {isAuthenticated ? `Hello, ${user?.name}` : "Not signed in"}
      </Text>

      {/* might remove this   */}
      {user && (
        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Email: {user.email}</Text>
          <Text className="text-gray-600 mb-2">
            Onboarding: {user.isOnboardingComplete ? "Complete" : "Incomplete"}
          </Text>
        </View>
      )}
      {/* end  */}

      {isAuthenticated && (
        <TouchableOpacity onPress={handleLogout}>
          <Text className="text-red-500 underline text-base">Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Account;
