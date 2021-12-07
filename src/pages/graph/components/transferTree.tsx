import * as React from "react";
import {message} from "antd";
import "./registerShape.tsx";
import styles from "./transferTree.css";
import lodash from "lodash";
import downloadFullImage from "./downloadFullImage";
let G6= require('@antv/g6');
interface P{
    data:{
        nodes:Array<object>;
        edges:Array<object>;
    }
}
export default class Graph extends React.Component<P, {}>{

    
    private isNeedFitView:any=false;
    private hasException:any=false;

    private box:any=null

    private graph:any=null;

    componentDidMount(){
        if(!lodash.isEmpty(this.props.data)){
            this.init(this.props.data)
        }
    }
    componentDidUpdate(){
        if(!lodash.isEmpty(this.props.data)){
            this.init(this.props.data)
        }
    }
    componentWillUnmount(){
        this.graph && this.graph.destroy()
    }


    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if(JSON.stringify(nextProps.data||{})!==JSON.stringify(this.props.data||{})){
            this.hasException=this.catchException(nextProps);
            this.isNeedFitView=this.getIsNeedFitView(nextProps)
        }
    }

    //流转路径小于等于 4 行的时候使用 fitView
    getIsNeedFitView = (props:any) =>{
        const {edges}=props.data;
        let sourceArray:any=[]
        edges.forEach((item:any)=>{
            sourceArray.push(item.source);
        })
        //去重
        sourceArray=Array.from(new Set(sourceArray))
        return sourceArray.length+1<=4;
    }
    //捕获后端返回数据为空值时,导致 g6 报的错
    catchException = (props:any) => {
        const {data} = props;
        if(lodash.isArray(data.nodes)&&lodash.isArray(data.edges)){
            if(data.nodes.length>0){
                if(data.nodes.includes(null)||data.nodes.includes(undefined)){
                    message.error("返回数据nodes有误");
                    return true;
                }
            }
            if(data.edges.length>0){
                if(data.edges.includes(null)||data.edges.includes(undefined)){
                    message.error("返回数据edges有误");
                    return true;
                }
            }
        }
    }

    moveCenter=(event:any)=>{
        let that=this;
        const item = event.item;
        // 聚焦当前点击的节点（把节点放到视口中心）

        const matrix = item.get('group').getMatrix();
        const point = {
            x: matrix[6],
            y: matrix[7]
        };
        const width = that.graph.get('width');
        const height = that.graph.get('height');
        // 找到视口中心
        const viewCenter = {
            x: width / 2,
            y: height / 2
        };
        const modelCenter = that.graph.getPointByCanvas(viewCenter.x, viewCenter.y);
        const viewportMatrix = that.graph.get('group').getMatrix();
        // 画布平移的目标位置，最终目标是graph.translate(dx, dy);
        const dx = (modelCenter.x - point.x) * viewportMatrix[0];
        const dy = (modelCenter.y - point.y) * viewportMatrix[4];
        let lastX:any = 0;
        let lastY:any = 0;
        let newX:any = void 0;
        let newY:any = void 0;
        // 动画每次平移一点，直到目标位置
        that.graph.get('canvas').animate({
            onFrame:(ratio:any)=>{
                newX = dx * ratio;
                newY = dy * ratio;
                that.graph.translate(newX - lastX, newY - lastY);
                lastX = newX;
                lastY = newY;
            }
        }, 300, 'easeCubic');
    }

    bindEvents=()=>{
        this.graph.on('node:click', (event:any) => {
            this.moveCenter(event)
        })
    }
    init(data:any){
        if(this.hasException){
            return;
        }
        if (!this.graph) {
            console.log('G6', G6)
            this.graph = new G6.Graph({
                container: 'box',
                width: this.box.offsetWidth,
                height: this.box.offsetHeight,
                pixelRatio: 1,
                modes: {
                    default: ['drag-canvas', 'zoom-canvas']
                },
                fitView: this.isNeedFitView,
                fitViewPadding: this.isNeedFitView ? 100 : 0,
                minZoom: 0.5,
                maxZoom: 1.1,
                layout: {
                    type: 'dagre',
                    nodesep: 150,
                    ranksep: 10
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
                        stroke: '#9EAFF5',
                        width: 270,
                        height: 110,
                    }
                },
                defaultEdge: {
                    shape: 'polyline',
                    style: {
                        lineWidth: 2,
                        endArrow: true,
                        stroke: '#ccc',
                        offset: 11
                    }
                }
            })
        }
        this.graph.data(lodash.cloneDeep(data));
        this.graph.render()
        if (!this.isNeedFitView) this.customFitView()
        if (!this.isNeedFitView) this.goToZoom();
        this.bindEvents()
    }
    //将 graph 缩小到指定大小
    goToZoom(){
        //计算节点高度
        //设上下间隙为高度的 2 分之一
        //4 个 h,5*0.5 h
        //一个屏幕显示 4 行的节点高度
        const toHeight=this.box.offsetHeight/(4+5*0.3);
        //原始节点高度
        const nodeHeight=this.graph.get('defaultNode').style.height;
        //缩放比例
        const zoom=toHeight/nodeHeight
        this.graph.zoom(zoom,{x:this.box.offsetWidth/2,y:0});
    }
    //将 graph第一个节点为中心居中
    customFitView(){
        const nodes = this.graph.getNodes();
        const firstNode=nodes[0];
        if(firstNode){
            //获取第一个根节点坐标
            const {x,y}=firstNode._cfg.model;
            //计算根节点需要移动的到中间的偏移量
            const startPoint={
                x,
                y,
            }
            const endPoint={
                x:this.box.offsetWidth/2,
                y,
            }
            this.graph.translate(endPoint.x-startPoint.x,endPoint.y-startPoint.y)
        }
    }
    download1() {
        console.log('点击下载')
        this.graph.downloadImage();
    }
    download2() {
        console.log('点击下载')
        downloadFullImage.call(this.graph)
        // this.graph.downloadFullImage();
    }
    render(){
        return <div className={styles.transferTree}>
            <button onClick={this.download1.bind(this)}>下载downloadImage</button>
            <button onClick={this.download2.bind(this)}>下载downloadFullImage</button>
            <h3 >流转路径</h3>
            <div className={styles.box} ref={(ref) => this.box = ref} id='box' />
        </div>
    }
}
