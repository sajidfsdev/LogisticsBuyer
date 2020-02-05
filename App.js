import React,{ useState } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import Grid from './Grid/Grid';
import * as fonts from 'expo-font';

import Test from './Testing/Stack';

import { combineReducers,createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import AuthReducer from './Store/Reducer/Auth';
import RequestReducer from './Store/Reducer/Request';

//redux imports....

import { AppLoading } from 'expo';

//Redux related tasks starts here....
const RootReducer=combineReducers({
    auth:AuthReducer,
    request:RequestReducer
});

const Store=createStore(RootReducer,applyMiddleware(thunk));
//Redux related tasks ends here......



//fetching the custom fonts starts here....
const fetchFonts=()=>{
    return fonts.loadAsync({
        "opensans-regular":require('./fonts/opensans-regular.ttf'),
        "opensans-thin":require('./fonts/opensans-thin.ttf'),
        "roboto-regular":require('./fonts/roboto-regular.ttf'),
        "roboto-thin":require('./fonts/roboto-thin.ttf')
    });
}
//fetching the custom fonts ends here......

const App=(props)=>{

    //state management starts here....
    const [loadingState,setLoadingState]=useState(false);  
    ///state management ends here.....

    if(loadingState===false)
    {
        return <AppLoading startAsync={fetchFonts} onFinish={()=>{setLoadingState(true)}} />;
    }

    




    //return starts here....
    return (
      
        <Provider store={Store}>
            <Grid />
        </Provider>
        // <Provider store={Store}>
        //     <Test />
        // </Provider>
        
         
        
    );
    //return ends here......

}//..................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});


export default App;