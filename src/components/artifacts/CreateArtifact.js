import { useState } from 'react'
import { createArtifact } from '../../api/artifacts'
import { useNavigate } from 'react-router-dom'
import { createArtifactSuccess, createArtifactFailure } from '../shared/AutoDismissAlert/messages'
import ArtifactForm from '../shared/ArtifactForm'

import '../../components/style.css'

const CreateArtifact = (props) => {
    console.log('these are the props in createArtifact\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [artifact, setArtifact] = useState({
        name: '',
        slot: '',
        level: '',
        mainStat: '',
        mainStatAmount: '',
        substats: [{
            stat: '',
            amount: ''},{
            stat: '',
            amount: ''},{
            stat: '',
            amount: ''},{
            stat: '',
            amount: ''}]
    })

    console.log('this is artifact in createArtifact', artifact)

    const handleChange = (e) => {
        setArtifact(prevArtifact => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            let updatedId = e.target.id
            // if (updatedId = null){
            //     updatedId = 0}

            console.log('HI e.target.name: %s e.target.value: %s', e.target.name, e.target.value)

            if (e.target.type === 'number') {
                updatedValue = parseFloat(e.target.value)
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

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createArtifact(user, artifact)
            // if we're successful, navigate to the show page for the new artifact
            .then(res => { navigate(`/artifacts/${res.data.artifact.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createArtifactSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createArtifactFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <ArtifactForm 
            artifact={ artifact } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new artifact!"
        />
    )
}

export default CreateArtifact