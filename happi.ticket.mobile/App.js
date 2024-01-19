/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Alert
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from './store';
import AppStackNavigator from './screens/AppStackNavigator';
import 'react-native-gesture-handler'
import { Provider } from 'react-redux';
import LoginStack from './screens/LoginStack';
import { useSelector,useDispatch } from "react-redux";
import 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper';
import analytics from '@react-native-firebase/analytics';




function App() {
  const isDarkMode = useColorScheme() === 'dark';
  // const token='73633';
  // const token = useSelector((state) => state.auth.token);
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
React.useEffect( async ()=>{
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
      } else {
        console.log('All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
  
},[])

  return (
    <Provider store={store}>
     <PaperProvider>
        <NavigationContainer
              ref={navigationRef}
              onReady={() =>
                (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
              }
              onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
        
                if (previousRouteName !== currentRouteName) {
                  // Replace the line below to add the tracker from a mobile analytics SDK
                  await analytics().logScreenView({
                    screen_name: currentRouteName,
                    screen_class: currentRouteName,
                  });
                   // Alert.alert(`The route changed to ${currentRouteName}`);
                }
        
                // Save the current route name for later comparison
                routeNameRef.current = currentRouteName;
              }}
        >
          <LoginStack/>
        </NavigationContainer>
        </PaperProvider>
      
     
      {/* <NavigationContainer>
        <LoginStack/>
      </NavigationContainer> */}
      

      </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
