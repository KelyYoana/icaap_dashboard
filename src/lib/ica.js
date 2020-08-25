const default_const_1 = 0.0001;
const default_const_2 = 0.00001;
let index = null


// const finalIcaAnswer = {
//     pesoGeneralTotal: null,
//     indicadoresConsideradosTotal: null,
//     IWTotal: null,
//     ICA: null,
//     _answersByVariableArray: new Array()
// }

// * Map para relacionar 
const icaMap = new Map();

icaMap.set("ph", {
    default: null,
    function: calculatePhIndex,
    a: null,
    b: null,
    c: null,
    e: null,
    weight: 1.0,
    indicator: (index) => {
        return index
    }
})
icaMap.set("solidos_suspendidos", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 266.5,
    b: null,
    c: null,
    e: -0.37,
    weight: 1,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})
// *! 
icaMap.set("solidos_disueltos", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 109.1,
    b: -0.0175,
    c: null,
    e: 1,
    weight: 0.5,
    indicator: (index) => {
        let response
        if (index > 100) {
            response = 100
        } else if (index < 0) {
            response = 0
        } else {
            response = index
        }
        return response
    }
})
icaMap.set("od", {
    default: null,
    function: calculateSolvedOxigen,
    a: null,
    b: null,
    c: null,
    e: null,
    weight: 5,
    indicator: (index) => {
        return index
    }
})
// *!
icaMap.set("cloruros", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 121,
    b: null,
    c: null,
    e: -0.223,
    weight: 0.5,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})
icaMap.set("alcalinidad", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 105,
    b: null,
    c: null,
    e: -0.186,
    weight: 1,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})
icaMap.set("nitrato", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 162.2,
    b: null,
    c: null,
    e: -0.3434,
    weight: 2,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})
icaMap.set("amoniaco", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 45.8,
    b: null,
    c: null,
    e: -0.343,
    weight: 2,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})
icaMap.set("color", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 123,
    b: null,
    c: null,
    e: -0.295,
    weight: 1,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})
icaMap.set("turbiedad", {
    default: default_const_2,
    function: calculateGenericIndex,
    a: 108,
    b: null,
    c: null,
    e: -0.178,
    weight: 0.5,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})
icaMap.set("saam", {
    default: default_const_1,
    function: calculateSaam,
    a: 100,
    b: -16.678,
    c: 0.1587,
    e: null,
    weight: 3,
    indicator: (index) => {
        return index > 6.384 ? 0 : index
    }
})
// *!
icaMap.set("coliformes_fecales", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 97.5 * 5,
    b: null,
    c: null,
    e: -0.27,
    weight: 4,
    indicator: (index) => {
        return index == null ? 0 : index < 0.001 ? 100 : index
    }
})
icaMap.set("coliformes_totales", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 97.5,
    b: null,
    c: null,
    e: -0.27,
    weight: 3,
    indicator: (index) => {
        return index == null ? 0 : index < 0.001 ? 100 : index
    }
})
icaMap.set("conductividad_electrica", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 540,
    b: null,
    c: null,
    e: -0.379,
    weight: 2,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})
icaMap.set("durez_total", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 10,
    b: 1.974,
    c: -0.00174,
    e: 1,
    weight: 1,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})
icaMap.set("grasas_y_aceites", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 87.25,
    b: null,
    c: null,
    e: -0.298,
    weight: 2,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})
icaMap.set("dbo5", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 120,
    b: null,
    c: null,
    e: -0.673,
    weight: 5,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})

icaMap.set("po4", {
    default: default_const_1,
    function: calculateGenericIndex,
    a: 34.215,
    b: null,
    c: null,
    e: -0.46,
    weight: 2,
    indicator: (index) => {
        return index > 100 ? 100 : index
    }
})

function calculatePhIndex(_ph) {
    let phIndex = 0;
    if (_ph < 6.7) {
        phIndex = Math.pow(10, 0.2335 * _ph + 0.44);
    } else if (6.7 <= _ph && _ph <= 7.3) {
        phIndex = 100;
    } else {
        phIndex = Math.pow(10, 4.22 - 0.293 * _ph);
    }

    return phIndex;
}

