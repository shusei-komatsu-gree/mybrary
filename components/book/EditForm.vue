<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-text-field v-model="title" :counter="50" :rules="titleRules" label="Title" required />
    <v-text-field v-model="description" :counter="140" :rules="descriptionRules" label="Description" />
    <v-text-field v-model="link" :rules="linkRules" label="Link URL for the Book" />
    <v-text-field v-model="image" :rules="imageRules" label="Image URL for the Book" />
    <v-img v-if="image" :src="image" class="image" @load="image_ready=true" />
    <v-btn type="submit" :disabled="!valid" class="mt-3" v-text="'Save & Back'" />
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 50) || 'Title must be less than 50 characters'
    ],
    description: '',
    descriptionRules: [
      v => !v || v.length <= 140 || 'Description must be less than 140 characters'
    ],
    link: '',
    linkRules: [
      v => !v || /https?:\/\/[\w!?/+\-_~;.,*&@#$%()'[\]]+/.test(v) || 'Link URL must be valid'
    ],
    image: '',
    imageRules: [
      v => !v || /https?:\/\/[\w!?/+\-_~;.,*&@#$%()'[\]]+/.test(v) || 'Image URL must be valid'
    ],
    image_ready: false
  }),
  watch: {
    image () { this.image_ready = false }
  },
  mounted () {
    const book = this.$store.getters['book/find'](this.$route.params.id)
    if (!book) {
      alert('Book is not found')
      this.$router.replace('/')
      return
    }
    this.title = book.title
    this.description = book.description
    this.link = book.link
    this.image = book.image
  },
  methods: {
    submit () {
      if (!this.$refs.form.validate()) { return }
      const id = this.$route.params.id
      const book = {
        title: this.title,
        description: this.description,
        link: this.link,
        image: this.image_ready ? this.image : ''
      }
      this.$store.dispatch('book/update', { id, book })
      this.$router.replace('/')
    }
  }
}
</script>
<style scoped>
.image {
  max-width: 320px;
  max-height: 180px;
  background-size: contain;
  background-image: url("/loading.gif");
}
</style>
