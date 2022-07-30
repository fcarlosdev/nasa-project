const { default: mongoose } = require("mongoose");


const planetSchema = new mongoose.Schema({
  keplerNname: {
    type: String,
    required: true,
  },
});

mongoose.model('Planet',planetSchema);
