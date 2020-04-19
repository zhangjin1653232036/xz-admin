export default {
	data() {
		return {
      searchVal: "",
      value: "",
			selectType: "",
			selectList: [],
			skuList: [],
			isShow: false,
			url: "",
			// 当前页数
			nowPage: 1,
			// 当前页条数
			nowSize: 10,
			// 总条数
			totalElements: 0,
			buttonOptions: [{
			  type: "primary",
			  icons: 'el-icon-plus',
			  title: "添加商品规格",
			  method: "showAddBox"
			}, {
				type: "danger",
				icons: "el-icon-delete",
				title: "批量删除商品规格",
				method: "deleteAllSku"
			}]
		}
	}
}