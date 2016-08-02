My coding practice for book "AngularJS: Maintaining Web Applications(2016)" `so=safaribooksonline`

### Environment
WebStorm 2016.1.3, OSX 10.11.6, Angular 1.5.8


### Notes

| Prefix | Details |
| --- | --- |
| @ | This prefix passes the data as a string. |
| = | This prefix creates a bidirectional relationship between a controller’s scope property and a local scope directive property. |
| & | This prefix binds the parameter with an expession in the context of the parent scope. It is useful if you would like to provide some outside functions to the directive. |

```
@表示用户将直接给定一个字符串常量
=表示用户将给定一个变量名
&表示用户将给定一个函数名(需要跟上一对括号)
模板中的ng-transclude表示这个元素的innerText来自于用户使用相应指令时填写的innerText.  需要在该指令的DDO中写上transclude:true才能生效.
```