
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAEDtwCudzsPDzX0lRldqj17IjGRWkfT0Q",
    authDomain: "auth.petus.co",
    databaseURL: "https://petus-18df2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "petus-18df2",
    storageBucket: "petus-18df2.appspot.com",
    messagingSenderId: "912025262195",
    appId: "1:912025262195:web:7980be0dc88597a7d7f206",
    measurementId: "G-LC53SP7XYB"
};
const A = initializeApp(firebaseConfig);
const AL = getAnalytics(A);
const MA = new Realm.App({ id: "petus-android-kpkrg" });
const Ath = getAuth();
const Pv = new GoogleAuthProvider()
var longitude, latitude;


const loader = document.getElementById('loader');

const loginBttn = document.getElementById("login");




if (MA.currentUser?.id) {
    loginBttn.disabled = true
    loginBttn.textContent = "Already Registered "
    loginBttn.style.color =  "#000000"
    loginBttn.style.backgroundColor = "#d5d5d5"

}


loginBttn.onclick = function () {
   
    if (!MA.currentUser?.id) {
        // loader.classList.remove('hidden');

        signInWithPopup(Ath, Pv).then((r) => {


            const user = r.user;
            user.getIdToken().then(tk => {
                const credentials = Realm.Credentials.jwt(tk)
                // loader.classList.add('hidden');
                console.log(tk)

               
                MA.logIn(credentials).then((MUT) => {
                    loginBttn.textContent = "Done"

                        return MUT.functions.callFunction("registerForContest",{coords : [longitude,latitude]} ).then((rs) => {
                                alert("Successfully registered!")
                              })

                  


                })
            });

            

        });

    }

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(longitude + "..." + latitude)

}