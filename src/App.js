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

function thisApp(image) {
  clarifai.models.predict('a403429f2ddf4b49b307e318f00e528b', image )
    .then((res) => console.log(res))
    .catch((err) => console.log(err)
  )
}



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      image: "https://samples.clarifai.com/face-det.jpg"
    }
  }
  
  onInputChange = (event) => {
    console.log(event.target.value)
  }

  componentDidMount() {
    thisApp(this.state.image)
  }


  render() {
    return (
      <div className="App">
        <Particles className='particles' 
          params = {particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} />
        <FaceRecognition image={this.state.image} />
      </div>
    )
  }
}


export default App;
