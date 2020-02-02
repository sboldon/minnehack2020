const theme = {
  baseFontSize: '1em',
  baseLineHeight: '1.5',
  headerLineHeight: '2.5',

  fontFamily: {
    sansSerif: '"Josefin Sans", sans-serif',
    display: '"Comfortaa", sans-serif'
  },

  // < 320 px is mobile_s
  breakPoints: {
    mobile_m: '320px',
    mobile_l: '375px',
    tablet: '425px',
    computer: '768px',
    computer_l: '1024px',
    computer_xl: '1440px',
    four_k: '1920px',
    real_big: '2560px'
  },

  get mq_mobile_m() {
    return `(min-width: ${this.breakPoints.mobile_m})`; 
  },
  get mq_mobile_l() {
    return `(min-width: ${this.breakPoints.mobile_l})`; 
  },
  get mq_tablet() {
    return `(min-width: ${this.breakPoints.tablet})`;
  },
  get mq_computer() {
    return `(min-width: ${this.breakPoints.computer})`;
  },
  get mq_computer_l() {
    return `(min-width: ${this.breakPoints.computer_l})`;
  },
  get mq_computer_xl() {
    return `(min-width: ${this.breakPoints.computer_xl})`;
  },
  get mq_four_k() {
    return `(min-width: ${this.breakPoints.four_k})`;
  },
  get mq_real_big() {
    return `(min-width: ${this.breakPoints.real_big})`;
  }
};

export default theme;