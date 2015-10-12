(function(global){
    var document = global.document,
        _array = global.Array,
        _object = global.Object,
        a9 = {},
        u;

    a9.version = '0.5.0';

//    a9 global store
    a9.store = {
        isReady: false,
        touchX: 0,
        touchY: 0,
        touchOnElement: null
    };

//    arrays
    if (_array.isArray !== u){
        /**
         * Проверяет является ли переданный параметр массивом
         * @param {*} verifiable
         * @return {Boolean} массив / не массив
         */
        a9.isArray = function(verifiable){
            return _array.isArray(verifiable);
        };
    } else{
        /**
         * Проверяет является ли переданный параметр массивом
         * @param {*} verifiable
         * @return {Boolean} массив / не массив
         */
        a9.isArray = function(verifiable){
            return _object.prototype.toString.call(verifiable) === '[object Array]';
        };
    }


    function arrayIndexOfFC(array, value){
        for (var i = 0, iMax = array.length; i < iMax; i += 1){
            if (array[i] === value){
                return i;
            }
        }
        return -1;
    }

    function arrayLastIndexOfFC(array, value){
        var i = array.length;
        for (; i--;){
            if (array[i] === value){
                return i;
            }
        }
        return -1;
    }

    /**
     * поиск индэкса значения в массиве, с помощью js (использовать для HTMLCollection)
     * @param {Array} array проверяемый массив
     * @param {*} value
     * @return {Number} возвращает номер индэкса элемента или -1, если элемент не найден
     */
    a9.arrayIndexOfFC = arrayIndexOfFC;

    /**
     * поиск индэкса значения в массиве с конца, с помощью js (использовать для HTMLCollection)
     * @param {Array} array проверяемый массив
     * @param {*} value
     * @return {Number} возвращает номер индэкса элемента или -1, если элемент не найден
     */
    a9.arrayLastIndexOfFC = arrayLastIndexOfFC;

    /**
     * Поиск индэкса значения в массиве
     * @param {Array} array проверяемый массив
     * @param {*} value
     * @return {Number} возвращает номер индэкса элемента или -1, если элемент не найден
     */
    a9.arrayIndexOf = _array.indexOf !== u ?
        function(array, value){
            return array.indexOf(value);
        }
        : arrayIndexOfFC;

    /**
     * Поиск индэкса значения в массиве с конца
     * @param {Array} array проверяемый массив
     * @param {*} value
     * @return {Number} возвращает номер индэкса элемента или -1, если элемент не найден
     */
    a9.arrayLastIndexOf = _array.lastIndexOf !== u ?
        function(array, value){
            return array.lastIndexOf(value);
        }
        : arrayLastIndexOfFC;


    /**
     * Удаляет заданный элемент(ы) переданного массива, !не делая копии массива!
     * Использовать в местах критичных к памяти
     * @param {Array} array массив с которым нужно работать
     * @param {*} element элементы которые нужно удалить
     * @return {Array} array переданный массив
     */
    a9.deleteElementsInArray = function(array, element){
        var i = 0,
            iMax = array.length,
            iReal = 0,
            isHasElement = false;
        for (; i < iMax; i += 1){
            if (!isHasElement && (array[i] === element)){
                isHasElement = true;
                iReal = i;
            }
            if (isHasElement && (array[i] !== element)){
                array[iReal] = array[i];
                iReal += 1;
            }
        }
        array.length = iReal;
        return array;
    };

    /**
     * Вырезает заданное количество элементов массива с указаного индэкса, !не делая копии массива!
     * Использовать в местах критичных к памяти
     * @param {Array} array массив с которым нужно работать
     * @param {Number} from индэкс начала вырезки
     * @param {Number} [size] = 1 количество вырезаемых элементов
     * @return {Array} array переданный массив
     */
    a9.arraySlice = function(array, from, size){
        size = size || 1;
        for (var start = from + size, i = from, iMax = array.length; i < iMax; start += 1, i += 1){
            array[i] = array[start];
        }
        array.length = from + size > iMax ? from : iMax - size;
        return array;
    };

    /**
     * Копирует часть массива с заданного идэкса до заданного идэкса
     * @param {Array} array
     * @param {Array} [arrayForCopy]
     * @param {Number} [from]
     * @param {Number} [to]
     * @return {Array} array
     */
    a9.copyArray = function(array, arrayForCopy, from, to){
        var i = from || 0,
            iMax = array.length,
            j,
            u;
        if ((to === u) || (to > iMax)){
            to = iMax;
        }
        if (arrayForCopy !== u){
            arrayForCopy.length = 0;
        } else{
            if (a9.isArray(array)){
                return array.slice(i, to - i);
            }
            arrayForCopy = [];
        }
        for (i, j = 0; i < to; j+= 1, i += 1){
            arrayForCopy[j] = array[i];
        }
        return arrayForCopy;
    };


//    objects
    /**
     * Проверяет является ли переданный параметр объектом
     * @param {*} verifiable
     * @return {Boolean} объект / не объект
     */
    a9.isObject = function(verifiable){
        var u;
        return (verifiable !== u)
            && (verifiable !== null)
            && (_object.prototype.toString.call(verifiable) === '[object Object]');
    };

    /**
     * Возвращает количество свойств объекта
     * @param {Object} object
     * @return {Number}
     */
    a9.objectLength = function(object){
        var p,
            i = 0;
        for (p in object){
            i += 1;
        }
        return i;
    };

    /**
     *
     * @param {Object} object
     * @returns {boolean}
     */
    a9.isEmptyObject = function(object){
        return a9.objectLength(object) === 0;
    };

    if (_object.create !== u){
        /**
         * copy object
         * @param {Object} object — object for copy
         * @returns {Object}
         */
        a9.copyObject = function(object){
            return _object.create(object);
        };
    } else{
        /**
         * copy object
         * @param {Object} object — object for copy
         * @returns {Object}
         */
        a9.copyObject = function(object){
            var p,
                newObject = {};
            for (p in object){
                newObject[p] = object[p];
            }
            return newObject;
        };
    }

//    object+array mixed dependencies

//    clone

    /**
     * Клонирование массива любой глубины
     * @param {Array} array массив для клонирования
     * @param {Array} [toArray] массив в который будет производится клонирование
     * @returns {Array}
     */
    a9.cloneArray = function(array, toArray){
        var i = 0,
            iMax = array.length,
            newArray = toArray || [],
            value;

        for (; i < iMax; i += 1){
            value = array[i];
            if (a9.isObject(value)){
                value = a9.cloneObject(value);
            } else if (a9.isArray(value)){
                value = a9.cloneArray(value);
            }
            newArray[i] = value;
        }

        newArray.length = iMax;

        return newArray;
    };

    /**
     * Клонирование объекта любой глубины
     * @param {Object} object объект для клонирования
     * @param {Object} [toObject] объект в который будет производится клонирование
     * @returns {Object}
     */
    a9.cloneObject = function(object, toObject){
        var p,
            newObject = toObject || {},
            value;

        for (p in object){
            value = object[p];
            if (a9.isObject(value)){
                value = a9.cloneObject(value);
            } else if (a9.isArray(value)){
                value = a9.cloneArray(value);
            }
            newObject[p] = value;
        }

        return newObject;
    };

    global.A9 = a9;

}(this));


//A9.deviceInfo check device
(function(global, a9){
    var document = global.document,
        html = document.documentElement,
        testElemStyle = document.createElement('div').style,
        jsStylePrefixes = ['webkit', 'Moz', 'O', 'MS'],
        cssStylePrefixes = ['-webkit-', '-moz-', '-o-', '-ms-'],
        prefixIndex,
        htmlClass = '',
        requestAF,
        cancelAF,
        browser = navigator.userAgent,
        os = navigator.platform,
        upperProperty,
        i,
        browserVersion,
        iPadVersionTestFunction,
        u,
//            all properties identified for correct boolean if
        deviceInfo = {
            browser: browser,
            os: os,
            isMac: false,
            isIPad: false,
            iPadVersion: u,
            onIPadVersion: u,
            isIPhone: false,
            isWindows: false,
            isAndroid: false,
            isOldAndroid: false,
            isRetina: false,
            isTouch: false,
            isFx: false,
            isWebKit: false,
            isChrome: false,
            isSafari: false,
            isOpera: false,
            isIE: false,
            isOldIE: false,
            isUnbelievableOldIE: false,
            browserVersion: u,
            isOld: false,
            isUndefined: false,
            isSVG: false,
            isTransforms: false,
            sTransform: u,
            cssTransform: u,
            isTransitions: false,
            sTransition: u,
            cssTransition: u,
            eTransitionEnd: u,
            sTDelay: u,
            sTDuration: u,
            sTProperty: u,
            sTTimingFunction: u,
            isAnimation: false,
            sAnimation: u,
            cssAnimation: u,
            cssKeyFrame: u,
            isPerspective: false,
            sPerspective: u,
            cssPerspective: u,
            sPerspectiveOrigin: u,
            cssPerspectiveOrigin: u,
            isBorderRadius: false,
            sBorderRadius: u,
            cssBorderRadius: u,
            isBoxShadow: false,
            sBoxShadow: u,
            cssBoxShadow: u,
            isCSSGradient: false,
            cssLinearGradient: u,
            cssRadialGradient: u,
            isCSSModernBrowser: false,
            requestAF: u,
            cancelAF: u,
            cssPrefix: u,
            sPrefix: u,
            eventOnPointerStart: u,
            eventOnPointerEnd: u
        };

    function testProperty(property, cssProperty){
        upperProperty = property.charAt(0).toUpperCase() + property.substr(1);
        if (testElemStyle[property] !== u){
            deviceInfo['s' + upperProperty] = property;
            deviceInfo['css' + upperProperty] = cssProperty || property;
            if (property === 'transition'){
                deviceInfo.eTransitionEnd = 'transitionend';
                deviceInfo.sTDelay = 'transitionDelay';
                deviceInfo.sTDuration = 'transitionDuration';
                deviceInfo.sTProperty = 'transitionProperty';
                deviceInfo.sTTimingFunction = 'transitionTimingFunction';
            } else if (property === 'animation'){
                deviceInfo.cssKeyFrame = '@keyframes';
            } else if (property === 'perspective'){
                deviceInfo.sPerspectiveOrigin = 'perspectiveOrigin';
                deviceInfo.cssPerspectiveOrigin = 'perspective-origin';
            }
            return true;
        }
        if (testElemStyle[jsStylePrefixes[prefixIndex] + upperProperty] !== u){
            deviceInfo['s' + upperProperty] = jsStylePrefixes[prefixIndex] + upperProperty;
            deviceInfo['css' + upperProperty] = cssStylePrefixes[prefixIndex] + (cssProperty || property);
            if (property === 'transition'){
                deviceInfo.eTransitionEnd = deviceInfo.isFx ? 'transitionend' : jsStylePrefixes[prefixIndex] + 'TransitionEnd';
                deviceInfo.sTDelay = jsStylePrefixes[prefixIndex] + 'TransitionDelay';
                deviceInfo.sTDuration = jsStylePrefixes[prefixIndex] + 'TransitionDuration';
                deviceInfo.sTProperty = jsStylePrefixes[prefixIndex] + 'TransitionProperty';
                deviceInfo.sTTimingFunction = jsStylePrefixes[prefixIndex] + 'TransitionTimingFunction';
            } else if (property === 'animation'){
                deviceInfo.cssKeyFrame = '@' + cssStylePrefixes[prefixIndex] + 'keyframes';
            } else if (property === 'perspective'){
                deviceInfo.sPerspectiveOrigin = jsStylePrefixes[prefixIndex] + 'PerspectiveOrigin';
                deviceInfo.cssPerspectiveOrigin = cssStylePrefixes[prefixIndex] + 'perspective-origin';
            }
            return true;
        }
        return false;
    }

    function addGradientSupport(prefix){
        deviceInfo.isCSSGradient = true;
        deviceInfo.cssLinearGradient = prefix + 'linear-gradient';
        deviceInfo.cssRadialGradient = prefix + 'radial-gradient';
        htmlClass += ' isCSSGradientFriendly';
    }

    deviceInfo.browser = browser;
    deviceInfo.os = os;

    if ((global.devicePixelRatio !== u) && (global.devicePixelRatio > 1)) {
        deviceInfo.isRetina = true;
        htmlClass += ' isRetina';
    } else{
        htmlClass += ' isNotRetina';
    }

    if (os.indexOf('Win') !== -1){
        deviceInfo.isWindows = true;
        htmlClass += ' Windows';
    } else if (os.indexOf('Mac') !== -1){
        deviceInfo.isMac = true;
        htmlClass += ' Mac';
    } else if ((os.indexOf('iPhone') !== -1) || (os.indexOf('iPod') !== -1)){
        deviceInfo.isIPhone = true;
        htmlClass += ' iPhone';
    } else if (browser.indexOf('Android') !== -1){
        deviceInfo.isAndroid = true;
        htmlClass += ' Android';
        if (document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Shape', '1.0')){
            htmlClass += ' isNewAndroid';
        } else{
            deviceInfo.isOldAndroid = true;
            htmlClass += ' isOldAndroid';
        }
    } else if (os.indexOf('iPad') !== -1){
        deviceInfo.isIPad = true;
        htmlClass += ' iPad';
        if (deviceInfo.isRetina){
            deviceInfo.iPadVersion = 3;
        } else{
            iPadVersionTestFunction = function(e){
                deviceInfo.iPadVersion = e.acceleration !== null ? 2 : 1;
                if (deviceInfo.onIPadVersion !== u){
                    deviceInfo.onIPadVersion();
                }
                global.removeEventListener('devicemotion', iPadVersionTestFunction);
                iPadVersionTestFunction = null;
            };
            global.addEventListener('devicemotion', iPadVersionTestFunction);
        }
    }

    deviceInfo.isTouch = deviceInfo.isIPad || deviceInfo.isIPhone || deviceInfo.isAndroid;

    if (deviceInfo.isTouch){
        htmlClass += ' isTouch';
        deviceInfo.eventOnPointerDown = 'touchstart';
        deviceInfo.eventOnPointerUp = 'touchend';
        deviceInfo.eventOnPointerEnd = 'touchend';
    } else{
        htmlClass += ' isNotTouch';
        deviceInfo.eventOnPointerDown = 'mousedown';
        deviceInfo.eventOnPointerUp = 'mouseup';
        deviceInfo.eventOnPointerEnd = 'click';
    }

    if (browser.indexOf('Chrome') !== -1){
        prefixIndex = 0;
        deviceInfo.browserVersion = browserVersion = parseFloat(browser.substr(browser.indexOf('Chrome/') + 7, 4));
        deviceInfo.isChrome = deviceInfo.isWebKit = true;
        htmlClass += ' isChrome isWebKit isNoIE Chrome_' + browserVersion;
        if (browserVersion < 4){
            htmlClass += ' OldCh';
            deviceInfo.isOld = true;
        }
    } else if (browser.indexOf('Firefox') !== -1){
        prefixIndex = 1;
        deviceInfo.browserVersion = browserVersion = parseFloat(browser.substr(browser.lastIndexOf('/') + 1, 4));
        deviceInfo.isFx = true;
        htmlClass += ' isFX isNoIE FX_' + browserVersion;
        if (browserVersion < 3.5){
            deviceInfo.isOld = true;
            htmlClass += ' OldFX';
        }
    } else if ((browser.indexOf('Safari') !== -1) || ((deviceInfo.isIPad || deviceInfo.isIPhone) && (browser.indexOf('AppleWebKit') !== -1))){
        prefixIndex = 0;
        deviceInfo.browserVersion = browserVersion = parseFloat(browser.substr(browser.indexOf('Version/') + 8, 4));
        deviceInfo.isSafari = deviceInfo.isWebKit = true;
        htmlClass += ' isSafari isWebKit isNoIE Safari_' + browserVersion;
        if (browserVersion < 4){
            htmlClass += ' OldSF';
            deviceInfo.isOld = true;
        }
    } else if (browser.indexOf('MSIE') !== -1){
        prefixIndex = 3;
        if (document.documentMode !== u){
            browserVersion = document.documentMode;
        } else if (document.compatMode === 'CSS1Compat'){
            browserVersion = parseFloat(browser.substr(browser.indexOf('MSIE') + 5, 3));
        } else{
            browserVersion = 5;
        }
        deviceInfo.browserVersion = browserVersion;
        deviceInfo.isIE = true;
        htmlClass += ' isIE IE_' + browserVersion;
        if (browserVersion < 9){
            deviceInfo.isOldIE = true;
            htmlClass += ' isOldIE';
            if (browserVersion < 8){
                deviceInfo.isUbelivableOldIE = true;
            }
        } else{
            htmlClass += ' isNewIE';
        }
    } else if ((browser.indexOf('Trident') !== -1)){
        prefixIndex = 3;
        deviceInfo.browserVersion = browserVersion = +(browser.substr(browser.indexOf('rv:') + 3).replace(/[^0-9|\.]|^0+/g, ''));
        deviceInfo.isIE = true;
    } else if (browser.indexOf('Opera') !== -1){
        prefixIndex = 2;
        deviceInfo.browserVersion = browserVersion = parseFloat(browser.substr(browser.indexOf('Version/') + 8, 4));
        deviceInfo.isOpera = true;
        htmlClass += ' isOpera isNoIE O_' + browserVersion;
        if (browserVersion < 11){
            htmlClass += ' OldO';
            deviceInfo.isOld = true;
        }
    } else{
        prefixIndex = 100;
        htmlClass += ' UndefinedBrowser';
        deviceInfo.isUndefined = true;
    }

    if (!deviceInfo.isWebKit){
        htmlClass += ' isNotWebKit';
    }

    if (deviceInfo.isUndefined){
        htmlClass += ' isBoxShadowUnfriendly isRBSUnfriendly isCSSGradientUnfriendly isCSSNotModernBrowser';
        deviceInfo.requestAF = function(frameFunction){
            return setTimeout(frameFunction, 16);
        };
        deviceInfo.cancelAF = function(id){
            clearTimeout(id);
        };
    } else{
        deviceInfo.cssPrefix = cssStylePrefixes[prefixIndex] || '';
        deviceInfo.sPrefix = jsStylePrefixes[prefixIndex] || '';
        if (!(deviceInfo.isOldAndroid || deviceInfo.isOldIE)) {
            deviceInfo.isSVG = true;
            htmlClass += ' isSVG';
        }

        if (testProperty('transition')){
            deviceInfo.isTransitions = true;
            htmlClass += ' isTransitionsFriendly';
        } else{
            htmlClass += ' isTransitionsUnfriendly';
        }

        if (testProperty('transform')){
            deviceInfo.isTransforms = true;
            htmlClass += ' isTransformsFriendly';
        } else{
            htmlClass += ' isTransformsUnfriendly';
        }

        if (deviceInfo.isTransitions && deviceInfo.isTransforms){
            htmlClass += ' isTransformsTransitionsFriendly';
        } else{
            htmlClass += ' isTransformsTransitionsUnfriendly';
        }

        if (testProperty('borderRadius', 'border-radius')){
            deviceInfo.isBorderRadius = true;
            htmlClass += ' isBoxShadowFriendly';
        } else{
            htmlClass += ' isBoxShadowUnfriendly';
        }

        if (testProperty('boxShadow', 'box-shadow')){
            deviceInfo.isBoxShadow = true;
            htmlClass += ' isRBSFriendly';
        } else{
            htmlClass += ' isRBSUnfriendly';
        }

        if (testProperty('animation')){
            deviceInfo.isAnimation = true;
            htmlClass += ' isAnimationFriendly';
        } else{
            htmlClass += ' isAnimationUnfriendly';
        }

        if (testProperty('perspective')){
            deviceInfo.isPerspective = true;
            htmlClass += ' isPerspectiveFriendly';
        } else{
            htmlClass += ' isPerspectiveUnfriendly';
        }

        if (testProperty('webkitTextSecurity')){
            deviceInfo.isWebkitTextSecurity = true;
            htmlClass += ' isWebkitTextSecurityFriendly';
        } else{
            htmlClass += ' isWebkitTextSecurityUnfriendly';
        }

        if (((deviceInfo.isIPad || deviceInfo.isIPhone) && (browser.indexOf('Safari') !== -1)) || (deviceInfo.isAndroid && (browser.indexOf('Safari') !== -1)) || (deviceInfo.isChrome && (browserVersion >= 16)) || (deviceInfo.isSafari && (browserVersion >= 5))){
            addGradientSupport('-webkit-');
        } else if (deviceInfo.isFx && (browserVersion >= 3.6)){
            addGradientSupport('-moz-');
        } else if (deviceInfo.isOpera && (browserVersion >= 11.6)){
            addGradientSupport('-o-');
        } else if (deviceInfo.isIE && (browserVersion >= 10)){
            addGradientSupport('-ms-');
        } else{
            htmlClass += ' isCSSGradientUnfriendly';
            deviceInfo.isCSSGradient = false;
        }
//        attention! reusing var Property!
        upperProperty = jsStylePrefixes[prefixIndex].toLowerCase();
        if (global.requestAnimationFrame !== u){
            deviceInfo.requestAF = function(frameFunction){
                return global.requestAnimationFrame(frameFunction);
            };
            deviceInfo.cancelAF = function(id){
                global.cancelAnimationFrame(id);
            }
        } else if (global[upperProperty + 'RequestAnimationFrame'] !== u){
            requestAF = upperProperty + 'RequestAnimationFrame';
            cancelAF = upperProperty + 'CancelAnimationFrame';
            deviceInfo.requestAF = function(frameFunction){
                return global[requestAF](frameFunction);
            };
            deviceInfo.cancelAF = function(id){
                global[cancelAF](id);
            };
        } else{
            deviceInfo.requestAF = function(frameFunction){
                return setTimeout(frameFunction, 16);
            };
            deviceInfo.cancelAF = function(id){
                clearTimeout(id);
            };
        }
//        attention! reusing var Property!
        upperProperty = html.className;
        if (upperProperty.indexOf('noJS') !== -1){
            html.className = upperProperty.replace('noJS', '');
        }
        if (deviceInfo.isCSSGradient && deviceInfo.isBoxShadow && deviceInfo.isBorderRadius){
            deviceInfo.isCSSModernBrowser = true;
            htmlClass += ' isCSSModernBrowser';
        } else{
            htmlClass += ' isCSSNotModernBrowser';
        }
    }
    html.className += htmlClass;
    htmlClass = i = upperProperty = testElemStyle = jsStylePrefixes = cssStylePrefixes = os = browser = browserVersion = testProperty = null;

    a9.deviceInfo = deviceInfo;

}(this, A9));


//A9.ready();
(function(global, a9){
    /**
     * Эмуляция DOMOnLoad и общий инит библиотеки
     * @param {Function} handler обработчики DOMOnLoad
     */
    a9.ready = function(handler){
        var document = global.document,
            tryScroll,
            a9Store = a9.store,
            callbacks = [handler],
            body,
            i = 0,
            iMax = 1,
            html,
            isReady = false;
        handler = null;
        function ready(){
            if (!isReady){
                a9Store.isReady = isReady = true;
                a9.ready = function(handler){
                    handler(a9, global);
                };
                for (; i < iMax; i += 1){
                    callbacks[i](a9, global);
                }
                html = body = tryScroll = callbacks = i = iMax = null;
            }
        }
        if (a9.deviceInfo.isTouch){
            callbacks[1] = callbacks[0];
            callbacks[0] = function(){
                body = document.body;
                function getTouchedElement(){
                    return document.elementFromPoint(a9Store.touchX - global.pageXOffset, a9Store.touchY - global.pageYOffset);
                }
                body.addEventListener('touchstart', function(e){
                    a9Store.touchX = e.targetTouches[0].pageX;
                    a9Store.touchY = e.targetTouches[0].pageY;
                    a9Store.touchOnElement = getTouchedElement();
                });
                body.addEventListener('touchmove', function(e){
                    a9Store.touchX = e.targetTouches[0].pageX;
                    a9Store.touchY = e.targetTouches[0].pageY;
                    a9Store.touchOnElement = getTouchedElement();
                });
                body.addEventListener('touchend', function(e){
                    a9Store.touchX = e.changedTouches[0].pageX;
                    a9Store.touchY = e.changedTouches[0].pageY;
                    a9Store.touchOnElement = getTouchedElement();
                });
            };
            iMax += 1;
        }
        a9.ready = function(callback){
            callbacks[iMax] = callback;
            iMax += 1;
        };
        if ('addEventListener' in global){
            document.addEventListener('DOMContentLoaded', ready);
            global.addEventListener('load', ready);
        } else if ('attachEvent' in global){
            html = document.documentElement;
            if (('doScroll' in html) && (global === global.top)){
                tryScroll = function(){
                    if (!isReady || (body === null)){
                        return this;
                    }
                    try{
                        html.doScroll('left');
                        ready();
                    } catch (e){
                        setTimeout(tryScroll, 16);
                    }
                };
                tryScroll();
            }
            document.attachEvent('onreadystatechange', function(){
                if (document.readyState === 'complete'){
                    ready();
                }
            });
            global.attachEvent('onload', ready);
        } else{
            global.onload = ready;
        }
    }
}(this, A9));

/**
 * Обект проверки активности таба (окна браузера)
 * @type {A9.active}
 * A9.active = {
 *     is: {Boolean} сокрощённо от isActive флаг активности
 *     focus {Array} массив функций которые вызываются если таб становиться активным, в том чисте и при ините
 *     blur {Array} массив функций которые вызываются если таб становиться неактивным
 * }
 *
 * в A9.active.focus и A9.active.blur функции добавляются с помощью метода массива push,
 * удаляются с помощью метода A9.deleteElementsArray()
 */

(function(global, a9){
    var document,
        active = {
            is: true,
            focus: [],
            blur: []
        },
        isInit = false;
    function blur(){
        for (var i = 0, blurCallbacks = active.blur, iMax = blurCallbacks.length; i < iMax; i += 1){
            blurCallbacks[i]();
        }
        active.is = false;
    }
    function focus(){
        if (isInit){
            for (var i = 0, focusCallbacks = active.focus, iMax = focusCallbacks.length; i < iMax; i += 1){
                focusCallbacks[i]();
            }
            active.is = true;
        } else{
            isInit = true;
        }
    }
    if (a9.deviceInfo.isOldIE){
        document = global.document;
        document.onfocusin = focus;
        document.onfocusout = blur;
    } else{
        global.addEventListener('focus', focus);
        global.addEventListener('blur', blur);
    }
    isInit = true;
    a9.active = active;
}(this, A9));

/**
 * Объект для работы с позицыей курсора в input/textarea
 * @type {A9.cursorPosition}
 * SWF01.cursorPosition = {
 *     /**
 *      * Получить позицию курсора
 *      * @param {HTMLElement} $input input/textarea
 *     get: function(object){}
 *     /**
 *      * Задать позицию курсора
 *      * @param {HTMLElement} $input input/textarea
 *      * @param {Number} position позиция курсора
 *     set: function(object, position){}
 * }
 *
 */
(function(global, a9){
    var cursorPosition = global.document.selection ? {
            get: function($input){
                var range = document.selection.createRange();
                range.moveStart('textedit', -1);
                return range.text.length;
            },
            set: function($input, position){
                var range = $input.createTextRange();
                range.collapse(true);
                range.moveStart('character', position);
                range.select();
            }
        } : {
            get: function($input){
                return $input.selectionStart;
            },
            set: function($input, position){
                $input.setSelectionRange(position, position);
            }
        };

    a9.cursorPosition = cursorPosition;

    a9.trackLastKeyDownCursorPosition = function(){
        var cursorPos = null,
            $lastTarget,
            tracker = {
                get: function($target){
                    return $target === $lastTarget ? cursorPos : null;
                }
            };

        a9.addEvent(global.document, 'keydown', function(e){
            var _$lastTarget = e.target,
                tagName = _$lastTarget.tagName;
            
            if ((tagName === 'TEXTAREA')
                || ((tagName === 'INPUT')
                    && _$lastTarget.type === 'text')){
                $lastTarget = e.target;
                cursorPos = cursorPosition.get($lastTarget);
            }
        });
        a9.trackLastKeyDownCursorPosition = function(){
            return tracker;
        };
        return a9.trackLastKeyDownCursorPosition();
    };
})(this, A9);

A9.ready(function(a9, global){
    var document = global.document,
        $body = document.body,
        focusInEvent = 'focusin',
        focusOutEvent = 'focusout',
        $testInputContainer,
        $testInput,
        focusInspectionsDestructor,
        $activeElement,
        activeElementFakeEvent,
        inputsInInspection = 0,
        isNative = false;

    function testNativeFocusInOutEvents(){
        $testInputContainer = document.createElement('div');
        $testInputContainer.setAttribute('style', 'width:10xp;height:10px;position:relative;overflow:hidden;position:fixed;top:-10px;left:-10px;');
        $body.appendChild($testInputContainer);

        $testInput = document.createElement('input');
        $testInput.type = 'text';
        a9.addEvent($testInput, 'focusin', initNativeFocusInOutEvents);
        $testInputContainer.appendChild($testInput);

        $testInput.focus();

        a9.removeEvent($testInput, 'focusin', initNativeFocusInOutEvents);
        a9.removeElement($testInputContainer);

        if (!isNative){
            initCustomFocusInOutEvents();
        }
    }

    function initNativeFocusInOutEvents(){
        isNative = true;
        a9.addFocusInEvent = function($element, listener){
            a9.addEvent($element, focusInEvent, listener);
        };
        a9.removeFocusInEvent = function($element, listener){
            a9.removeEvent($element, focusInEvent, listener);
        };
        a9.addFocusOutEvent = function($element, listener){
            a9.addEvent($element, focusOutEvent, listener);
        };
        a9.removeFocusOutEvent = function($element, listener){
            a9.removeEvent($element, focusOutEvent, listener);
        };
    }

    function initCustomFocusInOutEvents(){
        a9.addFocusInEvent = function($node, listener){
            addEventForInspection();
            a9.addCustomEvent($node, focusInEvent, listener);
        };
        a9.removeFocusInEvent = function($node, listener){
            removeEventForInspection();
            a9.removeCustomEvent($node, focusInEvent, listener);
        };
        a9.addFocusOutEvent = function($node, listener){
            addEventForInspection();
            a9.addCustomEvent($node, focusOutEvent, listener);
        };
        a9.removeFocusOutEvent = function($node, listener){
            removeEventForInspection();
            a9.removeCustomEvent($node, focusOutEvent, listener);
        };
    }

    function addEventForInspection(){
        if (inputsInInspection === 0){
            $activeElement = document.activeElement;
            activeElementFakeEvent = {target: $activeElement};
            focusInspectionsDestructor = focusInspectionsInit();
        }
        inputsInInspection += 1;
    }

    function removeEventForInspection(){
        inputsInInspection -= 1;
        if (inputsInInspection <= 0){
            inputsInInspection = 0;
            focusInspectionsDestructor();
        }
    }

    function focusInspectionsInit(){
        function check(){
            if ($activeElement !== document.activeElement){
                a9.generateCustomEvent($activeElement, focusOutEvent, activeElementFakeEvent);
                if ($activeElement !== $body){
                    a9.generateCustomEvent($body, focusOutEvent, activeElementFakeEvent);
                }

                $activeElement = document.activeElement;
                activeElementFakeEvent.target = $activeElement;
                a9.generateCustomEvent($activeElement, focusInEvent, activeElementFakeEvent);
                if ($activeElement !== $body){
                    a9.generateCustomEvent($body, focusInEvent, activeElementFakeEvent);
                }
            }
        }
        a9.repeatedInspections.add(check);
        return function(onDestruction){
            activeElementFakeEvent.target = null;
            activeElementFakeEvent = $activeElement = null;
            a9.repeatedInspections.remove(check, function(){
                if (typeof onDestruction === 'function'){
                    onDestruction();
                }
            });
        }
    }

    testNativeFocusInOutEvents();
});
(function(a9){
    /**
     * джойнит аргументы
     * @param {arguments} args
     * @param {String} separator
     * @returns {String}
     */
    a9.joinArgs = function(args, separator){
        var i = args.length,
            array = [];
        array.length = i;
        for (; i-- ;){
            array[i] = args[i];
        }
        return array.join(separator);
    };

}(A9));

(function(a9){
    /**
     * Форматирование числа
     * @param {Number|String} digit число
     * @param {Number} [floatLength] длинна флоатной части
     * @param {Boolean} [isNotFloatZeros] флаг необходимости флоатной части
     * @returns {String} отформатированное число digit
     */
    a9.formatDigit = function(digit, floatLength, isNotFloatZeros){
        var strCache,
            digitSeparator = ' ',
            digitFloatSeparator = ',',
            intCache,
            strIntegerPart,
            i,
            j,
            strFloatPart,
            u,
            isHasFloat,
            isNegativeNumber,
            intCache2,
            regClearThenInt = /[^0-9|\.]|^0+/g;
        if ('l10n' in a9){
            strCache = a9.l10n('digitSeparator');
            if ('digitSeparator' !== strCache){
                digitSeparator = strCache;
            }
            strCache = a9.l10n('digitFloatSeparator');
            if ('digitFloatSeparator' !== strCache){
                digitFloatSeparator = strCache;
            }
        }
        a9.formatDigit = function(digit, floatLength, isNotFloatZeros){
            if (typeof digit === 'string'){
                intCache = digit.indexOf(digitFloatSeparator);
                if (intCache !== -1){
                    digit = digit.replace(digitFloatSeparator, '.');
                }
                intCache2 = digit.indexOf('-');
                strCache = digit.replace(regClearThenInt, '');
                if (intCache2 === 0){
                    strCache = '-' + strCache;
                }
            } else{
                strCache = digit.toString();
            }
            intCache = strCache.indexOf('.');
            isHasFloat = intCache !== -1;
            if (isHasFloat){
                strFloatPart = strCache.substr(intCache + 1);
                strCache = strCache.substr(0, intCache);
            } else{
                strFloatPart = '';
            }
            isNegativeNumber = strCache.indexOf('-') === 0;
            if (isNegativeNumber){
                strCache = strCache.substr(1);
            }
            i = strCache.length;
            if (i > 3){
                strIntegerPart = '';
                for (j = 4; j--, i-- ;){
                    if (j === 0){
                        j = 3;
                        strIntegerPart = digitSeparator + strIntegerPart;
                    }
                    strIntegerPart = strCache.charAt(i) + strIntegerPart;
                }
                strCache = strIntegerPart;
            }
            if (isNegativeNumber){
                strCache = '-' + strCache;
            }
            if (strCache === ''){
                strCache = '0';
            }
            if (floatLength === 0){
                return strCache;
            } else if (floatLength !== u){
                intCache = strFloatPart.length;
                if (floatLength < intCache){
                    strFloatPart = strFloatPart.substr(0, floatLength);
                } else if ((floatLength > intCache) && (isNotFloatZeros !== true)){
                    for (i = floatLength - intCache; i-- ;){
                        strFloatPart += '0';
                    }
                }
                if (!(isNotFloatZeros && (strFloatPart === ''))){
                    strFloatPart = digitFloatSeparator + strFloatPart;
                }
            } else if (isHasFloat){
                strFloatPart = digitFloatSeparator + strFloatPart;
            }
            return strCache + strFloatPart;
        };
        return a9.formatDigit.apply(a9, arguments);
    };
}(A9));
/**
 * Ховер
 * ! Работает НА ВСЁМ !
 * @param {HTMLElement} $node DOMNode относительно которого нужно отслеживать ховер
 * @param {Function} [inCallback] калбек начала ховера
 * @param {Function} [outCallback] калбек конца ховера
 * @param {Function} [moveCallback] калбек движения по элементу во время ховера
 * @returns {Function} destructor
 */
