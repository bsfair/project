
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import ITSScreen from '../screens/sub_module/ITSScreen';
import NFRScreen from '../screens/sub_module/NFRScreen';

import CoPTOld_ListScreen from '../screens/copt_old/CoPTOld_ListScreen';
import CoPTOld_ViewScreen from '../screens/copt_old/CoPTOld_ViewScreen';

import CoPTNew_ListScreen from '../screens/copt_new/CoPTNew_ListScreen';
import CoPTNew_ViewScreen from '../screens/copt_new/CoPTNew_ViewScreen';

import DTS_Personnel_ListScreen from '../screens/dts/DTS_Personnel_ListScreen';
import DTS_Personnel_AddScreen from '../screens/dts/DTS_Personnel_AddScreen';
import DTS_Personnel_ViewScreen from '../screens/dts/DTS_Personnel_ViewScreen';
import DTS_Personnel_EditScreen from '../screens/dts/DTS_Personnel_EditScreen';


const ITSStack = createStackNavigator({
  ITS: ITSScreen,
});
ITSStack.navigationOptions = {
  tabBarLabel: 'ITS',    
};


const NFRStack = createStackNavigator({
  NFR: NFRScreen,
});
NFRStack.navigationOptions = {
  tabBarLabel: 'NFR',  
};


const CoPTOldStack = createStackNavigator({
  CoPTOld_List: CoPTOld_ListScreen,
  CoPTOld_View: CoPTOld_ViewScreen,
});
CoPTOldStack.navigationOptions = {
  tabBarLabel: 'CoPT-Old',  
};

const CoPTNewStack = createStackNavigator({
  CoPTNew_List: CoPTNew_ListScreen,
  CoPTNew_View: CoPTNew_ViewScreen,
});
CoPTNewStack.navigationOptions = {
  tabBarLabel: 'CoPT-New',
};

const DTSStack = createStackNavigator({
  DTS_Personnel_List: DTS_Personnel_ListScreen,
  DTS_Personnel_Add: DTS_Personnel_AddScreen,
  DTS_Personnel_View: DTS_Personnel_ViewScreen,
  DTS_Personnel_Edit: DTS_Personnel_EditScreen,
});
DTSStack.navigationOptions = {
  tabBarLabel: 'DTS',    
};


export default createBottomTabNavigator({
    //DTSStack,
    //ITSStack,
/*    NFRStack,
    ITSStack,
    CoPTOldStack,
    CoPTNewStack, 
    DTSStack,   */
});

