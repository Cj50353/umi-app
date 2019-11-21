export const data = {
  nodes: [
    {
      id: '1',
      data:{
        couNo:'1',
        couAmount:'100',
        orgin:'江西银行江西银行江西银行银行'
      }
    },
    {
      id: '2',
      data:{
        couNo:'2',
        couAmount:'200',
        orgin:'s2'
      }
    },
    {
      id: '3',
      data:{
        couNo:'3',
        couAmount:'300',
        orgin:'s3'
      }
    },
    {
      id: '4',
      data:{
        couNo:'4',
        couAmount:'400',
        orgin:'s4'
      }
    },
    {
      id: '5',
      data:{
        couNo:'5',
        couAmount:'500',
        orgin:'s5'
      }
    },
    {
      id: '6',
      data:{
        couNo:'6',
        couAmount:'600',
        orgin:'s6'
      }
    },
    {
      id: '7',
      data:{
        couNo:'7',
        couAmount:'700',
        orgin:'s7'
      }
    },
    {
      id: '8',
      data:{
        couNo:'8',
        couAmount:'800',
        orgin:'s8'
      }
    },
    {
      id: '9',
      data:{
        couNo:'9',
        couAmount:'900',
        orgin:'s9'
      }
    }
  ],
  edges: [
    {
      source: '1',
      target: '2',
      data: {
        type: '凭证开立',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '1',
      target: '3',
      data: {
        type: '凭证转让',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '2',
      target: '5',
      data: {
        type: '凭证开立',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '5',
      target: '6',
      data: {
        type: '凭证转让',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '3',
      target: '4',
      data: {
        type: '凭证融资',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '4',
      target: '7',
      data: {
        type: '凭证转让',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '1',
      target: '8',
      data: {
        type: '凭证转让',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    },
    {
      source: '1',
      target: '9',
      data: {
        type: '凭证融资',
        amount: '100,000,000,00 元',
        date: '2019-08-03'
      }
    }
  ]
};