import { useState, useEffect } from 'react'

// Display stuff
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import messages from '../shared/AutoDismissAlert/messages'

// Componets
import { getAllArtifacts } from '../../api/artifacts'

// Get all user's artifacts display them.

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center-left',
    marginTop: "25px"
}

const ArtifactsIndex = (props) => {
    console.log('Props in ArtifactsIndex', props)
    
    // User and messages
    const { user, msgAlert } = props
    const [error, setError] = useState(false)

    // Placeholder for all the user's artifacts from the DB.
    const [artifacts, setArtifacts] = useState(null)

    // Get all the artifacts from the DB
    useEffect(() => {
        console.log(props)
        getAllArtifacts(user)
            .then(res => setArtifacts(res.data.artifacts))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Artifacts',
                    message: messages.getArtifactsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])


    if (!user) {
        return <p>You need to sign in!</p>
    }
    // If there is an error fetching from the DB
    if (error) {
        return <p>Error!</p>
    }
    // If artifacts haven't been loaded yet, show a loading message
    if (!artifacts) {
        return <LoadingScreen />
     // If the user's artifacts have been loaded, but they don't have any, so there nothing to display.
    } else if (artifacts.length === 0) {
        return <p>No artifacts yet. Better add some, or <Link to={"/artifacts/seed"}>load some sample artifacts</Link>.</p>
    }

    // Puts each artifact in a little card display.
    const artifactCards = artifacts.map(artifact => {
        const mainStatSection = (
            <span>
                <strong>Main Stat: {artifact.mainStat} </strong>
                ({artifact.mainStatAmount})
            </span>
        );

        const subStatList = artifact.substats.map(sub => {
            return (
                <li key={artifact._id + "-" + sub.stat}>
                    {sub.stat} ({sub.amount})
                </li>
            )
        })
        
        const subStatSection = (
            <div style={{textAlign: "left"}}>
                <strong>Substats:</strong>
                <ul style={{listStyleType: "none", padding: "0", margin: "0 1em"}}>
                    { subStatList }
                </ul>
            </div>
        );

        return (
            <Card style={{ width: '30%', margin: 5}} key={ artifact._id }>
                <Card.Header>
                    <Link to={`/artifacts/${artifact._id}`} style={{textDecoration: "none"}}>
                        <h4 style={{margin: 0}}>{ artifact.name }</h4>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <Card.Text style={{textAlign: "left"}}>
                        {mainStatSection}
                        {subStatSection}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    })

    // Display's each artifact in it's little card display.
    return (
        <div style={ cardContainerStyle }>
            { artifactCards }
        </div>
    )
}

export default ArtifactsIndex