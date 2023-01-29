module.exports = {
  makeSignature: async (timeStamp: any) => {
    const CryptoJS = require("crypto-js");
    require("dotenv").config();
    if (
      process.env.NAVER_CLOUD_ACCESS_KEY === undefined ||
      process.env.NAVER_CLOUD_SECRET_KEY == undefined
    ) {
      // auth key is not defined
      process.exit(-1);
    }

    return new Promise((resolve, reject) => {
      try {
        let space = " "; // one space
        let newLine = "\n"; // new line
        let method = "POST"; // method
        let url = "/api/v1/mails"; // url (include query string)

        let hmac = CryptoJS.algo.HMAC.create(
          CryptoJS.algo.SHA256,
          process.env.NAVER_CLOUD_SECRET_KEY
        );
        hmac.update(method);
        hmac.update(space);
        hmac.update(url);
        hmac.update(newLine);
        hmac.update(timeStamp);
        hmac.update(newLine);
        hmac.update(process.env.NAVER_CLOUD_ACCESS_KEY);

        let hash = hmac.finalize();
        resolve(hash.toString(CryptoJS.enc.Base64));
      } catch (e) {
        reject(e);
      }
    });
  },
};
