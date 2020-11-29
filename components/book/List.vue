<template>
  <v-card class="elevation-3">
    <v-card-title>
      My Books
      <v-spacer />
      <!-- v-data-tableとリアクティブなsearchを組合せ、表の検索機能を簡単に実現 -->
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" />
    </v-card-title>
    <v-card-text>
      <!-- slotという仕組みによって、vuetifyのコンポーネントを簡単かつ柔軟にカスタマイズできる -->
      <v-data-table :headers="headers" :items="booksRev" :search="search">
        <!-- 1列目：画像を表示するようカスタマイズ -->
        <template v-slot:[`item.image`]="{ item }">
          <v-img v-if="item.image" :src="item.image" class="image my-3" />
          <v-row v-else justify="center" v-text="'No Image'" />
        </template>
        <!-- 2列目：リンク付きタイトルを表示するようカスタマイズ -->
        <template v-slot:[`item.title`]="{ item }">
          <a v-if="item.link" :href="item.link" target="_blank" v-text="item.title" />
          <span v-else>{{ item.title }}</span>
        </template>
        <!-- 3列目：詳細の上下にスペースを入れるようカスタマイズ -->
        <template v-slot:[`item.description`]="{ item }">
          <div class="my-3" v-text="item.description" />
        </template>
        <!-- 4列目：編集・削除ボタンを配置するようカスタマイズ -->
        <template v-slot:[`item.actions`]="{ item }">
          <nuxt-link :to="`/book/${$store.getters['book/all'].indexOf(item)}`" class="icon-link">
            <v-icon class="mr-5" v-text="'mdi-pencil'" />
          </nuxt-link>
          <v-icon @click="destroy(item)" v-text="'mdi-delete'" />
        </template>
        <!-- データが空のときの表示をカスタマイズ -->
        <template v-slot:no-data>
          No book registered
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: '',
    headers: [ // ヘッダーの設定
      { text: 'Image', value: 'image', sortable: false },
      { text: 'Title', value: 'title', width: 180 },
      { text: 'Description', value: 'description', sortable: false },
      { text: '', value: 'actions', sortable: false, width: 120 }
    ]
  }),
  computed: {
    // 新しく作成されたものが上に来るよう、逆順にしてテーブルへ表示する
    booksRev () { return this.$store.getters['book/all'].slice().reverse() }
  },
  methods: {
    destroy (book) {
      if (!confirm(`Are you sure you want to delete ${book.title}?`)) { return }
      this.$store.dispatch('book/destroy', book)
    }
  }
}
</script>

<style scoped>
.image {
  max-width: 160px;
  max-height: 90px;
  background-size: contain;
  background-image: url("/loading.gif");
}

.icon-link {
  text-decoration: none;
}
</style>
