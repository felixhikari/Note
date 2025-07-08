const NoteController = require('../controller/noteController');
const AuthController = require('../controller/AuthController');
const authMiddleware = require('../middleware/authMiddleware')

const notesRoute = [
  {
    // Menyimpan
    method: 'POST',
    path: '/notes',
    options: {
      pre: [
        {
          method: authMiddleware
        }
      ],
      handler: NoteController.createNoteHandler
    }
  },
  {
    // Menyimpan
    method: 'POST',
    path: '/auth/register',
    handler: AuthController.signupHandler,
  },
  {
    // Menyimpan
    method: 'POST',
    path: '/auth/login',
    handler: AuthController.loginHandler,
  },
  {
    // Mengambil
    method: 'GET',
    path: '/notes',
    options: {
      pre: [
        {
          method: authMiddleware
        }
      ],
      handler: NoteController.getNotesHandler,
    }
  },
  {
    // Detail
    method: 'GET',
    path: '/notes/{noteId}',
    options: {
      pre: [
        {
          method: authMiddleware
        }
      ],
      handler: NoteController.getNotesHandler,
    }
  },
  // {
  //   // Mengubah
  //   method: 'PUT',
  //   path: '/notes/{noteId}',
  //   handler: NoteController.updateBook,
  // },
  // {
  //   // Menghapus
  //   method: 'DELETE',
  //   path: '/notes/{noteId}',
  //   handler: NoteController.deleteBook,
  // },
];

module.exports = notesRoute;
