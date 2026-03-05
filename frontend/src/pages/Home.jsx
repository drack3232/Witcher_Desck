import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Змінив на одну крапку, щоб точно не було помилки імпорту

function Home() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    { id: 1, name: "Велен", image: "https://i.playground.ru/p/j8XCdr4Ln09d3eWXv5aoVA.jpeg.webp" },
    { id: 2, name: "Новіград", image: "https://i.playground.ru/p/yGWVoFNknhoW4CCq8qeEyw.jpeg.webp" },
    { id: 3, name: "Скелліге", image: "https://i.playground.ru/p/M4ggqmbhq_VD-P0yBxLbHw.jpeg.webp" }
  ];

  return (
    <div className="board-container">
      <div className="board-header">
        <img 
          src="/wolf.png" 
          alt="Witcher Logo" 
          style={{ width: '200px', marginBottom: '20px', filter: 'drop-shadow(0 0 10px #7a1515)' }} 
        />
        <h1>Вибір Локації</h1>
      </div>

      <div className="contracts-grid">
        {locations.map(loc => (
          <div 
            key={loc.id} 
            className="location-card" 
            onClick={() => setSelectedLocation(loc)}
          >
            <img src={loc.image} alt={loc.name} />
            <h2>{loc.name}</h2>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div className="modal-overlay" onClick={() => setSelectedLocation(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            
           
            <button className="close-x-btn" onClick={() => setSelectedLocation(null)}>✖</button>

            <h2>{selectedLocation.name}</h2>
            <p>Що ви хочете дослідити у цьому регіоні?</p>
            
            <div className="modal-actions">
              <button className="primary-btn" onClick={() => navigate(`/history/${selectedLocation.id}`)}>
                📜 Історія локації
              </button>
              <button className="primary-btn" onClick={() => navigate(`/bestiary/${selectedLocation.id}`)}>
                🐺 Бестіарій локації
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => navigate('/login')} 
        className="primary-btn"
        style={{ marginTop: '40px' }}
      >
        Вийти з шинку
      </button>
    </div>
  );
}

export default Home;