import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { InfoRounded, LocalHospitalRounded, ExpandMoreRounded } from '@material-ui/icons';
import LoginForm from '../components/LoginForm';
import theme from '../models/theme';

const imageFile = process.env.PUBLIC_URL + '/landing-page-background.jpg';

const handleSignInAnimation = (state, setState) => {
  setState(!state);
  console.log(state);
}

export default function SignInPage() {
  const [isSignIn, setSignInState] = useState(false);

  return (
    <PageContainer>
      <Options isSignIn={isSignIn}>
        <Button color='#9BCCCB'>
          <h1>LifePulse</h1>
          <MaterialIcon color='#333333'>
            <InfoRounded/>
          </MaterialIcon>
        </Button>
        <Button color='#E36B5D'>
          <h1>Emergency</h1>
          <MaterialIcon color='#333333'>
            <LocalHospitalRounded />
          </MaterialIcon>
        </Button>
        <Button color='#B6CC9D' onClick={() => handleSignInAnimation(isSignIn, setSignInState)} >
          <h1>Sign In</h1>
          <MaterialIcon color='#333333'>
            <ExpandMoreRounded size='large'/>
          </MaterialIcon>
        </Button>
      </Options>
      <LoginForm />
    </PageContainer>
  )
}


const IconBuilder = ({className, children}) => (
  <>
  {React.cloneElement(children, { className })}
  </>
)

const PageContainer = styled.main`
  padding-top: -50px;
  height: 100vh;
  width: 100vw;
  background-image: url(${imageFile});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Options = styled.section`
  position: ${ props => props.isSignIn ? 'absolute' : 'static'};
  top: ${ props => props.isSignIn ? '-700px' : '15%'};

  transition: top 1.2s;

  flex-shrink: 0;
  background-color: rgba(138, 138, 138, 0.3);
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 15%;


  @media ${theme.mq_mobile_l} {
    width: 65%;
    margin-bottom: 17.5%;
  }
  @media ${theme.mq_tablet} {
    width: 60%;
    height: 55%;
  }
  @media ${theme.mq_computer} {
    width: 40%;
    height: 50%;

  }
  @media ${theme.mq_computer_l} {
    height: 50%;
    width: 30%;

  }
  @media (max-height: 675px) {
    margin-bottom: 0;
    height: 70%;
  }
  @media (max-height: 800px) {
    margin-bottom: 0;
    height: 65%;
  }
  @media ${theme.mq_computer_xl} {
  }
  @media ${theme.mq_four_k} {

  }
  @media ${theme.mq_real_big} {

  }
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  background-color: ${props => props.color};
  border-radius: 5px;
  box-shadow: 0px 3px 8px #808080;
  padding: 1% 0;
  width: 65%;
  color: #444444;
  border: solid 0.45px #5D5D5D;

/* 
  &.sign-in {
    margin-bottom: 500px;
  } */

  @media (max-height: 600px) {
    flex-direction: row;
  }
`

const MaterialIcon = styled(IconBuilder)`
  margin: 0;
  color: ${props => props.color};
`;