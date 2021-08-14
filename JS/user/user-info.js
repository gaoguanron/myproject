$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符';
            }
        }
    })
    inituserinfo()

    // 初始化用户的基本信息
    function inituserinfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                }
                console.log(res);
                form.val('formuserinfo', res.data)
            }
        })
    }
    $('#btnreset').on('click', function(e) {
        //    阻止默认行为
        e.preventDefault();
        inituserinfo();
    })

    //监听表单的提交时间
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(), //快速获取表单的值
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败');
                }
                layer.msg('更新用户信息成功')
                    //调用父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getuserinfo();
            }
        })
    })
})