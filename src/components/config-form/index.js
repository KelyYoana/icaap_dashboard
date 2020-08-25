import React, { Component } from 'react'
import * as FirebaseService from '../../lib/firebase'
import './style.css'
import * as firebase from 'firebase/app'
import "firebase/database"
var $ = require( "jquery" );
const TAG = "[config-form]"

const rowStyle = {
    cursor: 'pointer'
}
class ConfigForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: new Array(),
            newUser: null,
        }
    }
    
    componentDidMount (){
        FirebaseService.initFirebase().then(successMessage => {
            return console.log(TAG, successMessage)
        }).then(success => {
            FirebaseService.getUser().then(data => {
                this.resultadoUsuario(data)
            })
        })
        .catch(error => {
            console.log(TAG, error)
        })
    }

    resultadoUsuario (_data){
        $('#registro').hide();
        let data = Object.keys(_data)
        let usuarios = new Array()
        
        data.forEach((element, i) => {
            let user = {
                id_complete: element,
                id: `${element.substr(0, 6)}...`,
                numeroIdentificacion: _data[element].numeroIdentificacion,
                nombreCompleto: _data[element].nombreCompleto,
                correoElectronico: _data[element].correoElectronico,
                rol: _data[element].rol    
            }
            usuarios.push(user)
        })
        this.setState({
            data: usuarios
        })
        console.log(usuarios)
    }

    displayData = () => {  
        $('#registro').hide();
        return this.state.data.map((user, index) => {
            return (
                <tr key={index}
                    style={rowStyle}
                    onClick={this.onClick.bind(this, user)}
                    className="mask flex-center rgba-red-strong"
                >
                    <td style={{display:'none'}}>{user.id_complete}</td>
                    <td style={{display:'none'}}>{user.id}</td>
                    <td>{user.numeroIdentificacion}</td>
                    <td>{user.nombreCompleto}</td>
                    <td>{user.correoElectronico}</td>
                    <td>{user.rol}</td>
                    <td style={{textAlign:'right'}}><button style={{width:'auto'}} type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-edit-modal-lg" ><span className="material-icons">build</span></button></td>
                </tr>
            )            
        })
        this.setState({ isRender: true })
    }

    onClick (user, e){
        const idElement = user.id_complete
        const id = user.id;
        const numeroIdentificacion = user.numeroIdentificacion;
        const nombreCompleto = user.nombreCompleto;
        const correoElectronico = user.correoElectronico;
        const rol = user.rol;

        function createFormulario () {
            return `
            <form id="registro">
                <input style='display:none;' id="id" value=${idElement}></input>
                <label>Nombre: </label>
                <label style='color:black;'>${nombreCompleto}</label>
                <br>
                <label>Documento:</label>
                <label style='color:black;'>${numeroIdentificacion}</label>
                <br>
                <label>Email</label>
                <label style='color:black;'>${correoElectronico}</label>
                <br>
                <label>Rol:</label>
                <select id="rol" className="select-css" name="rol" style='display:block; font-size: 16px; box-shadow: 0 1px 0 1px rgba(0,0,0,.03); border-radius: .3em;'>
                    <option select="true">${rol}</option>
                    <option defaultValue="Admin" id="Admin">Administrador</option>
                    <option defaultValue="AuxCampo" id="AuxCampo">Auxiliar de campo</option>
                    <option defaultValue="AuxiLabo" id="AuxiLabo">Auxiliar de laboratorio</option>
                    <option defaultValue="Sin Permisos" id="Sin Permisos">Sin Permisos</option>
                </select>
            </form>
            `;
        }

        var divForm = document.getElementById('modalBody');
        divForm.insertAdjacentHTML('afterbegin', createFormulario());

    }
    guardarCambio = ()=>{
        let id = document.getElementById('id').value;
        let rol = document.getElementById('rol').value;
        let database = firebase.database()
        let ref = database.ref("users/" );
        var userRef = ref.child(id);
        userRef.update({
            rol:rol
        })
        alert("Guardado")
        window.location.reload();
    }
    
    onDataClick(user, e) { 
        this.setState({
            newUser: user
        })
    }

    render(){
        $(document).ready(function(){
            $('#close').on('click', function(){
                $('#registro').hide();
            })
        });

        return( 
        <div className="admin">      
            <div className="TableResultUser" >
                <h3> Usuarios Registrados </h3>
                <br></br>
                <div className="divUser" style={{height:'70%'}} >
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                            <th style={{display:'none'}}>UID</th>
                            <th>Identificador</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody id="table_body">
                            {this.displayData()}
                        </tbody>
                    </table>
                </div>
            </div>  
            <div id="modal" className="modal fade bd-edit-modal-lg" tabIndex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false"> 
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Editar Usuarios</h5>
                </div>
                <div className="modal-body" id="modalBody">
                    {/* <form id="registro">
                        <label>Nombre: </label>
                        <input type="text" id="nombre" required></input>
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
                     </form> */}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" id="close">Close</button>
                    <button className="btn btn-secondary" onClick={this.guardarCambio.bind(this)}>Guardar Cambios</button>
                </div>
                </div>
            </div>
            </div>
    
        </div>
       )
    }
}
export default ConfigForm