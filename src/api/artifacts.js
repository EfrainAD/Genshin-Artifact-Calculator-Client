import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllArtifacts = (user) => {
	// console.log(user)
    return axios({
	url: apiUrl + '/artifacts',
	method: 'GET',
	headers: {
		Authorization: `Token token=${user.token}`,
	}
})
}

// READ => SHOW
export const getOneArtifact = (user, id) => {
    return axios({
		url: apiUrl + '/artifacts/' + id,
		method: 'GET',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
	//`${apiUrl}/artifacts/${id}`)
}

export const createArtifact = (user, newArtifact) => {
	console.log('newArtifact', newArtifact)
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
		url: `${apiUrl}/artifacts/${updatedArtifact._id}`,
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

export const seedArtifacts = (user) => {
	return axios({
		url: `${apiUrl}/artifacts/seed`,
		method: "GET",
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	});
}