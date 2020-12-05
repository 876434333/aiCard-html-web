/**
 * Created by flb on 2018/7/26.
 */
export const groups = [
  {
    alias: '企业简介',
    type: 'companyInfo',
    icon: require("../../assets/ic_company.png"),
    data:{

      title: {
        type: 'inputText',
        value: '企业简介'
      },
      textAlign: {
        type: "inputRadio",
        props: 'align',
        value: 'left'
      },
      content: {
        type: 'inputTextarea',
        value: '测试文字'
      }
    },
    component: require('./group-company-info.vue').default
  },
  {
    alias: '地址',
    type: 'companyAddress',
    icon: require("../../assets/ic_address.png"),
    data:{
      title: {
        type: 'inputText',
        value: '公司地址',
      },
      textAlign: {
        type: "inputRadio",
        props: 'align',
        value: 'left'
      },
      address: {
        type: 'inputTextarea',
        value: '测试文字'
      }
    },
    component: require('./group-address.vue').default
  },
  {
    alias: '公司电话',
    type: 'companyPhone',
    icon: require("../../assets/ic_company_phone.png"),
    data:{

      title: {
        type: 'inputText',
        value: '公司电话'
      },
      textAlign: {
        type: "inputRadio",
        props: 'align',
        value: 'left'
      },
      phone: {
        type: 'inputText',
        value: '0592-000000',
        rules:[
          {
            validator:function (rule,value,callback) {
              let tel = rule.field;
              let isTel = /^[0-9\+\-]*$/.test(tel);
              if (!isTel){
                callback(new Error("只允许输入数字,'-'和'+'"));
                return;
              }
              callback();
            },trigger: 'blur',
          }
        ]
      }
    },
    component: require('./group-phone.vue').default
  },
  {
    alias: '联系我们',
    type: 'contactUs',
    icon: require("../../assets/ic_contact_us.png"),
    data:{

      title: {
        type: 'inputText',
        value: '联系我们'
      },
      textAlign: {
        type: "inputRadio",
        props: 'align',
        value: 'left'
      },
      employee :{
        type: 'inputEmployee',
        value:[

        ]
      }
    },
    component: require('./group-contact.vue').default
  }
]
