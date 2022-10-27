<template>
  <v-card flat hover>
    <router-link :to="`/posts/${post._id}`">
      <v-img
        height="30vh"
        :src="post.imageUrl"
        v-ripple
      />
    </router-link>
    <v-list-item>
      <v-list-item-avatar v-if="post.createdBy">
        <slot></slot>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <span class="caption darklighten--text font-weight-bold">
            {{ post.title }}
          </span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span class="caption font-weight-bold">
            {{ post.likes }} Likes • {{ post.messageCount }} Messages
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import moment from "moment";
import { mapGetters } from 'vuex';

export default {
  name: 'PostCard',
  props: {
    post: Object
  },
  computed: {
    ...mapGetters(["user", "loading", "userFavorites"])
  },
  methods: {
    formatDate: date => moment(date).format('LL'),
    goToPost(postId) {
      this.$router.push(`/posts/${postId}`);
    },
  }
};
</script>
