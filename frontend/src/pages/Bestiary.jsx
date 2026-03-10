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
  const [selectedMonster, setSelectedMonster] = useState(null);
  const closeModal = () => setSelectedMonster(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ambientSound, setAmbientSound] = useState(null);

const [newMonster, setNewMonster] = useState({
  name: '',
  health: 100,
  description: '',
  combatTactics: '',
  reward: 0,
  imageUrl: ''
});

const playClickSound = () => {
  const audio = new Audio('/sounds/paper.mp3');
  audio.play();
}
const openModal = (monster) => {
    setSelectedMonster(monster);
    playClickSound(); 
  };
  

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
useEffect(() => {
  let trackPath = '/sounds/Kaer_Morhen.mp3';
  if (id === 1 || id === '1') trackPath = '/sounds/velen.mp3';
    else if (id === 2 || id === '2') trackPath = '/sounds/novigrad.mp3';
    else if (id === 3 || id === '3') trackPath = '/sounds/skellige.mp3';
    // Налаштовуємо звук
    const audio = new Audio(trackPath);
    audio.loop = true;
    audio.volume = 0.2;
setAmbientSound(audio);
if (isPlaying) {
      audio.play().catch(e => console.log("Браузер блокує автоплей", e));
    }
    
    return () => {
      audio.pause();
      audio.src = ''; 
    };
  }, [id])
const toggleAmbient = () => {
    if (isPlaying) {
      ambientSound.pause();
    } else {
      ambientSound.play();
    }
    setIsPlaying(!isPlaying);
  };
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
        <button 
  onClick={toggleAmbient} 
  className="primary-btn" 
  style={{ marginBottom: '20px', background: isPlaying ? '#8b0000' : '#1a1a1a' }}
>
  {isPlaying ? '🔇 Вимкнути ембієнт' : '🎵 Відчути атмосферу'}
</button>
      </div>

     

      {loading ? (
        <h2 style={{ color: '#c69b61', textAlign: 'center' }}>Досліджуємо записи...</h2>
      ) : monsters.length === 0 ? (
        <h2 style={{ color: '#c69b61', textAlign: 'center' }}>У цьому регіоні поки що спокійно.</h2>
      ) : (
        <> 
          <div className="contracts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', justifyContent: 'center' }}> 
            {monsters.map(monster => (
              
              <div 
                key={monster.id} 
                className="bestiary-card" 
                onClick={() => setSelectedMonster(monster)} 
                style={{ cursor: 'pointer' }} 
              >
                <div className="wax-seal">W</div>
                
                <div className="monster-img-aside">
                  <img src={monster.imageUrl || "/placeholder.jpg"} alt={monster.name} />
                </div>
                
                <div className="monster-content">
                  <h2 style={{ textAlign: 'center' }}>{monster.name}</h2>
                  
                  {/* Закоментовано, щоб картки були акуратнішими. Весь текст тепер у модалці! */}
                  {/* <p className="description">"{monster.description}"</p> */}
                  {/* <div className="tactics-box"> ... </div> */}
                </div>
              </div>
            ))}
          </div>

         
          {selectedMonster && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="monster-modal-content" onClick={(e) => e.stopPropagation()}>
                
                <button className="close-btn" onClick={closeModal}>✖</button>
                
                <div className="monster-modal-body">
                  <div className="monster-modal-left">
                    <img src={selectedMonster.imageUrl || "/placeholder.jpg"} alt={selectedMonster.name} />
                    <div className="combat-tactics">
                      <h4>⚔️ Майстерність бою:</h4>
                      <p>{selectedMonster.combatTactics}</p>
                    </div>
                  </div>
                  
                  <div className="monster-modal-right">
                    <h2>{selectedMonster.name}</h2>
                    <div className="monster-stats">
                      <span>❤️ Здоров'я: {selectedMonster.health}</span>
                    </div>
                    <div className="monster-description">
                      <h4>📜 З нотаток відьмака:</h4>
                      <p>{selectedMonster.description}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Bestiary;