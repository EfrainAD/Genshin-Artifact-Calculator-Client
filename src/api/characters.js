import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllCharacters = (user) => {
	// console.log(user)
    return axios({
	url: apiUrl + '/characters',
	method: 'GET',
	headers: {
		Authorization: `Token token=${user.token}`,
	}
})
}

// READ => SHOW
export const getOneCharacter = (user, id) => {
    return axios({
			url: `${apiUrl}/characters/${id}`,
			method: 'GET',
			headers: {
				Authorization: `Token token=${user.token}`,
			}
		})
}

export const createCharacter = (user, newCharacter) => {
	console.log('newCharacter', newCharacter)
	return axios({
		url: apiUrl + '/characters',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { character: newCharacter }
	})
}

export const updateCharacter = (user, updatedCharacter) => {
    console.log('this is updatedCharacter', updatedCharacter)

	return axios({
		url: `${apiUrl}/characters/${updatedCharacter._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { character: updatedCharacter }
	})
}

export const removeCharacter = (user, characterId) => {
    return axios({
        url: `${apiUrl}/characters/${characterId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}