import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  // endpoint: "https://fors3-b1.s3.eu-north-1.amazonaws.com",
  signatureVersion: "v4",
  s3ForcePathStyle: true,
});

export const generatePresignedUrl = (key, expiresIn = 3600) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Expires: expiresIn,
  };
  return s3.getSignedUrlPromise("getObject", params);
};

// export const uploadPresignedUrl = (key, expiresIn = 3600) => {
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: key,
//     Expires: expiresIn,
//   };
//   return s3.getSignedUrlPromise("putObject", params);
// };
