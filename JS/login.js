      $(function() {
          $('.alog').on('click', function() {
              $('.box').fadeOut();
              $('.regbox').fadeIn();
          })
          $('.areg').on('click', function() {
                  $('.box').fadeIn();
                  $('.regbox').fadeOut();
              })
              // 从layui中获取 from对象
          var form = layui.form;
          // 通过 form.verify() 函数自定义校验规则
          form.verify({
              // 自定义一个pwd 的校验规则
              pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
              //   校验两次密码是否一致的规则
              repwd: function(value) {
                  // 输入的密码与密码框里的内容不一致则返回提示
                  var pwd = $(".regbox [name=password]").val()
                  if (pwd !== value) {
                      return "两次密码不一样";
                  }
              }
          })

          // 监听注册表单提交事件
          $("#form-reg").on('submit', function(e) {
                  e.preventDefault();
                  var data = {
                      username: $('#form-reg [name=username]').val(),
                      password: $('#form-reg [name=password]').val()
                  }
                  $.post(
                      '/api/reguser', data,
                      function(res) {
                          if (res.status !== 0) {
                              //   layer.msg 提示框
                              return layer.msg(res.message);
                          }
                          layer.msg("注册成功");

                          //   模拟人的点击行为，直接跳到登录页面
                          $('.areg').click();
                      }
                  )
              })
              //监听登录表单的提交事件
          $("#form-log").on('submit', function(e) {
              e.preventDefault();
              $.ajax({
                  url: '/api/login',
                  method: 'POST',
                  data: $(this).serialize(), //快速获取表单值数据,
                  success: function(res) {
                      if (res.status !== 0) {
                          //   layer.msg 提示框
                          return layer.msg("登录失败");
                      }
                      layer.msg("登录成功");
                      //   console.log(res.token);
                      // 将登录成功得到的 token 字符串，保存到localStorage 中、、
                      localStorage.setItem('token', res.token)
                          //   跳转后台主页
                      location.href = "/index.html";
                  }
              })

          })



      })