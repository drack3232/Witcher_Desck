import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../App.css';

function Board() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/api/contracts')
      .then(response => {
        setContracts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error connecting to backend:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>Бестіарій</h1>
        <button 
          onClick={() => navigate('/login')} 
          className="primary-btn"
        >
          Вийти
        </button>
      </div>

      {loading ? (
        <p>Завантаження даних...</p>
      ) : (
        <div className="contracts-grid"> 
          {contracts.map(contract => (
            <div key={contract.id} className="bestiary-card">
              <div className="monster-img-aside">
                <img src={contract.imageUrl || "/placeholder.jpg"} alt="monster" />
              </div>
              
              <div className="monster-content">
                <h2>{contract.target?.name || "Невідомо"}</h2>
                
                <p><strong>Локація:</strong> {contract.location}</p>
                <p><strong>Опис:</strong> {contract.description || "Опис відсутній"}</p>
                <p><strong>Статус:</strong> {contract.completed ? "Виконано" : "Активно"}</p>
                
                <div className="tactics-box">
                  <h4>Тактика бою:</h4>
                  <p>{contract.combatTactics || "Тактика невідома"}</p>
                </div>
                
                <div className="reward-tag">
                  Нагорода: {contract.target?.reward || 0}
                </div>
                
                <button className="accept-btn" disabled={contract.completed}>
                  {contract.completed ? "Виконано" : "Взяти замовлення"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Board;