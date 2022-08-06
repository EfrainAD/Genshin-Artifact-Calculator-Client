// import './style.css' // Why dont I need this css here??

const IndexButtons = (props) => {

     // So I can read and change the filter value.
     const { filter, setFilter } = props
     
     console.log('Props in IndexButtons', props)

     // Used set the correct button to have class named is-active, so the user can see which button is selected.
     const artifactCheck = () => (filter === 'artifacts' ? 'is-active' : null)
     const characterCheck = () => (filter === 'characters' ? 'is-active' : null)

     return (
          <>
               <button className={`button left-button ${artifactCheck()}`}
               onClick={()=>{setFilter('artifacts')}}
               >My Artifacts
               </button>
               <button className={`button right-button ${characterCheck()}`}
               onClick={()=>{setFilter('characters')}}
               >My Characters
               </button>
          </>
     )
} 
export default IndexButtons