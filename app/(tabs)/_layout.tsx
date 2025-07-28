import { tabIcons } from "@/constants/icons";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter, Tabs } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

function TabIcon({ focused, icon, activeIcon, title }: any) {
  return (
    <View className="items-center justify-center space-y-1 min-w-[60px]">
      <Image
        source={focused ? activeIcon : icon}
        className="w-6 h-6"
        resizeMode="contain"
      />
      <Text
        numberOfLines={1}
        className={`text-[11px] font-medium text-center ${
          focused ? "text-[#00803C]" : "text-gray-400"
        }`}
      >
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/screens/auth/LoginScreen");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0.5,
          height: 76,
          paddingTop: 10,
          paddingBottom: 18,
          elevation: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={tabIcons.home}
              activeIcon={tabIcons.homeActive}
              title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={tabIcons.explore}
              activeIcon={tabIcons.exploreActive}
              title="Explore"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={tabIcons.insights}
              activeIcon={tabIcons.insightsActive}
              title="Insights"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={tabIcons.community}
              activeIcon={tabIcons.communityActive}
              title="Community"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={tabIcons.account}
              activeIcon={tabIcons.accountActive}
              title="Account"
            />
          ),
        }}
      />
    </Tabs>
  );
}
