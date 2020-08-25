import React, { Component } from 'react'
import * as FirebaseService from '../../lib/firebase'
import * as firebase from 'firebase/app'
import './style.css'

const TAG = "[new-user]"

const rowStyle = {
    cursor: 'pointer'
}
class NewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: new Array()
        }
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
        <div className="form-container ">
        <h4>Crear Nuevo Usuario</h4>
        <div >
            <div className="modal-body">
                <form id="registro">
                    <label>Nombre: </label>
                    <input type="text" id="nombre" placeholder="Ingrese el nombre completo" required></input>
                    <label>Documento:</label>
                    <input type="text" id="id" placeholder="Ingrese número de Documento" required></input>
                    <label>Email</label>
                    <input type="email" id="correos"  ></input>
                    <label>Password: </label>
                    <input type="password" id="passwords" placeholder="Ingrese password" required></input>
                    <label>Rol:</label>
                    <select id="rol" className="form-control" name="rol">
                        <option select="true">Select Rol</option>
                        <option defaultValue="Admin" id="Admin">Administrador</option>
                        <option defaultValue="AuxCampo" id="AuxCampo">Auxiliar de campo</option>
                        <option defaultValue="AuxiLabo" id="AuxiLabo">Auxiliar de laboratorio</option>
                    </select>
                    
                    </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                    <button className="btn btn-secondary" onClick={this.Btregistrar.bind(this)}>Guardar</button> 
                </div>
            </div> 
        </div>
    </div> 
       )
    }
}
export default NewUser