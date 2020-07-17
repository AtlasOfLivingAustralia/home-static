console.log('test');

wp.domReady( function() {
  wp.blocks.unregisterBlockStyle('core/button', 'default');
  wp.blocks.unregisterBlockStyle('core/button', 'outline');
  wp.blocks.unregisterBlockStyle('core/button', 'squared');
});

wp.blocks.registerBlockStyle( 'core/button', {
  name: 'standard-button',
  label: 'ALA Button Standard',
  isDefault: true
} );

wp.blocks.registerBlockStyle( 'core/button', {
  name: 'outline-button',
  label: 'ALA Button Outlined',
} );
