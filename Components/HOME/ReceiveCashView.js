import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableOpacity, Alert } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { useSelector,useDispatch } from 'react-redux';

//change links imports......
import API from '../../Constants/API';
import axios from 'axios';
import AppLoaing from '../../Reusable/AppLoading';
import * as Types from '../../Store/Types/types';
import * as Actions from '../../Store/Actions/Request';
import Color from '../../Constants/Colors';

const ReceiveComeView=(props)=>{

    const dispatch=useDispatch();

    const [appState,setAppState]=useState(1);//1 normal 2..loading

   const completeRequest_RP=useSelector(state=>state.request.completeRequest);
   const token_RP=useSelector(state=>state.auth.token);


   //Hanle cash receiving starts here......
   const handleCashReceiving=async ()=>{

    setAppState(2);
        //config setup......
        const config={
            headers:{
                'Content-Type':'application/json',
                'r-auth-humtoken':token_RP
            }
        };


        //body starts here.....
        const body=JSON.stringify({
            requestId:completeRequest_RP._id
        });


        //try catch starts here........
        try
        {
            const res=await axios.post(API.server+"/rider/request/cashReceived",body,config);

            if(res)
            {
                dispatch(Actions.handleSetCompleteRequestOrderId(res.data.orderId));
                setAppState(1);
                dispatch(Actions.handleUpdateCompleteRequestStatus("TRIPTWO"));
            }   
            else
            {
                setAppState(1);
                Alert.alert("Failed","Network Error");
            }
        }
        catch(err)
        {
            setAppState(1);
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
   //Handle cash receiving ends here.......


    //Compute Bill Starts Here......
    const computeBill=()=>{
        let bill=0;
        completeRequest_RP.products.forEach(element => {
                bill=parseInt(bill+(element.qty*element.price))
        });
        return bill;
    }
    //Compute Bill Ends Here........


    //Main GUI man starts here.........
    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(
            <React.Fragment>
                <ScrollView style={styles.container}>
                
                {/* Title View Starts Here...... */}
                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        Order Details
                    </Text>
                </View>
                {/* Title View Ends Here........ */}


                {/* Item Number Show Starts.... */}
                <View style={styles.subTitleView}>
                    <Text style={styles.subTitle}>{"Order Contains "+completeRequest_RP.products.length+" Item"}</Text>
                </View>
                {/* Item Number Show ends ..... */}



                {/* Horizontal scroll View Starts Here....... */}
                <ScrollView style={styles.horizontalView} horizontal={true}>

                    {/* Products Details Starts Here..... */}
                    {
                        completeRequest_RP.products.map((elem,index)=>{
                            return (
                                <View key={index} style={styles.boxes}>
                                    <AutoHeightImage 
                                        width={150}
                                        source={
                                           {
                                               uri: API.server+"/vendor/prodimg/"+elem.imgArr[0]
                                           }
                                        }
                                    />
                                <View style={{marginLeft:10}}>
                                    <Text style={styles.desc}>{"Name: "+elem.name}</Text>
                                    <Text style={styles.desc}>{"Price: "+elem.price+" Rs"}</Text>
                                    <Text style={styles.desc}>{"Qty: "+elem.qty}</Text>
                                    <Text style={styles.desc}>{"Total: "+(elem.qty*elem.price)+" Rs"}</Text>
                                </View>
                                </View>
                            );
                        })
                    }
                    {/* Products Details Ends Here.......... */}
                </ScrollView>
                {/* Horizontal Scroll View Ends Here.......... */}


                {/* Bill View Starts Here........ */}
                <View style={styles.parentBillView}>
                        <View style={styles.billView}>
                            <Text style={styles.bill}>{"Bill: "+computeBill()+" Rs"}</Text>
                        </View>
                </View>
                {/* Bill View Ends Here.......... */}



                {/* Received Cash Button starts here....... */}
                <TouchableOpacity onPress={handleCashReceiving} style={styles.to} activeOpacity={0.5}>
                    <Text style={styles.toText}>Cash Received</Text>
                </TouchableOpacity>
                {/* Received Cash Button Ends Here......... */}

            </ScrollView>
            </React.Fragment>
        );
    }
    else
    if(appState===2)
    {
        mainGUI=(
            <React.Fragment>
                <AppLoaing />
            </React.Fragment>
        );
    }
    //Main GUI man ends here...........

    //return starts here.....
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return ends here......

}//.......................

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:20,
        paddingRight:20
    },

    titleView:{
        width:'100%',
        padding:5,
        flexDirection:'row',
        justifyContent:'flex-start'
    },


    title:{
        fontFamily:'roboto-regular',
        fontSize:20,
        color:'green'
    },

    horizontalView:{
        width:'100%'
    },


    boxes:{
       
    },

    subTitleView:{
        width:'100%',
        padding:5,
        flexDirection:'row',
        justifyContent:'flex-start'
    },

    subTitle:{
        fontFamily:'roboto-regular',
        fontSize:15
    },

    desc:{
        fontFamily:'roboto-regular',
        fontSize:12
    },

    parentBillView:{
        width:'100%',
        marginTop:30,
        flexDirection:'row',
        justifyContent:'flex-end'
    },

    billView:{
        padding:10,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.welcomeBack
    },


    bill:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white'
    },

    to:{
        width:'100%',
        padding:15,
        marginTop:20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.success
    },

    toText:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white'
    }
});

export default ReceiveComeView;