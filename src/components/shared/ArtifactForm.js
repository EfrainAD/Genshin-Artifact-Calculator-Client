import { Form, Button, Container } from 'react-bootstrap'

const ArtifactForm = (props) => {
    const { artifact, handleChange, heading, handleSubmit } = props
    
    let subStatsForm = [0,1,2,3]
    subStatsForm = subStatsForm.map((subStatForm, index) =>(
        <>
            <Form.Label htmlFor="substatsStat">The {index + 1} substat
                s stats</Form.Label>
                <Form.Control
                    placeholder="What is it's sub stats?"
                    type="string"
                    name="substats.stat"
                    id={ index }
                    value={ artifact.substatsStat }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="substatsAmount">The {index + 1} subStats amount</Form.Label>
                <Form.Control
                    placeholder="What is it's main stat amount?"
                    type="number"
                    name="substats.amount"
                    id={ index }
                    value={ artifact.substatsAmount }
                    onChange={ handleChange }
                />
        </>
    ))
    // console.log('HHHHHHIIIIII ', subStatsForm)

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
                {subStatsForm}
                    <div className="substat">
                        <Form.Label htmlFor="substatsStat">Stats</Form.Label>
                        <Form.Control 
                            placeholder="What is it's sub stats?"
                            type="string"
                            name="substats.stat"
                            id="0"
                            value={ artifact.substats[0].stat }
                            onChange={ handleChange }
                        />
                        <Form.Label htmlFor="substatsAmount">Amount</Form.Label>
                        <Form.Control
                            placeholder="What is it's main stat amount?"
                            type="number"
                            name="substats.amount"
                            id="0"
                            value={ artifact.substats[0].amount }
                            onChange={ handleChange }
                        />
                    </div>
                    <div className="substat">
                        <Form.Label htmlFor="substatsStat">Stats</Form.Label>
                        <Form.Control
                            placeholder="What is it's sub stats?"
                            type="string"
                            name="substats.stat"
                            id="1"
                            value={ artifact.substats[1].stat }
                            onChange={ handleChange }
                        />
                        <Form.Label htmlFor="substatsAmount">Amount</Form.Label>
                        <Form.Control
                            placeholder="What is it's main stat amount?"
                            type="number"
                            name="substats.amount"
                            id="1"
                            value={ artifact.substats[1].amount }
                            onChange={ handleChange }
                        />
                    </div>
                    <div className="substat">
                        <Form.Label htmlFor="substatsStat">Stats</Form.Label>
                        <Form.Control
                            placeholder="What is it's sub stats?"
                            type="string"
                            name="substats.stat"
                            id="2"
                            value={ artifact.substats[2].stat }
                            onChange={ handleChange }
                        />
                        <Form.Label htmlFor="substatsAmount">Amount</Form.Label>
                        <Form.Control
                            placeholder="What is it's main stat amount?"
                            type="number"
                            name="substats.amount"
                            id="2"
                            value={ artifact.substats[2].amount }
                            onChange={ handleChange }
                        />
                    </div>
                    <div className="substat">
                        <Form.Label htmlFor="substatsStat">Stats</Form.Label>
                        <Form.Control
                            placeholder="What is it's sub stats?"
                            type="string"
                            name="substats.stat"
                            id="3"
                            value={ artifact.substats[3].stat }
                            onChange={ handleChange }
                        />
                        <Form.Label htmlFor="substatsAmount">Amount</Form.Label>
                        <Form.Control
                            placeholder="What is it's main stat amount?"
                            type="number"
                            name="substats.amount"
                            id="3"
                            value={ artifact.substats[3].amount }
                            onChange={ handleChange }
                        />
                    </div>
                </div>
                <br />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

// slot: { enum: ["flower", "feather", "sands", "goblet", "circlet"]},


export default ArtifactForm