(function(global, a9){
    var clearTimeout = global.clearTimeout,
        setTimeout = global.setTimeout,
        $body,
        a9Store = a9.store,
        storage = [],
        i,
        iMax = 0,
        timeOut,
        hoveredIndex,
        u,
        isHoverFriendly;
    if (a9.deviceInfo.isTouch){
        isHoverFriendly = null;
        global.addEventListener('pageshow', function(){
            clearTimeout(timeOut);
            if (hoveredIndex !== -1){
                reset();
            }
        });
        function reset(){
            storage[hoveredIndex + 4] = false;
            if ((hoveredIndex !== u) && (storage[hoveredIndex + 2] !== u)){
                storage[hoveredIndex + 2].call(storage[hoveredIndex], u, true);
            }
            hoveredIndex = -1;
        }
        function countReset(index){
            hoveredIndex = index;
            clearTimeout(timeOut);
            timeOut = setTimeout(reset, 1000);
        }
        a9.hover = function($node, inCallBack, outCallBack, moveCallBack){
            if ($body === u){
                $body = global.document.body;
                $body.addEventListener('touchmove', function(e){
                    for (i = 0; i < iMax; i += 5){
                        if (a9.testParentOf(a9Store.touchOnElement, storage[i])){
                            if (!storage[i + 4] && (storage[i + 1] !== u)){
                                storage[i + 1].call(storage[i], e);
                            }
                            if (storage[i + 3] !== u){
                                storage[i + 3].call(storage[i], e);
                            }
                            storage[i + 4] = true;
                            countReset(i);
                        } else if (storage[i + 4]){
                            storage[i + 4] = false;
                            if (storage[i + 2] !== u){
    //                            false in call is touchmove out flag
                                storage[i + 2].call(storage[i], e, false);
                            }
                        }
                    }
                });
                $body.addEventListener('touchstart', function(e){
                    for (i = 0; i < iMax; i += 5){
                        if (a9.testParentOf(a9Store.touchOnElement, storage[i])){
                            storage[i + 4] = true;
                            countReset(i);
                            if (storage[i + 1] !== u){
                                storage[i + 1].call(storage[i], e);
                            }
                        }
                    }
                });
                $body.addEventListener('touchend', function(e){
                    for (i = 0; i < iMax; i += 5){
                        if (storage[i + 4]){
                            storage[i + 4] = false;
                            clearTimeout(timeOut);
                            if ((storage[i + 2] !== u) && a9.testParentOf(a9Store.touchOnElement, storage[i])){
    //                            true in call is touchend out flag
                                storage[i + 2].call(storage[i], e , true);
                            }
                        }

                    }
                });
            }
            storage.push($node, inCallBack, outCallBack, moveCallBack, false);
            iMax += 5;
            return {
                destructor: function destructor(onDestruction){
                    a9.slice(storage, a9.arrayIndexOf(storage, $node), 5);
                    iMax -= 5;
                    $node = inCallBack = outCallBack = moveCallBack = null;
                    if (onDestruction !== u){
                        onDestruction();
                    }
                    destructor = onDestruction = null;
                }
            };
        };
    } else{
        timeOut = hoveredIndex = null;
        a9.hover = function($node, inCallBack, outCallBack, moveCallBack){
            var timeout,
                isIn = false,
                eventCache;
            if ($body === u){
                $body = global.document.body;
                isHoverFriendly = $node.onmouseleave !== u;
            }
            function hoverOut(e){
                isIn = false;
                e = e || eventCache;
                if (outCallBack !== u){
                    outCallBack.call($node, e);
                }
            }
            function hoverIn(e){
                if (inCallBack !== u){
                    inCallBack.call($node, e);
                }
            }
            if (moveCallBack !== u){
                a9.addEvent($node, 'mousemove', moveCallBack);
            }
            if (isHoverFriendly){
                a9.addEvent($node, 'mouseenter', hoverIn);
                a9.addEvent($node, 'mouseleave', hoverOut);
                return {
                    destructor: function destructor(onDestruction){
                        a9.removeEvent($node, 'mouseenter', hoverIn);
                        a9.removeEvent($node, 'mouseleave', hoverOut);
                        if (moveCallBack !== u){
                            a9.removeEvent($node, 'mousemove', moveCallBack);
                        }
                        moveCallBack = inCallBack = outCallBack = hoverIn = hoverOut = $node = timeout = eventCache = isIn = null;
                        if (onDestruction !== u){
                            onDestruction();
                        }
                        destructor = onDestruction = null;
                    }
                };
            } else{
                function over(e){
                    if (!isIn){
                        isIn = true;
                        hoverIn(e);
                    } else{
                        clearTimeout(timeout);
                    }
                }
                function out(e){
                    eventCache = e;
                    timeout = setTimeout(hoverOut, 1);
                }
                a9.addEvent($node, 'mouseover', over);
                a9.addEvent($node, 'mouseout', out);
                return {
                    destructor: function destructor(onDestruction){
                        a9.removeEvent($node, 'mouseover', over);
                        a9.removeEvent($node, 'mouseout', out);
                        a9.removeEvent($node, 'mousemove', moveCallBack);
                        moveCallBack = inCallBack = outCallBack = hoverIn = hoverOut = over = out = $node = timeout = eventCache = isIn = null;
                        if (onDestruction !== u){
                            onDestruction();
                        }
                        destructor = onDestruction = null;
                    }
                };
            }
        };
    }

}(this, A9));
//todo set method
//todo for ie
(function(global, a9){
    var getSelectionObject = {start: 0, end: 0};
    a9.inputSelection = {
        get: function($input){
            var start = $input.selectionStart,
                end = $input.selectionEnd;
            if (start === end){
                return null;
            }
            getSelectionObject.start = start;
            getSelectionObject.end = end;
            return getSelectionObject;
        },
        set: function($input){

        }
    }
}(this, A9));
/**
 * Глобальный постоянный таймаут, который отсанавилвается если окно таб (или окно) неактивен(о).
 * Подразумевается что туда будут передаваться функции, использущиеся для постоянной проверки каких либо значений,
 * например проверка значения инпута, в случае изменения которого должно генериться кастомное событие
 * @type {A9.repeatedInspections}
 * A9.repeatedInspections = {
 *     /**
 *      * Добавляет функцию, которая будет вызываться максимально часто
 *      * @param {Function} inspectionFunction для постоянной проверки чего-нибудь
 *     add: function(inspectionFunction){}
 *     /**
 *      * Удаляет функцию, которая была добавлена через метод A9.timeTest.add();
 *      * @param {Function} inspectionFunction для постоянной проверки чего-нибудь
 *      * @param {Function} [onRemoveCallback] калбек вызываемый после удаления функции
 *     remove: function(inspectionFunction, onRemoveCallback){}
 * }
 */
