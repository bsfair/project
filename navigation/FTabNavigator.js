
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
/*
import CoPTNew_ListScreen from '../screens/copt_new/CoPTNew_ListScreen';
import CoPTNew_ViewScreen from '../screens/copt_new/CoPTNew_ViewScreen';
*/

import EXS_Examination_AddScreen from '../screens/exs/EXS_Examination_AddScreen';
import EXS_Examination_ListScreen from '../screens/exs/EXS_Examination_ListScreen';
import EXS_Examination_ViewScreen from '../screens/exs/EXS_Examination_ViewScreen';
import EXS_Examination_EditScreen from '../screens/exs/EXS_Examination_EditScreen';

import EXS_Customer_AddScreen from '../screens/exs/EXS_Customer_AddScreen';
import EXS_Customer_EditScreen from '../screens/exs/EXS_Customer_EditScreen';
import EXS_Customer_ListScreen from '../screens/exs/EXS_Customer_ListScreen';
import EXS_Customer_ViewScreen from '../screens/exs/EXS_Customer_ViewScreen';
import EXS_ListScreen from '../screens/exs/EXS_ListScreen';
import EXS_Reserve_AddScreen from '../screens/exs/EXS_Reserve_AddScreen';
import EXS_Reserve_EditScreen from '../screens/exs/EXS_Reserve_EditScreen';
import EXS_Reserve_ListScreen from '../screens/exs/EXS_Reserve_ListScreen';
import EXS_Reserve_ViewScreen from '../screens/exs/EXS_Reserve_ViewScreen';
import EXS_Reserve_StatusScreen from '../screens/exs/EXS_Reserve_StatusScreen';

import EXS_Customer_AdminAddScreen from '../screens/exs/EXS_Customer_AdminAddScreen';
import EXS_Customer_AdminEditScreen from '../screens/exs/EXS_Customer_AdminEditScreen';
import EXS_Customer_AdminListScreen from '../screens/exs/EXS_Customer_AdminListScreen';
import EXS_Customer_AdminViewScreen from '../screens/exs/EXS_Customer_AdminViewScreen';
import EXS_Reserve_AdminAddScreen from '../screens/exs/EXS_Reserve_AdminAddScreen';
import EXS_Reserve_AdminEditScreen from '../screens/exs/EXS_Reserve_AdminEditScreen';
import EXS_Reserve_AdminListScreen from '../screens/exs/EXS_Reserve_AdminListScreen';
import EXS_Reserve_AdminViewScreen from '../screens/exs/EXS_Reserve_AdminViewScreen';
import EXS_SignInScreen from '../screens/exs/EXS_SignInScreen';
//import EXS_SignOutScreen from '../screens/exs/EXS_SignOutScreen';

import EXSHome_Screen from '../screens/exs/EXSHome_Screen';
import EXSHome_AdminScreen from '../screens/exs/EXSHome_AdminScreen';

/*
const DTSStack = createStackNavigator({
    DTS_Personnel_List: DTS_Personnel_ListScreen,
    DTS_Personnel_Add: DTS_Personnel_AddScreen,
    DTS_Personnel_View: DTS_Personnel_ViewScreen,
    DTS_Personnel_Edit: DTS_Personnel_EditScreen,
  });
  DTSStack.navigationOptions = {
    tabBarLabel: 'DTS',    
};

const ITSStack = createStackNavigator({
    ITS: ITSScreen,
  });
  ITSStack.navigationOptions = {
    tabBarLabel: 'ITS',    
};*/




/*const NFRStack = createStackNavigator({
  NFR: NFRScreen,
});
NFRStack.navigationOptions = {
  tabBarLabel: 'NFR',  
};
*/
/*const HomeStack = createStackNavigator({
  //User: UserScreen,
  NFRL_SignIn: NFRL_SignInScreen,
  Home: Home_Screen,
  

});
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',  
};*/


/*const NFRStack = createStackNavigator({
  NFR: NFRScreen,
});
NFRStack.navigationOptions = {
  tabBarLabel: 'NFR',  
};*/




const EXSStack = createStackNavigator({

  EXSHome: EXSHome_Screen,
  EXS_List: EXS_ListScreen,
  EXS_Reserve_List: EXS_Reserve_ListScreen,
  EXS_Reserve_View: EXS_Reserve_ViewScreen,
  EXS_Reserve_Add: EXS_Reserve_AddScreen,
  EXS_Reserve_Edit: EXS_Reserve_EditScreen,
  EXS_Reserve_View: EXS_Reserve_ViewScreen,
  EXS_Reserve_Status: EXS_Reserve_StatusScreen,
  EXS_Customer_Add: EXS_Customer_AddScreen,
  EXS_Customer_List: EXS_Customer_ListScreen,
  EXS_Customer_View: EXS_Customer_ViewScreen,
  EXS_Customer_Edit: EXS_Customer_EditScreen,

  EXSHome_Admin: EXSHome_AdminScreen,
  EXS_SignIn: EXS_SignInScreen,
  EXS_Examination_Add: EXS_Examination_AddScreen,
  EXS_Examination_List: EXS_Examination_ListScreen,
  EXS_Examination_View: EXS_Examination_ViewScreen,
  EXS_Examination_Edit: EXS_Examination_EditScreen,
  EXS_Reserve_AdminList: EXS_Reserve_AdminListScreen,
  EXS_Reserve_AdminView: EXS_Reserve_AdminViewScreen,
  EXS_Reserve_AdminAdd: EXS_Reserve_AdminAddScreen,
  EXS_Reserve_AdminView: EXS_Reserve_AdminViewScreen,
  EXS_Customer_AdminAdd: EXS_Customer_AdminAddScreen,
  EXS_Customer_AdminList: EXS_Customer_AdminListScreen,
  EXS_Customer_AdminView: EXS_Customer_AdminViewScreen,
  EXS_Customer_AdminEdit: EXS_Customer_AdminEditScreen,





  //EXS_SignIn: EXS_SignInScreen,
  //EXS_SignOut: EXS_SignOutScreen,
  
  
});
EXSStack.navigationOptions = {
  tabBarLabel: 'HOME',  
};

/*const CoPTOldStack = createStackNavigator({
  CoPTOld_List: CoPTOld_ListScreen,
  CoPTOld_View: CoPTOld_ViewScreen,
});
CoPTOldStack.navigationOptions = {
  tabBarLabel: 'CoPT-Old',  
};*/

/*const CoPTNewStack = createStackNavigator({
  CoPTNew_List: CoPTNew_ListScreen,
  CoPTNew_View: CoPTNew_ViewScreen,
});
CoPTNewStack.navigationOptions = {
  tabBarLabel: 'CoPT-New',
};*/


export default createBottomTabNavigator({
    //HomeStack,
    //NFRLStack,
    EXSStack,
    //DTSStack,
    //ITSStack,
    //NFRStack,
    //ITSStack,
    //CoPTOldStack,
    //CoPTNewStack,
    //DTSStack, 
});




