import { Text, useThemeColors, View } from "@/ui";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function DummyScreen() {
  return (  
    <View flex={1} justify="center" items="center" bg="$surface1">
        <Text>Tab Page</Text>
        <Text color="$neutral2">Tab Content</Text>
    </View>
  );
}

export function InvestTabs(){
  const colors = useThemeColors()
  return(
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { textTransform: 'none', fontSize: 20 },
        tabBarScrollEnabled: true,
        tabBarStyle: {
          width: "auto"
        },
        tabBarPressColor: colors.surface1.val
    }}
    >
      <Tab.Screen name='overview' component={DummyScreen} options={{ tabBarLabel: 'Overview' }}/>
      <Tab.Screen name='rwas' component={DummyScreen} options={{ tabBarLabel: 'RWAs' }}/>
      <Tab.Screen name='etfs' component={DummyScreen} options={{ tabBarLabel: 'ETFs' }}/>
      <Tab.Screen name='crypto' component={DummyScreen} options={{ tabBarLabel: 'Crypto' }}/>
      <Tab.Screen name='credit' component={DummyScreen} options={{ tabBarLabel: 'Credit' }}/>
    </Tab.Navigator>
  )
}