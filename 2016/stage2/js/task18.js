var ipt=document.getElementById('input-text');
var numUl=document.getElementById('num-ul');
var pattern=/^[+,-]?\d+$/;
var t=[];
var text='';
var kong=0;
// 验证输入的是否是数字。
function validate () {
	iptValue=ipt.value.trim();
	if(!pattern.test(iptValue)){
		alert("请确认输入的是数字？");
		return;
	}
	else
		return true;
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
     
     
}

/*事件处理程序
//由于事件的目标都是button发出的，因此，我们可以将这四个按钮放在同一个元素里面，
//并为该元素绑定click事件，采用事件委托实现
*/
function addBtnHandle(event) {
    event=EventUtil.getEvent(event);
    var target=EventUtil.getTarget(event);
    var tt;
    	switch(target.id){//
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
    	}
    	ipt.value='';
    renderdata();
}
//事件处理程序
//id=num-ul;
function addUlHandle(event) {
    event=EventUtil.getEvent(event);
    var target=EventUtil.getTarget(event);
    	if (target.tagName.toLowerCase() === 'span') {
			numUl.removeChild(target);
			var tt=target.dataset.num;
			removeData(tt);
			alert("移除"+target.innerHTML);
	}
    renderdata();
}
function renderdata(){
	 text='';
	for(var i=0;i<t.length;i++){
		text+="<span  data-num='"+i+"'>"+t[i]+"</span>";
	}
	if(text  || !t.length){
		numUl.innerHTML=text;
	}
	if(!text  && !t.length){
	kong=1;//确保是空数组时按下移除按钮，设kong=1;
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

