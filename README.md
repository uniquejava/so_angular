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

date: 'dd/MM/yyyy hh:mm'

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

### Thinking
controller中的$scope相当于vue中的data. 每个模板都需要data属性! controller的$scope暴露property或method给template使用就这么简单. 
ng-route中的resolve是真正类似data属性的东西. 可以在resolve上定义变量给template使用(不过需要先通过injection注入到controller的$scope之上 angular完全可以简化)

### Live template

ngc
```js
$app$.controller("$name$Ctrl", function ($scope, $routeParams) {
    $END$
});
```

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

nghttp
```js
$http({
    method: 'GET',
    url: '$url$'
}).then(function success(res) {
    console.log(res.data);
}, function error(res) {
    console.log(res.data, res.status, res.headers, res.config, res.statusText);
});
```

ngthen
```js
.then(function success(res) {
    // console.log(res.data);
    $END$
}, function error(res) {
    // console.log(res.data, res.status, res.headers, res.config, res.statusText);
});
```

ngget
```js
$http.get("/$bean$s").success(function (data, status, headers, config) {
    $scope.$bean$s = data;

}).error(function (data, status, headers, config) {
    console.log(data, status);
});
```

ngpost
```js
$http.post("/$bean$s", $bean$).success(function (data, status, headers, config) {
    $scope.$bean$s = data;

}).error(function (data, status, headers, config) {
    console.log(data, status);
});
```

ngcrud
```js
$app$.factory("$serviceName$", function ($http) {
    var url = "";
    var _get$Bean$s = function () {
        return $http.get(url + "/$bean$s");
    };

    var _get$Bean$ = function (id) {
        return $http.get(url + "/$bean$s/" + id);
    };

    var _save$Bean$ = function ($bean$) {
        return $http.post(url + "/$bean$s", $bean$);
    };

    var _update$Bean$ = function ($bean$) {
        return $http.put(url + "/$bean$s/" + $bean$.id, $bean$);
    };

    var _delete$Bean$ = function (id) {
        return $http.delete(url + "/$bean$s/" + id);
    };

    return {
        get$Bean$s: _get$Bean$s,
        get$Bean$: _get$Bean$,
        save$Bean$: _save$Bean$,
        update$Bean$: _update$Bean$,
        delete$Bean$: _delete$Bean$
    };
});
```

ngReqI
```js
// $httpProvider.interceptors.push("httpTimestampInterceptor");
$app$.factory("httpTimestampInterceptor", function () {
    return {
        'request': function (config) {
            var ts = Date.now();
            config.url = config.url + "?ts=" + ts;
            return config;
        };
    }
});
```

ngResErrI
```js
// $httpProvider.interceptors.push("httpUnauthorizedInterceptor");
$app$.factory("httpUnauthorizedInterceptor", function ($q, $rootScope) {
    return {
        'responseError': function (rejection) {
            if (rejection.status === 401) {
                // indicate that the app should open the login dialog
                $rootScope.login = true;
            }

            return $q.reject(rejection);

        }
    };
});
```

ngr
```js
$routeProvider.when("/$route1$", {
    templateUrl: "$route1$.html",
    controller: "$route1$Ctrl"
}).when("/car/:id", {
    templateUrl: "car.html",
    controller: "carCtrl"
}).otherwise({
    redirectTo: "/$route1$"
});$END$

```

ngRun
```js
parking.run(function ($http, $rootScope, $window) {
    $http.defaults.headers.common.Accept = "application/json";
    $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';

    $http.defaults.cache = true;
});
```

ngRouteChange
```js
$rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
    $rootScope.loading = true;
});
$rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
    $rootScope.loading = false;
});
$rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
    $window.location.href = "error.html";

});
```

