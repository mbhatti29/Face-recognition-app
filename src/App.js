import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value:70,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }          

}
const clarifai = new Clarifai.App({
  apiKey: '45ab6d95aa8b40e6bfe3fd0bd397068d'
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      image: "https://samples.clarifai.com/face-det.jpg",
      box: {},
      route: 'signIn',
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: '', 
      }
    }
  }
  
  loaderUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
    // console.log(this.state.user);
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow : clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    event.preventDefault()
    this.setState({ input: event.target.value })
  }

  clarifaiFun = () => {
    clarifai.models.predict('a403429f2ddf4b49b307e318f00e528b', this.state.image)
      .then((res) => {
        if (res) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
          .then(res => res.json())
          .then(data => {
            this.setState(
              Object.assign(this.state.user, { entries: data})
            )
          })
       
        }
        this.displayFaceBox(this.calculateFaceLocation(res))
      })
      .catch((err) => console.log(err))
  }

  buttonClicked = (event) => {
    event.preventDefault()
    if (this.state.input) {
      this.setState({ image: this.state.input },
      () => this.clarifaiFun())
    }
  }

  routeChange = (route) => {
    this.setState({
      route : route
    })
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001')
  //     .then(res => res.json())
  //     .then(console.log)
  // }

  render() {
    const { route, box, image } = this.state;

    return (
      <div className="App">
        <Particles className='particles' 
          params = {particlesOptions}
        />
        <Navigation route={route} onRouteChange={this.routeChange}/>
        <Logo />
        { route === 'home' 
          ? <div className='slider'>
              <Rank name={ this.state.user.name } entries={ this.state.user.entries } />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.buttonClicked} />
              <FaceRecognition box={box} image={image} />
            </div>
          : (
            route === 'signIn'
            ? <SignIn loadUser={this.loaderUser} onRouteChange={this.routeChange} />
            : <Register loadUser={this.loaderUser} onRouteChange={this.routeChange} />
            )
        }
      </div>
    )
  }
}


export default App;
