import * as Types from '../Types/types';
import axios from 'axios';
import API from '../../Constants/API';
import { Alert } from 'react-native';


//handle Ride come starts here....
export const handleRideCome=(vendor,buyer,distance,id,outletName)=>{

    //dispatch return starts here....
    return (dispatch)=>{
        return dispatch({
            type:Types.RIDER_REQUEST_COME,
            payload:{
                vendor:JSON.parse(JSON.stringify(vendor)),
                buyer:JSON.parse(JSON.stringify(buyer)),
                distance:distance,
                id:id,
                outletName:outletName
            }
        });
    }
    //dispatch return ends here......
}
//handle Rider come ends here.....





//Handle setting lat long buyer starts here.......
export const handleSetBuyerLatLongAction=(lat,long)=>{
    //return starts....
    return (dispatch,getState)=>{
        let req=JSON.parse(JSON.stringify(getState().request.completeRequest));
        console.log("FROM RIDER REDUX CABINET");
        console.log("CHECK THE REQ");
        console.log("+++++++++++++++++++++++++++++++");
        req.buyerLat=parseFloat(lat);
        req.buyerLong=parseFloat(long);

        dispatch({
            type:Types.SET_GEN_COMPLETE_REQUEST,
            payload:{
                completeRequest:JSON.parse(JSON.stringify(req))
            }
        });
    }
    //return ends .....
}
//Handle setting buyer lat long ends here.........








//Handle send Loc Book to buyer sttarts here.........
export const sendMyLocBookToBuyer=(lat,long)=>{

    //return starts here..........
    return async (dispatch,getState)=>{
        //copied code starts here......
        const req=getState().request.completeRequest;
        const token=getState().auth.token;
        
        if(req.status==="TRIPONE" || req.status==="TRIPTWO" || req.status==="TRIPTHREE")
        {
            console.log("TRIP ONE/TWO DETECTED SUCCESSFULLY");
            const config={
                headers:{
                    'Content-Type':'application/json',
                    'r-auth-humtoken':token
                }
            };


            const body=JSON.stringify({
                buyerId:req.buyerId,
                lat:parseFloat(lat),
                long:parseFloat(long)
            });

                    //try catch starts here........
        try
        {
            const res=await axios.post(API.server+"/rider/request/sendMyLocToBuyer",body,config);

            if(res)
            {
                //Alert.alert("LOC SEND TOTHE BUYER SUCCESSFULLY");
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
        else
        {
            //console.log("STATUS TRIP NOT DETECTED");
        }///////////////////////////////////////////////


        //copie code ends here.........
    }
    //return ends here............
}
//Handle send Loc BOOk to buyer ends here............






//Handle set request UPDATE status starts here........
export const handleUpdateCompleteRequestStatus=(status)=>{

    //return starts here......
    return (dispatch,getState)=>{
        const req=JSON.parse(JSON.stringify(getState().request.completeRequest));
        req.status=status;
        dispatch({
            type:Types.SET_GEN_COMPLETE_REQUEST,
            payload:{
                completeRequest:JSON.parse(JSON.stringify(req))
            }
        });
    }
    //return ends here.........
}
//Handle set request UPDATE status ends here..........





//Handle setting complete reuest Order Id starts.....
export const handleSetCompleteRequestOrderId=(orderId)=>{

    //return starts here....
    return (dispatch,getState)=>{
        const completeRequest=JSON.parse(JSON.stringify(getState().request.completeRequest));
        completeRequest.orderId=orderId;

        dispatch({
            type:Types.SET_GEN_COMPLETE_REQUEST,
            payload:{
                completeRequest:JSON.parse(JSON.stringify(completeRequest))
            }
        });
    }
    //return ends here......
}
//Handle setting Complete request Order Id ends here..





//Handle Show Bill Starts Here............
export const handleSetStatusAsShowBill=(fare)=>{

    //return starts here......
    return (dispatch,getState)=>{
        const completeRequest=JSON.parse(JSON.stringify(getState().request.completeRequest));
        completeRequest.fare=JSON.parse(JSON.stringify(fare));
        completeRequest.status="SHOWBILL";

        dispatch({
            type:Types.SET_GEN_COMPLETE_REQUEST,
            payload:{
                completeRequest:JSON.parse(JSON.stringify(completeRequest))
            }
        });        
    }
    //return ends here........

}
//Handle Show Bill Ends Here..............