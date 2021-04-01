<template>
  <div class="c-wrrap">
    <div class="c-chat">
      <Message
        v-for="m in messages"
        :key="m.text"
        :name="m.name"
        :text="m.text"
        owner
      />
    </div>
    <div class="c-form">
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ChatForm from "../components/ChatForm.vue";
import Message from "../components/Message.vue";

export default {
  middleware: ["chat"],
  head() {
    return {
      title: `Комната ${this.user.room}`
    };
  },
  computed: mapState(["user", "messages"]),
  components: { Message, ChatForm }
};
</script>

<style scoped>
.c-wrrap {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.c-chat {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}

.c-form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
  background: #212121;
}
</style>
