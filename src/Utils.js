const utils = {
    detectFace: async function faceDetect(url) {
        if(url){
        const uriBase = process.env.REACT_APP_URI_BASE;
        const subscriptionKey = process.env.REACT_APP_SUBS_KEY;
        const type = 'blob';
        const faceID = 'true';
        const faceLandmarks = 'true';
        const faceAttributes = 'age,gender,smile,facialHair,glasses,emotion,hair,makeup,accessories';
        const response = await fetch(
          `${uriBase}?returnFaceId=${faceID}&returnFaceLandmarks=${faceLandmarks}&returnFaceAttributes=${faceAttributes}`,
          {
            method: 'POST',
            headers: new Headers({
              'content-type': 'application/octet-stream',
              'Ocp-Apim-Subscription-Key': subscriptionKey,
            }),
            body: url,
          }
        );
        let newResult = await response.json();
        //console.log(newResult);
        return newResult;
      } else console.log('Defected Blob');
    }
}

export default utils;
