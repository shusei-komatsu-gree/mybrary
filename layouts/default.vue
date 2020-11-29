<template>
  <v-app>
    <!-- ヘッダー -->
    <v-app-bar :fixed="true" app>
      <v-toolbar-title v-text="'Mybrary'" />
    </v-app-bar>

    <!-- メインコンテンツ -->
    <v-main>
      <v-container>
        <transition name="fade">
          <nuxt /> <!-- このnuxtタグにpagesが埋め込まれる -->
        </transition>
      </v-container>
    </v-main>

    <!-- フッター -->
    <v-footer :absolute="true" app>
      <span>&copy; 2020 Glossom</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
}
</script>
