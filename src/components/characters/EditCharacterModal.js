import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CharacterForm from '../shared/CharacterForm'
// NEEDTO
// import { updateArtifactSuccess, updateArtifactFailure } from '../shared/AutoDismissAlert/messages'

const EditCharacterModal = (props) => {
    const { 
        user, show, handleClose, 
        updateCharacter, msgAlert, triggerRefresh
    } = props

    const [character, setCharacter] = useState(props.character)

    console.log('character in edit modal', character)

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

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateCharacter(user, character)
            // if we're successful in the modal, we want the modal to close
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