(function(global, a9){
    var setTimeout = global.setTimeout,
        clearTimeout = global.clearTimeout,
        timeoutId = -1,
        inspectionsList = [],
        addStack = [],
        removeStack = [],
        isHasToAdd = false,
        isHasToRemove = false,
        isActive = false;

    function inspectionFunctionIndexOf(inspectionFunction, inspectionCTX){
        var i = 0,
            iMax = inspectionsList.length;
        for (; i < iMax; i += 3){
            if ((inspectionsList[i] === inspectionFunction)
                && (inspectionsList[i + 1] === inspectionCTX)){
                return i;
            }
        }
        return -1;
    }

    function check(){
        var i,
            iMax,
            index;

        //check to add
        if (isHasToAdd){
            for (i = 0, iMax = addStack.length; i < iMax; i += 1){
                inspectionsList.push(addStack[i]);
            }
            addStack.length = 0;
            isHasToAdd = false;
            isActive = true;
        }

        //check to remove
        if (isHasToRemove){
            for (i = 0, iMax = removeStack.length; i < iMax; i += 3){
                index = inspectionFunctionIndexOf(removeStack[i], removeStack[i + 1]);
                if (index !== -1){
                    a9.arraySlice(inspectionsList, index, 3);
                }
            }
            removeStack.length = 0;
            isHasToRemove = false;
            if (inspectionsList.length === 0){
                isActive = false;
                timeoutId = -1;
            }
        }

        //check active
        if (isActive){
            for (i = 0, iMax = inspectionsList.length; i < iMax; i += 3){
                inspectionsList[i].call(inspectionsList[i + 1] || global, inspectionsList[i + 2]);
            }
            timeoutId = setTimeout(check, 0);
        }
    }

    a9.repeatedInspections = {
        /**
         *
         * @param {function} inspection
         * @param {*} [ctx]
         * @param {*} [data]
         */
        add: function(inspection, ctx, data){
            addStack.push(inspection, ctx, data);
            isHasToAdd = true;
            if (!isActive){
                check();
            }
        },
        /**
         *
         * @param {function} inspection
         * @param {*} [ctx]
         * @param {*} [data]
         */
        remove: function(inspection, ctx, data){
            removeStack.push(inspection, ctx, data);
            isHasToRemove = true;
        }
    };

    a9.active.focus.push(function(){
        if (timeoutId !== -1){
            clearTimeout(timeoutId);
            timeoutId = -1;
        }
        if (isActive){
            check();
        }
    });

    a9.active.blur.push(function(){
        if (timeoutId !== -1){
            clearTimeout(timeoutId);
            timeoutId = -1;
        }
    });

}(this, A9));
(function(global, a9){
    var constructor,
        u;

    if (global.XMLHttpRequest !== u){
        constructor = function(){
            return new XMLHttpRequest();
        }
    } else{
        try {
            new ActiveXObject('Msxm12.XMLHTTP');
            constructor = function(){
                return new ActiveXObject('Msxm12.XMLHTTP');
            }
        } catch (e){
            try {
                new ActiveXObject('Microsoft.XMLHTTP');
                constructor = function(){
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            } catch (e){}
        }
    }

    function objectToGETParameters(object, isNotNeedUriEncode){
        var array = [],
            p;
        if (isNotNeedUriEncode === true){
            for (p in object){
                array.push(p + '=' + object[p]);
            }
        } else{
            for (p in object){
                array.push(p + '=' + encodeURIComponent(object[p]));
            }
        }
        return array.join('&');
    }

    a9.objectToGETParameters = objectToGETParameters;

    function parseSuccess(request){
        var cache = request.getResponseHeader('Content-Type');
        if ((cache.indexOf('application/json') !== -1) || (cache.indexOf('json/text') !== -1)){
            return global.JSON.parse(request.responseText);
        } else if (cache.indexOf('text/xml') !== -1){
            return request.responseXML;
        }
        return request.responseText;
    }

    /**
     * @param {Object} options — request options for request
     * for example
     * {
         // method mame to uppercase
         method: 'POST',
         //end point url
         url: '/api/',

         //[optional] object notation URL GET parameters
         urlData: {
            search: 'hello'
         },
         //[optional] flag for need URI encode urlData object notation (default: true)
         isNeedURIEncodeURL: false,

         //[optional] object notation POST parameters
         postData: {},
         //[optional] flag for need URI encode postData object notation (default: true)
         isNeedURIEncodePOST: false,

         //[optional] POST body
         send: 'asd=asd&qwer=qwer',

         //[optional] callback if 200 <= request.status < 300 || request.status === 304
         onSuccess: function(parseSuccess, requestData, request){},
         //[optional] callback other request.status
         onError: function(requestData, request){},

         //[optional] timeout in ms
         timeout: 1000,
         //[optional] on timeout end callback
         onTimeoutEnd: function(requestData, request){},

         //[optional] on request state change callback
         onStateChange: function(requestData, request){},

         //[optional] request async flag (default: true)
         isASync: false,

         //[optional] http headers object notation
         headers: {
            "Authorization": "token"
         }
     }
     *
     * @param {*} [requestData] — data parameter for option functions
     * @param {*} [callbacksCTX] — this in option functions
     * @returns {XMLHttpRequest}
     */
    a9.request = function(options, requestData, callbacksCTX){
        var onSuccess = options.onSuccess,
            onError = options.onError,
            timeout = options.timeout,
            onTimeoutEnd = options.onTimeoutEnd,
            isASync = !(options.isASync === false),
            headers = options.headers,
            onStatusChange = options.onStateChange,
            request = constructor(),
            timeoutID,
            isTimeoutAborted = false,
            url = options.url,
            p,
            isNotNeedEncodeURL,
            isNotNeedEncodePOST;

        callbacksCTX = callbacksCTX || global;

        request.onreadystatechange = function(){
            var status;
            if (onStatusChange !== u){
                onStatusChange.call(callbacksCTX, requestData, request);
            }
            if (request.readyState === 4){
                if (timeoutID !== u){
                    global.clearTimeout(timeoutID);
                }
                status = request.status;
                if (((status >= 200) && (status < 300))
                    || (status === 304)){
                    if (onSuccess !== u){
                        onSuccess.call(callbacksCTX, parseSuccess(request), requestData, request);
                    }
                } else{
                    if (onError !== u){
                        onError.call(callbacksCTX, requestData, request);
                    }
                }
                if (!isTimeoutAborted){
                    request = onSuccess = onError = onTimeoutEnd
                        = onStatusChange = callbacksCTX = requestData = headers = null;
                }
            }
        };

        if (options.urlData !== u){
            if (options.isNeedURIEncodeURL !== u){
                isNotNeedEncodeURL = !options.isNeedURIEncodeURL;
            }
            url += '?' + objectToGETParameters(options.urlData, isNotNeedEncodeURL);
        }

        request.open(options.method, url, isASync);

        if (headers !== u){
            for (p in headers){
                request.setRequestHeader(p, headers[p]);
            }
        }

        if (timeout !== u){
            timeoutID = global.setTimeout(function(){
                isTimeoutAborted = true;
                timeoutID = u;
                request.abort();
                if (onTimeoutEnd !== u){
                    onTimeoutEnd.call(callbacksCTX, requestData, request);
                }
                request = onSuccess = onError = onTimeoutEnd
                    = onStatusChange = callbacksCTX = requestData = headers = null;
            }, timeout);
        }

        if (options.method === 'POST'){
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            if (options.isNeedURIEncodePOST !== u){
                isNotNeedEncodePOST = !options.isNeedURIEncodePOST;
            }
            request.send(options.postData !== u ?
                objectToGETParameters(options.postData, isNotNeedEncodePOST)
                : options.send
            );
        } else{
            request.send(null);
        }

        return request;
    };

}(this, A9));

(function(a9){
    function SimpleInstancesBinding(dataAttribute){
        var simpleInstancesBinding = this;
        simpleInstancesBinding.dataAttribute = dataAttribute;
        simpleInstancesBinding.index = 0;
        simpleInstancesBinding.instances = [];
    }

    SimpleInstancesBinding.prototype = {
        /**
         * bind instance to node
         * @param {HTMLElement} $node
         * @param {*} instance
         * @returns {Number} instance index
         */
        bind: function($node, instance){
            var simpleInstancesBinding = this,
                index = simpleInstancesBinding.index;
            simpleInstancesBinding.instances[index] = instance;
            $node.setAttribute(simpleInstancesBinding.dataAttribute, index);
            simpleInstancesBinding.index = index + 1;
            return index;
        },
        /**
         * get instance by node
         * @param {HTMLElement} $node
         * @returns {*|null} instance (or null if instance none)
         */
        getByNode: function($node){
            var simpleInstancesBinding = this,
                index = $node.getAttribute(simpleInstancesBinding.dataAttribute),
                instance,
                u;
            if (index === null){
                return null;
            }
            instance = simpleInstancesBinding.instances[+index];
            if (instance !== u){
                return instance;
            }
            return null
        },
        /**
         * get instance by index
         * @param {Number} index
         * @returns {*|null} instance (or null if instance none)
         */
        getByIndex: function(index){
            var instance = this.instances[index],
                u;
            if (instance === u){
                return null;
            }
            return instance;
        },
        /**
         * remove instance bind
         * @param {HTMLElement} $node
         * @returns {SimpleInstancesBinding}
         */
        unbind: function($node){
            var simpleInstancesBinding = this,
                index = +$node.getAttribute(simpleInstancesBinding.dataAttribute),
                u;
            if (index !== null){
                simpleInstancesBinding.instances[+index] = u;
                $node.removeAttribute(simpleInstancesBinding.dataAttribute);
            }
            return simpleInstancesBinding;
        },
        destructor: function(){
            var simpleInstancesBinding = this;
            simpleInstancesBinding.instances.length = 0;
            simpleInstancesBinding.instances = null;
            simpleInstancesBinding.dataAttribute = null;
            simpleInstancesBinding.index = null;
        }
    };

    /**
     * create SimpleInstancesBinding
     * @param {String} dataAttribute
     * @returns {SimpleInstancesBinding}
     */
    a9.simpleInstanceBinding = function(dataAttribute){
        return new SimpleInstancesBinding(dataAttribute);
    }
}(A9));
(function(a9){
    function StoreManager(onAddFn, onRemoveFn, args){
        var storeManager = this;

        storeManager.onAdd = onAddFn;
        storeManager.onRemove = onRemoveFn;
        storeManager.objects = [];
        storeManager.objectsCount = [];

        if (a9.isArray(args)){
            storeManager.args = args;
        } else{
            storeManager.args = [args];
        }
    }

    StoreManager.prototype = {
        add: function(object){
            var storeManager = this,
                index = a9.arrayIndexOf(storeManager.objects, object);
            if (index === -1){
                storeManager.onAdd.apply(object, storeManager.args);
                storeManager.objects.push(object);
                storeManager.objectsCount.push(1);
            } else{
                storeManager.objectsCount[index] += 1;
            }
        },
        remove: function(object){
            var storeManager = this,
                index = a9.arrayIndexOf(storeManager.objects, object);
            if (index === -1){
                //console.log('error: all objects of this store were already removed');
                //console.log(object);
            } else if (storeManager.objectsCount[index] === 1){
                storeManager.onRemove.apply(object, storeManager.args);
                a9.deleteElementsInArray(storeManager.objects, object);
                a9.deleteElementsInArray(storeManager.objectsCount, index);
            } else{
                storeManager.objectsCount[index] -= 1;
            }
        },
        isEmpty: function(){
            return this.objects.length === 0;
        },
        destructor: function(){
            var storeManager = this;
            storeManager.onAdd = null;
            storeManager.onRemove = null;
            storeManager.objects = null;
            storeManager.objectsCount = null;
        }
    };

    /**
     * create StoreManager
     * @param {Function} onAddFn
     * @param {Function} onRemoveFn
     * @param {Array|}   args
     * @returns {StoreManager}
     */
    a9.storeManager = function(onAddFn, onRemoveFn, args){
        return new StoreManager(onAddFn, onRemoveFn, args);
    }
}(A9));

(function(a9){
    /**
     * Проверка наличия класса
     * @param {HTMLElement} $node
     * @param {String} className имя класса
     * @return {Boolean} есть/нет
     */
    a9.hasClass = function($node, className){
        return $node.className.indexOf(className) !== -1;
    };

    /**
     * Добавить класс элементу
     * @param {HTMLElement} $node
     * @param {String} className имя класса
     */
    a9.addClass = function($node, className){
        if (!a9.hasClass($node, className)){
            $node.className += ' ' + className;
        }
    };

    /**
     * Удалить класс элемента
     * @param {HTMLElement} $node
     * @param {String} className имя класса
     */
    a9.removeClass = function($node, className){
        var classesList;
        if (a9.hasClass($node, className)){
            classesList = $node.className.split(' ');
            a9.deleteElementsInArray(classesList, className);
            $node.className = classesList.join(' ');
        }
    };

    /**
     * Удалить классы элемента
     * @param {HTMLElement} $node
     * @param {String|...} [className]
     * Метод принимает любое количество классов, т.е. метод можно использовать
     * SWF01.removeClasses(document.getElementById('myElement'), 'asd', 'sdf', 'qwe', 'wer', 'zxc', 'xcv')
     * или
     * SWF01.removeClasses(document.getElementById('myElement'), 'asd', 'sdf')
     */
    a9.removeClasses = function($node, className){
        var classesList = $node.className.split(' '),
            i = classesList.length,
            jMax = arguments.length,
            j;

        for (; i-- ;){
            for (j = jMax; j -= 1;){
                if (classesList[i] === arguments[j]){
                    a9.arraySlice(classesList, i, 1);
                    break;
                }
            }
        }

        $node.className = classesList.join(' ');
    };

    /**
     * Заменить класс элемента
     * @param {HTMLBRElement} $node
     * @param {String} replacedClassName класс который нужно заменить
     * @param {String} newClassName класс на который нужно заменить предидущий класс
     */
    a9.replaceClass = function($node, replacedClassName, newClassName){
        if (a9.hasClass($node, replacedClassName)){
            $node.className = $node.className.replace(replacedClassName, newClassName);
        }
    };

    /**
     * getParentByClass вернуть родителя с классом
     * @param {HTMLElement} $node HTML элемет относительно которого нужно идти по цепочке родителей
     * @param {String} className класс родителя
     * @param {Boolean} [isWithMe] флаг начала анализа с себя
     * @return {HTMLElement} возвращает найденого родителя или null
     */
    a9.getParentByClass = function($node, className, isWithMe){
        if (isWithMe !== true){
            $node = $node.parentNode;
        }
        while (($node !== null) && ($node.nodeName !== '#document') && ($node.nodeName !== '#document-fragment')){
            if (a9.hasClass($node, className)){
                return $node;
            }
            $node = $node.parentNode;
        }
        return null;
    };


}(A9));
(function(global, a9){
    /**
     * Проверяет евляется ли элемент ребёнком другого элемента
     * @param {HTMLElement} $node элемент
     * @param {HTMLElement} $parent родитель
     * @return {Boolean} являеться / не является
     */
    a9.testParentOf = function ($node, $parent){
        var u;
        while (($node !== null) && ($node !== u)){
            if ($node === $parent){
                return true;
            }
            $node = $node.parentNode;
        }
        return false;
    };

    /**
     * Удаляет узел из DOM
     * @param {HTMLElement} $node узел который нужно удалить
     */
    a9.removeElement = function($node){
        $node.parentNode.removeChild($node);
    };

    /**
     * Удаляет всё содержимое элемента
     * @param {HTMLElement} $node элемент, содержимое которого нужно удалить
     */
    a9.removeContent = function($node){
        var children = $node.childNodes,
            i = children.length;
        for (; i -- ;){
            $node.removeChild(children[i]);
        }
    };

    /**
     * Получить весь текст внутри узла
     * @param {HTMLElement} $node
     * @return {String} возвращает найденый текст
     */
    a9.getText = function($node){
        return 'textContent' in $node ? $node.textContent  : (function fun(object){
            var child = object.childNodes,
                result = '',
                i = 0,
                iMax = child.length;
            for (; i < iMax; i += 1){
                result += child[i].nodeName != '#text' ?  fun(child[i]) : child[i].nodeValue;
            }
            return result;
        })($node);
    };


    a9.setText = function($node, text){
        var $textNode = a9.getTextNode($node);
        if ('textContent' in $textNode){
            $textNode.textContent = text;
        } else{
            $textNode.nodeValue = text;
        }
    };

    /**
     * Возвращает текстовый узел узла, елси текстового узла нет, создаёт
     * @param {HTMLElement} $node
     * @returns {Node} текстовый узел DOM
     */
    a9.getTextNode = function($node){
        var node = $node.childNodes[0],
            u;
        if (node === u){
            node = document.createTextNode('');
            $node.appendChild(node);
        }
        return node;
    };

    /**
     * Вернуть детей узла
     * @param {HTMLElement} $node HTML-элемент детей которого нужно вернуть
     * @return {HTMLCollection} массив детей
     */
    a9.getChildren = function($node){
        var swf01 = this;
        if ('children' in $node){
            swf01.getChildren = function(object){
                return object.children;
            }
        } else{
            swf01.getChildren = function(object){
                var child = object.childNodes,
                    result = [],
                    i = 0,
                    iMax = child.length;
                for (; i < iMax; i += 1){
                    if (child[i].nodeName !== '#text'){
                        result.push(child[i]);
                    }
                }
                return result;
            }
        }
        return swf01.getChildren($node);
    };

    /**
     * getParentBy вернуть родителя со свойством
     * @param {HTMLElement} $node HTML элемет относительно которого нужно идти по цепочке родителей
     * @param {String} property имя свойства HTML елемента
     * @param {*} [propertyValue] значение свойства HTML елемента
     * @param {Boolean} [isWithMe] значение свойства HTML елемента
     * @return {HTMLElement} возвращает найденого родителя или null
     */
    a9.getParentBy = function($node, property, propertyValue, isWithMe){
        var u,
            isHas = propertyValue === u;
        if (isWithMe !== true){
            $node = $node.parentNode;
        }
        if (isHas === true){
            while (($node !== null) && ($node !== u)){
                if (property in $node){
                    return $node;
                }
                $node = $node.parentNode;
            }
        } else{
            while (($node !== null) && ($node !== u)){
                if ($node[property] === propertyValue){
                    return $node;
                }
                $node = $node.parentNode;
            }
        }
        return null;
    };

    if ('hasAttribute' in global.document.documentElement){
        /**
         * check node has attribute
         * @param {HTMLElement} $node
         * @param {String} attributeName
         * @return {Boolean}
         */
        a9.hasAttribute = function($node, attributeName){
            return $node.hasAttribute(attributeName);
        }
    } else{
        a9.hasAttribute = function($node, attributeName){
            return $node.getAttribute(attributeName) !== null;
        };
    }

    /**
     * insert DOM node after DOM node
     * @param {HTMLElement} $nodeAfterWhich
     * @param {HTMLElement} $insertNode
     */
    a9.insertAfter = function($nodeAfterWhich, $insertNode){
        var $nextSibling = $nodeAfterWhich.nextSibling;
        if ($nextSibling === null){
            $nodeAfterWhich.parentNode.appendChild($insertNode);
        } else{
            $nodeAfterWhich.parentNode.insertBefore($insertNode, $nodeAfterWhich.nextSibling);
        }
    };

    /**
     * insert DOM node before DOM node
     * @param {HTMLElement} $nodeBeforeWhich
     * @param {HTMLElement} $insertNode
     */
    a9.insertBefore = function($nodeBeforeWhich, $insertNode){
        var $previousSibling = $nodeBeforeWhich.previousSibling,
            $parent;
        if ($previousSibling === null){
            $parent = $nodeBeforeWhich.parentNode;
            $parent.insertBefore($insertNode, $parent.childNodes[0]);
        } else{
            $nodeBeforeWhich.parentNode.insertBefore($insertNode, $previousSibling);
        }
    };

    /**
     * insert DOM node first child in parent
     * @param {HTMLElement} $parent
     * @param {HTMLElement} $insertNode
     */
    a9.insertBeforeFirst = function($parent, $insertNode){
        var $childNodes = $parent.childNodes;
        if ($childNodes.length === 0){
            $parent.appendChild($insertNode);
        } else{
            $parent.insertBefore($insertNode, $childNodes[0]);
        }
    };


}(this, A9));

(function(global, a9){
    if ('addEventListener' in global){
        /**
         * Добавить обработчик события
         * @param {HTMLElement} $DOMNode
         * @param {String} eventName Имя События
         * @param {Function} handler Обработчик
         * @param {Boolean} [isNotNeedFix] флаг который говорит, что не нужно специально обробатывать событие для ие
         */
        a9.addEvent = function($DOMNode, eventName, handler, isNotNeedFix){
            $DOMNode.addEventListener(eventName, handler);
        };
        /**
         * Удалить обработчик события
         * @param {HTMLElement} $DOMNode
         * @param {String} eventName Имя События
         * @param {Function} handler Обработчик
         * @param {Boolean} [isNotNeedFix] флаг который говорит, что не нужно специально обробатывать событие для ие
         */
        a9.removeEvent = function($DOMNode, eventName, handler, isNotNeedFix){
            $DOMNode.removeEventListener(eventName, handler);
        };

        var getEventInput = function(eventName){
            switch (eventName){
                case 'mousedown':
                case 'mouseup':
                case 'click':
                case 'mouseover':
                case 'mousemove':
                case 'dbclick':
                    return 'mouse';
                case 'keydown':
                case 'keypress':
                case 'keyup':
                    return 'keyboard';
                default:
                    return 'touch';
            }
        };

        /**
         * Сгенерировать событие
         * @param {HTMLElement} $DOMNode
         * @param {String} eventName Имя События
         * @param {Event} [e] событие
         */
        a9.generateEvent = function($DOMNode, eventName, e){
            var event,
                incomingEvent,
                outgoingEvent,
                document = global.document,
                u;
            if (e){
                incomingEvent = getEventInput(e.type);
                outgoingEvent = getEventInput(eventName);
                if (incomingEvent === outgoingEvent){
                    if (incomingEvent === 'mouse'){
                        event = document.createEvent('MouseEvent');
                        event.initMouseEvent(eventName, true, true, e.view, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
                    } else if (incomingEvent === 'keyboard'){
                        if (a9.$d.isFx){
                            event = document.createEvent('KeyEvents');
                            event.initKeyEvent(eventName, true, true, e.view, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.keyCode, e.charCode);
                        } else{
                            event = document.createEvent('Events');
                            event.initEvent(eventName, true, true);
                            event.view = e.view;
                            event.ctrlKey = e.ctrlKey;
                            event.altKey = e.altKey;
                            event.shiftKey = e.shiftKey;
                            event.metaKey = e.metaKey;
                            event.keyCode = e.keyCode;
                            event.charCode = e.charCode;
                        }
                    }
                } else if (outgoingEvent === 'mouse'){
                    event = document.createEvent('MouseEvent');
                    event.initMouseEvent(eventName, true, true, e.view, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
                } else if (outgoingEvent === 'keyboard'){
                    if (a9.$d.isFx){
                        event = document.createEvent('KeyEvents');
                        event.initKeyEvent(eventName, true, true, e.view, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.keyCode, e.charCode);
                    } else{
                        event = document.createEvent('Events');
                        event.initEvent(eventName, true, true);
                        event.view = e.view;
                        event.ctrlKey = e.ctrlKey;
                        event.altKey = e.altKey;
                        event.shiftKey = e.shiftKey;
                        event.metaKey = e.metaKey;
                        event.keyCode = e.keyCode;
                        event.charCode = e.charCode;
                    }
                }
            }
            if (event === u){
                event = document.createEvent('Events');
                event.initEvent(eventName, true, true);
            }
            $DOMNode.dispatchEvent(event);
        };


    } else{
        var ieFixEventsNameObjectsCallbacks = [],
            ieFixEventsObjectsAndCallbacksLength = 0,
            ieFixEventsHandlers = {},
            fixEvent = function(e){
                e.preventDefault = function(){
                    e.returnValue = false;
                };
                e.stopPropagation = function(){
                    e.cancelBubble = true;
                };
                e.target= e.srcElement;
                return e;
            },
            intCache,
            ieAddFixEvent = function(object, eventName, callback){
                function fix(){
                    callback.call(object, fixEvent(global.event));
                }
                intCache = ieFixEventsObjectsAndCallbacksLength;
                ieFixEventsNameObjectsCallbacks[ieFixEventsObjectsAndCallbacksLength] = eventName;
                ieFixEventsObjectsAndCallbacksLength += 1;
                intCache += ieFixEventsObjectsAndCallbacksLength;
                ieFixEventsNameObjectsCallbacks[ieFixEventsObjectsAndCallbacksLength] = callback;
                ieFixEventsObjectsAndCallbacksLength += 1;
                intCache += ieFixEventsObjectsAndCallbacksLength;
                ieFixEventsNameObjectsCallbacks[ieFixEventsObjectsAndCallbacksLength] = object;
                ieFixEventsObjectsAndCallbacksLength += 1;
                ieFixEventsHandlers[intCache] = fix;
                object.attachEvent('on' + eventName, fix);
            },
            ieRemoveFixEvent = function(object, eventName, callback){
                for (var i = ieFixEventsObjectsAndCallbacksLength; i-- ;){
                    if ((ieFixEventsNameObjectsCallbacks[i] === object)
                        && (ieFixEventsNameObjectsCallbacks[i - 1] === callback)
                        && (ieFixEventsNameObjectsCallbacks[i - 2] === eventName)){
                        ieFixEventsNameObjectsCallbacks[i]
                            = ieFixEventsNameObjectsCallbacks[i - 1]
                            = ieFixEventsNameObjectsCallbacks[i - 2] = u;
                        i = i * 3 - 3;
                        break;
                    }
                    i -= 2;
                }
                if (i !== -1){
                    object.detachEvent('on' + eventName, ieFixEventsHandlers[i]);
                    ieFixEventsHandlers[i] = u;
                }
            },
            u;
        /**
         * Добавить обработчик события
         * @param {HTMLElement} $DOMNode
         * @param {String} eventName Имя События
         * @param {Function} handler Обработчик
         * @param {Boolean} [isNotNeedFix] флаг который говорит, что не нужно специально обробатывать событие для ие
         */
        a9.addEvent = function($DOMNode, eventName, handler, isNotNeedFix){
            if (isNotNeedFix === true){
                $DOMNode.attachEvent('on' + eventName, handler);
            } else{
                ieAddFixEvent($DOMNode, eventName, handler);
            }
        };
        /**
         * Удалить обработчик события
         * @param {HTMLElement} $DOMNode
         * @param {String} eventName Имя События
         * @param {Function} handler Обработчик
         * @param {Boolean} [isNotNeedFix] флаг который говорит, что не нужно специально обробатывать событие для ие
         */
        a9.removeEvent = function($DOMNode, eventName, handler, isNotNeedFix){
            if (isNotNeedFix === true){
                $DOMNode.detachEvent('on' + eventName, handler);
            } else{
                ieRemoveFixEvent($DOMNode, eventName, handler);
            }
        };
        /**
         * Сгенерировать событие
         * @param {HTMLElement} $DOMNode
         * @param {String} eventName Имя События
         * @param {Event} [e] событие
         */
        a9.generateEvent = function($DOMNode, eventName, e){
            $DOMNode.fireEvent('on' + eventName, document.createEventObject());
        };
    }

    /**
     * Прокинуть событе другому узлу dom
     * @param {HTMLElement} $DOMNodeFrom
     * @param {String} eventName
     * @param {HTMLElement} [$DOMNodeTo]
     *
     * todo replace closure
     */
    a9.proxyEvent = function($DOMNodeFrom, eventName, $DOMNodeTo){
        var u;

        if ($DOMNodeTo === u){
            $DOMNodeTo = global.document.body;
        }

        a9.addEvent($DOMNodeFrom, eventName, function(e){
            e.stopPropagation();
            a9.generateEvent($DOMNodeTo, eventName, e);
        });

    };


}(this, A9));
(function(global, a9){
    var document = global.document;

    /**
     * Поиск HTML-элемента по ID
     * @param {String} id
     * @return {HTMLElement} найденный элемент
     */
//    (id)
    a9.$ = function(id){
        return document.getElementById(id);
    };

    /**
     * Поиск HTML-элементов по name
     * @param {String} name
     * @return {HTMLCollection} возвращает массив найденых элементов
     */
//    (name)
    a9.$n = function(name){
        return document.getElementsByName(name);
    };

    /**
     * Поиск HTML-элементов по тэгу
     * @param {String} tag
     * @param {HTMLElement} [$node] узел дерева, в котором нужно производить поиск
     * @return {HTMLCollection} возвращает массив найденых элементов
     */
//    (tag name)
    a9.$tn = function(tag, $node){
        return ($node || document).getElementsByTagName(tag);
    };


    if ('getElementsByClassName' in document){
        /**
         * Поиск HTML-элементов по классу
         * @param {String} className класс поиска
         * @param {HTMLElement} [$node] узел дерева, в котором нужно производить поиск
         * @return {HTMLCollection} возвращает массив найденых элементов
         */
//        (class name)
        a9.$c = function(className, $node){
            return ($node || document).getElementsByClassName(className);
        };

        /**
         * Поиск нескольких коллекций HTML-элементов по классам в элементе
         * @param {HTMLElement} $node элемент в детях которого производиться поиск
         * @param {String|...} className
         * Метод принимает любое количество классов, т.е. метод можно использовать
         * SWF01.$cs(document.getElementById('myElement'), 'asd', 'sdf', 'qwe', 'wer', 'zxc', 'xcv);
         * или
         * SWF01.$cs(document.getElementById('myElement'), 'asd', 'sdf');
         * @return {Object} возвращает объект свойствам которого являются классы переданные для поиска. Каждое св-во содержит
         * массив с элементами, кслассы которых соответствуют названию этого св-ва. Например:
         * {
         *     testClass: [div.testClass, a.testClass],
         *     searchingClass: [span.searchingClass, span.searchingClass, span.searchingClass],
         *     helloClass: [a.helloClass, a.helloClass]
         * }
         */
//        (classes names)
        a9.$cs = function($node, className){
            var i = arguments.length,
                $csQueryObject = {};
            $node = ($node || document);
            for (; i -= 1 ;){
                $csQueryObject[arguments[i]] = $node.getElementsByClassName(arguments[i]);
            }
            return $csQueryObject;
        }
    } else{
        /**
         * Поиск HTML-элементов по классу
         * @param {String} className класс поиска
         * @param {HTMLElement} [$node] узел дерева, в котором нужно производить поиск
         * @return {Array} возвращает массив найденых элементов
         */
//        (class name)
        a9.$c = function(className, $node){
            var cache = ($node || document).getElementsByTagName('*'),
                result = [],
                i = 0,
                iMax = cache.length;
            for (; i < iMax ; i += 1){
                if (cache[i].className.indexOf(className) !== -1){
                    result.push(cache[i]);
                }
            }
            return result;
        };

        /**
         * Поиск нескольких коллекций HTML-элементов по классам в элементе
         * @param {HTMLElement} $node элемент в детях которого производиться поиск
         * @param {String|...} [className]
         * Метод принимает любое количество классов, т.е. метод можно использовать
         * SWF01.$cs(document.getElementById('myElement'), 'asd', 'sdf', 'qwe', 'wer', 'zxc', 'xcv);
         * или
         * SWF01.$cs(document.getElementById('myElement'), 'asd', 'sdf');
         * @return {Object} возвращает объект свойствам которого являются классы переданные для поиска. Каждое св-во содержит
         * массив с элементами, кслассы которых соответствуют названию этого св-ва. Например:
         * {
         *     testClass: [div.testClass, a.testClass],
         *     searchingClass: [span.searchingClass, span.searchingClass, span.searchingClass],
         *     helloClass: [a.helloClass, a.helloClass]
         * }
         */
//        (classes names)
        a9.$cs = function($node, className){
            var DOMElements = ($node || document).getElementsByTagName('*'),
                iMax = arguments.length,
                i = iMax,
                j = 0,
                jMax = DOMElements.length,
                strCache,
                $csQueryObject = {};
            for (; i-= 1 ;){
                $csQueryObject[arguments[i]] = [];
            }
            for (; j < jMax; j += 1){
                strCache = DOMElements[j].className;
                for (i = iMax; i -= 1 ;){
                    if (strCache.indexOf(arguments[i]) !== -1){
                        $csQueryObject[arguments[i]].push(DOMElements[j]);
                    }
                }
            }
            return $csQueryObject;
        }
    }
}(this, A9));

/*
Script: JSON.js
JSON encoder / decoder:
Andrea Giammarchi, <http://www.3site.eu>
Example:
	>alert(JSON.stringify([0,1,false,true,null,[2,3],{"some":"value"}]));
	>// [0,1,false,true,null,[2,3],{"some":"value"}]
	>
	>alert(JSON.parse('[0,1,false,true,null,[2,3],{"some":"value"}]'))
	>// 0,1,false,true,,2,3,[object Object]
*/
(function(global){
    if (!('JSON' in global)){
        global.JSON = new function(){
        	this.parse = function(){
        		var	filter, result, self, tmp;
        		if ($$("toString")) {
        			switch (arguments.length){
        				case	2:
        					self = arguments[0];
        					filter = arguments[1];
        					break;
        				case	1:
        					if ($[typeof arguments[0]](arguments[0]) === Function) {
        						self = this;
        						filter = arguments[0];
        					}
        					else
        						self = arguments[0];
        					break;
        				default:
        					self = this;
        					break;
        			}
        			if (rc.test(self)){
        				try{
        					result = e("(".concat(self, ")"));
        					if (filter && result !== null && (tmp = $[typeof result](result)) && (tmp === Array || tmp === Object)){
        						for (self in result)
        							result[self] = v(self, result) ? filter(self, result[self]) : result[self];
        					}
        				}
        				catch(z){}
        			}
        			else{
        				throw new Error("bad data");
        			}
        		}
        		return result;
        	};
        	this.stringify = function(){
        		var	self = arguments.length ? arguments[0] : this,
        			result, tmp;
        		if (self === null)
        			result = "null";
        		else if (self !== undefined && (tmp = $[typeof self](self))) {
        			switch (tmp){
        				case	Array:
        					result = [];
        					for (var	i = 0, j = 0, k = self.length; j < k; j++) {
        						if (self[j] !== undefined && (tmp = JSON.encode(self[j])))
        							result[i++] = tmp;
        					}
        					result = "[".concat(result.join(","), "]");
        					break;
        				case	Boolean:
        					result = String(self);
        					break;
        				case	Date:
        					result = '"'.concat(self.getFullYear(), '-', d(self.getMonth() + 1), '-', d(self.getDate()), 'T', d(self.getHours()), ':', d(self.getMinutes()), ':', d(self.getSeconds()), '"');
        					break;
        				case	Function:
        					break;
        				case	Number:
        					result = isFinite(self) ? String(self) : "null";
        					break;
        				case	String:
        					result = '"'.concat(self.replace(rs, s).replace(ru, u), '"');
        					break;
        				default:
        					var	i = 0, key;
        					result = [];
        					for (key in self) {
        						if (self[key] !== undefined && (tmp = JSON.encode(self[key])))
        							result[i++] = '"'.concat(key.replace(rs, s).replace(ru, u), '":', tmp);
        					}
        					result = "{".concat(result.join(","), "}");
        					break;
        			}
        		}
        		return result;
        	};
        	this.toDate = function(){
        		var	self = arguments.length ? arguments[0] : this,
        			result;
        		if (rd.test(self)){
        			result = new Date;
        			result.setHours(i(self, 11, 2));
        			result.setMinutes(i(self, 14, 2));
        			result.setSeconds(i(self, 17, 2));
        			result.setMonth(i(self, 5, 2) - 1);
        			result.setDate(i(self, 8, 2));
        			result.setFullYear(i(self, 0, 4));
        		}
        		else if (rt.test(self))
        			result = new Date(self * 1000);
        		return result;
        	};
        	var	c = {"\b":"b","\t":"t","\n":"n","\f":"f","\r":"r",'"':'"',"\\":"\\","/":"/"},
        		d = function(n){return n<10?"0".concat(n):n},
        		e = function(c,f,e){e=eval;delete eval;if (typeof eval==="undefined")eval=e;f=eval(""+c);eval=e;return f},
        		i = function(e,p,l){return 1*e.substr(p,l)},
        		p = ["","000","00","0",""],
        		rc = null,
        		rd = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
        		rs = /(\x5c|\x2F|\x22|[\x0c-\x0d]|[\x08-\x0a])/g,
        		rt = /^([0-9]+|[0-9]+[,\.][0-9]{1,3})$/,
        		ru = /([\x00-\x07]|\x0b|[\x0e-\x1f])/g,
        		s = function(i,d){return "\\".concat(c[d])},
        		u = function(i,d){
        			var	n=d.charCodeAt(0).toString(16);
        			return "\\u".concat(p[n.length],n)
        		},
        		v = function(k,v){return $[typeof result](result)!==Function&&(v.hasOwnProperty?v.hasOwnProperty(k):v.constructor.prototype[k]!==v[k])},
        		$ = {
        			"boolean":function(){return Boolean},
        			"function":function(){return Function},
        			"number":function(){return Number},
        			"object":function(o){return o instanceof o.constructor?o.constructor:null},
        			"string":function(){return String},
        			"undefined":function(){return null}
        		},
        		$$ = function(m){
        			function $(c,t){t=c[m];delete c[m];try{e(c)}catch(z){c[m]=t;return 1}}
        			return $(Array)&&$(Object)
        		};
        	try{rc=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}
        	catch(z){rc=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}
        };

    }
}(this));

(function(global, a9){
    var pagesManagerPrototype,
        pagePrototype,
        u,
        nonePageName = u,
        pagesBuildersNamespace;

    a9.setPagesNamespace = function(namespace){
        pagesBuildersNamespace = namespace;
    };

    a9.Page = function(pageSystemName, pageNameInApp, pageParent){
        var page = this,
            cnCt = global.cnCt,
            build = cnCt.tp(pageNameInApp || 'page_' + pageSystemName);
        page.isShowed = false;
        page.beforeShow = null;
        page.afterShow = null;
        page.beforeUpdate = null;
        page.afterUpdate = null;
        page.beforeHide = null;
        page.afterHide = null;
        page.systemName = pageSystemName;
        page.$page = build.page;
        page.$content = build.content;
        page.ofPM = null;
        page.pm = null;
        page.parentPage = null;
        page.isHasChild = false;
        if (pageParent instanceof a9.PagesManager){
            pageParent.addPage(page);
        } else if (pageParent instanceof a9.Page){
            if (pageParent.pm === null){
                pageParent.pm = new a9.PagesManager(pageParent.$content);
                pageParent.isHasChild = true;
            }
            page.parentPage = pageParent;
            pageParent.pm.addPage(page);
        }
        page.appModule = pagesBuildersNamespace[pageNameInApp || 'page_' + pageSystemName](build, page);
    };
    pagePrototype = a9.Page.prototype;

    pagePrototype.show = function(childPageName){
        var page = this;
        page.isShowed = true;
        if (page.beforeShow !== null){
            page.beforeShow.apply(page, arguments);
        }
        page.ofPM.$content.appendChild(page.$page);
        if (page.afterShow !== null){
            page.afterShow.apply(page, arguments);
        }
        if (page.isHasChild){
            page.pm.switchPage.apply(page.pm, arguments);
        }
        return page;
    };
    pagePrototype.update = function(childPageName){
        var page = this;
        if (page.beforeUpdate !== null){
            page.beforeUpdate.apply(page, arguments);
        }
        if (page.isHasChild){
            page.pm.switchPage.apply(page.pm, arguments);
        }
        if (page.afterUpdate !== null){
            page.afterUpdate.apply(page, arguments);
        }
        return page;
    };
    pagePrototype.hide = function(){
        var page = this;
        if (page.isHasChild){
            page.pm.hide(arguments);
        }
        if (page.beforeHide !== null){
            page.beforeHide(arguments);
        }
        page.ofPM.$content.removeChild(page.$page);
        if (page.afterHide !== null){
            page.afterHide(arguments);
        }
        page.isShowed = false;
        return page;
    };
    pagePrototype.destructor = function(){
        var page = this;
        if (page.isHasChild){
            page.pm.destruct();
            page.pm = null;
        }
        page.ofPM.removePage(page);
        page.ofPM = null;
        if ((page.appModule !== u) && ('destructor' in page.appModule)){
            page.appModule.destructor();
            page.appModule = null;
        }
        page.parentPage = null;
        page.$page = null;
        page.$content = null;
        page.systemName = null;
        //methods
        page.show = null;
        page.beforeShow = null;
        page.afterShow = null;
        page.hide = null;
        page.beforeHide = null;
        page.afterHide = null;
        page.destructor = null;
    };

    a9.PagesManager = function($content){
        var pagesManager = this;
        pagesManager.pages = {};
        pagesManager.$content = $content;
        pagesManager.currentPageName = nonePageName;
    };
    pagesManagerPrototype = a9.PagesManager.prototype;

    pagesManagerPrototype.addPage = function(page){
        var pagesManager = this;
        pagesManager.pages[page.systemName] = page;
        page.ofPM = pagesManager;
        return pagesManager;
    };
    pagesManagerPrototype.createPage = function(pageSystemName, pageNameInApp, pageParent){
        var pagesManager = this,
            page = new a9.Page(pageSystemName, pageNameInApp, pageParent);
        pagesManager.addPage(page);
        return page;
    };
    pagesManagerPrototype.removePage = function(page){
        var pagesManager = this;
        delete pagesManager.pages[page.systemName];
        return pagesManager;
    };
    pagesManagerPrototype.switchPage = function(){
        var pagesManager = this;
        return pagesManager.show.apply(pagesManager, arguments);
    };
    pagesManagerPrototype.show = function(pageSystemName){
        var pagesManager = this,
            pages = pagesManager.pages,
            currentPageName = pagesManager.currentPageName,
            page;
        if (pageSystemName in pages){
            if (currentPageName === pageSystemName){
                page = pagesManager.pages[currentPageName];
                page.update.apply(page, a9.copyArray(arguments, u, 1));
                return null;
            } else if (currentPageName !== nonePageName){
                page = pages[currentPageName];
                page.hide(arguments);
            }
            pagesManager.currentPageName = pageSystemName;
            page = pages[pageSystemName];
            page.show.apply(page, a9.copyArray(arguments, u, 1));
            return true;
        } else if (currentPageName !== nonePageName){
            page = pages[currentPageName];
            page.hide(arguments);
            pagesManager.currentPageName = nonePageName;
        }
        return false;
    };
    pagesManagerPrototype.hide = function(){
        var pagesManager = this,
            page = pagesManager.pages[pagesManager.currentPageName];
        if (page !== u){
            page.hide(arguments);
            pagesManager.currentPageName = nonePageName;
        }
        return pagesManager;
    };
    pagesManagerPrototype.clearPages = function(list){
        var pagesManager = this,
            pages = pagesManager.pages,
            p,
            i,
            pageName;
        if (list === u){
            for (p in pages){
                pages[p].destructor();
            }
        } else{
            for (i = list.length; i-- ;){
                if (typeof list[i] === 'string'){
                    pageName = list[i];
                } else{
                    pageName = list[i].n;
                }
                if (pagesManager.currentPageName === pageName){
                    pages[pageName].hide();
                    pagesManager.currentPageName = nonePageName;
                }
                pages[pageName].destructor();
            }
        }
        return pagesManager;
    };
    pagesManagerPrototype.destructor = function(){
        var pagesManager = this;
        pagesManager.clearPages();
        pagesManager.pages = null;
        pagesManager.$content = null;
        pagesManager.currentPageName = null;
//        methods
        pagesManager.addPage = null;
        pagesManager.createPage = null;
        pagesManager.removePage = null;
        pagesManager.switchPage = null;
        pagesManager.show = null;
        pagesManager.hide = null;
        pagesManager.clearPages = null;
        pagesManager.destructor = null;
    };

    a9.initPages = function(pages, parent){
        var i,
            iMax,
            u,
            page;
        for (i = 0, iMax = pages.length; i < iMax; i += 1){
            if (typeof pages[i] === 'string'){
                new a9.Page(pages[i], u, parent);
            } else{
                if ('N' in pages[i]){
                    page = new a9.Page(pages[i].n, pages[i].N, parent);
                } else{
                    page = new a9.Page(pages[i].n, u, parent);
                }
                if ('C' in pages[i]){
                    a9.initPages(pages[i].C, page);
                }
            }
        }
    };

    a9.clearPages = function(pages, parent){
        //todo
        parent.clearPages(pages);
    }
}(this, A9));
//animations functions
(function(a9){
    var AF,
        PI = Math.PI,
        halfPI = PI / 2;
    a9.animationFunctions = {
        linear: function(value){
            return value;
        },
        quadratic: function(value){
            return Math.pow(value, 2);
        },
        circ: function(value){
            return 1 - Math.sin(Math.acos(value));
        },
        sine: function(value){
            return 1 - Math.sin((1 - value) * PI / 2);
        },
        black: function(value, back){
            return Math.pow(value, 2) * ((back + 1) * value - back);
        },
        bounce: function(value){
            var a = 0,
                b = 1;
            for (a = 0, b = 1; 1; a += b, b /= 2){
                if (value >= (7 - 4 * a) / 11){
                    return -Math.pow((11 - 6 * a - 11 * value) / 4, 2) + Math.pow(b, 2);
                }
            }
        },
        elastic: function(value, powerFluctuations){
            return Math.pow(2, 10 * (value - 1)) * Math.cos(20 * value * PI * powerFluctuations / 3);
        },
        easeOut: function(value){
            function ease(value){
                var a = 0,
                    b = 1;
                for (a = 0, b = 1; 1; a += b, b /= 2){
                    if (value >= (7 - 4 * a) / 11)
                        return -Math.pow((11 - 6 * a - 11 * value) / 4, 2) + Math.pow(b, 2);
                }
            }
            return 1 - ease(1 - value);
        },
        easeInOut: function(value, powerFluctuations){
            function ease(value, powerFluctuations){
                return Math.pow(2, 10 * (value - 1)) * Math.cos(20 * value * PI * powerFluctuations / 3);
            }
            if (value < .5){
                return ease(2 * value, powerFluctuations) / 2;
            } else{
                return (2 - ease(2 * (1 - powerFluctuations) , powerFluctuations)) / 2;
            }
        },
        re: function(value, anyType, u){
            return 1 - (AF[anyType] !== u ? AF[anyType](1 - value) : AF.circ(1 - value));
        },
        //http://gizma.com/easing/ !!recommended
        //вызывать параметром , а параметром  передавать true
        linearTween: function(t, b, c, d){
            return c * t / d + b;
        },
        easeInQuad: function(t, b, c, d){
            t /= d;
            return c * t * t + b;
        },
        easeOutQuad: function(t, b, c, d){
            t /= d;
            return -c * t * (t - 2) + b;
        },
        easeInOutQuad: function(t, b, c, d){
            t /= d / 2;
            if (t < 1){
                return c / 2 * t * t + b;
            }
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        easeInCubic: function(t, b, c, d){
            t /= d;
            return c * t * t * t + b;
        },
        easeOutCubic: function(t, b, c, d){
            t /= d;
            t--;
            return c * (t * t * t + 1) + b;
        },
        easeInOutCubic: function(t, b, c, d){
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        },
        easeInQuart: function(t, b, c, d){
            t /= d;
            return c * t * t * t * t + b;
        },
        easeOutQuart: function(t, b, c, d){
            t /= d;
            t--;
            return -c * (t * t * t * t - 1) + b;
        },
        easeInOutQuart: function(t, b, c, d){
            t /= d / 2;
            if (t < 1){
                return c / 2 * t * t * t * t + b;
            }
            t -= 2;
            return -c / 2 * (t * t * t * t - 2) + b;
        },
        easeInQuint: function(t, b, c, d){
            t /= d;
            return c * t * t * t * t * t + b;
        },
        easeOutQuint: function(t, b, c, d){
            t /= d;
            t--;
            return c * (t * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function(t, b, c, d){
            t /= d/2;
            if (t < 1){
                return c / 2 * t * t * t * t * t + b;
            }
            t -= 2;
            return c / 2 * (t * t * t * t * t + 2) + b;
        },
        easeInSine: function(t, b, c, d){
            return -c * Math.cos(t / d * halfPI) + c + b;
        },
        easeOutSine: function(t, b, c, d){
            return c * Math.sin(t / d * halfPI) + b;
        },
        easeInOutSine: function(t, b, c, d){
            return -c / 2 * (Math.cos(PI * t / d) - 1) + b;
        },
        easeInExpo: function(t, b, c, d){
            return c * Math.pow( 2, 10 * (t / d - 1) ) + b;
        },
        easeOutExpo: function(t, b, c, d){
            return c * ( -Math.pow( 2, -10 * t / d ) + 1 ) + b;
        },
        easeInOutExpo: function(t, b, c, d){
            t /= d / 2;
            if (t < 1){
                return c / 2 * Math.pow( 2, 10 * (t - 1) ) + b;
            }
            t--;
            return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
        },
        easeInCirc: function(t, b, c, d){
            t /= d;
            return -c * (Math.sqrt(1 - t * t) - 1) + b;
        },
        easeOutCirc: function(t, b, c, d){
            t /= d;
            t--;
            return c * Math.sqrt(1 - t * t) + b;
        },
        easeInOutCirc: function(t, b, c, d){
            t /= d / 2;
            if (t < 1){
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            t -= 2;
            return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
        }
    };
    AF = a9.animationFunctions;
}(A9));

/**
 * Animate понимает значения передаваемые в 'px' '%' 'em'. работает с помощью requestAnimationFrame
 * @param {HTMLElement} object анимируемый объект
 * @param {Array} properties анимируемые CSS свойства. пример ['left', 1, 'em', 'width', 50, '%', 'marginTop', 20, '%', 'height', 300, 'px']
 * @param {Number} [time] время анимации
 * @param {Function} [callback] функция вызываемая после окончания анимации. В качестве this получает object, первым параметром получает параметр [data]
 * @param {String||Boolean} [animationFunctionName] имя функции расчитывающей анимацию (хранятся в SLEDGE.animationFunctions)
 * или ture, в случае передачи ture параметром [animationFunctionOptions] нужно передать имя одного и методов
 * SLEDGE.animationFunctions идущих после комметария //http://gizma.com/easing/ в описании объекта SLEDGE.animationFunctions (это Tween'сы)
 * @param {Mixed} [animationFunctionOptions] дополнительные параметры для некоторых функций расчёта анимации (см. в SLEDGE.animationFunctions)
 * @param {Function} [frameCallback] функция вызываемая на каждый шаг анимации.
 * В качестве this получает object, первым параметром получает progress от 0 до 1, вторым параметром получает параметр [data]
 * @param {Mixed} [data] данные которые нужно прокинуть в колбеки
 * @return {Function} [stop] функция которая останавливает анимацию в момент вызова.
 * в неё можно передать функцию, которая будет вызвана после остановки.
 * Функция, вызванная после остановки, в качестве this получает object, первым параметром получает параметр [data]
 */
A9.animate = function(object, properties, time, callback, animationFunctionName, animationFunctionOptions, frameCallback, data){
    var a9 = this,
        requestAF = a9.deviceInfo.requestAF,
        animationStateFunction,
        style = object.style,
        iMax = properties.length,
        i = iMax,
        animationArray = [], // int/float array !please save it!
        animationArrayLength = -1,
        start,
        progress,
        animationFrame,
        result,
        property,
        getStyleResult,
        parent,
        parentWidth,
        parentHeight,
        from,
        to,
        u;
    if (time === u){
        time = 500;
    }
    time = 1 / time;
    if (animationFunctionName === u){
        animationStateFunction = a9.animationFunctions.linear;
    } else if (animationFunctionName === true){
        animationStateFunction = a9.animationFunctions[animationFunctionOptions];
    } else{
        animationStateFunction = a9.animationFunctions[animationFunctionName];
    }
    // animationArray[index] — property
    // animationArray[index + 1] — from
    // animationArray[index + 2] — direction
    // animationArray[index + 3] — cache if (animationType === true) way : to - from;
    for (; i-- ;){
        animationArray[animationArrayLength += 1] = property = properties[i - 2];
        if (property === 'width'){
            from = object.offsetWidth;
        } else if (property === 'height'){
            from = object.offsetHeight;
        } else{
            getStyleResult = a9.getStyle(object, property);
            if (getStyleResult.indexOf('%') !== -1){
                from = ((property === 'top') || (property === 'bottom') ? (parentHeight = parentHeight || (parent = parent || object.parentNode).offsetHeight) : (parentWidth = parentWidth || (parent = parent || object.parentNode).offsetWidth)) * .01 * parseFloat(getStyleResult);
            } else if (getStyleResult === 'auto'){
                if ((property === 'marginLeft') || (property === 'marginLeft')){
                    from = ((parentWidth = parentWidth || (parent = parent || object.parentNode).offsetWidth) - object.offsetWidth) * .5;
                } else{
                    from = 0;
                }
            } else{
                from = parseInt(getStyleResult, 10);
            }
        }
        animationArray[animationArrayLength += 1] = from;
        to = properties[i - 1];
        if (properties[i] === '%'){
            to = ((property === 'height') || (property === 'top') || (property === 'bottom') ? (parentHeight = parentHeight || (parent = parent || object.parentNode).offsetHeight) : (parentWidth = parentWidth || (parent = parent || object.parentNode).offsetWidth)) * .01 * to;
        } else if (properties[i] === 'em'){
            to = to * parseFloat(a9.getStyle(object, 'fontSize'));
        }
        animationArray[animationArrayLength += 1] = from > to ? -1 : 1;
        animationArray[animationArrayLength += 1] = animationFunctionName === true ? Math.abs(to - from) : to - from;
        i -= 2;
    }
    animationArrayLength += 1;
    function animation(){
        progress = (new Date().getTime() - start) * time;
        if (progress < 1){
            for (i = animationArrayLength; i-- ;){
                if (animationFunctionName === true){
                    result = Math.floor(animationArray[i - 2] + (animationArray[i - 1] * animationStateFunction(progress, 0, animationArray[i], 1)));
                } else{
                    result = Math.floor(animationArray[i] * animationStateFunction(progress, animationFunctionOptions) + animationArray[i - 2]);
                }
                style[animationArray[i - 3]] = result + 'px';
                i -= 3;
            }
            if (frameCallback !== u){
                frameCallback.call(object, progress, data);
            }
            animationFrame = requestAF(animation);
        } else{
            for (i = iMax; i-- ;){
                style[properties[i - 2]] = properties[i - 1] + properties[i];
                i -= 2;
            }
            if (callback !== u){
                callback.call(object, data);
            }
            animation = object = properties = time = callback = animationFunctionName = animationFunctionOptions = frameCallback = data = a9 = requestAF = animationStateFunction = style = iMax = i = iMax = animationArray = animationArrayLength = start = progress = animationFrame = result = property = getStyleResult = parent = parentWidth = parentHeight = from = to = u = null;
        }
    }
    start = new Date().getTime();
    animationFrame = requestAF(animation);
    return function stop(stopCallback){
        a9.deviceInfo.cancelAF(animationFrame);
        if (stopCallback !== u){
            stopCallback.call(object, progress, data);
        }
        stop = stopCallback = animation = object = properties = time = callback = animationFunctionName = animationFunctionOptions = frameCallback = data = a9 = requestAF = animationStateFunction = style = iMax = i = iMax = animationArray = animationArrayLength = start = progress = animationFrame = result = property = getStyleResult = parent = parentWidth = parentHeight = from = to = u = null;
    };
};

(function (global, a9) {
    var _array = global.Array,
        u;

    if (_array.filter === u) {
        /**
         * arrayFilter
         * @param {Array} array — array for arrayFilter
         * @param {Function} rule — arrayFilter rule
         * @param {*} [ruleCTX] — rule function ctx
         * @returns {Array} new array
         */
        a9.arrayFilter = function (array, rule, ruleCTX) {
            return array.filter(rule, ruleCTX);
        };
    } else {
        /**
         * arrayFilter
         * @param {Array} array — array for arrayFilter
         * @param {Function} rule — arrayFilter rule
         * @param {*} [ruleCTX] — rule function ctx
         * @returns {Array} new array
         */
        a9.arrayFilter = function (array, rule, ruleCTX) {
            var i = array.length,
                newArray = [],
                u;
            if (ruleCTX !== u) {
                for (; i--;) {
                    if (rule.call(ruleCTX, array[i])) {
                        newArray.unshift(array[i]);
                    }
                }
            } else {
                for (; i--;) {
                    if (rule(array[i])) {
                        newArray.unshift(array[i]);
                    }
                }
            }

            return newArray;
        };
    }

    /**
     * Складывает массивы по сдедующему правилу
     * если переданны 2 массива
     * lib.arraysMerge([0, 1], [2, 3]);
     * arraysMerge вернёт второй массив в виде [0, 1, 2, 3]
     *
     * lib.arraysMerge([0, 1], [2, 3], undefined, 1);
     * arraysMerge вернёт второй массив в виде  [2, 0, 1, 3]
     *
     * var a = [любое зло];
     * lib.arraysMerge([0, 1], [2, 3], a);
     * вернёт a равный [0, 1, 2, 3] не изменив значения складываемых массивов
     *
     * var a = [любое зло];
     * lib.arraysMerge([0, 1], [2, 3], a, 1);
     * вернёт a равный [2, 0, 1, 3] не изменив значения складываемых массивов
     *
     * @param {Array} firstArray массив который нужно складывать
     * @param {Array} secondArray массив c которым нужно складывать
     * @param {Array|undefined} [inArray] [опциональный по умолчанию равен undefined] массив в который записывается результат
     * @param {Number|undefined} [from] [опциональный по умолчанию равен 0] элемент массива secondArray с которого нужно вставлять массив firstArray
     * @return {Array} secondArray или inArray
     */
    a9.arraysMerge = function (firstArray, secondArray, inArray, from) {
        var firstLength = firstArray.length,
            secondLength = secondArray.length,
            resultLength = firstLength + secondLength,
            end,
            i,
            j,
            z,
            u;
        if (from === u) {
            from = 0;
        }
        if (inArray === u) {
            for (i = resultLength - 1, j = secondLength - 1; j >= from; i -= 1, j -= 1) {
                secondArray[i] = secondArray[j];
            }
            for (i = 0, j = from; i < firstLength; i += 1, j += 1) {
                secondArray[j] = firstArray[i];
            }
            return secondArray;
        } else {
            end = from + firstLength;
            inArray.length = resultLength;
            for (i = 0, j = 0, z = 0; i < resultLength; i += 1) {
                if ((i >= from) && (i < end)) {
                    inArray[i] = firstArray[j];
                    j += 1;
                } else {
                    inArray[i] = secondArray[z];
                    z += 1;
                }
            }
            return inArray;
        }
    };


    /**
     *
     * @param {Array} array
     * @param {Number|String} [sumTo]
     * @returns {Number|String}
     */
    a9.arraySum = function (array, sumTo) {
        var result;

        if (arguments.length === 2) {
            result = sumTo;
        } else {
            result = 0;
        }

        a9.each(array, function (item) {
            result += item;
        });

        return result;
    };

    /**
     *
     * @param {String} str
     * @returns {Array}
     */
    a9.strToNumbersArray = function (str) {
        var splitStr = [];
        a9.each(str, function (codeChar) {
            splitStr.push(+codeChar);
        });
        return splitStr;
    };


    a9.contains = function (arr, obj) {
        for(var i= 0; i<arr.length; i++){
            if(arr[i]===obj){
                return true;
            }
        }
        return false;
    }

}(this, A9));

A9.arrayMap = function(array, callback, ctx){
    var i = 0,
        iMax = array.length;
    ctx = ctx || A9;

    for (; i < iMax; i += 1){
        array[i] = callback.call(ctx, array[i], i, array);
    }

    return array;

};
(function (a9) {

    function checkLength(value) {
        var valueLength = value.length,
            result = 0;


        if (valueLength < 8) {
            result = 0;
        } else {
            result = 20 + ((valueLength - 8) * 5);
        }
        return result;
    }

    function checkLetters(value) {
        if ((/[a-z]/i).test(value)) {
            return 5;
        }
        return -100;
    }

    function checkLowercase(value) {
        if ((/[a-z]/).test(value)) {
            return 5;
        }
        return -100;
    }

    function checkUppercase(value) {
        if ((/[A-Z]/).test(value)) {
            return 5;
        }
        return -100;
    }

    function checkDigits(value) {
        if ((/[0-9]/).test(value)) {
            return 5;
        }
        return -100;
    }

    function checkSpecialSymbols(value) {
        if ((/[\-=~!@#$%^&*()_+{}[\]:;.,<>?]/).test(value)) {
            return 5;
        }
        return 0;
    }

    function checkLettersPercent(value) {
        var lettersPercent = value.replace(/[^a-z]/gi, '').length / (value.length * .01);
        //console.log(lettersPercent);
        if ((lettersPercent >= 60) && (lettersPercent <= 80)) {
            return 5;
        }
        return 0;
    }

    function checkDigitPercent(value) {
        var digitsPercent = value.replace(/[^0-9]/g, '').length / (value.length * .01);
        if ((digitsPercent >= 20) && (digitsPercent >= 30)) {
            return 5;
        }
        return 0;
    }

    function checkSpecialSymbolsPercent(value) {
        var specialSymbolsPercent = value.replace(/[^\-=~!@#$%^&*()_+{}[\]:;.,<>?]/g, '').length / (value.length * .01);
        if ((specialSymbolsPercent >= 20) && (specialSymbolsPercent <= 30)) {
            return 5;
        }
        return 0;
    }

    function checkDiversity(value) {
        var diversityArray = [],
            i,
            symbol,
            valueLength = value.length;

        for (i = valueLength; i--;) {
            symbol = value.charAt(i);
            if (a9.arrayIndexOf(diversityArray, symbol) === -1) {
                diversityArray.push(symbol);
            }
        }

        if ((diversityArray.length / valueLength) >= 0.7) {
            return 5;
        }
        return 0;
    }


    function checkRepetition(value) {
        var valueLength = value.length,
            isHasRepetition = false;

        value.replace(/[^0-9a-zA-Z\-=~!@#$%^&*()_+{}[\]:;.,<>?]/g, function (char, position, value) {
            if ((position < (valueLength - 2))
                && ((char === value.charAt(position + 1))
                && (char === value.charAt(position + 2)))) {
                isHasRepetition = true;
            }
        });

        if (isHasRepetition) {
            return 0;
        }
        return 5;

    }

    a9.checkPasswordSecurity = function (password) {
        var result = 0,
            valueLength = password.length;
        if (valueLength === 0) {
            result -= 100;
        } else {
            result += checkLength(password);
            //console.log('checkLength: '+checkLength(password));
            result += checkLetters(password);
            //console.log('checkLetters: '+checkLetters(password));
            result += checkLowercase(password);
            //console.log('checkLowercase: '+checkLowercase(password));
            result += checkUppercase(password);
            //console.log('checkUppercase: '+checkUppercase(password));
            result += checkDigits(password);
            //console.log('checkDigits: '+checkDigits(password));
            result += checkSpecialSymbols(password);
            //console.log('checkSpecialSymbols: '+checkSpecialSymbols(password));
            result += checkLettersPercent(password);
            //console.log('checkLettersPercent: '+checkLettersPercent(password));
            result += checkDigitPercent(password);
            //console.log('checkDigitPercent: '+checkDigitPercent(password));
            result += checkSpecialSymbolsPercent(password);
            //console.log('checkSpecialSymbolsPercent: '+checkSpecialSymbolsPercent(password));
            result += checkDiversity(password);
            //console.log('checkDiversity: '+checkDiversity(password));

            //result += checkRepetition(password);

            //console.log(result);
        }

        if (result < 0) {
            result = 0;
        } else if (result > 100) {
            result = 100;
        }
        return result;
    };
}(A9));

/**
 * Объект для работы с cookie
 * @type {A9.cookie}
 * A9.cookie = {
 *     /**
 *      * Задать значение cookie
 *      * @param {String} name имя
 *      * @param {String} value значение
 *     set: function(object, position){}
 *     /**
 *      * Получить значение cookie
 *      * @param {String} name имя свойства
 *      * @return {String|null}
 *     get: function(name){}
 *     /**
 *      * Удалить значение cookie
 *      * @param {String} name имя свойства
 *     remove: function(name){}
 * }
 */
(function(global, a9){
    var document = global.document,
        cookie = document.cookie;
    a9.cookie = {
        get : function(name){
            var cookieArray = cookie.split('; '),
                i = cookieArray.length;
            for (; i-- ;){
                if (cookieArray[i].indexOf(name) !== -1){
                    return unescape(cookieArray[i].substring(cookieArray[i].indexOf('=') + 1, cookieArray[i].length));
                }
            }
            return null;
        },
        set: function(name, value){
            document.cookie = name + "=" + value + ";";
        },
        remove: function(name){
            document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        }
    };
}(this, A9));

(function(a9){
    /**
     * get node style property value
     * @param {HTMLElement} $node
     * @param {String} cssProperty
     * @returns {String} string css property value
     */
    a9.getStyle = function($node, cssProperty){
        if ('currentStyle' in $node){
            return $node.currentStyle[cssProperty];
        } else if (('defaultView' in document) && ('getComputedStyle' in document.defaultView)){
            return document.defaultView.getComputedStyle($node, '')[cssProperty];
        } else{
            return $node.style[cssProperty];
        }
    }
}(A9));
(function(a9){
    var objects = [],
        objectsInGenerationEvent = [],
        objectsOfEvents = [],
        arrayIndexOf = a9.arrayIndexOf,
        arraySlice = a9.arraySlice,
        objectLength = a9.objectLength,
        generateEventNameStatePrefix = '__isGenerate__',
        generateEventNameTasksStackPrefix = '__tasksStack__';

    function indexHandlerOfObjectEventData(objectEventData, handler, ctx){
        var i = 0,
            iMax = objectEventData.length;
        for (; i < iMax; i += 3){
            if ((objectEventData[i] === handler) && (objectEventData[i + 1] === ctx)){
                return i;
            }
        }
        return -1;
    }

    /**
     * Добавить обработчик кастомного события
     * @param {*} object объект, на котором слушается кастомное событие
     * @param {String} eventName имя события
     * @param {Function} handler обработчик
     * @param {*} [ctx] контекст handler
     * @param {*} [data] первый параметр handler
     */
    a9.addCustomEvent = function(object, eventName, handler, ctx, data){
        var index = arrayIndexOf(objects, object),
            objectEvents;

        if (index === -1){
            index = objects.push(object);
            index -= 1;
            objectsOfEvents[index] = objectEvents = {};
        } else{
            objectEvents = objectsOfEvents[index];
        }

        if (eventName in objectEvents){
            if (objectEvents[generateEventNameStatePrefix + eventName]){
                objectEvents[generateEventNameTasksStackPrefix + eventName].push(true, handler, ctx, data);
            } else{
                objectEvents[eventName].push(handler, ctx || null, data || null);
            }
        } else{
            objectEvents[generateEventNameStatePrefix + eventName] = false;
            objectEvents[generateEventNameTasksStackPrefix + eventName] = [];
            objectEvents[eventName] = [handler, ctx || null, data || null];
        }

    };


    /**
     * удалить обработчик кастомного события
     * @param {*} object объект, обработчик кастомного события которого нужно удалить
     * @param {String} eventName имя события
     * @param {Function} handler обработчик
     * @param {*} [ctx] контекст handler
     */
    a9.removeCustomEvent = function(object, eventName, handler, ctx){
        var index = arrayIndexOf(objects, object),
            handlerIndex,
            objectOfEvents,
            objectEventData;

        if (index !== -1){
            objectOfEvents = objectsOfEvents[index];
            if (eventName in objectOfEvents){
                if (objectOfEvents[generateEventNameStatePrefix + eventName]){
                    objectOfEvents[generateEventNameTasksStackPrefix + eventName].push(false, handler, ctx);
                } else{
                    objectEventData = objectOfEvents[eventName];
                    handlerIndex = indexHandlerOfObjectEventData(objectEventData, handler, ctx || null);
                    if (handlerIndex !== -1){
                        if (objectEventData.length === 3){
                            if (objectLength(objectOfEvents) === 1){
                                arraySlice(objects, index, 1);
                                arraySlice(objectsOfEvents, index, 1);
                            } else{
                                delete objectOfEvents[eventName];
                                delete objectOfEvents[eventName];
                            }
                        } else{
                            arraySlice(objectEventData, handlerIndex, 3);
                        }
                    }
                }

            }

        }
    };

    /**
     * генерировать кастомное событие
     * @param {*} object объект, на котором нужно сгенерировать кастомное событие
     * @param {String} eventName имя события
     * @param {*|...} [parameter] первый параметр обработчика
     */
    a9.generateCustomEvent = function(object, eventName, parameter){
        var index = arrayIndexOf(objects, object),
            objectOfEvents,
            objectEventData,
            tasksStack,
            i,
            iMax,
            args,
            eventData;

        if (index !== -1){
            objectOfEvents = objectsOfEvents[index];
            if (eventName in objectOfEvents){
                //set generate flag
                objectOfEvents[generateEventNameStatePrefix + eventName] = true;
                objectEventData = objectOfEvents[eventName];
                //check parameters count
                iMax = arguments.length;
                if (iMax > 3){
                    args = [];
                    for (i = 2; i < iMax; i += 1){
                        args.push(arguments[i]);
                    }
                    for (i = 0, iMax = objectEventData.length; i <  iMax; i += 3){
                        eventData = objectEventData[i + 2];
                        if (eventData === null){
                            objectEventData[i].apply(objectEventData[i + 1] || object, args);
                        } else{
                            args.unshift(eventData);
                            objectEventData[i].apply(objectEventData[i + 1] || object, args);
                            args.shift();
                        }
                    }
                } else{
                    for (i = 0, iMax = objectEventData.length; i <  iMax; i += 3){
                        eventData = objectEventData[i + 2];
                        if (eventData === null){
                            objectEventData[i].call(objectEventData[i + 1] || object, parameter);
                        } else{
                            objectEventData[i].call(objectEventData[i + 1] || object, eventData, parameter);
                        }
                    }
                }
                //unset generate flag
                objectOfEvents[generateEventNameStatePrefix + eventName] = false;
                //check tasks
                tasksStack = objectOfEvents[generateEventNameTasksStackPrefix + eventName];
                iMax = tasksStack.length;
                if (iMax !== 0){
                    i = 0;
                    while (i < iMax){
                        if (tasksStack[i]){
                            a9.addCustomEvent(object, eventName, tasksStack[i + 1], tasksStack[i + 2], tasksStack[i + 3]);
                            i += 4;
                        } else{
                            a9.removeCustomEvent(object, eventName, tasksStack[i + 1], tasksStack[i + 2]);
                            i += 3;
                        }
                    }
                    //clear tasks
                    tasksStack.length = 0;
                }
            }
        }
    };

    /**
     * удалить всех слушателей всех событий объекта
     * @param {*} object
     */
    a9.removeAllCEListeners = function(object){
        var index = arrayIndexOf(objects, object),
            objectOfEvents,
            p;

        if (index !== -1){
            objectOfEvents = objectsOfEvents[index];
            for (p in objectOfEvents){
                objectOfEvents[p].length = 0;
                delete objectOfEvents[p];
            }
            arraySlice(objects, index, 1);
            arraySlice(objectsOfEvents, index, 1);
        }
    };
}(A9));
(function(a9){
    var date = new Date(),
        getDate,
        getDateLocal,
        getDaysSizeOfMonth,
        u;
        a9.dayTimeSize =
            new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
            - new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).getTime();

    a9.getDate = getDate = function(date){
        return date instanceof Date ? date : new Date(date);
    };

    a9.getDateLocal = getDateLocal = function(date){
        if(date instanceof Date)
        {
            return date;
        }
        var d = new Date(date);
        return new Date(d.valueOf() + d.getTimezoneOffset() * 60000);
    };


    a9.getDayStartMS = function(date, dateOffset){
        return a9.getDayFromMS(date, dateOffset).getTime();
    };

    a9.getYearStart = function(date){
        var _date = getDate(date);
        return new Date(_date.getFullYear(), 0, 1);
    };

    a9.getDayFromMS = function(date, dateOffset){
        var _date = getDate(date);
        return new Date(_date.getFullYear(),
            _date.getMonth(),
            typeof dateOffset === 'number' ?
                _date.getDate() + dateOffset :
                _date.getDate()
        );
    };

    //a9.dateMSToHM = function(date){
    //    var _date = getDate(date),
    //        str = _date.getMinutes().toString();
    //    if (str.length === 1){
    //        str = '0' + str;
    //    }
    //    return _date.getHours() + ':' + str;
    //};

    a9.dateMSToHM = function(date){
        //console.log(date);
        var _tmpDate = getDate(date);
        var _date = getDateLocal(date),
            str = _date.getMinutes().toString();
        if (str.length === 1){
            str = '0' + str;
        }

        //console.log(_tmpDate);
        //console.log(_date);


        return _date.getHours() + ':' + str;
    };


    a9.dateMSToLocalHM = function(date){

        new Date(date.valueOf() + date.getTimezoneOffset() * 60000)

        var _date = getDate(date),
            str = _date.getMinutes().toString();
        if (str.length === 1){
            str = '0' + str;
        }
        return _date.getHours() + ':' + str;
    };

    a9.getMonthsGap = function(startMonthDate, endMonthDate){
        var date = getDate(startMonthDate),
            year = date.getFullYear(),
            month = date.getMonth(),
            year2,
            month2;
        date = getDate(endMonthDate);
        year2 = date.getFullYear();
        month2 = date.getMonth();
        if (year !== year2){
            return Math.abs(Math.abs(month - month2) - Math.abs(year - year2) * 12);
        }
        return Math.abs(month - month2);
    };

    a9.dateToString = function(date){
        var _date = getDate(date);
        return _date.getDate() + ' ' + a9.l10n('month_with_day_' + _date.getMonth());
    };

    a9.getMonthStartMS = function(date, dateOffset){
        return a9.getMonthFromMS(date, dateOffset).getTime();
    };

    a9.getMonthFromMS = function(date, dateOffset){
        var _date = getDate(date);
        return new Date(_date.getFullYear(),
            typeof dateOffset === 'number' ?
                _date.getMonth() + dateOffset :
                _date.getMonth()
        );
    };

    a9.getDaysSizeOfMonth = getDaysSizeOfMonth = function(date){
        var _date = getDate(date);
        return new Date(_date.getFullYear(), _date.getMonth() + 1, 0).getDate();
    };

    /**
     * Api date format to Date
     * @param {String} apiDateFormat
     * @returns {Date}
     */
    a9.dateFromAPIDate = function(apiDateFormat){
        var year = +apiDateFormat.substr(0, 4),
            month = +apiDateFormat.substr(5, 2) - 1,
            dayDate = +apiDateFormat.substr(8, 2),
            hours,
            minutes,
            seconds;
        if (apiDateFormat.length !== 10){
            hours = +apiDateFormat.substr(11, 2);
            minutes = +apiDateFormat.substr(14, 2);
            seconds = +apiDateFormat.substr(17, 2);
            return new Date(year, month, dayDate, hours, minutes, seconds);
        }
        return new Date(year, month, dayDate);
    };

    /**
     * Date object or date timestamp to API str Date
     * @param {Date|Number} date date or timestamp
     * @param {Boolean} [isWithFullTime]
     * @param {String} [mainSeparator]
     * @param {String} [hoursSeparator]
     * @param {String} [minutesAndSecondsSeparator]
     * @returns {*}
     */
    a9.dateToAPIDate = function(date, isWithFullTime, mainSeparator, hoursSeparator, minutesAndSecondsSeparator){
        var dateForWork = getDate(date),
            u,
            _mainSeparator = mainSeparator !== u ? mainSeparator : '-',
            _hoursSeparator = hoursSeparator !== u ? hoursSeparator : ' ',
            _minutesAndSecondsSeparator = minutesAndSecondsSeparator !== u ?  minutesAndSecondsSeparator : ':',
            month = dateForWork.getMonth() + 1,
            dayDate = dateForWork.getDate(),
            result = dateForWork.getFullYear() + _mainSeparator,
            time;
        if (month >= 10){
            result += month;
        } else{
            result += '0' + month;
        }

        if (dayDate >= 10){
            result += _mainSeparator + dayDate;
        } else{
            result += _mainSeparator + '0' + dayDate;
        }

        if (isWithFullTime){
            time = dayDate.getHours();
            if (time < 10){
                result += _hoursSeparator + '0' + time;
            } else{
                result += _hoursSeparator + time;
            }
            time = dayDate.getMinutes();
            if (time < 10){
                result += _minutesAndSecondsSeparator + '0' + time;
            } else{
                result += _minutesAndSecondsSeparator + time;
            }
            time = dayDate.getSeconds();
            if (time < 10){
                result += _minutesAndSecondsSeparator + '0' + time;
            } else{
                result += _minutesAndSecondsSeparator + time;
            }
        }

        return result;
    };


    /**
     * return date from str format DDMMYYYY with fixed
     * @param {String} dateIntoString DDMMYYYY;
     * @returns {Date} result date
     */
    a9.dateFromDDMMYYYY = function(dateIntoString){
        var dayDate = +dateIntoString.substr(0, 2),
            month = +dateIntoString.substr(2, 2),
            year = +dateIntoString.substr(4),
            maxDayDate;

        if (month > 12){
            month = 12;
        }

        maxDayDate = new Date(year, month, 0).getDate();

        if (dayDate > maxDayDate){
            dayDate = maxDayDate;
        }

        return new Date(year, month - 1, dayDate);
    };

    /**
     * return date in str format DDMMYYYY from Date
     * @param {Date|Number} date Date or timestamp
     * @returns {String}
     */
    a9.dateToDDMMYYYY = function(date){
        var _date = getDate(date),
            dayDate = _date.getDate(),
            month = _date.getMonth() + 1,
            result = '';
        if (dayDate < 10){
            result += '0' + dayDate;
        } else{
            result += dayDate;
        }
        if (month < 10){
            result += '0' + month;
        } else{
            result += month;
        }
        return result + _date.getFullYear();
    };

//    todo fix previous methods

    /**
     * recycles dateFormat to Date
     * @param {Date|Number|String} dateFormat [DateObject|timestamp|DDMMYYYY]
     * @returns {Date}
     */
    a9.date_getDateFromDateFormat = function(dateFormat){
        switch (typeof dateFormat){
            case 'string':
                return a9.dateFromDDMMYYYY(dateFormat);
            case 'number':
                return new Date(dateFormat);
            default:
                return dateFormat
        }
    };

    /**
     * get days count range
     * @param {Date|Number|String} startDate [[dateFormat]]
     * @param {Date|Number|String} endDate [[dateFormat]]
     * @returns {Number}
     */
    a9.date_getDaysCount = function(startDate, endDate){
        var _startDate = a9.date_getDateFromDateFormat(startDate),
            _endDate = a9.date_getDateFromDateFormat(endDate),

            startDateYear = _startDate.getFullYear(),
            startDateMonth = _startDate.getMonth(),
            startDateDate = _startDate.getDate(),

            endDateYear = _endDate.getFullYear(),
            endDateMonth = _endDate.getMonth(),
            endDateDate = _endDate.getDate(),

            currentMonth,

            count = 0;

        if ((startDateYear === endDateYear)
            && (startDateMonth === endDateMonth)){
            count = endDateDate - (startDateDate - 1);
        } else{
            count = new Date(startDateYear, startDateMonth + 1, 0).getDate() - (startDateDate - 1);
            if (startDateMonth === 12){
                startDateMonth = 1;
            } else{
                startDateMonth += 1;
            }
            for (; startDateYear <= endDateYear; startDateYear += 1){
                if (startDateYear === endDateYear){
                    currentMonth = endDateMonth;
                } else{
                    currentMonth = 11;
                }
                for (; startDateMonth <= currentMonth; startDateMonth += 1){
                    count += new Date(startDateYear, startDateMonth + 1, 0).getDate();
                }
                startDateMonth = 0;
            }
            count -= new Date(endDateYear, endDateMonth + 1, 0).getDate() - endDateDate;
        }


        return count;
    };

    (function(){
        /**
         * Create dateRangeObject
         * @param {Date} [startDate]
         * @param {Date} [endDate]
         * @param {Number} [daysCount] — days size
         * @constructor
         */
        function DateRangeObject(startDate, endDate, daysCount){
            var dateRangeObject = this;
            dateRangeObject.startDate = startDate || null;
            dateRangeObject.endDate = endDate || null;
            dateRangeObject.daysCount = daysCount || 0;
        }

        /**
         * Create dateRangeObject
         * @param {Date} [startDate]
         * @param {Date} [endDate]
         * @param {Number} [daysCount] — days size
         * @returns {DateRangeObject}
         */
        a9.date_createDateRangeObject = function(startDate, endDate, daysCount){
            return new DateRangeObject(startDate, endDate, daysCount);
        };
    }());

    /**
     * get previous calendar week range
     * @param {Date|Number|String} dateFormat — date for calculation
     * @param {Number} [firstDayOfWeek] week day number (0-6) (1 by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getPreviousCalendarWeek = function(dateFormat, firstDayOfWeek, dateRangeObject){
        var _firstDayOfWeek = typeof firstDayOfWeek === 'number' ? firstDayOfWeek : 1,
            date = a9.date_getDateFromDateFormat(dateFormat),
            currentDayOfInputWeek = date.getDay(),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear = date.getFullYear(),
            inputMonth = date.getMonth(),
            inputDate = date.getDate();
        if (currentDayOfInputWeek === _firstDayOfWeek){
            _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate - 7);
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - 1);
        } else if (_firstDayOfWeek < currentDayOfInputWeek){
            _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek + _firstDayOfWeek - 7);
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek + _firstDayOfWeek - 1);
        } else{
            _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek - (7 - _firstDayOfWeek) - 7);
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek - (7 - _firstDayOfWeek) - 1);
        }

        _dateRangeObject.daysCount = 7;
        return _dateRangeObject;
    };

    /**
     * get current calendar week range
     * @param {Date|Number|String} dateFormat — date for calculation
     * @param {Number} [firstDayOfWeek] week day number (0-6) (1 by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getCalendarWeek = function(dateFormat, firstDayOfWeek, dateRangeObject){
        var _firstDayOfWeek = typeof firstDayOfWeek === 'number' ? firstDayOfWeek : 1,
            date = a9.date_getDateFromDateFormat(dateFormat),
            currentDayOfInputWeek = date.getDay(),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear = date.getFullYear(),
            inputMonth = date.getMonth(),
            inputDate = date.getDate();
        if (currentDayOfInputWeek === _firstDayOfWeek){
            _dateRangeObject.startDate = date;
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate + 6);
        } else if (_firstDayOfWeek < currentDayOfInputWeek){
            _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek + _firstDayOfWeek);
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek + _firstDayOfWeek + 6);
        } else{
            _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek - (7 - _firstDayOfWeek));
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek - (7 - _firstDayOfWeek) + 6);
        }

        _dateRangeObject.daysCount = 7;
        return _dateRangeObject;
    };

    /**
     * get next calendar week range
     * @param {Date|Number|String} dateFormat — date for calculation
     * @param {Number} [firstDayOfWeek] week day number (0-6) (1 by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getNextCalendarWeek = function(dateFormat, firstDayOfWeek, dateRangeObject){
        var _firstDayOfWeek = typeof firstDayOfWeek === 'number' ? firstDayOfWeek : 1,
            date = a9.date_getDateFromDateFormat(dateFormat),
            currentDayOfInputWeek = date.getDay(),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear = date.getFullYear(),
            inputMonth = date.getMonth(),
            inputDate = date.getDate();
        if (currentDayOfInputWeek === _firstDayOfWeek){
            _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate + 7);
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate + 7 + 6);
        } else if (_firstDayOfWeek < currentDayOfInputWeek){
            _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek + (7 + _firstDayOfWeek));
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek + (7 + _firstDayOfWeek) + 6);
        } else{
            _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek + _firstDayOfWeek);
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - currentDayOfInputWeek + _firstDayOfWeek + 6);
        }

        _dateRangeObject.daysCount = 7;
        return _dateRangeObject;
    };

    /**
     * get previous week range
     * @param {Date|Number|String} dateFormat — date for calculation
     * @param {Boolean} [isInputDateInclusive] — (false by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getPreviousWeek = function(dateFormat, isInputDateInclusive, dateRangeObject){
        var date = a9.date_getDateFromDateFormat(dateFormat),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear,
            inputMonth,
            inputDate;
        if (isInputDateInclusive){
            _dateRangeObject.startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
            _dateRangeObject.endDate = date;
        } else{
            inputYear = date.getFullYear();
            inputMonth = date.getMonth();
            inputDate = date.getDate();
            _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate - 7);
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - 1);
        }
        _dateRangeObject.daysCount = 7;
        return _dateRangeObject;
    };

    /**
     * get next week range
     * @param {Date|Number|String} DateFormat — date for calculation
     * @param {Boolean} [isInputDateInclusive] — (false by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getNextWeek = function(DateFormat, isInputDateInclusive, dateRangeObject){
        var date = a9.date_getDateFromDateFormat(DateFormat),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear,
            inputMonth,
            inputDate;
        if (isInputDateInclusive){
            _dateRangeObject.startDate = date;
            _dateRangeObject.endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6);
        } else{
            inputYear = date.getFullYear();
            inputMonth = date.getMonth();
            inputDate = date.getDate();
            _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate + 1);
            _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate + 7);
        }
        _dateRangeObject.daysCount = 7;
        return _dateRangeObject;
    };

    /**
     * get past days range of calendar week
     * @param {Date|Number|String} dateFormat — date for calculation
     * @param {Boolean} [isInputDateInclusive] — (false by default)
     * @param {Number} [firstDayOfWeek] week day number (0-6) (1 by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getPastDaysOfCalendarWeek = function(dateFormat, isInputDateInclusive, firstDayOfWeek, dateRangeObject){
        var _firstDayOfWeek = typeof firstDayOfWeek === 'number' ? firstDayOfWeek : 1,
            date = a9.date_getDateFromDateFormat(dateFormat),
            currentDayOfInputWeek = date.getDay(),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear,
            inputMonth,
            inputDate,
            size;

        if (currentDayOfInputWeek === _firstDayOfWeek){
            _dateRangeObject.startDate = date;
            _dateRangeObject.endDate = date;
            _dateRangeObject.daysCount = isInputDateInclusive ? 1 : 0;
        } else{
            if (currentDayOfInputWeek > _firstDayOfWeek){
                size = currentDayOfInputWeek - _firstDayOfWeek;
            } else{
                size = 7 - _firstDayOfWeek + currentDayOfInputWeek;
            }

            if (isInputDateInclusive){
                _dateRangeObject.startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - size);
                _dateRangeObject.endDate = date;
                _dateRangeObject.daysCount = size + 1;
            } else{
                inputYear = date.getFullYear();
                inputMonth = date.getMonth();
                inputDate = date.getDate();
                _dateRangeObject.startDate =  new Date(inputYear, inputMonth, inputDate - size);
                _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - 1);
                _dateRangeObject.daysCount = size;
            }
        }
        return _dateRangeObject;
    };

    /**
     * get future days range of calendar week
     * @param {Date|Number|String} dateFormat — date for calculation
     * @param {Boolean} [isInputDateInclusive] — (false by default)
     * @param {Number} [firstDayOfWeek] week day number (0-6) (1 by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getFutureDaysOfCalendarWeek = function(dateFormat, isInputDateInclusive, firstDayOfWeek, dateRangeObject){
        var _firstDayOfWeek = typeof firstDayOfWeek === 'number' ? firstDayOfWeek : 1,
            lastDayOfInputWeek,
            date = a9.date_getDateFromDateFormat(dateFormat),
            currentDayOfInputWeek = date.getDay(),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear,
            inputMonth,
            inputDate,
            size;

        lastDayOfInputWeek = _firstDayOfWeek === 0 ? 6 : _firstDayOfWeek - 1;

        if (currentDayOfInputWeek === lastDayOfInputWeek){
            _dateRangeObject.startDate = date;
            _dateRangeObject.endDate = date;
            _dateRangeObject.daysCount = isInputDateInclusive ? 1 : 0;
        } else{
            if (currentDayOfInputWeek > lastDayOfInputWeek){
                size = 7 - currentDayOfInputWeek - lastDayOfInputWeek;
            } else{
                size = lastDayOfInputWeek - currentDayOfInputWeek;
            }

            if (isInputDateInclusive){
                _dateRangeObject.startDate = date;
                _dateRangeObject.endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + size);
                _dateRangeObject.daysCount = size + 1;
            } else{
                inputYear = date.getFullYear();
                inputMonth = date.getMonth();
                inputDate = date.getDate();
                _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate + 1);
                _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate + size);
                _dateRangeObject.daysCount = size;
            }
        }
        return _dateRangeObject;
    };

    /**
     * get range of previous month
     * @param {Date|Number|String} dateFormat
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getPreviousMonth = function(dateFormat, dateRangeObject){
        var date = a9.date_getDateFromDateFormat(dateFormat),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear = date.getFullYear(),
            inputMonth = date.getMonth();
        _dateRangeObject.startDate = new Date(inputYear, inputMonth - 1, 1);
        _dateRangeObject.endDate = new Date(inputYear, inputMonth, 0);
        _dateRangeObject.daysCount = a9.date_getDaysCount(
            _dateRangeObject.startDate,
            _dateRangeObject.endDate
        );
        return _dateRangeObject;
    };

    /**
     * get range of next month
     * @param {Date|Number|String} dateFormat
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getNextMonth = function(dateFormat, dateRangeObject){
        var date = a9.date_getDateFromDateFormat(dateFormat),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear = date.getFullYear(),
            inputMonth = date.getMonth();
        _dateRangeObject.startDate = new Date(inputYear, inputMonth + 1, 1);
        _dateRangeObject.endDate = new Date(inputYear, inputMonth + 2, 0);
        _dateRangeObject.daysCount = a9.date_getDaysCount(
            _dateRangeObject.startDate,
            _dateRangeObject.endDate
        );
        return _dateRangeObject;
    };

    /**
     * get past days range of month
     * @param {Date|Number|String} dateFormat
     * @param {Boolean} [isInputDateInclusive] — (false by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getPastDaysOfMonth = function(dateFormat, isInputDateInclusive, dateRangeObject){
        var date = a9.date_getDateFromDateFormat(dateFormat),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear = date.getFullYear(),
            inputMonth = date.getMonth(),
            inputDate = date.getDate();
        if (inputDate === 1){
            _dateRangeObject.startDate = date;
            _dateRangeObject.endDate = date;
            _dateRangeObject.daysCount = isInputDateInclusive ? 1 : 0;
        } else{
            if (isInputDateInclusive){
                _dateRangeObject.startDate = new Date(inputYear, inputMonth, 1);
                _dateRangeObject.endDate = date;
                _dateRangeObject.daysCount = inputDate;
            } else{
                _dateRangeObject.startDate = new Date(inputYear, inputMonth, 1);
                _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - 1);
                _dateRangeObject.daysCount = inputDate - 1;
            }
        }
        return _dateRangeObject;
    };

    /**
     * get future days range of month
     * @param {Date|Number|String} dateFormat
     * @param {Boolean} [isInputDateInclusive] — (false by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getFutureDaysOfMonth = function(dateFormat, isInputDateInclusive, dateRangeObject){
        var date = a9.date_getDateFromDateFormat(dateFormat),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear = date.getFullYear(),
            inputMonth = date.getMonth(),
            inputDate = date.getDate(),
            lastDate = new Date(inputYear, inputMonth + 1, 0),
            lastDateOfInputMonth = lastDate.getDate();
        if (inputDate === lastDateOfInputMonth){
            _dateRangeObject.startDate = date;
            _dateRangeObject.endDate = date;
            _dateRangeObject.daysCount = isInputDateInclusive ? 1 : 0;
        } else{
            if (isInputDateInclusive){
                _dateRangeObject.startDate = date;
                _dateRangeObject.endDate = lastDate;
                _dateRangeObject.daysCount = lastDateOfInputMonth - inputDate;
            } else{
                _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate + 1);
                _dateRangeObject.endDate = lastDate;
                _dateRangeObject.daysCount = lastDateOfInputMonth - inputDate - 1;
            }
        }
        return _dateRangeObject;
    };

    /**
     * get past days range of year
     * @param {Date|Number|String} dateFormat
     * @param {Boolean} [isInputDateInclusive] — (false by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getPastDaysOfYear = function(dateFormat, isInputDateInclusive, dateRangeObject){
        var date = a9.date_getDateFromDateFormat(dateFormat),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear = date.getFullYear(),
            inputMonth = date.getMonth(),
            inputDate = date.getDate();

        if ((inputMonth === 0)
            && (inputDate === 1)){
            _dateRangeObject.startDate = date;
            _dateRangeObject.endDate = date;
            _dateRangeObject.daysCount = isInputDateInclusive ? 1 : 0;
        } else{
            _dateRangeObject.startDate = new Date(inputYear, 0, 1);
            if (isInputDateInclusive){
                _dateRangeObject.endDate = date;
            } else{
                _dateRangeObject.endDate = new Date(inputYear, inputMonth, inputDate - 1);
            }
            _dateRangeObject.daysCount = a9.date_getDaysCount(
                _dateRangeObject.startDate,
                _dateRangeObject.endDate
            );

        }

        return _dateRangeObject;
    };

    /**
     * get future days range of year
     * @param {Date|Number|String} dateFormat
     * @param {Boolean} [isInputDateInclusive] — (false by default)
     * @param {DateRangeObject} [dateRangeObject]
     * @returns {DateRangeObject}
     */
    a9.date_getFutureDaysOfYear = function(dateFormat, isInputDateInclusive, dateRangeObject){
        var date = a9.date_getDateFromDateFormat(dateFormat),
            _dateRangeObject = dateRangeObject || a9.date_createDateRangeObject(),
            inputYear = date.getFullYear(),
            inputMonth = date.getMonth(),
            inputDate = date.getDate(),
            lastDateOfInputMonth = new Date(inputYear, inputMonth + 1, 0).getDate();

        if ((inputMonth === 11)
            && (inputDate === lastDateOfInputMonth)){
            _dateRangeObject.startDate = date;
            _dateRangeObject.endDate = date;
            _dateRangeObject.daysCount = isInputDateInclusive ? 1 : 0;
        } else{
            if (isInputDateInclusive){
                _dateRangeObject.startDate = date;
            } else{
                _dateRangeObject.startDate = new Date(inputYear, inputMonth, inputDate + 1);
            }
            _dateRangeObject.endDate = new Date(inputYear + 1, 0, 0);
            _dateRangeObject.daysCount = a9.date_getDaysCount(
                _dateRangeObject.startDate,
                _dateRangeObject.endDate
            );

        }
        return _dateRangeObject;
    };

    a9.parseDayFromString = function(day, month, year){
        var maxValueLength = 2,
            minDayValue = '01',
            maxDayValue,
            parseDayFromString;
        a9.parseDayFromString = parseDayFromString = function(day){
            if (day.length > maxValueLength){
                return parseDayFromString(day.substr(0, maxValueLength))
            } else{
                day = +day;
                if (isNaN(day) || (day === 0)){
                    return minDayValue;
                } else if (day < 10) {
                    return '0' + day;
                } else{
                    if ((month === u) || (month > 12)){
                        maxDayValue = 31;
                    } else{
                        if ((year === u) && (month === '02')){
                            maxDayValue = 29;
                        } else {
                            if (year === u) {
                                year = date.getFullYear();
                            }
                            maxDayValue = getDaysSizeOfMonth(new Date(year, month, 0));
                        }
                    }
                    if (day > maxDayValue) {
                        return maxDayValue;
                    } else{
                        return day;
                    }
                }
            }
        };
        return parseDayFromString(day);
    };

    a9.parseUnfinishedDayFromString = function(day, month, year){
        day = +day;
        if (isNaN(day)){
            return '01';
        } else if (((month === '02') && (day < 3)) || ((month !== '02') && (day < 4))) {
            return day;
        } else{
            return a9.parseDayFromString(day, month, year);
        }
    };

    a9.parseMonthFromString = function(month){
        var maxValueLength = 2,
            minMonthValue = '01',
            maxMonthValue = 12,
            parseMonthFromString;
        a9.parseMonthFromString = parseMonthFromString = function(month){
            if (month.length > maxValueLength){
                return parseMonthFromString(month.substr(0, maxValueLength))
            } else{
                month = +month;
                if (isNaN(month) || (month === 0)){
                    return minMonthValue;
                } else if (month < 10) {
                    return '0' + month;
                } else if (month > maxMonthValue) {
                    return maxMonthValue;
                } else{
                    return month;
                }
            }
        };
        return parseMonthFromString(month);
    };

    a9.parseUnfinishedMonthFromString = function(month){
        month = +month;
        if (isNaN(month)){
            return '01';
        } else if (month < 2) {
            return month;
        } else{
            return a9.parseMonthFromString(month);
        }
    };

    a9.parseYearFromString = function(year){
        var maxValueLength = 4,
            parseYearFromString;
        a9.parseYearFromString = parseYearFromString = function(year){
            if (year.length > maxValueLength){
                return parseYearFromString(year.substr(0, maxValueLength))
            } else{
                year = +year;
                if (isNaN(year) || (year < 0)) {
                    return '';
                } else{
                    return year;
                }
            }
        };
        return parseYearFromString(year);
    };

    a9.getDateYearBefore = function(date, yearsGap){
        var _date = getDate(date);
        return new Date(_date.getFullYear() - (yearsGap || 1),
            _date.getMonth(),
            _date.getDate()
        );
    };

    a9.getDateYearAfter = function(date, yearsGap){
        var _date = getDate(date);
        return new Date(_date.getFullYear() + (yearsGap || 1),
            _date.getMonth(),
            _date.getDate()
        );
    };


}(A9));

(function(a9){
    var isNative = Array.forEach;
    /**
     *
     * @param {Array|Object|String} eachable
     * @param {Function} fn fn calls fn(item, key, list)
     * @param {*} [ctx] fn ctx
     */
    a9.each = function(eachable, fn, ctx){
        var _ctx = ctx || a9,
            i,
            iMax;
        if (eachable){
            if (typeof eachable === 'string'){
                for (i = 0, iMax = eachable.length; i < iMax; i += 1) {
                    fn.call(_ctx, eachable.charAt(i), eachable);
                }
            } else if (a9.isArray(eachable)){
                if (isNative){
                    eachable.forEach(fn, _ctx);
                } else{
                    for (i = 0, iMax = eachable.length; i < iMax; i += 1){
                        fn.call(_ctx, eachable[i], i, eachable);
                    }
                }
            } else{
                for (var p in eachable){
                    if (eachable.hasOwnProperty(p)){
                        fn.call(_ctx, eachable[p], p, eachable);
                    }
                }
            }
        }
    };

}(A9));
(function(a9){
    /**
     * Исполняет функцию для аргуменат(ов), за исключением undefined
     * @param {Function} fn функция которую нужно выполнить
     * @param {*|Array} _for аргумент или коллекция агрументов
     * @param {Array} [results] массив для записи результатов выполнения коллекции аргументов
     * @returns {*|Array} резултат выполнения или результаты выполнения (если была передана коллекция и results, вернёт results)
     */
    a9.callFor = function(fn, _for, results){
        var i,
            iMax,
            u;
        if (a9.isArray(_for)){
            if (results === u){
                results = [];
            }
            for (i = 0, iMax = _for.length; i < iMax; i += 1){
                results[i] = fn(_for[i]);
            }
            return results;
        } else if (_for !== u){
            return fn(_for);
        }
    };

    /**
     * вызывает fn.apply(ctx || this, argsCollections), если кто-то из элементов argsCollections[i] — массив вызовет,
     * fn.apply(ctx || this, argsCollections) cо всеми элементами argsCollections[i] вместо argsCollections[i]
     *
     * например:
     *
     * function addClass($node, className){$node.className=className;}
     * a9.multiApply(addClass,[[$div, $div2],'init',[$span, $span2]], {test: 1});
     * //addClass.apply({test: 1}, [$div,'init',$span]);
     * //addClass.apply({test: 1}, [$div2,'init',$span2]);
     *
     * так же возвращает результаты выполнения переданной функции
     * var a = a9.multiApply(function(a, b){return a + b}, [1, [2, 4]])
     * console.log(a) // [3, 5];
     *
     * var b = []
     *     a = a9.multiApply(function(a, b){return a + b}, [1, [2, 4]], u, b);
     * console.log(b) // [3, 5];
     * console.log(a === b) // true;
     *
     * @param {Function} fn
     * @param {Array} argsCollections
     * @param {*} [ctx] — fn ctx
     * @param {Array} [results] — pack for fn results
     * @returns {*|Array} result or results list fn.apply (if parameter result !== []  and fn.apply more one, return results)
     */
    a9.multiApply = function(fn, argsCollections, ctx, results){
        var argForApply = [],
            flagsMap = [],
            _results,
            isHasCollection = false,
            argsCollectionArgsLength,
            i,
            argsLength,
            j,
            u;

        for (i = 0, argsLength = argsCollections.length; i < argsLength; i += 1){
            if (a9.isArray(argsCollections[i])){
                flagsMap[i] = true;
                if (!isHasCollection){
                    isHasCollection = true;
                    argsCollectionArgsLength = argsCollections[i].length;
                }
                argForApply[i] = u;
            } else{
                flagsMap[i] = false;
                argForApply[i] = argsCollections[i];
            }
        }

        if (isHasCollection){
            _results = results || [];
            for (i = 0; i < argsCollectionArgsLength; i += 1){
                for (j = 0; j < argsLength; j += 1){
                    if (flagsMap[j]){
                        argForApply[j] = argsCollections[j][i];
                    }
                }
                _results[i] = fn.apply(ctx || this, argForApply);
            }
            return _results;
        }
        return fn.apply(ctx || this, argsCollections);
    };

    /**
     *
     * @param {*} value
     * @param {Function} fn
     * @returns {*}
     */
    a9.fnsChain = function(value, fn){
        var i = 1,
            iMax = arguments.length;
        for (; i < iMax; i += 1){
            value = arguments[i](value);
        }
        return value;
    }

}(A9));

(function(global, a9){
    var jsonRequestSettings = {
            method: 'GET',
            url: '',
            onSuccess: function(success, onSuccessCallback){
                if (typeof success === 'string'){
                    onSuccessCallback.call(this, global.JSON.parse(success));
                } else{
                    onSuccessCallback.call(this, success);
                }
            },
            onError: null
        };
    /**
     *
     * @param {String} url
     * @param {Function} onSuccess
     * @param {Function} [onError]
     * @param {Object|Array} [ctx]
     * @returns {XMLHttpRequest}
     */
    a9.getJSON = function(url, onSuccess, onError, ctx){
        jsonRequestSettings.url = url;
        jsonRequestSettings.onError = onError;
        return a9.request(jsonRequestSettings, onSuccess, ctx);
    };
}(this, A9));

(function(a9){
    a9.ready(function(a9, global){
        var document = global.document;
        if ('getBoundingClientRect' in document.body){
            /**
             * Получить абсолютные координаты или координаты относительно родителя по оси X
             * @param {HTMLElement} $node
             * @param {HTMLElement|String} [$parent] необязательный параметр. Родитель относительно которого нужно узнать координаты. Если передаётся строка, ищет родителя с классом строки.
             * @return {Number} возвращает координаты относительно оси x указанного объекта
             */
            a9.getPositionX = function($node, $parent){
                var x = $node.getBoundingClientRect().left,
                    $html = document.documentElement,
                    $body = document.body,
                    scrollLeft = window.pageXOffset || $html.scrollLeft || $body.scrollLeft,
                    clientLeft = $html.clientLeft || $body.clientLeft || 0,
                    u;
                if ($parent !== u){
                    $parent = typeof $parent === 'string' ? a9.getParentByClass($node, $parent) : $parent;
                    x -= $parent.getBoundingClientRect().left;
                }
                return x + scrollLeft - clientLeft;
            };
            /**
             * Получить абсолютные координаты или координаты относительно родителя по оси Y
             * @param {HTMLElement} $node
             * @param {HTMLElement|String} [$parent] необязательный параметр. Родитель относительно которого нужно узнать координаты. Если передаётся строка, ищет родителя с классом строки.
             * @return {Number} возвращает координаты относительно оси x указанного объекта
             */
            a9.getPositionY = function($node, $parent){
                var y = $node.getBoundingClientRect().top,
                    $html = document.documentElement,
                    $body = document.body,
                    scrollTop = window.pageYOffset || $html.scrollTop || $body.scrollTop,
                    clientTop = $html.clientTop || $body.clientTop || 0,
                    u;
                if ($parent !== u){
                    $parent = typeof $parent === 'string' ? a9.getParentByClass($node, $parent) : $parent;
                    y -= $parent.getBoundingClientRect().top;
                }
                return y + scrollTop - clientTop;
            };
        } else{
            a9.getPositionX = function($node, $parent){
                var x = 0;
                $parent = typeof $parent === 'string' ? a9.getParentByClass($node, $parent) : $parent;
                while (($node !== null) && ($node !== $parent)){
                    x += $node.offsetLeft + $node.clientLeft;
                    $node = $node.offsetParent;
                }
                return x;
            };
            a9.getPositionY = function($node, $parent){
                var y = 0;
                $parent = typeof $parent === 'string' ? a9.getParentByClass($node, $parent) : $parent;
                while (($node !== null) && ($node !== $parent)){
                    y += $node.offsetTop + $node.clientTop;
                    $node = $node.offsetParent;
                }
                return y;
            };
        }
    });

}(A9));

(function(a9){
    /**
     * init modules of namespace
     * @param {Object} namespace
     * @param {Array} [modules]
     */
    a9.initModules = function(namespace, modules){
        var modulesForInit = modules || namespace.modulesForInit,
            i = 0,
            iMax = modulesForInit.length;
        for (; i < iMax; i += 1){
            modulesForInit[i](namespace);
        }
    };
}(A9));

/**
 * Получить имя кноки клавиатуры относительно события
 * @param {Event} e событие клавиатуры
 * @returns {String} name имя кнопки
 */
(function(a9){
    var deviceInfo = a9.deviceInfo,
        keysList = [];
//    todo to object
    keysList[8] = 'back';
    keysList[9] = 'tab';
    keysList[13] = 'enter';
    keysList[16] = 'shift';
    keysList[17] = 'ctrl';
    keysList[18] = 'alt';
    keysList[20] = 'caps';
    keysList[27] = 'esc';
    keysList[32] = 'space';
    keysList[33] = 'pUp';
    keysList[34] = 'pDown';
    keysList[35] = 'end';
    keysList[36] = 'home';
    keysList[37] = 'aLeft';
    keysList[38] = 'aTop';
    keysList[39] = 'aRight';
    keysList[40] = 'aBottom';
    keysList[45] = 'insert';
    keysList[46] = 'delete';
    keysList[48] = '0';
    keysList[49] = '1';
    keysList[50] = '2';
    keysList[51] = '3';
    keysList[52] = '4';
    keysList[53] = '5';
    keysList[54] = '6';
    keysList[55] = '7';
    keysList[56] = '8';
    keysList[57] = '9';
    keysList[59] = keysList[186] = ';';
    keysList[61] = keysList[187] = '=';
    keysList[65] = 'a';
    keysList[66] = 'b';
    keysList[67] = 'c';
    keysList[68] = 'd';
    keysList[69] = 'e';
    keysList[70] = 'f';
    keysList[71] = 'g';
    keysList[72] = 'h';
    keysList[73] = 'i';
    keysList[74] = 'j';
    keysList[75] = 'k';
    keysList[76] = 'l';
    keysList[77] = 'm';
    keysList[78] = 'n';
    keysList[79] = 'o';
    keysList[80] = 'p';
    keysList[81] = 'q';
    keysList[82] = 'r';
    keysList[83] = 's';
    keysList[84] = 't';
    keysList[85] = 'u';
    keysList[86] = 'v';
    keysList[87] = 'w';
    keysList[88] = 'x';
    keysList[89] = 'y';
    keysList[90] = 'z';
    keysList[96] = 'n0';
    keysList[97] = 'n1';
    keysList[98] = 'n2';
    keysList[99] = 'n3';
    keysList[100] = 'n4';
    keysList[101] = 'n5';
    keysList[102] = 'n6';
    keysList[103] = 'n7';
    keysList[104] = 'n8';
    keysList[105] = 'n9';
    keysList[111] = 'n/';
    keysList[106] = 'n*';
    keysList[107] = 'n+';
    keysList[109] = keysList[189] = '-';
    keysList[110] = 'nPoint';
    keysList[112] = 'f1';
    keysList[113] = 'f2';
    keysList[114] = 'f3';
    keysList[115] = 'f4';
    keysList[116] = 'f5';
    keysList[117] = 'f6';
    keysList[118] = 'f7';
    keysList[119] = 'f8';
    keysList[120] = 'f9';
    keysList[121] = 'f10';
    keysList[122] = 'f11';
    keysList[123] = 'f12';
    keysList[124] = keysList[44] = 'f13';
    keysList[125] = keysList[145] = 'f14';
    keysList[126] = keysList[19] = 'f15';
    keysList[127] = 'f16';
    keysList[128] = keysList[63252] = 'f17';
    keysList[129] = keysList[63253] = 'f18';
    keysList[130] = keysList[63254] = 'f19';
    keysList[144] = 'numPad';
    keysList[188] = '<';
    keysList[190] = '>';
    keysList[191] = '?';
    keysList[192] = '~';
    keysList[219] = '[';
    keysList[220] = '|';
    keysList[221] = ']';
    keysList[222] = '"';
    keysList[224] = keysList[91] = keysList[93] = 'cmd';

    if (deviceInfo.isMac && deviceInfo.isOpera){
        keysList[57392] = 'ctrl';
        keysList[17] = 'cmd';
    }
    if (deviceInfo.isWindows){
        keysList[19] = 'pause';
        keysList[44] = 'prtSc';
        keysList[91] = 'win';
        keysList[145] = 'scrollLock';
        if (deviceInfo.isOpera){
            keysList[42] = 'n*';
            keysList[43] = 'n+';
            keysList[47] = 'n/';
        }
    }

    a9.getKeyNameOfEvent = function(e){
        return keysList[e.keyCode];
    };
}(A9));

(function(a9){
    /**
     * Проверить соответсвие нажатой кнопки имени
     * @param {Event} e событие клавиатуры
     * @param {String} keyName имя кнопки
     * @returns {Boolean} true/false
     */
    a9.testEventOfKeyName = function(e, keyName){
        return a9.getKeyNameOfEvent(e) === keyName;
    };
}(A9));

(function(globa, a9){
    var pressingKeys = [],
        document = globa.document;
    /**
     * Проверить нажата ли кнопка клавиатуры в данный момент
     * @param {String} keyName имя кнопки
     * @returns {boolean} true/false
     */
    a9.testPressedKey = function(keyName){
        for (var i = pressingKeys.length; i-- ;){
            if (pressingKeys[i] == keyName){
                return true;
            }
        }
        return false;
    };
    function del(keyName){
        var index = a9.arrayIndexOf(pressingKeys, keyName);
        if (index !== -1){
            pressingKeys.splice(index, 1);
        }
    }
    a9.addEvent(document, 'keydown', function(e){
        var cache = a9.getKeyNameOfEvent(e);
        if (!a9.testPressedKey(cache)){
            pressingKeys.push(cache);
        }
    });
    a9.addEvent(document, 'keyup', function (e){
        del(a9.getKeyNameOfEvent(e));
    });
    a9.active.blur.push(function(){
        pressingKeys.length = 0;
    });
}(this, A9));
(function(a9){
    var l10n,
        modifications = {},
        u,
        modificationArray = [],
        digitForSupplant = {
            digit: 0
        };

    a9.l10n = l10n = function(key, modification){
        if (modification in modifications){
            a9.copyArray(arguments, modificationArray, 2);
            modificationArray.unshift(key);
            return modifications[modification].apply(modifications, modificationArray);
        }
        if (key in l10n.dictionary){
            return l10n.dictionary[key];
        }
        return key;
    };

    modifications.title = modifications.firstUpper = function(key){
        return a9.str_firstUpper(l10n.dictionary[key] || key);
    };

    modifications.numeral = function(key, digit){
        var digitStrCache,
            digitStrCacheLastIndex,
            lastDigit,
            resultKey;
        switch (l10n.locale){
            case 'rus':
            case 'ukr':
                digitStrCache = '' + digit;
                digitStrCacheLastIndex = digitStrCache.length - 1;
                lastDigit = digitStrCache.charAt(digitStrCacheLastIndex);
                switch (digitStrCache.charAt(digitStrCacheLastIndex)){
                    case '1':
                        if ((digitStrCacheLastIndex === 0) || (digitStrCache.charAt(digitStrCacheLastIndex - 1) !== '1')){
                            resultKey = key + '_1';
                        } else{
                            resultKey = key + '_s';
                        }
                        break;
                    case '2':
                    case '3':
                    case '4':
                        if ((digitStrCache.charAt(digitStrCacheLastIndex - 1) !== '1')){
                            resultKey = key + '_2-4';
                        } else{
                            resultKey = key + '_s';
                        }
                        break;
                    default:
                        resultKey = key + '_s';
                }
                break;
            case 'eng':
                if (digit === 1){
                    resultKey = key;
                } else{
                    resultKey = key + '_s';
                }
                break;
            default:
                resultKey = key;
        }
        digitForSupplant.digit = digit;
        return a9.supplant(l10n(resultKey), digitForSupplant);
    };

    modifications.oneOrMore = function(key, digit){
        var resultKey;
        if (digit === 1){
            resultKey = key;
        } else{
            resultKey = key + '_s';
        }
        digitForSupplant.digit = digit;
        return a9.supplant(l10n(resultKey), digitForSupplant);
    }
}(A9));

(function(a9){
    /**
     * безоасно получить значение сквозь вложенные объекты
     * @param {Object} object
     * @param {String|Number|Array} [key] — ключи объектов, если массивом то только один параметр
     * @returns {*} result || null
     */
    a9.getValueByObjectKeys = function(object, key){
        var keyTypeof = typeof key,
            i,
            iMax,
            keysList,
            cache,
            result,
            u;
        if (object){
            if ((keyTypeof !== 'string')
                && (keyTypeof !== 'number')){
                keysList = key;
                i = 0;
            } else{
                keysList = arguments;
                i = 1;
            }
            iMax = keysList.length - 1;
            for (; i < iMax; i += 1){
                cache = object[keysList[i]];
                if (cache === u){
                    return null;
                } else{
                    object = cache;
                }
            }
            result = object[keysList[i]];
            if (result !== u){
                return result;
            }
        }
        return null;
    };

    /**
     *
     * @param {Array} list
     * @param {String|Number|Array} key — ключ
     * @param {*} value — значение
     * @param {Boolean} [isNeedIndex] — флаг получения индекса
     * @returns {*|Number} result or null
     */
    a9.getObjectOfList = function(list, key, value, isNeedIndex){
        var keyTypeof = typeof key,
            i = 0,
            iMax = list.length;
        if ((keyTypeof !== 'string')
            && (keyTypeof !== 'number')){
            for (; i < iMax; i+= 1){
                if (a9.isObject(list[i])
                    && (a9.getValueByObjectKeys(list[i], key) === value)){
                    return isNeedIndex === true ? i : list[i];
                }
            }
        } else{
            for (; i < iMax; i+= 1){
                if (a9.isObject(list[i])
                    && (list[i][key] === value)){
                    return isNeedIndex === true ? i : list[i];
                }
            }
        }
        return null;
    };

    /**
     *
     * @param {Array} list
     * @param {String|Number|Array} key object key (or keychain if type is array (use a9.getValueByObjectKeys))
     * @param {*|Function} rule — value or function rule
     * @param {Array} [container] — container foe result
     * @returns {Array} result || container (if container was in call)
     */
    a9.filterObjectsOfList = function(list, key, rule, container){
        var keyTypeof = typeof key,
            i = 0,
            iMax = list.length,
            isValueFn = typeof rule === 'function',
            result,
            u;
        if (container !== u){
            container.length = 0;
            result = container;
        } else{
            result = []
        }
        if ((keyTypeof !== 'string')
            && (keyTypeof !== 'number')){
            for (; i < iMax ; i += 1){
                if (a9.isObject(list[i])
                    && (
                        (isValueFn && rule(a9.getValueByObjectKeys(list[i], key)))
                        || (!isValueFn && (a9.getValueByObjectKeys(list[i], key) === rule))
                    )
                ){
                    result.push(list[i]);
                }
            }
        } else{
            for (; i < iMax ; i += 1){
                if (a9.isObject(list[i])
                    && (
                        (isValueFn && rule(list[i][key]))
                        || (!isValueFn && (list[i][key] === rule))
                        )
                    ){
                    result.push(list[i]);
                }
            }
        }
        return result;
    };



    function AnswerForGetObjectFromTree(){
        var answer = this;
        answer.collection = null;
        answer.index = -1;
        answer.searchableObject = null;
    }

    AnswerForGetObjectFromTree.prototype = {
        clean: function(){
            var answer = this;
            answer.collection = null;
            answer.index = -1;
            answer.searchableObject = null;
        }
    };

    a9.createAnswerForGetObjectFromTree = function(){
        return new AnswerForGetObjectFromTree();
    };

    var answerForGetObjectFromTree = a9.createAnswerForGetObjectFromTree();

    /**
     *
     * @param {Array} tree
     * @param {String} subTreePropertyName
     * @param {String} property
     * @param {*} value
     * @param {AnswerForGetObjectFromTree} [objectForAnswer]
     * @returns {*}
     */
    a9.getObjectFromTree = function(tree, subTreePropertyName, property, value, objectForAnswer){
        var i = 0,
            iMax = tree.length,
            result,
            _getObjectFromTreeAnswer = objectForAnswer || answerForGetObjectFromTree;
        for (; i < iMax; i += 1){
            if (tree[i][property] === value){
                _getObjectFromTreeAnswer.collection = tree;
                _getObjectFromTreeAnswer.index = i;
                _getObjectFromTreeAnswer.searchableObject = tree[i];
                return _getObjectFromTreeAnswer;
            }
            if (subTreePropertyName in tree[i]){
                result = a9.getObjectFromTree(tree[i][subTreePropertyName], subTreePropertyName, property, value, _getObjectFromTreeAnswer);
                if (result !== null){
                    return result;
                }
            }
        }
        return null;
    };

}(A9));

/**
 * Обект через который можно задавать чистый цсс
 * @type {A9.pureCSS}
 *     A9.pureCSS = {
 *         /**
 *          * Создаёт таблицу стилей
 *          * @returns {HTMLElement} таблица стилей
 *         createSheet: function(){}
 *         /**
 *          * Вставляет одно правило в таблицу стилей (некоторый внутренний метод выданный на ружу для продвинутого использованя)
 *          * @param {HTMLElement} sheet таблица стилей
 *          * @param {String} css строка правил вида '.myClass{background: #f00;border:1px solid #000}'
 *          * @param {Number} index индекс
 *         rule: function(sheet, css, index){}
 *         /**
 *          * Вставляет в умолчалную таблицу стилей цсс стили
 *          * @param {String} css строка правил вида '.myClass{background: #f00;border:1px solid #000}'
 *          * @param {String} css [option] строка правил вида '.myClass{background: #f00;border:1px solid #000}'
 *          * ...
 *          * @param {String} css [option] строка правил вида '.myClass{background: #f00;border:1px solid #000}'
 *         add: function(css, css, css, ...){}
 *     }
 */
A9.pureCSS = function(){
    var pureCSS = {
            createSheet: null,
            rule: null,
            add: null
        },
        head = (document.head || document.getElementsByTagName('head')[0]),
        styleTag,
        sheet,
        rule = -1,
        i = 0,
        iMax;
    pureCSS.createSheet = function(){
        styleTag = document.createElement('style');
//        styleTag.appendChild(document.createTextNode(''));
        styleTag.setAttribute('type', 'text/css');
        head.appendChild(styleTag);
        return  styleTag.sheet || styleTag.styleSheet;
    };
    sheet = pureCSS.createSheet();
    pureCSS.rule = typeof sheet.insertRule === 'function' ?
        function(sheet, css, index){
            sheet.insertRule(css, index);
        } : function(sheet, css, index){
            sheet.addRule(css.substring(0, css.indexOf('{')), css.substring(css.indexOf('{') + 1, css.indexOf('}')), index);
        };
    pureCSS.add = function(css){
        for (i = 0, iMax = arguments.length; i < iMax ; i += 1){
            rule += 1;
            pureCSS.rule(sheet, arguments[i], rule);
        }
    };
    return pureCSS;
}();

(function(global, a9){
    a9.router = function(externalLinks, externalLinksCallbackPath, isByHash, onChange){
        var location = global.location,
            history = global.history,
            staticPath = location.protocol + '//' + location.host,
            staticPathLength = staticPath.length,
            historyObject = {
                note: null,
                path: '/'
            },
            pathCache = [],
            strPathCache = '',
            hrefCache,
            checkCache,
            links,
            linkPath,
            i,
            j,
            jMax,
            isFromLink = false,
            isNotFromLoad = true,
            setAddress,
            router = {
                onChange: onChange || [],
                set: null,
                get: function(){
                    return pathCache;
                },
                linksForRouter: function(node){
                    links = a9.$tn('a', node);
                    for (i = links.length; i-- ;){
                        router.linkForRouter(links[i]);
                    }
                    links = i = null;
                },
                linkForRouter: function(link){
                    // TODO разобраться с событиями и для тача
                    link.onclick = linkForRouter;
                    return link;
                }
            },
            u;

        if ((isByHash === true)
            || !(
                ('history' in global)
                && ('onpopstate' in global)
                && ('pushState' in history)
            )){
            checkCache = location.href.substr(staticPathLength + 1);
            if (checkCache.indexOf('#') !== 0){
                location.href = staticPath + '#/' + checkCache;
            }
            checkCache = staticPathLength + 2;
            setAddress = function(path){
                location.hash = path;
            };
            function checkPath(){
                if (hrefCache !== location.href){
                    hrefCache = location.href;
                    if (isFromLink){
                        isFromLink = false;
                    } else{
                        parseState(location.href.substr(checkCache));
                    }
                }
            }
            checkPath();
            a9.repeatedInspections.add(checkPath);
        } else{
            checkCache = location.href.substr(staticPathLength + 1);
            if (checkCache.indexOf('#') === 0){
                location.href = staticPath + checkCache.substr(1);
            }
            setAddress = function(path, note){
                historyObject.note = note = note || new Date().getTime().toString();
                historyObject.path = path;
                history.pushState(historyObject, note, path);
            };
            if (a9.deviceInfo.isWebKit){
                global.addEventListener('load', function(){
                    isNotFromLoad = false;
                });
            }
            function popState(){
                if (isNotFromLoad){
                    parseState(location.href.substr(staticPathLength));
                } else{
                    isNotFromLoad = true;
                }
            }
            global.addEventListener('popstate', popState);
            popState();
            checkCache = null;
        }

        router.set = function(){
            var path = '/' + a9.joinArgs(arguments, '/');
            setAddress(path);
            parseState(path);
        };

        function parseState(path){
            strPathCache = path;
            a9.split(path, '/', pathCache);
            pathCache.shift();
            if (pathCache[pathCache.length - 1] === ''){
                pathCache.pop();
            }
            jMax = router.onChange.length;
            if (jMax > 0){
                for (j = 0; j < jMax; j += 1){
                    router.onChange[j].apply(router, pathCache);
                }
            }
            jMax = j = path = null;
        }

        externalLinks = externalLinks || '/auth/';
        externalLinksCallbackPath = externalLinksCallbackPath || '?callback=';

        function toLink(link, path, trueLink){
            if (path.indexOf(trueLink) === 0){
                location.href = link.href + externalLinksCallbackPath + strPathCache;
            } else{
                isFromLink = path !== strPathCache;
                setAddress(path, link.getAttribute('data-history'));
                parseState(path);
            }
        }

        function linkForRouter(e){
            if (e === u){
                global.event.returnValue = false;
            } else{
                e.preventDefault();
            }
            linkPath = this.href.substr(staticPathLength);
            if (a9.isArray(externalLinks)){
                for (i = externalLinks.length; i-- ;){
                    toLink(this, linkPath, externalLinks[i]);
                }
            } else{
                toLink(this, linkPath, externalLinks);
            }
        }
        return router;
    };
}(this, A9));
(function(win, a9){
    var stickyCSSClass = 'isSticky',
        doc = document;

    a9.sticky = function($element){
        var origOffsetY = a9.getPositionY($element);

        function onScroll(e) {
            if(win.scrollY >= origOffsetY){
                a9.addClass($element, stickyCSSClass);
            } else{
                a9.removeClass($element, stickyCSSClass);
            }
        }

        a9.addEvent(doc, 'scroll', onScroll);
    };
}(window, A9));

//todo to normal component
//todo checkY method
//todo check header or footer needs by classes
(function(global, a9){
    /**
     * приклеивающиеся панели
     * @param {HTMLElement} $rootNode элемент внутри которого панели (от него будет считаться)
     * @param {Boolean} isDoInit
     * @param {String} headerFixedCSSClass
     * @param {String} footerFixedCssClass
     * @returns {{init: init, calculate: calculate}}
     */
    a9.stickyPanels = function($rootNode, isDoInit, headerFixedCSSClass, footerFixedCssClass){
        var window = global,
            $html = window.document.documentElement,
            rootY,
            paymentWizardHeight,
            viewPortHeight,
            scrollTop,
            footerFixedY,
            isInit = false;

        function processingPaymentWizardY(){
            footerFixedY = rootY + paymentWizardHeight - viewPortHeight;
        }

        function calculate(){
            if (!isInit){
                viewPortHeight = a9.viewportHeight();
                isInit = true;
            }
            rootY = a9.getPositionY($rootNode);
            paymentWizardHeight = $rootNode.offsetHeight;
            scrollTop = window.scrollY;
            processingPaymentWizardY();
            checkFixedPanels();

        }

        function checkHeaderFixed(){
            if (scrollTop >= rootY){
                a9.addClass($rootNode, headerFixedCSSClass);
            } else{
                a9.removeClass($rootNode, headerFixedCSSClass);
            }
        }

        function checkFooterFixed(){
            if (scrollTop <= footerFixedY){
                a9.addClass($rootNode, footerFixedCssClass);
            } else{
                a9.removeClass($rootNode, footerFixedCssClass);
            }
        }

        function checkFixedPanels(){
            checkHeaderFixed();
            checkFooterFixed();
        }

        a9.addEvent(window, 'scroll', function(){
            if(a9.deviceInfo.isIE)
            {
                scrollTop = window.pageYOffset;
            }
            else
            {
                scrollTop = window.scrollY;
            }
            checkFixedPanels();
        });

        function resizeWindow(){
            viewPortHeight = a9.viewportHeight();
            calculate();
        }

        a9.addEvent(window, 'resize', resizeWindow);


        if (isDoInit === true){
            calculate();
        }

        return {
            calculate: calculate
        };

    };
}(this, A9));

/**
 * Объект для работы с localStorage
 * В случае отсутсвия поддержки localStorage подхватывает cookie
 * @type {A9.storage}
 * A9.storage = {
 *     /**
 *      * Задать значение storage
 *      * @param {String} name имя
 *      * @param {String} value значение
 *     set: function(object, position){}
 *     /**
 *      * Получить значение storage
 *      * @param {String} name имя свойства
 *      * @return {String|null}
 *     get: function(name){}
 *     /**
 *      * Удалить значение storage
 *      * @param {String} name имя свойства
 *     remove: function(name){}
 * }
 */
(function(global, a9){
    var storage,
        _localStorage = global.localStorage,
        u;
    if (_localStorage !== u){
        storage = {
            set: function(name, value){
                try {
                    _localStorage.setItem(name, value);
                } catch(e){
                    if (e === 'QUOTA_EXCEEDED_ERR') {
                        a9.generateCustomEvent(storage, 'storageIsFull');
                    }
                }
            },
            get: function(name){
                return _localStorage.getItem(name);
            },
            remove: function(name){
                _localStorage.removeItem(name);
            }
        }
    } else{
        storage = {
            set: a9.cookie.set,
            get: a9.cookie.get,
            remove: a9.cookie.remove,
        }
    }
    A9.storage = storage;
}(this, A9));
(function(a9){
    var defaultResultContainer;

    function SubstrDiffObject(){
        var substrDiffObject = this;
        substrDiffObject.type = '';
        substrDiffObject.str1Diff = '';
        substrDiffObject.str2Diff = '';
        substrDiffObject.diffStart = 0;
    }

    a9.createSubstrDiffObject = function(){
        return new SubstrDiffObject();
    };

    defaultResultContainer = a9.createSubstrDiffObject();

    /**
     * простейший diff который ищет разницу потсроки
     * @param {String} str1
     * @param {String} str2
     * @param {Object} [containerForResult]
     * @returns {SubstrDiffObject}
     */
    a9.substrDiff = function(str1, str2, containerForResult){
        var str1Length = str1.length,
            str2Length = str2.length,
            isFirstBig,

            i,
            iMax,
            diffStart,

            j,
            str1DiffEnd,
            str2DiffEnd,

            str1Diff,
            str2Diff,

            lastCheckedCharIndex,

            result = containerForResult || defaultResultContainer;

        if (str1 === str2){
            result.type = 'none';
            result.str1Diff = '';
            result.str2Diff = '';
            result.diffStart = 0;
        } else if (str1Length === 0){
            result.type = 'add';
            result.str1Diff = '';
            result.str2Diff = str2;
            result.diffStart = 0;
        } else if (str2Length === 0){
            result.type = 'remove';
            result.str1Diff = str2;
            result.str2Diff = '';
            result.diffStart = 0;
        } else{
            isFirstBig = str1Length >= str2Length;

//          check start diff
            i = 0;
            iMax = isFirstBig ? str1Length : str2Length;
            for (; i < iMax; i += 1){
                if (str1.charAt(i) !== str2.charAt(i)){
                    diffStart = i;
                    break;
                }
            }

            if (diffStart === 0){
                if (isFirstBig){
                    str1DiffEnd = str1.indexOf(str2);
                    str2DiffEnd = 0;
                } else{
                    str1DiffEnd = 0;
                    str2DiffEnd = str2.indexOf(str1);
                }
            } else{
                i = str1Length;
                j = str2Length;
                lastCheckedCharIndex = diffStart - 1;

//              check end diff
                if (isFirstBig){
                    for (;i !== 0; i--, j--){
                        if ((j === lastCheckedCharIndex)
                                || (str1.charAt(i) !== str2.charAt(j))){
                            str1DiffEnd = i + 1;
                            str2DiffEnd = j + 1;
                            break;
                        }
                    }
                } else{
                    for (;j !== 0; j--, i--){
                        if ((i === lastCheckedCharIndex)
                                || (str1.charAt(i) !== str2.charAt(j))){
                            str1DiffEnd = i + 1;
                            str2DiffEnd = j + 1;
                            break;
                        }
                    }
                }

            }

//          processing result
            str1Diff = str1.substring(diffStart, str1DiffEnd);
            str2Diff = str2.substring(diffStart, str2DiffEnd);

            result.str1Diff = str1Diff;
            result.str2Diff = str2Diff;
            result.diffStart = diffStart;

            if (str1Diff === ''){
                result.type = 'add';
            } else if (str2Diff === ''){
                result.type = 'remove';
            } else{
                result.type = 'replace';
            }

        }

        return result;

    }
}(A9));

(function(a9){
    var u;

    a9.str_firstUpper = function(str){
        return str.charAt(0).toUpperCase() + str.substr(1);
    };

    a9.str_expireDate = function(mounth, year){
        return (mounth < 10 ? '0' + mounth : mounth) + '/' + year.toString().substr(2);
    };

    a9.str_cardsMask = function(number){
        return number.substr(0, 3) + '• •••• •••• •' + number.substr(13);
    };

    a9.str_cardsNameToType = function(cardName){
        return cardName.toLowerCase().split(' ').join('-');
    };

    if ('trim' in String){
        a9.str_trim = function(str){
            return str.trim();
        };
    } else{
        a9.str_trim = function(str){
            return str.replace(/^\s+|\s+$/g, '');
        };
    }

    /**
     *
     * @param {String} str — string with keys in {}
     * @param {Object|String|Number} data — mergemap || mergeValue
     * @returns {String} merged str
     */
    a9.supplant = function(str, data){
        return str.replace(
            /{([^{}]*)}/g,
            function (replacedSubstr, key){
                var result;
                if ((typeof data === 'string') || (typeof data === 'number')){
                    return data;
                } else{
                    result = data[key];
                    return (typeof result === 'string') || (typeof result === 'number') ? result : replacedSubstr;
                }
            }
        );
    };


    var str_indexOfOfCollectionResult = {
        isHasIndex: false,
        indexInString: 0,
        indexInList: 0
    };

    /**
     * Находит индекс первой подходящей подстроки относительно строки
     * @param {String} string строка в которой нужно искать подстроки
     * @param {Array} list список подстрок
     * @param {Object} [resultContainer] контейнер для результата
     * @returns {*|{isHasIndex: boolean, indexOfString: number, indexInList: number}}
     */
    a9.str_indexOfOfList = function(string, list, resultContainer){
        var result = resultContainer || str_indexOfOfCollectionResult,
            indexOf,
            i = 0,
            iMax = list.length,
            isHasIndex = false;
        for (; i < iMax; i += 1){
            indexOf = string.indexOf(list[i]);
            if (indexOf !== -1){
                isHasIndex = true;
                result.indexInString = indexOf;
                result.indexInList = i;
                break;
            }
        }
        result.isHasIndex = isHasIndex;
        return result;
    };


    /**
     * Аналог метода split строки, работает с переданным массивом, !не делая копии массива!, если массив не передан,
     * создаётся новый массив
     * Использовать в местах критичных к памяти
     * @param {String} str
     * @param {String} separator
     * @param {Array} [array]
     * @return {Array} array
     */
    a9.split = function(str, separator, array){
        var i,
            j,
            iMax,
            separatorLength,
            u;
        if (array === u){
            array = [];
        } else{
            array.length = 0;
        }
        i = 0;
        iMax = str.length;
        if ((separator === u) || (separator === '')){
            for (; i < iMax; i += 1){
                array[i] = str.charAt(i);
            }
        } else{
            j = 0;
            array[0] = '';
            separatorLength = separator.length;
            if (separatorLength === 1){
                for (; i < iMax; i += 1){
                    if (str.charAt(i) === separator){
                        j += 1;
                        array[j] = '';
                    } else{
                        array[j] += str.charAt(i);
                    }
                }
            } else{
                for (; i < iMax; i += 1){
                    if (str.substr(i, separatorLength) === separator){
                        j += 1;
                        i += separatorLength - 1;
                        array[j] = '';
                    } else{
                        array[j] += str.charAt(i);
                    }
                }
            }
        }
        return array;
    }

})(A9);
(function(global, a9){
    var viewportHeight,
        viewportWidth,
        $domElementCache,
        isInit = false;

    function init(){
        var document;
        if ('innerHeight' in global){
            viewportHeight = function(){
                return global.innerHeight;
            };
            viewportWidth = function(){
                return global.innerWidth;
            };
        } else{
            document = global.document;
            $domElementCache = document.documentElement;
            if (('clientHeight' in $domElementCache) && ($domElementCache.clientHeight !== 0)){
                viewportHeight = function(){
                    return $domElementCache.clientHeight;
                };
                viewportWidth = function(){
                    return $domElementCache.clientWidth;
                };
            } else{
                $domElementCache = document.body;
                viewportHeight = function(){
                    return $domElementCache.clientHeight;
                };
                viewportWidth = function(){
                    return $domElementCache.clientWidth;
                };
            }
        }
        isInit = true;
    }

    /**
     * Возращает высоту вьюпорта
     * @return {Number} size height viewport
     */
    a9.viewportHeight = function() {
        if (!isInit){
            init();
        }
        return viewportHeight();
    };

    /**
     * Возращает ширину вьюпорта
     * @return {Number} size width viewport
     */
    a9.viewportWidth = function(){
        if (!isInit){
            init();
        }
        return viewportWidth();
    };

}(this, A9));

(function (a9) {
    a9.imageSlider = function (object, options) {
        var $prevButton,
            $nextButton,
            callBackValueChange,
            $images,
            selectedIndex = 0,
            eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
            CSSPrevButton = 'slider-prev-button',
            CSSNextButton = 'slider-next-button';

        var onPrevButtonClick = function () {
            if (selectedIndex == 0) {
                selectedIndex = $images.length - 1;
            } else {
                selectedIndex--;
            }
            applyValue();
            if(callBackValueChange) {
                callBackValueChange();
            }
        };


        var onNextButtonClick = function () {
            if (selectedIndex == $images.length - 1) {
                selectedIndex = 0;
            } else {
                selectedIndex++;
            }
            applyValue();
            if(callBackValueChange) {
                callBackValueChange();
            }
        };

        var applyValue = function () {
            for (var i = 0; i < $images.length; i++) {
                a9.removeClass($images[i], 'active');
            }
            a9.addClass($images[selectedIndex], 'active');
        };

        $prevButton = a9.$c(CSSPrevButton, object)[0];
        $nextButton = a9.$c(CSSNextButton, object)[0];
        $images = a9.$tn('img', object);

        if (options && options.callBackValueChange) {
            callBackValueChange = options.callBackValueChange;
        }

        a9.addEvent($prevButton, eventOnPointerEnd, onPrevButtonClick);
        a9.addEvent($nextButton, eventOnPointerEnd, onNextButtonClick);
    }
})(A9);
(function(global){
    var awareness,
        checkingErrors = {},
        arrayIndexOf;

    arrayIndexOf = ('indexOf' in Array) || ('indexOf' in Array.prototype) ?
        function(array, element){
            return array.indexOf(element);
        }
        : function(array, element){
            for (var i = array.length; i-- ;){
                if (array[i] === element){
                    return i;
                }
            }
            return -1;
        };

    function slice(array, index){
        var length = array.length - 1,
            i = index;
        for (; i < length; i += 1){
            array[i] = array[i + 1];
        }
    }

    function ErrorConstructor(domain, code, description, data){
        var error = this,
            u;
        error.domain = domain;
        error.code = code;
        if ((description !== u) && (typeof description !== 'string')){
            error.description = u;
            error.data = description;
        } else{
            error.description = description;
            error.data = data || null;
        }
    }

    function checking(domain, code, description, data){
        var i,
            iMax,
            u,
            checkFns,
            checkData,
            result,
            _result;
        if (checkingErrors[0] !== u){
            checkFns = checkingErrors[0].fns;
            checkData = checkingErrors[0].data;
            for (i = 0, iMax = checkFns.length; i < iMax; i += 1){
                _result = checkFns[i](domain, code, description, data, checkData[i]);
                if (_result !== u){
                    result = _result;
                }
            }
        }

        if (domain in checkingErrors){
            checkFns = checkingErrors[domain].fns;
            checkData = checkingErrors[domain].data;
            for (i = 0, iMax = checkFns.length; i < iMax; i += 1){
                _result = checkFns[i](code, description, data, checkData[i]);
                if (_result !== u){
                    result = _result;
                }
            }
        }

        return result;
    }

    global.AWARENESS = awareness = {

        error: function(domain, code, description, data){
            var error = checking(domain, code, description, data);
            if (!awareness.isError(error)){
                error = new ErrorConstructor(domain, code, description, data);
            }
            return error;
        },

        addErrorCheck: function(domain, checkingFunction, checkingFunctionData){
            if (domain in checkingErrors){
                checkingErrors[domain].fns.push(checkingFunction);
                checkingErrors[domain].data.push(checkingFunctionData);
            } else{
                checkingErrors[domain] = {
                    fns: [checkingFunction],
                    data: [checkingFunctionData]
                }
            }
        },

        removeErrorCheck: function(domain, checkingFunction, checkingFunctionData){
            var index,
                fns;
            if (domain in checkingErrors){
                fns = checkingErrors[domain].fns;
                index = arrayIndexOf(fns, checkingFunction);
                if (index !== -1){
                    if (fns.length === 1){
                        delete checkingErrors[domain];
                    } else{
                        slice(fns, index);
                        slice(checkingErrors[domain].data, index);
                    }
                }
            }
        },

        isError: function(verifiable){
            return verifiable instanceof ErrorConstructor;
        }
    };

}(this));
/**
 * @name faith
 * @version 0.1.12
 * @description faith — JavaScript promises library
 * @license MIT (license.txt)
 * @author Dmitry Makhnev, SoftWearFinance LLC
 * © SoftWearFinance LLC (http://softwearfinance.com/), Dmitry Makhnev (https://github.com/DmitryMakhnev)
 */

//todo support http://promises-aplus.github.io/promises-spec/#point-39, but why?

(function(global){
    var faith,
        isArray,
        u;

    if (global.Array.isArray !== u){
        isArray = function(object){
            return global.Array.isArray(object);
        }
    } else{
        isArray = function(object){
            return global.Object.prototype.toString.call(object) === '[object Array]';
        }
    }

    /**
     * Promise constructor
     * @param {*} [value] start promise value
     * @param {Boolean} [isNotNeedTick] flag ignore http://promises-aplus.github.io/promises-spec/#point-39
     * @constructor
     */
    function Promise(value, isNotNeedTick){
        var promise = this;

        promise.value = value;
        promise.ctx = null;

        promise.isNotNeedTick = isNotNeedTick;

        promise.isFulfilled = false;
        promise.isRejected = false;
        promise.isResolved = false;

        // packing flat groups |isThenCallback (0), cb, ctx|, |isNotThenCallback (1), cb, data, ctx|, | isEmptyGroup (2)|
        promise._onFulfill = [];
        // packing flat groups |isThenCallback (0), cb, ctx|, |isNotThenCallback (1), cb, data, ctx|, | isEmptyGroup (2)|
        promise._onReject = [];

        promise._nextPromise = null;
    }


    Promise.prototype = {
        /**
         * add callback on change state
         * @param {Function} [onFulfilled] callback on fulfill (first parameter is promise value)
         * @param {Function} [onRejected] callback on reject (first parameter is promise value)
         * @param {*} [ctx] context for onFulfilled and onRejected
         * @returns {Promise}
         */
        then: function(onFulfilled, onRejected, ctx){
            var promise = this,
                isHasReject = (onRejected !== u);

            if ((typeof onRejected !== 'function') && isHasReject){
                ctx = onRejected;
                isHasReject = false;
            }

            if (promise.isResolved &&
                (promise._nextPromise !== null)){
                promise = promise._nextPromise;
                promise.then(onFulfilled, onRejected, ctx);
                return promise;
            }

            //work with fulfill
            if (!promise.isRejected){
                if (promise.isResolved){
                    if (onFulfilled !== u){
                        callThenCallback(promise, onFulfilled, ctx);
                    }
                } else if (onFulfilled !== u){
                    promise._onFulfill.push(0, onFulfilled, ctx);
                } else{
                    promise._onFulfill.push(2);
                }
            }

            //work with reject
            if (!promise.isFulfilled){
                if (promise.isResolved){
                    if (isHasReject){
                        callThenCallback(promise, onRejected, ctx);
                    }
                } else if (isHasReject){
                    promise._onReject.push(0, onRejected, ctx);
                } else{
                    promise._onReject.push(2);
                }
            }


            return promise;
        },

        /**
         * add callback on change state with data
         * @param {Function} [onFulfilled] callback on fulfill (first parameter is promise value)
         * @param {Function} [onRejected] callback on reject (first parameter is promise value)
         * @param {*} [data] second parameter for onFulfilled and onRejected
         * @param {*} [ctx] context for onFulfilled and onRejected
         * @returns {Promise}
         */
        thenWithData: function(onFulfilled, onRejected, data, ctx){
            var promise = this,
                isHasReject = (onRejected !== u);

            if ((typeof onRejected !== 'function') && isHasReject){
                ctx = data;
                data = onRejected;
                isHasReject = false;
            }

            if (promise.isResolved &&
                (promise._nextPromise !== null)){
                promise = promise._nextPromise;
                promise.thenWithData(onFulfilled, onRejected, data, ctx);
                return promise;
            }

            //work with fulfill
            if (!promise.isRejected){
                if (promise.isResolved){
                    if (onFulfilled !== u){
                        callThenWithDataCallback(promise, onFulfilled, data, ctx);
                    }
                } else if (onFulfilled !== u){
                    promise._onFulfill.push(1, onFulfilled, data, ctx);
                } else{
                    promise._onFulfill.push(2);
                }
            }

            //work with reject
            if (!promise.isFulfilled && isHasReject){
                if (promise.isResolved){
                    if (isHasReject){
                        callThenWithDataCallback(promise, onRejected, data, ctx);
                    }
                } else if (isHasReject){
                    promise._onReject.push(1, onRejected, data, ctx);
                } else{
                    promise._onReject.push(2);
                }
            }

            return promise;
        },

        /**
         * add callback on done
         * @param {Function} onDone callback on resolved (first parameter is promise value)
         *      (add to then onFulfill and onReject stack)
         * @param {*} [ctx] context for onDone
         * @returns {Promise}
         */
        done: function(onDone, ctx){
            return this.then(onDone, onDone, ctx);
        },

        /**
         * add callback on done with data
         * @param {Function} onDone callback on resolved (first parameter is promise value)
         *      (add to then onFulfill and onReject stack)
         * @param {*} [data] second parameter for onDone
         * @param {*} [ctx] context for onDone
         * @returns {Promise}
         */
        doneWithData: function(onDone, data, ctx){
            return this.thenWithData(onDone, onDone, data, ctx);
        },

        /**
         * fulfill promise
         * @param {*} [value] promise value
         * @returns {Promise}
         */
        fulfill: function(value){
            var promise = this;
            if (!promise.isResolved){
                promise.value = value || promise.value;
                promise.isResolved = promise.isFulfilled = true;
                callCallbacks(promise, promise._onFulfill);
                promise._onFulfill = promise._onReject = u;
            }
            return promise;
        },

        /**
         * fulfill promise
         * @param {*} [error] promise error value
         * @returns {Promise}
         */
        reject: function(error){
            var promise = this;
            if (!promise.isResolved){
                promise.value = error || promise.value;
                promise.isResolved = promise.isRejected = true;
                callCallbacks(promise, promise._onReject);
                promise._onFulfill = promise._onReject = u;
            }
            return promise;
        },

        destructor: function(){
//                    todo
        }

    };

    function callThenCallback(promise, callback, ctx){
        // todo 2.2.4 http://promises-aplus.github.io/promises-spec/#point-39
        if (promise.isNotNeedTick){
        }
        return callback.call(ctx || promise, promise.value);
    }
    
    function callThenWithDataCallback(promise, callback, data, ctx){
        // todo 2.2.4 http://promises-aplus.github.io/promises-spec/#point-39
        if (promise.isNotNeedTick){
        }
        return callback.call(ctx || promise, promise.value, data);
    }

    function callCallbacks(promise, callbacksData){
        var i = 0,
            iMax = callbacksData.length,
            result,
            group = 1;

        while (i < iMax){
            switch (callbacksData[i]){
                case 0:
                    result = callThenCallback(promise, callbacksData[i + 1], callbacksData[i + 2]);
                    i += 3;
                    break;
                case 1:
                    result = callThenWithDataCallback(promise, callbacksData[i + 1], callbacksData[i + 2], callbacksData[i + 3]);
                    i += 4;
                    break;
                case 2:
                    i += 1;
                    break;
            }
            group += 1;
            if (faith.isPromise(result)){
                promise._nextPromise = result;
                if (i !== iMax){
                    moveCallbacksToNewPromise(promise, result, group)
                }
                break;
            }
        }
    }

    function moveCallbacksToNewPromise(promiseFrom, promiseTo, group){
        var onFulfillCollection = promiseFrom._onFulfill,
            onRejectCollection = promiseFrom._onReject,
            onFulfill,
            onReject,
            ctx,
            data,
            currentGroup = 1,
            i = 0,
            j = 0,
            iMax = onFulfillCollection.length,
            isFulfillEmpty = false,
            isWithData = false;
        while (i < iMax){
            isFulfillEmpty = false;
            isWithData = false;
            switch (onFulfillCollection[i]){
                case 0:
                    onFulfill = onFulfillCollection[i + 1];
                    ctx = onFulfillCollection[i + 2];
                    i += 3;
                    isFulfillEmpty = false;
                    isWithData = false;
                    break;
                case 1:
                    onFulfill = onFulfillCollection[i + 1];
                    data = onFulfillCollection[i + 2];
                    ctx = onFulfillCollection[i + 3];
                    i += 4;
                    isFulfillEmpty = false;
                    isWithData = true;
                    break;
                case 2:
                    i += 1;
                    isFulfillEmpty = true;
                    break;
            }
            switch (onRejectCollection[j]){
                case 0:
                    onReject = onRejectCollection[j + 1];
                    if (isFulfillEmpty){
                        ctx = onRejectCollection[j + 2];
                    }
                    j += 3;
                    isWithData = false;
                    break;
                case 1:
                    onReject = onRejectCollection[j + 1];
                    if (isFulfillEmpty){
                        ctx = onRejectCollection[j + 2];
                        data = onRejectCollection[j + 3];
                    }
                    j += 4;
                    isWithData = true;
                    break;
                case 2:
                    j += 1;
                    break;
            }
            if (currentGroup >= group){
                if (isWithData){
                    console.log(onFulfill, onReject, data, ctx);
                    promiseTo.thenWithData(onFulfill, onReject, data, ctx);
                } else{
                    console.log(onFulfill, onReject, ctx);
                    promiseTo.then(onFulfill, onReject, ctx);
                }
            }
            currentGroup += 1;
        }
            
    }

    /**
     * promise wrapper for some promises
     * @param {Array|arguments} promises promises collection
     * @param {Boolean} [isNotNeedTick] flag ignore http://promises-aplus.github.io/promises-spec/#point-39
     * @constructor
     */
    function Believe(promises, isNotNeedTick){
        var believe = this,
            i = 0,
            size = promises.length,
            believeValue = [];

        believeValue.length = size;
        believe.value = believeValue;
        believe.promises = promises;
        believe.ctx = null;

        believe.isFulfilled = false;
        believe.isRejected = false;
        believe.isResolved = false;

        believe._size = size;
        believe._hasRejected = false;
        believe._promise = new Promise(believeValue, isNotNeedTick);

        for (; i < size; i += 1){
            promises[i].thenWithData(believePromiseFulfill, believePromiseReject, i, believe);
        }
    }

    function believePromiseFulfill(value, promiseIndex){
        var believe = this;
        believe.value[promiseIndex] = believe.promises[promiseIndex].value;
        if ((believe._size -= 1) === 0){
            believeResolve(believe);
        }
    }

    function believePromiseReject(value, promiseIndex){
        var believe = this;
        believe._hasRejected = true;
        believe.value[promiseIndex] = believe.promises[promiseIndex].value;
        if ((believe._size -= 1) === 0){
            believeResolve(believe);
        }
    }

    function believeResolve(believe){
        believe.isResolved = true;
        if (believe._hasRejected){
            believe.isRejected = true;
            believe._promise.reject(believe.value);
        } else{
            believe.isFulfilled = true;
            believe._promise.fulfill();
        }
    }

    /**
     * promise wrapper for some promises
     * @param {Object} promisesObject promises hash table
     * @param {Boolean} [isNotNeedTick] flag ignore http://promises-aplus.github.io/promises-spec/#point-39
     * @constructor
     */
    function BelieveOfObject(promisesObject, isNotNeedTick){
        var believe = this,
            believeValue = {},
            p;

        believe.value = believeValue;
        believe.promises = promisesObject;
        believe.ctx = null;

        believe.isFulfilled = false;
        believe.isRejected = false;
        believe.isResolved = false;

        believe._size = 0;
        believe._isPromissesProcessed = false;
        believe._hasRejected = false;
        believe._promise = new Promise(believeValue, isNotNeedTick);

        for (p in promisesObject){
            believe._size += 1;
            believeValue[p] = promisesObject[p].value;
            promisesObject[p].thenWithData(believeOfObjectOnFulfill, believeOfObjectOnReject, p, believe);
        }

        if (believe._size === 0){
            believeResolve(believe);
        } else{
            believe._isPromissesProcessed = true;
        }

    }

    function believeOfObjectOnFulfill(value, p){
        var believe = this;
        believe.value[p] = believe.promises[p];
        if (((believe._size -= 1) === 0) && believe._isPromissesProcessed){
            believeResolve(believe);
        }
    }

    function believeOfObjectOnReject(value, p){
        var believe = this;
        believe._hasRejected = true;
        believe.value[p] = believe.promises[p];
        if (((believe._size -= 1) === 0) && believe._isPromissesProcessed){
            believeResolve(believe);
        }
    }


    BelieveOfObject.prototype = Believe.prototype = {
        /**
         * add callback on change state
         * @param {Function} [onFulfilled] callback on fulfill (first parameter is promise value)
         * @param {Function} [onRejected] callback on reject (first parameter is promise value)
         * @param {*} [ctx] context for onFulfilled and onRejected
         * @returns {Promise}
         */
        then: function(onFulfilled, onRejected, ctx){
            var believe = this;
            believe._promise.then(onFulfilled, onRejected, ctx || believe);
            return believe;
        },

        /**
         * add callback on change state with data
         * @param {Function} [onFulfilled] callback on fulfill (first parameter is promise value)
         * @param {Function} [onRejected] callback on reject (first parameter is promise value)
         * @param {*} [data] second parameter for onFulfilled and onRejected
         * @param {*} [ctx] context for onFulfilled and onRejected
         * @returns {Promise}
         */
        thenWithData: function(onFulfilled, onRejected, data, ctx){
            var believe = this;
            if ((onRejected !== u) && (typeof onRejected !== 'function')){
                ctx = data;
                data = onRejected;
                onRejected = u;
            }
            believe._promise.thenWithData(onFulfilled, onRejected, data, ctx || believe);
            return believe;
        },

        /**
         * add callback on done
         * @param {Function} onDone callback on resolved (first parameter is promise value)
         *      (add to then onFulfill and onReject stack)
         * @param {*} [ctx] context for onDone
         * @returns {Promise}
         */
        done: function(onDone, ctx){
            var believe = this;
            believe._promise.done(onDone, ctx || believe);
            return believe;
        },

        /**
         * add callback on done with data
         * @param {Function} onDone callback on resolved (first parameter is promise value)
         *      (add to then onFulfill and onReject stack)
         * @param {*} [data] second parameter for onDone
         * @param {*} [ctx] context for onDone
         * @returns {Promise}
         */
        doneWithData: function(onDone, data, ctx){
            var believe = this;
            believe._promise.doneWithData(onDone, data, ctx || believe);
            return believe;
        },

        destructor: function(){
//            todo
        }
    };

    global.FAITH = faith = {
        version: '0.1.9',

        /**
         * create promise
         * @param {*} [value] promise value
         * @returns {Promise}
         */
        promise: function(value){
            return new Promise(value, false);
        },

        /**
         * create promise without tick
         * @param {*} [value] promise value
         * @returns {Promise}
         */
        promiseNT: function(value){
            return new Promise(value, true);
        },

        /**
         * test verifiable on promise
         * @param {*} verifiable
         * @returns {boolean} isPromise
         */
        isPromise: function(verifiable){
            return verifiable instanceof Promise;
        },

        /**
         * create believe
         * believe is promise wrapper for some promises
         * @param {promise|Object|Array} promise
         * @returns {Believe}
         */
        believe: function(promise){
            if (faith.isPromise(promise)){
                return new Believe(arguments, false);
            } else if (isArray(promise)){
                return new Believe(promise, false);
            }
            return new BelieveOfObject(promise, false);
        },

        /**
         * create believe without tick
         * believe is promise wrapper for some promises
         * @param {promise|Object|Array} promise
         * @returns {Believe}
         */
        believeNT: function(promise){
            if (faith.isPromise(promise)){
                return new Believe(arguments, true);
            } else if (isArray(promise)){
                return new Believe(promise, true);
            }
            return new BelieveOfObject(promise, true);
        },

        /**
         * test verifiable on believe
         * @param {*} verifiable
         * @returns {boolean} isBelieve
         */
        isBelieve: function(verifiable){
            return (verifiable instanceof Believe)
                || (verifiable instanceof BelieveOfObject);
        },

        /**
         * test verifiable on promise or believe
         * @param {*} verifiable
         * @returns {boolean} isPromiseOrBelieve
         */
        isThenable: function(verifiable){
            return faith.isPromise(verifiable)
                || faith.isBelieve(verifiable);
        }

    };
}(this));
/**
 * @name cnCt
 * @version 0.0.3
 * @description cnCt — JavaScript client template engine
 * @license MIT (license.txt)
 * @author Dmitry Makhnev, SoftWearFinance LLC
 * © SoftWearFinance LLC (http://softwearfinance.com/), Dmitry Makhnev (https://github.com/DmitryMakhnev)
 */

(function(_window, _document){
    var cnCt,
        _templatesList,
        isIE = _window.A9.deviceInfo.isIE,
        u,
        abstractDIV = _document.createElement('div'),
        isArray = Array.isArray !== u ?
            function(essenceForTest){
                return Array.isArray(essenceForTest);
            }:
            function(essenceForTest){
                return Object.prototype.toString.call(essenceForTest) === '[object Array]';
            };

    function addToNeedNodes(needNodesName, $DOMNode, needNodes){
        var i;
        if (typeof needNodesName === 'string'){
            if (needNodesName in needNodes){
                if (isArray(needNodes[needNodesName])){
                    needNodes[needNodesName].push($DOMNode);
                } else{
                    needNodes[needNodesName] = [needNodes[needNodesName], $DOMNode];
                }
            } else{
                needNodes[needNodesName] = $DOMNode;
            }
        } else{
            for (i = needNodesName.length; i-- ;){
                addToNeedNodes(needNodesName[i], $DOMNode, needNodes);
            }
        }
    }

    function elementsDescriptorProcessing(elementsDescriptor, $parent, needNodes){
        var $DOMNode,
            i,
            iMax;
        if (isArray(elementsDescriptor)){
            for (i = 0, iMax = elementsDescriptor.length; i < iMax; i += 1){
                elementsDescriptorProcessing(elementsDescriptor[i], $parent, needNodes);
            }
        } else if (typeof elementsDescriptor === 'string'){
            $parent.appendChild(_document.createTextNode(elementsDescriptor));
        } else{
            $DOMNode = cnCt.createElement(elementsDescriptor, $parent);
            if ('n' in elementsDescriptor){
                addToNeedNodes(elementsDescriptor.n, $DOMNode, needNodes);
            }
            if ('C' in elementsDescriptor){
                elementsDescriptorProcessing(elementsDescriptor.C, $DOMNode, needNodes);
            }
        }
    }

    _window.cnCt = cnCt = {
        version: '0.0.3',
        /**
         * create DOM from HTML str
         * @param {String} htmlStr
         * @param {optional|HTMLElement} $parent DOM node for paste result HTML
         * @returns {HTMLElement} if ($parent) $parent
         *                        else documentFragment instance with paste result HTML
         */
        parseHTML: function(htmlStr, $parent){
            var child,
                i;
            abstractDIV.innerHTML = htmlStr;
            if ($parent === u){
                $parent = _document.createDocumentFragment();
            }
            child = abstractDIV.childNodes;
            for (i = child.length; i-- ;){
                $parent.appendChild(child[0]);
            }
            return $parent;
        },
        /**
         * check anything is DOM Node or not
         * @param {*} essenceForTest
         * @returns {boolean}
         */
        isDOMObject: function(essenceForTest){
            return (essenceForTest !== u)
                && (essenceForTest !== null)
                && (typeof essenceForTest !== 'string')
                && (typeof essenceForTest !== 'number')
                && ('nodeName' in essenceForTest);
        },
        /**
         * create DOM node from cnCt DOM node descriptor
         * @param {Object} elementDescriptor cnCt DOM node descriptor
         * @param {optional|HTMLElement} $parent DOM node for paste result
         * @returns {HTMLElement} result DOM node
         */
        createElement: function(elementDescriptor, $parent){
            var $DOMNode,
                p,
                objPointer;
            //        create element
            if (!('e' in elementDescriptor)){
                $DOMNode = _document.createElement('div');
            } else if ('N' in elementDescriptor){
                $DOMNode = _document.createElementNS(elementDescriptor.N, elementDescriptor.e);
            } else{
                $DOMNode = _document.createElement(elementDescriptor.e);
            }
            //        check properties
            if ('c' in elementDescriptor){
                $DOMNode.className = elementDescriptor.c;
            }
            if ('t' in elementDescriptor){
                $DOMNode.appendChild(_document.createTextNode(elementDescriptor.t));
            }
            if ('i' in elementDescriptor){
                $DOMNode.id = elementDescriptor.i;
            }
            if ('v' in elementDescriptor){
                $DOMNode.value = elementDescriptor.v;
                //if(isIE===true) {
                //    $DOMNode.setAttribute('value', elementDescriptor.v);
                //}
                //else
                //{
                //    $DOMNode.value = elementDescriptor.v;
                //}
            }
            if ('T' in elementDescriptor){
                $DOMNode.type = elementDescriptor.T;
            }
            if ('S' in elementDescriptor){
                $DOMNode.src = elementDescriptor.S;
            }
            if ('h' in elementDescriptor){
                $DOMNode.href = elementDescriptor.h;
            }
            if ('a' in elementDescriptor){
                objPointer = elementDescriptor.a;
                for (p in objPointer){
                    $DOMNode.setAttribute(p, objPointer[p]);
                }
            }
            if ('H' in elementDescriptor){
                cnCt.parseHTML(elementDescriptor.H, $DOMNode);
            }
            if ($parent !== u){
                $parent.appendChild($DOMNode);
            }
            return $DOMNode;
        },
        /**
         * create fragment DOM tree from cnCt DOM nodes descriptor
         * @param {Object|Array} elementsDescriptor cnCt DOM nodes descriptor
         * @param {optional|HTMLElement} $parent DOM node for paste result
         * @returns {{r: *, *: []}} if (elementsDescriptor is Array) {r: documentFragment instance with generated nodes, ...[n1]: *, ...[n2]: *, }
         *                          else {r: main elementsDescriptor DOM node, ...[n1]: *, ...[n2]: *, }
         */
        createElements: function (elementsDescriptor, $parent){
            var needNodes = {
                r: u
            };
            if (isArray(elementsDescriptor)){
                needNodes.r = _document.createDocumentFragment();
                elementsDescriptorProcessing(elementsDescriptor, needNodes.r, needNodes);
            } else{
                needNodes.r = cnCt.createElement(elementsDescriptor);
                if ('n' in elementsDescriptor){
                    addToNeedNodes(elementsDescriptor.n, needNodes.r, needNodes);
                }
                if ('C' in elementsDescriptor){
                    elementsDescriptorProcessing(elementsDescriptor.C, needNodes.r, needNodes);
                }
            }
            if ($parent !== u){
                $parent.appendChild(needNodes.r);
            }
            return needNodes;
        },
        /**
         * bind templates list object for cnCt.tp method
         * @param {Object} templatesList list of method returns element(s)Descriptor
         */
        bindTemplates: function(templatesList){
            _templatesList = templatesList;
        },
        /**
         * simple cnCt method
         * @param {function|string} template if (typeof template === 'string') cnCt get templatesList bind of bindTemplates method and call templatesList[template]
         *                                   else call template
         * @param {optional|*} data data for template function, if (data is DOMNode) $parent = data
         * @param {optional|HTMLElement} $parent DOM node for paste result
         * @returns {{r: *, *: []}} if (elementsDescriptor is Array) {r: documentFragment instance with generated nodes, ...[n1]: *, ...[n2]: *, }
         *                          else {r: main elementsDescriptor DOM node, ...[n1]: *, ...[n2]: *, }
         */
        tp: function(template, data, $parent){
            if (cnCt.isDOMObject(data)){
                $parent = data;
                data = u;
            }
            if (typeof template === 'string'){
                return cnCt.createElements(_templatesList[template](data), $parent);
            } else{
                return cnCt.createElements(template(data), $parent);
            }
        }
    };

}(window, document));
(function(global){
    global.GB = {
        global:global,
        settings:null,
        tmpls: {}
    }
}(this));
(function (gb,a9) {
    gb.tmpls.dropdown = function (data) {
        var dropDownListItems = [],
            i,
            options = data.options,
            listItems = data.listItems,
            submitUrl = options.submitUrl,
            itemClassName,
            selectedText = '',
            dropDownListHeadContent = [],
            u;

        if (listItems.length > 0) {
            selectedText = listItems[0].text;
        }

        for (i = 0; i < listItems.length; i++) {
            itemClassName = 'item noselect';
            if (i == 0) {
                itemClassName += ' first';
            }
            if (i == listItems.length - 1) {
                itemClassName += ' last';
            }
            if (options) {
                if ((options.selectedIndex !== u && options.selectedIndex === i) || (options.selectedValue !== u && options.selectedValue == listItems[i].value)) {
                    itemClassName += ' selected';
                    selectedText = listItems[i].text;
                }
            }
            dropDownListItems.push({c: itemClassName, H: listItems[i].text, a: {value: listItems[i].value}})
        }

        if (options.hasSplitter === true) {
            dropDownListHeadContent.push({c: 'splitter'});
        }
        dropDownListHeadContent.push({c: 'text noselect', n: 'selectedText', H: selectedText});
        dropDownListHeadContent.push({c: 'triangle'});


        return [
            {
                e:'form', n:'selectForm', a:{method:'post', action:''}, C:{
                c: 'drop-down-list-head',
                n: 'dropDownListHead',
                C: dropDownListHeadContent
            }
            },
            {
                c: 'drop-down-list-items hidden', n: 'items', C: dropDownListItems
            }

        ];
    };

}(GB,A9));


(function (a9, gb) {
    a9.dropdown = function ($parent, listItems, options) {
        var tp = gb.global.cnCt.tp,
            $body = document.body,
            build,
            $head,
            $items,
            $selectedText,
            eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
            eventOnPointerUp = a9.deviceInfo.eventOnPointerUp;


        build = tp('dropdown', {options: options, listItems: listItems}, $parent);
        $head = build.dropDownListHead;
        $items = build.items;
        $selectedText = build.selectedText;

        var $form = build.selectForm;

        console.log($form);

        a9.addEvent($head, eventOnPointerEnd, showItems);
        a9.addEvent($body, eventOnPointerEnd, hideItems);
        a9.addEvent($items, eventOnPointerUp, selectItem);


        function showItems(e) {
            a9.removeClass($items, 'hidden');
            preventHideItems(e);
        }

        function hideItems() {
            a9.addClass($items, 'hidden');
        }

        function selectItem(e) {
            $selectedText.innerHTML = e.target.innerHTML;
            $form.setAttribute('action',a9.supplant(options.submitUrl,{value:e.target.getAttribute('value')}));
            $form.submit();
            //console.log($form.getAttribute('action'));
        }

        function preventHideItems(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        }
    }
})(A9, GB);
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;


    tmpls.footer = function () {
        return {
            c: 'footer', C: [
                {c: 'copyright', H: a9.supplant(l10n('copyright'), new Date().getFullYear())},
                {
                    c: 'em',
                    H: l10n('emMadeIn', 'firstUpper'),
                    C: [
                        {e: 'br'},
                        {e: 'a', h: gb.settings.controlsDescriptors.site.urlEM, t: l10n('emStudio', 'firstUpper')}
                    ]
                }
            ]
        };
    }


}(GB));
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;


    tmpls.header = function (showBlog,showRoadMap) {
        return {
            c: 'header-top-line', C: [
                tmpls.languageSwitcher(),
                tmpls.roadMapLink(showRoadMap),
                tmpls.blogLink(showBlog),
                tmpls.socials(),
                tmpls.feedbackFormWrapper(),
                tmpls.searchInput()
            ]
        }
    };

    tmpls.searchInput = function(){
        return {e:'input',c:'search-input',a:{placeholder:l10n('searchInputText','firstUpper')}}
    };

    tmpls.socials = function () {
        var descriptors = gb.settings.controlsDescriptors.site;
        return {
            c: 'socials', C: [
                {c: 'google', C: {e: 'a', h: descriptors.googleLink}},
                {c: 'fb', C: {e: 'a', h: descriptors.fbLink}},
                {c: 'instagram', C: {e: 'a', h: descriptors.instagramLink}}]
        }
    };

    tmpls.blogLink = function (current) {
        if(current===true){
            return {c: 'blog-link', C:{H: l10n('brainBlogLink')} }
        }
        return {c: 'blog-link', C:{e:'a',h:gb.settings.controlsDescriptors.site.blogUrl, H: l10n('brainBlogLink')} }
    };

    tmpls.roadMapLink = function (current) {
        if(current===true){
            return {c: 'road-map-link', C:{H: l10n('roadMapLink')} }
        }
        return {c: 'road-map-link', C:{e:'a',h:gb.settings.controlsDescriptors.site.roadMapUrl, H: l10n('roadMapLink')} }
    };

    tmpls.languageSwitcher = function () {
        var languages = gb.settings.languages,
            currentLanguage = gb.settings.currentLanguage,
            content = [],
            languageItem,
            location = gb.global.location,

            clearLocation = location.href.toString().split(location.host)[1],
            locationWithoutLanguage = '',
            locationWithoutLanguageArray;
        if (clearLocation.length == 3) {
            clearLocation += '/'
        }

        if (clearLocation.length > 0) {
            locationWithoutLanguageArray = clearLocation.split('/' + currentLanguage + '/');
            if (locationWithoutLanguageArray.length > 1) {
                locationWithoutLanguage = locationWithoutLanguageArray[1];
            }
        }
        else {
            locationWithoutLanguage = '';
        }

        if (locationWithoutLanguage.indexOf('/') == 0) {
            locationWithoutLanguage = locationWithoutLanguage.substr(1);
        }

        for (var i = 0; i < languages.length; i++) {
            if (languages[i].code == currentLanguage) {
                languageItem = {e: 'span', t: languages[i].label}
            } else {


                languageItem = {
                    e: 'a',
                    h: '/' + languages[i].code + '/' + locationWithoutLanguage,
                    t: languages[i].label
                }
            }
            content.push(languageItem);
        }

        return {
            c: 'language-switcher', C: content
        }
    };


}(GB));
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;


    tmpls.imageSlider = function (data) {
        var images = [],
            controls,
            i;

        for (i = 0; i < data.images.length; i++) {
            images.push({
                e: 'img',
                c: i === 0 ? 'active' : '',
                a: {src: data.imagesPath + data.images[i]}
            })
        }

        controls = {
            c: 'controls', C: [
                {c: 'slider-prev-button'},
                {c: 'slider-next-button'}
            ]
        };

        return {
            n: data.n,
            c: 'image-slider', C: [
                images,
                controls
            ]
        };
    }


}(GB));
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;


    tmpls.logo = function (isMainPage) {
        if (isMainPage === true) {
            return {
                c: 'site-logo', C: [
                    {c: 'logo-pattern'},
                    {c: 'logo-sign', a: {id: 'logoSign'}}
                ]
            };
        }

        return {
            e: 'a', h: gb.settings.controlsDescriptors.site.mainPageUrl,

            c: 'site-logo', C: [
                {c: 'logo-pattern'},
                {e: 'a', h: gb.settings.controlsDescriptors.site.mainPageUrl, c: 'logo-sign', a: {id: 'logoSign'}}
            ]
        };

    }


}(GB));
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.mainMenu = function () {
        var
            menuData = gb.settings.dataModels.mainMenu,
            menuItems = [],
            menuItem,
            menuItemInnerContent=[],
            i,
            menuItemClassName,
            linkContent,
            menuItemState;

        for (i = 0; i < menuData.length; i++) {
            menuItemState = menuData[i].state;

            //if(menuData[i].active===true){
            //    menuItemState = 'active';
            //    if(menuData[i].clickable===true){
            //        menuItemState = 'activeClickable'
            //    }
            //}

            menuItemClassName = menuItemState;

            if (menuData[i].popup) {
                menuItemClassName += ' popup-link'
            }

            if(menuData[i].isServiceMenuItem){
                menuItemClassName += ' popup-link service-menu-link'
            }

            if (menuItemState == 'active' || menuData[i].url === u) {
                linkContent = {
                    e: 'span',
                    H: menuData[i].title
                };
            } else {
                linkContent = {
                    e: 'a',
                    h: menuData[i].url,
                    H: menuData[i].title
                };
            }





            menuItemInnerContent = [
                {c: 'arrow'},
                linkContent,
                {c: 'arrow'}
            ];

            if(menuData[i].isServiceMenuItem){
                menuItemInnerContent.unshift(tmpls.servicesMenuWrapper())
            }

            menuItem = {
                e: 'li', c: menuItemClassName, C: menuItemInnerContent
            };
            menuItems.push(menuItem);
        }

        return {
            c: 'main-menu', a: {id: 'mainMenu'},
            C: [
                {c: 'background-layer'},
                {
                    e: 'ul', C: [
                    menuItems
                ]
                }]
        }
    }
}(GB));
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;


    tmpls.paging = function () {
        return {
            c: 'paging-line'
        };
    }


}(GB));
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;


    tmpls.siteContentTitleContainer = function (data) {


        var content = [];

        if(data.url){
            content.push({
                c: 'caption-wrapper', C: {
                    c: 'caption', C: [{
                        e: 'a',
                        h: data.url,
                        t: data.urlText
                    }, {e: 'span', t: ' /'}
                    ]
                }
            });
        }
        else
        {
            //content.push({
            //    c: 'caption-wrapper', C: {
            //        c: 'caption', C: [{
            //            e: 'a',
            //            h: data.url,
            //            t: data.urlText
            //        }, {e: 'span', t: ' /'}
            //        ]
            //    }
            //});
        }



        content.push({
            c: 'title', H: data.title
        });

        if (data.subTitle) {
            content.push({
                c: 'sub-title', t: data.subTitle
            });
        }

        if (data.logo) {
            content.push({
                c: 'logo',
                C: {e: 'img', a: {src: data.logo}}
            });
        }

        if (data.date) {
            content.push({c: 'date-wrapper', C:{c:'date', t: data.date} });
        }


        return {
            c: 'site-content-title', C: content
        };
    };


    //tmpls.siteDetailsPageContent = function(){
    //
    //
    //};


}(GB));
GB.scrollToTop = function($link){
    var gb = this,
        global = gb.global,
        doc = global.document,
        a9 = global.A9,
        duration = gb.settings.scrollToTopDuration || 200,

        startY,
        startT,
        finishT;

    function interpolate(source, target, shift) {
        return (source + ((target - source) * shift));
    }

    function easing(pos) {
        return (-Math.cos(pos * Math.PI) / 2) + .5;
    }

    function animate() {
        var now = +(new Date()),
            shift = (now > finishT) ? 1 : (now - startT) / duration;

        global.scrollTo(0, interpolate(startY, 0, easing(shift)));

        (now > finishT) || setTimeout(animate, 15);
    }

    function scrollToTop() {
        startY = (global.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        startT  = +(new Date());
        finishT = startT + duration;
        setTimeout(animate, 15);
    }

    a9.addEvent($link, a9.deviceInfo.eventOnPointerEnd, scrollToTop);
};

GB.stickyPanels = function () {
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        $menu = a9.$('mainMenu'),
        $logoSign = a9.$('logoSign'),
        $scrollToTop = a9.$('scrollToTop'),
        fixedClassName = 'fixed',
        activeClassName = 'active';

    a9.addEvent(global, 'scroll', function () {
        var scrollY = this.scrollY;

        if (scrollY >= 100) {
            a9.addClass($menu, fixedClassName)
        } else {
            a9.removeClass($menu, fixedClassName)
        }

        if (scrollY >= 174) {
            a9.addClass($logoSign, fixedClassName)
        } else {
            a9.removeClass($logoSign, fixedClassName)
        }

        if ($scrollToTop != null) {
            if (scrollY >= 200) {
                a9.addClass($scrollToTop, activeClassName)
            } else {
                a9.removeClass($scrollToTop, activeClassName)
            }
        }
    });


};
GB.banners = function($parent){

};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.banners = function () {
        var bannersData = gb.settings.dataModels.banners,
            banners = [],
            banner,
            bannerClassName,
            captionText;

        a9.each(bannersData, function (bannerData) {

            switch (bannerData.type) {
                case'blog':
                    bannerClassName = 'blog';
                    captionText = l10n('bannerBlogCaption');
                    break;
                case'specialOffer':
                    bannerClassName = 'specialOffer';
                    captionText = l10n('bannerSpecialOfferCaption');
                    break;
                case'news':
                    bannerClassName = 'news';
                    captionText = l10n('bannerNewsCaption');
                    break;
                default :
                    bannerClassName = 'default';
                    break;
            }


            banner = {
                e: 'a', h: bannerData.url,
                c: 'banner ' + bannerClassName, C: [
                    {c: 'caption', t: captionText},
                    {
                        c: 'image',
                        C: [
                            {
                                e: 'img',
                                a: {src: gb.settings.controlsDescriptors.site.bannerImages + bannerData.imageSrc}
                            },
                            {
                                c: 'title', H: bannerData.title
                            }
                        ]
                    }
                ]
            };

            banners.push(banner);
        });

        return {c: 'banners', C: banners}
    };
}(GB));
GB.blog = function($parent){
    var gb = this,
        global = gb.global,
        tp = global.cnCt.tp,
        settings = gb.settings,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        blogData = settings.dataModels.blog,
        build;


    build = tp('blog', blogData, $parent);
    gb.popupForm($parent);
    $serviceMenuWrapper= build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);


    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.blog = function (pageData) {
        return [
            tmpls.headerBottom(),
            tmpls.blogContent(pageData),
            tmpls.paging(),
            tmpls.banners(),
            tmpls.footer(),
            tmpls.mainMenu(),
            tmpls.header(true),
            tmpls.logo()
        ];
    };

    tmpls.blogContent = function (pageData) {
        var blogContentItems = [];

        a9.each(pageData, function (newsItem) {
            blogContentItems.push(tmpls.blogContentItem(newsItem));
        });

        blogContentItems.push({c: 'clear'});

        return {
            c: 'blog-list',
            C: [{c: 'blog-content-title', t: l10n('siteMenuBlogTitle', 'firstUpper')}, {
                c: 'blog-list-content',
                C: blogContentItems
            }]
        }
    };


    tmpls.blogContentItem = function (blogItem) {
        var url = a9.supplant(gb.settings.controlsDescriptors.site.blogDetailsUrl,{id:blogItem.name});
        return {
            c: 'blog-content-item',
            C: [
                {
                    c: 'thumb',
                    C: {
                        e: 'a',
                        h: url,
                        C: {e: 'img', a: {src: gb.settings.controlsDescriptors.site.blogThumbnails + blogItem.thumb}}
                    }
                },
                {c: 'date', t: blogItem.date},
                {c: 'title', C: {e: 'a', h: url, H: blogItem.title}},
                {c: 'short-description', H: blogItem.shortDescription}
            ]
        }
    };

}(GB));
GB.blogDetails = function ($parent) {
    var gb = this,
        global = gb.global,
        tp = global.cnCt.tp,
        settings = gb.settings,
        $serviceMenuWrapper,
        $feedbackFormWrapper,
        newsData = settings.dataModels.blogDetails,
        build;

    build = tp('blogDetails', newsData, $parent);
    gb.popupForm($parent);
    $serviceMenuWrapper= build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);


    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.blogDetails = function (pageData) {
        return [
            tmpls.headerBottom(),
            tmpls.blogDetailsContent(pageData),
            tmpls.paging(),
            tmpls.banners(),
            tmpls.footer(),
            tmpls.mainMenu(),
            tmpls.header(),
            tmpls.logo()
        ];
    };


    tmpls.blogDetailsContent = function (blogItem) {
        var
            descriptors = gb.settings.controlsDescriptors.site,
            data = {
                url: descriptors.blogUrl,
                urlText: l10n('brainBlogLink', 'firstUpper'),
                title: blogItem.title,
                date: blogItem.date
            };

        return {
            c: 'blog-details-content', C: [
                tmpls.siteContentTitleContainer(data),
                tmpls.blogDetailsInfo(blogItem)
            ]
        }

    };

    tmpls.blogDetailsInfo = function (pageData) {
        return {
            c: 'blog-details-info', C: [
                {
                    c: 'description', H: pageData.shortDescription
                },
                {
                    c: 'text', H: pageData.text
                }
            ]
        }
    };

}(GB));
GB.contacts = function($parent){
    var gb = this,
        global = gb.global,
        tp = global.cnCt.tp,
        settings = gb.settings,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        contentData = settings.dataModels.contacts,
        $map,
        $mapLocationLinks,
        build;

    contentData.activeMenuItemId = 5;

    build = tp('contacts', contentData, $parent);
    $serviceMenuWrapper= build.servicesMenuWrapper;
    $map=build.map;
    $mapLocationLinks=build.mapLocationLinks;
    $feedbackFormWrapper = build.feedbackFormWrapper;

    gb.popupForm($parent);
    gb.servicesMenu($serviceMenuWrapper);
    gb.map($map,$mapLocationLinks);
    gb.feedbackForm($feedbackFormWrapper);
};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;


    tmpls.contacts = function (pageData) {
        return [
            tmpls.headerBottom(),
            tmpls.contactsContentWrapper(pageData),
            tmpls.paging(),
            tmpls.banners(),
            tmpls.footer(),
            tmpls.mainMenu(pageData.activeMenuItemId),
            tmpls.header(pageData.showBlog, pageData.showRoadMap),
            tmpls.logo()
        ];
    };

    tmpls.contactsContentWrapper = function (data) {
        return {
            c: 'simple-site-content', C: [
                {c: 'contacts-title', t: data.title},
                tmpls.map()
            ]
        }
    };

}(GB));
GB.educationKinds = function ($parent) {
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        settings = gb.settings,
        doc = global.document,
        eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        $dropdownCountries,
        $dropdownAgeGroups,
        countryList = gb.settings.dataModels.educationalCountries,
        dropdownSelectCountryListItems = [],
        ageGroupList = [],
        dropdownAgeGroupListItems = [],
        pageData = settings.dataModels.educationKinds,
        build,
        buildItem,
        $educationalInstitutionsContentItems,
        $fragment;

    build = tp('educationKinds', pageData, $parent);
    $dropdownCountries = build.dropDownCountries;
    $dropdownAgeGroups = build.dropDownAgeGroups;


    var getSelectedAgeGroup = function () {
        for (var i = 0; i < pageData.educationCategories.length; i++) {
            if (pageData.educationCategories[i].active === true) {
                for (var j = 0; j < pageData.educationCategories[i].ageGroups.length; j++) {
                    if (pageData.educationCategories[i].ageGroups[j].active === true) {
                        return pageData.educationCategories[i].ageGroups[j].name;
                    }
                }
            }
        }
    };

    var getCurrentEducationCategoryName = function(){
        for (var i = 0; i < pageData.educationCategories.length; i++) {
            if (pageData.educationCategories[i].active === true) {
                return pageData.educationCategories[i].name;
            }
        }
    };


    var dropDownCountriesOptions = {
        selectedValue: gb.settings.selectedCountry,
        submitUrl:'/'+settings.currentLanguage+'/{value}'
    };

    var dropDownAgeGroupsOptions = {
        //selectedIndex: 1,
        //selectedValue: gb.settings.selectedAgeGroup,
        selectedValue: getSelectedAgeGroup(),
        hasSplitter: true,
        submitUrl:'/'+settings.currentLanguage+'/'+ settings.selectedCountry +'/'+ getCurrentEducationCategoryName() +'/{value}'
    };


    a9.each(countryList, function (item) {
        dropdownSelectCountryListItems.push({text: item.title, value: item.code});
    });


    for (var i = 0; i < pageData.educationCategories.length; i++) {
        if (pageData.educationCategories[i].active === true) {
            ageGroupList = pageData.educationCategories[i].ageGroups
        }
    }


    a9.each(ageGroupList, function (item) {
        dropdownAgeGroupListItems.push({text: item.age, value: item.name});
    });


    a9.dropdown($dropdownCountries, dropdownSelectCountryListItems, dropDownCountriesOptions);
    a9.dropdown($dropdownAgeGroups, dropdownAgeGroupListItems, dropDownAgeGroupsOptions);

    gb.popupForm($parent);

    $serviceMenuWrapper = build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);

    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;
    tmpls.educationKinds = function (pageData) {
        return [
            tmpls.headerBottom(),
            tmpls.educationKindsContent(pageData),
            tmpls.paging(),
            tmpls.banners(),
            tmpls.footer(),
            tmpls.mainMenu(0),
            tmpls.header(),
            tmpls.logo()
        ];
    };

    tmpls.educationKindsContent = function (dataModel) {
        return {
            c: 'education-kinds-content', C: [
                tmpls.countrySelector(),
                tmpls.educationCategoriesMenu(),
                tmpls.categoryContent(dataModel)
            ]
        }
    };

    tmpls.categoryContent = function (dataModel) {
        var title;
        for(var i=0;i<dataModel.educationCategories.length; i++){
            if(dataModel.educationCategories[i].active===true) {
                title = dataModel.educationCategories[i].title;
            }
        }

        return [
            {
                c: 'category-content-title', t: title
            },
            {
                c: 'select-group', t: l10n('selectAgeGroup')
            },
            tmpls.categoryContentWrapper(dataModel)
        ]
    };

    tmpls.categoryContentWrapper = function (dataModel) {
        return {
            c: 'category-content-wrapper', C: [tmpls.ageGroupSelector(dataModel),
                tmpls.categoryContentInnerWrapper(dataModel)]
        }
    };


    tmpls.categoryContentInnerWrapper = function (dataModel) {

        var ageGroups,
            ageGroup,
            i;
        for(i=0;i<dataModel.educationCategories.length; i++){
            if(dataModel.educationCategories[i].active===true) {
                ageGroups = dataModel.educationCategories[i].ageGroups;
            }
        }

        for(i=0;i<ageGroups.length; i++){
             if(ageGroups[i].active===true){
                 ageGroup = ageGroups[i];
             }
        }


        return {
            c: 'category-content-inner-wrapper', C: [
                {
                    c: 'image-container',
                    C: [{
                        e: 'img',
                        a: {src: gb.settings.controlsDescriptors.site.educationKindsImages + 'girl-with-books.png'}
                    }]
                },
                {c: 'text-container', C: {H: ageGroup.text}},
                {c: 'clear'}
            ]
        }
    };

    tmpls.ageGroupSelector = function (dataModel) {
        return {
            c: 'age-group-selector-wrapper', C:

            {n:'dropDownAgeGroups',c:'drop-down-list age-group-selector'}
            //{
            //    c: 'age-group-selector',
            //    C: [{c: 'age-group', t: dataModel[0].educationCategories[0].ageGroups[0].age}, {c: 'triangle'}]
            //}
        }
    };

    tmpls.countrySelector = function () {
        return {
            c: 'country-selector-wrapper',
            C: [
                {c: 'select-country-text', t: l10n('selectCountry', 'firstUpper')},
                {n:'dropDownCountries',c:'drop-down-list country-selector'}
            ]
        }
    };


    tmpls.educationCategoriesMenu = function () {
        var educationKinds = [],
            menuItem,
            i,
            menuItemClassName,
            linkContent,
            menuItemState;


        a9.each(gb.settings.dataModels.educationKinds.educationCategories, function (category) {

            if (category.active===true) {
                menuItem = {e: 'li', c: 'active', C: [{c: 'title', t: category.title}, {c: 'age', t: category.age}]};
            } else {
                menuItem = {
                    e: 'li',
                    C: {
                        e: 'a',
                        h: '#',
                        C: [{c: 'title', e: 'a', h: category.url, t: category.title}, {c: 'age', t: category.age}]
                    }
                };
            }
            educationKinds.push(menuItem);
        });


        return {c: 'education-category-menu', C: {e: 'ul', C: educationKinds}}
    };


}(GB));
GB.educationalInstitutionDetails = function($parent){
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        settings = gb.settings,
        doc = global.document,
        eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        $educationalInstitutionDetailsImagesCarousel,
        pageData = settings.dataModels.educationalInstitutionDetails,
        build,
        buildItem,
        $educationalInstitutionsContentItems,
        $fragment;


    build = tp('educationalInstitutionDetails', pageData, $parent);

    $educationalInstitutionDetailsImagesCarousel = build.educationalInstitutionDetailsImagesCarousel;
    a9.imageSlider($educationalInstitutionDetailsImagesCarousel);
    gb.popupForm($parent);
    $serviceMenuWrapper= build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);

    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.educationalInstitutionDetails = function (pageData) {
        return [
            tmpls.headerBottom(),
            tmpls.educationalInstitutionDetailsContent(pageData),
            tmpls.paging(),
            tmpls.banners(),
            tmpls.footer(),
            tmpls.mainMenu(2, true),
            tmpls.header(),
            tmpls.logo()
        ];
    };

    tmpls.educationalInstitutionDetailsContent = function (pageData) {
        var
            dataItem =gb.settings.dataModels.educationalInstitutionDetails,
            descriptors = gb.settings.controlsDescriptors.site,
            data = {
                url: descriptors.educationalInstitutionsCatalogueUrl,
                urlText:l10n('educationalInstitutionsCatalogueTitle'),
                title:dataItem.title,
                subTitle:dataItem.titleEng
            };

        if(dataItem.logoImageSrc && dataItem.logoImageSrc!==null && dataItem.logoImageSrc!==''){
            data.logo = descriptors.educationalInstitutionDetailsLogo + dataItem.logoImageSrc;
        }


        return {
            c: 'educational-institution-details', C: [
                tmpls.siteContentTitleContainer(data),
                //{c: 'clear'},
                tmpls.educationalInstitutionDetailsInfoWrapper(pageData)
            ]
        }
    };

    tmpls.educationalInstitutionDetailsInfoWrapper = function (pageData) {
        return {
            c: 'educational-institution-details-info-wrapper', C: [
                tmpls.educationalInstitutionDetailsContentCarousel(pageData),
                tmpls.educationalInstitutionDetailsContentInfo(pageData),
                {c: 'clear'}
            ]
        }
    };

    tmpls.educationalInstitutionDetailsContentCarousel = function (pageData) {
        var carousel = {
            n: 'educationalInstitutionDetailsImagesCarousel',
            images: pageData.images,
            imagesPath:gb.settings.controlsDescriptors.site.educationalInstitutionDetailsCarouselImages
        };

        return {
            c: 'educational-institution-details-carousel',
            C: {
                c: 'educational-institution-details-carousel-wrapper', C:
                    tmpls.imageSlider(carousel)
                //{
                //    e: 'img',
                //    a: {src: gb.settings.controlsDescriptors.site.educationalInstitutionDetailsCarouselImages + pageData.images[0]}
                //}
            }
        }
    };

    tmpls.educationalInstitutionDetailsContentInfo = function (pageData) {
        return {
            c: 'educational-institution-details-info', C: [
                {
                    c: 'educational-institution-details-info-container', C: [
                    {c:'line',
                        C: [{
                            e: 'span',
                            c: 'label',
                            t: l10n('educationalInstitutionDetailsAddress', 'firstUpper')
                        }, {e: 'span', t: pageData.address}]
                    },
                    {c: 'show-on-map', e: 'a', h: '#', t: l10n('educationalInstitutionDetailsShowOnMap', 'firstUpper')},
                    {c:'line',
                        C: [{
                            e: 'span',
                            c: 'label',
                            t: l10n('educationalInstitutionDetailsEducation', 'firstUpper')
                        }, {
                            e: 'span',
                            H: l10n('educationalInstitutionDetailsEducationGenderBothShort', 'firstUpper') + a9.supplant(l10n('educationalInstitutionDetailsEducationMinAge'), {age: pageData.minAge})
                        }]
                    },
                    {c:'line',
                        C: [{
                            e: 'span',
                            c: 'label',
                            t: l10n('educationalInstitutionDetailsYearOfFoundation', 'firstUpper')
                        }, {e: 'span', t: pageData.yearOfFoundation}]
                    },
                    {c:'line',
                        C: [{
                            e: 'span',
                            c: 'label',
                            t: l10n('educationalInstitutionDetailsRector', 'firstUpper')
                        }, {e: 'span', t: pageData.rector}]
                    },
                    {c:'line',
                        C: [
                            {
                                e: 'span',
                                c: 'label',
                                t: l10n('educationalInstitutionDetailsContacts', 'firstUpper')
                            },
                            {e: 'span', t: pageData.contacts},
                            {
                                c: 'email',
                                C: {
                                    e: 'a',
                                    h: 'mailto:' + pageData.email,
                                    t: pageData.email
                                }
                            },
                            {
                                c: 'website', C: {
                                e: 'a', h: pageData.website,
                                t: pageData.website
                            }
                            }]
                    }


                ]
                },
                {c: 'educational-institution-details-info-container-description', H: pageData.description}
            ]
        }
    };





}(GB));

