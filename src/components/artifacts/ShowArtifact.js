import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneArtifact, updateArtifact, removeArtifact } from '../../api/artifacts'
import messages from '../shared/AutoDismissAlert/messages'
import EditArtifactModal from './EditArtifactModal'
import ReactTooltip from 'react-tooltip';

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

const ShowArtifact = (props) => {
    const [artifact, setArtifact] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the artifact in showArtifact', artifact)
    // console.log(`${artifact.owner} === ${user._id}`)
    // destructuring to get the id value from our route parameters
    
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
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the artifact
    // this function's promise chain should send a message, and then go somewhere
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

    if (!artifact) {
        return <LoadingScreen />
    }

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
                    {/* if condistion should be removed on CLEANUP */}
                    <Card.Footer>
                        {
                            artifact.owner && user && artifact.owner === user._id
                            ?
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
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
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