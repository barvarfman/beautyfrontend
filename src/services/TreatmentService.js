import HttpService from './HttpService'

export default {
    getTreatments,
    getById,
    remove,
    update
}



function getTreatments() {
    return HttpService.get('treatment')
}

function getById(treatmentId) {
    return HttpService.get(`treatment/${treatmentId}`)
}
function remove(treatmentId) {
    return HttpService.delete(`treatment/${treatmentId}`)
}

function update(treatment) {
    return HttpService.put(`treatment/${treatment._id}`, treatment)
}