GB.educationalInstitutions = function($parent){
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        settings = gb.settings,
        doc = global.document,
        eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        pageData = settings.dataModels.educationalInstitutions,
        build,
        buildItem,
        $educationalInstitutionsContentItems,

        $dropDownInstitutionLocation,
        $dropDownGender,
        $dropDownInstitutionType,

        dropDownInstitutionLocationListItems=[],
        dropDownGenderListItems=[],
        dropDownInstitutionTypeListItems=[],

        dropDownInstitutionLocationSelectedIndex=0,
        dropDownGenderSelectedIndex=0,
        dropDownInstitutionTypeSelectedIndex=0,

        $fragment;

    build = tp('educationalInstitutions', $parent);
    $educationalInstitutionsContentItems = build.educationalInstitutionsContentItems;
    $serviceMenuWrapper= build.servicesMenuWrapper;
    $dropDownInstitutionLocation = build.dropDownInstitutionLocation;
    $dropDownGender=build.dropDownGender;
    $dropDownInstitutionType=build.dropDownInstitutionType;

    gb.servicesMenu($serviceMenuWrapper);
    gb.popupForm($parent);

    $fragment = global.document.createDocumentFragment();




    a9.each(settings.dataModels.educationalInstitutionFilterLocation, function (item,i) {
        dropDownInstitutionLocationListItems.push({text: item.title, value: item.value});
        if(item.selected===true){
            dropDownInstitutionLocationSelectedIndex=i;
        }
    });
    a9.each(settings.dataModels.educationalInstitutionFilterGender, function (item,i) {
        dropDownGenderListItems.push({text: item.title, value: item.value});
        if(item.selected===true){
            dropDownGenderSelectedIndex=i;
        }
    });
    a9.each(settings.dataModels.educationalInstitutionFilterType, function (item,i) {
        dropDownInstitutionTypeListItems.push({text: item.title, value: item.value});
        if(item.selected===true){
            dropDownInstitutionTypeSelectedIndex=i;
        }
    });

    console.log(dropDownInstitutionTypeSelectedIndex);


    var dropDownInstitutionLocationOptions = {
        selectedIndex: dropDownInstitutionLocationSelectedIndex,
        hasSplitter:true,
        submitUrl:'/'+settings.currentLanguage+'/catalogue/{value}/'+ settings.selectedGenger +'/'+settings.selectedType
    };

    var dropDownGenderOptions = {
        selectedIndex: dropDownGenderSelectedIndex,
        hasSplitter:true,
        submitUrl:'/'+settings.currentLanguage+'/catalogue/'+ settings.selectedLocation +'/{value}/'+settings.selectedType
    };
    var dropDownInstitutionTypeOptions = {
        selectedIndex: dropDownInstitutionTypeSelectedIndex,
        hasSplitter:true,
        submitUrl:'/'+settings.currentLanguage+'/catalogue/'+ settings.selectedLocation +'/'+ settings.selectedGenger +'/{value}'
    };

    a9.dropdown($dropDownInstitutionLocation,dropDownInstitutionLocationListItems,dropDownInstitutionLocationOptions);
    a9.dropdown($dropDownGender,dropDownGenderListItems,dropDownGenderOptions);
    a9.dropdown($dropDownInstitutionType,dropDownInstitutionTypeListItems,dropDownInstitutionTypeOptions);



    a9.each(pageData,function(dataItem){
        buildItem = tp('educationalInstitutionsContentItem', dataItem, $fragment);
    });

    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);


    $educationalInstitutionsContentItems.appendChild($fragment);

};

