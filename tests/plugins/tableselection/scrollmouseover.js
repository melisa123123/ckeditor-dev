/* bender-tags: tableselection */
/* bender-ckeditor-plugins: tableselection */
/* bender-include: _helpers/tableselection.js */

( function() {
	'use strict';

	bender.editors = {
		classic: {
			name: 'editor1',
			creator: 'replace',
			config: {
				extraPlugins: 'divarea',
				height: 300
			}
		}
	};

	var tests = {
		// #515
		'test mouseover on scrollbar': function( editor, bot ) {
			// var bot = bender.editors.classic,
			var editable = editor.editable();

			bot.setData( '<p>Test</p><p>Test</p><p>Test</p><p>Test</p>' +
				'<p>Test</p><p>Test</p><p>Test</p><p>Test</p>' +
				'<p>Test</p><p>Test</p><p>Test</p><p>Test</p>' +
				'<p>Test</p><p>Test</p><p>Test</p><p>Test</p>' +
				'<p>Test</p><p>Test</p><p>Test</p><p>Test</p>', function() {

				editable.$.scrollTop = 150;
				editor.document.fire( 'mousemove', new CKEDITOR.dom.event( {
					target: editable.getDocument()
				} ) );

				assert.pass();
			} );

		}
	};

	tests = bender.tools.createTestsForEditors( CKEDITOR.tools.objectKeys( bender.editors ), tests );

	bender.test( tests );
} )();