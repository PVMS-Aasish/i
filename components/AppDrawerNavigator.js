import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import {SettingScreen} from '../screens/SettingScreen';
import MyDonationsScreen from '../screens/MyDonationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
    MyDonataions :{
      screen : MyDonationsScreen
    },
    Setting : {
      screen : SettingScreen
    },
    },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })

