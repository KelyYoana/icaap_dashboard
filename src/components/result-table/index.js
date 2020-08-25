import React, { Component } from 'react'
import * as firebase from 'firebase/app'
import * as FirebaseService from '../../lib/firebase'
import EditForm from '../edit-form'
import "firebase/database"
import { map, unique, each } from 'jquery'
var $ = require( "jquery" );

// import './style.css'

const TAG = "[results-table]"
const rowStyle = {
    cursor: 'pointer'
}

class tableResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: new Array(),
            orderData: new Array(),
            actual_point: null,
            isEditPointVisible: false,
            db: new Array()
        }
        this.onDataClick = this.onDataClick.bind(this)
        this.onClick = this.onClick.bind(this)
        
    }

    componentDidMount() {
        FirebaseService.initFirebase().then(successMessage => {
            return console.log(TAG, successMessage)
        })
            .then(success => {
                FirebaseService.getPoints().then(data => {
                    this.formatResults(data)
                })
            })
            .catch(error => {
                // console.log(TAG, error)
            })
    }

    formatResults(_data) {
        let data = Object.keys(_data)
        let points = new Array()
        let count = 0
        // console.log("formatting", data)
        data.forEach((element, i) => {
            count ++
            // console.log("element: ", element)
            // console.log(_data[element])
            let point = {
                // id: ´element´,
                id_complete: element,
                id: `${element.substr(0, 6)}...`,
                lat: _data[element].lat,
                lng: _data[element].long,
                coments: _data[element].coments,
                ICA: _data[element].ICA,
                IWTotal: _data[element].IWTotal,
                generalTotalWeight: _data[element].pesoGeneralTotal,
                answerByVariableArray: _data[element]._answersByVariableArray,
                temp: _data[element].tempC,
                userToma: _data[element].userToma,
                zonaHoraria:_data[element].zonaHoraria,
                userEditor:_data[element].userEditor,
                margenError: _data[element].margenError,
                puntoscardenales: _data[element].puntoscardenales,
                pesoTotalIndicados: _data[element].pesoTotalIndicados,
                indicadoresConsideradosTotal: _data[element].indicadoresConsideradosTotal
            }
            // console.log(point)
            points.push(point)
        })

        this.setState({
            data: points
        }) 
    }
  
    displayData = () => {
        return this.state.data.map((point, index) => {
            return <tr key={index}
            id={index}
            style={rowStyle}
            className="mask flex-center rgba-red-strong"
            onClick={this.onDataClick.bind(this, point)}
            // description={point.desc}
            ica={point.ICA}
            >
            <td style={{display:'none'}}>{point.id}</td>
            <td>{point.zonaHoraria}</td> 
            <td>{point.coments}</td>
            <td style={{display:'none'}}>{point.puntoscardenales}</td>
            <td>{this.roundNumbers(point.ICA)}</td>
            <td>{this.roundNumbers(point.IWTotal)}</td>
            <td>{this.roundNumbers(point.generalTotalWeight)}</td>
            <td>{this.roundNumbers(point.indicadoresConsideradosTotal)}</td>
            <td style={{display:'none'}}>{point.lat}</td>
            <td style={{display:'none'}}>{point.lng}</td>
            <td style={{textAlign:'center'}}>{point.margenError}</td>
            <td style={{textAlign:'center'}}>{point.userToma}</td>
            <td>{point.userEditor}</td>
            <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-edit-modal-lg">Editar</button></td>
            </tr>
        })
    }
    
    comentsPunto = ()=> { 
        $('#tablaEditar').hide();
        return this.state.data.map((point, index, points) => {          
            var coment = points.map(function(comentario){
                return comentario.coments
            })
            const filtrar = [...new Set(coment)]
            const comentarios = filtrar.map((filtrar) => 
                 <tr key={filtrar.toString()} >{filtrar}</tr>
                // filtrar.toString()
            );
    
             console.log(comentarios)

            return (
            <tr key={index}
            onClick = {this.onClick.bind(this, point)}
           >
               {/* <th style={{textAlign:'left'}}>{point.coments}</th> */}
               <th style={{textAlign:'left'}}>{comentarios}</th>
               
           </tr>
            );          
        })
    }
        
    onClick(point, e) {
        $('#tbody').slideUp();
        $("#tablaEditar").hide();
        let db = {}
        const cometario = point.coments;
        var count = 0;
        let database = firebase.database()
        let ref = database.ref('monitoreo1')
        ref.orderByChild("coments").equalTo(cometario).on("child_added", function(snapshot) {         
            count++; 
            var registros = snapshot.val();
            db = registros;
        });  

        function snapshotDb(){
            var registros = new Array();
            for (let i = 0; i < count; i++) {
                // const id = db.id
                const lat =db.lat
                // const long =db.long
                // const coments =db.coments
                const ICA = db.ICA
                const iwtotal = db.IWTotal
                const pesoGeneralTotal = db.pesoGeneralTotal
                const indicadoresConsideradosTotal = db.indicadoresConsideradosTotal
                // const _answersByVariableArray = db._answersByVariableArray
                // const tempC = db.tempC
                const userToma = db.userToma
                const zonaHoraria = db.zonaHoraria
                const userEditor = db.userEditor
                const margenError = db.margenError
                // const puntoscardenales = db.puntoscardenales
                console.log(lat)
                registros.push(new Array(zonaHoraria, ICA, iwtotal, pesoGeneralTotal, indicadoresConsideradosTotal, userToma,  userEditor, margenError));
            }
            return registros;
        }

        function getCells(data, type) {
            return data.map(cell => `<${type}>${cell}</${type}>`).join('');
          }
          
          function createBody(data) {
            return data.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('');
          }
          
          function createTable(data) {
            let cabeceras = ['Fecha', 'ICA', 'IWTotal', 'Peso General Total', 'Peso Total Indicadores' , 'Responsable Toma', 'Responsable Editor','Margen de error'];
            return `
            <div id ="tablaCreada" style='white-space: nowap;'> 
                <h5 style='width: 100%; align: center;'> Tabla de Resultados </h5>
                <table class="table table-bordered" style= 'table-layout: fixed; width: 100%; border-collapse: collapse; border: 1px solid black; align: center;'>
                <thead style=' border: 1px solid black;'> ${getCells(cabeceras, 'th')}</thead>
                <tr style='color:purple;'><th>Historial: </th><td colspan=6 align="left">${cometario}</td></tr> 
                <tbody style='white-space:nowap;'>${createBody(data)}</tbody>
                </table>
            </div>
            `;
          }

          var divTable = document.getElementById('tableRes');
          divTable.insertAdjacentHTML('afterbegin', createTable(snapshotDb()));
    }   

    roundNumbers(number, decimals = 1000) {
        return Math.round(number * decimals) / decimals
    }

    onDataClick(point, e) { // El evento siempre se pasa al final
        // console.log("Row clicked ", point)
        // var userEdit = document.getElementById("userEditor").innerHTML;
        // console.log(userEdit)
        // console.log("event: ", e)
        // console.log("event: ", e.target)
        // console.log("point: ", point)
        this.setState({
            actual_point: point
        })
        // alert("ICA: " + point.ICA)
    }

    // actualizarPagina(){
    //     location.reload(true);
    // }

    render() {
        $(document).ready(function(){
            $('#expandir').on('click', function(){
                $('#tbody').toggle();
                $('#tablaCreada').hide();
            })

            $('#editar').on('click', function(){
                $("#tablaEditar").show();
                $('#tablaCreada').hide();
                $('#tbody').hide();
              })
        });

        // console.log("renderizando table results")
        return (
            <div style={{margin:'70px'}}>
                <div style={{marginTop:'-50px'}}>
                    <div >
                        <div style={{width:'20%'}}>
                            <button id="editar" type="button" className="btn btn-info btn-lg">Editar Punto</button>
                        </div>
                        <div style={{tableLayout:'fixed'},{width:'100%'},{borderCollapse:'collapse'},{border:'2px solid #EAEDED '}}>
                            <table className="table">
                                <thead className="thead-dark" style={{width:'30%'}}>
                                    <tr>
                                        <th style={{letterSpacing:'2px'}}> <a id="expandir" className="expand" href="#"><span className="material-icons">expand_more</span></a>Nombre de los puntos</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody" style={{display:'none'}}>
                                {this.comentsPunto()}
                                </tbody>
                            </table>    
                               
                        </div>
                     <div id="tableRes">
                        </div>
                    </div>
                    <div id="tablaEditar" style={{display:'none'}}>
                        <h3>Tabla de Resultados</h3>
                        <div style={{tableLayout:'fixed'},{borderCollapse:'collapse'},{border:'2px solid #EAEDED '}}>
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr style={{margin:'auto'}}>
                                    {/* style={{visibility:'hidden'}} */}
                                        <th>Fecha Toma</th>
                                        <th>Nombre Punto</th>
                                        <th>ICA</th>
                                        <th>IWTotal</th>
                                        <th>WGTotal </th>
                                        <th>Peso Indicadores Utilizados</th>
                                        <th style={{display:'none'}}>lat</th>
                                        <th style={{display:'none'}}>long</th>
                                        <th>Margen de Error</th>
                                        <th>Responsable/Muestra</th>
                                        <th>Editor</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                      {this.displayData()}                          
                                </tbody>             
                            </table>
                        </div>
                    </div>
                    <hr></hr>
                    {/* aria-labellesnapshoty="myLargeModalLabel" */}
                    <div className="modal fade bd-edit-modal-lg" tabIndex="-1" role="dialog" aria-hidden="true"> 
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                            <EditForm point={this.state.actual_point} /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default tableResult