const AWS = require("aws-sdk");

const fs = require("fs");
// const fsExtra = require('fs-extra')
// const { getToken } = require('../middleware/auth');
require("dotenv").config();

// Initialize AWS 
// console.log(process.env.AWS_SECRET_ACCESS_KEY);
const credentials = new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

AWS.config.update({
    region: 'us-east-1', // Replace 'us-east-1' with your AWS region
    credentials: credentials
});

const s3 = new AWS.S3();

async function uploadFileToS3(filePath) {
    // Read file content
    // console.log(filePath);
    const fileContent = fs.readFileSync(filePath);
  
    // Specify params for uploading file to S3
    const params = {
        Bucket: 'nabls3',
        Key: 'testPdfSign/' + filePath.split('/').pop(), // Use file name as key
        Body: fileContent,
        ACL: 'public-read' // Set ACL to public-read

    };

    try {
        // Upload file to S3
        const data = await s3.upload(params).promise();
        fs.unlinkSync(filePath);
        // console.log("File uploaded successfully:", data.Location);
        return data.Location; // Return URL of uploaded file
    } catch (err) {
        console.error("Error uploading file to S3:", err);
        return null;
    }
}

async function uploadSignFileToS3(filePath) {
    // Read file content
    // console.log(filePath);
    const fileContent = fs.readFileSync(filePath);
  
    // Specify params for uploading file to S3
    const params = {
        Bucket: 'nabls3',
        Key: 'testPdfSign/' + filePath.split('/').pop(), // Use file name as key
        Body: fileContent,
        ACL: 'public-read' // Set ACL to public-read

    };

    try {
        // Upload file to S3
        const data = await s3.upload(params).promise();
        let unlink  = await fs.unlinkSync(filePath);
        // console.log(unlink)
        // console.log("File uploaded successfully:", data.Location);
        return data.Location; // Return URL of uploaded file
    } catch (err) {
        console.error("Error uploading file to S3:", err);
        return null;
    }
}
 
module.exports = {
    uploadFileToS3,
    uploadSignFileToS3
};