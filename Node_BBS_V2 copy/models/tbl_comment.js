import mongoose from "monggose";
const { Schema, model } = mongoose;
const commentModel = new Schema({
  ct_date: String,
  ct_time: String,
  ct_write: String,
  ct_comment: String,
});
