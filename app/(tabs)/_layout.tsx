import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColors } from "@/ui";
import { HomeFill, HomeLine, InvestFill, InvestLine, PantoneFill, PantoneLine, WalletFill, WalletLine } from "@/ui/components/icons";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const colors = useThemeColors()
	return (
		<Tabs
			screenOptions={({route}) => ({
				tabBarActiveTintColor: colors.accent1.val,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: "absolute",
						height: 64
					},
					default: {
						height: 64
					},
				}),
			})}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({focused,  color }) => (
						focused ? <HomeFill color={color} size={24}/> : <HomeLine color={color} size={24}/>
					),
				}}
			/>
			<Tabs.Screen
				name="spaces"
				options={{
					title: "Spaces",
					tabBarIcon: ({ focused, color }) => (
						focused ? <WalletFill color={color} size={24}/> : <WalletLine color={color}size={24}/>
					),
				}}
			/>
			<Tabs.Screen
				name="invest"
				options={{
					title: "Invest",
					tabBarIcon: ({ focused, color }) => (
						focused ? <InvestFill color={color} size={24}/> : <InvestLine color={color} size={24}/>
					),
				}}
			/>
			<Tabs.Screen
				name="extras"
				options={{
					title: "Extras",
					tabBarIcon: ({ focused, color }) => (
						focused ? <PantoneFill color={color} size={24}/> : <PantoneLine color={color} size={24}/>
					),
				}}
			/>
		</Tabs>
	);
}

