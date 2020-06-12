
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

//import ITSScreen from '../screens/sub_module/ITSScreen';
/*import NFRScreen from '../screens/sub_module/NFRScreen';*/

//import CoPTOld_ListScreen from '../screens/copt_old/CoPTOld_ListScreen';
//import CoPTOld_ViewScreen from '../screens/copt_old/CoPTOld_ViewScreen';
/*import CoPTNew_ListScreen from '../screens/copt_new/CoPTNew_ListScreen';
import CoPTNew_ViewScreen from '../screens/copt_new/CoPTNew_ViewScreen';*/

/*import DTS_Personnel_ListScreen from '../screens/dts/DTS_Personnel_ListScreen';
import DTS_Personnel_AddScreen from '../screens/dts/DTS_Personnel_AddScreen';
import DTS_Personnel_ViewScreen from '../screens/dts/DTS_Personnel_ViewScreen';
import DTS_Personnel_EditScreen from '../screens/dts/DTS_Personnel_EditScreen';*/

import NFRL_Customer_ListScreen from '../screens/nfrl/NFRL_Customer_ListScreen';
import NFRL_Customer_ViewScreen from '../screens/nfrl/NFRL_Customer_ViewScreen';
import NFRL_Customer_EditScreen from '../screens/nfrl/NFRL_Customer_EditScreen';
import NFRL_Customer_AddScreen from '../screens/nfrl/NFRL_Customer_AddScreen';

import NFRL_Customer_AdminListScreen from '../screens/nfrl/NFRL_Customer_AdminListScreen';
import NFRL_Customer_AdminViewScreen from '../screens/nfrl/NFRL_Customer_AdminViewScreen';
import NFRL_Customer_AdminEditScreen from '../screens/nfrl/NFRL_Customer_AdminEditScreen';
import NFRL_Customer_AdminAddScreen from '../screens/nfrl/NFRL_Customer_AdminAddScreen';

import NFRL_Notebook_ListScreen from '../screens/nfrl/NFRL_Notebook_ListScreen';
import NFRL_Notebook_ViewScreen from '../screens/nfrl/NFRL_Notebook_ViewScreen';
import NFRL_Notebook_AddScreen from '../screens/nfrl/NFRL_Notebook_AddScreen';
import NFRL_Notebook_AdminListScreen from '../screens/nfrl/NFRL_Notebook_AdminListScreen';
import NFRL_Notebook_AdminAddScreen from '../screens/nfrl/NFRL_Notebook_AdminAddScreen';
import NFRL_Notebook_AdminViewScreen from '../screens/nfrl/NFRL_Notebook_AdminViewScreen';

import NFRL_Reserve_ListScreen from '../screens/nfrl/NFRL_Reserve_ListScreen';
import NFRL_Reserve_StatusScreen from '../screens/nfrl/NFRL_Reserve_StatusScreen';
import NFRL_Reserve_AddScreen from '../screens/nfrl/NFRL_Reserve_AddScreen';
import NFRL_Reserve_ViewScreen from '../screens/nfrl/NFRL_Reserve_ViewScreen';
import NFRL_Reserve_EditScreen from '../screens/nfrl/NFRL_Reserve_EditScreen';


import NFRL_Reserve_AdminListScreen from '../screens/nfrl/NFRL_Reserve_AdminListScreen';
import NFRL_Reserve_AdminAddScreen from '../screens/nfrl/NFRL_Reserve_AdminAddScreen';
import NFRL_Reserve_AdminEditScreen from '../screens/nfrl/NFRL_Reserve_AdminEditScreen';
import NFRL_Reserve_AdminViewScreen from '../screens/nfrl/NFRL_Reserve_AdminViewScreen';
import NFRL_ListScreen from '../screens/nfrl/NFRL_ListScreen';
import NFRL_SignInScreen from '../screens/nfrl/NFRL_SignInScreen';
//import NFRL_SignOutScreen from '../screens/nfrl/NFRL_SignOutScreen';

import EXS_Customer_AddScreen from '../screens/exs/EXS_Customer_AddScreen';
import EXS_Customer_EditScreen from '../screens/exs/EXS_Customer_EditScreen';
import EXS_Customer_ListScreen from '../screens/exs/EXS_Customer_ListScreen';
import EXS_Customer_ViewScreen from '../screens/exs/EXS_Customer_ViewScreen';
import EXS_ListScreen from '../screens/exs/EXS_ListScreen';
import EXS_Reserve_AddScreen from '../screens/exs/EXS_Reserve_AddScreen';
import EXS_Reserve_EditScreen from '../screens/exs/EXS_Reserve_EditScreen';
import EXS_Reserve_ListScreen from '../screens/exs/EXS_Reserve_ListScreen';
import EXS_Reserve_ViewScreen from '../screens/exs/EXS_Reserve_ViewScreen';
import EXS_SignInScreen from '../screens/exs/EXS_SignInScreen';
//import EXS_SignOutScreen from '../screens/exs/EXS_SignOutScreen';

