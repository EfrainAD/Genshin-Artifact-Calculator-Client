// import ArtifactsIndex from './artifacts/ArtifactsIndex'
import './style.css'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props

	return (
		<>
			<h2>See the Artifacts</h2>
			{/* <ArtifactsIndex msgAlert={ msgAlert } /> */}
		</>
	)
}

export default Home
