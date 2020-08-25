import React, {Component} from 'react'
import * as firebase from 'firebase/app'
import * as FirebaseService from '../src/lib/firebase'
import './Login.css'
import App from './App'
var $ = require( "jquery" );
const TAG = "[login]"

class Login extends Component{
       constructor (props){
        super(props);
        this.BtinicioSesion = this.BtinicioSesion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
           email: '',
           password: '',
       }
    }

      BtinicioSesion(event){
        event.preventDefault();
        FirebaseService.initFirebase().then(successMessage => {
            return console.log(TAG, successMessage);
        })
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }

    handleChange(e){
        this.setState({ [ e.target.name]: e.target.value });
    }

    Btregistrar = () =>{
        FirebaseService.initFirebase().then(successMessage => {
            return console.log(TAG, successMessage)
        }).then(success => {
            FirebaseService.conexionRegistrar()
        })
        .catch(error => {
            console.log(TAG, error)
        })
    }

    render(){
        return(
            <div id="body">
            <div id="divinicioSeccion">
                <header className="navbar">
                <div className="nav-wrapper">
                    <div className="title">
                        <div>
                            <p id="connect-mode"></p>
                        </div>
                    </div>
                </div>
                </header>
            </div>
            <button type="button" className="btn btn-primary" data-toggle="modal" style={{width:'auto'}} data-target=".bd-edit-modal-lg">Solicitar Registro</button>
            <div id="divBody">
                <div className="container">
                    <div className="form-container">
                        <h4>Inicio de seccion</h4>
                        <div id="form-body" className="form">
                            <form encType="multipart/form-data" className="col s12" id="iniciarSeccion" name="iniciarSeccion">
                                <label>Email:</label>
                                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} id="email" placeholder="Ingresa usuario" required></input>
                                <label>Password: </label>
                                <input type="password" name="password"value={this.state.password} onChange={this.handleChange} id="password" placeholder="Ingrese password" required></input>
                            </form>
                        <button type="submit" onClick={this.BtinicioSesion} className='btn btn-primary'>Iniciar Seccion</button>   
                        </div>
                    </div>
                </div>
            </div>
            <div id="newUser" className="modal fade bd-edit-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Formulario de solicitud de registro</h5>
                    </div>
                    <div className="modal-body">
                        <form id="registro">
                            <label>Nombre: </label>
                            <input type="text" id="nombre" placeholder="Ingrese el nombre completo" required></input>
                            <label>Documento:</label>
                            <input type="text" id="id" placeholder="Ingrese número de Documento" required></input>
                            <label>Email</label>
                            <input type="email" id="correos" placeholder="Ingrese correo electronico" required></input>
                            <label>Password: </label>
                            <input type="password" id="passwords" placeholder="Ingrese password" required></input>
                        </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                    <button className="btn btn-secondary" onClick={this.Btregistrar.bind(this)} >Guardar</button> 
                </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}export default Login
