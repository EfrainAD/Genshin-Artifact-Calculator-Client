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
import ReactTooltip from 'react-tooltip';

import './artifact.css'

// We need to get the artifact's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// CLEANUP
// we'll used a style object to lay out the toy cards I might want this. So I am keep it here.
// const cardContainerLayout = {
//     display: 'flex',
//     justifyContent: 'center',
//     flexFlow: 'row wrap'
// }

// Get artifact from the the api and display them.

const ShowArtifact = (props) => {
    const { user, msgAlert } = props
    const navigate = useNavigate()
    
    // place holder the the artifact and the artifact's id, so the API can fetch it.
    const [artifact, setArtifact] = useState(null)

    // used to update the artifact.
    const { id } = useParams()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const setBgCondition = (slot) => {
        if (slot === 'Flower') {
            return({width: '18rem', backgroundColor:'#b5ead7'})
        } else if (slot === 'Feather') {
            return({width: '18rem', backgroundColor:'#ffdac1'})
        } else if (slot === 'Sands'){
            return({width: '18rem', backgroundColor:'#ff9aa2'})
        } else if (slot === 'Goblet'){
            return({width: '18rem', backgroundColor:'#ff9aa2'})
        } else {
            return({width: '18rem', backgroundColor:'#ff9aa2'})
        }
    }

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

    let ratingArea;
    if (!artifact.ratings) {
        ratingArea = <p>{ messages["noRatingFound"] }</p>
    }
    else if (artifact.ratings.error) {
        ratingArea = <p>{ messages[artifact.ratings.messageName] }</p>
    } else {
        const ratingList = artifact.ratings.map((rating, i) => {
            return (<li key={i}>
                <ReactTooltip id={"tooltip-" + i} html="true">
                    { messages[rating.tooltipId] }
                </ReactTooltip>
                <a data-tip data-for={"tooltip-" + i} style={{textDecorationStyle: "dotted", textDecorationLine: "underline"}}>{ rating.readableName }</a>: { rating.value }
            </li>);
        })

        ratingArea = <ul style={{listStyle: "none", margin: 0, padding: 0}}>{ ratingList }</ul>
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header><h2 style={{color: 'rgb(61, 61, 132)'}}>{ artifact.name }</h2></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>slot: { artifact.slot }</small></div>
                            <div><small>level: { artifact.level }</small></div>
                            <div><small>mainStat: { artifact.mainStat }</small></div>
                            <div><small>mainStatAmount: { artifact.mainStatAmount }</small></div>
                            <div className='substats-grid'>
                                { substats }
                            </div>
                            <div style={{marginTop: "25px", marginBottom: "15px"}}>
                                <h4>Artifact Ratings</h4>
                                { ratingArea }
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