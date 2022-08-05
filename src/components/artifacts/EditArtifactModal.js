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
            const updatedName = e.target.name
            let updatedValue = e.target.value
            let updatedId = e.target.id
            // if (updatedId = null){
            //     updatedId = 0}

            console.log('HI e.target.name: %s e.target.value: %s', e.target.name, e.target.value)

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            let newArr = [...artifact.substats]
            let updatedArtifact = null
            
            if (updatedName === 'substats.stat') {
                newArr[updatedId] = {
                    ...prevArtifact.substats[updatedId],
                    stat: updatedValue
                }
                updatedArtifact = {substats: [...newArr]}
            } else if (updatedName === 'substats.amount') {
                console.log('EEEEEEEEEEe.target.id/updatedId: ', updatedId)
                newArr[updatedId] = {
                    ...prevArtifact.substats[updatedId],
                    amount: updatedValue
                }
                updatedArtifact = {substats: [...newArr]}
                // console.log('this updatedArtifact: ', updatedArtifact)
            } else {
                updatedArtifact = {
                    ...prevArtifact.substats,
                    [updatedName]: updatedValue
                }
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