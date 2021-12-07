export type DataUrlType = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp';
import { clone, deepMix, each, isString, isNumber } from '@antv/util';
import { Canvas as GCanvas } from '@antv/g-canvas';
import { Canvas as GSVGCanvas } from '@antv/g-svg';
import { createDom } from '@antv/dom-util';
import { ext } from '@antv/matrix-util';
const { transform } = ext;
/**
 * 用于生成图片 (异步callback)
 * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
 * @param {string} backgroundColor 图片背景色
 * @return {string} 图片 dataURL
 */
function asyncToDataUrl(
  type?: DataUrlType,
  backgroundColor?: string,
  callback?: Function,
  widths?: number,
  heights?: number,
  vCanvasEl?: any,
): void {
  const watermarker = document.querySelector('.g6-graph-watermarker') as HTMLElement;
  const canvas: GCanvas = this.get('canvas');
  const renderer = canvas.getRenderer();
  const canvasDom = vCanvasEl || canvas.get('el');

  let dataURL = '';
  if (!type) type = 'image/png';

  setTimeout(async () => {
    if (renderer === 'svg') {
      const cloneNode = canvasDom.cloneNode(true);
      const svgDocType = document.implementation.createDocumentType(
        'svg',
        '-//W3C//DTD SVG 1.1//EN',
        'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd',
      );
      const svgDoc = document.implementation.createDocument(
        'http://www.w3.org/2000/svg',
        'svg',
        svgDocType,
      );
      svgDoc.replaceChild(cloneNode, svgDoc.documentElement);
      const svgData = new XMLSerializer().serializeToString(svgDoc);
      dataURL = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgData)}`;
    } else {
      let imageData;
      const context = canvasDom.getContext('2d');
      const width = widths || this.get('width');
      const height = heights || this.get('height');
      let compositeOperation;
      if (watermarker) await downloadImageWatermark(watermarker, context, width, height);
      if (backgroundColor) {
        const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
        try {
          imageData = context.getImageData(0, 0, width * pixelRatio, height * pixelRatio);
          compositeOperation = context.globalCompositeOperation;
          context.globalCompositeOperation = 'destination-over';
          context.fillStyle = backgroundColor;
          context.fillRect(0, 0, width, height);
        } catch (error) {
          console.error('Download image failed. Out of memory at ImageData creation');
        }
      }
      dataURL = canvasDom.toDataURL(type);
      if (backgroundColor) {
        context.clearRect(0, 0, width, height);
        context.putImageData(imageData, 0, 0);
        context.globalCompositeOperation = compositeOperation;
      }
    }
    if (callback) callback(dataURL);
  }, 16);
}

function dataURLToImage(dataURL: string, renderer: string, link, fileName) {
  if (!dataURL || dataURL === 'data:') {
    console.error(
      'Download image failed. The graph is too large or there is invalid attribute values in graph items',
    );
    return;
  }
  if (typeof window !== 'undefined') {
    if (window.Blob && window.URL && renderer !== 'svg') {
      const arr = dataURL.split(',');
      let mime = '';
      if (arr && arr.length > 0) {
        const match = arr[0].match(/:(.*?);/);
        // eslint-disable-next-line prefer-destructuring
        if (match && match.length >= 2) mime = match[1];
      }

      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      const blobObj = new Blob([u8arr], { type: mime });

      if ((window.navigator as any).msSaveBlob) {
        (window.navigator as any).msSaveBlob(blobObj, fileName);
      } else {
        link.addEventListener('click', () => {
          link.download = fileName;
          link.href = window.URL.createObjectURL(blobObj);
        });
      }
    } else {
      link.addEventListener('click', () => {
        link.download = fileName;
        link.href = dataURL;
      });
    }
  }
}
/**
 * 增加图片下载水印功能
 */
async function downloadImageWatermark(
  watermarker: HTMLElement,
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const watermarkStr = watermarker.style.backgroundImage;
  const watermarkbase64 = watermarkStr.slice(5, watermarkStr.length - 2);
  const img = new Image();
  img.src = watermarkbase64;
  await new Promise(resolve => {
    img.onload = () => {
      const pat = context.createPattern(img, 'repeat');
      context.rect(0, 0, width, height);
      context.fillStyle = pat;
      context.fill();
      resolve('');
    };
  });
}
/**
 * 导出包含全图的图片
 * @param {String} name 图片的名称
 * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
 * @param {Object} imageConfig 图片配置项，包括背景色和上下左右的 padding
 */
export default function downloadFullImage(
  name?: string,
  type?: DataUrlType,
  imageConfig?: { backgroundColor?: string; padding?: number | number[] },
): void {
  const bbox = this.get('group').getCanvasBBox();
  const height = bbox.height;
  const width = bbox.width;
  const renderer = this.get('renderer');
  const vContainerDOM: HTMLDivElement = createDom('<id="virtual-image"></div>');
  const watermarker = document.querySelector('.g6-graph-watermarker') as HTMLElement;

  const backgroundColor = imageConfig ? imageConfig.backgroundColor : undefined;
  let padding = imageConfig ? imageConfig.padding : undefined;
  if (!padding) padding = [0, 0, 0, 0];
  else if (isNumber(padding)) padding = [padding, padding, padding, padding];

  let vHeight = height + padding[0] + padding[2];
  let vWidth = width + padding[1] + padding[3];
  if (watermarker) {
    const { width: wmWidth, height: wmHeight } = this.get('graphWaterMarker').cfg || {};
    vHeight = Math.ceil(vHeight / wmHeight) * wmHeight;
    vWidth = Math.ceil(vWidth / wmWidth) * wmWidth;
  }
  const canvasOptions = {
    container: vContainerDOM,
    height: vHeight,
    width: vWidth,
  };
  const vCanvas = renderer === 'svg' ? new GSVGCanvas(canvasOptions) : new GCanvas(canvasOptions);

  const group = this.get('group');
  const vGroup = group.clone();

  let matrix = clone(vGroup.getMatrix());
  if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  const centerX = (bbox.maxX + bbox.minX) / 2;
  const centerY = (bbox.maxY + bbox.minY) / 2;
  matrix = transform(matrix, [
    ['t', -centerX, -centerY],
    ['t', width / 2 + padding[3], height / 2 + padding[0]],
  ]);

  vGroup.resetMatrix();
  vGroup.setMatrix(matrix);
  vCanvas.add(vGroup);

  const vCanvasEl = vCanvas.get('el');

  if (!type) type = 'image/png';
  asyncToDataUrl.call(this,
    type,
    backgroundColor,
    dataURL => {
      const link: HTMLAnchorElement = document.createElement('a');
      const fileName: string =
        (name || 'graph') + (renderer === 'svg' ? '.svg' : `.${type.split('/')[1]}`);

      dataURLToImage(dataURL, renderer, link, fileName);

      const e = document.createEvent('MouseEvents');
      e.initEvent('click', false, false);
      link.dispatchEvent(e);
    },
    vWidth,
    vHeight,
    vCanvasEl,
  );
}
