import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const ArtifactForm = (props) => {
    const { artifact, handleChange, heading, handleSubmit } = props
    
    // let subStatsForm = [0,1,2,3]
    // subStatsForm = subStatsForm.map((subStatForm, index) =>(
    //     <>
    //         <Form.Label htmlFor="substatsStat">The {index + 1} substat
    //             s stats</Form.Label>
    //             <Form.Control
    //                 placeholder="What is it's sub stats?"
    //                 type="string"
    //                 name="substats.stat"
    //                 id={ index }
    //                 value={ artifact.substatsStat }
    //                 onChange={ handleChange }
    //             />
    //             <Form.Label htmlFor="substatsAmount">The {index + 1} subStats amount</Form.Label>
    //             <Form.Control
    //                 placeholder="What is it's main stat amount?"
    //                 type="number"
    //                 name="substats.amount"
    //                 id={ index }
    //                 value={ artifact.substatsAmount }
    //                 onChange={ handleChange }
    //             />
    //     </>
    // ))
    // console.log('HHHHHHIIIIII ', subStatsForm)

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
                <h5>Substats</h5>
                {/* { subStatsForm } */}
                <Form.Label htmlFor="substatsStat">The 1 substat
                s stats</Form.Label>
                <Form.Control
                    placeholder="What is it's sub stats?"
                    type="string"
                    name="substats.stat"
                    id="0"
                    value={ artifact.substatsStat }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="substatsAmount">The 1 subStats amount</Form.Label>
                <Form.Control
                    placeholder="What is it's main stat amount?"
                    type="number"
                    name="substats.amount"
                    id="0"
                    value={ artifact.substatsAmount }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="substatsStat">The 2 substat
                s stats</Form.Label>
                <Form.Control
                    placeholder="What is it's sub stats?"
                    type="string"
                    name="substats.stat"
                    id="1"
                    value={ artifact.substatsStat }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="substatsAmount">The 2 subStats amount</Form.Label>
                <Form.Control
                    placeholder="What is it's main stat amount?"
                    type="number"
                    name="substats.amount"
                    id="1"
                    value={ artifact.substatsAmount }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="substatsStat">The 3 substat
                s stats</Form.Label>
                <Form.Control
                    placeholder="What is it's sub stats?"
                    type="string"
                    name="substats.stat"
                    id="2"
                    value={ artifact.substatsStat }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="substatsAmount">The 3 subStats amount</Form.Label>
                <Form.Control
                    placeholder="What is it's main stat amount?"
                    type="number"
                    name="substats.amount"
                    id="2"
                    value={ artifact.substatsAmount }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="substatsStat">The 4 substat
                s stats</Form.Label>
                <Form.Control
                    placeholder="What is it's sub stats?"
                    type="string"
                    name="substats.stat"
                    id="3"
                    value={ artifact.substatsStat }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="substatsAmount">The 4 subStats amount</Form.Label>
                <Form.Control
                    placeholder="What is it's main stat amount?"
                    type="number"
                    name="substats.amount"
                    id="3"
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