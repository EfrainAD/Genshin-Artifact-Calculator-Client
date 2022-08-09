import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { updateArtifactSuccess, updateArtifactFailure } from '../shared/AutoDismissAlert/messages'

// componets 
import ArtifactForm from '../shared/ArtifactForm'

const EditArtifactModal = (props) => {
    const { 
        user, show, handleClose, updateArtifact, msgAlert, triggerRefresh
    } = props

    //PlaceHolder for the Artifact going to be edited, so I'll have all the part that are not been changed.
    const [artifact, setArtifact] = useState(props.artifact)

    console.log('artifact in edit modal', artifact)

    const handleChange = (e) => {
        setArtifact(prevArtifact => {
            // the key/value pair
            const updatedName = e.target.name
            let updatedValue = e.target.value
            let updatedId = e.target.id

            // console.logs
            console.log('this is the input type', e.target.type)
            console.log('%s: %s', e.target.name, e.target.value)

            if (e.target.type === 'number') {
                updatedValue = Number(e.target.value)
            }

            let newArr = [...artifact.substats]
            let updatedArtifact = null
            
            //Checking if this is an object fuild that is inside the array substats
            // First key/value pair in the array is stat.
            if (updatedName === 'substats.stat') {
                newArr[updatedId] = {
                    ...prevArtifact.substats[updatedId],
                    stat: updatedValue
                }
                updatedArtifact = {substats: [...newArr]}
            } else if (updatedName === 'substats.amount') {
                // Second key/value pair in the array is amount
                newArr[updatedId] = {
                    ...prevArtifact.substats[updatedId],
                    amount: updatedValue
                }
                updatedArtifact = {substats: [...newArr]}
            } else {
                // If not in the array just create the key/value pair in an object
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
            // updated is in ShowArtifact's useEffect's dependency array
            // changes to the updated boolean cause ShowArtifact's useEffect to run argain.
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

    // Displays the edit pop up when the user had clicked on it.
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