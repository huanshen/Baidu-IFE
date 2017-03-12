var ipt=document.getElementById('input-text');
var inputTag=document.getElementById('input-tag');
var tagNum=document.getElementById('tag-count');
var favorNum=document.getElementById('favor-count');
var confirmFavor=document.getElementById('confirm-favor');
var pattern=/[^0-9a-zA-Z\u4e00-\u9fa5]+/;
var t=[];
var text='';
var kong=0;

//绑定事件函数
//获取事件对象和事件的目标
var EventUtil={
    getEvent:function(event){
        return event ? event:window.event;
    },
   
    getTarget:function(event){
        return event.target||event.srcElement;
    },
   
    on:function (element,eventName,listener){
    if (element.addEventListener){
        element.addEventListener(eventName,listener,false);
    }
    else if (element.attachEvent){
        element.attachEvent('on'+eventName,listener);
    }
    else
        element['on'+eventName]=listener;
    }
}


//事件处理程序
//id=num-ul;

/*function addtextHandle(event) {
    event=EventUtil.getEvent(event);
    if (pattern.test(event.data)){
        inputTagValue=inputTag.value.split(pattern1);
        renderdata(tagNum,inputTagValue);
        inputTag.value='';
        event.data='';
    }
}
*/
function addtagNumkeyHandle(event){
    event=EventUtil.getEvent(event);
    if (event.keyCode==13){//如果按下的是回车键，就将上述结果输入。
        inputTagValue=inputTag.value.split(pattern);
        renderdata(tagNum,inputTagValue);
        inputTag.value='';
    }
    inputTagValue=inputTag.value.split(pattern);
    if(inputTagValue[1]=="" ){
        inputTagValue=inputTag.value.split(pattern);
        renderdata(tagNum,inputTagValue);
        inputTag.value='';
    }
    
}


function addfavorHandle(){
    iptValue=ipt.value.split(pattern);
    renderdata(favorNum,iptValue);
}


function addfavorNumHandle(event){
    var target=EventUtil.getTarget(event);
    favorNum.removeChild(target);
}
function addtagNumHandle(event){
    var target=EventUtil.getTarget(event);
    tagNum.removeChild(target);
}

//显示输入的数据
function renderdata(tagNum,t){
    var j=tagNum.childNodes.length;
    var flag=1;
    for(var i=0;i<t.length;i++){
        flag=1;
        j=tagNum.childNodes.length;
        if (t[i]!=''  && (j<10)){ //目标是最多10个
            var newspan =document.createElement('span');
            newspan.innerHTML=t[i];
            var child1=tagNum.firstChild;
            if (tagNum.childNodes.length>=1){//当其有孩子时，就判断后面输入的是否有重复。
                for(var k=0;k<tagNum.childNodes.length;k++){
                    var tt=tagNum.childNodes[k].innerHTML.toLowerCase();
                    var ttt=t[i].toLowerCase();
                    if (tt==ttt){flag=-1; break;}   
                }
            }
            if (flag==1){
                tagNum.insertBefore(newspan,child1);
            }
        }
    }
}

//初始化函数
function init(){
    var mybt=document.getElementById('mybt');
    //EventUtil.on(mybt,'click',addBtnHandle);
   // EventUtil.on(inputTag,'textInput',addtextHandle);
    EventUtil.on(confirmFavor,'click',addfavorHandle);
    EventUtil.on(favorNum,'click',addfavorNumHandle);
    EventUtil.on(tagNum,'click',addtagNumHandle);
    EventUtil.on(inputTag,'keyup',addtagNumkeyHandle);

    inputTag.value='';
}
init();