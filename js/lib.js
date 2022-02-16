! function (modules) {
    var installedModules = {};

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports
    }
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        })
    }, __webpack_require__.r = function (exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        })
    }, __webpack_require__.t = function (value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
                enumerable: !0,
                value: value
            }), 2 & mode && "string" != typeof value)
            for (var key in value) __webpack_require__.d(ns, key, function (key) {
                return value[key]
            }.bind(null, key));
        return ns
    }, __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ? function () {
            return module.default
        } : function () {
            return module
        };
        return __webpack_require__.d(getter, "a", getter), getter
    }, __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0)
}([function (module, exports) {
    var CtTelerWdMiniJS = new function () {
            this.all = function (selector, target) {
                if ("#" == selector[0]) {
                    var element = document.getElementById(selector.slice(1));
                    return element ? [element] : []
                }
                if (target && target.getAttribute && (" " + target.getAttribute("class")).indexOf(selector.split(".").join(" ")) >= 0) return [target];
                return (target && target.getElementsByClassName ? target : document).getElementsByClassName(selector.split(".").join(" "))
            }, this.select = function (selector) {
                return document.querySelector(selector)
            }, this.bind = function (element, event, listener) {
                if (!element) return void console.log("CallCatcher bind error");
                window.addEventListener ? element.addEventListener(event, listener, !1) : window.attachEvent ? element.attachEvent("on" + event, listener) : element["on" + event] = listener
            }, this.text = function (element, val) {
                var text = "innerText" in element ? "innerText" : "textContent";
                if (!val) return element[text];
                element[text] = val
            }, this.ajax = function (url, callback, data, contentType) {
                try {
                    var x = new(void 0 !== (new XMLHttpRequest).withCredentials ? XMLHttpRequest : XDomainRequest);
                    x.open(data ? "POST" : "GET", url + "?timestamp=" + (new Date).valueOf(), 1), contentType && x.setRequestHeader && x.setRequestHeader("Content-Type", contentType), x.onload = function () {
                        callback && callback(x.responseText, x)
                    }, x.onerror = function (e) {
                        console.log("CallTracker xhr error"), console.log(e)
                    }, x.send(data)
                } catch (e) {
                    console.log("CallTracker xhr error"), console.log(e)
                }
            }, this.cookie = function (name, value, minutes) {
                return value ? function (name, value, minutes) {
                    if (minutes) {
                        var date = new Date;
                        date.setTime(date.getTime() + 60 * minutes * 1e3), !date.getHours() && date.setHours(0, 0, 0, 0);
                        var expires = "; expires=" + date.toGMTString()
                    } else var expires = "";
                    document.cookie = name + "=" + value + expires + "; path=/"
                }(name, value, minutes) : function (name) {
                    for (var nameEQ = name + "=", ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
                        for (var c = ca[i];
                            " " == c.charAt(0);) c = c.substring(1, c.length);
                        if (0 == c.indexOf(nameEQ)) return c.substring(nameEQ.length, c.length)
                    }
                    return null
                }(name)
            }, this.cancelBubble = function (e) {
                var evt = e || window.event;
                evt.stopPropagation && evt.stopPropagation();
                null != evt.cancelBubble && (evt.cancelBubble = !0)
            }, this.replaceWith = function (element, content) {
                if (!content) return;
                var container = document.createElement("div");
                container.innerHTML = content, Array.prototype.slice.call(container.childNodes).forEach(function (newElement) {
                    newElement.setAttribute && newElement.setAttribute("ct-phonet", "true"), element.parentNode.insertBefore(newElement, element)
                }), element.parentNode.removeChild(element)
            }, this.arrayContains = function (arr, val) {
                if (!arr || !arr.length) return !1;
                if (!val) return !1;
                if (!Array.prototype.indexOf) return !1;
                return arr.indexOf(val) > -1
            }
        },
        PhonetTracker = new function () {
            this.createSessionToken = function (pageUrl, referrer, callback) {
                var count = 0,
                    token = {
                        date: (new Date).valueOf(),
                        clientId: "0",
                        uaId: "0",
                        utm: createUtm(pageUrl, referrer),
                        pageUrl: pageUrl,
                        referrer: referrer
                    },
                    interval = setInterval(function () {
                        count > 22 && (callback(token), clearInterval(interval)), count++, window.ga && "function" == typeof ga.getAll && ga.getAll().length && (token.clientId = ga.getAll()[ga.getAll().length - 1].get("clientId"), token.uaId = ga.getAll()[ga.getAll().length - 1].get("trackingId"), callback(token), clearInterval(interval))
                    }, 1e3)
            }, this.createHistoryToken = function (pageUrl, referrer) {
                return {
                    pageUrl: pageUrl,
                    referrer: referrer,
                    date: (new Date).valueOf()
                }
            }, this.$createUtm = createUtm, this.$parseUrl = parseUrl, this.$getDomain = getDomain, this.$parsePhone = parsePhone, this.$parsePhoneForHref = parsePhoneForHref, this.getSessionTocken = function (callback) {
                var sessionTocken, oldToken = JSON.parse(localStorage.getItem("ct_utm"));
                PhonetTracker.createSessionToken(location.href, window.document.referrer, function (newToken) {
                    !oldToken || oldToken.utm && "other" === oldToken.utm.source ? sessionTocken = newToken : 1 == newToken.utm.nooverride || "direct" == newToken.utm.source || getDomain(window.document.referrer) == getDomain(location.href) ? (sessionTocken = oldToken).date = newToken.date : sessionTocken = newToken, delete sessionTocken.utm.nooverride, callback(sessionTocken)
                })
            }, this.replacePhones = function (target) {
                var phones = JSON.parse(localStorage.getItem("ct_phones"));
                if (!phones || target && target.getAttribute && target.getAttribute("ct-phonet")) return;
                if (phones.forEach(function (phone) {
                        for (var elements = $.all(phone.selector, target), i = 0; i < elements.length; i++) {
                            if (elements[i].getAttribute("ct-phonet")) return;
                            phone.template.indexOf("<") < 0 ? (elements[i].setAttribute && elements[i].setAttribute("ct-phonet", "true"), $.text(elements[i], parsePhone(phone))) : function (i) {
                                $.replaceWith(elements[i], parsePhone(phone))
                            }(i), phone.displayNumber && elements[i].getAttribute("href") && 0 === elements[i].getAttribute("href").indexOf("tel:") && elements[i].setAttribute("href", parsePhoneForHref(phone))
                        }
                    }), target && target.setAttribute && target.setAttribute("ct-phonet", "true"), !target) {
                    var event;
                    "function" == typeof Event ? event = new Event("Phonet-ct-done") : (event = document.createEvent("Event")).initEvent("Phonet-ct-done", !0, !0), window.document.body.dispatchEvent(event)
                }
            };
            var $ = CtTelerWdMiniJS,
                searchEngine = [{
                    name: "google",
                    regexp: /^www.google/,
                    termParam: "q"
                }, {
                    name: "yandex",
                    regexp: /yandex./,
                    termParam: "text"
                }, {
                    name: "go.mail.ru",
                    regexp: /^go.mail.ru$/,
                    termParam: "q"
                }, {
                    name: "bing",
                    regexp: /^www.bing/,
                    termParam: "q"
                }, {
                    name: "yahoo",
                    regexp: /^search.yahoo/,
                    termParam: "p"
                }, {
                    name: "ask",
                    regexp: /ask.com$/,
                    termParam: "q"
                }, {
                    name: "rambler",
                    regexp: /rambler.ru$/,
                    termParam: "query"
                }, {
                    name: "ukr.net",
                    regexp: /^search.ukr.net$/,
                    termParam: "search_query"
                }, {
                    name: "meta.ua",
                    regexp: /^search.meta.ua$/,
                    termParam: "q"
                }, {
                    name: "i.ua",
                    regexp: /^search.i.ua$/,
                    termParam: "q"
                }, {
                    name: "all.by",
                    regexp: /^all.by$/,
                    termParam: "query"
                }, {
                    name: "search.tut.by",
                    regexp: /^search.tut.by$/,
                    termParam: "query"
                }],
                socialNetwork = [{
                    name: "vk.com",
                    referrer: /vk.com/
                }, {
                    name: "twitter.com",
                    referrer: /t.co/
                }, {
                    name: "facebook.com",
                    referrer: /facebook.com/
                }, {
                    name: "ok.ru",
                    referrer: /ok.ru/
                }, {
                    name: "google+",
                    referrer: /plus.url.google.com/
                }, {
                    name: "linkedin",
                    referrer: /linkedin.com/
                }];

            function createUtm(pageUrl, refUrl) {
                if (!pageUrl) return null;
                var utm, qParams = parseUrl(pageUrl),
                    refParam = parseUrl(refUrl);
                (utm = {}).source = qParams.source || "", utm.medium = qParams.medium || "", utm.campaign = qParams.campaign || "", utm.content = qParams.content || "", utm.term = qParams.term || "", utm.tag = qParams.tag || "", utm.nooverride = qParams.nooverride || "";
                do {
                    if (qParams.gclid || qParams.yclid) {
                        utm.medium = qParams.medium || "cpc", utm.source = qParams.source || (qParams.gclid ? "google" : "yandex"), utm.source = (utm.source + "").toLowerCase();
                        break
                    }
                    if (utm.medium && $.arrayContains(["cpc", "ppc"], utm.medium)) break;
                    if (refUrl) {
                        if (getDomain(refUrl) == getDomain(pageUrl)) {
                            utm.medium = utm.medium || "other", utm.medium = (utm.medium + "").toLowerCase();
                            break
                        }
                        for (var i = 0; i < searchEngine.length; i++)
                            if (searchEngine[i].regexp.test(getDomain(refUrl))) {
                                refParam = parseUrl(refUrl, searchEngine[i].termParam), utm.medium = utm.medium || "organic", utm.source = utm.source || searchEngine[i].name, utm.source = (utm.source + "").toLowerCase(), utm.term = utm.term || refParam.searchTerm || "";
                                break
                            } for (i = 0; i < socialNetwork.length; i++)
                            if (socialNetwork[i].referrer.test(getDomain(refUrl))) {
                                utm.medium = utm.medium || "social", utm.source = utm.source || socialNetwork[i].name, utm.source = (utm.source + "").toLowerCase();
                                break
                            } utm.source || (utm.medium = utm.medium || "referral", utm.source = getDomain(refUrl), utm.content = utm.content || refUrl, utm.term = utm.term || ""), utm.source = (utm.source + "").toLowerCase()
                    } else utm.source = utm.source || "direct"
                } while (0);
                return utm.source = utm.source || "(not set)", utm.medium = utm.medium || "(not set)", utm.campaign = utm.campaign || "(not set)", utm.content = utm.content || "(not set)", utm.term = utm.term || "(not set)", utm.source = (utm.source + "").toLowerCase(), utm
            }

            function parseUrl(url, searchTerm) {
                return !url || url.indexOf("?") < 0 ? {} : url.substring(url.indexOf("?") + 1).split("&").reduce(function (utm, tag) {
                    if ("utm_" == tag.substr(0, 4)) {
                        var key = (tag = tag.split("="))[0].substr(4);
                        if (utm[key] = decodeURIComponent(tag[1]), utm[key]) try {
                            utm[key] = decodeURIComponent(utm[key])
                        } catch (m) {}
                    } else "gclid=" == tag.substr(0, 6) ? (tag = tag.split("="), utm.gclid = tag[1]) : "yclid=" == tag.substr(0, 6) ? (tag = tag.split("="), utm.yclid = tag[1]) : 0 == tag.indexOf(searchTerm + "=") && (tag = tag.split("="), utm.searchTerm = decodeURIComponent(tag[1]));
                    return utm
                }, {})
            }

            function getDomain(url) {
                if (!url) return url;
                var start = url.indexOf("://");
                start >= 0 && (url = url.slice(start + 3, url.length)), 0 === (start = url.indexOf("//")) && (url = url.slice(start + 2, url.length)), 0 === (start = url.indexOf("/")) && (url = url.slice(start + 1, url.length));
                var end = url.indexOf("/");
                return end > 3 && (url = url.slice(0, end)), url
            }

            function parsePhone(Phone) {
                var prefix, code, phoneShort, phone, number = Phone.displayNumber,
                    codeLen = 3;
                0 == number.indexOf("+38") ? (prefix = "+38", 0 == number.indexOf("+380800") && (code = "0 800", codeLen = 4, phone = [(phoneShort = number.substring(prefix.length + codeLen)).slice(0, 3), "-", phoneShort.slice(3)].join(""))) : prefix = number.substring(0, 2), code || (code = number.substring(prefix.length, prefix.length + codeLen)), phoneShort || (phoneShort = number.substring(prefix.length + codeLen)), phone || (phone = [phoneShort.slice(0, 3), "-", phoneShort.slice(3, 5), "-", phoneShort.slice(5)].join(""));
                var phoneSpace = phone.replace(/-/g, " "),
                    fullPhone = prefix + " (" + code + ") " + phone;
                return Phone.template.replace(/{full_phone}/g, fullPhone).replace(/{code}/g, code).replace(/{phone}/g, phone).replace(/{phone_short}/g, phoneShort).replace(/{phone_space}/g, phoneSpace)
            }

            function parsePhoneForHref(Phone) {
                return Phone.displayNumber && Phone.displayNumber.trim() ? 0 == Phone.displayNumber.indexOf("+380800") ? "tel:" + Phone.displayNumber.trim().substring(3) : "tel:" + Phone.displayNumber : ""
            }
        };
    ! function ($) {
        var init = !1;

        function trackCalls() {
            if (!init) {
                init = !0;
                var url = "//" + window.telerTrackerDomain + "/rest/public/widget/call-tracker/" + window.telerTrackerWidgetId + "/session/",
                    sessionId = $.cookie("ct_session"),
                    expireTimeout = localStorage.getItem("ct_session_timeout") || 30;
                sessionId ? ($.ajax(url + sessionId + "/history", function (data) {
                    $.cookie("ct_session", sessionId, expireTimeout)
                }, JSON.stringify(PhonetTracker.createHistoryToken(location.hostname, window.document.referrer)), "application/json; charset=utf-8"), PhonetTracker.replacePhones(), listenDOMChanges()) : PhonetTracker.getSessionTocken(function (sessionToken) {
                    sessionToken = JSON.stringify(sessionToken), localStorage.setItem("ct_utm", sessionToken), $.ajax(url, function (data) {
                        data = JSON.parse(data), data.phones, localStorage.setItem("ct_phones", JSON.stringify(data.phones)), localStorage.setItem("ct_session_timeout", data.expireTimeout), PhonetTracker.replacePhones(), listenDOMChanges(), $.cookie("ct_session", data.sessionUuid, data.expireTimeout)
                    }, sessionToken, "application/json; charset=utf-8")
                })
            }
        }

        function listenDOMChanges() {
            $.bind(document, "DOMNodeInserted", function (e) {
                PhonetTracker.replacePhones(e.target)
            })
        }
        document.readyState && "loading" != document.readyState ? trackCalls() : ($.bind(document, "DOMContentLoaded", trackCalls), $.bind(window, "load", trackCalls))
    }(CtTelerWdMiniJS)
}]);