$(function() {
    initcate();

    var layer = layui.layer;
    var form = layui.form;

    function initcate() {
        $.ajax({

            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("初始化文章分类失败")
                }
                //console.log(res);
                // 调用模板引擎
                var htmlstr = template('tpl-cate', res)
                $('[name=cate-id]').html(htmlstr);
                //调用form.render()
                form.render();
            }
        })
    }
})