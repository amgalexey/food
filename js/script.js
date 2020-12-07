window.addEventListener('DOMContentLoaded', () => {
const calculate = require('./modules/calculate'),
      cards = require('./modules/cards'),
      forms = require('./modules/forms'),
      modal = require('./modules/modal'),
      slider = require('./modules/slider'),
      tabs = require('./modules/tabs'),
      timer = require('./modules/timer')
       calculate();
       cards();
       forms();
       modal();
       slider();
       tabs();
       timer();
})

