import {get,post} from './untile/request'
// 登录的Api
export const loginApi = data => post('/sys/login')(data);

// 登出的Api
export const loginOutApi = params => get('/sys/logout')(params);

// 获得新闻栏目的列表的Api （分页）
export const newsColumnListApi = params => get('/news/column/list')(params);

// 获得所有新闻栏目的列表的Api
export const newsColumnAllApi = params => get('/news/column/all')(params);

// 添加新闻栏目的Api
export const newsColumnAddApi = data => post('/news/column/add')(data);

// 修改指定的新闻栏目的Api
export const newsColumnUpdateApi = data => post('/news/column/update')(data);

// 删除指定的新闻栏目的Api
export const newsColumnDeleteApi = params => get('/news/column/delete')(params);

// 添加新闻的Api
export const newsAddApi = data => post('/news/add')(data);

// 上传文件的Api
export const newsUploadApi = data => post('/news/upload')(data);

// 修改指定新闻的Api
export const newsUpdateApi = data => post('/news/update')(data);

// 删除指定的新闻Api
export const newsDeleteApi = params => get('/news/delete')(params);

// 获得指定新闻的详情的Api
export const newsDetailApi = params => get('/news/detail')(params);

// 获得所有的新闻列表的Api (分页)
export const newsListApi = params => get('/news/list')(params);

// 查询新闻Api
export const newsQueryApi = params => get('/news/query')(params);



