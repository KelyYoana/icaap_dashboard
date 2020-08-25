import React, { Component, useRef } from 'react'
import './style.css'
import IcaFormPoint from '../../models/ica_form'
import * as ica from '../../lib/ica'
import * as FirebaseService from '../../lib/firebase'
import { data, ready } from 'jquery'
var $ = require( "jquery" );
const TAG = "[EditForm]"


class EditForm extends Component {
     
    constructor(props) {
        super(props)

        this.DBOTextInput = React.createRef()
        this.coliformesFTextInput = React.createRef()
        this.coliformestTotTextInput = React.createRef()
        this.grasasAceitesTextInput = React.createRef()
        this.conductividadTextInput = React.createRef()
        this.alcalinidadTextInput = React.createRef()
        this.durezaTotalTextInput = React.createRef()
        this.PO4TextInput = React.createRef()
        this.clorurosTextInput = React.createRef()
        this.NO3TextInput = React.createRef()
        this.oxigenoDisueltoTextInput = React.createRef()
        this.solidosSuspendidosTextInput = React.createRef()
        this.solidosDisueltosTextInput = React.createRef()
        this.ICA_form = React.createRef()
        this.enableInput = this.enableInput.bind(this)
        this.clickInput = this.clickInput.bind(this)
        this.sendICAForm = this.sendICAForm.bind(this)
        this.updateInputValue = this.updateInputValue.bind(this)

        this.state = {
            point: props.point != null ? {
                id_complete: this.props.point.id_complete,
                ICA: this.props.point.ICA,
                IWTotal: this.props.point.IWTotal,
                coments: this.props.point.comments,
                userEditor: this.props.userEditor,
                generalTotalWeight: this.props.generalTotalWeight,
                id: this.props.id,
                lat: this.props.lat,
                lng: this.props.lng,
                answerByVariableArray: this.props.point.answersByVariableArray,
                temp: this.props.tempC,
                userToma: this.props.userToma,
                puntoscardenales: this.props.puntoscardenales,
                zonaHoraria: this.props.zonaHoraria
            } : {
                    ICA: null,
                    IWTotal: null,
                    coments: "null",
                    generalTotalWeight: null,
                    id: "null",
                    lat: null,
                    lng: null,
                    answerByVariableArray: null,
                    userToma: "null",
                    puntoscardenales:"null",
                    zonaHoraria: "null",
                }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.point !== prevProps.point) {
            this.setState({
                point: this.props.point,
            })
        }
    }

    optionalRender(input, index) {
        return input != null ? input[index].medida : 0
    }

    enableInput(input, e) {
        console.log("state: ", this.state.point.ICA)
        console.log("input: ", input.current.disabled)
        console.log("e: ", e.target)
        let button = e.target
        let action = button.innerHTML
        if (this.state.point.lat != null || this.state.point.lng) {

            input.current.disabled = input.current.disabled ? false : true
            button.innerHTML = button.innerHTML == "Editar" ? "Bloquear" : "Editar"
            if (action == "Editar") {
                input.current.value = input.current.placeholder
            }
            else if (action == "Bloquear") {
                input.current.placeholder = input.current.value
            }
            button.classList.toggle("btn-danger")
        } else {
            alert("Debe seleccionar un punto a editar")
        }
    }

    updateInputValue(ref, e) {
        const { target: { value } } = e;
        this.setState(state => {
            state.point.answerByVariableArray.forEach((item, index) => {
                if (index == ref) {
                    item.medida = value
                    return
                }
            })
            return state
        })
    }

    clickInput(input, e) { }
 
    sendICAForm(e) {
        e.preventDefault()

        let point = this.state.point
        let id = point.id_complete
        let data = new FormData(e.target)
        let ICAAnswerObject = this.calculateICA(data)
        console.log(`${TAG} data to update`, ICAAnswerObject);
        FirebaseService.updatePoint(id, ICAAnswerObject)
            .then(res => {
                console.log(TAG + "firebase response: ", res)
                alert("Data actualizada")
                window.location.reload();
                
            }).catch(error => {
                alert("Error al actualizar data")
                console.log(TAG + "firebase response: ", error)
            })
    }

