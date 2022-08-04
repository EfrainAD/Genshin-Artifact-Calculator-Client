import apiUrl from '../apiConfig'
import axios from 'axios'

export const createCharacter = (user, artifactId, newCharacter) => {
    console.log('the user in createCharacter', user)
    console.log('the newCharacter in createCharacter', newCharacter)
	return axios({
		url: `${apiUrl}/characters/${artifactId}`,
		method: 'POST',
		data: { character: newCharacter }
	})
}

export const updateCharacter = (user, artifactId, updatedCharacter) => {
    console.log('this is updatedCharacter', updatedCharacter)
	return axios({
		url: `${apiUrl}/characters/${artifactId}/${updatedCharacter._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { character: updatedCharacter }
	})
}

export const deleteCharacter = (user, artifactId, characterId) => {
	return axios({
		url: `${apiUrl}/characters/${artifactId}/${characterId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}