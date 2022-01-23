import React from 'react';
import { MdStar, MdStarHalf } from 'react-icons/md';

const states = {
	title: 'Customer feedback',
};
function CustomerFeedback(props) {
	const { meta } = props;
	const rev = meta?.review ? JSON.parse(meta.review) : [];
	const stars = rev.map((r) => r.star);
	const sum = stars.reduce((a, b) => a + b, 0);
	const totalRating = sum / stars.length;
	const getOccurrence = (value) => {
		let starOccurence = stars.filter((v) => v === value).length;
		let starPercentage = ((starOccurence / stars.length) * 100).toFixed();

		return [starOccurence, starPercentage];
	};

	const halfStar = () => {
		if (Math.round(totalRating) > Number(totalRating)) {
			return true;
		} else {
			return false;
		}
	};
	let getHalfStar = halfStar();

	const fullStarsFunction = () => {
		let arr = new Array();
		let size = Math.floor(totalRating);
		for (var i = 0; i < parseInt(size); i++) {
			arr[i] = i + 1;
		}

		return arr;
	};
	let fullStars = fullStarsFunction();
	//console.log(JSON.parse(meta?.review), " json meta");

	return (
		<>
			<div className='review-content-wrap'>
				<h2 className='widget-title'>{states.title}</h2>
				<div className='title-shape'></div>
				<div className='review-content padding-top-45px padding-bottom-40px'>
					<div className='review-rating-summary'>
						<div className='review-rating-summary-inner'>
							<div className='stats-average__count'>
								<span className='stats-average__count-count'>
									{totalRating}
								</span>
							</div>
							<div className='stats-average__rating'>
								<div className='rating-rating d-flex'>
									{fullStars.map((_, index) => {
										return (
											<span key={index} className='la ml-0'>
												<MdStar />
											</span>
										);
									})}
									{/* <span className='la ml-0'>
										<MdStar />
									</span>
									<span className='la ml-0'>
										<MdStar />
									</span>
									<span className='la ml-0'>
										<MdStar />
									</span>
									<span className='la ml-0'>
										<MdStar />
									</span> */}
									{getHalfStar === true ? (
										<span className='la ml-0'>
											<MdStarHalf />
										</span>
									) : (
										''
									)}
								</div>
								<p className='stats-average__rating-rating'> ({totalRating})</p>
							</div>
						</div>
						<div className='course-rating-text'>
							<p className='course-rating-text__text'>Rating</p>
						</div>
					</div>
					<div className='review-rating-widget'>
						<div className='review-rating-rate'>
							<ul>
								<li className='review-rating-rate__items'>
									<div className='review-rating-inner__item'>
										<div className='review-rating-rate__item-text'>
											5 stars{' '}
											{
												// count the number of 5s in the stars array repeat same for 4, 3, 2,1
												getOccurrence(5)[0]
											}
										</div>
										<div className='review-rating-rate__item-fill'>
											<span className='review-rating-rate__item-fill__fill rating-fill-width1'></span>
										</div>
										<div className='review-rating-rate__item-percent-text'>
											{
												// calclulate the percentage of 5s in the stars array
												getOccurrence(5)[1]
											}{' '}
											%
										</div>
									</div>
								</li>
								<li className='review-rating-rate__items'>
									<div className='review-rating-inner__item'>
										<div className='review-rating-rate__item-text'>
											4 stars {getOccurrence(4)[0]}
										</div>
										<div className='review-rating-rate__item-fill'>
											<span className='review-rating-rate__item-fill__fill rating-fill-width2'></span>
										</div>
										<div className='review-rating-rate__item-percent-text'>
											{getOccurrence(4)[1]} %
										</div>
									</div>
								</li>
								<li className='review-rating-rate__items'>
									<div className='review-rating-inner__item'>
										<div className='review-rating-rate__item-text'>
											3 stars {getOccurrence(3)[0]}
										</div>
										<div className='review-rating-rate__item-fill'>
											<span className='review-rating-rate__item-fill__fill rating-fill-width3'></span>
										</div>
										<div className='review-rating-rate__item-percent-text'>
											{getOccurrence(3)[1]} %
										</div>
									</div>
								</li>
								<li className='review-rating-rate__items'>
									<div className='review-rating-inner__item'>
										<div className='review-rating-rate__item-text'>
											2 stars {getOccurrence(2)[0]}
										</div>
										<div className='review-rating-rate__item-fill'>
											<span className='review-rating-rate__item-fill__fill rating-fill-width4'></span>
										</div>
										<div className='review-rating-rate__item-percent-text'>
											{getOccurrence(2)[1]} %
										</div>
									</div>
								</li>
								<li className='review-rating-rate__items'>
									<div className='review-rating-inner__item'>
										<div className='review-rating-rate__item-text'>
											1 stars {getOccurrence(1)[0]}
										</div>
										<div className='review-rating-rate__item-fill'>
											<span className='review-rating-rate__item-fill__fill rating-fill-width5'></span>
										</div>
										<div className='review-rating-rate__item-percent-text'>
											{getOccurrence(1)[1]} %
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CustomerFeedback;
