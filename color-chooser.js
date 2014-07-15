/**
 * color-chooser.js module. Contains the color chooser UI logic.
 * @author Jaime Forcada <jaime.forcada.balaguer@gmail.com>
 */
if (!YUI.colorChooser) {
    YUI.namespace('colorChooser');
}

YUI().use('node', 'event', function(Y) {

    YUI.colorChooser.ColorChooserController = {

	_colorChooserLinkDOM: null,
	_colorChooserDOM: null,

	/**
	 * Builds the color chooser. Attachs the main event callback.
	 */
	build: function() {
	    Y.one('.toolbox').delegate('click', this._show.bind(this), '#color-chooser-link');
	    
	    this._colorChooserDOM = Y.one('#color-chooser');
	    this._colorChooserDOM.delegate('click', this._onClickChangeColor, 'td', this);
	},

	/**
	 * Callback that shows the color chooser close to the link.
	 * @param {Y.EventFacade} e
	 */
	_show: function(e) {
	    if (!this._colorChooserTextDOM) {
		this._colorChooserTextDOM = Y.one('.color-chooser-text');
	    }
	    Y.one('html').on('click', this._close, this);
	    this._colorChooserDOM.setStyle('top', this._colorChooserTextDOM.get('offsetTop') + 25);
	    this._colorChooserDOM.setStyle('left', this._colorChooserTextDOM.get('offsetLeft') + 100);
	    this._colorChooserDOM.removeClass('hide');
	    e.preventDefault();
	    e.stopPropagation();
	},

	/**
	 * Callback for choosing a color from the photo chooser.
	 * @param {Y.EventFacade} e
	 */
	_onClickChangeColor: function(e) {
	    var elementId = e.currentTarget.get('id');
	    var colorSchema = this._getColorSchema(elementId);
	    if (colorSchema) {
		this._changeColorSchema(colorSchema);
	    }
	    this._close();
	    
	    e.preventDefault();
	},

	/**
	 * Helper method to build the color schema given the user's choice.
	 * @param {String} cellId
	 */
	_getColorSchema: function(cellId) {
	    var schema = null;
	    switch (cellId) {
	    case 'red-color':
		schema = {
		    background: '#F84747',
		    content: '#E22F2F',
		    buttons: '#C50202',
		    font: 'white'
		}
		break;
	    case 'green-color':
		schema = {
		    background: '#6DDA6D',
		    content: '#36CC36',
		    buttons: '#20AC0C',
		    font: 'black'
		}
		break;
	    case 'blue-color':
		schema = {
		    background: '#8A8DE0',
		    content: '#5F5FDD',
		    buttons: '#1E33CF',
		    font: 'white'
		}
		break;
	    case 'orange-color':
		schema = {
		    background: '#FFA645',
		    content: '#FF8500',
		    buttons: '#F0681B',
		    font: 'black'
		}
		break;
	    case 'grey-color':
		schema = {
		    background: '#DBDBDB',
		    content: '#C2C2C2',
		    buttons: '#989AA8',
		    font: 'black'
		}
		break;
	    case 'white-color':
		schema = {
		    background: '#FFFFFF',
		    content: '#F1F1F1',
		    buttons: '#DBDBDB',
		    font: 'black'
		}
		break;
	    default:
		break;
	    }
	    return schema;
	},

	/**
	 * Changes the color of the page given the color schema.
	 * @param {Object} schema
	 */
	_changeColorSchema: function(schema) {
	    Y.one('body').setStyle('background-color', schema.background);
	    Y.one('.content').setStyle('background-color', schema.content);
	    Y.one('.toolbox').setStyle('background-color', schema.content);
	    Y.one('.footer').setStyle('background-color', schema.content);
	    Y.all('button').setStyles({
		'background-color': schema.buttons,
		'border-color': schema.buttons,
		'color': schema.font
	    });
	    Y.one('body').setStyle('color', schema.font);
	},

	/**
	 * Closes the color chooser.
	 */
	_close: function() {
	    this._colorChooserDOM.addClass('hide');
	    Y.one('html').detach('click', this._closeColorChooser, this);
	},
    };
});
