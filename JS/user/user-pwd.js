$(function() {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function(value) {
            if (value === $('[name=oldpwd').val()) {
                return "新旧密码不能相同"
                    // alert("新旧密码不能相同");
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newpwd]').val()) {
                return "两次密码不一致";
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // alert("修改用户密码失败")
                    return layer.msg('修改用户密码失败');
                }
                return layer.msg('修改用户密码成功');
                // alert("修改用户密码成功")
                // 重置表单，先转化为原生DOM对象
                $('.layui-form')[0].reset()
            }
        })
    })
})