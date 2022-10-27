import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: null,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#328168',
        secondary: '#ee44aa',
        accent: '#BF653F',
        error: '#722530',
        info: '#396893',
        success: '#4CAF50',
        warning: '#A37513',
        greylightentwo: 'E0E0E0',
        greylightenfive: '#FAFAFA',
        darklighten: '#383E42',
        redlighten: '#FF6B6B',
      },
      dark: {
        primary: '#328168',
        secondary: '#424242',
        accent: '#BF653F',
        error: '#ff6666',
        info: '#396893',
        success: '#4CAF50',
        warning: '#FB8C00',
        greylightenfive: '1a1a1a',
        redlighten: '#FF6B6B'
      }
    },
  },
});
