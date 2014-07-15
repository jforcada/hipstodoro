/**
 * timer.js module. Defines the Timer class intended to
 * control the pomodoro timer.
 * @author Jaime Forcada <jaime.forcada.balaguer@gmail.com>
 */
if (!YUI.timer) {
    YUI.namespace('timer');
}

YUI.timer.Timer = {

    _seconds: null,
    _delegateCallbackEnd: null,
    _delegateCallbackUpdate: null,
    _updaterInterval: null,

    /**
     * @param {Function} delegateCallbackEnd - To be called when the countdown ends.
     * @param {Function} delegateCallbackUpdate - To be called every second to notify a timer change.
     */
    init: function(delegateCallbackEnd, delegateCallbackUpdate) {
	this._delegateCallbackEnd = delegateCallbackEnd;
	this._delegateCallbackUpdate = delegateCallbackUpdate;
	this._timeout = null;
    },

    /**
     * Starts the timeout.
     * @param {Integer} seconds
     */
    start: function(seconds) {
	this._seconds = seconds;
	if (this._updaterInterval === null) {
	    this._updaterInterval = setInterval(this._updateTimer.bind(this), 1000);
	}
    },

    /**
     * Called every second to notify the timeout update.
     */
    _updateTimer: function() {
	this._delegateCallbackUpdate(this._seconds--);
	if (this._seconds < 0) {
	    this.stop();
	    this._delegateCallbackEnd();
	}
    },

    /**
     * Stops and resets the timer.
     */
    stop: function() {
	clearInterval(this._updaterInterval);
	this._updaterInterval = null;
    }
};
