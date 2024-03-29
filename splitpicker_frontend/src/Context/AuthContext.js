import { useContext, createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInAnonymously } from 'firebase/auth';
import axios from "axios";
import { API_URL } from '../Variables/apiVariables';

//import { useNavigation } from '@react-navigation/core';

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [anonymousUser, setAnonymousUser] = useState(null);

    const registerNewUserOnDatabase = async (user) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.stsTokenManager.accessToken
            }
        }
        await axios.post('http://127.0.0.1:5000/create_new_user', {
            'firebase_id': user.uid,
            'email': user.email,
            'username': user.email, // for now
            'full_name': user.displayName
        }, options).then((response) => {
            console.log(JSON.stringify(response.data));
        }, (error) => {
            console.log(JSON.stringify(error));
            if (error.code === 'auth/wrong-password') {
                alert('Wrong password provided.');
            } else {
                alert('An error occurred while signing in.');
            }
        });
    }
    //const navigation = useNavigation();
    const googleSignIn = async () => {
        signOut(auth)
            .then((result) => {
                console.log("entered sign out functions");
                setUser(null);
                setAnonymousUser(null);
            })
            .catch(error => alert(error.message));
        const googleAuthProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleAuthProvider).then(async function (result) {
            const isNewUser = result._tokenResponse.isNewUser;
            console.log(isNewUser ? "This user just registered" : "Existing User");
            if (isNewUser) {
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': result.user.stsTokenManager.accessToken
                    }
                }
                await registerNewUserOnDatabase(result.user);
                /*
                await axios.post(API_URL + 'createNewUser', {
                    'user_id': result.user.uid,
                    'email': result.user.email,
                    'display_name': result._tokenResponse.displayName
                }, options).then((response) => {
                    console.log(JSON.stringify(response.data));
                }, (error) => {
                    console.log(JSON.stringify(error));
                    if (error.code === 'auth/wrong-password') {
                        alert('Wrong password provided.');
                    } else {
                        alert('An error occurred while signing in.');
                    }
                });
                */
            }
        });
        //return result;
    }

    const anonymousSignIn = async () => {
        if (false) {
            signInAnonymously(auth)
                .then(async function (result) {
                    console.log(result);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // Handle errors appropriately
                });
        }
    }



    /*
    const uploadScore = async (score, amount_of_elements) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.stsTokenManager.accessToken
            }
        }
        return axios.post(API_URL + 'uploadScore', {
            'user_id': user.uid,
            'score': score,
            'amount_of_elements': amount_of_elements,
        }, options).then((response) => {
            console.log(JSON.stringify(response.data));
        }, (error) => {
            console.log(error);
        });
    }
    */

    const signUp = () => {
        try {
            createUserWithEmailAndPassword(auth, "christopher.kim.1@stonybrook.edu", "pokemon2273")
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log("Registered as ", user.email);
                    registerNewUserOnDatabase(user);
                })
                .catch(error => alert(error.message));
        } catch (error) {
            console.log(error);
        }
    }


    const signIn = () => {
        try {
            signInWithEmailAndPassword(auth, "christopher.kim.1@stonybrook.edu", "pokemon2273")
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log("Logged in as ", user.email);
                    // Load splits?
                })
                .catch(error => alert(error.message));
        } catch (error) {
            console.log(error);
        }
    }

    const logOut = () => {
        console.log("current user", auth.currentUser);
        signOut(auth)
            .then((result) => {
                console.log("entered sign out functions");
                setUser(null);
            })
            .catch(error => alert(error.message));
        anonymousSignIn();
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (current_user) => {
            if (current_user) {
                //console.log('user' + JSON.stringify(current_user));
                if (current_user.isAnonymous) {
                    setAnonymousUser(current_user);
                }
                else {
                    setUser(current_user);
                }
                //navigation.navigate("Home")
            }
        })
        return () => unsubscribe;
    }, [user])

    return (<AuthContext.Provider value={{ user, anonymousUser, googleSignIn, anonymousSignIn, logOut }}>{children}</AuthContext.Provider>)
}

export const UserAuth = () => {
    return useContext(AuthContext)
}