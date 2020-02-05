import React,{ useState,useEffect } from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { Slider } from 'react-native-elements';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { NavigationEvents } from 'react-navigation';

//View imports starts here....
import RideComeView from '../../Components/HOME/RideComeView';
import TripOneView from '../../Components/HOME/TripOneView';
import TripTwoView from '../../Components/HOME/TripTwoView';
import ReceiveCashView from '../../Components/HOME/ReceiveCashView';
import TripThreeView from '../../Components/HOME/TripThreeView';
import ShowBillView from '../../Components/HOME/ShowBill';
import FinishView from '../../Components/HOME/FinishView';

//changing link checking imports....
import Color from '../../Constants/Colors';
import AppLoading from '../../Reusable/AppLoading';
import API from '../../Constants/API';
import * as Types from '../../Store/Types/types';
import * as Actions from '../../Store/Actions/Request';

const Home=props=>{

    const [availState,setAvailState]=useState(useSelector(state=>state.request.available));
    const token_RP=useSelector(state=>state.auth.token);
    const id_RP=useSelector(state=>state.auth.id);
    const [appState,setAppState]=useState(1);//1 default
                                             //2 loading

    //redux state starts here......
    const dispatch=useDispatch();
    const available_RP=useSelector(state=>state.request.available);
    const genBufferring_RP=useSelector(state=>state.request.bufferring);
    const completeRequest_RP=useSelector(state=>state.request.completeRequest);
    //redux state ends here........


    //use effect starts here.........
    useEffect(()=>{

    },[]);
    //use effect ends here..........


    //check request status starts here......
    const checkRequestStatus=async ()=>{
        
         dispatch({type:Types.SET_GEN_BUFFERRING});

      
        const config={
            headers:{
                'Content-Type':'application/json',
                'r-auth-humtoken':token_RP
            }
        };


       
        const body=JSON.stringify({
            riderId:id_RP
        });

        
        try
        {
            const res=await axios.post(API.server+"/rider/request/checkRequestStatus",body,config);

            if(res)
            {
                //setting complete request starts here.......
                dispatch({
                    type:Types.SET_GEN_COMPLETE_REQUEST,
                    payload:{
                        completeRequest:JSON.parse(JSON.stringify(res.data.request))
                    }
                });
                //setting complete Request ends here.........


                dispatch({type:Types.END_GEN_BUFFERRING});
                console.log("$%^%$^%$^%$^$^%$^%$^%$^$^%");
                console.log("please check refreshing response");
                console.log(res.data);
                console.log(res.data.status);
                console.log(res.data.buyerId);
                console.log(res.data.requestId);
                console.log("BUYER LAT LONG");
                console.log(res.data.buyerLat);
                console.log(res.data.buyerLong);
                console.log("HEY SAJID CHECK WHOLE REQUEST");
                console.log("==========================");
                console.log(res.data.request);
                if(res.data.status==="TRIPONE")
                {
                    //Also dispatching action to Update My Request....
                    //Alos dispatching action to Updae My Request.....
                    dispatch({
                        type:Types.REFRESH_REQUEST_STATUS,
                        payload:{
                            available:20,
                            requestId:res.data.requestId,
                            buyerId:res.data.buyerId,
                            request:JSON.parse(JSON.stringify(res.data.request)),
                            buyer:{
                                lat:res.data.buyerLat,
                                long:res.data.buyerLong
                            }
                        }
                    });
                }

                //ispatching updating request status starts here......
                if(res.data.status==="RECEIVECASH")
                {
                   
                    dispatch(Actions.handleUpdateCompleteRequestStatus(res.data.status));
                }
                //Dispatching Updating complete request status ends....
            }
            else
            {
                dispatch({type:Types.END_GEN_BUFFERRING});
            }
        }
        catch(err)
        {
            dispatch({type:Types.END_GEN_BUFFERRING});
            if(err.response)
            {
                Alert.alert("NETWORK RESPONSE ERROR",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("NETWORK ISSUE",err.message);
            }
        }
       
    }
    //check request status ends here........


    //Get Locations starts here......
    const getMyLocation=async ()=>{

        const perm=await Permissions.askAsync(Permissions.LOCATION);

        if(perm.status==='granted')
        {
            const loc=await Location.getCurrentPositionAsync({enableHighAccuracy:true});

            return {
                latitude:loc.coords.latitude,
                longitude:loc.coords.longitude
            }
        }
        else
        {
            return null;
        }
    }
    //Get Locations ends here........


    //Handle Request For ON starts here....
    const handleIssueON=async ()=>{

        setAppState(2);

        //checking current location......
        const loc=await getMyLocation();
        if(loc==null)
        {
            return Alert.alert("Permission Denied","You Have To Enable Geolocation");
        }
        //check current location ends ....

        //const config.....
        const config={
            headers:{
                'Content-Type':'application/json',
                'r-auth-humtoken':token_RP
            }
        };


        //const body.....
        const body=JSON.stringify({
            id:id_RP,
            loc:loc
        });

        //try catch starts here.....
        try
        {
            const res=await axios.post(API.server+"/rider/request/on",body,config);

            if(res)
            {
                setAppState(1);
                dispatch({type:Types.SET_AVAILABLE_TRUE});
                dispatch({type:Types.SET_MY_LOCATION,payload:{
                    latitude:loc.latitude,
                    longitude:loc.longitude
                }});
                //Alert.alert("RES HAS CAME");
            }
            else
            {
                setAppState(1);
                Alert.alert("Network Error");
            }
        }
        catch(err)
        {
            setAppState(1);
            setAvailState(5);
            if(err.response)
            {
                Alert.alert("Failed",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("Failed",err.message);
            }
        }
        //try catch ends here.......
    }
    //Handle Request for OFF ends here......



    //Handle Issue OFF Starts here.......
    const handleIssueOff=async ()=>{

        setAppState(2);

        //try catch starts here....
        try
        {
             //const config.....
        const config={
            headers:{
                'Content-Type':'application/json',
                'r-auth-humtoken':token_RP
            }
        };


        //const body.....
        const body=JSON.stringify({
            id:id_RP
        });

        const res=await axios.post(API.server+"/rider/request/off",body,config);

        if(res)
        {
            setAppState(1);
            dispatch({type:Types.SET_AVAILABLE_FALSE})
            //Alert.alert("RES HAS CAME");
        }
        else
        {
            setAppState(1);
            Alert.alert("Network Error");
        }



        }
        catch(err)
        {
            setAppState(1);
            setAvailState(5);
            if(err.response)
            {
                Alert.alert("Failed",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("Failed",err.message);
            }
        }
        //try catch ends here......
    }
    //Handle Issue OFF ends here.........


    //set oof on starts here.....
    const setOFF=()=>{
        setAvailState(1);
        handleIssueOff();
    }

    const setON=()=>{
        setAvailState(10);
        handleIssueON();
    }
    //set off on ends here.......

    //Monitor status starts here......
    const monitorStatus=()=>{
        
        if(availState===1)
        {
            handleIssueOff();
        }
        else
        if(availState===10)
        {
            handleIssueON();
        }
    }
    //Monitor status ends here........


    //handling thumb bg color starts here.....
    const giveThumbBgColor=()=>{
        if(availState===1)
        {
            return "red";
        }
        else
        if(availState===10)
        {
            return "green";
        }
        else
        {
            return Color.welcomeBack;
        }
    }
    //handling thumb bg color ends here.......



    //mainGUI starts here............
    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(
            <React.Fragment>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',paddingLeft:30,paddingRight:30 }}>



{/* Top Title starts here...... */}
<View style={styles.titleView}>
    <Text style={styles.titleText}>Availability</Text>
</View>
{/* Top Title ends here........ */}




<Slider
    value={availState}
    onSlidingComplete={monitorStatus}
    onValueChange={value =>setAvailState(value)}
    minimumValue={1}
    maximumValue={10}
    style={{width:'100%'}}
    thumbTouchSize={{width:160,height:160}}
    thumbStyle={{height:80,width:60,backgroundColor:giveThumbBgColor()}}
    trackStyle={{height:30}}
/>


{/* On Off View Starts Here.... */}
<View style={styles.onOffView}>
    <TouchableOpacity style={styles.onoffto} onPress={setOFF}>
        <View style={{...styles.offView,backgroundColor:availState===1?'red':'gray'}}>
            <Text style={styles.onOffText}>OFF</Text>
        </View>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.onoffto} onPress={setON}>
        <View style={{...styles.onView,backgroundColor:availState===10?'green':'gray'}}>
            <Text style={styles.onOffText}>ON </Text>
        </View>
    </TouchableOpacity>
    
</View>
{/* On Of  View Ends Here...... */}


</View>
            </React.Fragment>
        );
    }
    else
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }
    //mainGUI ends here..............




    //detecting the Rider Request Has Come state starts here....
    if(available_RP===15)
    {
        mainGUI=(
            <React.Fragment>
                <RideComeView />
            </React.Fragment>
        );
    }
    else
    if(available_RP===20)
    {
        mainGUI=(
            <React.Fragment>
                <TripOneView />
            </React.Fragment>
        );
    }
    else
    if(available_RP===2020)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }
    

    //STATUS BASED GENERATIONS STARTS HERE.........
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    if(completeRequest_RP.status==="RECEIVECASH")
    {
        mainGUI=(
            <React.Fragment>
                <ReceiveCashView />
            </React.Fragment>
        );
    }
    else
    if(completeRequest_RP.status==="TRIPTWO")
    {
        mainGUI=(
            <React.Fragment>
                <TripTwoView />
            </React.Fragment>
        );
    }
    else
    if(completeRequest_RP.status==="TRIPTHREE")
    {
        mainGUI=(
            <React.Fragment>
                <TripThreeView />
            </React.Fragment>
        );
    }
    else
    if(completeRequest_RP.status==="SHOWBILL")
    {
        mainGUI=(
            <React.Fragment>
                <ShowBillView />
            </React.Fragment>
        );
    }
    else
    if(completeRequest_RP.status==="FINISH")
    {
        mainGUI=(
            <React.Fragment>
                <FinishView />
            </React.Fragment>
        );
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    //STATUS BASED GENERATION ENDS HERE...........


    if(genBufferring_RP===true)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }
    
    //detecting the commited state ends here.......

    //return statement starts here.....
    return (
        <React.Fragment>

            <NavigationEvents 
                onDidFocus={()=>{
                    checkRequestStatus();
                }}
            />

            {mainGUI}
        </React.Fragment>
    );
    //return statement ends here.......

}//.................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },


    titleView:{
        width:'100%',
        padding:5,
        marginBottom:70,
        flexDirection:'row',
        justifyContent:'center'
    },

    titleText:{
        fontFamily:'roboto-regular',
        fontSize:25,
        color:Color.success
    },

    onOffView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:30
    },


    onOffText:{
        fontFamily:'roboto-regular',
        fontSize:18,
        color:'white'
    },

    onoffto:{
        padding:5
    },

    onView:{
        padding:5
        
    },

    offView:{
        padding:7
    }
});

export default Home;