import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome5';

//constants import ....
import Color from '../Constants/Colors';

//Home stack starts here......
import TestScreen from '../Testing/Testing';


const TestStack=createStackNavigator({


    test:{
        screen:TestScreen,
        navigationOptions:{
            headerTitle:"Testing",
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





export default createAppContainer(TestStack);