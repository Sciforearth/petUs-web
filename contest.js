
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAEDtwCudzsPDzX0lRldqj17IjGRWkfT0Q",
    authDomain: "petus-18df2.firebaseapp.com",
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
    loginBttn.textContent = "Already Logged In  "
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

                getLocation()
                MA.logIn(credentials).then((MUT) => {
                    loginBttn.textContent = "already logged in"


                    //       if (isImageSelected()) {
                    //         compressAndEncodeImage().then((imageData) => {

                    //           console.log(imageData);

                    //           x.image =  imageData
                    //           return MUT.functions.callFunction(fun, x).then((rs) => {
                    //             alert("Successfully registered!")
                    //           })

                    //         })
                    //         return
                    //       }else{
                    //         return  MUT.functions.callFunction(fun, x).then((rs) => {
                    // alert("Successfully registered!")
                    // })
                    // }



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




function makeHttpRequest(url, method, data, callback) {
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Request was successful
      console.log("successfull call")
      callback(null, xhr.responseText);
    } else {
      // Request failed
      console.log("unsuccessfull call")
      callback(new Error('Request failed'));
    }
  }
};

xhr.open(method, url, true);
xhr.setRequestHeader('Content-Type', 'application/json'); // Set the appropriate content type if you're sending JSON data
xhr.send(data ? JSON.stringify(data) : null);
}

// Example usage:
const url = "https://us-east-1.aws.data.mongodb-api.com/app/analytics-wsxfv/endpoint/PetUs?page=contest"
const method = 'GET'; // Change this to 'POST', 'PUT', 'DELETE', etc. if needed
const data = {page : "PetUs contest"}; // Change this to your payload if you're making a POST or PUT request

window.onload  = makeHttpRequest(url, method, data, function (error, response) {
if (error) {
  console.error('Error:', error);
} else {
  console.log('Response:', response);
}
});


