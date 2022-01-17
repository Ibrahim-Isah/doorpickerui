import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';
import S3 from 'react-aws-s3';
import { addImage } from '../../store/api/post';
import { UserContext } from '../../context/UserProvider';
import { DRAFT_SET } from '../../context/actions';
import { useHistory } from 'react-router-dom';
import { getVar } from '../../store/api/user';

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
};

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 0,
	marginRight: 0,
	width: '100%',
	height: 'auto',
	padding: 4,
	boxSizing: 'border-box',
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden',
	alignItems: 'start',
};

const img = {
	display: 'block',
	width: '150px',
	maxWidth: '200px',
	height: '150px',
};

function PhotoUploader(props) {
	const { next } = props;
	const [state, dispatch] = useContext(UserContext);
	const { draft, user } = state;
	const [files, setFiles] = useState([]);
	const [err, setErr] = useState(null);
	const [envs, setEnv] = useState(null);
	useEffect(() => {
		async function myVars() {
			const r = await getVar();
			setEnv(r);
		}
		myVars();
	}, []);
	const history = useHistory();
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) => {
					s3Upload(file, file.name)
						.then((data) => console.log(data, ' upload succesful'))
						.catch((e) => setErr(e));
					return Object.assign(file, {
						preview: URL.createObjectURL(file),
					});
				})
			);
		},
	});
	const storeImage = async () => {
		const imgs = files.map((f) => f.path);
		const r = await addImage({
			id: draft?.id,
			ownerId: user.id,
			images: imgs,
		});
		dispatch({ type: DRAFT_SET, data: r.data });
		next();
	};

	const thumbs = files.map((file) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img src={file.preview} style={img} alt='New Post' />
			</div>
		</div>
	));

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);
	console.log(envs);
	const s3Upload = (file, fileName) => {
		const config = {
			bucketName: envs.bucket,
			dirName: 'picker',
			region: 'us-east-1',
			accessKeyId: envs.awskey,
			secretAccessKey: envs.awssecret,
			s3Url: 'https://essluploads.s3.amazonaws.com/',
		};
		const ReactS3Client = new S3(config);
		return ReactS3Client.uploadFile(file, fileName);
	};

	return (
		<>
			<div className='billing-form-item'>
				<div className='billing-title-wrap'>
					<h3 className='widget-title pb-0'>Photo</h3>
					<div className='title-shape margin-top-10px'></div>
				</div>
				<div className='billing-content'>
					<div className='row'>
						<div className='col-lg-12'>
							{err && (
								<Alert
									variant='danger'
									onClose={() => setErr(null)}
									dismissible
								>
									Image Upload failed!
								</Alert>
							)}
							<div className='drag-and-drop-wrap text-center'>
								{user?.id ? (
									<>
										<div className='drag-and-drop-file'>
											<div {...getRootProps({ className: 'dropzone' })}>
												<input {...getInputProps()} />
												<span className='drag-drop-icon'>
													<BsCloudUpload />
												</span>
												<h3>You can drag & drop all files here to upload</h3>
											</div>
											<aside style={thumbsContainer}>{thumbs}</aside>
										</div>
									</>
								) : (
									<Alert variant='warning'>
										<Button
											variant='link'
											style={{ marginLeft: '4px', textDecoration: 'none' }}
											onClick={() =>
												history.push('/login', {
													from: '/add-listing/new',
												})
											}
										>
											You are not logged in! Go to login
										</Button>
									</Alert>
								)}
							</div>
						</div>
					</div>
					<Button onClick={storeImage}>Done</Button>
				</div>
			</div>
		</>
	);
}

export default PhotoUploader;
