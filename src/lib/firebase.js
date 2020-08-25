import * as firebase from 'firebase/app'
import "firebase/database"
import 'firebase/auth'
import "firebase/firestore";
import "@firebase/functions";

var $ = require( "jquery" );

  
const TAG = "[Firebase]"

const firebaseConfig = {
    apiKey: "AIzaSyCs2o0kIt4IldnnScf9mv1jHDz-oINjAKU",
    authDomain: "proyectohidra-36f38.firebaseapp.com",
    databaseURL: "https://proyectohidra-36f38.firebaseio.com",
    projectId: "proyectohidra-36f38",
    storageBucket: "proyectohidra-36f38.appspot.com",
    messagingSenderId: "995223720720",   
};

function initFirebase() {
    //console.log(TAG, "service")
    return new Promise((resolve, reject) => {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig)
            }
            console.log(`$TAG firebase`, firebase)
            resolve('firebase success')
            // return firebase
        } catch (error) {
            console.log(`$TAG error:`, error)
            reject(`error: ${error}`)
        }
    })
}

function getPoints() {
    let database = firebase.database()
    let ref = database.ref('monitoreo1')
    return new Promise((resolve, reject) => {
        ref.on("value", data => {
            console.log(TAG, "[dashboard] data from firebase: ", data.val())
            resolve(data.val())
        }, (err) => {
            console.error(err)
            reject(err)
        })
    })  
}

function updatePoint(id, data) {  
    console.log("id: ", id)
    console.log("data: ", data)
    console.log("ref: ", `monitoreo1/${id}`)
    let database = firebase.database()
    let ref = database.ref("monitoreo1/" + id)
    return ref.set(data)  
}

function udpateUser(){
    let id = document.getElementById('id').value;
    let rol = document.getElementById('rol').value;
   
    firebase.database().ref('users/' + id).update({
        rol:rol
    }, function(error){
        if(error){
            console.log("the write failed")
        }else{
            console.log("data saved")
        }
    });

}

//Método para obtener usuario
function getUser() {
    let database = firebase.database()
    let ref = database.ref('users')
      return new Promise((resolve, reject) => {
        ref.on("value", data => {
            // console.log(TAG, "[dashboard] data from firebase: ", data.val())
            resolve(data.val())
        }, (err) => {
            console.error(err)
            reject(err)
        })
        // removeDuplicate()
    })
}

// function removeDuplicate(arrayIn){
//     let db = {}
//     var database = firebase.database()
//     var ref = database.ref('monitoreo1')

//     ref.once("value", function(snap){
//         var dataBase = snap.val()


//     })


//     // ref.orderByChild("coments").on("child_added", function(snapshot) {
        
//     //     var registros = snapshot.val();
//     //     db = registros;
//     //   });
  
    

// }


//Método para crear un nuevo usuario auth y database.
function conexionRegistrar(){
    var nombre = document.getElementById('nombre').value;
    var id = document.getElementById('id').value;
    var passwords = document.getElementById('passwords').value;
    var correos = document.getElementById('correos').value;
    var rol = "Sin Permisos"

    console.log(rol)
     
    limpiar()

    firebase.auth().createUserWithEmailAndPassword(correos, passwords)
    .then(function(userId){
        var userId = firebase.auth().currentUser.uid; 
         firebase.database().ref('users/' + userId ).set({
            nombreCompleto: nombre,
            numeroIdentificacion: id,
            correoElectronico: correos,
            rol:rol,
        })  
        alert("Datos enviados")     
        // $('#newUser').remove();
    })
    .catch(function(error){
        alert( error)
    })
}

function limpiar(){
    Object.values(document.forms["registro"].getElementsByTagName("input")).forEach(element => {
        element.value = "";
    });
}

export {
    initFirebase,
    getPoints,
    updatePoint,
    conexionRegistrar,
    getUser,
    limpiar,
    udpateUser
    // removeDuplicate
}