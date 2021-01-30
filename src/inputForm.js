import React, { Component } from "react";

class InputForm extends Component {
	render() {
		return(
			<div>
				<form id="iForm" action="https://reqbin.com/echo/post/json" method="POST">
					<textarea
						placeholder="Have Feedback? We'd love to hear it, but please dont't share sensitive information. Have questions? Try help or support."
					/>
				</form>
			</div>
		)
	}
}

export default InputForm;