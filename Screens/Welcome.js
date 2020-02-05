import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Constants/Colors';


const Welcome=(props)=>{

   

    //return starts here....
    return (
        <View style={styles.container}>
            <View>
                <Icon name="directions-bike" size={80} color={Colors.welcomeBack} />
            </View>

            <View>
                <Text style={{...styles.logoText,color:Colors.welcomeBack}}>HumRider</Text>
            </View>
        </View>
    );
    //return ends here......

}//......................

const styles=StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    logoText:{
        fontSize:20,
        fontWeight:'bold'
        
    }
});

export default Welcome;