export const state = () => {
  return {
    user: {},
    messages: []
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
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  }
};