    calculateICA(FormIcaData) {
        var userEditor = document.getElementById('userEdit').value;
        var userEdit = userEditor

        let point = this.state.point
        this.calculateIndex(FormIcaData)
        let ICAAnswerObject = ica.calculateICA()
        ICAAnswerObject.lat = point.lat
        ICAAnswerObject.long = point.lng
        ICAAnswerObject.userToma = point.userToma
        ICAAnswerObject.coments = this.state.point.coments
        ICAAnswerObject.tempC = point.temp
        userEdit = userEditor
        ICAAnswerObject.userEditor = userEdit
        ICAAnswerObject.puntoscardenales = point.puntoscardenales
        ICAAnswerObject.zonaHoraria = point.zonaHoraria
        return ICAAnswerObject
    }
     
    calculateIndex(data) {
        let tempC = this.state.point.temp
        // console.log("Temp: ", tempC)
        data.forEach((value, key) => {
            // console.log(TAG, `value : ${value}`)
            // console.log(TAG, `key : ${key}`)
            //con el console.log() en la línea de abajo igual se ejecuta método
            console.log(TAG, ica.calculateIndex(key, value, tempC))
        });
    }

    render() {
        console.log(TAG + "estado: ", this.state.point)
        let point = this.state.point.answerByVariableArray
        // console.log(this.userEditTextInput)
        return (
            < div className="editForm" >
                <h3>Editar Punto</h3>
                <section>
                    <div className="container-fluid">
                        <form ref={this.ICA_form}
                            name="ICA_form"
                            id="ICA_form"
                            onSubmit={this.sendICAForm}
                        >
                            <div>
                            <label> Usuario: </label>
                            <input type="text" id="userEdit" className="userEdit" readOnly="readOnly"></input> 
                                <div style={{background:'rgba(226, 224, 224, 0.445)'}}>
                                  <h5>Información</h5>
                                    <div>
                                        <p style={{ textAlign: "justify" }} >
                                            <strong>Descripción: </strong> {this.state.point.coments}
                                        </p>
                                        <p style={{ textAlign: "justify" }} >
                                        <strong> Responsable Toma: </strong> {this.state.point.userToma}
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ textAlign: "justify" }}>
                                        <strong>Cordenadas: </strong> {this.state.point.puntoscardenales}
                                        </p>
                                        <p style={{ textAlign: "justify" }}>
                                            <strong>Fecha Toma: </strong> {this.state.point.zonaHoraria}
                                        </p>
                                    </div>
                               </div>                            
                                <div className="row" style={{ paddingTop: '15px' }}>

