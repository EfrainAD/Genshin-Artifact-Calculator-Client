import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const ArtifactForm = (props) => {
    const { artifact, handleChange, heading, handleSubmit } = props
    
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="What is your artifact's name?"
                    name="name"
                    id="name"
                    value={ artifact.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="slot">Slot</Form.Label>
                <Form.Control
                    placeholder="Slot: need cheange to list"
                    name="slot"
                    id="slot"
                    value={ artifact.slot }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="level">Level</Form.Label>
                <Form.Control
                    placeholder="What is it's level?"
                    type="number"
                    name="level"
                    id="level"
                    value={ artifact.level }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="mainStat">Main Stat</Form.Label>
                <Form.Control
                    placeholder="What is your artifact's main stat?"
                    name="mainStat"
                    id="mainStat"
                    value={ artifact.mainStat }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="mainStatAmount">Main Stat Amount</Form.Label>
                <Form.Control
                    placeholder="What is it's main stat amount?"
                    type="number"
                    name="mainStatAmount"
                    id="mainStatAmount"
                    value={ artifact.mainStatAmount }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="substatsStat">Substats stats</Form.Label>
                <Form.Control
                    placeholder="What is it's sub stats?"
                    type="string"
                    name="substatsStat"
                    id="substatsStat"
                    value={ artifact.substatsStat }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="substatsAmount">SubStats: amount</Form.Label>
                <Form.Control
                    placeholder="What is it's main stat amount?"
                    type="number"
                    name="substatsAmount"
                    id="substatsAmount"
                    value={ artifact.substatsAmount }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

// slot: { enum: ["flower", "feather", "sands", "goblet", "circlet"]},


export default ArtifactForm