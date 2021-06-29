<template>
  <el-container style="height: 100%">
    <el-main>
      <div id="container"></div>
    </el-main>
  </el-container>
</template>

<script>
import G6 from '@antv/g6';

export default {
  name: "demo-g6",
  data() {
    return {
      data:{
        "id": "Modeling Methods",
        "children": [
          {
            "id": "Classification",
            "children": [
              { "id": "Multiple linear regression" ,"children":[{
                  "id": "Consensus",
                  "children": []
                }]},
              {
                "id": "Regression",
                "children": [
                ]
              },
              {
                "id": "1",
                "children": [
                ]
              }
              ]
          }
        ]
      },
    }
  },
  mounted() {
    // this.initG6()
    // this.initG6View()
    this.demoG6()
  },
  methods:{
    initG6(){

      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
        .then((res) => res.json())
        .then((data) => {
          const container = document.getElementById('container');
          const width = container.scrollWidth;
          const height = container.scrollHeight || 500;
          const graph = new G6.TreeGraph({
            container: 'container',
            width,
            height,
            modes: {
              default: [
                {
                  type: 'collapse-expand',
                  onChange: function onChange(item, collapsed) {
                    const data = item.getModel();
                    data.collapsed = collapsed;
                    return true;
                  },
                },
                'drag-canvas',
                'zoom-canvas',
              ],
            },
            defaultNode: {
              size: 26,
              anchorPoints: [
                [0, 0.5],
                [1, 0.5],
              ],
            },
            defaultEdge: {
              type: 'cubic-horizontal',
            },
            layout: {
              type: 'indented',
              direction: 'LR',
              dropCap: false,
              indent: 200,
              getHeight: () => {
                return 60;
              },
            },
          });

          graph.node(function (node) {
            return {
              label: node.id,
              labelCfg: {
                offset: 10,
                position: node.children && node.children.length > 0 ? 'left' : 'right',
              },
            };
          });

          graph.data(this.data);
          graph.render();
          graph.fitView();

          if (typeof window !== 'undefined')
            window.onresize = () => {
              if (!graph || graph.get('destroyed')) return;
              if (!container || !container.scrollWidth || !container.scrollHeight) return;
              graph.changeSize(container.scrollWidth, container.scrollHeight);
            };
        });
    },
    initG6View(){
      G6.registerNode('card-node', {
        draw: function drawShape(cfg, group) {
          const r = 2;
          const color = '#5B8FF9';
          const w = cfg.size[0];
          const h = cfg.size[1];
          const shape = group.addShape('rect', {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: w, //200,
              height: h, // 60
              stroke: color,
              radius: r,
              fill: '#fff',
            },
            name: 'main-box',
            draggable: true,
          });

          group.addShape('rect', {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: w, //200,
              height: h / 2, // 60
              fill: color,
              radius: [r, r, 0, 0],
            },
            name: 'title-box',
            draggable: true,
          });

          // title text
          group.addShape('text', {
            attrs: {
              textBaseline: 'top',
              x: -w / 2 + 8,
              y: -h / 2 + 2,
              lineHeight: 20,
              text: cfg.id,
              fill: '#fff',
            },
            name: 'title',
          });
          cfg.children && group.addShape('marker', {
            attrs: {
              x: w / 2,
              y: 0,
              r: 6,
              cursor: 'pointer',
              symbol: G6.Marker.collapse,
              stroke: '#666',
              lineWidth: 1,
              fill: '#fff',
            },
            name: 'collapse-icon',
          });
          group.addShape('text', {
            attrs: {
              textBaseline: 'top',
              x: -w / 2 + 8,
              y: -h / 2 + 24,
              lineHeight: 20,
              text: 'description',
              fill: 'rgba(0,0,0, 1)',
            },
            name: `description`,
          });
          return shape;
        },
        setState(name, value, item) {
          if (name === 'collapsed') {
            const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon');
            const icon = value ? G6.Marker.expand : G6.Marker.collapse;
            marker.attr('symbol', icon);
          }
        },
      });

      const data = {
        id: 'A',
        children: [
          {
            id: 'A1',
            children: [{ id: 'A11' }, { id: 'A12' }, { id: 'A13' }, { id: 'A14' }],
          },
          {
            id: 'A2',
            children: [
              {
                id: 'A21',
                children: [{ id: 'A211' }, { id: 'A212' }],
              },
              {
                id: 'A22',
              },
            ],
          },
        ],
      };

      const container = document.getElementById('container');
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;

      const graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        modes: {
          default: ['drag-canvas'],
        },
        defaultNode: {
          type: 'card-node',
          size: [100, 40],
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            endArrow: true,
          },
        },
        layout: {
          type: 'indented',
          direction: 'LR',
          dropCap: false,
          indent: 200,
          getHeight: () => {
            return 60;
          },
        },
      });

      graph.data(data);
      graph.render();
      graph.fitView();
      graph.on('node:click', (e) => {
        if (e.target.get('name') === 'collapse-icon') {
          e.item.getModel().collapsed = !e.item.getModel().collapsed;
          graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed);
          graph.layout();
        }
      });

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    },
    demoG6(){
      // 定义数据源
      const data = {
        // 点集
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200,
            size: 100,
            type: 'image',
            img: 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
          },
          {
            id: 'node2',
            x: 300,
            y: 200,
            size: 100,
            type: 'image',
            img: 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
          },
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: 'node1',
            target: 'node2',
          },
        ],
      };
      // 创建 G6 图实例
      const graph = new G6.Graph({
        container: 'container', // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 800,
        height: 500,
      });
      // 读取数据
      graph.data(data);
      // 渲染图
      graph.render();
    }
  }
}
</script>

<style scoped>

</style>
