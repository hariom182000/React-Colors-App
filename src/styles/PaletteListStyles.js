import sizes from './sizes'
import bg from './bg.svg'
export default {
	'@global':{
		'.fade-exit':{
			opacity:1
		},
		'.fade-exit-active':{
			opacity:0,
			transition:'opacity 500ms ease-out'

		}
	},
	root: {
		backgroundColor: 'blue',
		height: '100%',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		backgroundColor: '#1d41aa',
		backgroundImage:`url(${bg})`,
		 /* background by SVGBackgrounds.com */

	},
	heading:{
		fontSize:'2rem'
	},
	container: {
		width: '50%',
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		flexWrap: 'warp',
		[sizes.down('xl')]:{
			width:'70%'
		},
		[sizes.down('xs')]:{
			width:'60%'
		}
	},
	nav: {
		display: 'flex',
		width: '100%',
		color: 'white',
		justifyContent: 'space-between',
		alignItems:'center',
		color:'white',
		'& a':{
			textDecoration:'none',
			color:'white'
		}

	},
	palettes: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3,30%)',
		gridGap: '2.5rem',
		[sizes.down('md')]:{
			gridTemplateColumns: 'repeat(2,45%)',
		},
		[sizes.down('xs')]:{
			gridTemplateColumns: 'repeat(1,90%)',
			gridGap:'1.4rem'
		}
	}
};