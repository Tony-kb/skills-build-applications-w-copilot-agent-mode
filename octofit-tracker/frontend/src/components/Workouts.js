import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [data, setData] = useState([]);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : '/api/workouts/'}`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched workouts data:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  const renderTable = () => {
    if (!data.length) return <tr><td colSpan="100%">No workouts found.</td></tr>;
    const columns = Object.keys(data[0] || {});
    return (
      <>
        <thead className="table-light">
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.id || idx}>
              {columns.map(col => <td key={col}>{item[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover align-middle">
            {renderTable()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
