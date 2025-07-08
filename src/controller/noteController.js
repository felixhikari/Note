const { createNote, getNotes } = require('../service/NoteService');

const createNoteHandler = async (request, h) => {
  console.log('Create Note request received:');
  const response = await createNote(request);
  return h.response(response).code(200);
};

const getNotesHandler = async (request, h) => {
  console.log('Get Notes request received:');
  const response = await getNotes(request);
  console.log('Response from getNotes:', response);
  return h.response(response).code(200);
};

module.exports = {
  createNoteHandler, getNotesHandler,
};
