import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Display inports
import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
// components
import messages from '../shared/AutoDismissAlert/messages'
// API stuff
import { getOneArtifact, updateArtifact, removeArtifact } from '../../api/artifacts'
import EditArtifactModal from './EditArtifactModal'

// Get artifact from the the api and display them.

const ShowArtifact = (props) => {
    const { user, msgAlert } = props
    const navigate = useNavigate()
    
    // place holder the the artifact and the artifact's id, so the API can fetch it.
    const [artifact, setArtifact] = useState(null)

    // used to update the artifact.
    const { id } = useParams()
    const [updated, setUpdated] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    
    console.log('user in props', user)
    console.log('the artifact in showArtifact', artifact)
    
    // Get the artifact from the API
    useEffect(() => {
        getOneArtifact(user, id)
            .then(res => setArtifact(res.data.artifact))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting artifact',
                    message: messages.getArtifactsFailure,
                    variant: 'danger'
                })
                navigate('/')
            })
    }, [updated])

    // Delete the artifact from API if user click the remove button
    const removeTheArtifact = () => {
        removeArtifact(user, id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeArtifactSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing artifact',
                    message: messages.removeArtifactFailure,
                    variant: 'danger'
                })
            })
    }
    
    // If the artifact hasn't been loaded yet, show a loading message
    if (!artifact) {
        return <LoadingScreen />
    }

    // Displays the substats array
    const substats = artifact.substats.map(substat => (
        <div className='substat'>
            <div>
                <small>Stats: { substat.stat }</small>
            </div>
            <div>
                <small>Amount: { substat.amount }</small>
            </div>
        </div>
    ))
    
    // display artifact info, and a button to edit and delete
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ artifact.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>slot: { artifact.slot }</small></div>
                            <div><small>level: { artifact.level }</small></div>
                            <div><small>mainStat: { artifact.mainStat }</small></div>
                            <div><small>mainStatAmount: { artifact.mainStatAmount }</small></div>
                            <div className='substats-grid'>
                                { substats }
                            </div>
                        </Card.Text>
                    </Card.Body>
                    {/* Buttons that the user can click. */}
                    <Card.Footer>
                        {
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Artifact
                                </Button>
                                <Button onClick={() => removeTheArtifact()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Remove {artifact.name}
                                </Button>
                            </>
                        }
                    </Card.Footer>
                </Card>
            </Container>
            {/* What shows up when the user clicked "Edit Artifact" */}
            <EditArtifactModal 
                user={user}
                artifact={artifact} 
                show={editModalShow} 
                updateArtifact={updateArtifact}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )
}

export default ShowArtifact