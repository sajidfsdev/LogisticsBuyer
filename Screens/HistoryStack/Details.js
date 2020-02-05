import React from 'react';
import { View,Text,StyleSheet,ScrollView } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Color from '../../Constants/Colors';
import API from '../../Constants/API';

const Details=(props)=>{


    //compute grand total starts here......
    const computeGrandTotal=()=>{
        let bill=(props.navigation.getParam("history").distance/1000)*props.navigation.getParam("history").fare.distance;
       let other=0;

       props.navigation.getParam("history").fare.fares.forEach(elem => {
           other=parseFloat(other)+parseFloat(elem.value);
       });
       return parseFloat(bill+other).toFixed(2);
    }
    //compute grand total ends here.........

    //return statement starts here....
    return (
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


                    
                                    {/* Horizontal scroll View Starts Here....... */}
                <ScrollView style={styles.horizontalView} horizontal={true}>

{/* Products Details Starts Here..... */}
{
    props.navigation.getParam("history").products.map((elem,index)=>{
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
                <View style={styles.prodView}>
                    <Text style={styles.prod}>{elem.name}</Text>
                </View>
            </View>
        );
    })
}
{/* Products Details Ends Here.......... */}
</ScrollView>
{/* Horizontal Scroll View Ends Here.......... */}



                {/* Fare summary starts here...... */}
                <ScrollView style={styles.fareView}>

                <View style={styles.stripView}>
                    <Text style={styles.stripText}>
                        Distance Covered
                    </Text>
                    <Text style={styles.stripText}>
                        {
                            parseFloat(props.navigation.getParam("history").distance/1000).toFixed(2)+" Km"
                        }
                    </Text>
                </View>


                <View style={styles.stripView}>
                    <Text style={styles.stripText}>
                        Per-Km Rate
                    </Text>
                    <Text style={styles.stripText}>
                        {
                            props.navigation.getParam("history").fare.distance
                        }
                    </Text>
                </View>

                <View style={styles.stripView}>
                    <Text style={styles.stripText}>
                        Distance Fare
                    </Text>
                    <Text style={styles.stripText}>
                        {
                            parseFloat(props.navigation.getParam("history").fare.distance*parseFloat(props.navigation.getParam("history").distance/1000).toFixed(2)).toFixed(2)
                        }
                    </Text>
                </View>

                {
                    props.navigation.getParam("history").fare.fares.map((elem,index)=>{
                        return (
                <View key={index} style={styles.stripView}>
                    <Text style={styles.stripText}>
                        {
                            elem.fare
                        }
                    </Text>
                    <Text style={styles.stripText}>
                        {
                            elem.value
                        }
                    </Text>
                </View>
                        );
                    })
                }





                {/* Grand Total starts here........ */}
                <View style={styles.gtParent}>
                    <View style={styles.gtChild}>
                        <Text style={styles.gtText}>{
                            "Rs: "+computeGrandTotal()
                            }</Text>
                    </View>
                </View>
                {/* //Grand total ends here........ */}

                </ScrollView>
                {/* Fare Summary ends here........ */}



                



            </View>
        </React.Fragment>
    );
    //return statment ends here.......

}//.....................

const styles=StyleSheet.create({
    container:{
        flex:1
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
    horizontalView:{
        width:'100%',
        marginTop:30
    },
    desc:{
        fontFamily:'roboto-regular',
        fontSize:12
    },

    prod:{
        fontFamily:'roboto-regular',
        fontSize:17,
        fontWeight:'bold',
        color:Color.success
    },

    fareView:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
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
    },

    gtParent:{
        width:'100%',
        marginTop:20,
        marginBottom:30,
        flexDirection:'row',
        justifyContent:'flex-end'
    },

    gtChild:{
        padding:5,
        backgroundColor:Color.primary,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },

    gtText:{
        fontFamily:'roboto-regular',
        color:'white',
        fontSize:15
    }
});

export default Details;