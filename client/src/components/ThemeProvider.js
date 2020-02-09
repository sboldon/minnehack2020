import { createGlobalStyle } from 'styled-components';
import theme from '../models/theme';

const ThemeProvider = createGlobalStyle`
  html,body {
    margin: 0;
    padding: 0;
    font-size: ${theme.baseFontSize};
    line-height: ${theme.baseLineHeight};
    font-family: ${theme.fontFamily.sansSerif};
  }
  ul,
  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
  }
  h1 {
    padding: 0;
    margin: 0;
  }

  @media ${theme.mq_mobile_m} {
  }
  @media ${theme.mq_mobile_l} {
  }
  @media ${theme.mq_tablet} {
  }

  @media ${theme.mq_computer} {
    body {
      font-size: calc(${theme.baseFontSize} * 1.1);
    }
  }

  @media ${theme.mq_computer_l} {
    body {
      font-size: calc(${theme.baseFontSize} * 1.2);
      line-height: calc(${theme.baseLineHeight} * 1.2);
    }
  }
  @media ${theme.mq_computer_xl} {
  }
  @media ${theme.mq_four_k} {
    body {
      font-size: calc(${theme.baseFontSize} * 1.4);
    }
  }
  @media ${theme.mq_real_big} {
    body {
      font-size: calc(${theme.baseFontSize} * 1.6);
    }
  }
`

export default ThemeProvider