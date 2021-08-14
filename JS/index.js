$(function() {
    // 调用 获取用户的基本信息
    getuserinfo();
    var layer = layui.layer;

    $('#btnlogout').on('click', function() {
        layer.confirm('确定要退出吗', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '../login.html';
            layer.close(index);
        });

        //eg1
        // layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
        //do something

        // 清空本地存储的token

        //关闭询问框
        //layer.close(index);
        // });


    })

})

// 获取用户的基本信息
function getuserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // hseaders 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用函数渲染用户头像
            renderAvatar(res.data);
        },
        // complete: function(res) {
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem('token');
        //         location.href = "/login.html";
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户名
    var name = user.nickname || user.username;
    // 2.设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show();
    }

}