<template>
  <div>
    <div v-if="user">
      <v-btn
        v-if="checkIfPostLiked(postId)"
        text color="#E57373"
        @click="handleUnlikePost()"
        :loading="loadingLike"
      >
        <v-icon left>mdi-heart</v-icon>
        {{ likes }}
      </v-btn>
      <v-btn
        v-else
        text
        @click="handleLikePost()"
        :loading="loadingLike"
      >
        <v-icon left>mdi-heart-outline</v-icon>
        {{ likes }}
      </v-btn>
    </div>
    <div v-else>
      <v-btn text @click="signinRequired = true">
        <v-icon left>mdi-heart-outline</v-icon>
        <span>
          {{ likes }}
        </span>
      </v-btn>
    </div>
    <SigninRequiredCard
      :dialog.sync="signinRequired"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_POST, LIKE_POST, UNLIKE_POST } from '../queries'

export default {
  name: 'LikeButton',
  props: {
    postId: String,
    likes: Number
  },
  data: () => ({
    loadingLike: false,
    signinRequired: false
  }),
  computed: {
    ...mapGetters(['user', 'userFavorites'])
  },
  methods: {
    closeDialog(){
      this.signinRequired = false;
    },
    checkIfPostLiked(postId) {
      // check if user favorites includes post with id of 'postId'
      const fave = this.userFavorites.some(fave => fave._id === postId);
      return this.userFavorites && fave;
    },
    handleLikePost() {
      this.loadingLike = true;
      const variables = {
        postId: this.postId,
        username: this.user.username
      };
      this.$apollo.mutate({
        mutation: LIKE_POST,
        variables,
        update: (cache, { data: { likePost }}) => {
          const data = cache.readQuery({
            query: GET_POST,
            variables: { postId: this.postId }
          });
          data.getPost.likes += 1;
          cache.writeQuery({
            query: GET_POST,
            variables: { postId: this.postId },
            data
          });
        }
      }).then(({ data }) => {
        this.loadingLike = false;
        const updatedUser = {
          ...this.user,
          favorites: data.likePost.favorites
        };
        this.$store.commit('setUser', updatedUser);
      }).catch(err => {
        this.loadingLike = false;
        console.error(err)
      });
    },
    handleUnlikePost() {
      this.loadingLike = true
      const variables = {
        postId: this.postId,
        username: this.user.username
      };
      this.$apollo.mutate({
        mutation: UNLIKE_POST,
        variables,
        update: (cache, { data: { unlikePost }}) => {
          const data = cache.readQuery({
            query: GET_POST,
            variables: { postId: this.postId }
          });
          data.getPost.likes -= 1;
          cache.writeQuery({
            query: GET_POST,
            variables: { postId: this.postId },
            data
          });
        }
      }).then(({ data }) => {
        this.loadingLike = false;
        const updatedUser = {
          ...this.user,
          favorites: data.unlikePost.favorites
        };
        this.$store.commit('setUser', updatedUser);
      }).catch(err => {
        this.loadingLike = false;
        console.error(err);
      });
    },
  },
}
</script>
