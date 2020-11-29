<template>
  <div>
    <NewForm />
    <List class="mt-5" />
  </div>
</template>

<script>
import NewForm from '~/components/book/NewForm'
import List from '~/components/book/List'

export default {
  components: {
    NewForm,
    List
  },
  // SSRで初期データをAPIアクセスで取得するならこんな感じ
  // async asyncData (context) {
  //   return await axios.get('/books').then((res) => {
  //     context.$store.dispatch('book/fetch', res.data)
  //   })
  // },
  created () {
    this.$store.dispatch('book/fetch')
  }
}
</script>
