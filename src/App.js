import './App.css';
import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImagaLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

const initialState = {
  input:'',
  imageUrl:'',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id:'',
    name: '',
    email: '',
    entries: 0,
    joined: ''
}}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl:'',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})

    console.log(this.state.user)
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('input-image')
    const boxList = data.outputs[0].data.regions;
    const boxes = boxList.map(box => {
      return ({
        top: box.region_info.bounding_box.top_row * image.height,
        bottom: (1-box.region_info.bounding_box.bottom_row) * image.height,
        left: box.region_info.bounding_box.left_col * image.width,
        right: (1-box.region_info.bounding_box.right_col) * image.width
      })
    })

    this.setState({boxes:boxes})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onButtonSubmit = () => {

    this.setState({imageUrl:this.state.input})

    const IMAGE_URL = this.state.input;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: IMAGE_URL
        })
    };


    fetch("http://localhost:3000/imageurl", requestOptions)
        .then(response => response.json())
        .then(data => {
          this.calculateFaceLocation(data)
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
              count:data.outputs[0].data.regions.length
            })
          })
            .then(res => res.json())
            .then(ent => this.setState(Object.assign(this.state.user, {entries:ent})))
            .catch(err => console.log(err))
        })
        .catch(error => console.log('error', error));

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn:true})
    }

    this.setState({route:route})
  }

  render() {
    const {isSignedIn, route, boxes, imageUrl} = this.state;
    return (
      <div className="App">
        <ParticlesBg type='cobweb' color='#ffffff' bg={true}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        
        {
          route === 'home' 
          ? <div>
              <Logo/>
              <Rank user={this.state.user}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
                />
              <FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
            </div>
          : (
            (route === 'signin' || route === 'signout')
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          ) 
        }
      </div>
    );
  }
}

export default App;
