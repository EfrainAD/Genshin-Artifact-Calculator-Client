import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ArtifactForm from '../shared/ArtifactForm'
import { updateArtifactSuccess, updateArtifactFailure } from '../shared/AutoDismissAlert/messages'

const EditArtifactModal = (props) => {
    const { 
        user, show, handleClose, 
        updateArtifact, msgAlert, triggerRefresh
    } = props

    const [artifact, setArtifact] = useState(props.artifact)

    console.log('artifact in edit modal', artifact)

    const handleChange = (e) => {
        setArtifact(prevArtifact => {
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

            const updatedArtifact = {
                [updatedName]: updatedValue
            }
            return {
                ...prevArtifact,
                ...updatedArtifact
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateArtifact(user, artifact)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateArtifactSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showArtifact component
            // updated is in ShowArtifact's useEffect's dependency array
            // changes to the updated boolean cause ShowArtifact's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateArtifactFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ArtifactForm 
                    artifact={artifact}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Artifact"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditArtifactModal