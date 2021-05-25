/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react'
 import { NavigationContainer } from '@react-navigation/native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import Home from './screens/HomeScreen'
 import Explore from './screens/ExploreScreen'
 import About from './screens/AboutScreen'

 const Tab = createBottomTabNavigator();
 
 const App = () =>{      
   return(
   <NavigationContainer>
       <Tab.Navigator
     
         screenOptions={({ route }) => ({
           tabBarIcon: ({ focused, color, size }) => {
             let iconName;
 
             if (route.name === 'Home') {
               iconName = focused
                 ? 'home'
                 : 'home-outline';
             } else if (route.name === 'Explore') {
               iconName = focused ? 'cloud-upload-outline' : 'cloud-upload-outline';
             }
             else if (route.name === 'DevInfo') {
               iconName = focused ? 'information-circle' : 'information-circle';
             }
 
             // You can return any component that you like here!
             return <Ionicons name={iconName} size={size} color={color} />;
           },
         })}
         tabBarOptions={{
           activeTintColor: 'tomato',
           inactiveTintColor: 'gray',
         }}
       >
         <Tab.Screen name="Home" component={Home}  />
         <Tab.Screen name="Explore"  component={Explore}  />
         <Tab.Screen name="DevInfo" component={About} />
       </Tab.Navigator>
     </NavigationContainer>
   )
  
 }
 export default App;