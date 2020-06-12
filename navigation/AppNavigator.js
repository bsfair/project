import React from 'react';
import {   
  createAppContainer, 
  createSwitchNavigator } 
from 'react-navigation';

import { createDrawerNavigator } from 'react-navigation-drawer';

//import PSUTabNavigator from './PSUTabNavigator';
import FairTabNavigator from './FairTabNavigator';
import FTabNavigator from './FTabNavigator';




/*export default createAppContainer(createSwitchNavigator({
  MainTabNavigator,
}));
*/

export default createAppContainer(createDrawerNavigator({    
  
  //Main: MainTabNavigator,
  //'ม.อ.' : PSUTabNavigator, // PSU
  //ประชาสัมพันธ์ : SchedulesTabNavigator, // PR  
  //สถานที่ : LocationsTabNavigator,  // Locations       

  'จองคอมพิวเตอร์โน๊ตบุ๊ค' : FairTabNavigator, // NFRL
  'จองตรวจข้อสอบ' : FTabNavigator, // NFRL

  //'ม.อ.' : PSUTabNavigator, // PSU
}));



