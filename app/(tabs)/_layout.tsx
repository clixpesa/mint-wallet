import { useThemeColors } from "@/ui";
import {
	createNativeBottomTabNavigator,
	NativeBottomTabNavigationEventMap,
	NativeBottomTabNavigationOptions,
} from '@bottom-tabs/react-navigation';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import React from "react";

const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;

const Tabs = withLayoutContext<
  NativeBottomTabNavigationOptions,
  typeof BottomTabNavigator,
  TabNavigationState<ParamListBase>,
  NativeBottomTabNavigationEventMap
>(BottomTabNavigator);


export default function TabLayout() {
	const colors = useThemeColors()
	return (
		//<KeyboardAvoidingView style={{ flex: 1 }}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
		<Tabs
			tabBarStyle={{
				backgroundColor: colors.background.val
				
			}}
			labeled={true}
			activeIndicatorColor={colors.tealThemed.val}
			tabBarActiveTintColor={colors.accent1.val}
			translucent={true}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({focused}) => (focused ? 
						require("@/ui/assets/images/nav-icons/home-fill.svg") : 
						require("@/ui/assets/images/nav-icons/home-line.svg")
					),			
				}}
			/>
			<Tabs.Screen
				name="spaces"
				options={{
					title: "Spaces",
					tabBarIcon: ({ focused }) => (focused ? 
						require("@/ui/assets/images/nav-icons/bubble-fill.svg") : 
						require("@/ui/assets/images/nav-icons/bubble-line.svg")
					),
				}}
			/>
			<Tabs.Screen
				name="invest"
				options={{
					title: "Invest",
					tabBarIcon: ({ focused }) => (focused ? 
						require("@/ui/assets/images/nav-icons/barchart-fill.svg") : 
						require("@/ui/assets/images/nav-icons/barchart-line.svg")
					),
				}}
			/>
			<Tabs.Screen
				name="extras"
				options={{
					title: "Extras",
					tabBarIcon: ({ focused }) => (focused ? 
						require("@/ui/assets/images/nav-icons/pantone-fill.svg") : 
						require("@/ui/assets/images/nav-icons/pantone-line.svg")
					),
				}}
			/>
		</Tabs>
		//</KeyboardAvoidingView>
	);
}

