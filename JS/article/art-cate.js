$(function() {
    initartcarte();
    var layer = layui.layer
    var form = layui.form

    function initartcarte() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlstr = template("tpl-table", res)
                $("tbody").html(htmlstr);
            }

        })
    }
    var indexadd = null
    $("#btnaddcate").on('click', function() {
        indexadd = layer.open({
            // 去掉确定按钮
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            // content: '<form class="layui-form" action=""><div class="layui-form-item"><label class="layui-form-label">输入框</label><div class="layui-input-block"><input type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"></div></div></form><form class="layui-form" action=""><div class="layui-form-item"><label class="layui-form-label">输入框</label><div class="layui-input-block"><input type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"></div></div></form>'
            content: $('#form-add').html()
        });
    })

    // 后来添加的，通过代理的形式，为表单绑定  绑定页面本来就存在的时间
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加类别失败');
                }
                layer.msg('添加类别成功')
                initartcarte();
                // 根据索引 关闭对应的弹出层
                layer.close(indexadd);
            }

        })
    })

    var indexedie = null
    $("tbody").on('click', '.btn-edit', function() {
        indexedie = layer.open({
            // 去掉确定按钮
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            // content: '<form class="layui-form" action=""><div class="layui-form-item"><label class="layui-form-label">输入框</label><div class="layui-input-block"><input type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"></div></div></form><form class="layui-form" action=""><div class="layui-form-item"><label class="layui-form-label">输入框</label><div class="layui-input-block"><input type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"></div></div></form>'
            content: $('#dia-item').html()
        });
        var id = $(this).attr('data-id');
        console.log(id);

        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'GET',
            success: function(res) {
                form.val('form-item', res.data)
                    // console.log(res);
            }

        })
    })


    $('body').on('submit', '#form-item', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败');
                }
                layer.msg('更新分类数据成功')
                initartcarte();
                // 根据索引 关闭对应的弹出层
                layer.close(indexedie);
                initartcarte();

            }

        })
    })

    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'GET',
                success: function(res) {
                    //console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除分类数据失败');
                    }
                    layer.msg('删除分类数据成功')
                    layer.close(index);
                    // 根据索引 关闭对应的弹出层
                    initartcarte();

                }
            })


        });
    })


})