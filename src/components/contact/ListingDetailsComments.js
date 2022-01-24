import React, { useEffect, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import Button from '../common/Button';
import SectionDivider from '../common/SectionDivider';
import { Link } from 'react-router-dom';
import { RiReplyLine, RiSendPlane2Line } from 'react-icons/ri';
import { MdClose, MdStar } from 'react-icons/md';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineCloud, AiOutlineMessage } from 'react-icons/ai';

function ListingDetailsComments(props) {
	const { commentlists } = props;

	const [commentContent, setCommentContent] = useState('');

	const submitComment = (e) => {
		e.preventDefault();
	};

	const body = document.querySelector('body');
	function showReportModal() {
		body.classList.add('modal-open');
		body.style.paddingRight = '17px';
	}
	function hideReportModal() {
		body.classList.remove('modal-open');
		body.style.paddingRight = '0';
	}

	useEffect(() => {
		document.addEventListener(
			'click',
			function (e) {
				for (
					let target = e.target;
					target && target !== this;
					target = target.parentNode
				) {
					if (target.matches('.report-modal-btn')) {
						showReportModal.call(target, e);
						break;
					}
				}
			},
			false
		);

		document.addEventListener(
			'click',
			function (e) {
				for (
					let target = e.target;
					target && target !== this;
					target = target.parentNode
				) {
					if (
						target.matches(
							'.report-modal-box .modal-bg, .report-modal-box .modal-top .close'
						)
					) {
						hideReportModal.call(target, e);
						break;
					}
				}
			},
			false
		);
	});

	return (
		<>
			<ul className='comments-list padding-top-40px'>
				<li>
					{commentlists?.length > 0 &&
						commentlists.map((item, i) => {
							console.log('commenting ', item.replyComments);
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
												<div className='theme-btn comment__btn'>
													<span className='report-modal-btn'>
														<i className='la d-inline-block '>
															<RiReplyLine />
														</i>
														Reply
													</span>
												</div>
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
											<div className='modal-form'>
												<div
													className='modal fade report-modal-box bs-example-modal-lg'
													tabIndex='-1'
													role='dialog'
													aria-labelledby='myLargeModalLabel'
												>
													<div className='modal-bg'></div>
													<div
														className='modal-dialog modal-lg'
														role='document'
													>
														<div className='modal-content'>
															<div className='modal-top'>
																<button
																	type='button'
																	className='close close-arrow'
																	data-dismiss='modal'
																	aria-label='Close'
																>
																	<span aria-hidden='true' className='mb-0'>
																		<MdClose />
																	</span>
																</button>
																<h4 className='modal-title'>
																	<span className='mb-0'>
																		<AiOutlineMessage />
																	</span>{' '}
																	Reply to the Review
																</h4>
															</div>
															<div className='contact-form-action'>
																<form method='post'>
																	<div className='msg-box'>
																		<label className='label-text'>
																			Write Message
																		</label>
																		<div className='form-group'>
																			<i className='form-icon'>
																				<BsPencil />
																			</i>
																			<textarea
																				className='message-control form-control'
																				name='message'
																				value={commentContent}
																				onChange={({ target }) =>
																					setCommentContent(target.value)
																				}
																				placeholder="What's your opinion about the review?"
																				required
																			></textarea>
																		</div>
																	</div>
																	<div className='btn-box text-right'>
																		<button
																			type='submit'
																			className='theme-btn button-success border-0'
																			onClick={submitComment}
																		>
																			Send reply{' '}
																			<i>
																				<RiSendPlane2Line />
																			</i>
																		</button>
																	</div>
																</form>
															</div>
														</div>
													</div>
												</div>
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
																			{item2.date}
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
