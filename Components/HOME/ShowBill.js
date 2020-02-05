import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableOpacity, Alert } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import Color from '../../Constants/Colors';
import API from '../../Constants/API';
import axios from 'axios';
import AppLoading from '../../Reusable/AppLoading';
import * as Actions from '../../Store/Actions/Request';

const ShowBill=(props)=>{

    const dispatch=useDispatch();

    //redux state starts........
    const request_RP=useSelector(state=>state.request.completeRequest);
    const token_RP=useSelector(state=>state.auth.token);

    //state management...
    const [bufferringState,setBufferringState]=useState(false);

    //Handle cash received starts here.....
    const handleCashReceived=async ()=>{

        setBufferringState(true);

        //config starts...
        const config={
            headers:{
                'Content-Type':'application/json',
                'r-auth-humtoken':token_RP
            }
        };

        //Date processing starts here........
        let date=new Date();
        const day=date.getUTCDate();
        const year=date.getUTCFullYear();
        const m=date.getUTCMonth();
        let month="";
        switch(m)
      {
        case 0:
          month="JAN";
          break;
        case 1:
          month="FEB";
          break;
        case 2:
          month="MAR";
          break;
        case 3:
          month="APR";
          break;
        case 4:
          month="MAY";
          break;
        case 5:
          month="JUN";
          break;
        case 6:
          month="JUL";
          break;
        case 7:
          month="AUG";
          break;
        case 8:
          month="SEP";
          break;
        case 9:
          month="OCT";
          break;
        case 10:
          month="NOV";
          break;
        case 11:
          month="DEC";
          break;
        
      }
      
      const producedDate=day+"/"+month+"/"+year;
      const hour=date.getHours();
      const minutes=date.getUTCMinutes();
      const producedTime=hour+":"+minutes;

        //Date processing ends here..........
        console.log("DATE IS : "+producedDate);
        console.log("TIME IS : "+producedTime);


        //body starts....
        const body=JSON.stringify({requestId:request_RP._id,date:producedDate,time:producedTime});

        //try catch starts here........
        try
        {
            const res=await axios.post(API.server+"/rider/request/finish",body,config);

            if(res)
            {
                setBufferringState(false);
                dispatch(Actions.handleUpdateCompleteRequestStatus("FINISH"));

            }
            else
            {
                setBufferringState(false);
            }
        }
        catch(err)
        {
            setBufferringState(false);
            if(err.response)
            {
                Alert.alert("Failed",err.response.data.errorMessage);
            }
            else
            {
                Alert.alert("Failed",err.message);
            }
        }
        //try catch ends here..........
    }
    //Handle cash received ends here.......


    //compute grand total starts here......
    const computeGrandTotal=()=>{
        const distanceCovered=parseFloat(request_RP.distance/1000).toFixed(2);
        const perKmRate=request_RP.fare.distance;
        const distanceFare=parseFloat(distanceCovered*perKmRate);
        let additionalFares=0;
        request_RP.fare.fares.forEach(elem => {
            additionalFares+=elem.value;
        });

        return parseInt(distanceFare+additionalFares);
    }
    //compute Grand total ends here........


    //Bufferring starts...
    if(bufferringState===true)
    {
        return (
            <React.Fragment>
                <AppLoading />
            </React.Fragment>
        );
    }

    //return starts here......
    return (
        <React.Fragment>
            <ScrollView style={styles.container}>
                
                {/* Pay Fare Starts Here..... */}
                <View style={styles.fareContainer}>
                    <View style={styles.fareBlock}>
                        <Text style={styles.fareTitle}>FARE AMOUNT DETAILS</Text>
                    </View>
                </View>
                {/* Pay Fare Ends Here....... */}



                

                {/* Strip Starts Here... */}
                <View style={styles.strip}>
                    <Text style={styles.stripText}>Distance Fare</Text>
                    <Text style={styles.stripText}>
                        {
                             (parseFloat(request_RP.distance/1000).toFixed(2))*(request_RP.fare.distance)+" Rs"
                        }
                    </Text>
                </View>
                {/* Strip Ends Here..... */}

                {/* Further Rates Starts Here...... */}
                {
                    request_RP.fare.fares.map((elem,index)=>{
                        return (
                            <View key={index} style={styles.strip}>
                                <Text style={styles.stripText}>
                                    {elem.fare}
                                </Text>
                            <Text style={styles.stripText}>
                                {elem.value}
                            </Text>
                        </View>
                        );
                    })
                }
                {/* Further Rates Ends Here........ */}



                {/* Grand Total Starts Here....... */}
                <View style={styles.gtParent}>
                    <View style={styles.getChild}>
                        <Text style={styles.gt}>
                            {
                                "GRAND TOTAL: Rs "+computeGrandTotal()
                            }
                        </Text>
                    </View>
                </View>
                {/* Grand Total Ends Here......... */}



                {/* Cash Received Button Starts Here...... */}
                <TouchableOpacity onPress={handleCashReceived} style={styles.to} activeOpacity={0.5}>
                    <Text style={styles.toText}>CASH RECEIVED</Text>
                </TouchableOpacity>
                {/* Cash Received Button Ends Here........ */}

            </ScrollView>
        </React.Fragment>
    );
    //return ends here........

}//........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:20,
        paddingRight:20
    },


    fareContainer:{
        width:'100%',
        padding:2,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },

    fareBlock:{
        padding:10,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'green'
    },

    fareTitle:{
        fontFamily:'roboto-regular',
        color:'green',
        fontSize:18
    },

    strip:{
        width:'100%',
        marginTop:20,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:Color.primary
    },

    stripText:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white'
    },

    stripBlue:{
        width:'100%',
        marginTop:20,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:Color.welcomeBack
    },

    gtParent:{
        width:'100%',
        marginTop:20,
        flexDirection:'row',
        justifyContent:'flex-end',
        padding:3
    },

    getChild:{
        padding:10,
        backgroundColor:Color.primary,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },

    gt:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:'white'
    },

    to:{
        marginTop:20,
        width:'100%',
        padding:20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.success
    },

    toText:{
        fontFamily:'roboto-regular',
        color:'white',
        fontSize:15
    }
});

export default ShowBill;