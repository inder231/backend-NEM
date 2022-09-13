const mongoose = require('mongoose');
const topicSchema = new mongoose.Schema({
    topic_name: { type: String, required: true },
    date: { type: Date, default: Date.now },
  });
  const TopicModel = mongoose.model("topic", topicSchema);


  module.exports = {TopicModel};