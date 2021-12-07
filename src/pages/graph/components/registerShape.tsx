/**
 * Created by l on 2019/11/21.
 */
// let triangleBlue = require("biz-imgs/triangle-blue.png");
// let triangleGreen = require("biz-imgs/triangle-green.png");
let G6 = require('@antv/g6');
const couMeaning = ''
/**
 * 计算字符串的长度
 * @param {string} str 指定的字符串
 */
let calcStrLen = (str:any) => {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
};

/**
 * 计算显示的字符串
 * @param {string} str 要裁剪的字符串
 * @param {number} maxWidth 最大宽度
 * @param {number} fontSize 字体大小
 */

let fittingString = (str:any, maxWidth:any, fontSize:any) => {
  var fontWidth = fontSize * 1.3; //字号+边距
  maxWidth = maxWidth * 2; // 需要根据自己项目调整
  var width = calcStrLen(str) * fontWidth;
  //这里是超出后面显示的省略号
  var ellipsis = '…';
  if (width > maxWidth) {
    var actualLen = Math.floor((maxWidth - 10) / fontWidth);
    var result = str.substring(0, actualLen) + ellipsis;
    return result;
  }
  return str;
};

let foldString = (str:any, maxWidth:any, fontSize:any) => {
  var fontWidth = fontSize * 1.3; //字号+边距
  var newMaxWidth = maxWidth * 2; // 需要根据自己项目调整
  var width = calcStrLen(str) * fontWidth;
  //这里是超出后面显示的省略号
  var ellipsis = '\n';
  var total = '';
  if (width > newMaxWidth) {
    var actualLen = Math.floor((newMaxWidth - 10) / fontWidth);
    var result = str.substring(0, actualLen) + ellipsis;
    var restStr = str.substring(actualLen, str.length);
    total = result + foldString(restStr, maxWidth, fontSize);
    return total;
  }
  return str;
}

G6.registerNode('node', {
  drawShape: function drawShape(cfg:any, group:any) {
    const width = cfg.style.width;
    const height = cfg.style.height;
    const stroke = cfg.style.stroke;
    const rect = group.addShape('rect', {
      attrs: {
        /**
         * 起始节点坐标若设为(0,0),节点中心则为(width/2,height/2),计算偏移不方便,为了使节点中心落在(0,0)起始坐标应该为(-width/2,-height/2)
         */
        x: - width / 2,
        y: - height / 2,
        width,
        height,
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
      y: -height / 2
    };
    const fontSize = 14;
    const fontWeight = 300;
    const labelLeftOffset = 70;
    const labelTopOffset = 15;
    //文本上下边距
    const textTopOffset = fontSize / 3
    // couNo
    const couNoText = group.addShape('text', {
      attrs: {
        text: `${couMeaning}编号:`,
        x: startPoint.x + labelLeftOffset,
        y: -height / 2 + labelTopOffset,
        fontSize,
        fontWeight,
        textAlign: 'right',
        textBaseline: 'top',
        fill: '#000000D9'
      }
    });

    // couAmount
    const couAmountText = group.addShape('text', {
      attrs: {
        text: `${couMeaning}金额:`,
        x: startPoint.x + labelLeftOffset,
        y: -height / 2 + (labelTopOffset + couNoText.getBBox().height + textTopOffset),
        fontSize,
        fontWeight,
        textAlign: 'right',
        textBaseline: 'top',
        fill: '#000000D9',
      }
    });

    // orgin
    const orginText = group.addShape('text', {
      attrs: {
        text: '持有方:',
        x: startPoint.x + labelLeftOffset,
        y: -height / 2 + (labelTopOffset + couNoText.getBBox().height + couAmountText.getBBox().height + 2 * textTopOffset),
        fontSize,
        fontWeight,
        textAlign: 'right',
        textBaseline: 'top',
        fill: '#000000D9'
      }
    });

    // couNo
    const couNo = group.addShape('text', {
      attrs: {
        text: cfg.data.couNo,
        x: startPoint.x + labelLeftOffset + 5,
        y: -height / 2 + labelTopOffset,
        fontSize,
        fontWeight,
        textAlign: 'left',
        textBaseline: 'top',
        fill: '#000000D9'
      }
    });

    // couAmount
    const couAmount = group.addShape('text', {
      attrs: {
        text: "￥" + cfg.data.couAmountInCent / 100,
        x: startPoint.x + labelLeftOffset + 5,
        y: -height / 2 + (labelTopOffset + couNo.getBBox().height + textTopOffset),
        fontSize,
        fontWeight,
        textAlign: 'left',
        textBaseline: 'top',
        fill: '#000000D9'
      }
    });

    // orgin
    const orgin = group.addShape('text', {
      attrs: {
        text: foldString(cfg.data.holderCompanyName, width / 2 - 5, 14),
        x: startPoint.x + labelLeftOffset + 5,
        y: -height / 2 + (labelTopOffset + couNo.getBBox().height + couAmount.getBBox().height + 2 * textTopOffset),
        fontSize,
        fontWeight,
        textAlign: 'left',
        textBaseline: 'top',
        fill: '#000000D9'
      }
    });
    if (cfg.type === 'ROOT' || cfg.type === 'LEAF') {
      const icon = group.addShape('image', {
        attrs: {
          x: startPoint.x,
          y: startPoint.y,
          width,
          height,
          // img: cfg.type === 'ROOT' ? triangleBlue : triangleGreen,
        }
      });
      //标签
      const iconText = group.addShape('text', {
        attrs: {
          text: cfg.type === 'ROOT' ? `原始${couMeaning}` : `被持有${couMeaning}`,
          x: startPoint.x,
          y: startPoint.y,
          fontSize,
          fontWeight,
          textAlign: 'center',
          textBaseline: 'top',
          fill: '#fff'
        }
      });

      iconText.transform([
        ['t', 85, 30],     // x方向平移100,y方向平移100
        // ['s', 0.1, 1.2],    // x方向缩小0.1倍， y方向扩大1.2倍
        ['r', Math.PI / 4.4]    // 旋转45度
      ])

      iconText.translate(width / 2, 14);
    }
    return rect;
  },

  //配置anchorPoint
  getAnchorPoints: function getAnchorPoints() {
    return [[0.5, 0], [0.5, 1]];
  },
  update: function (cfg:any, item:any) {
    const group = item.getContainer()
    const children = group.get('children')
    const node = children[0]
    // const circleLeft = children[1]
    // const circleRight = children[2]

    const { style: { stroke }, labelStyle } = cfg

    if (stroke) {
      node.attr('stroke', stroke)
      // circleLeft.attr('fill', stroke)
      // circleRight.attr('fill', stroke)
    }
  }
},
  'single-shape'
);

