import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { s3Client } from "./config/s3Client"; // Helper function that creates an Amazon S3 service client module.
module.exports = () => {
  return {
    run: async (bucketParams: PutObjectCommandInput) => {
      try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        return data; // For unit tests.
        console.log(
          "Successfully uploaded object: " +
            bucketParams.Bucket +
            "/" +
            bucketParams.Key
        );
      } catch (err) {
        console.log("Error", err);
      }
    },
  };
};
