/**
 * 将车型的前3位与后面用 - 分隔开, 比如6MBV006会变成6MB - V006
 */
parking.filter('plate', function () {
    return function (input, separator) {
        separator = separator || ' - '
        var head = input.substring(0, 3);
        var tail = input.substring(3);
        return head + separator + tail;

    };
});