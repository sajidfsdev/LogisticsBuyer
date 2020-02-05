import React,{ useEffect,useState } from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Input } from 'react-native-elements';
import Color from '../Constants/Colors';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import AppLoading from '../Reusable/AppLoading';
import API from '../Constants/API';
import * as Types from '../Store/Types/types';

const changePass=(props)=>{

    //redux state starts here.....
    const token_RP=useSelector(state=>state.auth.token);
    const dispatch=useDispatch();
    //redu state ends here........

    const passOneRef = React.createRef();
    const passTwoRef = React.createRef();

    //use state starts here......
    const [appState,setAppState]=useState(1);//1 normal...
                                             //2 buffering

    const [passOneState,setPassOneState]=useState('');
    const [passTwoState,setPassTwoState]=useState('');
    const [passOneValState,setPassOneValState]=useState(false);
    const [passTwoValState,setPassTwoValState]=useState(false);
    const [passOneErrorState,setPassOneErrorState]=useState('');
    const [passTwoErrorState,setPassTwoErrorState]=useState('');
    //use state ends here........


    //Handle Submit Starts Here......
    const handleSubmit=async ()=>{

        setAppState(2);
        
        //config setup.....
        const config={
            headers:{
                'Content-Type':'application/json',
                'r-auth-humtoken':token_RP
            }
        };


        //body starts....
        const body=JSON.stringify({
            newPass:passOneState
        });


        //try catch starts here........
        try
        {
            const res=await axios.post(API.server+"/rider/changePass",body,config);

            if(res)
            {
                setAppState(1);
                dispatch({type:Types.PASSWORD_CHANGED});
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
    //Handle Submit Ends Here........


    //Handling pass ne starts here.....
    const handlePassOneChange=(val)=>{
        if(val==="")
        {
            setPassOneValState(false);
            
        }
        else
        if(val.length<8)
        {
            setPassOneValState(false);
            
        }
        else
        {
            setPassOneValState(true);
            
        }
        setPassOneState(val);
    }
    //Handling pass one ends here......



    //Handle pass Two ends here.......
    const handlePassTwoChange=(val)=>{
        if(val !== passOneState)
        {
            setPassTwoValState(false);
            
        }
        else
        {
            setPassTwoValState(true);
           
        }
        setPassTwoState(val);
    }
    //Handle pass two ends here.......


    //Handle Auth Check Pass One......
    const handleAuthCheckPassOne=()=>{
        if(passOneState==="")
        {
            setPassOneValState(false);
            setPassOneErrorState("Field Cannot Be Empty");
            passOneRef.current.shake();
        }
        else
        if(passOneState.length<8)
        {
            setPassOneValState(false);
            setPassOneErrorState("Password Must Be Eight Characters Long");
            passOneRef.current.shake();
        }
        else
        {
            setPassOneValState(true);
            setPassOneErrorState('');
        }
    }
    //Handle Auth Check Pass One .....




    //Handle Auth Check Pass Two starts......
    const handleAuthCheckPassTwo=()=>{
        if(passTwoState !== passOneState)
        {
            setPassTwoValState(false);
            setPassTwoErrorState("Password Does Not Match");
            passTwoRef.current.shake();
        }
        else
        {
            setPassTwoValState(true);
            setPassTwoErrorState('');
        }
    }
    //Handle Auth Check Pass Two ends .......


    //use effect starts here......
    useEffect(()=>{
        passOneRef.current.setNativeProps({
             secureTextEntry: true
        });
        passTwoRef.current.setNativeProps({
            secureTextEntry:true
        });

       
    },[]);
    //use effect ends here........



    //Btn GUI starts here......
    let btnGUI=null;

    if(passOneValState===true && passTwoValState===true)
    {
        btnGUI=(
            <TouchableOpacity onPress={handleSubmit} style={styles.btnTo}>
                <View style={styles.btnView}>
                    <Text style={styles.btnText}>Change Password</Text>
                </View>
            </TouchableOpacity>
        );
    }
    else
    {
        btnGUI=(
            <TouchableOpacity style={styles.btnTo}>
                <View style={styles.btnViewDark}>
                    <Text style={styles.btnText}>Change Password</Text>
                </View>
            </TouchableOpacity>
        );
    }
    //Btn GUI ends here.........



    //main GUI man starts here.......
    let mainGUI=(<AppLoading />);

    if(appState===1)
    {
        mainGUI=(
            <React.Fragment>
                 <View style={styles.container}>
                <View style={styles.changeView}>
                    <Text style={styles.changeText}>Change Password First</Text>
                </View>

                <View style={styles.input}>
                <Input
                placeholder='Enter New Password'
                ref={passOneRef}
                value={passOneState}
                onChangeText={handlePassOneChange}
                errorMessage={passOneErrorState}
                onBlur={handleAuthCheckPassOne}
                leftIcon={{ type: 'entypo', name: 'lock-open',size:35,color:Color.welcomeBack }}
                />
                </View>

                <View style={styles.input}>
                <Input
                placeholder='Confirm Password'
                value={passTwoState}
                onChangeText={handlePassTwoChange}
                ref={passTwoRef}
                errorMessage={passTwoErrorState}
                onBlur={handleAuthCheckPassTwo}
                leftIcon={{ type: 'entypo', name: 'lock-open',size:35,color:Color.welcomeBack }}
                />
                </View>

                {btnGUI}

                
            </View>
            </React.Fragment>
        );
    }

    
    //main GUI ends here.............

    //return statement starts here.....
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return statement ends here.......

}//.........................

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20
    },


    btnTo:{
        width:'100%'

    },


    btnView:{
        width:'100%',
        padding:15,
        backgroundColor:Color.success,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },

    btnViewDark:{
        width:'100%',
        padding:15,
        backgroundColor:'gray',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },


    btnText:{
        color:'white'
    },


    changeView:{
        width:'100%',
        padding:15,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:15
    },


    changeText:{
        fontFamily:'roboto-regular',
        fontSize:22,
        color:Color.welcomeBack
    },


    input:{
        marginBottom:30,
        width:'100%'
    }
});

export default changePass;