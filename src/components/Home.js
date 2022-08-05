import ArtifactsIndex from './artifacts/ArtifactsIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { user, msgAlert } = props

	return (
		<>
			<h2>See the Artifacts</h2>
			<ArtifactsIndex msgAlert={ msgAlert } user={ user } />
		</>
	)
}

export default Home
