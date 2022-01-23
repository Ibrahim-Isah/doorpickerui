import React, { useState } from 'react';
import { MdStar } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegEnvelope } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import PhotoUploader2 from '../addlisting/PhotoUploader2';
import { addMeta } from '../../store/api/post';
import { remi } from '../../store/store';
import { tComment } from '../../utils/tReview';

const states = {
	title: 'Add a Review',
	subtitle:
		'Your email address will not be published. Required fields are marked *',
};
const _review = async () => {
	// hard coded data,  pls replace
	// const r = await addMeta();
	// console.log(r);
};
function ReviewFields({ rev, doReview }) {
	const [starRating, setStarRating] = useState(0);
	const [nameField, setNameField] = useState('');
	const [emailField, setEmailField] = useState('');
	const [reviewField, setReviewField] = useState('');
	const [message, setMessage] = useState(false);

	const addReview = (e) => {
		e.preventDefault();
		// call this method to submit a review
		let obj = {
			id: rev.length + 1,
			img: 'hydra',
			name: nameField,
			date: new Date(),
			content: reviewField,
			star: starRating,
			replyComments: !rev.replyComments === null ? [...rev.replyComments] : [],
		};
		// capture the form input data into the obj argument
		rev.push(obj);
		doReview(JSON.stringify(rev));
		setStarRating(0);
		setNameField('');
		setEmailField('');
		setReviewField('');
		setMessage(true);
	};
	return (
		<>
			<div className='add-review-listing padding-top-50px' id='review'>
				<h2 className='widget-title'>{states.title}</h2>
				<div className='title-shape'></div>
				<div className='section-heading padding-top-20px'>
					<p className='sec__desc font-size-16'>{states.subtitle}</p>
				</div>
				<ul className='rating-list padding-top-20px'>
					<li>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<label className='review-label'>
							<input
								type='radio'
								name='review-radio'
								value={starRating}
								onChange={() => setStarRating(1)}
							/>
							<span className='review-mark'></span>
						</label>
					</li>
					<li>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<label className='review-label'>
							<input
								type='radio'
								name='review-radio'
								value={starRating}
								onChange={() => setStarRating(2)}
							/>
							<span className='review-mark'></span>
						</label>
					</li>
					<li>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<label className='review-label'>
							<input
								type='radio'
								name='review-radio'
								value={starRating}
								onChange={() => setStarRating(3)}
							/>
							<span className='review-mark'></span>
						</label>
					</li>
					<li>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<label className='review-label'>
							<input
								type='radio'
								name='review-radio'
								value={starRating}
								onChange={() => setStarRating(4)}
							/>
							<span className='review-mark'></span>
						</label>
					</li>
					<li>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<span className='la d-inline-block'>
							<MdStar />
						</span>
						<label className='review-label'>
							<input
								type='radio'
								name='review-radio'
								value={starRating}
								onChange={() => setStarRating(5)}
							/>
							<span className='review-mark'></span>
						</label>
					</li>
				</ul>
				<div className='contact-form-action mt-5'>
					<form>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='input-box'>
									<label className='label-text'>Name</label>
									<div className='form-group'>
										<span className='la form-icon'>
											<AiOutlineUser />
										</span>
										<input
											className='form-control'
											type='text'
											name='name'
											placeholder='Your Name'
											value={nameField}
											onChange={({ target }) => setNameField(target.value)}
										/>
									</div>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='input-box'>
									<label className='label-text'>Email</label>
									<div className='form-group'>
										<span className='la form-icon'>
											<FaRegEnvelope />
										</span>
										<input
											className='form-control'
											type='email'
											name='email'
											placeholder='Email Address'
											value={emailField}
											onChange={({ target }) => setEmailField(target.value)}
										/>
									</div>
								</div>
							</div>
							<div className='col-lg-12'>
								<div className='input-box'>
									<label className='label-text'>Review</label>
									<div className='form-group'>
										<span className='la form-icon'>
											<BsPencil />
										</span>
										<textarea
											className='message-control form-control'
											name='message'
											placeholder='Write Message'
											value={reviewField}
											onChange={({ target }) => setReviewField(target.value)}
										></textarea>
									</div>
								</div>
							</div>
							<div className='col-lg-12'>
								<div className='upload-btn-box'>
									<form>
										<PhotoUploader2 />

										<button
											className='theme-btn border-0 margin-top-20px'
											type='submit'
											value='submit'
											// onClick={_review}
											onClick={addReview}
										>
											Submit review
										</button>
									</form>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
export default ReviewFields;
