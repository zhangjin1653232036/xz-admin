export default {
	data() {
		return {
			searchVal: "",
			levelId: "",
      selectList: [],
			userList: [],
			isShow: false,
			url: "",
			// 当前页数
			nowPage: 1,
			// 当前页条数
			nowSize: 10,
			// 总条数
			totalElements: 0
		}
	}
}