(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.educationalInstitutions = function () {
        return [

            tmpls.headerBottom(),
            tmpls.educationalInstitutionsContent(),
            tmpls.paging(),
            tmpls.banners(),
            tmpls.footer(),
            tmpls.mainMenu(2),
            tmpls.header(),
            tmpls.logo()
        ];
    };

    tmpls.headerBottom = function () {
        return {c: 'header-bottom-line'}
    };

    tmpls.educationalInstitutionsContent = function () {
        return {
            c: 'educational-institutions-catalogue',
            C: [
                {
                    c: 'content-title', t: l10n('educationalInstitutionsCatalogueTitle', 'firstUpper')
                },
                tmpls.educationalInstitutionsContentFilter(),
                {
                    c: 'content', n: 'educationalInstitutionsContentItems'
                }
            ]
        }
    };

    tmpls.educationalInstitutionsContentFilter = function () {
        return {
            c: 'filter', C: {
                e: 'ul', C: [
                    {e: 'li', c: 'location',C:{n:'dropDownInstitutionLocation',c:'drop-down-list educational-institutions-filter-selector'}},
                    {e: 'li', c: 'gender',C:{n:'dropDownGender',c:'drop-down-list educational-institutions-filter-selector'}},
                    {e: 'li', c: 'type',C:{n:'dropDownInstitutionType',c:'drop-down-list educational-institutions-filter-selector'}}

                ]
            }
        }
    };

    tmpls.educationalInstitutionsContentItem = function (dataItem) {

        var educationGender,
            itemClassName = 'educational-institutions-catalogue-item',
            itemContent = [],
            isSpecial = dataItem.special === true,
            url = a9.supplant(gb.settings.controlsDescriptors.site.educationalInstitutionDetailsUrl,{id:dataItem.name});

        switch (dataItem.gender) {
            case 'both':
                educationGender = l10n('educationalInstitutionsCatalogueEducationGenderBoth', 'firstUpper');
                break;
            case 'male':
                educationGender = l10n('educationalInstitutionsCatalogueEducationGenderMale', 'firstUpper');
                break;
        }

        if (isSpecial) {
            itemClassName += ' special-offer'
        }


        if (isSpecial) {
            itemContent.push({c: 'special-offer-title', t: l10n('specialOfferTitle')})
        }

        itemContent.push({
            c: 'image-wrapper',
            C: {
                e: 'img',
                a: {src: gb.settings.controlsDescriptors.site.educationalInstitutionCataloguePreviewImages + dataItem.previewImageSrc}
            }
        });

        itemContent.push({
            c: 'description-wrapper', C: {
                c: 'description', C: [
                    {c: 'title', t: dataItem.title},
                    {c: 'title-en', t: dataItem.titleEng},
                    {c: 'location', t: dataItem.location},
                    {c: 'education-gender', t: educationGender}
                ]
            }
        });
        return {
            c: itemClassName, C: {e: 'a', h: url, C: itemContent}
        }
    };

}(GB));

