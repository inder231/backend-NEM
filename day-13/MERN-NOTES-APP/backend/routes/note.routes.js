const { Router } = require("express");
const { NotesModel } = require("../models/Notes.model");
require("dotenv").config();

const notesController = Router();
// GETTTING NOTES =================================================
notesController.get("/", async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log(req.body.userId); // from the authentication middleware
    const notes = await NotesModel.find({ userId });
    res.status(200).send({message:"Here are your Notes",success:true,notes:notes});
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});
// ====================================================================
// CREATING NOTE =================================================================
notesController.post("/create", async (req, res) => {
  try {
    const { Heading, Note, Tag, userId } = req.body;
    const new_note = new NotesModel({ Heading, Note, Tag, userId });
    await new_note.save();
    res
      .status(201)
      .send({ message: "Note created", success: true, note: new_note });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});
// =================================================================================================
// UPDATE NOTE ==============================
notesController.patch("/edit/:noteId", async (req, res) => {
  try {
    const { userId } = req.body;
    const { noteId } = req.params;
    const updated_note = await NotesModel.findOneAndUpdate({_id:noteId,userId},{...req.body});
    if (!updated_note) {
      return res
        .status(404)
        .send({ message: "Note not found", success: false });
    }
    return res.status(201).send({message: "Note Updated Successfully",success:true})
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});
// =======================================================================================================
// DELETE NOTE =============================
notesController.delete("/delete/:noteId", async (req, res) => {
  try {
    const { userId } = req.body;
    const { noteId } = req.params;
    const deleted_note = await NotesModel.findOneAndDelete({
      userId,
      _id: noteId,
    });
    if (!deleted_note) {
      return res
        .status(404)
        .send({ message: "Note not found", success: false });
    }
    return res.status(200).send({ message: "Note Deleted", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});
// ==============================   ==============================
// EXPORTS  =================================================================
module.exports = { notesController };
// ============================== =================================================================
