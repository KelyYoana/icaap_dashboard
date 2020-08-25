import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// Componentes
import ResultTable from '../result-table'
import ConfigForm from '../config-form'

import GoogleApiWrapper from '../map'
// const containerStyle = {
//     height: '100%'
// }

class AppRoutes extends Component {
    render() {
        return (
            <div>
                <Route path="/result-table" component={ResultTable} />
                <Route path="/map" component={GoogleApiWrapper} />
                <Route path="/config-form" component={ConfigForm} />
            </div>
        )
    }
}


export default AppRoutes