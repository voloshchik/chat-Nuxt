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
  }
};
export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log("Message received", data);
  }
};
