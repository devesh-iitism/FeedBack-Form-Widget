import React, { Component } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import "./feedback.css";
import html2canvas from 'html2canvas';
import $ from 'jquery'; 
var url;
let data = {};

class feedback extends Component {
	state = {
    src: null,
    crop: {
      unit: '%',
      width: 30,
      aspect: 16 / 9,
    },
  };
	
	onImageLoaded = image => {
    this.imageRef = image;
  };

	onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
		
	  $("#crop1").attr("src", croppedImageUrl);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

	handleChange() {
		if($('.form-check-input').is(":checked"))   
            $("#show").show();
        else
            $("#show").hide();
	}
	
	handleSubmitClick() {
		let fback = $('textarea#feedbackText').val();
		data.message = fback;
		
		// console.log($("#crop1").src);
		// console.log("hi");
		
		
		// const input1 = $("#crop1")[0];
		// html2canvas(input1)
		// 	.then((canvas) => {
		// 		url1 = canvas.toDataURL();
		// 		// console.log(url1);
		// 	});
		// console.log(url1);
		if($('.form-check-input').is(":checked")) {
			data.imgData = $("#crop1").attr("src");
		} 
		else {
			data.imgData = "";
		}
		console.log(data);
		makereq();
		
	}
	
	handleClick() {
		const input = $('body')[0];
		console.log(input)

		html2canvas(input)
			.then((canvas) => {
				// const imgData = canvas.toDataURL('image/png');
				// console.log(imgData);
				url = canvas.toDataURL();
				// console.log(url);
				//var newImg = document.createElement("img"); // create img tag
			    //newImg.src = url;
				console.log($(".ReactCrop__image").attr("src", url));
			    //$("#show").html(newImg); 
				// console.log($("#show").children("img"));
				//$("#show").children("img").addClass("img-width");
				$("#show").hide();
			});
	}
	
	render() {
		const { crop, croppedImageUrl } = this.state;
		console.log(croppedImageUrl);
		return (
			<div className="container text-center">
			  <button onClick={this.handleClick} type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Send Feedback</button>
			  <div className="modal fade" id="myModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
					  <div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">Send Feedback</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						  <span aria-hidden="true">&times;</span>
						</button>
					  </div>
					  <div className="modal-body">
						  <textarea id="feedbackText"
						placeholder="Have Feedback? We'd love to hear it, but please dont't share sensitive information. Have questions? Try help or support."
					/>
						  <div className="form-check">
							  <input 
								  onChange={this.handleChange}
								  className="form-check-input" 
								  type="checkbox" 
								  value="" 
								  id="flexSwitchCheckDefault"
							  />
							  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
								Include Screenshot
							  </label>
						  </div>
						  <div id="show">
							  <ReactCrop
								src={url}
								crop={crop}
								ruleOfThirds
								onImageLoaded={this.onImageLoaded}
								onComplete={this.onCropComplete}
								onChange={this.onCropChange}
							  />
							  <img id="crop1" alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
						  </div>
					  </div>
					  <div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
						<button onClick={this.handleSubmitClick} type="button" className="btn btn-primary">Submit</button>
					  </div>
					</div>
				  </div>
			  </div>
			</div>
		)
	}
}

function makereq() {
	fetch("https://reqbin.com/echo/post/json", {
	  method: "POST",
	  headers: [
		["Content-Type", "application/json"],
		["Content-Type", "text/plain"]
	  ],
	  credentials: "include",
	  body: JSON.stringify(data)
	});
	alert("Feedback Submitted");
}

export default feedback;