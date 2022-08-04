import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllArtifacts = () => {
    return axios(`${apiUrl}/artifacts`)
}

// READ => SHOW
export const getOneArtifact = (id) => {
    return axios(`${apiUrl}/artifacts/${id}`)
}

export const createArtifact = (user, newArtifact) => {
	return axios({
		url: apiUrl + '/artifacts',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { artifact: newArtifact }
	})
}

export const updateArtifact = (user, updatedArtifact) => {
    console.log('this is updatedArtifact', updatedArtifact)
	return axios({
		url: `${apiUrl}/artifacts/${updatedArtifact.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { artifact: updatedArtifact }
	})
}

export const removeArtifact = (user, artifactId) => {
    return axios({
        url: `${apiUrl}/artifacts/${artifactId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}