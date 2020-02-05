import * as Types from '../Types/types';

const initialState={
    token:null,
    loaded:false,
    isError:false,
    errorMessage:'',
    first:false
};

const AuthReducer=(state=initialState,action)=>{

    //switch starts here......
    switch(action.type)
    {
        case Types.AUTHENTICATE_RIDER:
            return {
                ...state,
                loaded:true,
                token:action.payload.token,
                id:action.payload.id,
                isError:false,
                errorMessage:'',
                first:action.payload.first
            };
            break;

        case Types.PASSWORD_CHANGED:
            return {
                ...state,
                first:false
            };
            break;
    }
    //switch ends here........

    return state;
}//.............................................

export default AuthReducer;