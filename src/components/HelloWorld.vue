<template>
  <div class="hello">
    <h6>{{ msg }}</h6>
    <el-button @click="toG6">跳转g6</el-button>
<!--    <el-button @click="toDrag">跳转Drag</el-button>-->
    <router-link to="/drag">跳转Drag</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    toG6(){
      this.$router.push('/demo')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