                                    <p style={{ textAlign: "justify" }}
                                        className="col-sm-2"
                                    >
                                        <strong>pH: </strong> {this.optionalRender(point, 0)}
                                    </p>
                                    <input type="hidden"
                                        name="ph"
                                        id="ph"
                                        value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[0].medida : 0}

                                    />
                                    <p style={{ textAlign: "justify" }}
                                        className="col-sm-2"
                                    >
                                        <strong>Temp: </strong> {this.state.point.temp}
                                    </p>
                                    {/* <p style={{ textAlign: "justify" }}
                                        className="col-sm-2"
                                    >
                                        <strong>Sólidos dis: </strong> {this.optionalRender(point, 2)}
                                    </p>

                                    <input type="hidden"
                                        name="solidos_disueltos"
                                        value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[2].medida : 0}

                                    /> */}

                                    <p style={{ textAlign: "justify" }}
                                        className="col-sm-2"
                                    >
                                        <strong>Color: </strong> {this.optionalRender(point, 8)}
                                    </p>

                                    <input type="hidden"
                                        name="color"
                                        id="color"
                                        value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[8].medida : 0}

                                    />

                                    <p style={{ textAlign: "justify" }}
                                        className="col-sm-2"
                                    >
                                        <strong>Turbiedad: </strong> {this.optionalRender(point, 9)}
                                    </p>

                                    <input type="hidden"
                                        name="turbiedad"
                                        id="turbiedad"
                                        value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[9].medida : 0}

                                    />

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-3">

                                    <strong>DBO5: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[16].medida : 0}
                                            ref={this.DBOTextInput}
                                            name="dbo5"
                                            id="dbo5"
                                            onChange={this.updateInputValue.bind(this, 16)}
                                        ></input>
                                    </div>


                                </div>
                                <div className="col-sm-3">


                                    <strong>Coliformes Fecales: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[11].medida : 0}
                                            ref={this.coliformesFTextInput}
                                            name="coliformes_fecales"
                                            id="coliformes_fecales"
                                            onChange={this.updateInputValue.bind(this, 11)}
                                        >
                                        </input>
                                    </div>


                                </div>
                                <div className="col-sm-3">
                                    <strong>Coliformes Totales: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="coliformes_totales"
                                            id="coliformes_totales"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[12].medida : 0}
                                            ref={this.coliformestTotTextInput}
                                            onChange={this.updateInputValue.bind(this, 12)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Grasas y Aceites: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="grasas_y_aceites"
                                            id="grasas_y_aceites"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[15].medida : 0}
                                            ref={this.grasasAceitesTextInput}
                                            onChange={this.updateInputValue.bind(this, 15)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Cond. Eléctrica: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="conductividad_electrica"
                                            id="conductividad_electrica"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[13].medida : 0}
                                            ref={this.conductividadTextInput}
                                            onChange={this.updateInputValue.bind(this, 13)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Alcalinidad: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="alcalinidad"
                                            id="alcalinidad"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[5].medida : 0}
                                            ref={this.alcalinidadTextInput}
                                            onChange={this.updateInputValue.bind(this, 5)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Dureza total: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="durez_total"
                                            id="durez_total"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[14].medida : 0}
                                            ref={this.durezaTotalTextInput}
                                            onChange={this.updateInputValue.bind(this, 14)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>PO4: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="po4"
                                            id="po4"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[17].medida : 0}
                                            ref={this.PO4TextInput}
                                            onChange={this.updateInputValue.bind(this, 17)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Cloruros: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="cloruros"
                                            id="cloruros"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[4].medida : 0}
                                            ref={this.clorurosTextInput}
                                            onChange={this.updateInputValue.bind(this, 4)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>N03: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="nitrato"
                                            id="nitrato"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[6].medida : 0}
                                            ref={this.NO3TextInput}
                                            onChange={this.updateInputValue.bind(this, 6)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>SAAM: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="saam"
                                            id="saam"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[10].medida : 0}
                                            ref={this.NO3TextInput}
                                            onChange={this.updateInputValue.bind(this, 10)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Amoniaco: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="amoniaco"
                                            id="amoniaco"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[7].medida : 0}
                                            ref={this.NO3TextInput}
                                            onChange={this.updateInputValue.bind(this, 7)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Oxígeno disuelto: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="od"
                                            id="od"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[3].medida : 0}
                                            ref={this.oxigenoDisueltoTextInput}
                                            onChange={this.updateInputValue.bind(this, 3)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Sólidos Susp: </strong>

                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            id="solidos_suspendidos"
                                            name="solidos_suspendidos"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[1].medida : 0}
                                            ref={this.solidosSuspendidosTextInput}
                                            onChange={this.updateInputValue.bind(this, 1)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <strong>Sólidos dis: </strong>
                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            name="solidos_disueltos"
                                            id="solidos_disueltos"
                                            value={this.state.point.answerByVariableArray != null ? this.state.point.answerByVariableArray[2].medida : 0}
                                            ref={this.solidosDisueltosTextInput}
                                            onChange={this.updateInputValue.bind(this, 2)}
                                        >
                                        </input>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div>
                                <button type="submit"
                                    className="btn btn-primary"

                                // disabled="disabled"
                                >
                                    Actualizar Datos
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
        </div >
        )
    }
}

export default EditForm