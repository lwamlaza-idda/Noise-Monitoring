import React, { useEffect, useState } from 'react';
import Page from './Page';
import { database } from '../firebase';
import { ref, onValue, off } from 'firebase/database';

const Dashboard = () => {
  const [latest, setLatest] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deviceLocations, setDeviceLocations] = useState({});

  useEffect(() => {
    const usersRef = ref(database, '/');
    const handleData = (snapshot) => {
      const usersData = snapshot.val();
      let all = [];
      let locations = {};
      if (usersData) {
        Object.entries(usersData).forEach(([userId, userObj]) => {
          // Store device location
          if (userObj.location) {
            locations[userId] = userObj.location;
          }
          const data = userObj.data || {};
          Object.entries(data).forEach(([date, times]) => {
            Object.entries(times).forEach(([time, value]) => {
              all.push({
                deviceId: userId,
                date,
                time,
                ...value
              });
            });
          });
        });
        all.sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
        setLatest(all[0]);
        setRecent(all.slice(0, 10));
        setDeviceLocations(locations);
      } else {
        setLatest(null);
        setRecent([]);
        setDeviceLocations({});
      }
      setLoading(false);
    };
    onValue(usersRef, handleData);
    return () => off(usersRef, 'value', handleData);
  }, []);

  return (
    <Page title="Noise Monitoring Dashboard">
      {loading ? (
        <p>Loading data...</p>
      ) : latest ? (
        <>
          <div style={{
            background: '#3498db', color: 'white', padding: 24, borderRadius: 8, marginBottom: 24,
            boxShadow: '0 2px 8px rgba(52,152,219,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{margin: 0}}>Latest Reading</h2>
              <div style={{fontSize: 32, fontWeight: 700}}>{latest.level} dB</div>
              <div style={{fontSize: 16}}>at {latest.time} on {latest.date.replace(/_/g, '-')}</div>
              <div style={{fontSize: 14}}>Location: {deviceLocations[latest.deviceId]?.Latitude}, {deviceLocations[latest.deviceId]?.Longitude}</div>
              <div style={{fontSize: 14}}>Tamper: {latest.tamper ? 'Yes' : 'No'}</div>
            </div>
            <div style={{fontSize: 48, opacity: 0.2}}>🔊</div>
          </div>
          <h3>Recent Readings</h3>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.05)'}}>
              <thead>
                <tr style={{background: '#f5f6fa'}}>
                  <th style={{padding: 8, textAlign: 'left'}}>Date</th>
                  <th style={{padding: 8, textAlign: 'left'}}>Time</th>
                  <th style={{padding: 8, textAlign: 'left'}}>Level (dB)</th>
                  <th style={{padding: 8, textAlign: 'left'}}>Charge</th>
                  <th style={{padding: 8, textAlign: 'left'}}>Tamper</th>
                  <th style={{padding: 8, textAlign: 'left'}}>DeviceID</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i} style={{borderTop: '1px solid #eee'}}>
                    <td style={{padding: 8}}>{r.date.replace(/_/g, '-')}</td>
                    <td style={{padding: 8}}>{r.time}</td>
                    <td style={{padding: 8}}>{r.level}</td>
                    <td style={{padding: 8}}>{typeof r.charge !== 'undefined' ? r.charge : '-'}</td>
                    <td style={{padding: 8}}>{r.tamper ? 'Yes' : 'No'}</td>
                    <td style={{padding: 8}}>{r.deviceId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No data available.</p>
      )}
    </Page>
  );
};

export default Dashboard; 