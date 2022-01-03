import React, { useState } from "react";
import S3 from "react-aws-s3";
const config = {
  bucketName: process.env.REACT_APP_bucket,
  dirName: "cv",
  region: "us-east-1",
  accessKeyId: process.env.REACT_APP_aws_key,
  secretAccessKey: process.env.REACT_APP_aws_secret,
  s3Url: "https://essluploads.s3.amazonaws.com",
};
const ReactS3Client = new S3(config);
const Uploader = (props) => {
  const { title, done, cancel } = props;
  const [loading, setLoading] = useState(false);
  const [att, setFile] = useState(null);
  const appendFile = (ev) => {
    console.log(ev.target.files[0], " vie");
    const { files } = ev?.target;
    files[0].size > 38229976
      ? alert("File cant be larger than 15mb!")
      : setFile(files[0]);
    ReactS3Client.uploadFile(files[0], files[0].name)
      .then((data) => {
        console.log(data);
        done(data);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div className="upload-btn-box">
        <input type="file" name="files" id="files" onChange={appendFile} />
      </div>
    </div>
  );
};

export default Uploader;
