/*
 * action 类型
 */
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */
 
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

export function addTodo(text) {
	let title,singer,lryic,m4a;
	$.ajax({
		url:"http://route.showapi.com/213-1?keyword="+text+"&showapi_appid=40476&showapi_sign=0dbbdde0bfc4401ea3425155af141dbd",
		type:"get",
		async:false,
		success:function(data){
      		title=data['showapi_res_body'].pagebean.contentlist[0].songname;
			singer=data['showapi_res_body'].pagebean.contentlist[0].singername;
			m4a = data['showapi_res_body'].pagebean.contentlist[0].m4a;
			lryic='';

    
      		let id = data['showapi_res_body'].pagebean.contentlist[0].songid;
      		$.ajax({
      			url:"http://route.showapi.com/213-2?musicid="+id+"&showapi_appid=40476&showapi_sign=0dbbdde0bfc4401ea3425155af141dbd",
				type:"get",
				async:false,
				success:function(res){
					let str = res['showapi_res_body']['lyric'];
			        let reg = /&#58;/ig;
			        let reg1 = /&#(\d+);/ig;
			        let reg2 = /&#40;/ig;
			        let reg3 = /&#41;/ig;
			        let reg4 = /&#46;/ig;
			        let reg5 = /&#45;/ig;
			        let reg6 = /\[\d{2}:\d{2}\.\d{2}\]/ig;
			        str = str.replace(reg,':')
			          .replace(reg2, '(')
			          .replace(reg3, ')')
			          .replace(reg4, '.')
			          .replace(reg5, '-')
			          .replace(reg1, '');
			        lryic = str.split(reg6);
					lryic.shift();
				}
      		});
		}

	});
	return { type: ADD_TODO, title,singer,lryic,m4a };
  	
}

export function completeTodo(n) {
  return { type: COMPLETE_TODO, n }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}