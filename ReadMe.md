require.ensure([], (require) => {

	require('./modules/ravno');
	$('.ttt').ravno();

});

set NODE_ENV=production
