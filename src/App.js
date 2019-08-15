import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
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
      box: {}
    }
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: clarifaiFace.right_col * width,
      topRow : width - (clarifaiFace.top_row * height),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  buttonClicked = (event) => {
    event.preventDefault()
    if (this.state.input) {
      this.setState({ image: this.state.input })
      clarifai.models.predict('a403429f2ddf4b49b307e318f00e528b', this.state.image)
      .then((res) => this.displayFaceBox(this.calculateFaceLocation(res)))
      .catch((err) => console.log(err))
    }
  }

  componentDidMount() {
   
  }

  render() {
    // console.log(this.state.box)
    return (
      <div className="App">
        <Particles className='particles' 
          params = {particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.buttonClicked} />
        <FaceRecognition box={this.state.box} image={this.state.image} />
      </div>
    )
  }
}


export default App;
