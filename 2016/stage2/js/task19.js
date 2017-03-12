var ipt=document.getElementById('input-text');
var numUl=document.getElementById('num-ul');
var pattern=/^[+,-]?\d+$/;
var t=[];
var text='';
var kong=0;
// 验证输入的是否是数字。
function validate () {
	iptValue=parseInt(ipt.value.trim());

	if(!pattern.test(iptValue)){
		alert("请确认输入的是数字？");
		return;
	}
	else if(iptValue<10  || iptValue >=100){
            alert("请确认输入的是数字在(10-100)之间");
            return;
        }
	else
    	return true;
}
//排序
function sortAqiData(t) {
    var length=t.length;
    var tem=0;
    for(var i=0;i<length-1;i++){
        for(var j=0;j<length-i-1;j++){
            if (t[j]>t[j+1]){
                tem=t[j];
                t[j]=t[j+1];
               t[j+1]=tem;
            }
        }
    }
    return t;

}

//绑定事件函数
function on(element,eventName,listener){
	if (element.addEventListener){
		element.addEventListener(eventName,listener,false);
	}
	else if (element.attachEvent){
		element.attachEvent('on'+eventName,listener);
	}
	else
		element['on'+eventName]=listener;
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
/*function addBtnHandle() {
    if (validate()){
    	t.unshift(ipt.value);
    }
    alert('t');
    renderdata();
}*/
//获取事件对象和事件的目标
var EventUtil={
	getEvent:function(event){
		return event ? event:window.event;
	},
	getTarget:function(event){
		return event.target||event.srcElement;
	}
}

//移除指定位置的数据
function removeData(j){
    var tt=t[j];
	 if (j==(t.length-1)){
        t.length=t.length-1;
     }
     else{
        for(var i=0;i<t.length;i++)
      {
       if(j==i)
         {
            for(var k=i+1;k<t.length;k++){
         	  t[k-1]=t[k];
            }
         t.length=t.length-1;
         break;
         }
     }
 }
     
    return tt;   
}

/*事件处理程序
//由于事件的目标都是button发出的，因此，我们可以将这四个按钮放在同一个元素里面，
//并为该元素绑定click事件，采用事件委托实现
*/
function addBtnHandle(event) {
    event=EventUtil.getEvent(event);
    var target=EventUtil.getTarget(event);
    var tt=0;
    if(t.length <60){
    	switch(target.id){
    	case "l-input":
    		if (validate()){
    			t.unshift(ipt.value);
    		}
    	break;
    	case "r-input":
    		if (validate()){
    			t.push(ipt.value);
    		}
    	break;
    	case "l-remove":
    		tt=t.shift();
    		alert("移除"+tt);
    		if (kong){
    			alert("数组为空，请先输入数字");
    			return;
    		}
    		break;
    	case "r-remove":
    		tt=t.pop();
    		alert("移除"+tt);
    		if (kong){
    			alert("数组为空，请先输入数字");
    			return;
    		}
    		break;
        case "sort":
        
            if (t.length){
                sortAqiData(t);
            }else{
                alert("数组为空，请先输入数字");
                return;
            }
            break;
    	}
    	ipt.value='';
        renderdata();
    }
else{
        alert("数组最大值为60,如需添加，请先删除部分");
        return;
    }
}
//事件处理程序
//id=num-ul;
function addUlHandle(event) {
    event=EventUtil.getEvent(event);
    var target=EventUtil.getTarget(event);
    var tt=target.parentNode.dataset.num;
    tt=parseInt(tt);
    	if (target.parentNode.tagName.toLowerCase() === 'span') {
			numUl.removeChild(target.parentNode);
			alert("移除"+removeData(tt));
	}
    renderdata();
}
function renderdata(){
	 text='';
	for(var i=0;i<t.length;i++){
		text+="<span   data-num='"+i+"'><span style='height:"+t[i]+"px; width: 20px;display:block;box-sizing:border-box; background: red;' ></span><div  class='span-num'    >"+t[i]+"</div></span>";
	}
	if(text  || !t.length){
		numUl.innerHTML=text;
	}
	if(!text  && !t.length){
	kong=1;//确保是空数组时按下移除按钮，设kong=1;
	}
    else{
        kong=0;
    }
}
//初始化函数
function init(){
	//var l_ipt=document.getElementById('l-input');
	//on(l_ipt,'click',addBtnHandle);
	var mybt=document.getElementById('mybt');
	on(mybt,'click',addBtnHandle);
	on(numUl,'click',addUlHandle);
}
init();

