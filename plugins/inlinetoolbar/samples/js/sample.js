/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/* exported initSample */

if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
	CKEDITOR.tools.enableHtml5Elements( document );

// The trick to keep the editor in the sample quite small
// unless user specified own height.
CKEDITOR.config.height = 200;
CKEDITOR.config.width = 'auto';
CKEDITOR.config.customConfig = '';
CKEDITOR.config.plugins = 'sourcearea,wysiwygarea,basicstyles,toolbar,undo,image,link,list,blockquote,table,resize,elementspath';
CKEDITOR.config.extraPlugins = 'inlinetoolbar';
CKEDITOR.on( 'instanceReady', function( e ) {
	var editor = e.editor;

	var panel = new CKEDITOR.ui.inlineToolbar( editor );

	panel.addItems( {
		bold: new CKEDITOR.ui.button( {
			command: 'bold'
		} ),
		underline: new CKEDITOR.ui.button( {
			command: 'underline'
		} ),
		link: new CKEDITOR.ui.button( {
			command: 'link'
		} ),
		unlink: new CKEDITOR.ui.button( {
			command: 'unlink'
		} )
	} );

	editor.on( 'selectionChange', function( evt ) {
		var lastElement = evt.data.path.lastElement;

		if ( lastElement ) {
			panel.attach( lastElement );
		}
	} );

	editor.on( 'mode', function() {
		panel.hide();
	} );
} );

var initSample = ( function() {
	var wysiwygareaAvailable = isWysiwygareaAvailable();

	return function() {
		var editorElement = CKEDITOR.document.getById( 'editor' );

		// Depending on the wysiwygare plugin availability initialize classic or inline editor.
		if ( wysiwygareaAvailable ) {
			CKEDITOR.replace( 'editor' );
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'editor' );

			// TODO we can consider displaying some info box that
			// without wysiwygarea the classic editor may not work.
		}
	};

	function isWysiwygareaAvailable() {
		// If in development mode, then the wysiwygarea must be available.
		// Split REV into two strings so builder does not replace it :D.
		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
			return true;
		}

		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
	}
} )();

// %LEAVE_UNMINIFIED% %REMOVE_LINE%