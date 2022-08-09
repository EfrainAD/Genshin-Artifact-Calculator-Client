import { Form, Button, Container } from 'react-bootstrap'

const ArtifactForm = (props) => {
    const { artifact, handleChange, handleSubmit, 
                substats, handleSubstats, handleSubstatsAdd,
                heading} = props

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

                {substats.map((substat, index) => (
                <>
                    <Form.Label key={index} htmlFor="substatsStat">Stat </Form.Label>
                    <Form.Control
                        placeholder="Sub Stats"
                        type="string"
                        name="stat"
                        value={ substat.stat }
                        onChange={(e) => handleSubstats(e, index)}
                    />
                    <Form.Label htmlFor="substatsAmount">Amount</Form.Label>
                    <Form.Control
                        placeholder="Stat Amount"
                        type="number"
                        name="amount"
                        value={ substat.amount }
                        onChange={(e) => handleSubstats(e, index)}
                    />
                </>
                ))}
                    {substats.length < 4 
                    ? <button type='button' className='btn btn-info' onClick={handleSubstatsAdd}>Add a substat (You need {4 - substats.length}) more!</button>
                    : null }
            </Form>
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}

// slot: { enum: ["flower", "feather", "sands", "goblet", "circlet"]},


export default ArtifactForm