export default {
  admin: {
    validAdmin: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$blHhCsmxPNlv/2GJLd.IPuFKTtuRpu7mSYVE4ysYe5pf6IUKBqv8.',
    },
    invalidAdmin: {
      id: 1,
      username: 'Admin',
      email: 'admin@xablau.com',
      password: '$2a$08$blHhCsmxPNlv/2GJLd.IPuFKTtuRpu7mSYVE4ysYe5pf6IUKBqv8.',
    },
  },
  user: {
    validUser: {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$blHhCsmxPNlv/2GJLd.IPuFKTtuRpu7mSYVE4ysYe5pf6IUKBqv8.',
    },
    invalidUser: {
      id: 2,
      username: 'User',
      email: 'user@xablau.com',
      password: '$2a$08$blHhCsmxPNlv/2GJLd.IPuFKTtuRpu7mSYVE4ysYe5pf6IUKBqv8.',
    },
  },
  password: {
    word: 'SuperSecretSecret',
    cycle: 8,
  },
};