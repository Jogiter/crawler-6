import { mongoose } from '../db/db.js'
import classlistSchema from './classlist.scm.js'

let List = mongoose.model('classlist', classlistSchema)

/**
 * 获取文章分类
 * @param  {Object}   query  查询条件
 * @param  {Function} callback 回调函数
 */
function classList(list, callback = function() {}) {
	List.insertMany(list).then((res) => {
		callback(null, '保存文章分类成功')
	}).catch(e => {
		callback(e)
	}).finally(() => {
		console.log('disconnect')
	})
}

export default classList
