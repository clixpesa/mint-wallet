
import { Text, View, useThemeColors } from "@/ui";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function DummyScreen() {
  return (  
    <View flex={1} items="center" bg="$surface1">
        <Text>Tab Page</Text>
        <Text color="$neutral2">Tab Content</Text>
    </View>
  );
}

export function SpacesTabs(){
  const colors = useThemeColors()
  return(
    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { textTransform: 'none', fontSize: 20 },
      tabBarScrollEnabled: true,
      tabBarStyle: {
        width: "auto",
      },
      tabBarPressColor: colors.surface1.val
  }}
    >
      <Tab.Screen name='overview' component={DummyScreen} options={{ tabBarLabel: 'Overview' }}/>
      <Tab.Screen name='vaults' component={DummyScreen} options={{ tabBarLabel: 'Vaults' }}/>
      <Tab.Screen name='groups' component={DummyScreen} options={{ tabBarLabel: 'Groups' }}/>
      <Tab.Screen name='challenge' component={DummyScreen} options={{ tabBarLabel: 'Challenge' }}/>
      <Tab.Screen name='fundme' component={DummyScreen} options={{ tabBarLabel: 'Fund Me' }}/>
    </Tab.Navigator>
  )
}