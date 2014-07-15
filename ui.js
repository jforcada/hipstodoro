/**
 * ui.js module. Contains the UI logic.
 * @author Jaime Forcada <jaime.forcada.balaguer@gmail.com>
 */
YUI().use('node', 'event', function(Y) {

    var UIController = {

	/**
	 * Initializes the UI module.
	 */
	init: function(ColorChooser, UITimeController) {
	    ColorChooser.build();
	    UITimeController.build();
	},

    };

    // Auto init the system
    UIController.init(YUI.colorChooser.ColorChooserController, YUI.timer.TimeUIController);

});
