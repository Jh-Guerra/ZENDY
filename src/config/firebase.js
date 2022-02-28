import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCnU9tSSzZ6PFdRRxNN35DebXk4CQDWu18",
    authDomain: "kyte-crm-c251f.firebaseapp.com",
    projectId: "kyte-crm-c251f",
    storageBucket: "kyte-crm-c251f.appspot.com",
    messagingSenderId: "142060156016",
    appId: "1:142060156016:web:09d0e0c8cd60464d5d30b5",
    measurementId: "G-ZQWPWKP2VR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;