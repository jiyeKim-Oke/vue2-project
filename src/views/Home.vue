<template>
  <div>
    <h2>TUI Grid 예제</h2>
    <div ref="grid" ></div>
  </div>
</template>

<script>
import 'tui-grid/dist/tui-grid.css'
import 'tui-pagination/dist/tui-pagination.css'
import Grid from 'tui-grid'

export default {
  name: 'HelloGrid',
  props: {
    // msg: String
  },
  mounted() {

    // const vm = this
    const data = this.$store.getters.getPosts

    // 그리드 생성
    this.grid = new Grid({
      el: this.$refs.grid,
      columns: [
        { header: 'No.', name: 'no', width: 5, align: 'center', sortable: true },
        { header: '제목', name: 'title', align: 'center', sortable: true},
        { header: '작성자', name: 'writer', width: 100, align: 'center' , sortable: true},
        { header: '댓글갯수', name: 'cnt', width: 100, align: 'right' , sortable: true},
      ],
      data,
      bodyHeight: 230,
      pageOptions: {
        useClient: true,	// front에서만 페이징 하는 속성
        perPage: 5
      }
    })

    this.grid.on('click', (ev) => {
      const { rowKey, columnName } = ev
      if (columnName === 'title') {
        const rowData = this.grid.getRow(rowKey)
        this.$store.commit('setSelectedPost', rowData)
        const no = rowData.no
        const url = `/detail/${no}`
        window.open(url, '_blank')
        // alert(url);
        // vm.$router.push(`/detail/${no}`)
      }
    })

  },
  beforeDestroy() {
    if (this.grid) {
      this.grid.destroy()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
