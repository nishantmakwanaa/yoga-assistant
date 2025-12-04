const Index = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f0f0', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#2d5a45', marginBottom: '1rem' }}>
        AI Yoga Assistant
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#555', marginBottom: '2rem', textAlign: 'center' }}>
        Practice yoga with real-time AI guidance
      </p>
      <button style={{
        backgroundColor: '#2d5a45',
        color: 'white',
        padding: '1rem 2rem',
        fontSize: '1.125rem',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer'
      }}>
        Start Practice
      </button>
    </div>
  );
};

export default Index;
