export const data = {
  nodes: [
    {
      id: '1',
      data:{
        couNo:'1',
        couAmountInCent:'100',
        orgin: '江西银行江西银行江西银行银行',
        holderCompanyName:'公司 a'
      }
    },
    {
      id: '2',
      data:{
        couNo:'2',
        couAmountInCent: '200',
        holderCompanyName:'公司 a',
        orgin:'s2'
      }
    },
    {
      id: '3',
      data:{
        couNo:'3',
        couAmountInCent:'300',
        holderCompanyName:'公司 a',
        orgin:'s3'
      }
    },
    {
      id: '4',
      data:{
        couNo:'4',
        couAmountInCent: '400',
        holderCompanyName:'公司 a',
        orgin:'s4'
      }
    },
    {
      id: '5',
      data:{
        couNo:'5',
        couAmountInCent: '500',
        holderCompanyName:'公司 a',
        orgin:'s5'
      }
    },
    {
      id: '6',
      data:{
        couNo:'6',
        couAmountInCent: '600',
        holderCompanyName:'公司 a',
        orgin:'s6'
      }
    },
    {
      id: '7',
      data:{
        couNo:'7',
        couAmountInCent: '700',
        holderCompanyName:'公司 a',
        orgin:'s7'
      }
    },
    {
      id: '8',
      data:{
        couNo:'8',
        couAmountInCent: '800',
        holderCompanyName:'公司 a',
        orgin:'s8'
      }
    },
    {
      id: '9',
      data:{
        couNo:'9',
        couAmountInCent: '900',
        holderCompanyName:'公司 a',
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
