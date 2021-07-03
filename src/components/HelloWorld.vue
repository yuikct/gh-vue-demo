<template>
    <el-container style="height: 100%">
      <el-header>
        <h6>{{ msg }}</h6>
      </el-header>
      <el-main>
        <el-collapse v-model="activeName" accordion class="module-collapse">
            <el-collapse-item :title="item.title" :name="index" v-for="(item,index) in globalOption" :key="index">
              <ul>
                <li v-for="(items,idx) in item.children" :key="idx">
                  <span>{{items.label}}</span>
                  <div @click="goToLink(items.link)">跳转</div>
                </li>
              </ul>
            </el-collapse-item>

        </el-collapse>
      </el-main>
      <el-footer>
        footer
      </el-footer>
    </el-container>


</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeName: '',
      globalOption:[{
        title:'AntV/G6',
        children:[{
          label:'image节点链路',
          link:'/demoG6'
        },{
          label:'拖动分割线',
          link:'/drag'
        },{
          label:'vuex-store',
          link:'/demoStore'
        }]
      },{
        title:'拖动dom小实例',
        children:[{
          label:'拖动分割线',
          link:'/drag'
        }]
      },{
        title:'vuex-state状态管理',
        children:[{
          label:'vuex-store',
          link:'/demoStore'
        }]
      },]
    }
  },
  methods: {
    goToLink(link){
      this.$router.push(link)
    },
    // toG6() {
    //   this.$router.push('/demo')
    // }
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
.module-collapse ul{
  display: flex;
  flex-direction: column;
}
.module-collapse ul li{
  display: flex;
  justify-content: space-between;
  line-height: 30px;
}

</style>
