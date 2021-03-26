<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn @click="message">Create Message</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  sockets: {
    connect() {
      console.log("client IO conected");
    }
  },
  methods: {
    message() {
      this.$socket.emit("createMessage", {
        text: "FROM CLIENT"
      });
      console.log("ddddddddddd");
    }
  },

  components: {}
};
</script>
