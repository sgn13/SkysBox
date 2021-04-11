import firebase, { database } from 'firebase'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAFaZMDfJB5tzpbtOch0voN1lY2ybyKlgs",
    authDomain: "react-forms-b9896.firebaseapp.com",
    databaseURL: "https://react-forms-b9896.firebaseio.com",
    projectId: "react-forms-b9896",
    storageBucket: "react-forms-b9896.appspot.com",
    messagingSenderId: "840204064007",
    appId: "1:840204064007:web:ec88e61072fe43471ea1a2",
    measurementId: "G-WVE08XGC8Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const storage = firebase.storage();

export {
    storage, firebase as default
}


