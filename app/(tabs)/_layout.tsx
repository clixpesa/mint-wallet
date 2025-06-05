import { Stack, useThemeColors } from "@/ui";
import {
	HomeFill, HomeLine,
	InvestFill, InvestLine,
	PantoneFill, PantoneLine,
	SpacesFill, SpacesLine
} from "@/ui/components/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";


export default function TabLayout() {
	const colors = useThemeColors()
	return (
		//<KeyboardAvoidingView style={{ flex: 1 }}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.accent1.val,
				headerShown: false,	
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: "absolute",
						height: 64 
					},
					default: {
						height: 64,		
					},
				}),
				tabBarLabelStyle: {
					fontSize: 14
				}
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({focused,  color }) => (
						<Stack bg={focused ? "$tealLight": null} py={2} px={20} rounded="$full">
							{focused ? <HomeFill color={color} size={24}/> : <HomeLine color={color} size={24}/>}
						</Stack>
					),
				}}
			/>
			<Tabs.Screen
				name="spaces"
				options={{
					title: "Spaces",
					tabBarIcon: ({ focused, color }) => (
						<Stack bg={focused ? "$tealLight": null} py={2} px={20} rounded="$full">
							{ focused ? <SpacesFill color={color} size={24}/> : <SpacesLine color={color}size={24}/> }
						</Stack>
					),
				}}
			/>
			<Tabs.Screen
				name="invest"
				options={{
					title: "Invest",
					tabBarIcon: ({ focused, color }) => (
						<Stack bg={focused ? "$tealLight": null} py={2} px={20} rounded="$full">
							{focused ? <InvestFill color={color} size={24}/> : <InvestLine color={color} size={24}/>}
						</Stack>
					),
				}}
			/>
			<Tabs.Screen
				name="extras"
				options={{
					title: "Extras",
					tabBarIcon: ({ focused, color }) => (
						<Stack bg={focused ? "$tealLight": null} py={2} px={20} rounded="$full">
							{focused ? <PantoneFill color={color} size={24}/> : <PantoneLine color={color} size={24}/>}
						</Stack>
					),
				}}
			/>
		</Tabs>
		//</KeyboardAvoidingView>
	);
}