// En el caso de  *indice de coliformes fecales en NMP/100ml*
// ingresar en a el producto
//  Revisar para el caso de SAAM
/**
 * @param  {cantidad infresada en el form} _measure
 * @param  {constante por defecto cuando el inpunt es cero} _default_constant
 * @param  {primer multriplicando de la expresión matemática} _a
 * @param  {exponente, cuando la expresión no tenga exponente se ingresa 1} _e
 * @param  {cuando se debe sumar algo al primer multiplicando} _b
 * @param  {cuando se debe sumar algo (b) antes de multiplicar con la expresión final (generalmente la que va con el exponente)} _c
 */
function calculateGenericIndex(_measure, _default_constant, _a, _e, _b, _c) {


    let default_constant = formatedInput(_measure, _default_constant)
    console.log("_a: " + _a)
    console.log("_b: " + _b)
    console.log(" Math.pow(default_constant, _e):  " + Math.pow(default_constant, _e))

    index = _a * Math.pow(default_constant, _e)
    if (_b != null) {
        console.log(" _a + _b = ", _a + _b)
        index = _a + _b * Math.pow(_measure, _e)

        if (_c != null) {
            console.log(" _a + _b = ", _a + _b)
            index = _a * (_b + _c * Math.pow(default_constant, _e))
        }
    }
    return index;
}

function calculateSaam(_measure, _default_constant, _a, _e, _b, _c) {


    let default_constant = formatedInput(_measure, _default_constant)
    console.log("_a: " + _a)
    console.log("_b: " + _b)
    console.log(" Math.pow(default_constant, _e):  " + Math.pow(default_constant, _e))
    index = (_a - _b * _measure) + (_c * Math.pow(default_constant, _e))
    return index;
}

function calculateSolvedOxigen(_solvedOxigen, _temp) {


    console.log(`solvedOxige:  ${_solvedOxigen}`)
    let o_solved_field = formatedInput(_solvedOxigen, default_const_1);
    console.log(`o_solved_field:  ${o_solved_field}`)
    let o_solved_sat = calculateOD(_temp);
    console.log(`o_solved_sat:  ${o_solved_sat}`)
    let index = 0;
    if (o_solved_field != 0 && o_solved_field != 0) {
        index = (o_solved_field / o_solved_sat) * 100;
    }
    console.log(`index:  ${index}`)
    return index;
}

function calculateOD(_tempC) {
    let tempC = formatedInput(_tempC, default_const_2)
    console.log(`tempC:  ${tempC}`)
    let temp = tempC + 273.15;
    console.log(`temp:  ${temp}`)
    let lnOD = 0;
    if (_tempC || _tempC != null) {
        lnOD = -139.3441 + (1.575701 * (Math.pow(10, 5)) / temp) - (6.642308 * Math.pow(10, 7) / (Math.pow(temp, 2)))
            + 1.2438 * Math.pow(10, 10) / Math.pow(temp, 3)
    }
    console.log(`lnOD:  ${lnOD}`)
    return Math.exp(lnOD);
}

function formatedInput(_input, _default_constant) {

    if (_input != null) {
        if (_input != 0) {
            console.log("primer IF")
            return _input;
        }
        console.log("primer Else")
        return _default_constant;

    }
}

