import{a as d,t as m,K as r,o as p,k as f,y as c,j as h,bB as g,l as x}from"./index.34bd6b67.js";
import{w as y,C as u}from"./useECharts.c651fb98.js";
import"./index.aa59c14a.js";
import"./index.f14d329f.js";
import"./index.24be7962.js";
import"./warning.fe8ee07c.js";
import"./responsiveObserve.61d0409e.js";
const C=d(
    {
        __name:"Movement",
        props:{
            loading:Boolean,width:{
                type:String,
                default:"100%"
            },
            height:{
                type:String,
                default:"300px"
            },
            list:{
                type:Array,default:()=>[]
            }
        },
        setup(e){
            const t=e,
            a={
                title:{text:"Movement"},
                tooltip:{trigger:"axis"},
                legend:{data:["Movement"]},
                grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},
                toolbox:{feature:{saveAsImage:{}}},
                xAxis:{type:"category",data:["12:00","12:05","12:10","12:15","12:20","12:25","12:30"]},
                yAxis:{type:"value",axisTick:{show:!1},axisLabel:{show:!1},splitLine:{show:!1}},
                series:[{name:"Movement",type:"line",/*type:"scatter",*/step:"start",data:[1,1.2,.5,.7,1,1.3,1.2],color:"#1e90ff"}],
                /*graphic:[{type:"line",left:"center",top:"middle",shape:{x1:150,y1:0,x2:600,y2:0},style:{stroke:"#999",lineDash:[2,2],lineWidth:1}},{type:"text",left:"left",top:"middle",style:{text:"Moving",fill:"#999",font:"14px Microsoft YaHei"}}]*/
            },
            l=m(null),
            {setOptions:n}=y(l);
            return r(()=>t.loading,()=>{t.loading||n(a)},{immediate:!0}),
            r(()=>t.list,()=>{const i=t.list.map(s=>s.movement),o=t.list.map(s=>s.time);a.xAxis.data=o,a.series[0].data=i,n(a),console.log(o,i)},{immediate:!0}),
            (i,o)=>(p(),f(x(u),{loading:e.loading},{default:c(()=>[h("div",{ref_key:"chartRef",ref:l,style:g({width:e.width,height:e.height})},null,4)]),_:1},8,["loading"]))
        }
    }
);
export{C as default};
