function KpiCard(props) {
  const style = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    textAlign: 'center',
    width: '200px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const valueStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0',
  };

  const titleStyle = {
    fontSize: '1rem',
    color: '#666',
    margin: '0',
  };

  return (
    <div style={style}>
      <h2 style={valueStyle}>{props.value}</h2>
      <p style={titleStyle}>{props.title}</p>
    </div>
  );
}

export default KpiCard;