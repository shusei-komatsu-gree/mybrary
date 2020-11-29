<template>
  <div>
    <EditForm />
  </div>
</template>

<script>
import EditForm from '~/components/book/EditForm'

export default {
  components: {
    EditForm
  },
  validate ({ params }) {
    // URLの:idが数値でなければ404ページに飛ばす
    return /^\d+$/.test(params.id)
  },
  head () {
    return {
      title: 'Edit'
    }
  }
}
</script>
