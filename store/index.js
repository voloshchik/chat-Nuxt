export const state = () => {
  return {
    user: {},
    messages: [],
    users: []
  };
};

export const mutations = {
  setUser(state, user) {
    console.log(user);
    state.user = user;
    state.messages = [];
  },
  clearData(state) {
    state.user = {};
    state.message = {};
    state.users = [];
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  }
};
