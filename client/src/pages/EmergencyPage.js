import React from 'react';
import styled from 'styled-components';
import UserMap from '../components/UserMap';


export default function EmergencyPage() {
  return (
    <PageContainer>
      <UserMap />
    </PageContainer>
  )
}

const PageContainer = styled.main`
  height: 100vh;
  background-color: #303030;
`

