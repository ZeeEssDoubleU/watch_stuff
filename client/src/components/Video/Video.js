import React from "react";
import PropTypes from "prop-types";

import "./Video.scss";

const Video = props => {
	if (!props.id) {
		return null;
	}
	return (
		<div className="video-container">
			<div className="video">
				<iframe
					className="video-player"
					src={`https://www.youtube.com/embed/${props.id}`}
					frameborder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					title={"video"}
				/>
			</div>
		</div>
	);
};

Video.propTypes = {};

export default Video;