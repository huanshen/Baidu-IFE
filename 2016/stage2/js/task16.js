/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
  var aqiData = {};//创建一个对象
  var city=document.getElementById('aqi-city-input');
  var cvalue=document.getElementById('aqi-value-input');
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  city = city.value.trim();
    cvalue= cvalue.value.trim();
    if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符，请重新输入")
        return;
    }
    if(!cvalue.match(/^\d+$/)){
      alert("空气质量指数必须为整数,请重新输入");
      return;
    }
    aqiData[city]=cvalue;


}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var aqiTable=document.getElementById('aqi-table');
  var tr1="";
  var tr="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  for (var i in  aqiData){
    if ( aqiData.hasOwnProperty(i)){
       tr1= tr1+"<tr><td>"+i+"</td><td>"+aqiData[i]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"; 
       //要给删除按钮添加类，否则删除的时候就不好删除；先加单引号在双引号。
    }
  }
  tr=tr+tr1; 
  aqiTable.innerHTML=i ? tr : "" ;//这里需要给个判断，不然每次调用这个函数都会有最上面一行。


}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  
    addAqiData();
    renderAqiList();

}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  delete aqiData[city];//删除该对象之后，下一步就会重新运行renderAqiList,数据就会消失不见了
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数


  var addBtn=document.getElementById('add-btn');
  addBtn.addEventListener('click',addBtnHandle,false);

  document.getElementById("aqi-table").addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
    })
}

init();