import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome5';

//constants import ....
import Color from '../Constants/Colors';

//Home stack starts here......
import HomeScreen from '../Screens/HomeStack/Home';

//History stack under construction.....
import HistoryScreen from '../Screens/HistoryStack/main';
import HistoryDetailsScreen from '../Screens/HistoryStack/Details';


//Ratings stack starts here....
import RatingScreen from '../Screens/RatingStack/Rating';


const HomeStack=createStackNavigator({


    home:{
        screen:HomeScreen,
        navigationOptions:{
            headerTitle:"Rides",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:Color.welcomeBack
            },
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            }
        }
    },

});


const RatingStack=createStackNavigator({


    rate:{
        screen:RatingScreen,
        navigationOptions:{
            headerTitle:"Rating",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:Color.welcomeBack
            },
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            }
        }
    },

});


const HistoryStack=createStackNavigator({


    history:{
        screen:HistoryScreen,
        navigationOptions:{
            headerTitle:"HISTORY",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:Color.welcomeBack
            },
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            }
        }
    },
    hisDetails:{
        screen:HistoryDetailsScreen,
        navigationOptions:{
            headerTitle:"DETAILS",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:Color.welcomeBack
            },
            headerTitleStyle:{
                fontFamily:'roboto-regular',
                fontWeight:'200'
            }
        }
    }

});



//////////////////////////////////////////////////////////
///////////Drawer navigator starts here
//////////////////////////////////////////////////////////


const drawerNav=createDrawerNavigator({
    HOME:{
        screen:HomeStack,
        navigationOptions:{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
              },
              labelStyle:{
                  textAlign:'center',
                  fontFamily:'roboto-regular',
                  fontWeight:'300',
                  fontSize:30
              },
              
              drawerIcon:(config)=>{
                return (
                    <Icons
                        name="home"
                        size={25}
                        color={config.tintColor}
                    />
                );
              }
        }
    },


    HISTORY:{
        screen:HistoryStack,
        navigationOptions:{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
              },
              labelStyle:{
                  textAlign:'center',
                  fontFamily:'roboto-regular',
                  fontWeight:'300',
                  fontSize:30
              },
              
              drawerIcon:(config)=>{
                return (
                    <Icons
                        name="history"
                        size={25}
                        color={config.tintColor}
                    />
                );
              }
        }
    },


    RATING:{
        screen:RatingStack,
        navigationOptions:{
            headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
              },
              labelStyle:{
                  textAlign:'center',
                  fontFamily:'roboto-regular',
                  fontWeight:'300',
                  fontSize:30
              },
              
              drawerIcon:(config)=>{
                return (
                    <Icons
                        name="star-half-alt"
                        size={25}
                        color={config.tintColor}
                    />
                );
              }
        }
    },


    
},
////////////////////
{
    contentOptions: {
        // add your styling here 
        // activeTintColor: '#e91e63',
        activeTintColor:Color.success,
        itemsContainerStyle: {
          marginVertical: 2,
        },
        iconContainerStyle: {
          opacity: 1,
        },
      },
      drawerBackgroundColor:'#0086b3',
    //   drawerBackgroundColor: '#262A2C', // sets background color of drawer
}
/////////////////////
);


export default createAppContainer(drawerNav);