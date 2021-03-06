export default {
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 选中用户
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // 导出用户列表
    downloadUserList() {
      this.$http_json({
        url: "/api/user/download",
        responseType: 'blob',
        method: "get"
      }).then(result => {
        const a = document.createElement('a')
        a.href = window.URL.createObjectURL(result.data)
        a.click()
      }).catch(e => {
        this.$errorMsg(e)
      })
    },
    // 删除选中用户
    deleteAll() {
      if (this.selectList.length == 0) {
        this.$warnMsg("请勾选用户进行批量删除")
        return
      }
      this.$showMsgBox({
        msg: `<p>是否删除选中用户?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/user/del`,
          method: "post",
          data: this.selectList.map(val => val.id)
        }).then(() => {
          this.$successMsg("删除成功");
          this.getUserList(this.nowPage, this.nowSize);
        });
      });
    },
    // 删除用户
    deleteUserItem(item) {
      this.$showMsgBox({
        msg: `<p>是否删除${item.username}用户?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/user/del`,
          method: "post",
          data: [ item.id ]
        }).then(() => {
          this.$successMsg("删除成功");
          this.getUserList(this.nowPage, this.nowSize);
        });
      });
    },
    // 显示添加用户窗口
    showAddUser() {
      const form = this.$refs.form;
      this.isAdd = true;
      form.dialog = true;
      form.getRoles();
      form.getDepts();
      form.getRoleLevel();
      form.resetForm();
    },
    // 显示编辑用户窗口
    showEditUser() {
      const form = this.$refs.form;
      this.isAdd = false;
      form.dialog = true;
      form.getRoles();
      form.getDepts();
      form.getRoleLevel();
    },
    // 编辑用户项
    editUserItem(item) {
      const userItem = this.$refs.form.userForm,
        component = this.$refs.form;
      userItem.username = item.username;
			userItem.nickname = item.nickname;
      userItem.enabled = item.enabled.toString();
      userItem.phone = item.phone;
      userItem.email = item.email;
      component.userId = item.id;
      component.jobId = item.job.id;
      component.roleIds = item.roles.map(val => val.id);
      component.deptId = item.dept.id;
      component.getJobs(item.dept.id, item.job.id);
      this.showEditUser();
    },
    // 重置
    refresh() {
      this.searchVal_2 = ""
      this.selectType = ""
      this.selectStatus = ""
      this.$refs.pagination.toFirstPage()
    },
    // 点击搜索
    search_1() {
      this.getDepartmentList();
    },
    // 点击搜索
    search_2() {
      this.selectType ? this.$refs.pagination.toFirstPage() : this.$warnMsg("请选择搜索类型");
    },
    // 搜索状态
    getStatus() {
      this.$refs.pagination.toFirstPage()
    },
    handleNodeClick(val) {
      this.deptId = val.id;
      this.getUserList();
    }
  }
}