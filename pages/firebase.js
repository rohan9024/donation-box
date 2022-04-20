import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyApdd4NYzFfpsUteHSNSSAthz0jbFQ548M",
    authDomain: "donation-box-e1627.firebaseapp.com",
    projectId: "donation-box-e1627",
    storageBucket: "donation-box-e1627.appspot.com",
    messagingSenderId: "490232444315",
    appId: "1:490232444315:web:9db9859aaebcef1096dd3e",
    measurementId: "G-QJRX4X3Y48"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
const fun = getFunctions(app)

export { db, auth, storage };
