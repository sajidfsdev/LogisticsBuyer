import React, { useState } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API from '../../Constants/API';
import AppLoading from '../../Reusable/AppLoading';

const Ratings=(props)=>{

    //state management starts here......
    const [appState,setAppState]=useState(1);//1 default 2 buffering 3 error
    const token_RP=useSelector(state=>state.auth.token);
    const id_RP=useSelector(state=>state.auth.id);
    const [errorState,setErrorState]=useState('');
    const [ratingsState,setRatingsState]=useState([]);

    //state management ends here........


    //compute ratings starts here.....
    const computeRating=()=>{
        let Arr=[0,0,0,0,0];
        ratingsState.forEach(elem=>{

            if(elem.rating===1)
            {
                Arr[0]=parseInt(Arr[0]+1);
            }
            else
            if(elem.rating===2)
            {
                Arr[1]=parseInt(Arr[1]+1);
            }
            else
            if(elem.rating===3)
            {
                Arr[2]=parseInt(Arr[2]+1);
            }
            else
            if(elem.rating===4)
            {
                Arr[3]=parseInt(Arr[3]+1);
            }
            else
            {
                Arr[4]=parseInt(Arr[4]+1);
            }
        });


            //taking aaverage.....
            let sum=0;
            Arr.forEach((elem)=>{
                sum=sum+elem;
            });

            const avg=parseFloat(sum/5);
            return avg;
            //////////////////////
    }
    //comppute ratings starts here.....




    //get ratings starts here........
    const getMyRatings=async ()=>{

        //enabling bufferring...
        setAppState(2);

        //body........
        const body=JSON.stringify({riderId:id_RP});

        //config....
        const config={headers:{'Content-Type':'application/json','r-auth-humtoken':token_RP}};

        //try catch starts here......
        try
        {
            const res=await axios.post(API.server+"/rider/request/rating",body,config);

            if(res)
            {
                setAppState(1);
                console.log("RATING DATA HAS COME");
                console.log(res.data.data);
                setRatingsState([...res.data.data]);
                
            }
            else
            {
                setAppState(3);
                setErrorState("NETWORK ERROR");
            }
        }
        catch(err)
        {
            setAppState(3);
            if(err.response)
            {
                setErrorState(err.response.data.errorMessage);
            }
            else
            {
                setErrorState(err.message);
            }
        }
        //try catch ends here.........
    }
    //get ratings ends here..........


    //main GUI man starts here......
    let mainGUI=null;

    if(appState===2)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }
    else
    if(appState===3)
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.errorView}>
                    <Text style={styles.errorText}>
                        {errorState}
                    </Text>
                </View>
            </React.Fragment>
        );
    }
    else
    {
        mainGUI=(
            <React.Fragment>
                <View style={styles.container}>
                    <Text style={styles.subRating}>YOUR CURRENT RATING IS</Text>
                    <Text style={styles.rating}>
                        {
                            computeRating()+"/5"
                        }
                    </Text>
                    
                </View>
            </React.Fragment>
        );
    }
    //main GUI man ends here........

    //return starts here....
    return (
        <React.Fragment>
            <NavigationEvents 
                onDidFocus={getMyRatings}
            />
            {mainGUI}
        </React.Fragment>
    );
    //return ends here......

}//......................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    errorView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    errorText:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:'red'
    },

    subRating:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:'green'
    },

    rating:{
        fontFamily:'roboto-regular',
        fontSize:40,
        color:'green'
    }
});

export default Ratings;