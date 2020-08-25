class IcaFormPoint {

    constructor(
        ICA,
        IWTotal,
        comments,
        generalTotalWeight,
        id,
        lat,
        lng,
        answerByVariableArray
    ) {
        this.ICA = ICA
        this.IWTotal = IWTotal
        this.comments = comments
        this.generalTotalWeight = generalTotalWeight
        this.id = id
        this.lat = lat
        this.lng = lng
        this.answerByVariableArray = answerByVariableArray
    }
}


export {
    IcaFormPoint
}