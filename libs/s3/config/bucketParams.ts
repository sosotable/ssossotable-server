import { PutObjectCommandInput } from "@aws-sdk/client-s3";

let bucketParams: PutObjectCommandInput;

export default bucketParams = {
  Bucket: "ssossotable/userImages/",
  // Specify the name of the new object. For example, 'index.html'.
  // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
  Key: "OBJECT_NAME",
  // Content of the new object.
  Body: "BODY",
};
