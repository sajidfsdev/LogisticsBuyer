import React,{ useState,useEffect } from 'react';
import WelcomeScreen from '../Screens/Welcome';
import SignInScreen from '../Screens/SignIn';

const Grid=(props)=>{

    //state management starts here....
    const [appState,setAppState]=useState(1);
    //state management ends here......


    useEffect(()=>{
        setTimeout(()=>{
            setAppState(2);
        },5000);
    },[]);

    let mainGUI=null;

    if(appState===1)
    {
        mainGUI=(
            <React.Fragment>
                <WelcomeScreen />
            </React.Fragment>
        );
    }
    else
    {
        mainGUI=(
            <React.Fragment>
                <SignInScreen />
            </React.Fragment>
        );
    }

    //return starts here....
    return (
        <React.Fragment>
            {mainGUI}
        </React.Fragment>
    );
    //return ends here......

}//..................

export default Grid;