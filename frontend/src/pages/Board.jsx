import { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import axios from 'axios';
import '../App.css';
function Board(){
    const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
axios.get('http://localhost:8081/api/contracts')
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
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🗡️ Дошка Відьмацьких Замовлень</h1>
        
        <button 
            onClick={() => navigate('/login')} 
            className="primary-btn"
            style={{ width: 'auto', marginTop: '0', padding: '10px 20px' }}
        >
            Вийти з шинку
        </button>
      </div>
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