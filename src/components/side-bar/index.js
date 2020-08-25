import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './style.css'
import 'firebase/auth'

class SideBar extends Component {
    constructor(props){
        super(props);
        this.state ={
            sidebarSticky:false
        };
    }
   
    draweToggleClickHandler = () =>{
        this.setState((prevState) =>{
            // return {sidebarSticky: !prevState.sidebarSticky};
        });
    }

      render() {
        return (
            <div>  
                <nav className="navLater">
                    <div className="sidebarSticky">
                       <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/result-table" className="nav-link active" ><span className="material-icons">assignment_turned_in</span>
                                <span data-feather="home" className="link-text"></span> 
                                Tabla de Resultados <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item" >
                            <Link to="/map" className="nav-link"> <span className="material-icons" >pin_drop</span>
                             <span data-feather="home" className="link-text"></span>
                                Mapa
                            </Link>
                        </li>
                        <li className="nav-item" id="config" >
                            <Link to="/config-form" className="nav-link"> <span className="material-icons" >settings</span>
                             <span data-feather="home" className="link-text"></span>
                             Configuración de Usuario
                            </Link>
                        </li>
                                             
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="shopping-cart"></span>
                                Products
            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="users"></span>
                                Customers
            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="bar-chart-2"></span>
                                Reports
            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="layers"></span>
                                Integrations
            </a>
                        </li>
                    </ul>

                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Saved reports</span>
                        <a className="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                Current month
            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                Last quarter
            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                Social engagement
            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                Year-end sale
            </a>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}
export default SideBar