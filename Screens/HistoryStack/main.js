import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { useSelector } from 'react-redux';
import API from '../../Constants/API';
import axios from 'axios';
import AppLoading from '../../Reusable/AppLoading';
import Color from '../../Constants/Colors';

const mainScreen=(props)=>{


    //state management starts here....
    const [appState,setAppState]=useState(1);//1 success 2.loading 3.error
    const [errorState,setErrorState]=useState('');
    const [historyState,setHistoryState]=useState([]);
    const token_RP=useSelector(state=>state.auth.token);
    const id_RP=useSelector(state=>state.auth.id);
    //state management ends here......


    //Handle show details starts here......
    const handleShowDetails=(history)=>{
        props.navigation.navigate("hisDetails",{
            history:history
        });
    }
    //Handle show details ends here........


     //compute History Bill starts here......
     const computeHistoryBill=(history)=>{

       let bill=(history.distance/1000)*history.fare.distance;
       let other=0;

       history.fare.fares.forEach(elem => {
           other=parseFloat(other)+parseFloat(elem.value);
       });
       return parseFloat(bill+other).toFixed(2);
    }
    //compute History Bill ends here........

    //load history starts here.....
    const loadMyHistory=async ()=>{

            //launching bufferring...
            setAppState(2);

            //config.....
            const config={headers:{'Content-Type':'application/json','r-auth-humtoken':token_RP}};

            //body....
            const body=JSON.stringify({riderId:id_RP});

            //try catch starts.....
            try
            {
                const res=await axios.post(API.server+"/rider/request/history",body,config);

                if(res)
                {
                    setAppState(1);
                    //console.log("RIDER HISTORY HAS ARRIVED");
                    //console.log(res.data.data);
                    setHistoryState([...res.data.data]);
                }
                else
                {
                    setAppState(3);
                    setErrorState("NETWORK ERROR OCCURRED");
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
            //try catch ends here..
    }
    //load history ends here.......


    //Main GUI man starts here....
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
                   
                   {/* Title View Starts Here...... */}
                <View style={styles.parent}>
                        <View style={styles.child}>
                            <Text style={styles.title}>
                                RIDE DETAILS
                            </Text>
                        </View>
                    </View>
                    {/* Title View Ends Here........ */}


                    {/* Scroll State Starts Here..... */}
                    <ScrollView style={styles.scroll}>
                    {
                        historyState.map((elem,index)=>{
                            return (
                                <TouchableOpacity key={index} style={styles.stripView} activeOpacity={0.5} onPress={()=>{handleShowDetails(elem)}}>
                                    <Text style={styles.stripText}>
                                        {elem.orderId}
                                    </Text>
                                    <Text style={styles.stripText}>
                                        {elem.date}
                                    </Text>
                                    <Text style={styles.stripText}>
                                      {
                                          "Rs: "+computeHistoryBill(elem)
                                      }
                                    </Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                    </ScrollView>
                    {/* Scroll State ends here........ */}
                </View>
            </React.Fragment>
        );
    }
    //Main GUI an ends here.......

    //return starts here......
    return (
        <React.Fragment>
            <NavigationEvents
                onDidFocus={loadMyHistory}
            />
            {mainGUI}
        </React.Fragment>
    );
    //return ends here........

}//.........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:20,
        paddingRight:20
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
    parent:{
        width:'100%',
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },

    child:{
        padding:5,
        borderWidth:1,
        borderColor:Color.welcomeBack
    },

    title:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:Color.welcomeBack
    },

    scroll:{
        flex:1,
        marginTop:20
    },

    stripView:{
        width:'100%',
        marginTop:20,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:Color.success
    },

    stripText:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:'white'
    }
});

export default mainScreen;