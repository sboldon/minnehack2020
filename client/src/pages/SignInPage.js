import React from 'react';
import styled, { css } from 'styled-components';
import { InfoRounded, LocalHospitalRounded, ExpandMoreRounded } from '@material-ui/icons';
import LoginForm from '../components/LoginForm';
import theme from '../models/theme';

const imageFile = process.env.PUBLIC_URL + '/landing-page-background.png';

export default function SignInPage() {
  return (
    <PageContainer>
      <Options>
        <Button color="#9BCCCB">
          <h1>LifePulse-o</h1>
          <MaterialIcon><InfoRounded /></MaterialIcon>
        </Button>
        <Button color="#E36B5D">
          <h1>Emergency</h1>
          <MaterialIcon><LocalHospitalRounded /></MaterialIcon>
        </Button>
        <Button color="#A5F37C">
          <h1>Sign In</h1>
          <MaterialIcon><ExpandMoreRounded size="large"/></MaterialIcon>
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
  align-items: center;
  justify-content: center;
`;

const Options = styled.section`
  background-color: rgba(138, 138, 138, 0.3);
  width: 90%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 45%;

  @media ${theme.mq_mobile_l} {
    margin-bottom: 30%;
    width: 80%;
  }
  @media ${theme.mq_tablet} {
    width: 60%;
    margin-bottom: 20%;
    height: 55%;
  }
  @media ${theme.mq_computer} {
    width: 45%;
    height: 50%;

  }

  @media ${theme.mq_computer_l} {
    height: 60%;
    width: 30%;
    margin-bottom: 10%;

  }
  @media ${theme.mq_computer_xl} {
  }
  @media ${theme.mq_four_k} {

  }
  @media ${theme.mq_real_big} {

  }
`;

const Button = styled.div`
  background-color: ${props => props.color};
  border-radius: 10px;
  text-align: center;
  padding: 1% 0;
  width: 75%;
  color: #454545;
`

const MaterialIcon = styled(IconBuilder)`
  padding: 0;
  margin: 0;
  color: #1E1E1E;
`;