const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const Clarifai  = require("clarifai")

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key d5f13c4abbc94f0c8d0ab54e3257ddb2");



const handleApiCall = (req, res) => {
  stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "face-detection",
        inputs: [{data: {image: {url: req.body.input}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            return;
        }
  
        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }
  
        console.log("Predicted concepts, with confidence values:")
        // console.log(response.outputs[0].data.regions[0].data)
        res.json(response)
    }
  );

 }

const handleImage = (req, res,db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage : handleImage,
  handleApiCall,
}