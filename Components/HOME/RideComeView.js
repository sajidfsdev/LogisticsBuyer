import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,Dimensions,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import MapView,{ Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';


//changing linkage imports starts here.....
import Color from '../../Constants/Colors';
import MapKey from '../../Constants/Maps';
import ShrinkingButton from '../../Reusable/ShrinkingButton';
//changing linkage imports ends here.......



const RiderComeView=(props)=>{

    //use selector starts here......
    const latitude_RP=useSelector(state=>state.request.latitude);
    const longitude_RP=useSelector(state=>state.request.longitude);
    const vendor_RP=useSelector(state=>state.request.vendor);
    const buyer_RP=useSelector(state=>state.request.buyer);
    const distance_RP=useSelector(state=>state.request.distance);
    const buyerId_RP=useSelector(state=>state.request.id);
    const outletName_RP=useSelector(state=>state.request.outletName);
    //use selector ends here........


   
    //return starts here......
    return (
        
            <ScrollView style={styles.container}>
                
                {/* Heading starts here..... */}
                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        RIDER REQUEST
                    </Text>
                </View>
                {/* Heading ends here....... */}


                {/* Map View Starts Here.... */}
                <MapView 
                style={{
                    width:'100%',
                    height:(Dimensions.get('screen').width+30)
                }}
                provider={PROVIDER_GOOGLE}
                showsCompass={true}
                rotateEnabled={true}
                showsUserLocation={false}
                region={{
                    latitude:parseFloat(latitude_RP),
                    longitude:parseFloat(longitude_RP),
                    latitudeDelta:0.0421,
                    longitudeDelta:0.0421
                }}
                >
                    {/* My Markers Man Starts Here..... */}
                    <Marker
                        title="ME"
                        coordinate={{
                            latitude:parseFloat(latitude_RP),
                            longitude:parseFloat(longitude_RP)
                        }}
                    >
                        <MaterialIcon name="directions-bike" size={40} color="#120d6e" />
                    </Marker>
                    {/* My Markers man ends here....... */}


                    {/* Vendor Markers Man Starts Here..... */}
                    <Marker
                        title="VENDOR"
                        coordinate={{
                            latitude:parseFloat(vendor_RP.lat),
                            longitude:parseFloat(vendor_RP.long)
                        }}
                    >
                    <MaterialIcon name="store" size={40} color="purple" />
                    <Text style={styles.outletName}>{outletName_RP}</Text>
                    </Marker>
                    {/* Vendor Markers man ends here....... */}


                    {/* Buyer Markers Man Starts Here..... */}
                    <Marker
                        title="BUYER"
                        coordinate={{
                            latitude:parseFloat(buyer_RP.lat),
                            longitude:parseFloat(buyer_RP.long)
                        }}
                    >
                        <MaterialIcon name="person-pin" size={40} color="green" />
                    </Marker>
                    {/* Buyer Markers man ends here....... */}




                    {/* Polylines starts here....... */}




                    {/* Me To Buyer Starts Here..... */}
                    <MapViewDirections
                    apikey={MapKey.apikey}
                    origin={{latitude:latitude_RP,longitude:longitude_RP}}
                    destination={{latitude:parseFloat(buyer_RP.lat),longitude:parseFloat(buyer_RP.long)}}
                    strokeWidth={7}
                    strokeColor="hotpink"
                    />
                    {/* Me To Buyer Ends Here....... */}



                    {/* Buyer To Vendor To Vendor Ends Here....... */}
                    <MapViewDirections
                    apikey={MapKey.apikey}
                    origin={{latitude:parseFloat(buyer_RP.lat),longitude:parseFloat(buyer_RP.long)}}
                    destination={{latitude:parseFloat(vendor_RP.lat),longitude:parseFloat(vendor_RP.long)}}
                    strokeWidth={7}
                    strokeColor="hotpink"
                    />
                    {/* Buyer  To Vendor Ends Here....... */}





                    {/* Polylines ends here.......... */}


                </MapView>
                {/* Map View Ends Here...... */}


                {/* Info View Starts Here....... */}
                <View style={styles.infoView}>
                    <View style={styles.distanceInfoView}>
                        <Text style={styles.distanceTitle}>Approx Distance</Text>
                        <Text style={styles.distance}>{parseFloat(distance_RP/1000).toFixed(2)+" KM"}</Text>
                    </View>
                    {/* <View style={styles.distanceInfoView}>
                        <Text style={styles.distanceTitle}>Earning Amount</Text>
                        <Text style={styles.distance}>{Math.floor(((parseFloat(distance_RP/1000))*8.13))+" Rs"}</Text>
                    </View> */}
                </View>
                {/* Info View Ends Here......... */}



                {/* Accept Rider Btn Starts Here...... */}
               <ShrinkingButton />
                {/* Accept Ride Btn Ends Here......... */}

            </ScrollView>
        
    );
    //return ends here........

}//.......................

const styles=StyleSheet.create({

    container:{
        flex:1
    },

    titleView:{
        width:'100%',
        padding:2,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:3
    },


    title:{
        fontFamily:'roboto-regular',
        fontSize:20,
        color:Color.success
    },


    mapView:{
        flex:1
    },


    infoView:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:40,
        paddingRight:40
    },


    distanceInfoView:{
        width:'100%',
        padding:3,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:Color.welcomeBack
    },


    distanceTitle:{
         fontFamily:'roboto-regular',
         fontSize:14,
         color:'white'
    },


    distance:{
        fontFamily:'roboto-regular',
        fontSize:14,
        color:'white'
    },


    to:{
        width:'100%'
    },


    parentView:{
        width:'100%',
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },


    childView:{
        backgroundColor:Color.success,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:20
    },

    toText:{
        fontFamily:'roboto-regular',
        color:'white',
        fontSize:15
    },


    outletName:{
        fontFamily:'roboto-regular',
        fontSize:15,
        color:"purple"
    }
});

export default RiderComeView;