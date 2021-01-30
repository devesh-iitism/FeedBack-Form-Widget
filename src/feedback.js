import React, { Component } from "react";
import "./feedback.css";
import html2canvas from 'html2canvas';
import $ from 'jquery'; 
var url;

class feedback extends Component {
	handleChange() {
		if($('.form-check-input').is(":checked"))   
            $("#show").show();
        else
            $("#show").hide();
	}
	
	handleSubmitClick() {
		const data = {};
		let fback = $('textarea#feedbackText').val();
		data.message = fback;
		
		if($('.form-check-input').is(":checked"))   
			data.imageData = url;
		
		console.log(data);
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
	
	handleClick() {
		const input = $('body')[0];
		console.log(input)

		html2canvas(input)
			.then((canvas) => {
				// const imgData = canvas.toDataURL('image/png');
				// console.log(imgData);
				url = canvas.toDataURL();

				var newImg = document.createElement("img"); // create img tag
			    newImg.src = url;
				// console.log($("#show"));
			    $("#show").html(newImg); 
				// console.log($("#show").children("img"));
				$("#show").children("img").addClass("img-width");
				$("#show").hide();
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
						  <div id="show"></div>
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

export default feedback;