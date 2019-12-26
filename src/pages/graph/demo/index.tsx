import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import "@antv/graphin/dist/index.css"; // 引入Graphin CSS
import './index.css'
import { data } from '../data';

interface Register{
  /** 通过G6原生方法，注册节点 */
  nodeShape?: (G6: G6Type) => Register[];
  /** 通过G6原生方法，注册边 */
  edgeShape?: (G6: G6Type) => Register[];
  /** 通过G6原生方法，注册事件 */
  behavior?: (G6: G6Type) => BehaviorRegister[];
}

interface Register {
  /** 节点名称 */
  name: string;
  /** register执行函数,参数为G6对象 */
  register: (G6: G6Type) => void;
}

interface BehaviorRegister extends Register {
  options: any;
  mode: string;
}

export default  class  GraphinDemo extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      register:{
        nodeShape: (G6) => [{
          name: "node",
          register: () => {
            G6.registerNode('node', {
                drawShape: function drawShape(cfg, group) {
                  const width = cfg.style.width;
                  const stroke = cfg.style.stroke;
                  const rect = group.addShape('rect', {
                    attrs: {
                      x: -width / 2,
                      y: -15,
                      width,
                      height: 90,
                      radius: 3,
                      stroke,
                      lineWidth: 0.6,
                      fillOpacity: 1,
                      fill: '#fff'
                    }
                  });
                  // const point1 = group.addShape('circle', {
                  //   attrs: {
                  //     x: -width / 2,
                  //     y: 0,
                  //     r: 3,
                  //     fill: stroke
                  //   }
                  // });
                  // const point2 = group.addShape('circle', {
                  //   attrs: {
                  //     x: width / 2,
                  //     y: 0,
                  //     r: 3,
                  //     fill: stroke
                  //   }
                  // });

                  const startPoint = {
                    x: -width / 2,
                    y: -15 / 2
                  };
                  const endPoint = {
                    x: width / 2,
                    y: 45 / 2
                  };

                  const Ydiff = endPoint.y - startPoint.y;

                  const slope = Ydiff !== 0 ? 500 / Math.abs(Ydiff) : 0;

                  const cpOffset = 4;
                  const offset = Ydiff < 0 ? cpOffset : -cpOffset;

                  const line1EndPoint = {
                    x: startPoint.x + slope,
                    y: endPoint.y + offset
                  };
                  const line2StartPoint = {
                    x: line1EndPoint.x + cpOffset,
                    y: endPoint.y
                  };


                  const labelLeftOffset = 50;
                  const labelTopOffset = 0;

                  // couAmount
                  const couAmountText = group.addShape('text', {
                    attrs: {
                      text: 'COU金额:',
                      x: line2StartPoint.x + labelLeftOffset,
                      y: endPoint.y - labelTopOffset - 2,
                      fontSize: 14,
                      fontWeight: 300,
                      textAlign: 'right',
                      textBaseline: 'top',
                      fill: '#000000D9',
                    }
                  });
                  // couNo
                  const couNoText = group.addShape('text', {
                    attrs: {
                      text: 'COU编号:',
                      x: line2StartPoint.x + labelLeftOffset,
                      y: endPoint.y - labelTopOffset - couAmountText.getBBox().height - 2,
                      fontSize: 14,
                      fontWeight: 300,
                      textAlign: 'right',
                      textBaseline: 'top',
                      fill: '#000000D9'
                    }
                  });

                  // orgin
                  const orginText = group.addShape('text', {
                    attrs: {
                      text: '供应商:',
                      x: line2StartPoint.x + labelLeftOffset,
                      y: endPoint.y - labelTopOffset + couAmountText.getBBox().height - 2,
                      fontSize: 14,
                      fontWeight: 300,
                      textAlign: 'right',
                      textBaseline: 'top',
                      fill: '#000000D9'
                    }
                  });

                  // couAmount
                  const couAmount = group.addShape('text', {
                    attrs: {
                      text: cfg.data.couAmount,
                      x: line2StartPoint.x + labelLeftOffset + 5,
                      y: endPoint.y - labelTopOffset - 2,
                      fontSize: 14,
                      fontWeight: 300,
                      textAlign: 'left',
                      textBaseline: 'top',
                      fill: '#000000D9'
                    }
                  });
                  // couNo
                  const couNo = group.addShape('text', {
                    attrs: {
                      text: cfg.data.couNo,
                      x: line2StartPoint.x + labelLeftOffset + 5,
                      y: endPoint.y - labelTopOffset - couAmount.getBBox().height - 2,
                      fontSize: 14,
                      fontWeight: 300,
                      textAlign: 'left',
                      textBaseline: 'top',
                      fill: '#000000D9'
                    }
                  });

                  // orgin
                  const orgin = group.addShape('text', {
                    attrs: {
                      text: cfg.data.orgin,
                      x: line2StartPoint.x + labelLeftOffset + 5,
                      y: endPoint.y - labelTopOffset + couAmount.getBBox().height - 2,
                      fontSize: 14,
                      fontWeight: 300,
                      textAlign: 'left',
                      textBaseline: 'top',
                      fill: '#000000D9'
                    }
                  });
                  return rect;
                },
                //配置anchorPoint
                // getAnchorPoints: function getAnchorPoints() {
                //   return [[0, 0.5], [1, 0.5]];
                // },
                update: function (cfg, item) {
                  const group = item.getContainer()
                  const children = group.get('children')
                  const node = children[0]
                  // const circleLeft = children[1]
                  // const circleRight = children[2]

                  const {style: {stroke}, labelStyle} = cfg

                  if (stroke) {
                    node.attr('stroke', stroke)
                    // circleLeft.attr('fill', stroke)
                    // circleRight.attr('fill', stroke)
                  }
                }
              },
              'single-shape'
            );
          }
        }],
      } as Register,
      data
    };
  }

  private layout={
    name: 'dagre',
    option:{
      rankdir: 'LR',
      nodesep: 30,
      ranksep: 100,
      width: window.innerWidth,
      height: window.innerHeight,
      modes: {
        default: ['drag-canvas']
      },
      defaultNode: {
        shape: 'node',
        labelCfg: {
          style: {
            fill: '#000000A6',
            fontSize: 10
          }
        },
        style: {
          stroke: '#72CC4A',
          width: 300
        }
      },
      defaultEdge: {
        shape: 'polyline'
      },
    }
  }

  componentDidMount(){
    this.init();
  }

  componentDidUpdate(){
    this.init();
  }

  componentWillUnmount(){
    // this.graph.destroy()
  }

  init=()=>{

  }
  render(){
    // const {data,register}=this.state;
    console.log('render')
    console.log('data',data)
    console.log('register',this.state.register)
    console.log('layout',this.layout)
    return  <div id="box">
      <Graphin
        data={data}
        register={this.state.register}
        layout={this.layout}
      />
      </div>
  }
}


