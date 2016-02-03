(function() {
	'use strict';

	Polymer({
		is: 'zdkelt-input-date',
		properties     : {
			/**
			 * Define the value of the component
			 */
			value          : {
				type              : String,
				reflectToAttribute: true,
				observer          : '_valueChanged'
			},
			/**
			 * The field label
			 */
			label: String,
			noLabelFloat: {
				type: Boolean,
				reflectToAttribute: true,
				value: false
			},
			/**
			 * indicate if the value is valid
			 */
			invalid : {
				type: Boolean,
				reflectToAttribute: true
			},
			/**
			 * Define the current locale
			 * 
			 * if no locale is given, the locale is extract from the browser preferences
			 */
			i18n         : {
				type : String,
				value: function () {
					return window.navigator.userLanguage || window.navigator.language;
				}
			},
			/**
			 * The orientation against which to align the dropdown content vertically 
			 * relative to the dropdown trigger.
			 * acceptable value are "top" or "bottom"
			 */
			verticalAlign: {
				type : String,
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
			minDate        : {
				type: String,
				observer: '_minDateChanged'
			},
			/* Define the selectable maximal date ( format : YYYY-MM-DD ) */
			maxDate        : {
				type              : String,
				observer          : '_maxDateChanged'
			},
			/**
			 * Get the date format for the current locale
			 */
			_dateFormat    : {
				type : String,
				value: function () {
					return moment.localeData()._longDateFormat.L;
				}
			}
		},
		_valueChanged  : function (newValue) {
			if (newValue) {
				moment.locale(this.i18n);
				this.$.clear.disabled = false;
				if (!moment(newValue, this._dateFormat).isValid()) {
					this.$.inputDate.invalid = true;
					this.invalid = true;
				} else {
					if( (this.$.calendar.minDate && newValue < this.$.calendar.minDate) ||
						(this.$.calendar.maxDate && newValue > this.$.calendar.maxDate)) {
						this.$.inputDate.invalid = true;
						this.invalid = true;
					} else {
						this.$.inputDate.invalid = false;
						this.invalid = false;
					}
				}
			}
		},
		/**
		 * transform the current value in the ISO format : 'YYYY-MM-DD'
		 * @returns String
		 * @private
		 */
		_formatDate : function() {
			return moment(this.value,this._dateFormat).format("YYYY-MM-DD");
		},
		/**
		 * Set the minimal acceptable value
		 * 
		 * the date must be in format "YYYY-MM-DD"
		 * @param newValue
		 * @private
		 */
		_minDateChanged: function (newValue) {
			if (moment(newValue, 'YYYY-MM-DD').isValid()) {
				this.$.calendar.minDate = moment(newValue, 'YYYY-MM-DD').format('YYYY-MM-DD');
				if( this.value && !this.invalid && this._formatDate() < this.$.calendar.minDate) {
					this.$.inputDate.invalid = true;
					this.invalid = true;
				}
			}
		},
		/**
		 * Set the maximal acceptable value
		 *
		 * the date must be in format "YYYY-MM-DD"
		 * @param newValue
		 * @private
		 */
		_maxDateChanged: function (newValue) {
			if (moment(newValue, this._dateFormat).isValid()) {
				this.$.calendar.maxDate = this._formatDate();
				if( this.value && !this.invalid && this._formatDate() > this.$.calendar.maxDate) {
					this.$.inputDate.invalid = true;
					this.invalid = true;
				}
			}
		},
		/**
		 * Reset the current value
		 * @private
		 */
		_clear          : function () {
			this.value = "";
			this.$.clear.disabled = true;
			this.$.inputDate.invalid = false;
		},
		/**
		 * Show the dropdown calendar
		 * @private
		 */
		_showCalendar   : function () {
			if (this.value && !this.$.inputDate.invalid) {
				moment.locale(this.i18n);
				this.$.calendar.value = moment(this.value, this._dateFormat).format('YYYY-MM-DD');
				this.$.calendar.initDate = this.$.calendar.value;

			} else {
				this.$.calendar.value = '';
				this.$.calendar.initDate = moment().format('YYYY-MM-DD');

			}
			if(this.size) {
				this.$.calendar.style.width = this.size+'px';
				this.$.calendar.style.height = this.size+'px';
				this.$.calendar.style.fontSize = ((this.size / 300) * 100)+'%';
			}
			
			this.$.dropdown.open();
		},
		/**
		 * Get the selected value from the calendar and close
		 * the dropdown
		 * @private
		 */
		_setNewValue   : function () {
			moment.locale(this.i18n);
			this.value = moment(this.$.calendar.value).format('L');
			this.$.dropdown.close();
			this.$.clear.disabled = false;
		}

	});
})();