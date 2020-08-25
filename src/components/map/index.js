import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import * as firebase from 'firebase/app'
import "firebase/database"
import * as FirebaseService from '../../lib/firebase'

const TAG = "[map]"

const firebaseConfig = {
    apiKey: "AIzaSyCs2o0kIt4IldnnScf9mv1jHDz-oINjAKU",
    authDomain: "proyectohidra-36f38.firebaseapp.com",
    databaseURL: "https://proyectohidra-36f38.firebaseio.com",
    projectId: "proyectohidra-36f38",
    storageBucket: "proyectohidra-36f38.appspot.com",
    messagingSenderId: "995223720720"
};



class MapContainer extends Component {

    constructor(props) {

        super(props)
        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.state = {
            isFirebaseLoad: false,
            isRender: false,
            points: [],
            pointone: null,
            activeMarker: {
                description: "",
                props: {
                    position: {
                        lat: "",
                        lng: ""
                    },
                    ICA: ""
                }

            },
            isInfoWindowVisible: false
        }



    }

    componentDidMount() {
        this.initFirebase()
    }

    initFirebase() {

        // try {
        //     if (!firebase.apps.length) {
        //         firebase.initializeApp(firebaseConfig);
        //     }
        //     console.log('[Firebase] firebase: ', firebase)
        //     this.setState({ isFirebaseLoad: true })
        //     this.getPoints()
        // } catch (error) {
        //     console.log('error: ' + error);
        // }
        FirebaseService.initFirebase().then(successMessage => {
            this.getPoints()
        }).catch(error => {
            console.log(TAG, error)
        })


    }

    getPoints() {
        // let database = firebase.database()
        // let ref = database.ref('monitoreo1')

        // ref.on("value", (data) => {
        //     console.log("[dashboard] data from firebase: ", data.val())
        //     console.log("[dashboard] data from firebase: ", typeof (data.val()))
        //     this.formatResults(data.val())
        // }, (err) => {
        //     console.error(err)
        // })
        FirebaseService.getPoints().then(data => {
            this.formatResults(data)
        }).catch(error => {
            console.log(TAG, `error: ${error}`)
        })
        // this.formatResults(data)

    }

    formatResults(_data) {
        let data = Object.keys(_data)
        let points = new Array()
        console.log("formatting", data)
        data.forEach((element, i) => {
            console.log(_data[element])
            let point = {
                lat: _data[element].lat,
                lng: _data[element].long,
                desc: _data[element].coments,
                ICA: _data[element].ICA
            }
            console.log(point)
            points.push(point)
        })
        this.setState({ points: points })
        this.setState({ pointone: points[5] })
        // console.log("pointone", this.state.pointone)
        // console.log(`state.points`, this.state.points[5].lat)
        this.displayMarkers()

    }

    displayMarkers = () => {


        return this.state.points.map((point, index) => {

            return <Marker key={index} id={index} position={{
                lat: Number(point.lat),
                lng: Number(-point.lng)
            }}
                onClick={this.onMarkerClick}
                description={point.desc}
                ICA={point.ICA}
            />

        })
        this.setState({ isRender: true })

    }

    onMarkerClick(props, marker, e) {
        console.log("[onMarkerClick] marker props: ", props)
        console.log("[onMarkerClick] marker : ", marker)
        console.log("[onMarkerClick] e: ", e)

        let markerToRender = marker
        markerToRender.props = props
        this.setState({
            activeMarker: markerToRender,
            isInfoWindowVisible: true
        })
    }

    render() {
        return (
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{ lat: 6.55952, lng: -73.13637 }}
                    mapTypeControl={true}
                    mapType="hybrid"
                >

                    {this.displayMarkers()}
                    {<InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.isInfoWindowVisible}>
                        <div>
                            <p>{this.state.activeMarker.description}</p>
                            <p><strong>Geolocalización: </strong></p>
                            <p> Lat: {this.state.activeMarker.props.position.lat}</p>
                            <p>Lng: {this.state.activeMarker.props.position.lng}</p>
                            <p><strong>ICA: </strong> </p>
                            <p>{Math.round(this.state.activeMarker.props.ICA * 10000) / 10000}</p>
                        </div>
                    </InfoWindow>}

                </Map>
        );
    }
}
const mapStyles = {
    width: '50%',
    height: '90vh',
    left: '350px',
    top: '-5px',
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCdQEBbg7z2ofHYEbR5TWyEDlozLGidsII',
})(MapContainer);