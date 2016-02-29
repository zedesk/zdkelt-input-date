(function() {
    'use strict';

    Polymer({
        is: 'zdkelt-input-date',
        properties: {
            /**
             * Define the value of the component
             */
            value: {
                type: String,
                reflectToAttribute: true,
                value: '',
                notify: true,
                observer: '_valueChanged'
            },
            /**
             * The displayed date in the locale format
             */
            _displayValue: {
                type: String
            },
            /**
             * The field label
             */
            label: String,
            /**
             *
             */
            noLabelFloat: {
                type: Boolean,
                reflectToAttribute: true,
                value: false
            },
            /**
             * indicate if the value is invalid
             */
            invalid: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true
            },
            /**
             * Define the current locale
             *
             * if no locale is given, the locale is extract from the browser preferences
             */
            i18n: {
                type: String,
                value: function() {
                    return window.navigator.userLanguage || window.navigator.language;
                },
                observer: '_i18nChanged'
            },
            /**
             * The orientation against which to align the dropdown content vertically
             * relative to the dropdown trigger.
             * acceptable value are "top" or "bottom"
             */
            verticalAlign: {
                type: String,
                value: 'top'
            },
            /**
             * The orientation against which to align the dropdown content horizontally
             * relative to the dropdown trigger.
             * acceptable value are "left" or "right"
             */
            horizontalAlign: {
                type: String,
                value: 'left'
            },
            /**
             * Define the size of the dropdown calendar
             */
            size: Number,
            /* Define the selectable minimal date ( format : YYYY-MM-DD ) */
            minDate: {
                type: String,
                observer: '_minDateChanged'
            },
            /* Define the selectable maximal date ( format : YYYY-MM-DD ) */
            maxDate: {
                type: String,
                observer: '_maxDateChanged'
            },
            /**
             * The error message to disaply if the value is invalid
             */
            errorMessage: {
                type: String,
                value: '',
                notify: true
            }
        },

        listeners: {
            'tap': '_onDialogClick'
        },

        _onDialogClick: function(event) {
            var target = event.target;
            while (target && target !== this) {
                if (target.hasAttribute) {
                    if (target.hasAttribute('dropdown-dismiss')) {
                        this.$.dropdown.close();
                        break;
                    } else if (target.hasAttribute('dropdown-confirm')) {
                        moment.locale(this.i18n);
                        this.value = this.$.calendar.value;
                        this._displayValue = moment(this.value, 'YYYY-MM-DD').format('L');
                        this.$.dropdown.close();
                        this.$.clear.disabled = false;
                        this.fire('change', this.value);
                        break;
                    }
                }
                target = target.parentNode;
            }
        },

        /**
         *
         */
        _dateFormat: function() {
            moment.locale(this.i18n);
            return moment.localeData()._longDateFormat.L;
        },
        /**
         *
         */
        _valueChanged: function(newValue) {
            if (newValue) {
                moment.locale(this.i18n);
                this.$.clear.disabled = false;
                if (!moment(newValue, 'YYYY-MM-DD').isValid()) {
                    this.$.inputDate.invalid = true;
                    this.invalid = true;
                    this._displayValue = newValue;
                    this.value = '';
                } else {
                    if ((this.$.calendar.minDate && newValue < this.$.calendar.minDate) ||
                        (this.$.calendar.maxDate && newValue > this.$.calendar.maxDate)) {
                        this.$.inputDate.invalid = true;
                        this.invalid = true;
                    } else {
                        this.value = newValue;
                        this.$.inputDate.invalid = false;
                        this.invalid = false;
                        this._displayValue = moment(this.value, 'YYYY-MM-DD').format('L');
                    }
                }
            }
        },
        _i18nChanged: function(newValue) {
            if (!this.invalid && this.value) {
                this._displayValue = moment(this.value, 'YYYY-MM-DD').format('L');
            }
        },
        /**
         * transform the current value in the ISO format : 'YYYY-MM-DD'
         */
        _formatDate: function(value) {
            return moment(value).format('YYYY-MM-DD');
        },
        /**
         * Set the minimal acceptable value
         *
         * the date must be in format "YYYY-MM-DD"
         */
        _minDateChanged: function(newValue) {
            if (moment(newValue, 'YYYY-MM-DD').isValid()) {
                this.$.calendar.minDate = this._formatDate(newValue);
                if (this.value && !this.invalid && this._formatDate(this.value) < this.$.calendar.minDate) {
                    this.$.inputDate.invalid = true;
                    this.invalid = true;
                }
            }
        },
        /**
         * Set the maximal acceptable value
         *
         * the date must be in format "YYYY-MM-DD"
         */
        _maxDateChanged: function(newValue) {
            if (moment(newValue, 'YYYY-MM-DD').isValid()) {
                this.$.calendar.maxDate = this._formatDate(newValue);
                if (this.value && !this.invalid && this._formatDate(this.value) > this.$.calendar.maxDate) {
                    this.$.inputDate.invalid = true;
                    this.invalid = true;
                }
            }
        },
        /**
         * Reset the current value
         */
        _clear: function() {
            this.value = '';
            this._displayValue = '';
            this.$.clear.disabled = true;
            this.$.inputDate.invalid = false;
        },
        /**
         * Show the dropdown calendar
         */
        _showCalendar: function() {
            if (this.value && !this.$.inputDate.invalid) {
                this.$.calendar.value = this._formatDate(this.value);
                this.$.calendar.initDate = this.$.calendar.value;

            } else {
                this.$.calendar.value = '';
                this.$.calendar.initDate = moment().format('YYYY-MM-DD');

            }
            if (this.size) {
                this.$.calendar.style.width = this.size + 'px';
                this.$.calendar.style.height = this.size + 'px';
                this.$.calendar.style.fontSize = ((this.size / 300) * 100) + '%';
            }

            this.$.dropdown.open();
        },
        /**
         * Get the selected value from the calendar and close
         * the dropdown
         */
        _setNewValue: function() {
            if (this.querySelector('[dropdown-confirm]') ) { return; }  
            moment.locale(this.i18n);
            this.value = this.$.calendar.value;
            this._displayValue = moment(this.value, 'YYYY-MM-DD').format('L');
            this.$.dropdown.close();
            this.$.clear.disabled = false;
            this.fire('change', this.value);
        },
        /**
         *
         */
        _checkEvent: function() {
            var oldValue = this.value;
            moment.locale(this.i18n);
            if (this._displayValue && this._displayValue.length === this._dateFormat().length && moment(this._displayValue, this._dateFormat()).isValid()) {
                this.invalid = false;
                this._valueChanged(moment(this._displayValue, this._dateFormat()).format('YYYY-MM-DD'));
                this.fire('change', this.value);
            } else {
                this.set('invalid', true);
            }
            if (this._displayValue) {
                this.$.clear.disabled = false;
            }
        }
    });
})();
