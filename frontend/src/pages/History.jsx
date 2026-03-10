import { useNavigate } from 'react-router-dom';
import '../App.css'; 
import loreData from '../history.json'; 

function History() {
  const navigate = useNavigate();

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>⏳ Лор </h1>
        <button onClick={() => navigate('/home')} className="primary-btn">
          ⬅ Повернутися до карти
        </button>
      </div>

      <div className="history-timeline" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        
        {loreData.map((event) => (
          <div key={event.id} className="history-entry" style={{
            background: '#1a1a1a',
            borderLeft: '4px solid #c69b61',
            padding: '20px',
            marginBottom: '30px',
            borderRadius: '0 8px 8px 0',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
          }}>
            <span style={{ color: '#888', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {event.era}
            </span>
            <h2 style={{ color: '#c69b61', marginTop: '5px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
              {event.title}
            </h2>
            <p style={{ color: '#d3d3d3', lineHeight: '1.6', fontSize: '16px', marginTop: '15px' }}>
              {event.text}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default History;