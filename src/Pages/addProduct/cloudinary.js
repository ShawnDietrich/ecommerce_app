import React, { Component } from 'react'
const cloudName = process.env.REACT_APP_CLOUDNAME
const uploadPreset = process.env.REACT_APP_UPLOADPRESET

class CloudinaryUploadWidget extends Component {
    
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
        
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info)
          //this.props.storePic(result.info)
        }
        
          sessionStorage.setItem("cloud Error", error)
       
      },
    )
    document.getElementById('upload_widget').addEventListener(
      'click',
      function () {
        
        myWidget.open()
      },
      false,
    )
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload Images
      </button>
    )
  }
}

export default CloudinaryUploadWidget