function calculateIndex(key, value, tempC) {

    let icaBase = icaMap.get(key)
    let default_const = icaBase.default
    let indicatorName = key
    let a = icaBase.a
    let e = icaBase.e
    let b = icaBase.b || null
    let c = icaBase.c || null
    // let index = null
    let indicator = null

    console.log("[ica | calculateIndex]: ", icaMap.get(key))
    console.log("[ica | calculateIndex]: ", default_const)
    console.log("[ica | calculateIndex]: a ", a)
    console.log("[ica | calculateIndex]: b ", b)
    console.log("[ica | calculateIndex]: c ", c)
    console.log("[ica | calculateIndex]: e", e)
    console.log("[ica | calculateIndex]: tempC", tempC)

    if (value == "") key = "empty_value"

    switch (key) {
        case 'ph':
            index = icaBase.function(value)
            icaBase.index = index
            indicator = icaBase.indicator(index)
            icaBase.computedIndicator = indicator
            icaBase.empty = false
            console.log(`[ica|calculateIndex] index: `, icaBase)
            console.log(`[ica|calculateIndex] indicator ${indicatorName}: `, icaBase.computedIndicator)
            break;
        case 'od':
            index = icaBase.function(value, tempC)
            icaBase.index = index
            indicator = icaBase.indicator(index)
            icaBase.computedIndicator = indicator
            icaBase.empty = false
            console.log(`[ica|calculateIndex] result ${key}: `, index)
            console.log(`[ica|calculateIndex] indicator ${indicatorName}: `, icaBase.computedIndicator)
            break;
        case "empty_value":
            icaBase.computedIndicator = 0
            icaBase.empty = true
            console.log(`[ica|calculateIndex] indicator ${indicatorName}: `, 0)
            break;
        default:
            index = icaBase.function(value, default_const, a, e, b, c)
            icaBase.index = index
            indicator = icaBase.indicator(index)
            icaBase.computedIndicator = indicator
            icaBase.empty = false
            console.log(`[ica|calculateIndex] result ${key}: `, index)
            console.log(`[ica|calculateIndex] indicator ${indicatorName}: `, icaBase.computedIndicator)
            break;
    }
    icaBase.measure = value
    calculateIW(icaBase)

}

function calculateIW(_icaBase) {
    let icaBase = _icaBase
    icaBase.IW = icaBase.weight * icaBase.computedIndicator

}

function calculateICA() {
    let IWTotal = 0
    let consideredIndicatorsTotal = 0
    let margenError
    let generalWeight = 0
    let ICA
    var answersByVariableArray = new Array()

    icaMap.forEach((icaBase, key) => {
        IWTotal += icaBase.IW
        generalWeight += icaBase.weight
        console.log(`[ica.js|calculateICA] IW : ${icaBase.IW}`)
        if (!icaBase.empty) {
            consideredIndicatorsTotal += icaBase.weight
        }
        formatAnswersArray(icaBase, key, answersByVariableArray)
        console.log(`[ica.js|calculateICA] weight : ${icaBase.weight}`)
        console.log(`[ica.js|calculateICA]-------------------------------------------`)
    });
    console.log(`[ica.js|calculateICA] IWTotal : ${IWTotal}`)
    console.log(`[ica.js|calculateICA] consideredIndicatorsTotal : ${consideredIndicatorsTotal}`)
    console.log(`[ica.js|calculateICA]-------------------------------------------`)
    ICA = IWTotal / consideredIndicatorsTotal
    let calculateMargenError = ((100*consideredIndicatorsTotal)/36.5)
    margenError = (100-calculateMargenError)
    console.log(`ICA : ${ICA}`)

    return formatFinalIcaAnswer(generalWeight, consideredIndicatorsTotal, IWTotal, ICA, answersByVariableArray, margenError)

}

function formatAnswersArray(_icaBase, _key, _answersByVariableArray) {

    const answersByVariable = {
        pesoGeneral: null,
        indicador: null,
        IW: null,
        name: null,
        medida: null
    }

    answersByVariable.name = _key
    answersByVariable.pesoGeneral = _icaBase.weight
    answersByVariable.indicador = _icaBase.computedIndicator
    answersByVariable.IW = _icaBase.IW
    answersByVariable.medida = _icaBase.measure
    _answersByVariableArray.push(answersByVariable)

}

function formatFinalIcaAnswer(generalWeight, consideredIndicatorsTotal, IWTotal, ICA, answersByVariableArray, margenError) {

    const finalIcaAnswer = {
        pesoGeneralTotal: null,
        indicadoresConsideradosTotal: null,
        margenError: null,
        IWTotal: null,
        ICA: null,
        _answersByVariableArray: new Array()
    }

    finalIcaAnswer.pesoGeneralTotal = generalWeight
    finalIcaAnswer.indicadoresConsideradosTotal = consideredIndicatorsTotal
    finalIcaAnswer.IWTotal = IWTotal
    finalIcaAnswer.margenError = margenError
    finalIcaAnswer.ICA = ICA
    finalIcaAnswer._answersByVariableArray = answersByVariableArray

    return finalIcaAnswer

}

module.exports = {
    calculateIndex,
    calculateICA
}