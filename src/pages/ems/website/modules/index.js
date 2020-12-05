

export const modules = [
  {
    title: '常规',
    items: [
      {
        alias: '标题',
        type: 'baseTitle',
        icon: require("../assets/ic_text.png"),
        data:{

          title: {
            type: 'inputText',
            value: '测试标题'
          },
          textAlign: {
            type: "inputRadio",
            props: 'align',
            value: 'left'
          }
        },
        component: require('./module-title.vue').default
      },
      {
        alias: '内容',
        type: 'baseContent',
        icon: require("../assets/ic_content.png"),
        data:{
          content: {
            type: 'inputTextarea',
            value: '测试内容'
          }
        },
        component: require('./module-content.vue').default
      },
      {
        alias: '占位',
        type: 'relative',
        icon: require("../assets/ic_rect.png"), //from http://element.eleme.io/#/zh-CN/component/icon
        //children: [],
        data: {
          style: {
            type: 'htmlStyle',
            title: '样式',
            value: {
              height: {
                type: "inputNumber",
                value: "60px"
              }
            }
          }
        },
        component: require('./module-empty-view.vue').default
      },
      // {
      //   alias: '文本',
      //   type: 'txt',
      //   icon: require("../assets/ic_text.png"),
      //   data: {
      //     content: {
      //       type: 'inputTextarea',
      //       value: '测试文字'
      //     },
      //     style: {
      //       type: 'htmlStyle',
      //       title: '样式',
      //       value: {
      //         textAlign: {
      //           type: "inputRadio",
      //           props: 'align',
      //           value: 'left'
      //         },
      //         font: {
      //           type: "inputFont",
      //           value: "normal normal 12px sans-serif"
      //         },
      //         color: {
      //           type: "inputColor",
      //           value: "#555"
      //         },
      //         backgroundColor: {
      //           type: "inputColor",
      //           value: "#eee"
      //         },
      //         padding: {
      //           type: "inputWheel",
      //           value: "8 0 8 15"
      //         },
      //         margin: {
      //           type: "inputWheel",
      //           value: "0 0 0 0"
      //         }
      //       }
      //     }
      //   },
      //   component: require('./module-txt.vue').default
      // }
    ]
  },
  {
    title: '图片',
    items: [
      {
        alias: '图片',
        type: 'poster',
        icon: require("../assets/ic_image.png"),
        data: {
          imageShowMode: {
            type: 'inputImageShowMode',
            value:{
              mode:"single"
            }
          },
          image: {
            type: 'inputImage',
            maxSize:1,
            value: [
              {
                url:'',
                width:440,
                height:0
              },
              {
                url:'',
                width:230,
                height:160
              },
              {
                url:'',
                width:230,
                height:160
              }
            ]
          }
        },
        component: require('./module-poster.vue').default
      },
      {
        alias: '轮播图',
        type: 'swipe',
        icon: require("../assets/ic_gallery.png"),
        data: {
          swipeStyle: {
            type: 'inputSwipeStyle',
            value:{
            }
          },
          image: {
            type: 'inputImage',
            maxSize:9,
            value: [
              {
                url:'',
                height:696,
                width:750
              },
              {
                url:'',
                height:696,
                width:750
              }
            ]
          }
        },
        component: require('./module-swipe.vue').default
      }
    ]
  },
  {
    title:'视频',
    items:[
      {
        alias: '视频',
        type: 'playVideo',
        icon: require("../assets/ic_video.png"),
        data: {
          video: {
            type: 'inputVideo',
            value: 'http://www.w3school.com.cn/i/movie.ogg'
          },
          image: {
            type: 'inputImage',
            maxSize:1,
            value: [
              {
                url:'http://img1.ffan.com/T1xEWTBmET1RCvBVdK',
                height:210,
                width:375
              }
            ]
          }
        },
        component: require('./module-video.vue').default
      }
    ]
  }
]

export let components = {};
import {groups} from "./group"

modules.forEach(function(obj){
  if(obj.items && obj.items.length > 0) {
    obj.items.forEach(function(item){
      components[item.type] = item.component
    })
  }
});

groups.forEach(function (item) {
  components[item.type] = item.component
})
