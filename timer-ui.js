/**
 * timer-ui.js module. Contains the timer UI logic.
 * @author Jaime Forcada <jaime.forcada.balaguer@gmail.com>
 */
if (!YUI.timer) {
    YUI.namespace('timer');
}

YUI().use('node', 'event', function(Y) {

    YUI.timer.TimeUIController = {

	_animationState: 1,

	/**
	 * Builds the timer object. Attachs the time event callbacks.
	 */
	build: function() {
	    YUI.timer.Timer.init(this._notifyTimeout.bind(this), this._notifyTimerUpdate.bind(this));
	    Y.one('#start-button').on('click', this._onClickStartTimer, this);
	    Y.one('#stop-button').on('click', this._onClickStopTimer, this);
	    Y.one('[name=starting-time]').on('change', this._syncCounterWithSlider, this);
	},

	/**
	 * Notify the user about the timeout of the pomodoro.
	 */
	_notifyTimeout: function() {
	    this._startAlarm();
	},

	/**
	 * Notify the user about the remaining time.
	 * @param {Integer} remainingSeconds
	 */
	_notifyTimerUpdate: function(remainingSeconds) {
	    var stringTime = this._buildStringTime(remainingSeconds);
	    Y.one('#human-time').setHTML(stringTime);
	},

	/**
	 * Returns the time in human readable form.
	 * @param {Integer} remainingSeconds
	 * @return String
	 */
	_buildStringTime: function(remainingSeconds) {
	    var minutes = String(Math.floor(remainingSeconds / 60));
	    var seconds = String(remainingSeconds % 60);
	    minutes = (minutes.length > 1) ? minutes : "0" + minutes;
	    seconds = (seconds.length > 1) ? seconds : "0" + seconds;
	    return minutes + ':' + seconds;
	},

	/**
	 * Starts the timer depending of the selected seconds in the UI.
	 */
	_onClickStartTimer: function() {
	    YUI.timer.Timer.start((Y.one('[name=starting-time]').get('value') + 5) * 60);
	    this._stopAlarm();
	},

	/**
	 * Stops the timer and resets it.
	 */
	_onClickStopTimer: function() {
	    YUI.timer.Timer.stop();
	    this._syncCounterWithSlider();
	    this._stopAlarm();
	},

	/**
	 * Updates the time counter with the value selected by the slider.
	 */
	_syncCounterWithSlider: function() {
	    var initTime = this._buildStringTime((Y.one('[name=starting-time]').get('value') + 5) * 60);
	    Y.one('#human-time').setHTML(initTime);
	},

	/**
	 * Starts the alarm of the timeout.
	 */
	_startAlarm: function() {
	    this._startAlarmAnimation();
	    this._startAlarmSound();
	},

	/**
	 * Starts the alarm animation
	 */
	_startAlarmAnimation: function() {
	    Y.one('#clock-image').addClass('clock-rotation-1');
	    this._animationInterval = setInterval(function() {
		if (this._animationState === 1) {
		    Y.one('#clock-image').addClass('clock-rotation-2');
		    Y.one('#clock-image').removeClass('clock-rotation-3');
		    this._animationState = 2;
		} else {
		    Y.one('#clock-image').addClass('clock-rotation-3');
		    Y.one('#clock-image').removeClass('clock-rotation-2');
		    this._animationState = 1;
		}
	    }.bind(this), 1000);
	},

	/**
	 * Stops the alarm animation
	 */
	_stopAlarm: function() {
	    clearInterval(this._animationInterval);
	    var clockImg = Y.one('#clock-image');
	    clockImg.removeClass('clock-rotation-1');
	    clockImg.removeClass('clock-rotation-2');
	    clockImg.removeClass('clock-rotation-3');
	},

	/**
	 * Starts the alarm sound.
	 */
	_startAlarmSound: function() {
	    var audioDOM = Y.one('audio').getDOMNode();
	    audioDOM.load();
	    audioDOM.play();
	},
    };
});
