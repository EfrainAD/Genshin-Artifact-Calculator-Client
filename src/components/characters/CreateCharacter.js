import { useState } from 'react'
import { createCharacter } from '../../api/characters'
import { useNavigate } from 'react-router-dom'
import { createCharacterSuccess, createCharacterFailure } from '../shared/AutoDismissAlert/messages'
import CharacterForm from '../shared/CharacterForm'

const CreateCharacter = (props) => {
    console.log('these are the props in createCharacter\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [character, setCharacter] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    console.log('this is character in createCharacter', character)

    const handleChange = (e) => {
        setCharacter(prevCharacter => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "adoptable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "adoptable" && !e.target.checked) {
                updatedValue = false
            }

            const updatedCharacter = {
                [updatedName]: updatedValue
            }
            return {
                ...prevCharacter,
                ...updatedCharacter
            }
        })
    }

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createCharacter(user, character)
            // if we're successful, navigate to the show page for the new character
            .then(res => { navigate(`/characters/${res.data.character.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createCharacterSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createCharacterFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <CharacterForm 
            character={ character } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new character!"
        />
    )
}

export default CreateCharacter