GB.feedbackForm = function ($parent) {
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        $body = document.body,
        build,
        $digits,
        phoneNumber = [],
        $phoneNumber,
        $feedbackFormLink,
        $submitButton,
        $feedbackForm,
        u;

    build = tp('feedbackForm', $parent);
    $feedbackFormLink = build.feedbackFormLink;
    $feedbackForm = build.feedbackFormContent;
    $submitButton = build.submitButton;
    $phoneNumber = build.phoneNumber;

    $digits = a9.$c('digit', $phoneNumber);


    a9.addEvent($feedbackFormLink, eventOnPointerEnd, feedbackFormLinkClick);
    a9.addEvent($body, eventOnPointerEnd, closeFeedbackForm);
    a9.addEvent($feedbackForm, eventOnPointerEnd, feedbackFormClick);

    function preventCloseFeedbackForm(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }


    function onKeyFeedbackFormKeyPress(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which;


        if (keyCode == 13 && phoneNumber.length == 12) {
            submitForm();
        }


        //console.log(keyCode);
        //0-9
        if ((keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105) && phoneNumber.length < 12) {
            switch (keyCode) {
                case 48:
                case 96:
                    phoneNumber.push('0');
                    break;
                case 49:
                case 97:
                    phoneNumber.push('1');
                    break;
                case 50:
                case 98:
                    phoneNumber.push('2');
                    break;
                case 51:
                case 99:
                    phoneNumber.push('3');
                    break;
                case 52:
                case 100:
                    phoneNumber.push('4');
                    break;
                case 53:
                case 101:
                    phoneNumber.push('5');
                    break;
                case 54:
                case 102:
                    phoneNumber.push('6');
                    break;
                case 55:
                case 103:
                    phoneNumber.push('7');
                    break;
                case 56:
                case 104:
                    phoneNumber.push('8');
                    break;
                case 57:
                case 105:
                    phoneNumber.push('9');
                    break;
            }
        }
        // backspase, delete
        else if (keyCode == 8 || keyCode == 46) {
            phoneNumber.pop();
        }
        renderPhoneNumber();

        if (keyCode == 8) {
            e.preventDefault();
        }
        // esc
        if(keyCode==27){
            closeFeedbackForm();
        }
    }

    function onPhoneNumberClick() {
        if(phoneNumber.length<12) {
            for (var i = 0; i < $digits.length; i++) {
                a9.addClass($digits[phoneNumber.length], 'active');
            }
        }
    }

    function renderPhoneNumber() {
        var i;

        for (i = 0; i < $digits.length; i++) {
            if (phoneNumber[i] !== u) {
                a9.addClass($digits[i], 'active');
                $digits[i].innerText = phoneNumber[i];
            }
            else {
                a9.removeClass($digits[i], 'active');
                $digits[i].innerText = '_';
            }
        }

        if (phoneNumber.length < 12) {
            for (i = 0; i < $digits.length; i++) {
                a9.addClass($digits[phoneNumber.length], 'active');
            }
        }

        if (phoneNumber.length === 12) {
            a9.addClass($submitButton, 'active');

        } else {
            a9.removeClass($submitButton, 'active');

        }
    }


    a9.addEvent($submitButton, eventOnPointerEnd, submitForm);


    function submitForm() {
        if (phoneNumber.length === 12) {
            //a9.request();
            closeFeedbackForm();
        }
    }

    function closeFeedbackForm() {
        a9.addClass($feedbackForm, 'hidden');
        a9.removeEvent($body, 'keydown', onKeyFeedbackFormKeyPress);
    }

    function showFeedbackForm() {
        a9.removeClass($feedbackForm, 'hidden');
        a9.addEvent($body, 'keydown', onKeyFeedbackFormKeyPress);
        a9.addEvent($phoneNumber, eventOnPointerEnd, onPhoneNumberClick);
    }

    function feedbackFormLinkClick(e) {
        showFeedbackForm();
        preventCloseFeedbackForm(e);
    }

    function feedbackFormClick(e) {
        preventCloseFeedbackForm(e)
    }
};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;


    tmpls.feedbackFormWrapper = function () {
        return {n: 'feedbackFormWrapper'};
    };

    tmpls.feedbackForm = function () {
        return {
            c: 'feedback-form-wrapper', C: [
                {
                    c: 'link', n: 'feedbackFormLink', C: [
                    {c: 'arrow'},
                    {c: 'text', t: l10n('feedbackLinkText')},
                    {c: 'arrow'}
                ]
                },
                {
                    c: 'feedback-form hidden', n: 'feedbackFormContent',
                    C: {
                        c: 'feedback-form-content-wrapper', C: [
                            {
                                c: 'triangle'
                            },
                            {
                                c: 'feedback-form-content', C: {
                                c: 'inner-content', C: [
                                    {c: 'enter-number-text', H: l10n('feedbackFormEnterNumberText', 'firstUpper')},
                                    {c:'phone-number-container',n:'phoneNumber',C:
                                        [
                                            {e:'span',t:'+'},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',t:' '},
                                            {e:'span',t:'('},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',t:')'},
                                            {e:'span',t:' '},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',t:'-'},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',t:'-'},
                                            {e:'span',c:'digit',t:'_'},
                                            {e:'span',c:'digit',t:'_'}
                                        ]
                                        //t:'+00 (000) 000-00-00'
                                    },
                                    {c:'send-btn', n:'submitButton', t:l10n('feedbackFormSendBtn')},
                                    {c: 'call-text', H: l10n('feedbackFormCallText', 'firstUpper')},
                                    {c:'phone-number-container',t:'+38 (095) 198-14-90'},
                                    {c:'bottom-pattern'}
                                ]
                            }
                            }
                        ]
                    }
                }
            ]
        }
    };

}(GB));
GB.intro = function ($parent) {
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        settings = gb.settings,
        eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        $feedbackFormWrapper,
        introData = settings.dataModels.intro,
        $introContainer,
        build,
        $fragment,
        u;


    build = tp('intro', $parent);

    var $asUsual = build.asUsual;
    var $child = build.child;
    var $edu = build.highEdu;
    var $mazeShutter = build.mazeShutter;
    var $mazeContainer = build.mazeContainer;
    var $whiteLine = build.whiteLine;
    var $greenLine = build.greenLine;
    var $mazeLayout = build.mazeLayout;
    var $mazeLayoutTextSmall = build.mazeLayoutTextSmall;
    var $intro = build.intro;
    var $skipIntroWrapperButton = build.skipIntroWrapperButton;
    var $finalLayout = build.finalLayout;
    //a9.removeClass($mazeContainer,'hidden');
    //a9.animate($mazeShutter,['width',0,'px', 'height',0,'px','margin-top',255,'px'],2000,step5);


    //setTimeout(step5,3000);

    setTimeout(step1, 2000);

    function step1() {
        a9.animate($asUsual, ['margin-top', 10, 'px', 'font-size', 20, 'px'], 600, step2);
    }

    function step2() {
        setTimeout(function () {
            a9.removeClass($child, 'hidden');
            setTimeout(function () {
                a9.removeClass($edu, 'hidden');
                a9.removeClass($mazeContainer, 'hidden');
                setTimeout(function () {
                    a9.animate($mazeShutter, ['width', 0, 'px', 'height', 0, 'px', 'margin-top', 255, 'px'], 2000, step5);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    function step5() {
        setTimeout(function () {
            a9.removeClass($mazeLayout, 'hidden');
            a9.addClass($asUsual, 'hidden');
            setTimeout(function () {
                a9.removeClass($mazeLayoutTextSmall, 'hidden');
                a9.addClass($mazeLayout, 'hidden');
                setTimeout(function () {
                    a9.removeClass($whiteLine, 'hidden');
                    a9.removeClass($greenLine, 'hidden');
                    setTimeout(function () {
                        setTimeout(function () {
                            a9.addClass($intro, 'hidden');
                            a9.addClass($skipIntroWrapperButton, 'hidden');
                            a9.removeClass($finalLayout, 'hidden');
                        }, 2000);
                    }, 500);

                }, 1000);
            }, 3000);
        }, 1000);
    }
};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;


    tmpls.intro = function (introData) {
        return {
            c: 'intro-wrapper', C: [

                {
                    c: 'intro', n:'intro', C:[
                    tmpls.child(),
                    tmpls.highEducation(),
                    tmpls.maze(),
                    tmpls.greenLine(),
                    tmpls.asUsual(),
                    tmpls.mazeLayoutTextSmall()//,
                    //tmpls.finalLayout()
                ]
                },
                tmpls.finalLayout(),
                {c: 'skip-intro-wrapper',n:'skipIntroWrapperButton', C: {c: 'skip-intro', e: 'a', h:gb.settings.controlsDescriptors.site.mainPageUrl, t: l10n('intro_skipIntro')}}]
        }
    };


    tmpls.finalLayout = function(){
        return{c:'final-layout hidden',n:'finalLayout', C:{c:'buttons',C:[{e:'a',h:gb.settings.controlsDescriptors.site.roadMapUrl, c:'button find-out',H:l10n('intro_findOutAboutRoadMap')},{e:'a',h:gb.settings.controlsDescriptors.site.mainPageUrl,c:'button enter-site',H:l10n('intro_enterSite')}]}}
    };

    tmpls.asUsual = function(){
        return{ c: 'as-usual',n:'asUsual', H: l10n('intro_asUsual')}
    };

    tmpls.mazeLayoutTextSmall = function(){
        return{c:'maze-layout-text-small hidden',n:'mazeLayoutTextSmall',C:{H:l10n('intro_mazeLayoutText')}}
    };

    tmpls.maze = function(){
        return{c:'maze-container hidden',n:'mazeContainer' ,C:[
            {c:'maze'},
            {c:'maze-layout hidden',n:'mazeLayout',C:{c:'text',H:l10n('intro_mazeLayoutText')}},
            {c:'maze-shutter',n:'mazeShutter'},
            tmpls.whiteLine()
        ]}
    };

    tmpls.child = function(){
        return{c:'child hidden',n:'child', C:[{c:'dot'},{t:l10n('intro_yourChild','firstUpper')}]}
    };

    tmpls.highEducation = function(){
      return{c:'high-edu hidden',n:'highEdu',C:[{c:'dot'},{t:l10n('intro_highEducation','firstUpper')}]}
    };

    tmpls.whiteLine = function(){
        return {c:'white-line hidden',n:'whiteLine'}
    };

    tmpls.greenLine = function(){
        return {c:'green-line hidden',n:'greenLine'}
    };


}(GB));
GB.mainPage = function ($parent) {
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        settings = gb.settings,
        doc = global.document,
        eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        startY,
        finishY,
        startT,
        finishT,
        duration = gb.settings.scrollToAnnouncementsDuration || 200,
        build,
        buildBanner,
        $buildLocationLinks=[],
        mainPageData = settings.dataModels.mainPage,
        $feedbackFormWrapper,
        $map,
        $serviceMenuWrapper,
        mainPageSlideTimeout = settings.controlsDescriptors.site.mainPageSlideTimeout | 3000,
        $fragment,
        currentVisibleFrameIndex = -1,
        i,
        $mapLocationLinks,
        $mainImageContentWrapper,
        $contentImages = [];


    build = tp('mainPage', $parent);
    $mainImageContentWrapper = build.mainImageContentWrapper;
    $serviceMenuWrapper = build.servicesMenuWrapper;
    $map = build.map;
    $mapLocationLinks = build.mapLocationLinks;

    gb.map($map, $mapLocationLinks);

    gb.servicesMenu($serviceMenuWrapper);

    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);

    gb.popupForm($parent);

    $fragment = global.document.createDocumentFragment();

    var j = 0;
    a9.each(mainPageData.mainBanners, function (mainBanner) {
        mainBanner.order = j;
        buildBanner = tp('mainImageContent', mainBanner, $fragment);
        $contentImages.push(buildBanner.r);
        j++;
    });

    var sm = tp('showMore', $fragment);
    a9.addEvent(sm.r, eventOnPointerEnd, showDetails);

    function showDetails() {
        scrollToTop();
    }

    function scrollToTop() {
        finishY = (a9.$('mainPageAnnouncements').offsetTop || 0);
        //finishY = (a9.$('contentBlock'+index).offsetTop || 0);
        startY = ((global.pageYOffset || doc.scrollTop) || 0) - (doc.clientTop || 0);
        startT = +(new Date());
        finishT = startT + duration;
        setTimeout(animate, 15);
    }

    function animate() {
        var now = +(new Date()),
            shift = (now > finishT) ? 1 : (now - startT) / duration;
        global.scrollTo(0, interpolate(startY, finishY, easing(shift)));
        (now > finishT) || setTimeout(animate, 15);
    }

    function interpolate(source, target, shift) {
        return (source + ((target - source) * shift));
    }

    function easing(pos) {
        return (-Math.cos(pos * Math.PI) / 2) + .5;
    }

    $mainImageContentWrapper.appendChild($fragment);


    setTimeout(slideImageFrame, 10);

    function setInactiveImages() {
        //console.log($contentImages[0]);
        for (i = 0; i < $contentImages.length; i++) {
            a9.removeClass($contentImages[i], "active");
        }
    }

    function updateCurrentVisibleFrameIndex() {
        currentVisibleFrameIndex++;
        if (currentVisibleFrameIndex >= $contentImages.length) {
            currentVisibleFrameIndex = 0;
        }
    }

    function setActiveImage() {
        for (i = 0; i < $contentImages.length; i++) {
            if (i == currentVisibleFrameIndex) {
                a9.addClass($contentImages[i], "active");
            }
        }
    }

    function slideImageFrame() {
        setInactiveImages();
        updateCurrentVisibleFrameIndex();
        setActiveImage();
        setTimeout(slideImageFrame, mainPageSlideTimeout);
    }


};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.mainPage = function () {
        return [
            {c: 'main-banner', n: 'mainImageContentWrapper'},
            tmpls.mainMenu(),
            tmpls.logo(true),
            tmpls.mainPageAnnouncements(),
            tmpls.map(),
            tmpls.header(),
            tmpls.footer(),
            tmpls.scrollToTop()
        ]
    };

    tmpls.scrollToTop = function () {
        return {c: 'scroll-to-top', a: {id: 'scrollToTop'}}
    };

    tmpls.mainPageAnnouncements = function () {
        var announcements = gb.settings.dataModels.mainPage.contentAnnouncements,
            parallaxImages = gb.settings.dataModels.mainPage.parallaxImages,
            content = [],
            i = 0;
        a9.each(announcements, function (announcement) {
            if (i % 2 == 0) {
                content.push([tmpls.announcementInfo(announcement), tmpls.announcementImage(announcement)]);
            }
            else {
                content.push([tmpls.announcementImage(announcement), tmpls.announcementInfo(announcement)]);
            }
            content.push({c: 'clear'});
            if (parallaxImages[i]) {
                content.push({
                    c: 'parallax-window',
                    a: {
                        'data-parallax': 'scroll',
                        'data-image-src': gb.settings.controlsDescriptors.site.parallaxImages + parallaxImages[i]
                    }
                });
            }

            content.push({c: 'clear'});
            i++;
        });

        return {a: {id: 'mainPageAnnouncements'}, c: 'main-page-announcements', C: content}
    };


    tmpls.announcementInfo = function (announcement) {
        return {
            c: 'announcement-info', C: [
                {c: 'title', t: announcement.title},
                {c: 'announcement-info-logo'},
                {c: 'text', t: announcement.text},
                {e: 'a', h: announcement.url, c: 'link', t: l10n('announcementLinkText')}
            ]
        }
    };

    tmpls.announcementImage = function (announcement) {
        return {
            c: 'announcement-image',
            //e: 'img',
            //a: {src: gb.settings.controlsDescriptors.site.mainPageImages + announcement.imageSrc}
            a: {style: 'background-image:url(' + gb.settings.controlsDescriptors.site.contentAnnouncementImages + announcement.imageSrc + ')'}
        }
    };


    tmpls.mainImageContent = function (mainBanner) {
        var controlsDescriptors = gb.settings.controlsDescriptors,
            content = [];


        if (mainBanner.title && mainBanner.title != '') {
            content.push({c: 'title', H: mainBanner.title});
            content.push({c: 'clear'})
        }

        if (mainBanner.description && mainBanner.description != '') {
            content.push({c: 'description', C: {e: 'span', c: 'highlight', H: mainBanner.description}});
            content.push({c: 'clear'})
        }

        if (mainBanner.sign && mainBanner.sign != '') {
            content.push({c: 'sign', H: mainBanner.sign});
            content.push({c: 'clear'})
        }

        if (mainBanner.signImage && mainBanner.signImage != '') {
            content.push({
                c: 'sign-image',
                C: {e: 'img', a: {src: controlsDescriptors.site.mainPageImages + mainBanner.signImage}}
            });
            content.push({c: 'clear'})
        }

        return {
            c: 'main-image-content', C: [
                {
                    //e: 'img',
                    c: 'banner', //a: {src: controlsDescriptors.site.mainPageImages + mainBanner.imageSrc}
                    a: {style: 'background-image:url(' + controlsDescriptors.site.mainBannerImages + mainBanner.imageSrc + ')'}
                },
                {
                    c: 'main-page-info-wrapper', C: content
                }
            ]
        }
    };



    tmpls.mapLocationLink = function(mapLocation){
        return {c:'map-location-link',C:{e:'span', t:mapLocation.title}}
    };


    tmpls.showMore = function () {
        return {c: 'show-more', H: l10n('showMoreText')}
    }

}(GB));
GB.map = function ($map, $mapLocationLinks) {
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        settings = gb.settings,
        eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        $buildLocationLinks = [],
        $fragment;


    function initMap(index) {
        index = index || 0;
        var location = settings.dataModels.mapLocations[index];
        var lat = location.location.lat;
        var lng = location.location.lng;

        //console.log(location);


        var contentInfo = '<div class="map-location-info-content"><div class="address">' + location.location.contentAddress + '</div><div class="phone">' + location.location.contentPhone + '</div><div class="email"><a href="mailto:' + location.location.contentEmail + '">' + location.location.contentEmail + '</a></div></div>'

        google.load('maps', '3', {
            callback: function () {
                var coordinates = new google.maps.LatLng(lat, lng);
                var mapOptions = {
                    center: coordinates,
                    mapTypeControl: false,
                    zoom: 14
                };
                var map = new google.maps.Map($map, mapOptions);
                var infoWindow = new google.maps.InfoWindow({
                    content: contentInfo
                });
                var marker = new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    title: location.location.title
                });
                infoWindow.open(map, marker);
            }
        });
    }


    $fragment = global.document.createDocumentFragment();

    a9.each(settings.dataModels.mapLocations, function (mapLocation, index) {

        $buildLocationLinks[index] = tp('mapLocationLink', mapLocation, $fragment).r;
        if (index === 0) {
            a9.addClass($buildLocationLinks[index], 'active');
        }

        a9.addEvent($buildLocationLinks[index], eventOnPointerEnd, function () {
            a9.each($buildLocationLinks, function (buildLocationLink) {
                a9.removeClass(buildLocationLink, 'active');
            });
            a9.addClass(this, 'active');
            initMap(index);
        });


    });

    $mapLocationLinks.appendChild($fragment);

    initMap();
};

