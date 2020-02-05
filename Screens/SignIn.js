import React,{ useState } from 'react';
import { View,Text,StyleSheet,ScrollView,Dimensions,TextInput,Button,KeyboardAvoidingView,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconConstant from '../Constants/Icons';
import Colors from '../Constants/Colors';
import AppLoading from '../Reusable/AppLoading';
import axios from 'axios';
import API from '../Constants/API';
import * as Types from '../Store/Types/types';

import { useSelector,useDispatch } from 'react-redux';

import PasswordChanger from './ChangePass';
import SecondGrid from '../SecondGrid/SecondGrid';

const SignIn=(props)=>{

    //const use selector starts here.....
    const loaded_RP=useSelector(state=>state.auth.loaded);
    const isError_RP=useSelector(state=>state.auth.isError);
    const errorMessage_RP=useSelector(state=>state.auth.errorMessage);
    const first_RP=useSelector(state=>state.auth.first);
    const dispatch=useDispatch();
    //const useDispatch ends here........

    //state management starts here...
    const [appState,setAppState]=useState(1);
    const [phState,setPhState]=useState('');
    const [passState,setPassState]=useState('');
    const [phValState,setPhValState]=useState(false);
    const [passValState,setPassValState]=useState(false);
    //state management ends here.....

    //Handle signin starts here....
    const handleSignIn=async()=>{

        setAppState(2);
        //config starts...
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };


        //body starts.....
        const body=JSON.stringify({
            ph:phState,
            pass:passState
        });


        //try catch starts here......
        try
        {
            const res=await axios.post(API.server+"/rider/login",body,config);

            if(res)
            {
                setAppState(1);
                //Alert.alert("Res Has Come");
                dispatch({
                    type:Types.AUTHENTICATE_RIDER,
                    payload:{
                        token:res.data.token,
                        first:res.data.first,
                        id:res.data.id
                    }
                });
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
            if(err.response)
            {
                Alert.alert(err.response.data.errorMessage);
            }
            else
            {
                Alert.alert(err.message);
            }
        }
        //try catch ends here........
        
    }
    //handle signin ends here......


    //custom method starts here...
    const handlePhInput=(ph)=>{
        let str=ph.toString();

        if(str.length===0)
        {
            setPhValState(false);
        }
        else
        {
            setPhValState(true);
        }

        setPhState(str);
    }

    const handlePassInput=(pass)=>{

        if(pass.length===0)
        {
            setPassValState(false);
        }
        else
        {
            setPassValState(true);
        }

        setPassState(pass);
    }
    //custom method ends here.....


    //Submit btn GUI man starts here....
    let submitBtnGUI=null;

    submitBtnGUI=(
        <Button style={styles.btn} color="gray" title="LOGIN" />
    );

    if(
        phValState===true &&
        passValState===true
    )
    {
        submitBtnGUI=(
            <Button onPress={handleSignIn} style={styles.btn} color={Colors.success} title="LOGIN" />
        );
    }
    //submit btn GUI man ends here......

    //main gui starts here...
    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(
            <ScrollView style={styles.container}>
            <KeyboardAvoidingView keyboardVerticalOffset={1} behavior="position">
            <View style={styles.subContainer}>
                <View style={{...styles.iconView,backgroundColor:Colors.welcomeBack}}>
                    <Icon name="directions-bike" size={60} color="white" />
                </View>

                <View style={styles.titleView}>
                    <Text style={{...styles.title,color:Colors.welcomeBack}}>HumRider</Text>
                </View>


                <View style={styles.inputView}>
                    <TextInput onChangeText={handlePhInput} value={phState} keyboardType="number-pad" style={{...styles.input,borderColor:Colors.welcomeBack}} placeholder="Phone Number" />
                </View>

                <View style={styles.inputView}>
                    <TextInput secureTextEntry={true} onChangeText={handlePassInput} value={passState} keyboardType="default" style={{...styles.input,borderColor:Colors.welcomeBack}} placeholder="Password" />
                </View>


                <View style={styles.btnView}>
                    {
                        submitBtnGUI
                    }
                </View>
            </View>
            </KeyboardAvoidingView>
        </ScrollView>
        );
    }
    else if(appState===2)
    {
        mainGUI=<AppLoading />;
    }
    //main gui ends here.....



    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    if(loaded_RP)
    {
        if(first_RP)
        {
            mainGUI=(
                <React.Fragment>
                    <PasswordChanger />
                </React.Fragment>
            );
        }
        else
        {
            mainGUI=(
                <React.Fragment>
                    <SecondGrid />
                </React.Fragment>
            );
        }
    }
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    //return starts here...
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return ends here.....

}//....................

const styles=StyleSheet.create({
    container:{
        flex:1
    },

    subContainer:{
        width:'100%',
        height:(Dimensions.get('window').height-50),
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },

    iconView:{
        display:'flex',
        width:150,
        height:150,
        borderRadius:75,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },


    titleView:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center'
    },


    title:{
        fontSize:20,
        fontFamily:'roboto-regular'
    },


    inputView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:25
    },


    input:{
        width:'80%',
        borderBottomWidth:2,
        fontSize:20
    },


    btnView:{
        marginTop:50,
        width:'80%',

    },

    btn:{
        width:'80%'
    }

    

    
});

export default SignIn;