import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

function TabIcon({ focused, icon, activeIcon, title }: any) {
  return (
    <View className="items-center justify-center mt-3">
      <View
        className={`size-10 rounded-full items-center justify-center ${
          focused ? "bg-[#00803C]" : ""
        }`}
      >
        <Image
          source={focused ? activeIcon : icon}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </View>
      <Text
        className={`text-xs mt-1 font-medium ${
          focused ? "text-[#00803C]" : "text-[#A8B5DB]"
        }`}
      >
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 80,
          paddingHorizontal: 12,
          paddingBottom: 8,
          borderRadius: 40,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              activeIcon={icons.homeActive}
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
              icon={icons.explore}
              activeIcon={icons.exploreActive}
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
              icon={icons.insights}
              activeIcon={icons.insightsActive}
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
              icon={icons.community}
              activeIcon={icons.communityActive}
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
              icon={icons.account}
              activeIcon={icons.accountActive}
              title="Account"
            />
          ),
        }}
      />
    </Tabs>
  );
}
