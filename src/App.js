import React, { Component } from 'react';
import './App.css';
import Card from './Components/Card';
import CardStack from './Components/CardStack';
import SearchBar from './Components/SearchBar';
import TeamMemberCard from './Components/TeamMemberCard';

const API = `https://api.github.com/search/users`;

const background = ['#2980B9', '#27AE60', '#9B27AE', '#e67e22', '#2980B9', '#27AE60', '#2980B9'];
const imgBorder = ['#015389', '#086C32', '#6A067A', '#9D4F09', '#015389', '#086C32', '#015389'];


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        users: [],
        username: 'anujsingh',
        sets: [],
        active: false
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

  handleCardClick(event){
    this.setState({active: event});
  }

  render() {
    var main_stack;
    const users = this.state.sets;
    if(users.length > 0) {
      main_stack = <CardStack
        height={600}
        width={500}
        background="#f8f8f8"
        hoverOffset={25}>

        {this.state.sets.map((person, i) =>
          <Card
            cardClicked={this.handleCardClick.bind(this)}
            key={i}
            background={person.background}>
            <TeamMemberCard cardState={this.state.active} {...person} />
          </Card>
        )}
      </CardStack>;
    }else{
      main_stack = <img src="https://vignette.wikia.nocookie.net/combatarms/images/5/52/Loading_Screen_Human_Running_Animation.gif/revision/latest?cb=20140213033829" width="100"/>
    }
    return (
      <div>
        <SearchBar searchProfile={this.getProfile.bind(this)}/>
        { main_stack }
      </div>
    );
  }
}


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
