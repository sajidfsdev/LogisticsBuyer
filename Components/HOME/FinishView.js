import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector,useDispatch } from 'react-redux';
import * as Types from '../../Store/Types/types';
import Color from '../../Constants/Colors';

const FinishView=(props)=>{

    const dispatch=useDispatch();

    //use selector.....
    const request_RP=useSelector(state=>state.request.completeRequest);


    //Handle Go Back starts here.....
    const handleGoBack=()=>{

        dispatch({
            type:Types.CLEAR_ALL_LOGS
        });
    }
    //Handle Go Back ends here.......

    //return statement starts here.....
    return (
        <React.Fragment>
            <View style={styles.container}>
                
                {/* Logo View Starts Here..... */}
                <View style={styles.logoView}>
                    <Icon 
                        name="clipboard-check"
                        color="green"
                        size={140}
                    />
                </View>
                {/* Logo View Ends Here...... */}



                {/* Title View Starts Here..... */}
                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        RIDE ACCOMPLISHED
                    </Text>
                </View>
                {/* Title View Ends Here....... */}

                {/* Title View Starts Here..... */}
                <View style={styles.titleView}>
                    <Text style={styles.ititle}>
                        distance: {
                            parseFloat(
                                request_RP.distance/1000
                            ).toFixed(2)+" Km"
                        }
                    </Text>
                </View>
                {/* Title View Ends Here....... */}


                {/* Title View Starts Here..... */}
                <View style={styles.titleView}>
                    <Text style={styles.ititle}>
                        Per Km Rate: {
                            request_RP.fare.distance+" Rs"
                        }
                    </Text>
                </View>
                {/* Title View Ends Here....... */}


                {/* Title View Starts Here..... */}
                <View style={styles.titleView}>
                    <Text style={styles.etitle}>
                        EARNING: {
                            parseFloat(
                                (
                                    request_RP.distance/1000
                                )
                            ).toFixed(2)*(
                                request_RP.fare.distance
                            )+" Rs"
                        }
                    </Text>
                </View>
                {/* Title View Ends Here....... */}



                {/* Go Back Button starts here..... */}
                <TouchableOpacity onPress={handleGoBack} style={styles.to} activeOpacity={0.5}>
                    <Text style={styles.toText}>GO BACK</Text>
                </TouchableOpacity>
                {/* Go Back Button ends here....... */}


            </View>
        </React.Fragment>
    );
    //return statement ends here......

}//.........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:20,
        paddingRight:20,
        justifyContent:'center',
        alignItems:'center'
    },

    logoView:{
        width:'100%',
        padding:10,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },

    titleView:{
        width:'100%',
        padding:5,
        justifyContent:'center',
        alignItems:'center'
    },

    title:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:"green"
    },
    etitle:{
        fontFamily:'roboto-regular',
        fontSize:17,
        color:"green",
        fontWeight:'bold'
    },

    ititle:{
        fontFamily:'roboto-regular',
        fontSize:15
    },

    to:{
        width:'100%',
        marginTop:20,
        padding:15,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.primary
    },

    toText:{
        fontFamily:'roboto-regular',
        fontSize:12,
        color:'white'
    }
});

export default FinishView;