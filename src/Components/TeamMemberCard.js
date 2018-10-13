import React, { Component } from 'react';
import ProfilePicture from './ProfilePicture'; 

class TeamMemberCard extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div style={{ position: 'absolute', top: 0 }} >
    		<header style={styles.cardHeader} className='card-header-details'>
    			<ProfilePicture imgSrc={this.props.imgSrc} borderColor={this.props.imgBorderColor} />
    			<div>
    				<h1 style={styles.headerName}>{this.props.name}</h1>
    				<h3 style={styles.headerTitle} className='icon ion-ios-arrow-down'>{this.props.title}</h3>
    			</div>
    		</header>
      </div>
    );
  }
}
const styles = {
	cardHeader: {
		display: 'flex',
		height: '75px',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 20px',
		color: '#fff',
	},
	headerName: {
		margin: 0,
		fontWeight: 500,
		fontSize: '25px',
		textAlign: 'right'
	},
	headerTitle: {
		margin: '4px 0 0',
		fontWeight: 300,
		fontSize: '17px',
		opacity: 0.8,
		textAlign: 'right'
	},
	detailsRow: {
		row: {
			width: '100%',
			padding: '0 20px',
			display: 'flex',
			alignItems: 'center',
			margin: '25px 0',
		},
		icon: {
			display: 'block',
			width: '25px',
			height: '30px',
			margin: '0 20px 0 0',
			borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
			textAlign: 'center',
			fontSize: '22px',
		},
		title: {
			fontWeight: 500,
			fontSize: '20px',
			margin: 0,
			fontStyle: 'italic',
		},
	},
};

export default TeamMemberCard;
