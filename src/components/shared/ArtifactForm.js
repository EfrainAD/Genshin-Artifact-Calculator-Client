import { Form, Button, Container } from 'react-bootstrap'

const ArtifactForm = (props) => {
    const { artifact, handleChange, heading, handleSubmit } = props
    
    return (
        <Container className="justify-content-center ">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                        placeholder="What is your artifact's name?"
                        name="name"
                        id="name"
                        value={ artifact.name }
                        onChange={ handleChange }
                    />

                    <Form.Label htmlFor="slot">Slot</Form.Label>
                        <Form.Select aria-label="Default select example" name="slot" value={ artifact.slot }
                        onChange={ handleChange }>
                        <option>Open this select menu</option>
                        <option value="flower" >Flower</option>
                        <option value="feather" >Feather</option>
                        <option value="sands" >Sands</option>
                        <option value="goblet" >Goblet</option>
                        <option value="circlet" >Circlet</option>
                    </Form.Select>
                    
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
                </div>
                
                <h5>Substats</h5>
                <div className='substats-grid'>
                    {subStatsForm.map((subStatForm, index) =>(
                        <>
                            <div className="substat">
                                <Form.Label htmlFor="substatsStat">Stats</Form.Label>
                                <Form.Control 
                                    placeholder="What is it's sub stats?"
                                    type="string"
                                    name="substats.stat"
                                    value={ subStatForm.stat }
                                    onChange={(e) => handleChange(e, index)}
                                />
                                <Form.Label htmlFor="substatsAmount">Amount</Form.Label>
                                <Form.Control
                                    placeholder="What is it's main stat amount?"
                                    type="number"
                                    name="substats.amount"
                                    value={ subStatForm.amount }
                                    onChange={ (e) => handleChange(e, index) }
                                />
                            </div>
                        </>
                    ))}
                </div>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ArtifactForm