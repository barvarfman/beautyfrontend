import HttpService from './HttpService'

export default {
    getTreatments,
    getById,
    remove,
    update,
    updatePickedTreatments
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

function updatePickedTreatments(reducerPickedTreatments, action) {
        
    if (action.treatmentObj.addOrRemove === 'add') {
      reducerPickedTreatments.push(action.treatmentObj.treatment)
    } else {
      const treatmentIdx = reducerPickedTreatments.findIndex((treatment) => treatment._id === action.treatmentObj.treatment._id);
      reducerPickedTreatments.splice(treatmentIdx, 1);
    }
    return reducerPickedTreatments
  }
