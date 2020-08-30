export const logIn = function(credentials){
    return (dispatch, getState, storeEnhancers) => {
        storeEnhancers.getFirebase().auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            console.log('Login success');
            
            dispatch({
                type: 'LOGIN_SUCCESS'
            });
        }).catch(err => {
            console.log('Login fail: ' + err);
            
            dispatch({
                type: 'LOGIN_ERROR',
                error: err
            });
        });
    };
}

export const logOut = function(){
    return (dispatch, getState, storeEnhancers) => {
        storeEnhancers.getFirebase().auth().signOut()
            .then(() => {
                console.log('Logout success');
                
                dispatch({
                    type: 'LOGOUT_SUCCESS'
                });
            }).catch(err => {
                console.log('Logout fail: ' + err);
                
                dispatch({
                    type: 'LOGOUT_ERROR',
                    error: err
                });
            });
    };
}

