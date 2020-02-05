import React,{ useEffect } from 'react';
import { YellowBox,Alert } from 'react-native';
import DrawerNav from '../Navigations/Drawer';
import OpenSocket from 'socket.io-client';
import API from '../Constants/API';
import Soc from '../Constants/Socket';
import axios from 'axios';

import { useSelector,useDispatch } from 'react-redux';
import * as Types from '../Store/Types/types';
import * as Actions from '../Store/Actions/Request';

const secondGrid=props=>{

    const dispatch=useDispatch();
    //redux state starts here......
    const id_RP=useSelector(state=>state.auth.id);
    const token_RP=useSelector(state=>state.auth.token);
    const completeRequest_RP=useSelector(state=>state.request.completeRequest);
    const available_RP=useSelector(state=>state.request.available);

    //redux state ends here........


    //use effect starts here.......
    useEffect(()=>{
        //Nav Monitoring starts here..........
        navigator.geolocation.watchPosition(
            position => {
            console.log("////////////////////////////////////");
            console.log("///////////POSITION DETECTED////////");
             console.log(position.coords.latitude);
             console.log(position.coords.longitude);

             //send location to buyer starts here......
             //Alert.alert("POSITION CHAGNHE");
        // sendLocationToBuyer(position.coords.latitude,position.coords.longitude);
        dispatch(Actions.sendMyLocBookToBuyer(position.coords.latitude,position.coords.longitude));
             
             //send location to buyer ends here........
    
             //secind location to server starts here.......
        sendPosToServer(position.coords.latitude,position.coords.longitude);
             //sending location to server ends here........
             dispatch({
                 type:Types.SET_MY_LOCATION,
                 payload:{
                     latitude:position.coords.latitude,
                     longitude:position.coords.longitude
                 }
             });
            console.log("/////////////////////////////////////");
            console.log("/////////////////////////////////////");
            }, 
            error => console.log(error),
            { 
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
              distanceFilter: 0.2
            }
           );
        //Nav Monitoring ends here............
    },[]);
    //use effect ends here.........



    //Handle Send Location To Buyer Starts Here........
    const sendLocationToBuyer=async (lat,long)=>{

        if(completeRequest_RP.status !== "TRIPONE")
        {
            return;
        }

        //Alert.alert("TRIP ONE DETECTED");

        const buyerId=completeRequest_RP.buyerId;
        const config={
            headers:{
                'Content-Type':'application/json',
                'r-auth-humtoken':token_RP
            }
        };

        const body=JSON.stringify({
            buyerId:buyerId,
            lat:parseFloat(lat),
            long:parseFloat(long)
        });


        //try catch starts here........
        try
        {
            const res=axios.post(API.server+"/rider/request/sendMyLocToBuyer",body,config);

            if(res)
            {
                //Alert.alert("LOC SEND TO BUYER SUCCESSFULLY");
            }
            else
            {
                //Alert.alert("Failed sendLOC","NETWORK ERROR");
            }
        }
        catch(err)
        {
            if(err.response)
            {
                //Alert.alert("Failed sendLOC",err.response.data.errorMessage);
            }
            else
            {
                //Alert.alert("Failed Send LOC",err.message);
            }
        }
        //try catch ens here...........
    }
    //Handle Send Location To Buyer Ends Here.........




    //sending updated location to server starts here......
    const sendPosToServer=async (latitude,longitude)=>{

        //Please remove this code if crash starts here....
        // if(available_RP !== 10)
        // {
        //     Alert.alert("AVAILABLE NOT 10");
        //     return;
        // }
        //Please remove this code is crash ends here......

        //const config......
        const config={
            headers:{
                'Content-Type':'application/json',
                'r-auth-humtoken':token_RP
            }
        };


        //body starts here....
        const body=JSON.stringify({
            id:id_RP,
            latitude:latitude,
            longitude:longitude
        });

        //try catch starts here......
        try
        {
            const res=await axios.post(API.server+"/rider/request/updateLoc",body,config);

            if(res)
            {

            }
            else
            {
                //Alert.alert("Failed","NETWORK ERROR");
            }
        }
        catch(err)
        {
            if(err.response)
            {
                //Alert.alert("Failed",err.response.data.errorMessage);
            }
            else
            {
                //Alert.alert("Failed",err.message);
            }
        }
        //try catch ends here........
    }
    //sending updated location ends here..................


    //Navigating the position starts here........
    
    //Navigating the position ends here..........

    


    YellowBox.ignoreWarnings([
        'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
      ]);


      //socket starts here......
      
        //implementing socket requests starts here........
        const io=OpenSocket(API.server,{
            query:{
                userId:id_RP,
                type:"RIDER"
            }
        });

        //socket registered opertions starts here.....
        io.on("RIDECOME",(data)=>{
            console.log("RIDER REQUEST HAS COME))))))))))))))))))))))))))");
            console.log(data);
            console.log("))))))))))))))))))))))))))))))))))))))))))))))))");
           dispatch(Actions.handleRideCome(
               JSON.parse(JSON.stringify(data.vendor)),
               JSON.parse(JSON.stringify(data.buyer)),
               parseFloat(data.distance),
               data.id,
               data.outletName
           ));
        });

        io.on("RECEIVEBUYERLOC",(data)=>{

            console.log("BUYER LOC RECEIVED");
            console.log("++++++++++++++++++++");
            console.log(data.lat);
            console.log(data.long);
            console.log("--------------------");
            //Alert.alert("BUYER LOC RECEIVED");

            dispatch(Actions.handleSetBuyerLatLongAction(data.lat,data.long));
        });


        io.on("SECURITYCODECOME",(data)=>{
            dispatch({
                type:Types.SET_SECURITY_CODE,
                payload:{
                    code:data.code
                }
            });
        });


        io.on("RECEIVECASH",(data)=>{
            dispatch(Actions.handleUpdateCompleteRequestStatus("RECEIVECASH"));
        });

        io.on("TRIPTHREE",(data)=>{
            dispatch(Actions.handleUpdateCompleteRequestStatus("TRIPTHREE"));
        });

        io.on("SHOWBILL",(data)=>{
            console.log("DATA SHOW BILL COME");
            console.log("*********************");
            console.log(data.data);
            console.log("**********************");
            dispatch(Actions.handleSetStatusAsShowBill(data.data));
        });
        //socket registered operations ends here......

        Soc.setIO(io);
        //implementing socket request ends here...........
      //socket ends here........

    //return statement starts here...
    return (
        <DrawerNav />
    );
    //return stateent ends here......

}//......................

export default secondGrid;