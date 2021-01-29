import React, { Component } from "react";
import "./feedback.css";
import html2canvas from 'html2canvas';
import $ from 'jquery'; 

class feedback extends Component {
	handleClick() {
		const input = $('body')[0];
		console.log(input)

		html2canvas(input)
			.then((canvas) => {
				// const imgData = canvas.toDataURL('image/png');
				// console.log(imgData);
				var url = canvas.toDataURL();

				var newImg = document.createElement("img"); // create img tag
			    newImg.src = url;
				console.log($("#show"));
			    $("#show").html(newImg); 
			});
	}
	
	render() {
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
					  <div id="show" className="modal-body">
						...
					  </div>
					  <div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" className="btn btn-primary">Understood</button>
					  </div>
					</div>
				  </div>
			  </div>
			</div>
		)
	}
}

export default feedback;