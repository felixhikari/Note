const Note = require('../model/Note');
const { formatedDate, formatedTime } = require('../utill/utill');
const ResponseError = require('../error/error');
const { Types } = require('mongoose');

const createNote = async (request) => {
  console.log('Create Note request received:', request.payload);
  const note = new Note({
    userId: request.user.userId,
    title: request.payload.title,
    content: request.payload.content,
    category: request.payload.category,
    datestamp: new Date(),
  });
  await note.save();

  console.log('Note created successfully:', note.noteId);
  return {
    status: 'success',
    message: 'Note created successfully',
    data: {
      noteId: note._id,
      title: note.title,
      content: note.content,
      category: note.category,
    },
  };
};

const getNotes = async (request) => {
  console.log('Get Notes request received:', request.params, request.query);
  const { noteId } = request.params;
  const userId = request.user.userId;
  console.log('User ID:', userId);
  console.log('Note ID:', noteId);
  const { search, startDate, endDate } = request.query;
  const query = {};
  
  console.log('Lolos:', query);

  if ((search || startDate || endDate) && !noteId) {
    console.log('Searching notes with criteria:', { search, startDate, endDate });
    if (search) {
      // query.title = { $regex: `.*${search}.*`, $options: 'i' }; // Case-insensitive search
      // query.title = 'Test'; // Case-insensitive search
    }
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt= { $gte : new Date(startDate)};
        query.createdAt= { $gte : new Date(startDate)};
      }
      if (endDate) {
        query.createdAt= { $lte:  new Date(endDate)};
      }
    }
    console.log('Query for search notes:', query);
    const data = await Note.find({
      title: {
        $regex: search ? `.*${search}.*` : '',
        $options: 'i', // Case-insensitive search
      }
    });

    let formatedNotes;

    if (data.length === 0) {

      formatedNotes = data.map(note => ({
        ...note._doc,
        date: formatedDate(note._doc.createdAt),
      }));
    } else {
      formatedNotes = [];
    }

    return {
      status: 'success',
      message: 'Notes retrieved successfully',
      data: {
        notes: formatedNotes,
      },
    };
  }

  if (!noteId && !search && !startDate && !endDate) {
    const data = await Note.find(query);
    console.log('Fetching notes:');
    console.log('Query:', query);
    if (data.length === 0) {
      throw new ResponseError(404, 'No notes found', 'NotFoundError');
    }
    const formatedNotes = data.map(note => ({
      ...note._doc,
      date: formatedDate(note._doc.createdAt),
    }));

    console.log('Formatted notes:', formatedNotes);
    return {
      status: 'success',
      message: 'Notes retrieved successfully',
      data: {
        notes: formatedNotes,
      },
    };
  }

  console.log('Fetching note by ID:', noteId);
  query._id = noteId; // If noteId is provided, fetch that specific note
  console.log('Query for single note:', query);
  const note = await Note.findById(query);
  if (!note) {
    throw new ResponseError(404, 'Note not found', 'NotFoundError');
  }
  console.log('Note found:', note);
  return {
    status: 'success',
    message: 'Note retrieved successfully',
    data: {
      note: {
        _id: note._id,
        title: note.title,
        content: note.content,
        category: note.category,
        date: formatedDate(note.createdAt),
      },
    },
  };
};

module.exports = {
  createNote, getNotes,
};
