import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "drig2qdcm",
        uploadPreset: "v3yvbipy",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          this.props.storePic(result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload Image
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
