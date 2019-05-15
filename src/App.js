import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

//Components 
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import Rank from './components/Rank/rank';
import ImageLink from './components/ImagePlace/imageLink';
import FaceRecognition from './components/FaceRecog/faceRecognition';
import SignIn from './components/SignIn/signIn';
import Register from './components/Register/register';

const app = new Clarifai.App({
  apiKey: 'YOUR_apiKey from https://clarifai.com/'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'signin',
      isSigned: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({ user: {
       id: data.id,
       name: data.name,
       email: data.email,
       entries: data.entries,
       joined: data.joined
     }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImg');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imgUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
     this.state.input
     ).then(response => {
       if(response) {
         fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
         })
         .then(res => res.json())
         .then(count => {
           this.setState(Object.assign(this.state.user, { entries: count }))
         })
       }
      this.displayFaceBox(this.calculateFaceLocation(response))
     })
      .catch( err => console.error( err ));
  }
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSigned: false })
    } else if (route === 'home') {
      this.setState({isSigned: true })
    }
    this.setState({route: route})
  }

  render() {
     const { isSigned, box, imgUrl, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params = { particlesOptions } />
        <Navigation isSigned={isSigned} onRouteChange={this.onRouteChange} />
        { route === 'home' ?
            <div>
            <Logo />  
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLink onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={box} imgUrl={imgUrl} />
            </div>
            :(
              route === 'signin' 
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
             
        }
      </div>
    );
  }
}

export default App;
