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

function updatePickedTreatments(treatments, treatmentToUpdate) {
        
    if (treatmentToUpdate.addOrRemove) {treatments.push(treatmentToUpdate.treatment)
    } else {
      const idx = treatments.findIndex((treatment) => treatment._id === treatmentToUpdate.treatment._id);
      treatments.splice(idx, 1);
    }
    return treatments
  }
