import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 

function Bestiary() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const isAdmin = localStorage.getItem('userRole') === 'admin';
const [newMonster, setNewMonster] = useState({
  name: '',
  health: 100,
  description: '',
  combatTactics: '',
  reward: 0,
  imageUrl: ''
});

  useEffect(() => {
    axios.get(`http://localhost:8081/api/locations/${id}/monsters`)
      .then(response => {
        setMonsters(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Помилка зв'язку з бекендом:", error);
        setLoading(false);
      });
  }, [id]);

const handleSubmit = (e) => {
  e.preventDefault();
  
  axios.post(`http://localhost:8081/api/locations/${id}/monsters`, newMonster)
    .then(response => {
      setMonsters([...monsters, response.data]);
      setNewMonster({ name: '', description: '', combatTactics: '', reward: 0, imageUrl: '' });
      setShowForm(false);
    })
    .catch(error => console.error("Помилка при збереженні:", error));
};

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>📜 Бестіарій </h1>
        <button onClick={() => navigate('/home')} className="primary-btn">
          ⬅ Повернутися до карти
        </button>
      </div>

     

      {/* Твій список монстрів */}
      {loading ? (
        <h2 style={{ color: '#c69b61', textAlign: 'center' }}>Досліджуємо записи...</h2>
      ) : monsters.length === 0 ? (
        <h2 style={{ color: '#c69b61', textAlign: 'center' }}>У цьому регіоні поки що спокійно.</h2>
      ) : (
        <div className="contracts-grid" style={{ display: 'grid', flexDirection: 'column', alignItems: 'center', gap: '100px' }}> 
          {monsters.map(monster => (
            <div key={monster.id} className="bestiary-card">
              <div className="wax-seal">W</div>
              
              <div className="monster-img-aside">
                <img src={monster.imageUrl || "/placeholder.jpg"} alt={monster.name} />
              </div>
              
              <div className="monster-content">
                <h2>{monster.name}</h2>
                
                <p className="description">"{monster.description}"</p>
                
                <div className="tactics-box">
                  <h4>⚔️ Майстерність бою:</h4>
                  <p>{monster.combatTactics}</p>
                </div>
                
               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bestiary;