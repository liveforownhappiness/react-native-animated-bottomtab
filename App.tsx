import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CommunityOff from './src/assets/icons/bottomtab/communityOff.svg';
import CommunityOn from './src/assets/icons/bottomtab/communityOn.svg';
import HomeOff from './src/assets/icons/bottomtab/homeOff.svg';
import HomeOn from './src/assets/icons/bottomtab/homeOn.svg';
import MyOff from './src/assets/icons/bottomtab/myOff.svg';
import MyOn from './src/assets/icons/bottomtab/myOn.svg';
import SupportOff from './src/assets/icons/bottomtab/supportOff.svg';
import SupportOn from './src/assets/icons/bottomtab/supportOn.svg';
import TvOff from './src/assets/icons/bottomtab/tvOff.svg';
import TvOn from './src/assets/icons/bottomtab/tvOn.svg';
import Screen2 from './src/components/Screen2';
import Screen3 from './src/components/Screen3';
import Screen4 from './src/components/Screen4';
import Screen5 from './src/components/Screen5';
import Screen1 from './src/components/Screen1';
import {NavigationContainer} from '@react-navigation/native';

export type BottomTabParamList = {
  Screen3: undefined;
  Screen1: {userId: string};
  Screen2: {sort: 'latest' | 'top'} | undefined;
  Screen4: {sort: 'latest' | 'top'} | undefined;
  Screen5: undefined;
};

const TabBarIcon = ({name, focused}: any) => {
  console.log('route ::', name);
  switch (name) {
    case 'Screen1':
      return (
        <View style={styles.tabButton}>
          {focused ? (
            <SupportOn width={35} height={35} />
          ) : (
            <SupportOff width={35} height={35} />
          )}
        </View>
      );
    case 'Screen2':
      return (
        <View style={styles.tabButton}>
          {focused ? (
            <CommunityOn width={35} height={35} />
          ) : (
            <CommunityOff width={35} height={35} />
          )}
        </View>
      );
    case 'Screen3':
      return (
        <View style={styles.tabButton}>
          {focused ? (
            <HomeOn width={35} height={35} />
          ) : (
            <HomeOff width={35} height={35} />
          )}
        </View>
      );
    case 'Screen4':
      return (
        <View style={styles.tabButton}>
          {focused ? (
            <TvOn width={35} height={35} />
          ) : (
            <TvOff width={35} height={35} />
          )}
        </View>
      );
    case 'Screen5':
      return (
        <View style={styles.tabButton}>
          {focused ? (
            <MyOn width={35} height={35} />
          ) : (
            <MyOff width={35} height={35} />
          )}
        </View>
      );
  }
};

const TabArr = [
  {
    route: 'Screen1',
    label: 'Screen1',
    component: Screen1,
  },
  {
    route: 'Screen2',
    label: 'Screen2',
    component: Screen2,
  },
  {
    route: 'Screen3',
    label: 'Screen3',
    component: Screen3,
  },
  {
    route: 'Screen4',
    label: 'Screen4',
    component: Screen4,
  },
  {
    route: 'Screen5',
    label: 'Screen5',
    component: Screen5,
  },
];

const TabButton = (props: BottomTabBarButtonProps) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState!.selected;
  const viewRef = useRef<Animatable.AnimatableProps>(null);
  const lineRef = useRef<Animatable.AnimatableProps>(null);
  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 0.5, rotate: '0deg'},
        0.5: {scale: 1.0, rotate: '-20deg'},
        0.75: {scale: 1.0, rotate: '20deg'},
        1: {scale: 1.0, rotate: '0deg'},
      });
      lineRef.current.animate({
        0: {scale: 0.1, rotate: '0deg'},
        1: {scale: 1.0, rotate: '0deg'},
      });
    } else {
      lineRef.current.animate({
        0: {scale: 1.0, rotate: '0deg'},
        1: {scale: 0, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={lineRef} duration={200} style={styles.line} />
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <TabBarIcon focused={focused} name={item?.route} />
      </Animatable.View>
    </TouchableOpacity>
  );
};

const App = () => {
  const Tab = createBottomTabNavigator<BottomTabParamList>();
  console.log('rendering BottomTabNavigator :::::::::::');

  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <Tab.Navigator
          screenOptions={() => ({
            headerShown: false,
            tabBarShowLabel: false,
            lazy: true,
            tabBarStyle: {
              height: 100,
            },
          })}
          screenListeners={({route}) => ({
            tabPress: () => {
              console.log(route.name);
            },
          })}
          initialRouteName="Screen3">
          {TabArr.map((item, index) => {
            return (
              <Tab.Screen
                key={index}
                name={item.route}
                component={item.component}
                options={{
                  tabBarShowLabel: false,
                  tabBarButton: (props: BottomTabBarButtonProps) => (
                    <TabButton {...props} item={item} />
                  ),
                }}
              />
            );
          })}
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 3,
    backgroundColor: '#FF1A77',
  },
  tabButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
