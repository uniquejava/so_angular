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

### expressions
{{expression | filter1 | filter2}}

currency

date

filter

json

limitTo: 10

lowercase

number: 2 (保留两位小数)

orderBy: fieldName : ascOrDesc(boolean) 或 orderBy: +/-fieldName

```js
$filter('uppercase')('hello world');

parking.filter('plate', function () {
    return function (input, separator) {
        separator = separator || ' - '
        var head = input.substring(0, 3);
        var tail = input.substring(3);
        return head + separator + tail;

    };
});
```



#### form validation
The HTML language has an element called `form` that surrounds the fields in order to pass them to the server. It also creates a boundary, isolating the form as a single and unique context.

为了使用form validation, 得给form和每个input一个name属性, 这样我们就可以通过name找到它们

不要直接用ngModel中出现的名字, 给它们加个类型后缀是个好办法, 比如carForm, plateField, ..

```html
<alert ng-show="carForm.$dirty && carForm.plateField.$invalid" title="Something went wrong!">
    The plate is invalid!
</alert>

<form name="carForm">
    <input type="text" name="plateField" ng-model="car.plate" 
    placeholder="What's the plate?" ng-required="true" ng-minlength="6" ng-maxlength="10" ng-pattern="/[A-Z{3}[0-9]{3,7}/">
```

angular自动在scope中设置carForm变量, 可以直接使用它的$valid/$invalid/$pristine/$dirty, 

也可以用到各个field之上: `carForm.plateField.$valid/$invalid/$error.required/$error.minlength/$error.pattern`



### live template

ngfilter
```js
$app$.filter('$filterName$', function () {
    return function (input) {
        return $END$
    };
});
```

ngdl

ngdc

ngf
```js
$app$.factory("$serviceName$", function () {
    var _$func$ = function () {
        $END$
    };
    return {
        $func$: _$func$
    };
};
```

ngconst
```js
$app$.constant('$app$Config', {
    $key$: $value$
});
```

ngs
```js
$app$.service("$serviceName$", function () {
    this.$func$ = function () {

        return $END$;
    };

});
```

ngp
```js
$app$.provider("$serviceName$", function () {
    var _$configName$ = 0;
    var _$func$ = function () {
        $END$
    };
    this.set$configName$ = function($configName$){
        _$configName$ = $configName$;
    };
    this.$get = function () {
        // Revealing Module Pattern
        return {
            $func$: _$func$
        };
    };
    
});
```

ngcfg
```js
$app$.config(function ($serviceName$Provider) {
    $serviceName$Provider.set$ConfigName$($value$);
});
```