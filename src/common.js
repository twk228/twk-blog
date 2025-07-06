// 锚点链接跳转方法
export const goAnchor = (selector) => {
  document.querySelector(selector).scrollIntoView({
    behavior: "smooth",
  });
}

// 图片预加载方法
export const preLoadImages = (images, callback) => {
  var loadedImages = 0;
  var totalImages = images.length

  // 图片加载完毕的触发事件
  function imageLoaded(){
    loadedImages++
    if(loadedImages === totalImages){
      // 所有图片加载完毕后触发的回调函数
      callback()
    }
  }

  // 逐个创建图片对象并设置src属性
  for(var i=0;i<totalImages;i++){
    var image = new Image()
    image.onload = imageLoaded
    image.src = images[i]
  }

}

/**
 * @description 处理展示的文本 显示固定长度
 * @param {string} text - 原始文本
 * @param {number} showLength - 展示长度
 * @param {string} ellipsis - 省略号
 */
export function handleText( text , showLength, ellipsis = ' ...' ) {
	if(!text) return '';
	if(text.length <= showLength){
		return text
	}else{
		return text.substring(0,showLength)+ellipsis
	}
}

/**
 * @description 格式化日期
 * @param {string | number | Date} value 指定日期
 * @param {string} format 格式化的规则
 * @example
 * ```js
 * formatDate();
 * formatDate(1603264465956);
 * formatDate(1603264465956, "h:m:s");
 * formatDate(1603264465956, "Y年M月D日");
 * ```
 */
export function handleFormatDate(value , format = "Y-M-D h:m:s" , tipText='暂无时间！') {
	const formatNumber = (n) => `0${n}`.slice(-2);
	const date = new Date(value);
	const formatList = ["Y", "M", "D", "h", "m", "s"];
	const resultList = [];
	resultList.push(date.getFullYear().toString());
	resultList.push(formatNumber(date.getMonth() + 1));
	resultList.push(formatNumber(date.getDate()));
	resultList.push(formatNumber(date.getHours()));
	resultList.push(formatNumber(date.getMinutes()));
	resultList.push(formatNumber(date.getSeconds()));
	for (let i = 0; i < resultList.length; i++) {
		format = format.replace(formatList[i], resultList[i]);
	}
	
	if(!value){
		format = tipText
	}
	return format;
}
