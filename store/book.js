// 監視対象のデータ。MVVMのModelに相当する部分の核
export const state = () => {
  return {
    books: []
  }
}

// stateのデータを取得・フィルターするのに使う関数群
export const getters = {
  all: state => state.books,
  find: state => id => state.books[id]
}

// stateを変更するのに使う関数群
export const mutations = {
  set: (state, books) => (state.books = books),
  create: (state, book) => state.books.push(book),
  update: (state, { id, book }) => parseInt(id) < state.books.length ? (state.books[id] = book) : 0,
  destroy: (state, book) => (state.books = state.books.filter(b => b !== book))
}

// stateを直接変更せず、mutationを実行する
// APIによるデータ取得・永続化をする場合は、ここでmutationsの実行と一緒に行える
export const actions = {
  fetch: ({ commit }) => commit('set', lsGet()),
  create: ({ state, commit }, book) => { commit('create', book); lsSet(state.books) },
  update: ({ state, commit }, { id, book }) => { commit('update', { id, book }); lsSet(state.books) },
  destroy: ({ state, commit }, book) => { commit('destroy', book); lsSet(state.books) }
}

// ローカルストレージ関連コード
const LS_KEY = 'mybrary_books'

function lsSet (books) {
  localStorage.setItem(LS_KEY, JSON.stringify(books))
}

function lsGet () {
  return JSON.parse(localStorage.getItem(LS_KEY)) || []
}
