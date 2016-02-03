Polymer({
  is: 'zdkelt-input-date',
  properties: {
    value: {
      type: String,
      reflectToAttribute: true,
      observer: '_valueChanged'
    },
    i18n: {
      type: String,
      value: function() {
        return window.navigator.userLanguage || window.navigator.language;
      }
    },
    /* Define the selectable minimal date ( format : YYYY-MM-DD ) */
    minDate: {
      type: String,
      reflectToAttribute: true,
      observer: '_minDateChanged'
    },
    /* Define the selectable maximal date ( format : YYYY-MM-DD ) */
    maxDate: {
      type: String,
      reflectToAttribute: true,
      observer: '_maxDateChanged'
    },
  },
  _valueChanged: function() {

  },
  _minDateChanged: function() {

  },
  _maxDateChanged: function() {

  }
});
