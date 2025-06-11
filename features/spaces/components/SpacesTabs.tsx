
import { Text, View, useThemeColors } from "@/ui";
import { fonts } from "@/ui/theme/fonts";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GroupsLanding } from "../groups/GroupsLanding";
import { SavingsLanding } from "../savings/SavingsLanding";


const Tab = createMaterialTopTabNavigator();

function DummyScreen() {
  return (  
    <View flex={1} items="center" justify="center" bg="$surface1">
        <Text>Tab Page</Text>
        <Text color="$neutral2">Tab Content</Text>
    </View>
  );
}

export function SpacesTabs({onTabSelect}: {onTabSelect: (props: { index: number }) => void}){
  const colors = useThemeColors()
  return(
    <Tab.Navigator
      onTabSelect={onTabSelect}
      screenOptions={{
        tabBarLabelStyle: { textTransform: 'none', fontSize: 18,  fontFamily: fonts.buttonLabel1.family},
        //tabBarScrollEnabled: true,
        tabBarActiveTintColor: colors.neutral1.val,
        tabBarIndicatorStyle: {
          borderBottomWidth: 4,        
          borderColor: colors.accent1.val,
          borderRadius: 99999,
          width: "40%", //width: "23%",
          marginHorizontal: "5%",  
        },
        tabBarStyle: {
          width: "auto",
          elevation: 0
        },
        tabBarPressColor: colors.surface1.val,
        
      }}
      >
        <Tab.Screen name='savings' component={SavingsLanding} options={{ tabBarLabel: 'Savings' }}/>
        <Tab.Screen name='groups' component={GroupsLanding} options={{ tabBarLabel: 'Groups' }}/>
        {/*<Tab.Screen name='collections' component={DummyScreen} options={{ tabBarLabel: 'Collections' }}/> */}
      </Tab.Navigator>
  )
}