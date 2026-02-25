import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
function Board(){
    const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get('http://localhost:8080/api/contracts')
    .then (response => {
        setContracts(response.data)
        setLoading(false)
    })
    .catch(error => {
        console.error("Error with conected your Backend:" , error)
        setLoading(false)
    })
  }, [])
return(
    <div className='app-container'>
<h1>Witcher contracts</h1>
{loading ? (
    <p>Searching contracts...</p>

) : (
    <div className='contracts-grid'> 
    {contracts.map(contract => (
        <div key={contract.id} className="contract-card">
              <h2>{contract.target.name}</h2>
              <div className="contract-details">
                <p><strong>location:</strong> {contract.location}</p>
                <p><strong>reward:</strong> <span className="reward">{contract.target.reward} crouwn</span></p>
                <p><strong>State:</strong> {contract.completed ? "✅ Completed" : "🔥 Active"}</p>
              </div>
              <button className="accept-btn" disabled={contract.completed}>
                {contract.completed ? "Done" : "Take order"}
              </button>
        </div>
    ))}
    </div>
)}

    </div>
)
}
export default Board