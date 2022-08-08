import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { updateCharacterSuccess, updateCharacterFailure } from '../shared/AutoDismissAlert/messages'

// componets
import CharacterForm from '../shared/CharacterForm'

const EditCharacterModal = (props) => {
    const { 
        user, show, handleClose, 
        updateCharacter, msgAlert, triggerRefresh
    } = props

    //PlaceHolder for the Character going to be edited, so I'll have all the part that are not been changed.
    const [character, setCharacter] = useState(props.character)

    console.log('character in edit modal', character)

    const handleChange = (e) => {
        setCharacter(prevCharacter => {
            // the key/value pair
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // console.logs
            console.log('this is the input type', e.target.type)
            console.log('%s: %s', e.target.name, e.target.value)

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            // Create the key/value pair in an object
            const updatedCharacter = {
                [updatedName]: updatedValue
            }
            return {
                ...prevCharacter,
                ...updatedCharacter
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateCharacter(user, character)
            // if successful cose the modal.
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateCharacterSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showCharacter component
            // updated is in ShowCharacter's useEffect's dependency array
            // changes to the updated boolean cause ShowCharacter's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateCharacterFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CharacterForm 
                    character={character}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Character"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCharacterModal