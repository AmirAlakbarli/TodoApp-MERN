function getReqData(req) {
  return new Promise((res, rej) => {
    try {
      let body;
      // listen to data sent by client
      req.on("data", (data) => {
        // convert data to JSON and appent to the body
        body = JSON.parse(data);
      });
      // listen till the end
      req.on("end", () => {
        // send back the data
        res(body);
      });
    } catch (error) {
      rej(error);
    }
  });
}

module.exports = { getReqData };
