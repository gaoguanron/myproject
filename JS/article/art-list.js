$(function() {
    var layer = layui.layer
    var form = layui.form
        //时间过滤器 没有弄



    // 定义一个查询的参数对象，将来请求数据的时候 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章的状态，可选值有：已发布、草稿
    }

    initTable();
    initcate();

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败")
                }
                var htmlstr = template("tpl-table", res)
                $("tbody").html(htmlstr);
                //form.render();
                console.log(res);

            }

        })
    }

    // 初始化文章分类的方法  出现错误
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