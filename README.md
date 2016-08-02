My coding practice for book "AngularJS: Maintaining Web Applications(2016)" `so=safaribooksonline`

每个提交记录对应一个topic, 点击这个commit就能通过看代码的方式学习到相应的知识点.

### Environment
WebStorm 2016.1.3, OSX 10.11.6, Angular 1.5.8


### Directive

| Prefix | Details |
| --- | --- |
| @ | This prefix passes the data as a string. |
| = | This prefix creates a bidirectional relationship between a controller’s scope property and a local scope directive property. |
| & | This prefix binds the parameter with an expession in the context of the parent scope. It is useful if you would like to provide some outside functions to the directive. |


@表示用户将直接给定一个字符串常量

=表示用户将给定一个变量名

&表示用户将给定一个函数名(需要跟上一对括号)

模板中的ng-transclude表示这个元素的innerText来自于用户使用相应指令时填写的innerText.  需要在该指令的DDO中写上transclude:true才能生效.

link: function (scope, element, attrs, ctrl, transcludeFn)用来给element绑定一个事件

controller: function ($scope, $element, $attrs, $transclude) 在指令所在的scope上暴露一些API, 给指令对应的模板或者嵌套的指令的模板使用.(就像ng-controller)


### animation
因为改变array而使得ng-repeat的内容发生变化(比如加了一个item)

当在准备这个item的时候自动添加.ng-enter的样式, 然后瞬间会添加.ng-enter-active, 最后当transition结束后, 会移除这些添加的样式.

我们要做的就是定义这两个样式, 让他们产生动画效果(并不是angular定义的动画效果, angular只是在item加入时在极短的时间内连续给它添加了两个不同的class.

```css
.ng-enter {
    /*从一开始看不见*/
    opacity: 0;
    -webkit-transition: all 5s linear;
    transition: all 5s linear;

}

.ng-enter-active {
    /*直到完全看见*/
    opacity: 1;
}
```

自己通过ngClass添加.selected, angular自动给添加.selected-add, 还会在瞬间继续添加.selected-add-active, 最后完全移除.selected-add和.selected-active

### live template

ngdl

ngdc
