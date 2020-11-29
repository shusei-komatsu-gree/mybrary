<template>
  <!-- vuetifyによって、バリデーション付きのリッチな入力フォームを簡単に作成できる -->
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-text-field v-model="title" :counter="50" :rules="titleRules" label="Title" required />
    <v-text-field v-model="description" :counter="140" :rules="descriptionRules" label="Description" />
    <v-text-field v-model="link" :rules="linkRules" label="Link URL for the Book" />
    <v-text-field v-model="image" :rules="imageRules" label="Image URL for the Book" />
    <v-img v-if="image" :src="image" class="image" @load="imageReady=true" />
    <v-btn type="submit" :disabled="!valid" class="mt-3" v-text="'Add Book'" />
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
    imageReady: false
  }),
  watch: {
    // v-imgでロードが成功しない限り、画像の保存を許すimageReadyはfalseにしておく
    image () { this.imageReady = false }
  },
  methods: {
    submit () {
      if (!this.$refs.form.validate()) { return }
      this.$store.dispatch('book/create', {
        title: this.title,
        description: this.description,
        link: this.link,
        image: this.imageReady ? this.image : ''
      }).then(() => this.$refs.form.reset())
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
