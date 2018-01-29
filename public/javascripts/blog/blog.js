$(function () {
    (function($) {
        /**
         * 获取url参数
         * @param param
         * @returns {*}
         */
        function getParam(param) {
            const search = location.search;
            if(search == "") {
                location.search="?pageSize=10&pageNum=1"
            }
            const reg = new RegExp('(^|&)'+param+'=([^&]*)(&|$)');
            return search.substr(1).match(reg)[2]
        }

        let $prev = $('.js-prev');
        let $next = $('.js-next');
        let $pages = $('.js-paginate').find('.js-pageNum');
        const pageNum = Number(getParam('pageNum'));    // 当前页数
        const maxPageNum = Number($pages.last().text());    // 最大页数
        if(pageNum === 1) {
            $prev.addClass('disabled');
        }
        if(pageNum === maxPageNum) {
            $next.addClass('disabled');
        }
        $pages.filter((index, el)=>{
            return Number($(el).text()) === pageNum
        }).addClass('active');
        $prev.on('click', function() {
            let pageNum = Number(getParam('pageNum'));
            if(pageNum<=1) {
                return false
            }
            pageNum --;
            changeUrl(pageNum)
            return false;
        })
        $next.on('click', function () {
            let pageNum = Number(getParam('pageNum'));
            if(pageNum >= maxPageNum) {
                return false;
            }
            pageNum ++;
            changeUrl(pageNum);
            return false;
        })
        function changeUrl(pageNum) {
            let href = location.href.replace(/pageNum=\d*/,'pageNum='+pageNum);
            window.location.href = href;
        }
    })(jQuery)
});