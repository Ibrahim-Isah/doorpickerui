import React, { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import Button from '../common/Button';
import SectionDivider from '../common/SectionDivider';
import { Link } from 'react-router-dom';
import { RiReplyLine, RiSendPlane2Line } from 'react-icons/ri';
import { MdClose, MdStar } from 'react-icons/md';
import { Form, Modal } from 'react-bootstrap';
import { AiOutlineMessage } from 'react-icons/ai';

function CommentForm({ onClose, show, item }) {
	const [nameField, setNameField] = useState('');
	const [starRating, setStarRating] = useState(1);
	const [reviewField, setReviewField] = useState('');

	const addReply = (e) => {
		e.preventDefault();

		let replyObj = {
			id: `${item?.id}-${item?.replyComments.length + 1}`,
			content: reviewField,
			date: new Date(),
			star: starRating,
			name: nameField,
			img: 'hydra',
		};

		item?.replyComments.push(replyObj);
		console.log('checkings', JSON.stringify(item));
		onClose();
	};
	return (
		<>
			<Form className='w-75 border text-dark p-4 mt-3'>
				<button
					type='button'
					onClick={(e) => {
						e.preventDefault();
						onClose();
					}}
					className='close close-arrow'
					aria-label='Close'
				>
					<span aria-hidden='true' className='mb-3'>
						<MdClose />
					</span>
				</button>
				<Form.Group
					className='mb-3 text-dark'
					controlId='exampleForm.ControlInput1'
				>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						required
						value={nameField}
						onChange={({ target }) => setNameField(target.value)}
					/>
				</Form.Group>
				<Form.Group
					className='mb-3 text-dark'
					controlId='exampleForm.ControlTextarea1'
				>
					<Form.Label>Reply</Form.Label>
					<Form.Control
						as='textarea'
						rows={3}
						required
						value={reviewField}
						onChange={({ target }) => setReviewField(target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3 text-dark'>
					<Form.Label>Star Rating</Form.Label>
					{['radio'].map((type) => (
						<div key={`inline-${type}`} className='mb-3'>
							<Form.Check
								inline
								label='1'
								name='group1'
								type={type}
								id={`inline-${type}-1`}
								value={starRating}
								onChange={() => setStarRating(1)}
							/>
							<Form.Check
								inline
								label='2'
								name='group1'
								type={type}
								id={`inline-${type}-2`}
								value={starRating}
								onChange={() => setStarRating(2)}
							/>
							<Form.Check
								inline
								label='3'
								name='group1'
								type={type}
								id={`inline-${type}-3`}
								value={starRating}
								onChange={() => setStarRating(3)}
							/>
							<Form.Check
								inline
								label='4'
								name='group1'
								type={type}
								id={`inline-${type}-4`}
								value={starRating}
								onChange={() => setStarRating(4)}
							/>
							<Form.Check
								inline
								label='5'
								name='group1'
								type={type}
								id={`inline-${type}-5`}
								value={starRating}
								onChange={() => setStarRating(5)}
							/>
						</div>
					))}
				</Form.Group>
				<div className='btn-box text-right'>
					<button
						className=' btn btn-success'
						disabled={nameField === '' || reviewField === '' ? true : false}
						onClick={addReply}
					>
						Send Reply{' '}
						<i>
							<RiSendPlane2Line />
						</i>
					</button>
				</div>
			</Form>
		</>
	);
}

function ListingDetailsComments(props) {
	const [showForm, setShowForm] = useState(false);
	const [index, setIndex] = useState(null);
	const { commentlists, doComment } = props;
	return (
		<>
			<ul className='comments-list padding-top-40px'>
				<li>
					{commentlists?.length > 0 &&
						commentlists.map((item, i) => {
							return (
								<div key={i}>
									<div className='comment'>
										{/* <img
                      className="avatar__img"
                      alt="Comment"
                      src={item?.img}
                    /> */}
										<div className='comment-body'>
											<div className='meta-data'>
												<span className='comment__author'>{item?.name}</span>
												<span className='comment__date'>
													{new Date(item?.date).toLocaleDateString()}{' '}
													<div className='rating-rating'>
														{[...Array(item?.star)].map((i, idx) => (
															<span className='la la-star' key={idx}>
																<MdStar />
															</span>
														))}{' '}
													</div>
												</span>
											</div>
											<p className='comment-content'>{item?.content}</p>
											<div className='comment-reply d-flex justify-content-between align-items-center'>
												<div
													className='theme-btn comment__btn'
													onClick={() => {
														setIndex(i);
														setShowForm(true);
													}}
												>
													<i className='la d-inline-block'>
														<RiReplyLine />
													</i>{' '}
													Reply
												</div>
												{showForm && i === index ? (
													<CommentForm
														onClose={() => setShowForm(false)}
														show={showForm}
														item={item}
													/>
												) : null}

												{/* <p className="feedback-box">
                                                Was this review?
                                                <button type="button" className="theme-btn">
                                                    <i className="la d-inline-block"><FiThumbsUp /></i> Helpful
                                                </button>
                                                <button type="button" className="theme-btn">
                                                    <i className="la d-inline-block"><FaRegSmile /></i> Funny
                                                </button>
                                            </p> */}
											</div>
										</div>
									</div>

									{item?.replyComments
										? item.replyComments.map((item2, index2) => {
												return (
													<ul className='comments-reply' key={index2}>
														<li>
															<div className='comment'>
																{/* <img
                                  className="avatar__img"
                                  alt="Comment"
                                  src={item2.img}
                                /> */}
																<div className='comment-body'>
																	<div className='meta-data'>
																		<span className='comment__author'>
																			{item2.name}
																		</span>
																		<span className='comment__date'>
																			{new Date(
																				item2.date
																			).toLocaleDateString()}
																		</span>
																	</div>
																	<p className='comment-content'>
																		{item2.content}
																	</p>
																	<div className='comment-reply d-flex justify-content-between align-item2s-center'>
																		<Link
																			className='theme-btn comment__btn'
																			to='#'
																		>
																			<i className='la d-inline-block'>
																				{item2.replyBtnIcon}
																			</i>{' '}
																			{item2.replyBtn}
																		</Link>

																		{/* <p className="feedback-box">
                                      Was this review?
                                      <button
                                        type="button"
                                        className="theme-btn"
                                      >
                                        <i className="la d-inline-block">
                                          <FiThumbsUp />
                                        </i>{" "}
                                        Helpful
                                      </button>
                                      <button
                                        type="button"
                                        className="theme-btn"
                                      >
                                        <i className="la d-inline-block">
                                          <FaRegSmile />
                                        </i>{" "}
                                        Funny
                                      </button>
                                    </p> */}
																	</div>
																</div>
															</div>
														</li>
													</ul>
												);
										  })
										: ''}
								</div>
							);
						})}
				</li>
			</ul>
			<SectionDivider />
			<div className='button-shared padding-top-40px text-center'>
				<Button url='#' text='Load more review' className='border-0'>
					<FiRefreshCw />
				</Button>
			</div>
		</>
	);
}

export default ListingDetailsComments;