(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.map = function () {
        return {
            c: 'map-frame',
            C: [{c: 'map-container', a: {id: 'map'}, n: 'map'}, {c: 'map-location-links', n: 'mapLocationLinks'}]
        }
    };

}(GB));
GB.news = function($parent){
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        settings = gb.settings,
        eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        newsData = settings.dataModels.news,
        build,
        u;


    build = tp('news', newsData, $parent);
    gb.popupForm($parent);
    $serviceMenuWrapper= build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);

    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.news = function (pageData) {
        return [
            tmpls.headerBottom(),
            tmpls.newsContent(pageData),
            tmpls.paging(),
            tmpls.banners(),
            tmpls.footer(),
            tmpls.mainMenu(3),
            tmpls.header(),
            tmpls.logo()
        ];
    };

    tmpls.newsContent = function (pageData) {
        var newsContentItems = [];

        a9.each(pageData, function (newsItem) {
            newsContentItems.push(tmpls.newsContentItem(newsItem));
        });

        newsContentItems.push({c: 'clear'});

        return {
            c: 'news-list',
            C: [{c: 'news-content-title', t: l10n('siteMenuNewsTitle', 'firstUpper')}, {
                c: 'news-list-content',
                C: newsContentItems
            }]
        }
    };


    tmpls.newsContentItem = function (newsItem) {
        var url = a9.supplant(gb.settings.controlsDescriptors.site.newsDetailsUrl,{id:newsItem.name});
        return {
            c: 'news-content-item',
            C: [
                {
                    c: 'thumb',
                    C: {e:'a', h:url,C:{ e: 'img', a: {src: gb.settings.controlsDescriptors.site.newsThumbnails + newsItem.thumb}}}
                },
                {
                    c: 'info', C: [
                    {c: 'date',t: newsItem.date},
                    {
                        c: 'info-block', C: [
                        {c: 'title',C:{ e:'a',h:url, H:newsItem.title}},
                        {c: 'short-description',H:newsItem.shortDescription}]
                    }]
                }]
        }
    };

}(GB));
GB.newsDetails = function ($parent) {
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        settings = gb.settings,
        //eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        $newsImagesCarousel,
        //$sliderImages,
        newsData = settings.dataModels.newsDetails,
        build,
        u;

    build = tp('newsDetails', newsData, $parent);
    $newsImagesCarousel = build.newsImagesCarousel;

    //var onDatesChange = function () {
    //    //console.log('callback called');
    //};


    //a9.imageSlider($newsImagesCarousel, {callBackValueChange: onDatesChange});
    a9.imageSlider($newsImagesCarousel);


    gb.popupForm($parent);
    $serviceMenuWrapper= build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);

    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.newsDetails = function (pageData) {
        return [
            tmpls.headerBottom(),
            tmpls.newsDetailsContent(pageData),

            tmpls.paging(),
            tmpls.banners(),
            tmpls.footer(),
            tmpls.mainMenu(3, true),
            tmpls.header(),
            tmpls.logo()
        ];
    };


    tmpls.newsDetailsContent = function (newsItem) {
        var
            descriptors = gb.settings.controlsDescriptors.site,
            data = {
                url: descriptors.newsUrl,
                urlText: l10n('siteMenuNewsTitle', 'firstUpper'),
                title: newsItem.title,
                date: newsItem.date
            };

        return {
            c: 'news-details-content', C: [
                tmpls.siteContentTitleContainer(data),
                tmpls.newsDetailsInfoWrapper(newsItem)
            ]
        }

    };

    tmpls.newsDetailsInfoWrapper = function (pageData) {
        return {
            c: 'news-details-info-wrapper', C: [
                tmpls.newsDetailsContentCarousel(pageData),
                tmpls.newsDetailsContentInfo(pageData),
                {c: 'clear'}
            ]
        }
    };

    tmpls.newsDetailsContentCarousel = function (pageData) {

        var carousel = {
            n: 'newsImagesCarousel',
            images: pageData.images,
            imagesPath:gb.settings.controlsDescriptors.site.newsImages
        };

        return {
            c: 'news-details-carousel',
            C: {
                c: 'wrapper', C: tmpls.imageSlider(carousel)
                //{
                //    e: 'img',
                //    a: {src: gb.settings.controlsDescriptors.site.educationalInstitutionDetailsCarouselImages + pageData.images[0]}
                //}
            }
        }
    };

    tmpls.newsDetailsContentInfo = function (pageData) {
        return {
            c: 'news-details-info', C: [
                {
                    c: 'description', H: pageData.shortDescription
                },
                {c: 'text', H: pageData.text}
            ]
        }
    };

}(GB));
GB.partners = function($parent){
    var gb = this,
        global = gb.global,
        tp = global.cnCt.tp,
        settings = gb.settings,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        contentData = settings.dataModels.partners,
        build;

    contentData.activeMenuItemId = 4;

    build = tp('simpleSiteContent', contentData, $parent);
    gb.popupForm($parent);
    $serviceMenuWrapper= build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);


    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};
