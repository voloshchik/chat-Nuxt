export const state = () => {
  return {
    user: {}
  };
};

export const mutations = {
  setUser(state, user) {
    console.log(user);
    return (state.user = user);
  }
};
export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log("Message received", data);
  }
};
