import React, { useContext } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegEnvelope } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { RiSendPlane2Line } from 'react-icons/ri';
import { Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/UserProvider';
import { contactUs } from '../../store/api/user';
import { ALERT_SHOW } from '../../context/actions';

function AskQuestionField({ title }) {
	const [state, dispatch] = useContext(UserContext);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const user = await contactUs(data);
		if (user.error) {
			dispatch({
				type: ALERT_SHOW,
				data: {
					variant: 'danger',
					show: true,
					msg: 'Email failed to send!',
				},
			});
		}
		if (user.data) {
			dispatch({
				type: ALERT_SHOW,
				data: {
					variant: 'success',
					show: true,
					msg: `Thanks for Contacting Us ${data.name}`,
				},
			});
			reset();
		}
	};

	return (
		<>
			<div className='faq-forum'>
				<div className='billing-form-item'>
					{title ? (
						<div className='billing-title-wrap'>
							<h3 className='widget-title pb-0'>{title}</h3>
							<div className='title-shape margin-top-10px'></div>
						</div>
					) : (
						''
					)}
					<div className='billing-content'>
						<div className='contact-form-action'>
							<form method='post' onSubmit={handleSubmit(onSubmit)}>
								<Alert
									show={state.alert?.show}
									variant={state.alert?.variant}
									dismissible
									onClose={() =>
										dispatch({
											type: ALERT_SHOW,
											data: {
												show: false,
											},
										})
									}
								>
									{state.alert?.msg}
								</Alert>
								<div className='input-box'>
									<label className='label-text'>Your name</label>
									{errors.name && (
										<span role='alert' className='color-text'>
											{errors.name.message}
										</span>
									)}
									<div className='form-group'>
										<span className='form-icon'>
											<AiOutlineUser />
										</span>
										<input
											className='form-control'
											type='text'
											name='name'
											placeholder='Your name'
											{...register('name', { required: 'required!' })}
										/>
									</div>
								</div>
								<div className='input-box'>
									<label className='label-text'>Your email</label>
									{errors.email && (
										<span role='alert' className='color-text'>
											{errors.email.message}
										</span>
									)}
									<div className='form-group'>
										<span className='form-icon'>
											<FaRegEnvelope />
										</span>
										<input
											className='form-control'
											type='text'
											name='name'
											placeholder='Email address'
											{...register('email', {
												required: 'required!',
												pattern: {
													value: /\S+@\S+\.\S+/,
													message: 'Invalid !',
												},
											})}
										/>
									</div>
								</div>
								<div className='input-box'>
									<label className='label-text'>message</label>
									<div className='form-group'>
										<span className='form-icon'>
											<BsPencil />
										</span>
										<textarea
											className='message-control form-control'
											name='message'
											placeholder='Write message'
											{...register('message')}
										></textarea>
									</div>
								</div>
								<div className='btn-box'>
									<button type='submit' className='theme-btn border-0'>
										<i>
											<RiSendPlane2Line />
										</i>{' '}
										send message
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AskQuestionField;