GB.popupForm = function($parent){
    var gb= this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        $body = document.body,
        settings = gb.settings,
        $popuplink,
        $layout,
        $popup,
        $popupClassName = 'popup-link',

        build,
        u;



    build = tp('popupForm',$parent);
    $layout = build.r;
    $popup = build.popup;

    $popuplink = a9.$c($popupClassName)[0];

    a9.addEvent($layout, eventOnPointerEnd, function(){
        $layout.style.display ='none';
    });

    a9.addEvent($body,'keydown',function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which;
        // esc
        if(keyCode==27){
            $layout.style.display ='none';
        }
    });

    a9.addEvent($popup, 'click', function(e){
        e.stopPropagation();
    });

    if($popuplink!==u){
        a9.addEvent($popuplink, eventOnPointerEnd, function(){
            $layout.style.display ='block';
        });
    }

};
(function (gb) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;


    tmpls.popupForm = function () {
        var educationalCountries = gb.settings.dataModels.educationalCountries,
            countriesContent = [];


        a9.each(educationalCountries, function (country) {
            countriesContent.push({c:'link-container', C:{e: 'a', h: country.url, t: country.title}});
        });


        return {
            c: 'layout', C: {
                c: 'popup select-country-form',
                n: 'popup',
                C: {
                    c: 'frame',
                    C: [
                        {
                            c: 'title-wrapper',
                            C: {c: 'title', t: l10n('selectEducationCountry', 'firstUpper')}
                        },
                        {
                            c: 'select-education-country',C:countriesContent
                        },
                        {
                            c:'logo-wrapper',
                            C:{c:'select-country-form-logo'}
                        }
                    ]
                }
            }
        }
    }

}(GB));
GB.roadMap = function ($parent) {
    var gb = this,
        global = gb.global,
        tp = global.cnCt.tp,
        settings = gb.settings,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        contentData = settings.dataModels.roadMap,
        build;

    contentData.showRoadMap=true;

    build = tp('simpleSiteContent', contentData, $parent);
    gb.popupForm($parent);

    $serviceMenuWrapper= build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);

    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};
GB.services = function($parent){
    var gb = this,
        global = gb.global,
        tp = global.cnCt.tp,
        settings = gb.settings,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        contentData = settings.dataModels.services,
        build;



    build = tp('simpleSiteContent', contentData, $parent);
    gb.popupForm($parent);
    $serviceMenuWrapper= build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);


    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};

GB.servicesMenu = function ($parent) {
    var gb = this,
        global = gb.global,
        a9 = global.A9,
        tp = global.cnCt.tp,
        eventOnPointerEnd = a9.deviceInfo.eventOnPointerEnd,
        $body = document.body,
        build,
        $digits,
        phoneNumber = [],
        $phoneNumber,
        $feedbackFormLink,
        $submitButton,
        $closeButton,
        $feedbackForm,
        u;



    build = tp('servicesMenu', gb.settings.dataModels.servicesMenu, $parent);
    $closeButton= build.closeButton;

    var $serviceMenuLink = a9.$c('service-menu-link')[0];


    a9.addEvent($body, eventOnPointerEnd, closeServicesMenuItem);
    a9.addEvent($closeButton, eventOnPointerEnd, closeServicesMenuItemByCloseButton);
    a9.addEvent($serviceMenuLink, eventOnPointerEnd, feedbackFormLinkClick);

    function closeServicesMenuItem() {
        a9.addClass($parent, 'hidden');
    }

    function closeServicesMenuItemByCloseButton(e){
        a9.addClass($parent, 'hidden');
        preventCloseFeedbackForm(e);
    }

    function feedbackFormLinkClick(e) {
        showFeedbackForm();
        preventCloseFeedbackForm(e);
    }
    function showFeedbackForm() {
        a9.removeClass($parent, 'hidden');
    }

    function preventCloseFeedbackForm(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }

};

(function (gb,a9) {
    var tmpls = gb.tmpls,
        a9 = gb.global.A9,
        l10n = a9.l10n,
        u;

    tmpls.servicesMenuWrapper = function () {
        return {n: 'servicesMenuWrapper', c: 'service-menu-wrapper hidden'};
    };

    tmpls.servicesMenu = function (data) {

        var educationMenuItems = [],
            organizeMenuItems = [],

            educationBlock = [],
            organizeBlock = [];

        a9.each(data, function (item) {
            var menuItemClass = '',
                menuItem;
            if (item.special === true) {
                menuItemClass = ' special';
            }
            menuItem = {c: 'menu-item' + menuItemClass, C: {e: 'a', h: item.url, t: item.title}};

            if (item.type === 'education') {
                educationMenuItems.push(menuItem);
            } else if (item.type === 'organize') {
                organizeMenuItems.push(menuItem);
            }
        });

        return {
            c: 'service-menu', C: [
                {
                    c: 'triangle'
                },
                {
                    c:'close-button',n:'closeButton'
                },
                {
                    c: 'service-menu-content', C: [
                    tmpls.servicesMenuBlock(educationMenuItems, l10n('servicesMenu_edu', 'firstUpper')),
                    tmpls.servicesMenuBlock(organizeMenuItems, l10n('servicesMenu_org', 'firstUpper'),true)
                ]
                }
            ]
        }
    };

    tmpls.servicesMenuBlock = function (data, title, isLast) {
        var itemsBlockClassName='items-block';
        if(isLast===true){
            itemsBlockClassName+=' last';
        }
        return {c:itemsBlockClassName,C:[{c: 'title', t: title}, {c:'content', C: data}]}
    };

}(GB,A9));
GB.simpleSiteContent = function ($parent) {
    var gb = this,
        global = gb.global,
        tp = global.cnCt.tp,
        settings = gb.settings,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        contentData = settings.dataModels.roadMap,
        build;

    contentData.showRoadMap=true;

    build = tp('simpleSiteContent', contentData, $parent);
    gb.popupForm($parent);

    $serviceMenuWrapper= build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);

    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};
(function (gb) {
    var tmpls = gb.tmpls;

    tmpls.simpleSiteContent = function (pageData) {
        return [
            tmpls.headerBottom(),
            tmpls.simpleSiteContentWrapper(pageData),
            tmpls.paging(),
            tmpls.banners(),
            tmpls.footer(),
            tmpls.mainMenu(pageData.activeMenuItemId),
            tmpls.header(pageData.showBlog, pageData.showRoadMap),
            tmpls.logo()
        ];
    };

    tmpls.simpleSiteContentWrapper = function (blogItem) {
        var
            data = {
                title: blogItem.title
            };

        return {
            c: 'simple-site-content', C: [
                tmpls.siteContentTitleContainer(data),
                tmpls.simpleSiteContentInfo(blogItem)
            ]
        }

    };

    tmpls.simpleSiteContentInfo = function (pageData) {
        return {
            c: 'simple-site-info', C: [
                {
                    c: 'text', H: pageData.text
                }
            ]
        }
    };

}(GB));
GB.siteContent = function($parent){
    var gb = this,
        global = gb.global,
        tp = global.cnCt.tp,
        settings = gb.settings,
        $feedbackFormWrapper,
        $serviceMenuWrapper,
        contentData = settings.dataModels.siteContent,
        build;



    build = tp('simpleSiteContent', contentData, $parent);
    gb.popupForm($parent);
    $serviceMenuWrapper= build.servicesMenuWrapper;
    gb.servicesMenu($serviceMenuWrapper);


    $feedbackFormWrapper = build.feedbackFormWrapper;
    gb.feedbackForm($feedbackFormWrapper);
};
A9.ready(function (a9, global) {
    var gb = global.GB,
    //settings = gb.settings,
    //$body = global.document.body,
    //tp = global.cnCt.tp,
        $ = a9.$,
        $mainPage = $('mainPage'),
        $educationalInstitutions = $('educationalInstitutions'),
        $educationalInstitutionDetails = $('educationalInstitutionDetails'),
        $educationKinds = $('educationKinds'),
        $news = $('news'),
        $newsDetails = $('newsDetails'),
        $blog = $('blog'),
        $roadMap = $('roadMap'),
        $blogDetails = $('blogDetails'),
        $partners = $('partners'),
        $services = $('services'),
        $siteContent = $('siteContent'),
        $contacts = $('contacts'),
        $intro = $('intro'),
        $scrollToTop,


    //domNodesQuery = a9.$cs('showDetails'),
    //$showDetails = domNodesQuery.showDetails,
        i,
        u;


    global.cnCt.bindTemplates(gb.tmpls);

    if ($mainPage !== null) {
        gb.mainPage($mainPage);
    }

    if ($educationalInstitutions !== null) {
        gb.educationalInstitutions($educationalInstitutions);
    }

    if ($educationalInstitutionDetails !== null) {
        gb.educationalInstitutionDetails($educationalInstitutionDetails);
    }

    if ($educationKinds !== null) {
        gb.educationKinds($educationKinds);
    }

    if ($news !== null) {
        gb.news($news);
    }

    if ($newsDetails !== null) {
        gb.newsDetails($newsDetails);
    }

    if ($blog !== null) {
        gb.blog($blog);
    }

    if ($blogDetails !== null) {
        gb.blogDetails($blogDetails);
    }

    if ($roadMap !== null) {
        gb.roadMap($roadMap);
    }

    if ($partners !== null) {
        gb.partners($partners);
    }

    if ( $services!== null) {
        gb.services($services);
    }

    if ($siteContent!== null) {
        gb.siteContent($siteContent);
    }

    if ($contacts !== null) {
        gb.contacts($contacts);
    }

    if ($intro !== null) {
        gb.intro($intro);
    }



    $scrollToTop = $('scrollToTop');
    if ($scrollToTop !== null) {
        gb.scrollToTop($scrollToTop);
    }


    gb.stickyPanels();

});