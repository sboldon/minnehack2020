import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserMap from '../components/UserMap';

export default function EmergencyPage() {
  const [isActive, setPulseState] = useState(false);
  const uid = localStorage.getItem('user');

  useEffect(() => {
    const updateDB = async() => {
      const res = await axios.put(`/users/${uid}/pulse-state`, { isActive });
      console.log(res);
    }

    updateDB();
  }, [isActive, uid]);

  const togglePulse = () => {
    setPulseState(!isActive);
  };

  return (
    <PageContainer>
      <UserMap uid={uid} togglePulse={togglePulse}/>
    </PageContainer>
  )
}

const PageContainer = styled.main`
  height: 100vh;
  background-color: #303030;
`

