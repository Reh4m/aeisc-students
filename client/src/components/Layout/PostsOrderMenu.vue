<template>
  <v-menu transition="scroll-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn
        color="darklighten"
        text
        v-on="on"
      >
        <v-icon left>mdi-sort-variant</v-icon>
        Sort by
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group color="#FF6B6B" mandatory>
        <v-list-item
          v-for="(item, index) in sortPostsItems"
          :key="index"
          @click="sortPosts(item.by, item.order)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'PostsOrderMenu',
  data: () => ({
    sortPostsItems: [
      { title: "Newest (default)", by: 'createdDate', order: 'desc'},
      { title: "Oldest", by: 'createdDate', order:  'asc' },
      { title: "Most likes", by: 'likes', order: 'desc' },
      { title: "Least likes", by: 'likes', order: 'asc' },
      { title: "Alphabetical (A-Z)", by: 'title', order: 'asc' },
      { title: "Alphabetical (Z-A)", by: 'title', order: 'desc' }
    ],
  }),
  methods: {
    sortPosts(by, order) {
      this.$emit('sortPosts', by, order)
    }
  }
}
</script>

<style>

</style>
