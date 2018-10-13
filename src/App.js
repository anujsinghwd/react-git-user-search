import React, { Component } from 'react';
import './App.css';
import people from './people';
import Card from './Card';
import CardStack from './CardStack';

const API = `https://api.github.com/search/users`;

const background = ['#2980B9', '#27AE60', '#9B27AE', '#e67e22', '#2980B9', '#27AE60', '#2980B9'];
const imgBorder = ['#015389', '#086C32', '#6A067A', '#9D4F09', '#015389', '#086C32', '#015389'];


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        users: [],
        username: 'anujsingh',
        sets: []
    };
  }

  componentWillMount(){
      this.getProfile(this.state.username);
  }


  getProfile(username){
    var hihi = [];
    let finalURL = `${API}?q=${username}`;
      fetch(finalURL)
        .then((res) => res.json())
        .then((data) => {
          var user_data = data.items.splice(0, 7);
          user_data.forEach(function(item, i){
              var render_users = {
                name: item.login,
                background: background[i],
                imgSrc: item.avatar_url,
                imgBorderColor: imgBorder[i],
                title: item.type,
                mobileNo: null,
                location: null,
                role: 'Vella'
              };
              hihi.push(render_users);
          })
          this.setState({sets: hihi});
        })
       .catch((error) => console.log('There was a problem in fetching data'));
    }

  render() {
    var main_stack;
    const users = this.state.sets;
    if(users.length > 0) {
      main_stack = <CardStack
        height={600}
        width={450}
        background="#f8f8f8"
        hoverOffset={25}>

        {this.state.sets.map((person, i) =>
          <Card
            key={i}
            background={person.background}>
            <TeamMemberCard {...person} />
          </Card>
        )}
      </CardStack>;
    }else{
      main_stack = <img src="https://vignette.wikia.nocookie.net/combatarms/images/5/52/Loading_Screen_Human_Running_Animation.gif/revision/latest?cb=20140213033829" width="100"/>
    }
    return (
      <div>
        { main_stack }
      </div>
    );
  }
}

const Loader = () => (
  <div id="escapingBallG">
  	<div id="escapingBall_1" className="escapingBallG"></div>
  </div>
);

const ProfilePicture = ({ imgSrc, borderColor }) => (
	<img
		style={{
			width: '60px',
			height: '60px',
			borderRadius: '100%',
			border: `3px solid ${borderColor}`,
		}}
		src={imgSrc}
	/>
);

const DetailsRow = ({ icon, title, summary }) => {
	const renderSummary = () => {
		if (summary)	return (
			<p style={{ fontWeight: 300, lineHeight: 1.45 }}>
				{summary}
			</p>
		);
		return null;
	};

	return (
		<div style={styles.detailsRow.row}>
			<span
			className={`icon ${icon}`}
			style={{ ...styles.detailsRow.icon, alignSelf: 'flex-start' }}
			/>
			<div style={{ width: '80%' }}>
				<h2 style={styles.detailsRow.title}>
					{title}
				</h2>
				{renderSummary()}
			</div>
		</div>
	);
};

const TeamMemberCard = (props) => (
	<div style={{ position: 'absolute', top: 0 }} onClick={props.onClick}>
		<header style={styles.cardHeader} className='card-header-details'>
			<ProfilePicture imgSrc={props.imgSrc} borderColor={props.imgBorderColor} />
			<div>
				<h1 style={styles.headerName}>{props.name}</h1>
				<h3 style={styles.headerTitle} className='icon ion-ios-arrow-down'>{props.title}</h3>
			</div>
		</header>

		<div style={{color: '#fff'}}>
			<DetailsRow
				icon='ion-ios-telephone-outline'
				title={props.mobileNo}
			/>

			<DetailsRow
				icon='ion-ios-location-outline'
				title={props.location}
			/>

			<DetailsRow
				icon='icon ion-ios-paper-outline'
				title='Main Role'
				summary={props.role}
			/>
		</div>
  </div>
);

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

export default App;
