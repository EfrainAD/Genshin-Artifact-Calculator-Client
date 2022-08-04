import { useState } from 'react'
import { createArtifact } from '../../api/artifacts'
import { useNavigate } from 'react-router-dom'
import { createArtifactSuccess, createArtifactFailure } from '../shared/AutoDismissAlert/messages'
import ArtifactForm from '../shared/ArtifactForm'

const CreateArtifact = (props) => {
    console.log('these are the props in createArtifact\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [artifact, setArtifact] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    console.log('this is artifact in createArtifact', artifact)

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