import NFRLHome_Screen from '../screens/nfrl/NFRLHome_Screen';
import NFRLHome_AdminScreen from '../screens/nfrl/NFRLHome_AdminScreen';
import EXSHome_Screen from '../screens/exs/EXSHome_Screen';



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
  //NFRL_SignIn: NFRL_SignInScreen,
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





const NFRLStack = createStackNavigator({
  NFRL_SignIn: NFRL_SignInScreen,


  NFRLHome: NFRLHome_Screen,
  NFRL_List: NFRL_ListScreen,
  NFRL_Reserve_List: NFRL_Reserve_ListScreen,
  NFRL_Reserve_Status: NFRL_Reserve_StatusScreen,
  NFRL_Reserve_View: NFRL_Reserve_ViewScreen,
  NFRL_Reserve_Add: NFRL_Reserve_AddScreen,
  NFRL_Reserve_Edit: NFRL_Reserve_EditScreen,

  NFRL_Customer_Add: NFRL_Customer_AddScreen,
  NFRL_Customer_List: NFRL_Customer_ListScreen,
  NFRL_Customer_View: NFRL_Customer_ViewScreen,
  NFRL_Customer_Edit: NFRL_Customer_EditScreen,
  

  /*NFRL_SignIn: NFRL_SignInScreen,*/
  NFRLHome_Admin: NFRLHome_AdminScreen,
  NFRL_Reserve_AdminList: NFRL_Reserve_AdminListScreen,
  NFRL_Reserve_AdminAdd: NFRL_Reserve_AdminAddScreen,
  NFRL_Reserve_AdminEdit: NFRL_Reserve_AdminEditScreen,
  NFRL_Reserve_AdminView: NFRL_Reserve_AdminViewScreen,

  NFRL_Customer_AdminAdd: NFRL_Customer_AdminAddScreen,
  NFRL_Customer_AdminList: NFRL_Customer_AdminListScreen,
  NFRL_Customer_AdminView: NFRL_Customer_AdminViewScreen,
  NFRL_Customer_AdminEdit: NFRL_Customer_AdminEditScreen,

  NFRL_Notebook_List: NFRL_Notebook_ListScreen,
  NFRL_Notebook_Add: NFRL_Notebook_AddScreen,
  NFRL_Notebook_View: NFRL_Notebook_ViewScreen,
  NFRL_Notebook_AdminAdd: NFRL_Notebook_AdminAddScreen,
  NFRL_Notebook_AdminList: NFRL_Notebook_AdminListScreen,
  NFRL_Notebook_AdminView: NFRL_Notebook_AdminViewScreen,
 // NFRL_SignOut: NFRL_SignOutScreen,

  
});
NFRLStack.navigationOptions = {
  tabBarLabel: 'HOME',  
};

const EXSStack = createStackNavigator({
  
  EXSHome: EXSHome_Screen,
  EXS_SignIn: EXS_SignInScreen,
  EXS_List: EXS_ListScreen,
  EXS_Reserve_List: EXS_Reserve_ListScreen,
  EXS_Reserve_View: EXS_Reserve_ViewScreen,
  EXS_Reserve_Add: EXS_Reserve_AddScreen,
  EXS_Reserve_View: EXS_Reserve_ViewScreen,
  EXS_Customer_Add: EXS_Customer_AddScreen,
  EXS_Customer_List: EXS_Customer_ListScreen,
  EXS_Customer_View: EXS_Customer_ViewScreen,
  EXS_Customer_Edit: EXS_Customer_EditScreen,
  //EXS_SignIn: EXS_SignInScreen,
  //EXS_SignOut: EXS_SignOutScreen,
  
});
EXSStack.navigationOptions = {
  tabBarLabel: 'EXS',  
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
      NFRLStack,
    //HomeStack,
    //EXSStack,
    //DTSStack,
    //ITSStack,
    //NFRStack,
    //ITSStack,
    //CoPTOldStack,
    //CoPTNewStack,
    //DTSStack, 
});




