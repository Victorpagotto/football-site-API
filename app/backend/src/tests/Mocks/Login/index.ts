const loginMock = {
  correct: {
    user: {
      email: 'email@email.com',
      password: 'SuperSecretSecret',
    },
    userSession: {
      id: 2,
      username: 'User',
      role: 'admin',
      email: 'user@xablau.com',
    },
    role: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicGFzc3dvcmQiOiJteVN1cGVyU2VjcmV0In0sImlhdCI6MTY2NjQ5NDg5NH0.IKt-wTHuQ2aZC-aq1aO60yJJVUQkdyq05PW5J66NiQE',
  },
  JWTHash: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicGFzc3dvcmQiOiJteVN1cGVyU2VjcmV0In0sImlhdCI6MTY2NjQ5NDg5NH0.IKt-wTHuQ2aZC-aq1aO60yJJVUQkdyq05PW5J66NiQE',
  correctResponse: {
    user: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicGFzc3dvcmQiOiJteVN1cGVyU2VjcmV0In0sImlhdCI6MTY2NjQ5NDg5NH0.IKt-wTHuQ2aZC-aq1aO60yJJVUQkdyq05PW5J66NiQE',
    },
    role: {
      role: "admin",
    }
  },
  incorrect: {
    noEmail: {
      password: 'SuperSecretSecret',
    },
    noPassword: {
      email: 'email@email.com',
    },
    invalidPassword: {
      email: 'email@email.com',
      password: 'bipi',
    },
    invalidEmail: {
      email: 'this is not a email bro, trust me@.com',
      password: 'SuperSecretSecret',
    },
    wrongPassword: {
      email: 'email@email.com',
      password: 'bipibopibupi',
    },
    userNotFound: {
      
    }
  },
  messages: {
    noEmail: { message: 'All fields must be filled' },
    noPassword: { message: 'All fields must be filled' },
    invalidPassword: { message: 'Incorrect email or password' },
    invalidEmail: { message: 'Incorrect email or password' },
    wrongPassword: { message: 'Incorrect email or password' },
    wrongToken: { message: 'Token must be a valid token' },
    userNotFound: { message: 'User not found.' },
  },
}
export default loginMock;