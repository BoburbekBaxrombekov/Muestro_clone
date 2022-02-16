/* jQuery Form Styler*/ ! function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e($ || require("jquery")) : e(jQuery)
}(function (e) {
  "use strict";

  function t(t, s) {
    this.element = t, this.options = e.extend({}, l, s);
    var i = this.options.locale;
    void 0 !== this.options.locales[i] && e.extend(this.options, this.options.locales[i]), this.init()
  }

  function s(t) {
    if (!e(t.target).parents().hasClass("jq-selectbox") && "OPTION" != t.target.nodeName && e("div.jq-selectbox.opened").length) {
      var s = e("div.jq-selectbox.opened"),
        l = e("div.jq-selectbox__search input", s),
        o = e("div.jq-selectbox__dropdown", s);
      s.find("select").data("_" + i).options.onSelectClosed.call(s), l.length && l.val("").keyup(), o.hide().find("li.sel").addClass("selected"), s.removeClass("focused opened dropup dropdown")
    }
  }
  var i = "styler",
    l = {
      idSuffix: "-styler",
      filePlaceholder: "Файл не выбран",
      fileBrowse: "Обзор...",
      fileNumber: "Выбрано файлов: %s",
      selectPlaceholder: "Выберите...",
      selectSearch: !1,
      selectSearchLimit: 10,
      selectSearchNotFound: "Совпадений не найдено",
      selectSearchPlaceholder: "Поиск...",
      selectVisibleOptions: 0,
      selectSmartPositioning: !0,
      locale: "ru",
      locales: {
        en: {
          filePlaceholder: "No file selected",
          fileBrowse: "Browse...",
          fileNumber: "Selected files: %s",
          selectPlaceholder: "Select...",
          selectSearchNotFound: "No matches found",
          selectSearchPlaceholder: "Search..."
        }
      },
      onSelectOpened: function () {},
      onSelectClosed: function () {},
      onFormStyled: function () {}
    };
  t.prototype = {
    init: function () {
      function t() {
        void 0 !== i.attr("id") && "" !== i.attr("id") && (this.id = i.attr("id") + l.idSuffix), this.title = i.attr("title"), this.classes = i.attr("class"), this.data = i.data()
      }
      var i = e(this.element),
        l = this.options,
        o = !(!navigator.userAgent.match(/(iPad|iPhone|iPod)/i) || navigator.userAgent.match(/(Windows\sPhone)/i)),
        a = !(!navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/(Windows\sPhone)/i));
      if (i.is(":checkbox")) {
        var d = function () {
          var s = new t,
            l = e('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>').attr({
              id: s.id,
              title: s.title
            }).addClass(s.classes).data(s.data);
          i.after(l).prependTo(l), i.is(":checked") && l.addClass("checked"), i.is(":disabled") && l.addClass("disabled"), l.click(function (e) {
            e.preventDefault(), i.triggerHandler("click"), l.is(".disabled") || (i.is(":checked") ? (i.prop("checked", !1), l.removeClass("checked")) : (i.prop("checked", !0), l.addClass("checked")), i.focus().change())
          }), i.closest("label").add('label[for="' + i.attr("id") + '"]').on("click.styler", function (t) {
            e(t.target).is("a") || e(t.target).closest(l).length || (l.triggerHandler("click"), t.preventDefault())
          }), i.on("change.styler", function () {
            i.is(":checked") ? l.addClass("checked") : l.removeClass("checked")
          }).on("keydown.styler", function (e) {
            32 == e.which && l.click()
          }).on("focus.styler", function () {
            l.is(".disabled") || l.addClass("focused")
          }).on("blur.styler", function () {
            l.removeClass("focused")
          })
        };
        d(), i.on("refresh", function () {
          i.closest("label").add('label[for="' + i.attr("id") + '"]').off(".styler"), i.off(".styler").parent().before(i).remove(), d()
        })
      } else if (i.is(":radio")) {
        var r = function () {
          var s = new t,
            l = e('<div class="jq-radio"><div class="jq-radio__div"></div></div>').attr({
              id: s.id,
              title: s.title
            }).addClass(s.classes).data(s.data);
          i.after(l).prependTo(l), i.is(":checked") && l.addClass("checked"), i.is(":disabled") && l.addClass("disabled"), e.fn.commonParents = function () {
            var t = this;
            return t.first().parents().filter(function () {
              return e(this).find(t).length === t.length
            })
          }, e.fn.commonParent = function () {
            return e(this).commonParents().first()
          }, l.click(function (t) {
            if (t.preventDefault(), i.triggerHandler("click"), !l.is(".disabled")) {
              var s = e('input[name="' + i.attr("name") + '"]');
              s.commonParent().find(s).prop("checked", !1).parent().removeClass("checked"), i.prop("checked", !0).parent().addClass("checked"), i.focus().change()
            }
          }), i.closest("label").add('label[for="' + i.attr("id") + '"]').on("click.styler", function (t) {
            e(t.target).is("a") || e(t.target).closest(l).length || (l.triggerHandler("click"), t.preventDefault())
          }), i.on("change.styler", function () {
            i.parent().addClass("checked")
          }).on("focus.styler", function () {
            l.is(".disabled") || l.addClass("focused")
          }).on("blur.styler", function () {
            l.removeClass("focused")
          })
        };
        r(), i.on("refresh", function () {
          i.closest("label").add('label[for="' + i.attr("id") + '"]').off(".styler"), i.off(".styler").parent().before(i).remove(), r()
        })
      } else if (i.is(":file")) {
        var c = function () {
          var s = new t,
            o = i.data("placeholder");
          void 0 === o && (o = l.filePlaceholder);
          var a = i.data("browse");
          void 0 !== a && "" !== a || (a = l.fileBrowse);
          var d = e('<div class="jq-file"><div class="jq-file__name">' + o + '</div><div class="jq-file__browse">' + a + "</div></div>").attr({
            id: s.id,
            title: s.title
          }).addClass(s.classes).data(s.data);
          i.after(d).appendTo(d), i.is(":disabled") && d.addClass("disabled");
          var r = i.val(),
            c = e("div.jq-file__name", d);
          r && c.text(r.replace(/.+[\\\/]/, "")), i.on("change.styler", function () {
            var e = i.val();
            if (i.is("[multiple]")) {
              e = "";
              var t = i[0].files.length;
              if (t > 0) {
                var s = i.data("number");
                void 0 === s && (s = l.fileNumber), s = s.replace("%s", t), e = s
              }
            }
            c.text(e.replace(/.+[\\\/]/, "")), "" === e ? (c.text(o), d.removeClass("changed")) : d.addClass("changed")
          }).on("focus.styler", function () {
            d.addClass("focused")
          }).on("blur.styler", function () {
            d.removeClass("focused")
          }).on("click.styler", function () {
            d.removeClass("focused")
          })
        };
        c(), i.on("refresh", function () {
          i.off(".styler").parent().before(i).remove(), c()
        })
      } else if (i.is('input[type="number"]')) {
        var n = function () {
          var s = new t,
            l = e('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>').attr({
              id: s.id,
              title: s.title
            }).addClass(s.classes).data(s.data);
          i.after(l).prependTo(l).wrap('<div class="jq-number__field"></div>'), i.is(":disabled") && l.addClass("disabled");
          var o, a, d, r = null,
            c = null;
          void 0 !== i.attr("min") && (o = i.attr("min")), void 0 !== i.attr("max") && (a = i.attr("max")), d = void 0 !== i.attr("step") && e.isNumeric(i.attr("step")) ? Number(i.attr("step")) : Number(1);
          var n = function (t) {
            var s, l = i.val();
            e.isNumeric(l) || (l = 0, i.val("0")), t.is(".minus") ? s = Number(l) - d : t.is(".plus") && (s = Number(l) + d);
            var r = (d.toString().split(".")[1] || []).length;
            if (r > 0) {
              for (var c = "1"; c.length <= r;) c += "0";
              s = Math.round(s * c) / c
            }
            e.isNumeric(o) && e.isNumeric(a) ? s >= o && s <= a && i.val(s) : e.isNumeric(o) && !e.isNumeric(a) ? s >= o && i.val(s) : !e.isNumeric(o) && e.isNumeric(a) ? s <= a && i.val(s) : i.val(s)
          };
          l.is(".disabled") || (l.on("mousedown", "div.jq-number__spin", function () {
            var t = e(this);
            n(t), r = setTimeout(function () {
              c = setInterval(function () {
                n(t)
              }, 40)
            }, 350)
          }).on("mouseup mouseout", "div.jq-number__spin", function () {
            clearTimeout(r), clearInterval(c)
          }).on("mouseup", "div.jq-number__spin", function () {
            i.change().trigger("input")
          }), i.on("focus.styler", function () {
            l.addClass("focused")
          }).on("blur.styler", function () {
            l.removeClass("focused")
          }))
        };
        n(), i.on("refresh", function () {
          i.off(".styler").closest(".jq-number").before(i).remove(), n()
        })
      } else if (i.is("select")) {
        var f = function () {
          function d(e) {
            var t = e.prop("scrollHeight") - e.outerHeight(),
              s = null,
              i = null;
            e.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function (l) {
              s = l.originalEvent.detail < 0 || l.originalEvent.wheelDelta > 0 ? 1 : -1, ((i = e.scrollTop()) >= t && s < 0 || i <= 0 && s > 0) && (l.stopPropagation(), l.preventDefault())
            })
          }

          function r() {
            for (var e = 0; e < c.length; e++) {
              var t = c.eq(e),
                s = "",
                i = "",
                o = "",
                a = "",
                d = "",
                r = "",
                f = "",
                h = "",
                u = "";
              t.prop("selected") && (i = "selected sel"), t.is(":disabled") && (i = "disabled"), t.is(":selected:disabled") && (i = "selected sel disabled"), void 0 !== t.attr("id") && "" !== t.attr("id") && (a = ' id="' + t.attr("id") + l.idSuffix + '"'), void 0 !== t.attr("title") && "" !== c.attr("title") && (d = ' title="' + t.attr("title") + '"'), void 0 !== t.attr("class") && (f = " " + t.attr("class"), u = ' data-jqfs-class="' + t.attr("class") + '"');
              var p = t.data();
              for (var v in p) "" !== p[v] && (r += " data-" + v + '="' + p[v] + '"');
              i + f !== "" && (o = ' class="' + i + f + '"'), s = "<li" + u + r + o + d + a + ">" + t.html() + "</li>", t.parent().is("optgroup") && (void 0 !== t.parent().attr("class") && (h = " " + t.parent().attr("class")), s = "<li" + u + r + ' class="' + i + f + " option" + h + '"' + d + a + ">" + t.html() + "</li>", t.is(":first-child") && (s = '<li class="optgroup' + h + '">' + t.parent().attr("label") + "</li>" + s)), n += s
            }
          }
          var c = e("option", i),
            n = "";
          if (i.is("[multiple]")) {
            if (a || o) return;
            ! function () {
              var s = new t,
                l = e('<div class="jq-select-multiple jqselect"></div>').attr({
                  id: s.id,
                  title: s.title
                }).addClass(s.classes).data(s.data);
              i.after(l), r(), l.append("<ul>" + n + "</ul>");
              var o = e("ul", l),
                a = e("li", l),
                f = i.attr("size"),
                h = o.outerHeight(),
                u = a.outerHeight();
              void 0 !== f && f > 0 ? o.css({
                height: u * f
              }) : o.css({
                height: 4 * u
              }), h > l.height() && (o.css("overflowY", "scroll"), d(o), a.filter(".selected").length && o.scrollTop(o.scrollTop() + a.filter(".selected").position().top)), i.prependTo(l), i.is(":disabled") ? (l.addClass("disabled"), c.each(function () {
                e(this).is(":selected") && a.eq(e(this).index()).addClass("selected")
              })) : (a.filter(":not(.disabled):not(.optgroup)").click(function (t) {
                i.focus();
                var s = e(this);
                if (t.ctrlKey || t.metaKey || s.addClass("selected"), t.shiftKey || s.addClass("first"), t.ctrlKey || t.metaKey || t.shiftKey || s.siblings().removeClass("selected first"), (t.ctrlKey || t.metaKey) && (s.is(".selected") ? s.removeClass("selected first") : s.addClass("selected first"), s.siblings().removeClass("first")), t.shiftKey) {
                  var l = !1,
                    o = !1;
                  s.siblings().removeClass("selected").siblings(".first").addClass("selected"), s.prevAll().each(function () {
                    e(this).is(".first") && (l = !0)
                  }), s.nextAll().each(function () {
                    e(this).is(".first") && (o = !0)
                  }), l && s.prevAll().each(function () {
                    if (e(this).is(".selected")) return !1;
                    e(this).not(".disabled, .optgroup").addClass("selected")
                  }), o && s.nextAll().each(function () {
                    if (e(this).is(".selected")) return !1;
                    e(this).not(".disabled, .optgroup").addClass("selected")
                  }), 1 == a.filter(".selected").length && s.addClass("first")
                }
                c.prop("selected", !1), a.filter(".selected").each(function () {
                  var t = e(this),
                    s = t.index();
                  t.is(".option") && (s -= t.prevAll(".optgroup").length), c.eq(s).prop("selected", !0)
                }), i.change()
              }), c.each(function (t) {
                e(this).data("optionIndex", t)
              }), i.on("change.styler", function () {
                a.removeClass("selected");
                var t = [];
                c.filter(":selected").each(function () {
                  t.push(e(this).data("optionIndex"))
                }), a.not(".optgroup").filter(function (s) {
                  return e.inArray(s, t) > -1
                }).addClass("selected")
              }).on("focus.styler", function () {
                l.addClass("focused")
              }).on("blur.styler", function () {
                l.removeClass("focused")
              }), h > l.height() && i.on("keydown.styler", function (e) {
                38 != e.which && 37 != e.which && 33 != e.which || o.scrollTop(o.scrollTop() + a.filter(".selected").position().top - u), 40 != e.which && 39 != e.which && 34 != e.which || o.scrollTop(o.scrollTop() + a.filter(".selected:last").position().top - o.innerHeight() + 2 * u)
              }))
            }()
          } else ! function () {
            var a = new t,
              f = "",
              h = i.data("placeholder"),
              u = i.data("search"),
              p = i.data("search-limit"),
              v = i.data("search-not-found"),
              m = i.data("search-placeholder"),
              g = i.data("smart-positioning");
            void 0 === h && (h = l.selectPlaceholder), void 0 !== u && "" !== u || (u = l.selectSearch), void 0 !== p && "" !== p || (p = l.selectSearchLimit), void 0 !== v && "" !== v || (v = l.selectSearchNotFound), void 0 === m && (m = l.selectSearchPlaceholder), void 0 !== g && "" !== g || (g = l.selectSmartPositioning);
            var b = e('<div class="jq-selectbox jqselect"><div class="jq-selectbox__select"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>').attr({
              id: a.id,
              title: a.title
            }).addClass(a.classes).data(a.data);
            i.after(b).prependTo(b);
            var C = b.css("z-index");
            C = C > 0 ? C : 1;
            var x = e("div.jq-selectbox__select", b),
              y = e("div.jq-selectbox__select-text", b),
              w = c.filter(":selected");
            r(), u && (f = '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + m + '"></div><div class="jq-selectbox__not-found">' + v + "</div>");
            var q = e('<div class="jq-selectbox__dropdown">' + f + "<ul>" + n + "</ul></div>");
            b.append(q);
            var _ = e("ul", q),
              j = e("li", q),
              k = e("input", q),
              S = e("div.jq-selectbox__not-found", q).hide();
            j.length < p && k.parent().hide(), "" === c.first().text() && c.first().is(":selected") && !1 !== h ? y.text(h).addClass("placeholder") : y.text(w.text());
            var T = 0,
              N = 0;
            if (j.css({
                display: "inline-block"
              }), j.each(function () {
                var t = e(this);
                t.innerWidth() > T && (T = t.innerWidth(), N = t.width())
              }), j.css({
                display: ""
              }), y.is(".placeholder") && y.width() > T) y.width(y.width());
            else {
              var P = b.clone().appendTo("body").width("auto"),
                H = P.outerWidth();
              P.remove(), H == b.outerWidth() && y.width(N)
            }
            T > b.width() && q.width(T), "" === c.first().text() && "" !== i.data("placeholder") && j.first().hide();
            var A = b.outerHeight(!0),
              D = k.parent().outerHeight(!0) || 0,
              I = _.css("max-height"),
              K = j.filter(".selected");
            if (K.length < 1 && j.first().addClass("selected sel"), void 0 === j.data("li-height")) {
              var O = j.outerHeight();
              !1 !== h && (O = j.eq(1).outerHeight()), j.data("li-height", O)
            }
            var M = q.css("top");
            if ("auto" == q.css("left") && q.css({
                left: 0
              }), "auto" == q.css("top") && (q.css({
                top: A
              }), M = A), q.hide(), K.length && (c.first().text() != w.text() && b.addClass("changed"), b.data("jqfs-class", K.data("jqfs-class")), b.addClass(K.data("jqfs-class"))), i.is(":disabled")) return b.addClass("disabled"), !1;
            x.click(function () {
              if (e("div.jq-selectbox").filter(".opened").length && l.onSelectClosed.call(e("div.jq-selectbox").filter(".opened")), i.focus(), !o) {
                var t = e(window),
                  s = j.data("li-height"),
                  a = b.offset().top,
                  r = t.height() - A - (a - t.scrollTop()),
                  n = i.data("visible-options");
                void 0 !== n && "" !== n || (n = l.selectVisibleOptions);
                var f = 5 * s,
                  h = s * n;
                n > 0 && n < 6 && (f = h), 0 === n && (h = "auto");
                var u = function () {
                  q.height("auto").css({
                    bottom: "auto",
                    top: M
                  });
                  var e = function () {
                    _.css("max-height", Math.floor((r - 20 - D) / s) * s)
                  };
                  e(), _.css("max-height", h), "none" != I && _.css("max-height", I), r < q.outerHeight() + 20 && e()
                };
                !0 === g || 1 === g ? r > f + D + 20 ? (u(), b.removeClass("dropup").addClass("dropdown")) : (function () {
                  q.height("auto").css({
                    top: "auto",
                    bottom: M
                  });
                  var e = function () {
                    _.css("max-height", Math.floor((a - t.scrollTop() - 20 - D) / s) * s)
                  };
                  e(), _.css("max-height", h), "none" != I && _.css("max-height", I), a - t.scrollTop() - 20 < q.outerHeight() + 20 && e()
                }(), b.removeClass("dropdown").addClass("dropup")) : !1 === g || 0 === g ? r > f + D + 20 && (u(), b.removeClass("dropup").addClass("dropdown")) : (q.height("auto").css({
                  bottom: "auto",
                  top: M
                }), _.css("max-height", h), "none" != I && _.css("max-height", I)), b.offset().left + q.outerWidth() > t.width() && q.css({
                  left: "auto",
                  right: 0
                }), e("div.jqselect").css({
                  zIndex: C - 1
                }).removeClass("opened"), b.css({
                  zIndex: C
                }), q.is(":hidden") ? (e("div.jq-selectbox__dropdown:visible").hide(), q.show(), b.addClass("opened focused"), l.onSelectOpened.call(b)) : (q.hide(), b.removeClass("opened dropup dropdown"), e("div.jq-selectbox").filter(".opened").length && l.onSelectClosed.call(b)), k.length && (k.val("").keyup(), S.hide(), k.keyup(function () {
                  var t = e(this).val();
                  j.each(function () {
                    e(this).html().match(new RegExp(".*?" + t + ".*?", "i")) ? e(this).show() : e(this).hide()
                  }), "" === c.first().text() && "" !== i.data("placeholder") && j.first().hide(), j.filter(":visible").length < 1 ? S.show() : S.hide()
                })), j.filter(".selected").length && ("" === i.val() ? _.scrollTop(0) : (_.innerHeight() / s % 2 != 0 && (s /= 2), _.scrollTop(_.scrollTop() + j.filter(".selected").position().top - _.innerHeight() / 2 + s))), d(_)
              }
            }), j.hover(function () {
              e(this).siblings().removeClass("selected")
            });
            var W = j.filter(".selected").text();
            j.filter(":not(.disabled):not(.optgroup)").click(function () {
              i.focus();
              var t = e(this),
                s = t.text();
              if (!t.is(".selected")) {
                var o = t.index();
                o -= t.prevAll(".optgroup").length, t.addClass("selected sel").siblings().removeClass("selected sel"), c.prop("selected", !1).eq(o).prop("selected", !0), W = s, y.text(s), b.data("jqfs-class") && b.removeClass(b.data("jqfs-class")), b.data("jqfs-class", t.data("jqfs-class")), b.addClass(t.data("jqfs-class")), i.change()
              }
              q.hide(), b.removeClass("opened dropup dropdown"), l.onSelectClosed.call(b)
            }), q.mouseout(function () {
              e("li.sel", q).addClass("selected")
            }), i.on("change.styler", function () {
              y.text(c.filter(":selected").text()).removeClass("placeholder"), j.removeClass("selected sel").not(".optgroup").eq(i[0].selectedIndex).addClass("selected sel"), c.first().text() != j.filter(".selected").text() ? b.addClass("changed") : b.removeClass("changed")
            }).on("focus.styler", function () {
              b.addClass("focused"), e("div.jqselect").not(".focused").removeClass("opened dropup dropdown").find("div.jq-selectbox__dropdown").hide()
            }).on("blur.styler", function () {
              b.removeClass("focused")
            }).on("keydown.styler keyup.styler", function (e) {
              var t = j.data("li-height");
              "" === i.val() ? y.text(h).addClass("placeholder") : y.text(c.filter(":selected").text()), j.removeClass("selected sel").not(".optgroup").eq(i[0].selectedIndex).addClass("selected sel"), 38 != e.which && 37 != e.which && 33 != e.which && 36 != e.which || ("" === i.val() ? _.scrollTop(0) : _.scrollTop(_.scrollTop() + j.filter(".selected").position().top)), 40 != e.which && 39 != e.which && 34 != e.which && 35 != e.which || _.scrollTop(_.scrollTop() + j.filter(".selected").position().top - _.innerHeight() + t), 13 == e.which && (e.preventDefault(), q.hide(), b.removeClass("opened dropup dropdown"), l.onSelectClosed.call(b))
            }).on("keydown.styler", function (e) {
              32 == e.which && (e.preventDefault(), x.click())
            }), s.registered || (e(document).on("click", s), s.registered = !0)
          }()
        };
        f(), i.on("refresh", function () {
          i.off(".styler").parent().before(i).remove(), f()
        })
      } else i.is(":reset") && i.on("click", function () {
        setTimeout(function () {
          i.closest("form").find("input, select").trigger("refresh")
        }, 1)
      })
    },
    destroy: function () {
      var t = e(this.element);
      t.is(":checkbox") || t.is(":radio") ? (t.removeData("_" + i).off(".styler refresh").removeAttr("style").parent().before(t).remove(), t.closest("label").add('label[for="' + t.attr("id") + '"]').off(".styler")) : t.is('input[type="number"]') ? t.removeData("_" + i).off(".styler refresh").closest(".jq-number").before(t).remove() : (t.is(":file") || t.is("select")) && t.removeData("_" + i).off(".styler refresh").removeAttr("style").parent().before(t).remove()
    }
  }, e.fn[i] = function (s) {
    var l = arguments;
    if (void 0 === s || "object" == typeof s) return this.each(function () {
      e.data(this, "_" + i) || e.data(this, "_" + i, new t(this, s))
    }).promise().done(function () {
      var t = e(this[0]).data("_" + i);
      t && t.options.onFormStyled.call()
    }), this;
    if ("string" == typeof s && "_" !== s[0] && "init" !== s) {
      var o;
      return this.each(function () {
        var a = e.data(this, "_" + i);
        a instanceof t && "function" == typeof a[s] && (o = a[s].apply(a, Array.prototype.slice.call(l, 1)))
      }), void 0 !== o ? o : this
    }
  }, s.registered = !1
});
/*Remodal*/
! function (a, b) {
  "function" == typeof define && define.amd ? define(["jquery"], function (c) {
    return b(a, c)
  }) : "object" == typeof exports ? b(a, require("jquery")) : b(a, a.jQuery || a.Zepto)
}(this, function (a, b) {
  "use strict";

  function c(a) {
    if (w && "none" === a.css("animation-name") && "none" === a.css("-webkit-animation-name") && "none" === a.css("-moz-animation-name") && "none" === a.css("-o-animation-name") && "none" === a.css("-ms-animation-name")) return 0;
    var b, c, d, e, f = a.css("animation-duration") || a.css("-webkit-animation-duration") || a.css("-moz-animation-duration") || a.css("-o-animation-duration") || a.css("-ms-animation-duration") || "0s",
      g = a.css("animation-delay") || a.css("-webkit-animation-delay") || a.css("-moz-animation-delay") || a.css("-o-animation-delay") || a.css("-ms-animation-delay") || "0s",
      h = a.css("animation-iteration-count") || a.css("-webkit-animation-iteration-count") || a.css("-moz-animation-iteration-count") || a.css("-o-animation-iteration-count") || a.css("-ms-animation-iteration-count") || "1";
    for (f = f.split(", "), g = g.split(", "), h = h.split(", "), e = 0, c = f.length, b = Number.NEGATIVE_INFINITY; e < c; e++) d = parseFloat(f[e]) * parseInt(h[e], 10) + parseFloat(g[e]), d > b && (b = d);
    return b
  }

  function d() {
    if (b(document).height() <= b(window).height()) return 0;
    var a, c, d = document.createElement("div"),
      e = document.createElement("div");
    return d.style.visibility = "hidden", d.style.width = "100px", document.body.appendChild(d), a = d.offsetWidth, d.style.overflow = "scroll", e.style.width = "100%", d.appendChild(e), c = e.offsetWidth, d.parentNode.removeChild(d), a - c
  }

  function e() {
    if (!x) {
      var a, c, e = b("html"),
        f = k("is-locked");
      e.hasClass(f) || (c = b(document.body), a = parseInt(c.css("padding-right"), 10) + d(), c.css("padding-right", a + "px"), e.addClass(f))
    }
  }

  function f() {
    if (!x) {
      var a, c, e = b("html"),
        f = k("is-locked");
      e.hasClass(f) && (c = b(document.body), a = parseInt(c.css("padding-right"), 10) - d(), c.css("padding-right", a + "px"), e.removeClass(f))
    }
  }

  function g(a, b, c, d) {
    var e = k("is", b),
      f = [k("is", u.CLOSING), k("is", u.OPENING), k("is", u.CLOSED), k("is", u.OPENED)].join(" ");
    a.$bg.removeClass(f).addClass(e), a.$overlay.removeClass(f).addClass(e), a.$wrapper.removeClass(f).addClass(e), a.$modal.removeClass(f).addClass(e), a.state = b, !c && a.$modal.trigger({
      type: b,
      reason: d
    }, [{
      reason: d
    }])
  }

  function h(a, d, e) {
    var f = 0,
      g = function (a) {
        a.target === this && f++
      },
      h = function (a) {
        a.target === this && 0 === --f && (b.each(["$bg", "$overlay", "$wrapper", "$modal"], function (a, b) {
          e[b].off(r + " " + s)
        }), d())
      };
    b.each(["$bg", "$overlay", "$wrapper", "$modal"], function (a, b) {
      e[b].on(r, g).on(s, h)
    }), a(), 0 === c(e.$bg) && 0 === c(e.$overlay) && 0 === c(e.$wrapper) && 0 === c(e.$modal) && (b.each(["$bg", "$overlay", "$wrapper", "$modal"], function (a, b) {
      e[b].off(r + " " + s)
    }), d())
  }

  function i(a) {
    a.state !== u.CLOSED && (b.each(["$bg", "$overlay", "$wrapper", "$modal"], function (b, c) {
      a[c].off(r + " " + s)
    }), a.$bg.removeClass(a.settings.modifier), a.$overlay.removeClass(a.settings.modifier).hide(), a.$wrapper.hide(), f(), g(a, u.CLOSED, !0))
  }

  function j(a) {
    var b, c, d, e, f = {};
    for (a = a.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ","), b = a.split(","), e = 0, c = b.length; e < c; e++) b[e] = b[e].split(":"), d = b[e][1], ("string" == typeof d || d instanceof String) && (d = "true" === d || "false" !== d && d), ("string" == typeof d || d instanceof String) && (d = isNaN(d) ? d : +d), f[b[e][0]] = d;
    return f
  }

  function k() {
    for (var a = q, b = 0; b < arguments.length; ++b) a += "-" + arguments[b];
    return a
  }

  function l() {
    var a, c, d = location.hash.replace("#", "");
    if (d) {
      try {
        c = b('[data-remodal-id="' + d + '"]')
      } catch (e) {}
      c && c.length && (a = b[p].lookup[c.data(p)], a && a.settings.hashTracking && a.open())
    } else n && n.state === u.OPENED && n.settings.hashTracking && n.close()
  }

  function m(a, c) {
    var d = b(document.body),
      e = d,
      f = this;
    f.settings = b.extend({}, t, c), f.index = b[p].lookup.push(f) - 1, f.state = u.CLOSED, f.$overlay = b("." + k("overlay")), null !== f.settings.appendTo && f.settings.appendTo.length && (e = b(f.settings.appendTo)), f.$overlay.length || (f.$overlay = b("<div>").addClass(k("overlay") + " " + k("is", u.CLOSED)).hide(), e.append(f.$overlay)), f.$bg = b("." + k("bg")).addClass(k("is", u.CLOSED)), f.$modal = a.addClass(q + " " + k("is-initialized") + " " + f.settings.modifier + " " + k("is", u.CLOSED)).attr("tabindex", "-1"), f.$wrapper = b("<div>").addClass(k("wrapper") + " " + f.settings.modifier + " " + k("is", u.CLOSED)).hide().append(f.$modal), e.append(f.$wrapper), f.$wrapper.on("click." + q, '[data-remodal-action="close"]', function (a) {
      a.preventDefault(), f.close()
    }), f.$wrapper.on("click." + q, '[data-remodal-action="cancel"]', function (a) {
      a.preventDefault(), f.$modal.trigger(v.CANCELLATION), f.settings.closeOnCancel && f.close(v.CANCELLATION)
    }), f.$wrapper.on("click." + q, '[data-remodal-action="confirm"]', function (a) {
      a.preventDefault(), f.$modal.trigger(v.CONFIRMATION), f.settings.closeOnConfirm && f.close(v.CONFIRMATION)
    }), f.$wrapper.on("click." + q, function (a) {
      var c = b(a.target);
      c.hasClass(k("wrapper")) && f.settings.closeOnOutsideClick && f.close()
    })
  }
  var n, o, p = "remodal",
    q = a.REMODAL_GLOBALS && a.REMODAL_GLOBALS.NAMESPACE || p,
    r = b.map(["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"], function (a) {
      return a + "." + q
    }).join(" "),
    s = b.map(["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"], function (a) {
      return a + "." + q
    }).join(" "),
    t = b.extend({
      hashTracking: !0,
      closeOnConfirm: !0,
      closeOnCancel: !0,
      closeOnEscape: !0,
      closeOnOutsideClick: !0,
      modifier: "",
      appendTo: null
    }, a.REMODAL_GLOBALS && a.REMODAL_GLOBALS.DEFAULTS),
    u = {
      CLOSING: "closing",
      CLOSED: "closed",
      OPENING: "opening",
      OPENED: "opened"
    },
    v = {
      CONFIRMATION: "confirmation",
      CANCELLATION: "cancellation"
    },
    w = function () {
      var a = document.createElement("div").style;
      return void 0 !== a.animationName || void 0 !== a.WebkitAnimationName || void 0 !== a.MozAnimationName || void 0 !== a.msAnimationName || void 0 !== a.OAnimationName
    }(),
    x = /iPad|iPhone|iPod/.test(navigator.platform);
  m.prototype.open = function () {
    var a, c = this;
    c.state !== u.OPENING && c.state !== u.CLOSING && (a = c.$modal.attr("data-remodal-id"), a && c.settings.hashTracking && (o = b(window).scrollTop(), location.hash = a), n && n !== c && i(n), n = c, e(), c.$bg.addClass(c.settings.modifier), c.$overlay.addClass(c.settings.modifier).show(), c.$wrapper.show().scrollTop(0), c.$modal.focus(), h(function () {
      g(c, u.OPENING)
    }, function () {
      g(c, u.OPENED)
    }, c))
  }, m.prototype.close = function (a) {
    var c = this;
    c.state !== u.OPENING && c.state !== u.CLOSING && c.state !== u.CLOSED && (c.settings.hashTracking && c.$modal.attr("data-remodal-id") === location.hash.substr(1) && (location.hash = "", b(window).scrollTop(o)), h(function () {
      g(c, u.CLOSING, !1, a)
    }, function () {
      c.$bg.removeClass(c.settings.modifier), c.$overlay.removeClass(c.settings.modifier).hide(), c.$wrapper.hide(), f(), g(c, u.CLOSED, !1, a)
    }, c))
  }, m.prototype.getState = function () {
    return this.state
  }, m.prototype.destroy = function () {
    var a, c = b[p].lookup;
    i(this), this.$wrapper.remove(), delete c[this.index], a = b.grep(c, function (a) {
      return !!a
    }).length, 0 === a && (this.$overlay.remove(), this.$bg.removeClass(k("is", u.CLOSING) + " " + k("is", u.OPENING) + " " + k("is", u.CLOSED) + " " + k("is", u.OPENED)))
  }, b[p] = {
    lookup: []
  }, b.fn[p] = function (a) {
    var c, d;
    return this.each(function (e, f) {
      d = b(f), null == d.data(p) ? (c = new m(d, a), d.data(p, c.index), c.settings.hashTracking && d.attr("data-remodal-id") === location.hash.substr(1) && c.open()) : c = b[p].lookup[d.data(p)]
    }), c
  }, b(document).ready(function () {
    b(document).on("click", "[data-remodal-target]", function (a) {
      a.preventDefault();
      var c = a.currentTarget,
        d = c.getAttribute("data-remodal-target"),
        e = b('[data-remodal-id="' + d + '"]');
      b[p].lookup[e.data(p)].open()
    }), b(document).find("." + q).each(function (a, c) {
      var d = b(c),
        e = d.data("remodal-options");
      e ? ("string" == typeof e || e instanceof String) && (e = j(e)) : e = {}, d[p](e)
    }), b(document).on("keydown." + q, function (a) {
      n && n.settings.closeOnEscape && n.state === u.OPENED && 27 === a.keyCode && n.close()
    }), b(window).on("hashchange." + q, l)
  })
});
/*! WOW */
! function (a, b) {
  if ("function" == typeof define && define.amd) define(["module", "exports"], b);
  else if ("undefined" != typeof exports) b(module, exports);
  else {
    var c = {
      exports: {}
    };
    b(c, c.exports), a.WOW = c.exports
  }
}(this, function (a, b) {
  "use strict";

  function c(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
  }

  function d(a, b) {
    return b.indexOf(a) >= 0
  }

  function e(a, b) {
    for (var c in b)
      if (null == a[c]) {
        var d = b[c];
        a[c] = d
      } return a
  }

  function f(a) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
  }

  function g(a) {
    var b = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
      c = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
      d = arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3],
      e = void 0;
    return null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
  }

  function h(a, b) {
    null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) && a["on" + b]()
  }

  function i(a, b, c) {
    null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
  }

  function j(a, b, c) {
    null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
  }

  function k() {
    return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
  }
  Object.defineProperty(b, "__esModule", {
    value: !0
  });
  var l, m, n = function () {
      function a(a, b) {
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
        }
      }
      return function (b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b
      }
    }(),
    o = window.WeakMap || window.MozWeakMap || function () {
      function a() {
        c(this, a), this.keys = [], this.values = []
      }
      return n(a, [{
        key: "get",
        value: function (a) {
          for (var b = 0; b < this.keys.length; b++) {
            var c = this.keys[b];
            if (c === a) return this.values[b]
          }
        }
      }, {
        key: "set",
        value: function (a, b) {
          for (var c = 0; c < this.keys.length; c++) {
            var d = this.keys[c];
            if (d === a) return this.values[c] = b, this
          }
          return this.keys.push(a), this.values.push(b), this
        }
      }]), a
    }(),
    p = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (m = l = function () {
      function a() {
        c(this, a), "undefined" != typeof console && null !== console && (console.warn("MutationObserver is not supported by your browser."), console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))
      }
      return n(a, [{
        key: "observe",
        value: function () {}
      }]), a
    }(), l.notSupported = !0, m),
    q = window.getComputedStyle || function (a) {
      var b = /(\-([a-z]){1})/g;
      return {
        getPropertyValue: function (c) {
          "float" === c && (c = "styleFloat"), b.test(c) && c.replace(b, function (a, b) {
            return b.toUpperCase()
          });
          var d = a.currentStyle;
          return (null != d ? d[c] : void 0) || null
        }
      }
    },
    r = function () {
      function a() {
        var b = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        c(this, a), this.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
          callback: null,
          scrollContainer: null,
          resetAnimation: !0
        }, this.animate = function () {
          return "requestAnimationFrame" in window ? function (a) {
            return window.requestAnimationFrame(a)
          } : function (a) {
            return a()
          }
        }(), this.vendors = ["moz", "webkit"], this.start = this.start.bind(this), this.resetAnimation = this.resetAnimation.bind(this), this.scrollHandler = this.scrollHandler.bind(this), this.scrollCallback = this.scrollCallback.bind(this), this.scrolled = !0, this.config = e(b, this.defaults), null != b.scrollContainer && (this.config.scrollContainer = document.querySelector(b.scrollContainer)), this.animationNameCache = new o, this.wowEvent = g(this.config.boxClass)
      }
      return n(a, [{
        key: "init",
        value: function () {
          this.element = window.document.documentElement, d(document.readyState, ["interactive", "complete"]) ? this.start() : i(document, "DOMContentLoaded", this.start), this.finished = []
        }
      }, {
        key: "start",
        value: function () {
          var a = this;
          if (this.stopped = !1, this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass)), this.all = this.boxes.slice(0), this.boxes.length)
            if (this.disabled()) this.resetStyle();
            else
              for (var b = 0; b < this.boxes.length; b++) {
                var c = this.boxes[b];
                this.applyStyle(c, !0)
              }
          if (this.disabled() || (i(this.config.scrollContainer || window, "scroll", this.scrollHandler), i(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live) {
            var d = new p(function (b) {
              for (var c = 0; c < b.length; c++)
                for (var d = b[c], e = 0; e < d.addedNodes.length; e++) {
                  var f = d.addedNodes[e];
                  a.doSync(f)
                }
            });
            d.observe(document.body, {
              childList: !0,
              subtree: !0
            })
          }
        }
      }, {
        key: "stop",
        value: function () {
          this.stopped = !0, j(this.config.scrollContainer || window, "scroll", this.scrollHandler), j(window, "resize", this.scrollHandler), null != this.interval && clearInterval(this.interval)
        }
      }, {
        key: "sync",
        value: function () {
          p.notSupported && this.doSync(this.element)
        }
      }, {
        key: "doSync",
        value: function (a) {
          if ("undefined" != typeof a && null !== a || (a = this.element), 1 === a.nodeType) {
            a = a.parentNode || a;
            for (var b = a.querySelectorAll("." + this.config.boxClass), c = 0; c < b.length; c++) {
              var e = b[c];
              d(e, this.all) || (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), this.scrolled = !0)
            }
          }
        }
      }, {
        key: "show",
        value: function (a) {
          return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), h(a, this.wowEvent), this.config.resetAnimation && (i(a, "animationend", this.resetAnimation), i(a, "oanimationend", this.resetAnimation), i(a, "webkitAnimationEnd", this.resetAnimation), i(a, "MSAnimationEnd", this.resetAnimation)), a
        }
      }, {
        key: "applyStyle",
        value: function (a, b) {
          var c = this,
            d = a.getAttribute("data-wow-duration"),
            e = a.getAttribute("data-wow-delay"),
            f = a.getAttribute("data-wow-iteration");
          return this.animate(function () {
            return c.customStyle(a, b, d, e, f)
          })
        }
      }, {
        key: "resetStyle",
        value: function () {
          for (var a = 0; a < this.boxes.length; a++) {
            var b = this.boxes[a];
            b.style.visibility = "visible"
          }
        }
      }, {
        key: "resetAnimation",
        value: function (a) {
          if (a.type.toLowerCase().indexOf("animationend") >= 0) {
            var b = a.target || a.srcElement;
            b.className = b.className.replace(this.config.animateClass, "").trim()
          }
        }
      }, {
        key: "customStyle",
        value: function (a, b, c, d, e) {
          return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
            animationDuration: c
          }), d && this.vendorSet(a.style, {
            animationDelay: d
          }), e && this.vendorSet(a.style, {
            animationIterationCount: e
          }), this.vendorSet(a.style, {
            animationName: b ? "none" : this.cachedAnimationName(a)
          }), a
        }
      }, {
        key: "vendorSet",
        value: function (a, b) {
          for (var c in b)
            if (b.hasOwnProperty(c)) {
              var d = b[c];
              a["" + c] = d;
              for (var e = 0; e < this.vendors.length; e++) {
                var f = this.vendors[e];
                a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = d
              }
            }
        }
      }, {
        key: "vendorCSS",
        value: function (a, b) {
          for (var c = q(a), d = c.getPropertyCSSValue(b), e = 0; e < this.vendors.length; e++) {
            var f = this.vendors[e];
            d = d || c.getPropertyCSSValue("-" + f + "-" + b)
          }
          return d
        }
      }, {
        key: "animationName",
        value: function (a) {
          var b = void 0;
          try {
            b = this.vendorCSS(a, "animation-name").cssText
          } catch (c) {
            b = q(a).getPropertyValue("animation-name")
          }
          return "none" === b ? "" : b
        }
      }, {
        key: "cacheAnimationName",
        value: function (a) {
          return this.animationNameCache.set(a, this.animationName(a))
        }
      }, {
        key: "cachedAnimationName",
        value: function (a) {
          return this.animationNameCache.get(a)
        }
      }, {
        key: "scrollHandler",
        value: function () {
          this.scrolled = !0
        }
      }, {
        key: "scrollCallback",
        value: function () {
          if (this.scrolled) {
            this.scrolled = !1;
            for (var a = [], b = 0; b < this.boxes.length; b++) {
              var c = this.boxes[b];
              if (c) {
                if (this.isVisible(c)) {
                  this.show(c);
                  continue
                }
                a.push(c)
              }
            }
            this.boxes = a, this.boxes.length || this.config.live || this.stop()
          }
        }
      }, {
        key: "offsetTop",
        value: function (a) {
          for (; void 0 === a.offsetTop;) a = a.parentNode;
          for (var b = a.offsetTop; a.offsetParent;) a = a.offsetParent, b += a.offsetTop;
          return b
        }
      }, {
        key: "isVisible",
        value: function (a) {
          var b = a.getAttribute("data-wow-offset") || this.config.offset,
            c = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset,
            d = c + Math.min(this.element.clientHeight, k()) - b,
            e = this.offsetTop(a),
            f = e + a.clientHeight;
          return d >= e && f >= c
        }
      }, {
        key: "disabled",
        value: function () {
          return !this.config.mobile && f(navigator.userAgent)
        }
      }]), a
    }();
  b["default"] = r, a.exports = b["default"]
});
/*lazyload*/
function _extends() {
  return (_extends = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
    }
    return t
  }).apply(this, arguments)
}

function _typeof(t) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
  })(t)
}! function (t, e) {
  "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.LazyLoad = e()
}(this, function () {
  "use strict";
  var t = "undefined" != typeof window,
    e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
    n = t && "IntersectionObserver" in window,
    o = t && "classList" in document.createElement("p"),
    r = {
      elements_selector: "img",
      container: e || t ? document : null,
      threshold: 300,
      thresholds: null,
      data_src: "src",
      data_srcset: "srcset",
      data_sizes: "sizes",
      data_bg: "bg",
      class_loading: "loading",
      class_loaded: "loaded",
      class_error: "error",
      load_delay: 0,
      auto_unobserve: !0,
      callback_enter: null,
      callback_exit: null,
      callback_reveal: null,
      callback_loaded: null,
      callback_error: null,
      callback_finish: null,
      use_native: !1
    },
    a = function (t, e) {
      var n, o = new t(e);
      try {
        n = new CustomEvent("LazyLoad::Initialized", {
          detail: {
            instance: o
          }
        })
      } catch (t) {
        (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, {
          instance: o
        })
      }
      window.dispatchEvent(n)
    };
  var i = function (t, e) {
      return t.getAttribute("data-" + e)
    },
    s = function (t, e, n) {
      var o = "data-" + e;
      null !== n ? t.setAttribute(o, n) : t.removeAttribute(o)
    },
    c = function (t) {
      return "true" === i(t, "was-processed")
    },
    l = function (t, e) {
      return s(t, "ll-timeout", e)
    },
    u = function (t) {
      return i(t, "ll-timeout")
    },
    d = function (t, e) {
      t && t(e)
    },
    f = function (t, e) {
      t._loadingCount += e, 0 === t._elements.length && 0 === t._loadingCount && d(t._settings.callback_finish)
    },
    _ = function (t) {
      for (var e, n = [], o = 0; e = t.children[o]; o += 1) "SOURCE" === e.tagName && n.push(e);
      return n
    },
    v = function (t, e, n) {
      n && t.setAttribute(e, n)
    },
    g = function (t, e) {
      v(t, "sizes", i(t, e.data_sizes)), v(t, "srcset", i(t, e.data_srcset)), v(t, "src", i(t, e.data_src))
    },
    m = {
      IMG: function (t, e) {
        var n = t.parentNode;
        n && "PICTURE" === n.tagName && _(n).forEach(function (t) {
          g(t, e)
        });
        g(t, e)
      },
      IFRAME: function (t, e) {
        v(t, "src", i(t, e.data_src))
      },
      VIDEO: function (t, e) {
        _(t).forEach(function (t) {
          v(t, "src", i(t, e.data_src))
        }), v(t, "src", i(t, e.data_src)), t.load()
      }
    },
    b = function (t, e) {
      var n, o, r = e._settings,
        a = t.tagName,
        s = m[a];
      if (s) return s(t, r), f(e, 1), void(e._elements = (n = e._elements, o = t, n.filter(function (t) {
        return t !== o
      })));
      ! function (t, e) {
        var n = i(t, e.data_src),
          o = i(t, e.data_bg);
        n && (t.style.backgroundImage = 'url("'.concat(n, '")')), o && (t.style.backgroundImage = o)
      }(t, r)
    },
    h = function (t, e) {
      o ? t.classList.add(e) : t.className += (t.className ? " " : "") + e
    },
    p = function (t, e, n) {
      t.addEventListener(e, n)
    },
    y = function (t, e, n) {
      t.removeEventListener(e, n)
    },
    E = function (t, e, n) {
      y(t, "load", e), y(t, "loadeddata", e), y(t, "error", n)
    },
    w = function (t, e, n) {
      var r = n._settings,
        a = e ? r.class_loaded : r.class_error,
        i = e ? r.callback_loaded : r.callback_error,
        s = t.target;
      ! function (t, e) {
        o ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
      }(s, r.class_loading), h(s, a), d(i, s), f(n, -1)
    },
    I = function (t, e) {
      var n = function n(r) {
          w(r, !0, e), E(t, n, o)
        },
        o = function o(r) {
          w(r, !1, e), E(t, n, o)
        };
      ! function (t, e, n) {
        p(t, "load", e), p(t, "loadeddata", e), p(t, "error", n)
      }(t, n, o)
    },
    k = ["IMG", "IFRAME", "VIDEO"],
    A = function (t, e) {
      var n = e._observer;
      z(t, e), n && e._settings.auto_unobserve && n.unobserve(t)
    },
    L = function (t) {
      var e = u(t);
      e && (clearTimeout(e), l(t, null))
    },
    x = function (t, e) {
      var n = e._settings.load_delay,
        o = u(t);
      o || (o = setTimeout(function () {
        A(t, e), L(t)
      }, n), l(t, o))
    },
    z = function (t, e, n) {
      var o = e._settings;
      !n && c(t) || (k.indexOf(t.tagName) > -1 && (I(t, e), h(t, o.class_loading)), b(t, e), function (t) {
        s(t, "was-processed", "true")
      }(t), d(o.callback_reveal, t), d(o.callback_set, t))
    },
    O = function (t) {
      return !!n && (t._observer = new IntersectionObserver(function (e) {
        e.forEach(function (e) {
          return function (t) {
            return t.isIntersecting || t.intersectionRatio > 0
          }(e) ? function (t, e) {
            var n = e._settings;
            d(n.callback_enter, t), n.load_delay ? x(t, e) : A(t, e)
          }(e.target, t) : function (t, e) {
            var n = e._settings;
            d(n.callback_exit, t), n.load_delay && L(t)
          }(e.target, t)
        })
      }, {
        root: (e = t._settings).container === document ? null : e.container,
        rootMargin: e.thresholds || e.threshold + "px"
      }), !0);
      var e
    },
    N = ["IMG", "IFRAME"],
    C = function (t, e) {
      return function (t) {
        return t.filter(function (t) {
          return !c(t)
        })
      }((n = t || function (t) {
        return t.container.querySelectorAll(t.elements_selector)
      }(e), Array.prototype.slice.call(n)));
      var n
    },
    M = function (t, e) {
      this._settings = function (t) {
        return _extends({}, r, t)
      }(t), this._loadingCount = 0, O(this), this.update(e)
    };
  return M.prototype = {
    update: function (t) {
      var n, o = this,
        r = this._settings;
      (this._elements = C(t, r), !e && this._observer) ? (function (t) {
        return t.use_native && "loading" in HTMLImageElement.prototype
      }(r) && ((n = this)._elements.forEach(function (t) {
        -1 !== N.indexOf(t.tagName) && (t.setAttribute("loading", "lazy"), z(t, n))
      }), this._elements = C(t, r)), this._elements.forEach(function (t) {
        o._observer.observe(t)
      })) : this.loadAll()
    },
    destroy: function () {
      var t = this;
      this._observer && (this._elements.forEach(function (e) {
        t._observer.unobserve(e)
      }), this._observer = null), this._elements = null, this._settings = null
    },
    load: function (t, e) {
      z(t, this, e)
    },
    loadAll: function () {
      var t = this;
      this._elements.forEach(function (e) {
        A(e, t)
      })
    }
  }, t && function (t, e) {
    if (e)
      if (e.length)
        for (var n, o = 0; n = e[o]; o += 1) a(t, n);
      else a(t, e)
  }(M, window.lazyLoadOptions), M
});
/*slick*/
! function (i) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function (i) {
  "use strict";
  var e = window.Slick || {};
  (e = function () {
    var e = 0;
    return function (t, o) {
      var s, n = this;
      n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1)
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, n.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: !1,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        swiping: !1,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
    }
  }()).prototype.activateADA = function () {
    this.$slideTrack.find(".slick-active").attr({
      "aria-hidden": "false"
    }).find("a, input, button, select").attr({
      tabindex: "0"
    })
  }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
    var s = this;
    if ("boolean" == typeof t) o = t, t = null;
    else if (t < 0 || t >= s.slideCount) return !1;
    s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
      i(t).attr("data-slick-index", e)
    }), s.$slidesCache = s.$slides, s.reinit()
  }, e.prototype.animateHeight = function () {
    var i = this;
    if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
      var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
      i.$list.animate({
        height: e
      }, i.options.speed)
    }
  }, e.prototype.animateSlide = function (e, t) {
    var o = {},
      s = this;
    s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
      left: e
    }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
      top: e
    }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
      animStart: s.currentLeft
    }).animate({
      animStart: e
    }, {
      duration: s.options.speed,
      easing: s.options.easing,
      step: function (i) {
        i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
      },
      complete: function () {
        t && t.call()
      }
    })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
      s.disableTransition(), t.call()
    }, s.options.speed))
  }, e.prototype.getNavTarget = function () {
    var e = this,
      t = e.options.asNavFor;
    return t && null !== t && (t = i(t).not(e.$slider)), t
  }, e.prototype.asNavFor = function (e) {
    var t = this.getNavTarget();
    null !== t && "object" == typeof t && t.each(function () {
      var t = i(this).slick("getSlick");
      t.unslicked || t.slideHandler(e, !0)
    })
  }, e.prototype.applyTransition = function (i) {
    var e = this,
      t = {};
    !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
  }, e.prototype.autoPlay = function () {
    var i = this;
    i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
  }, e.prototype.autoPlayClear = function () {
    var i = this;
    i.autoPlayTimer && clearInterval(i.autoPlayTimer)
  }, e.prototype.autoPlayIterator = function () {
    var i = this,
      e = i.currentSlide + i.options.slidesToScroll;
    i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
  }, e.prototype.buildArrows = function () {
    var e = this;
    !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }))
  }, e.prototype.buildDots = function () {
    var e, t, o = this;
    if (!0 === o.options.dots) {
      for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
      o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
    }
  }, e.prototype.buildOut = function () {
    var e = this;
    e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
      i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
    }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
  }, e.prototype.buildRows = function () {
    var i, e, t, o, s, n, r, l = this;
    if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
      for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
        var d = document.createElement("div");
        for (e = 0; e < l.options.rows; e++) {
          var a = document.createElement("div");
          for (t = 0; t < l.options.slidesPerRow; t++) {
            var c = i * r + (e * l.options.slidesPerRow + t);
            n.get(c) && a.appendChild(n.get(c))
          }
          d.appendChild(a)
        }
        o.appendChild(d)
      }
      l.$slider.empty().append(o), l.$slider.children().children().children().css({
        width: 100 / l.options.slidesPerRow + "%",
        display: "inline-block"
      })
    }
  }, e.prototype.checkResponsive = function (e, t) {
    var o, s, n, r = this,
      l = !1,
      d = r.$slider.width(),
      a = window.innerWidth || i(window).width();
    if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
      s = null;
      for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
      null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
    }
  }, e.prototype.changeSlide = function (e, t) {
    var o, s, n, r = this,
      l = i(e.currentTarget);
    switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
      case "previous":
        s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
        break;
      case "next":
        s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
        break;
      case "index":
        var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
        r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
        break;
      default:
        return
    }
  }, e.prototype.checkNavigable = function (i) {
    var e, t;
    if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
    else
      for (var o in e) {
        if (i < e[o]) {
          i = t;
          break
        }
        t = e[o]
      }
    return i
  }, e.prototype.cleanUpEvents = function () {
    var e = this;
    e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
  }, e.prototype.cleanUpSlideEvents = function () {
    var e = this;
    e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
  }, e.prototype.cleanUpRows = function () {
    var i, e = this;
    e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
  }, e.prototype.clickHandler = function (i) {
    !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
  }, e.prototype.destroy = function (e) {
    var t = this;
    t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
      i(this).attr("style", i(this).data("originalStyling"))
    }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
  }, e.prototype.disableTransition = function (i) {
    var e = this,
      t = {};
    t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
  }, e.prototype.fadeSlide = function (i, e) {
    var t = this;
    !1 === t.cssTransitions ? (t.$slides.eq(i).css({
      zIndex: t.options.zIndex
    }), t.$slides.eq(i).animate({
      opacity: 1
    }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
      opacity: 1,
      zIndex: t.options.zIndex
    }), e && setTimeout(function () {
      t.disableTransition(i), e.call()
    }, t.options.speed))
  }, e.prototype.fadeSlideOut = function (i) {
    var e = this;
    !1 === e.cssTransitions ? e.$slides.eq(i).animate({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }))
  }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
    var e = this;
    null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
  }, e.prototype.focusHandler = function () {
    var e = this;
    e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
      t.stopImmediatePropagation();
      var o = i(this);
      setTimeout(function () {
        e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
      }, 0)
    })
  }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
    return this.currentSlide
  }, e.prototype.getDotCount = function () {
    var i = this,
      e = 0,
      t = 0,
      o = 0;
    if (!0 === i.options.infinite)
      if (i.slideCount <= i.options.slidesToShow) ++o;
      else
        for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
    else if (!0 === i.options.centerMode) o = i.slideCount;
    else if (i.options.asNavFor)
      for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
    else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
    return o - 1
  }, e.prototype.getLeft = function (i) {
    var e, t, o, s, n = this,
      r = 0;
    return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
  }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
    return this.options[i]
  }, e.prototype.getNavigableIndexes = function () {
    var i, e = this,
      t = 0,
      o = 0,
      s = [];
    for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
    return s
  }, e.prototype.getSlick = function () {
    return this
  }, e.prototype.getSlideCount = function () {
    var e, t, o = this;
    return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
      if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
    }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
  }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
    this.changeSlide({
      data: {
        message: "index",
        index: parseInt(i)
      }
    }, e)
  }, e.prototype.init = function (e) {
    var t = this;
    i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
  }, e.prototype.initADA = function () {
    var e = this,
      t = Math.ceil(e.slideCount / e.options.slidesToShow),
      o = e.getNavigableIndexes().filter(function (i) {
        return i >= 0 && i < e.slideCount
      });
    e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({
      tabindex: "-1"
    }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
      var s = o.indexOf(t);
      i(this).attr({
        role: "tabpanel",
        id: "slick-slide" + e.instanceUid + t,
        tabindex: -1
      }), -1 !== s && i(this).attr({
        "aria-describedby": "slick-slide-control" + e.instanceUid + s
      })
    }), e.$dots.attr("role", "tablist").find("li").each(function (s) {
      var n = o[s];
      i(this).attr({
        role: "presentation"
      }), i(this).find("button").first().attr({
        role: "tab",
        id: "slick-slide-control" + e.instanceUid + s,
        "aria-controls": "slick-slide" + e.instanceUid + n,
        "aria-label": s + 1 + " of " + t,
        "aria-selected": null,
        tabindex: "-1"
      })
    }).eq(e.currentSlide).find("button").attr({
      "aria-selected": "true",
      tabindex: "0"
    }).end());
    for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
    e.activateADA()
  }, e.prototype.initArrowEvents = function () {
    var i = this;
    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
      message: "previous"
    }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
      message: "next"
    }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
  }, e.prototype.initDotEvents = function () {
    var e = this;
    !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
      message: "index"
    }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
  }, e.prototype.initSlideEvents = function () {
    var e = this;
    e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
  }, e.prototype.initializeEvents = function () {
    var e = this;
    e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
      action: "start"
    }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
      action: "move"
    }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
      action: "end"
    }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
      action: "end"
    }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
  }, e.prototype.initUI = function () {
    var i = this;
    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
  }, e.prototype.keyHandler = function (i) {
    var e = this;
    i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
      data: {
        message: !0 === e.options.rtl ? "next" : "previous"
      }
    }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
      data: {
        message: !0 === e.options.rtl ? "previous" : "next"
      }
    }))
  }, e.prototype.lazyLoad = function () {
    function e(e) {
      i("img[data-lazy]", e).each(function () {
        var e = i(this),
          t = i(this).attr("data-lazy"),
          o = i(this).attr("data-srcset"),
          s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
          r = document.createElement("img");
        r.onload = function () {
          e.animate({
            opacity: 0
          }, 100, function () {
            o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
              opacity: 1
            }, 200, function () {
              e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
            }), n.$slider.trigger("lazyLoaded", [n, e, t])
          })
        }, r.onerror = function () {
          e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
        }, r.src = t
      })
    }
    var t, o, s, n = this;
    if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
      for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
    e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
  }, e.prototype.loadSlider = function () {
    var i = this;
    i.setPosition(), i.$slideTrack.css({
      opacity: 1
    }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
  }, e.prototype.next = e.prototype.slickNext = function () {
    this.changeSlide({
      data: {
        message: "next"
      }
    })
  }, e.prototype.orientationChange = function () {
    var i = this;
    i.checkResponsive(), i.setPosition()
  }, e.prototype.pause = e.prototype.slickPause = function () {
    var i = this;
    i.autoPlayClear(), i.paused = !0
  }, e.prototype.play = e.prototype.slickPlay = function () {
    var i = this;
    i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
  }, e.prototype.postSlide = function (e) {
    var t = this;
    t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
  }, e.prototype.prev = e.prototype.slickPrev = function () {
    this.changeSlide({
      data: {
        message: "previous"
      }
    })
  }, e.prototype.preventDefault = function (i) {
    i.preventDefault()
  }, e.prototype.progressiveLazyLoad = function (e) {
    e = e || 1;
    var t, o, s, n, r, l = this,
      d = i("img[data-lazy]", l.$slider);
    d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
      s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
    }, r.onerror = function () {
      e < 3 ? setTimeout(function () {
        l.progressiveLazyLoad(e + 1)
      }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
    }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
  }, e.prototype.refresh = function (e) {
    var t, o, s = this;
    o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
      currentSlide: t
    }), s.init(), e || s.changeSlide({
      data: {
        message: "index",
        index: t
      }
    }, !1)
  }, e.prototype.registerBreakpoints = function () {
    var e, t, o, s = this,
      n = s.options.responsive || null;
    if ("array" === i.type(n) && n.length) {
      s.respondTo = s.options.respondTo || "window";
      for (e in n)
        if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
          for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
          s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
        } s.breakpoints.sort(function (i, e) {
        return s.options.mobileFirst ? i - e : e - i
      })
    }
  }, e.prototype.reinit = function () {
    var e = this;
    e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
  }, e.prototype.resize = function () {
    var e = this;
    i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
      e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
    }, 50))
  }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
    var o = this;
    if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
    o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
  }, e.prototype.setCSS = function (i) {
    var e, t, o = this,
      s = {};
    !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
  }, e.prototype.setDimensions = function () {
    var i = this;
    !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
      padding: "0px " + i.options.centerPadding
    }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
      padding: i.options.centerPadding + " 0px"
    })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
    var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
    !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
  }, e.prototype.setFade = function () {
    var e, t = this;
    t.$slides.each(function (o, s) {
      e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
        position: "relative",
        right: e,
        top: 0,
        zIndex: t.options.zIndex - 2,
        opacity: 0
      }) : i(s).css({
        position: "relative",
        left: e,
        top: 0,
        zIndex: t.options.zIndex - 2,
        opacity: 0
      })
    }), t.$slides.eq(t.currentSlide).css({
      zIndex: t.options.zIndex - 1,
      opacity: 1
    })
  }, e.prototype.setHeight = function () {
    var i = this;
    if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
      var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
      i.$list.css("height", e)
    }
  }, e.prototype.setOption = e.prototype.slickSetOption = function () {
    var e, t, o, s, n, r = this,
      l = !1;
    if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
    else if ("multiple" === n) i.each(o, function (i, e) {
      r.options[i] = e
    });
    else if ("responsive" === n)
      for (t in s)
        if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
        else {
          for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
          r.options.responsive.push(s[t])
        } l && (r.unload(), r.reinit())
  }, e.prototype.setPosition = function () {
    var i = this;
    i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
  }, e.prototype.setProps = function () {
    var i = this,
      e = document.body.style;
    i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
  }, e.prototype.setSlideClasses = function (i) {
    var e, t, o, s, n = this;
    if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
      var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
      e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
    } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
    "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
  }, e.prototype.setupInfinite = function () {
    var e, t, o, s = this;
    if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
      for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
      for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
      s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        i(this).attr("id", "")
      })
    }
  }, e.prototype.interrupt = function (i) {
    var e = this;
    i || e.autoPlay(), e.interrupted = i
  }, e.prototype.selectHandler = function (e) {
    var t = this,
      o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
      s = parseInt(o.attr("data-slick-index"));
    s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
  }, e.prototype.slideHandler = function (i, e, t) {
    var o, s, n, r, l, d = null,
      a = this;
    if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
      if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
        a.postSlide(o)
      }) : a.postSlide(o));
      else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
      a.postSlide(o)
    }) : a.postSlide(o));
    else {
      if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
        a.postSlide(s)
      })) : a.postSlide(s), void a.animateHeight();
      !0 !== t ? a.animateSlide(d, function () {
        a.postSlide(s)
      }) : a.postSlide(s)
    }
  }, e.prototype.startLoad = function () {
    var i = this;
    !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
  }, e.prototype.swipeDirection = function () {
    var i, e, t, o, s = this;
    return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
  }, e.prototype.swipeEnd = function (i) {
    var e, t, o = this;
    if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
    if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
    if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
      switch (t = o.swipeDirection()) {
        case "left":
        case "down":
          e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
          break;
        case "right":
        case "up":
          e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
      }
      "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
    } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
  }, e.prototype.swipeHandler = function (i) {
    var e = this;
    if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
      case "start":
        e.swipeStart(i);
        break;
      case "move":
        e.swipeMove(i);
        break;
      case "end":
        e.swipeEnd(i)
    }
  }, e.prototype.swipeMove = function (i) {
    var e, t, o, s, n, r, l = this;
    return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
  }, e.prototype.swipeStart = function (i) {
    var e, t = this;
    if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
    void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
  }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
    var i = this;
    null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
  }, e.prototype.unload = function () {
    var e = this;
    i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
  }, e.prototype.unslick = function (i) {
    var e = this;
    e.$slider.trigger("unslick", [e, i]), e.destroy()
  }, e.prototype.updateArrows = function () {
    var i = this;
    Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
  }, e.prototype.updateDots = function () {
    var i = this;
    null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
  }, e.prototype.visibility = function () {
    var i = this;
    i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
  }, i.fn.slick = function () {
    var i, t, o = this,
      s = arguments[0],
      n = Array.prototype.slice.call(arguments, 1),
      r = o.length;
    for (i = 0; i < r; i++)
      if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
    return o
  }
});
/*fancybox*/
! function (t, e, n, o) {
  "use strict";

  function i(t, e) {
    var o, i, a, s = [],
      r = 0;
    t && t.isDefaultPrevented() || (t.preventDefault(), e = e || {}, t && t.data && (e = h(t.data.options, e)), o = e.$target || n(t.currentTarget).trigger("blur"), (a = n.fancybox.getInstance()) && a.$trigger && a.$trigger.is(o) || (e.selector ? s = n(e.selector) : (i = o.attr("data-fancybox") || "", i ? (s = t.data ? t.data.items : [], s = s.length ? s.filter('[data-fancybox="' + i + '"]') : n('[data-fancybox="' + i + '"]')) : s = [o]), r = n(s).index(o), r < 0 && (r = 0), a = n.fancybox.open(s, e, r), a.$trigger = o))
  }
  if (t.console = t.console || {
      info: function (t) {}
    }, n) {
    if (n.fn.fancybox) return void console.info("fancyBox already initialized");
    var a = {
        closeExisting: !1,
        loop: !1,
        gutter: 50,
        keyboard: !0,
        preventCaptionOverlap: !0,
        arrows: !0,
        infobar: !0,
        smallBtn: "auto",
        toolbar: "auto",
        buttons: ["zoom", "slideShow", "thumbs", "close"],
        idleTime: 3,
        protect: !1,
        modal: !1,
        image: {
          preload: !1
        },
        ajax: {
          settings: {
            data: {
              fancybox: !0
            }
          }
        },
        iframe: {
          tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
          preload: !0,
          css: {},
          attr: {
            scrolling: "auto"
          }
        },
        video: {
          tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
          format: "",
          autoStart: !0
        },
        defaultType: "image",
        animationEffect: "zoom",
        animationDuration: 366,
        zoomOpacity: "auto",
        transitionEffect: "fade",
        transitionDuration: 366,
        slideClass: "",
        baseClass: "",
        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
        spinnerTpl: '<div class="fancybox-loading"></div>',
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
        btnTpl: {
          download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
          zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
          close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
          arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
          arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
          smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
        },
        parentEl: "body",
        hideScrollbar: !0,
        autoFocus: !0,
        backFocus: !0,
        trapFocus: !0,
        fullScreen: {
          autoStart: !1
        },
        touch: {
          vertical: !0,
          momentum: !0
        },
        hash: null,
        media: {},
        slideShow: {
          autoStart: !1,
          speed: 3e3
        },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y"
        },
        wheel: "auto",
        onInit: n.noop,
        beforeLoad: n.noop,
        afterLoad: n.noop,
        beforeShow: n.noop,
        afterShow: n.noop,
        beforeClose: n.noop,
        afterClose: n.noop,
        onActivate: n.noop,
        onDeactivate: n.noop,
        clickContent: function (t, e) {
          return "image" === t.type && "zoom"
        },
        clickSlide: "close",
        clickOutside: "close",
        dblclickContent: !1,
        dblclickSlide: !1,
        dblclickOutside: !1,
        mobile: {
          preventCaptionOverlap: !1,
          idleTime: !1,
          clickContent: function (t, e) {
            return "image" === t.type && "toggleControls"
          },
          clickSlide: function (t, e) {
            return "image" === t.type ? "toggleControls" : "close"
          },
          dblclickContent: function (t, e) {
            return "image" === t.type && "zoom"
          },
          dblclickSlide: function (t, e) {
            return "image" === t.type && "zoom"
          }
        },
        lang: "en",
        i18n: {
          en: {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
            ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
            PLAY_START: "Start slideshow",
            PLAY_STOP: "Pause slideshow",
            FULL_SCREEN: "Full screen",
            THUMBS: "Thumbnails",
            DOWNLOAD: "Download",
            SHARE: "Share",
            ZOOM: "Zoom"
          },
          de: {
            CLOSE: "Schlie&szlig;en",
            NEXT: "Weiter",
            PREV: "Zur&uuml;ck",
            ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
            PLAY_START: "Diaschau starten",
            PLAY_STOP: "Diaschau beenden",
            FULL_SCREEN: "Vollbild",
            THUMBS: "Vorschaubilder",
            DOWNLOAD: "Herunterladen",
            SHARE: "Teilen",
            ZOOM: "Vergr&ouml;&szlig;ern"
          }
        }
      },
      s = n(t),
      r = n(e),
      c = 0,
      l = function (t) {
        return t && t.hasOwnProperty && t instanceof n
      },
      d = function () {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
          return t.setTimeout(e, 1e3 / 60)
        }
      }(),
      u = function () {
        return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function (e) {
          t.clearTimeout(e)
        }
      }(),
      f = function () {
        var t, n = e.createElement("fakeelement"),
          o = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
          };
        for (t in o)
          if (void 0 !== n.style[t]) return o[t];
        return "transitionend"
      }(),
      p = function (t) {
        return t && t.length && t[0].offsetHeight
      },
      h = function (t, e) {
        var o = n.extend(!0, {}, t, e);
        return n.each(e, function (t, e) {
          n.isArray(e) && (o[t] = e)
        }), o
      },
      g = function (t) {
        var o, i;
        return !(!t || t.ownerDocument !== e) && (n(".fancybox-container").css("pointer-events", "none"), o = {
          x: t.getBoundingClientRect().left + t.offsetWidth / 2,
          y: t.getBoundingClientRect().top + t.offsetHeight / 2
        }, i = e.elementFromPoint(o.x, o.y) === t, n(".fancybox-container").css("pointer-events", ""), i)
      },
      b = function (t, e, o) {
        var i = this;
        i.opts = h({
          index: o
        }, n.fancybox.defaults), n.isPlainObject(e) && (i.opts = h(i.opts, e)), n.fancybox.isMobile && (i.opts = h(i.opts, i.opts.mobile)), i.id = i.opts.id || ++c, i.currIndex = parseInt(i.opts.index, 10) || 0, i.prevIndex = null, i.prevPos = null, i.currPos = 0, i.firstRun = !0, i.group = [], i.slides = {}, i.addContent(t), i.group.length && i.init()
      };
    n.extend(b.prototype, {
        init: function () {
          var o, i, a = this,
            s = a.group[a.currIndex],
            r = s.opts;
          r.closeExisting && n.fancybox.close(!0), n("body").addClass("fancybox-active"), !n.fancybox.getInstance() && !1 !== r.hideScrollbar && !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (t.innerWidth - e.documentElement.clientWidth) + "px;}</style>"), n("body").addClass("compensate-for-scrollbar")), i = "", n.each(r.buttons, function (t, e) {
            i += r.btnTpl[e] || ""
          }), o = n(a.translate(a, r.baseTpl.replace("{{buttons}}", i).replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight))).attr("id", "fancybox-container-" + a.id).addClass(r.baseClass).data("FancyBox", a).appendTo(r.parentEl), a.$refs = {
            container: o
          }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (t) {
            a.$refs[t] = o.find(".fancybox-" + t)
          }), a.trigger("onInit"), a.activate(), a.jumpTo(a.currIndex)
        },
        translate: function (t, e) {
          var n = t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
          return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
            return void 0 === n[e] ? t : n[e]
          })
        },
        addContent: function (t) {
          var e, o = this,
            i = n.makeArray(t);
          n.each(i, function (t, e) {
            var i, a, s, r, c, l = {},
              d = {};
            n.isPlainObject(e) ? (l = e, d = e.opts || e) : "object" === n.type(e) && n(e).length ? (i = n(e), d = i.data() || {}, d = n.extend(!0, {}, d, d.options), d.$orig = i, l.src = o.opts.src || d.src || i.attr("href"), l.type || l.src || (l.type = "inline", l.src = e)) : l = {
              type: "html",
              src: e + ""
            }, l.opts = n.extend(!0, {}, o.opts, d), n.isArray(d.buttons) && (l.opts.buttons = d.buttons), n.fancybox.isMobile && l.opts.mobile && (l.opts = h(l.opts, l.opts.mobile)), a = l.type || l.opts.type, r = l.src || "", !a && r && ((s = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (a = "video", l.opts.video.format || (l.opts.video.format = "video/" + ("ogv" === s[1] ? "ogg" : s[1]))) : r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? a = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? (a = "iframe", l = n.extend(!0, l, {
              contentType: "pdf",
              opts: {
                iframe: {
                  preload: !1
                }
              }
            })) : "#" === r.charAt(0) && (a = "inline")), a ? l.type = a : o.trigger("objectNeedsType", l), l.contentType || (l.contentType = n.inArray(l.type, ["html", "inline", "ajax"]) > -1 ? "html" : l.type), l.index = o.group.length, "auto" == l.opts.smallBtn && (l.opts.smallBtn = n.inArray(l.type, ["html", "inline", "ajax"]) > -1), "auto" === l.opts.toolbar && (l.opts.toolbar = !l.opts.smallBtn), l.$thumb = l.opts.$thumb || null, l.opts.$trigger && l.index === o.opts.index && (l.$thumb = l.opts.$trigger.find("img:first"), l.$thumb.length && (l.opts.$orig = l.opts.$trigger)), l.$thumb && l.$thumb.length || !l.opts.$orig || (l.$thumb = l.opts.$orig.find("img:first")), l.$thumb && !l.$thumb.length && (l.$thumb = null), l.thumb = l.opts.thumb || (l.$thumb ? l.$thumb[0].src : null), "function" === n.type(l.opts.caption) && (l.opts.caption = l.opts.caption.apply(e, [o, l])), "function" === n.type(o.opts.caption) && (l.opts.caption = o.opts.caption.apply(e, [o, l])), l.opts.caption instanceof n || (l.opts.caption = void 0 === l.opts.caption ? "" : l.opts.caption + ""), "ajax" === l.type && (c = r.split(/\s+/, 2), c.length > 1 && (l.src = c.shift(), l.opts.filter = c.shift())), l.opts.modal && (l.opts = n.extend(!0, l.opts, {
              trapFocus: !0,
              infobar: 0,
              toolbar: 0,
              smallBtn: 0,
              keyboard: 0,
              slideShow: 0,
              fullScreen: 0,
              thumbs: 0,
              touch: 0,
              clickContent: !1,
              clickSlide: !1,
              clickOutside: !1,
              dblclickContent: !1,
              dblclickSlide: !1,
              dblclickOutside: !1
            })), o.group.push(l)
          }), Object.keys(o.slides).length && (o.updateControls(), (e = o.Thumbs) && e.isActive && (e.create(), e.focus()))
        },
        addEvents: function () {
          var e = this;
          e.removeEvents(), e.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) {
            t.stopPropagation(), t.preventDefault(), e.close(t)
          }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (t) {
            t.stopPropagation(), t.preventDefault(), e.previous()
          }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (t) {
            t.stopPropagation(), t.preventDefault(), e.next()
          }).on("click.fb", "[data-fancybox-zoom]", function (t) {
            e[e.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
          }), s.on("orientationchange.fb resize.fb", function (t) {
            t && t.originalEvent && "resize" === t.originalEvent.type ? (e.requestId && u(e.requestId), e.requestId = d(function () {
              e.update(t)
            })) : (e.current && "iframe" === e.current.type && e.$refs.stage.hide(), setTimeout(function () {
              e.$refs.stage.show(), e.update(t)
            }, n.fancybox.isMobile ? 600 : 250))
          }), r.on("keydown.fb", function (t) {
            var o = n.fancybox ? n.fancybox.getInstance() : null,
              i = o.current,
              a = t.keyCode || t.which;
            if (9 == a) return void(i.opts.trapFocus && e.focus(t));
            if (!(!i.opts.keyboard || t.ctrlKey || t.altKey || t.shiftKey || n(t.target).is("input,textarea,video,audio,select"))) return 8 === a || 27 === a ? (t.preventDefault(), void e.close(t)) : 37 === a || 38 === a ? (t.preventDefault(), void e.previous()) : 39 === a || 40 === a ? (t.preventDefault(), void e.next()) : void e.trigger("afterKeydown", t, a)
          }), e.group[e.currIndex].opts.idleTime && (e.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (t) {
            e.idleSecondsCounter = 0, e.isIdle && e.showControls(), e.isIdle = !1
          }), e.idleInterval = t.setInterval(function () {
            ++e.idleSecondsCounter >= e.group[e.currIndex].opts.idleTime && !e.isDragging && (e.isIdle = !0, e.idleSecondsCounter = 0, e.hideControls())
          }, 1e3))
        },
        removeEvents: function () {
          var e = this;
          s.off("orientationchange.fb resize.fb"), r.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
        },
        previous: function (t) {
          return this.jumpTo(this.currPos - 1, t)
        },
        next: function (t) {
          return this.jumpTo(this.currPos + 1, t)
        },
        jumpTo: function (t, e) {
          var o, i, a, s, r, c, l, d, u, f = this,
            h = f.group.length;
          if (!(f.isDragging || f.isClosing || f.isAnimating && f.firstRun)) {
            if (t = parseInt(t, 10), !(a = f.current ? f.current.opts.loop : f.opts.loop) && (t < 0 || t >= h)) return !1;
            if (o = f.firstRun = !Object.keys(f.slides).length, r = f.current, f.prevIndex = f.currIndex, f.prevPos = f.currPos, s = f.createSlide(t), h > 1 && ((a || s.index < h - 1) && f.createSlide(t + 1), (a || s.index > 0) && f.createSlide(t - 1)), f.current = s, f.currIndex = s.index, f.currPos = s.pos, f.trigger("beforeShow", o), f.updateControls(), s.forcedDuration = void 0, n.isNumeric(e) ? s.forcedDuration = e : e = s.opts[o ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), i = f.isMoved(s), s.$slide.addClass("fancybox-slide--current"), o) return s.opts.animationEffect && e && f.$refs.container.css("transition-duration", e + "ms"), f.$refs.container.addClass("fancybox-is-open").trigger("focus"), f.loadSlide(s), void f.preload("image");
            c = n.fancybox.getTranslate(r.$slide), l = n.fancybox.getTranslate(f.$refs.stage), n.each(f.slides, function (t, e) {
              n.fancybox.stop(e.$slide, !0)
            }), r.pos !== s.pos && (r.isComplete = !1), r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"), i ? (u = c.left - (r.pos * c.width + r.pos * r.opts.gutter), n.each(f.slides, function (t, o) {
              o.$slide.removeClass("fancybox-animated").removeClass(function (t, e) {
                return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
              });
              var i = o.pos * c.width + o.pos * o.opts.gutter;
              n.fancybox.setTranslate(o.$slide, {
                top: 0,
                left: i - l.left + u
              }), o.pos !== s.pos && o.$slide.addClass("fancybox-slide--" + (o.pos > s.pos ? "next" : "previous")), p(o.$slide), n.fancybox.animate(o.$slide, {
                top: 0,
                left: (o.pos - s.pos) * c.width + (o.pos - s.pos) * o.opts.gutter
              }, e, function () {
                o.$slide.css({
                  transform: "",
                  opacity: ""
                }).removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === f.currPos && f.complete()
              })
            })) : e && s.opts.transitionEffect && (d = "fancybox-animated fancybox-fx-" + s.opts.transitionEffect, r.$slide.addClass("fancybox-slide--" + (r.pos > s.pos ? "next" : "previous")), n.fancybox.animate(r.$slide, d, e, function () {
              r.$slide.removeClass(d).removeClass("fancybox-slide--next fancybox-slide--previous")
            }, !1)), s.isLoaded ? f.revealContent(s) : f.loadSlide(s), f.preload("image")
          }
        },
        createSlide: function (t) {
          var e, o, i = this;
          return o = t % i.group.length, o = o < 0 ? i.group.length + o : o, !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage), i.slides[t] = n.extend(!0, {}, i.group[o], {
            pos: t,
            $slide: e,
            isLoaded: !1
          }), i.updateSlide(i.slides[t])), i.slides[t]
        },
        scaleToActual: function (t, e, o) {
          var i, a, s, r, c, l = this,
            d = l.current,
            u = d.$content,
            f = n.fancybox.getTranslate(d.$slide).width,
            p = n.fancybox.getTranslate(d.$slide).height,
            h = d.width,
            g = d.height;
          l.isAnimating || l.isMoved() || !u || "image" != d.type || !d.isLoaded || d.hasError || (l.isAnimating = !0, n.fancybox.stop(u), t = void 0 === t ? .5 * f : t, e = void 0 === e ? .5 * p : e, i = n.fancybox.getTranslate(u), i.top -= n.fancybox.getTranslate(d.$slide).top, i.left -= n.fancybox.getTranslate(d.$slide).left, r = h / i.width, c = g / i.height, a = .5 * f - .5 * h, s = .5 * p - .5 * g, h > f && (a = i.left * r - (t * r - t), a > 0 && (a = 0), a < f - h && (a = f - h)), g > p && (s = i.top * c - (e * c - e), s > 0 && (s = 0), s < p - g && (s = p - g)), l.updateCursor(h, g), n.fancybox.animate(u, {
            top: s,
            left: a,
            scaleX: r,
            scaleY: c
          }, o || 366, function () {
            l.isAnimating = !1
          }), l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop())
        },
        scaleToFit: function (t) {
          var e, o = this,
            i = o.current,
            a = i.$content;
          o.isAnimating || o.isMoved() || !a || "image" != i.type || !i.isLoaded || i.hasError || (o.isAnimating = !0, n.fancybox.stop(a), e = o.getFitPos(i), o.updateCursor(e.width, e.height), n.fancybox.animate(a, {
            top: e.top,
            left: e.left,
            scaleX: e.width / a.width(),
            scaleY: e.height / a.height()
          }, t || 366, function () {
            o.isAnimating = !1
          }))
        },
        getFitPos: function (t) {
          var e, o, i, a, s = this,
            r = t.$content,
            c = t.$slide,
            l = t.width || t.opts.width,
            d = t.height || t.opts.height,
            u = {};
          return !!(t.isLoaded && r && r.length) && (e = n.fancybox.getTranslate(s.$refs.stage).width, o = n.fancybox.getTranslate(s.$refs.stage).height, e -= parseFloat(c.css("paddingLeft")) + parseFloat(c.css("paddingRight")) + parseFloat(r.css("marginLeft")) + parseFloat(r.css("marginRight")), o -= parseFloat(c.css("paddingTop")) + parseFloat(c.css("paddingBottom")) + parseFloat(r.css("marginTop")) + parseFloat(r.css("marginBottom")), l && d || (l = e, d = o), i = Math.min(1, e / l, o / d), l *= i, d *= i, l > e - .5 && (l = e), d > o - .5 && (d = o), "image" === t.type ? (u.top = Math.floor(.5 * (o - d)) + parseFloat(c.css("paddingTop")), u.left = Math.floor(.5 * (e - l)) + parseFloat(c.css("paddingLeft"))) : "video" === t.contentType && (a = t.opts.width && t.opts.height ? l / d : t.opts.ratio || 16 / 9, d > l / a ? d = l / a : l > d * a && (l = d * a)), u.width = l, u.height = d, u)
        },
        update: function (t) {
          var e = this;
          n.each(e.slides, function (n, o) {
            e.updateSlide(o, t)
          })
        },
        updateSlide: function (t, e) {
          var o = this,
            i = t && t.$content,
            a = t.width || t.opts.width,
            s = t.height || t.opts.height,
            r = t.$slide;
          o.adjustCaption(t), i && (a || s || "video" === t.contentType) && !t.hasError && (n.fancybox.stop(i), n.fancybox.setTranslate(i, o.getFitPos(t)), t.pos === o.currPos && (o.isAnimating = !1, o.updateCursor())), o.adjustLayout(t), r.length && (r.trigger("refresh"), t.pos === o.currPos && o.$refs.toolbar.add(o.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", r.get(0).scrollHeight > r.get(0).clientHeight)), o.trigger("onUpdate", t, e)
        },
        centerSlide: function (t) {
          var e = this,
            o = e.current,
            i = o.$slide;
          !e.isClosing && o && (i.siblings().css({
            transform: "",
            opacity: ""
          }), i.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), n.fancybox.animate(i, {
            top: 0,
            left: 0,
            opacity: 1
          }, void 0 === t ? 0 : t, function () {
            i.css({
              transform: "",
              opacity: ""
            }), o.isComplete || e.complete()
          }, !1))
        },
        isMoved: function (t) {
          var e, o, i = t || this.current;
          return !!i && (o = n.fancybox.getTranslate(this.$refs.stage), e = n.fancybox.getTranslate(i.$slide), !i.$slide.hasClass("fancybox-animated") && (Math.abs(e.top - o.top) > .5 || Math.abs(e.left - o.left) > .5))
        },
        updateCursor: function (t, e) {
          var o, i, a = this,
            s = a.current,
            r = a.$refs.container;
          s && !a.isClosing && a.Guestures && (r.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), o = a.canPan(t, e), i = !!o || a.isZoomable(), r.toggleClass("fancybox-is-zoomable", i), n("[data-fancybox-zoom]").prop("disabled", !i), o ? r.addClass("fancybox-can-pan") : i && ("zoom" === s.opts.clickContent || n.isFunction(s.opts.clickContent) && "zoom" == s.opts.clickContent(s)) ? r.addClass("fancybox-can-zoomIn") : s.opts.touch && (s.opts.touch.vertical || a.group.length > 1) && "video" !== s.contentType && r.addClass("fancybox-can-swipe"))
        },
        isZoomable: function () {
          var t, e = this,
            n = e.current;
          if (n && !e.isClosing && "image" === n.type && !n.hasError) {
            if (!n.isLoaded) return !0;
            if ((t = e.getFitPos(n)) && (n.width > t.width || n.height > t.height)) return !0
          }
          return !1
        },
        isScaledDown: function (t, e) {
          var o = this,
            i = !1,
            a = o.current,
            s = a.$content;
          return void 0 !== t && void 0 !== e ? i = t < a.width && e < a.height : s && (i = n.fancybox.getTranslate(s), i = i.width < a.width && i.height < a.height), i
        },
        canPan: function (t, e) {
          var o = this,
            i = o.current,
            a = null,
            s = !1;
          return "image" === i.type && (i.isComplete || t && e) && !i.hasError && (s = o.getFitPos(i), void 0 !== t && void 0 !== e ? a = {
            width: t,
            height: e
          } : i.isComplete && (a = n.fancybox.getTranslate(i.$content)), a && s && (s = Math.abs(a.width - s.width) > 1.5 || Math.abs(a.height - s.height) > 1.5)), s
        },
        loadSlide: function (t) {
          var e, o, i, a = this;
          if (!t.isLoading && !t.isLoaded) {
            if (t.isLoading = !0, !1 === a.trigger("beforeLoad", t)) return t.isLoading = !1, !1;
            switch (e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass(t.opts.slideClass), e) {
              case "image":
                a.setImage(t);
                break;
              case "iframe":
                a.setIframe(t);
                break;
              case "html":
                a.setContent(t, t.src || t.content);
                break;
              case "video":
                a.setContent(t, t.opts.video.tpl.replace(/\{\{src\}\}/gi, t.src).replace("{{format}}", t.opts.videoFormat || t.opts.video.format || "").replace("{{poster}}", t.thumb || ""));
                break;
              case "inline":
                n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
                break;
              case "ajax":
                a.showLoading(t), i = n.ajax(n.extend({}, t.opts.ajax.settings, {
                  url: t.src,
                  success: function (e, n) {
                    "success" === n && a.setContent(t, e)
                  },
                  error: function (e, n) {
                    e && "abort" !== n && a.setError(t)
                  }
                })), o.one("onReset", function () {
                  i.abort()
                });
                break;
              default:
                a.setError(t)
            }
            return !0
          }
        },
        setImage: function (t) {
          var o, i = this;
          setTimeout(function () {
            var e = t.$image;
            i.isClosing || !t.isLoading || e && e.length && e[0].complete || t.hasError || i.showLoading(t)
          }, 50), i.checkSrcset(t), t.$content = n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide.addClass("fancybox-slide--image")), !1 !== t.opts.preload && t.opts.width && t.opts.height && t.thumb && (t.width = t.opts.width, t.height = t.opts.height, o = e.createElement("img"), o.onerror = function () {
            n(this).remove(), t.$ghost = null
          }, o.onload = function () {
            i.afterLoad(t)
          }, t.$ghost = n(o).addClass("fancybox-image").appendTo(t.$content).attr("src", t.thumb)), i.setBigImage(t)
        },
        checkSrcset: function (e) {
          var n, o, i, a, s = e.opts.srcset || e.opts.image.srcset;
          if (s) {
            i = t.devicePixelRatio || 1, a = t.innerWidth * i, o = s.split(",").map(function (t) {
              var e = {};
              return t.trim().split(/\s+/).forEach(function (t, n) {
                var o = parseInt(t.substring(0, t.length - 1), 10);
                if (0 === n) return e.url = t;
                o && (e.value = o, e.postfix = t[t.length - 1])
              }), e
            }), o.sort(function (t, e) {
              return t.value - e.value
            });
            for (var r = 0; r < o.length; r++) {
              var c = o[r];
              if ("w" === c.postfix && c.value >= a || "x" === c.postfix && c.value >= i) {
                n = c;
                break
              }
            }!n && o.length && (n = o[o.length - 1]), n && (e.src = n.url, e.width && e.height && "w" == n.postfix && (e.height = e.width / e.height * n.value, e.width = n.value), e.opts.srcset = s)
          }
        },
        setBigImage: function (t) {
          var o = this,
            i = e.createElement("img"),
            a = n(i);
          t.$image = a.one("error", function () {
            o.setError(t)
          }).one("load", function () {
            var e;
            t.$ghost || (o.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight), o.afterLoad(t)), o.isClosing || (t.opts.srcset && (e = t.opts.sizes, e && "auto" !== e || (e = (t.width / t.height > 1 && s.width() / s.height() > 1 ? "100" : Math.round(t.width / t.height * 100)) + "vw"), a.attr("sizes", e).attr("srcset", t.opts.srcset)), t.$ghost && setTimeout(function () {
              t.$ghost && !o.isClosing && t.$ghost.hide()
            }, Math.min(300, Math.max(1e3, t.height / 1600))), o.hideLoading(t))
          }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (i.complete || "complete" == i.readyState) && a.naturalWidth && a.naturalHeight ? a.trigger("load") : i.error && a.trigger("error")
        },
        resolveImageSlideSize: function (t, e, n) {
          var o = parseInt(t.opts.width, 10),
            i = parseInt(t.opts.height, 10);
          t.width = e, t.height = n, o > 0 && (t.width = o, t.height = Math.floor(o * n / e)), i > 0 && (t.width = Math.floor(i * e / n), t.height = i)
        },
        setIframe: function (t) {
          var e, o = this,
            i = t.opts.iframe,
            a = t.$slide;
          t.$content = n('<div class="fancybox-content' + (i.preload ? " fancybox-is-hidden" : "") + '"></div>').css(i.css).appendTo(a), a.addClass("fancybox-slide--" + t.contentType), t.$iframe = e = n(i.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(i.attr).appendTo(t.$content), i.preload ? (o.showLoading(t), e.on("load.fb error.fb", function (e) {
            this.isReady = 1, t.$slide.trigger("refresh"), o.afterLoad(t)
          }), a.on("refresh.fb", function () {
            var n, o, s = t.$content,
              r = i.css.width,
              c = i.css.height;
            if (1 === e[0].isReady) {
              try {
                n = e.contents(), o = n.find("body")
              } catch (t) {}
              o && o.length && o.children().length && (a.css("overflow", "visible"), s.css({
                width: "100%",
                "max-width": "100%",
                height: "9999px"
              }), void 0 === r && (r = Math.ceil(Math.max(o[0].clientWidth, o.outerWidth(!0)))), s.css("width", r || "").css("max-width", ""), void 0 === c && (c = Math.ceil(Math.max(o[0].clientHeight, o.outerHeight(!0)))), s.css("height", c || ""), a.css("overflow", "auto")), s.removeClass("fancybox-is-hidden")
            }
          })) : o.afterLoad(t), e.attr("src", t.src), a.one("onReset", function () {
            try {
              n(this).find("iframe").hide().unbind().attr("src", "//about:blank")
            } catch (t) {}
            n(this).off("refresh.fb").empty(), t.isLoaded = !1, t.isRevealed = !1
          })
        },
        setContent: function (t, e) {
          var o = this;
          o.isClosing || (o.hideLoading(t), t.$content && n.fancybox.stop(t.$content), t.$slide.empty(), l(e) && e.parent().length ? ((e.hasClass("fancybox-content") || e.parent().hasClass("fancybox-content")) && e.parents(".fancybox-slide").trigger("onReset"), t.$placeholder = n("<div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents()), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function () {
            n(this).find("video,audio").trigger("pause"), t.$placeholder && (t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1, t.isRevealed = !1)
          }), n(e).appendTo(t.$slide), n(e).is("video,audio") && (n(e).addClass("fancybox-video"), n(e).wrap("<div></div>"), t.contentType = "video", t.opts.width = t.opts.width || n(e).attr("width"), t.opts.height = t.opts.height || n(e).attr("height")), t.$content = t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), t.$content.siblings().hide(), t.$content.length || (t.$content = t.$slide.wrapInner("<div></div>").children().first()), t.$content.addClass("fancybox-content"), t.$slide.addClass("fancybox-slide--" + t.contentType), o.afterLoad(t))
        },
        setError: function (t) {
          t.hasError = !0, t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"), t.contentType = "html", this.setContent(t, this.translate(t, t.opts.errorTpl)), t.pos === this.currPos && (this.isAnimating = !1)
        },
        showLoading: function (t) {
          var e = this;
          (t = t || e.current) && !t.$spinner && (t.$spinner = n(e.translate(e, e.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn("fast"))
        },
        hideLoading: function (t) {
          var e = this;
          (t = t || e.current) && t.$spinner && (t.$spinner.stop().remove(), delete t.$spinner)
        },
        afterLoad: function (t) {
          var e = this;
          e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function (t) {
            return 2 == t.button && t.preventDefault(), !0
          }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.adjustCaption(t), e.adjustLayout(t), t.pos === e.currPos && e.updateCursor(), e.revealContent(t))
        },
        adjustCaption: function (t) {
          var e, n = this,
            o = t || n.current,
            i = o.opts.caption,
            a = o.opts.preventCaptionOverlap,
            s = n.$refs.caption,
            r = !1;
          s.toggleClass("fancybox-caption--separate", a), a && i && i.length && (o.pos !== n.currPos ? (e = s.clone().appendTo(s.parent()), e.children().eq(0).empty().html(i), r = e.outerHeight(!0), e.empty().remove()) : n.$caption && (r = n.$caption.outerHeight(!0)), o.$slide.css("padding-bottom", r || ""))
        },
        adjustLayout: function (t) {
          var e, n, o, i, a = this,
            s = t || a.current;
          s.isLoaded && !0 !== s.opts.disableLayoutFix && (s.$content.css("margin-bottom", ""), s.$content.outerHeight() > s.$slide.height() + .5 && (o = s.$slide[0].style["padding-bottom"], i = s.$slide.css("padding-bottom"), parseFloat(i) > 0 && (e = s.$slide[0].scrollHeight, s.$slide.css("padding-bottom", 0), Math.abs(e - s.$slide[0].scrollHeight) < 1 && (n = i), s.$slide.css("padding-bottom", o))), s.$content.css("margin-bottom", n))
        },
        revealContent: function (t) {
          var e, o, i, a, s = this,
            r = t.$slide,
            c = !1,
            l = !1,
            d = s.isMoved(t),
            u = t.isRevealed;
          return t.isRevealed = !0, e = t.opts[s.firstRun ? "animationEffect" : "transitionEffect"], i = t.opts[s.firstRun ? "animationDuration" : "transitionDuration"], i = parseInt(void 0 === t.forcedDuration ? i : t.forcedDuration, 10), !d && t.pos === s.currPos && i || (e = !1), "zoom" === e && (t.pos === s.currPos && i && "image" === t.type && !t.hasError && (l = s.getThumbPos(t)) ? c = s.getFitPos(t) : e = "fade"), "zoom" === e ? (s.isAnimating = !0, c.scaleX = c.width / l.width, c.scaleY = c.height / l.height, a = t.opts.zoomOpacity, "auto" == a && (a = Math.abs(t.width / t.height - l.width / l.height) > .1), a && (l.opacity = .1, c.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), l), p(t.$content), void n.fancybox.animate(t.$content, c, i, function () {
            s.isAnimating = !1, s.complete()
          })) : (s.updateSlide(t), e ? (n.fancybox.stop(r), o = "fancybox-slide--" + (t.pos >= s.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + e, r.addClass(o).removeClass("fancybox-slide--current"), t.$content.removeClass("fancybox-is-hidden"), p(r), "image" !== t.type && t.$content.hide().show(0), void n.fancybox.animate(r, "fancybox-slide--current", i, function () {
            r.removeClass(o).css({
              transform: "",
              opacity: ""
            }), t.pos === s.currPos && s.complete()
          }, !0)) : (t.$content.removeClass("fancybox-is-hidden"), u || !d || "image" !== t.type || t.hasError || t.$content.hide().fadeIn("fast"), void(t.pos === s.currPos && s.complete())))
        },
        getThumbPos: function (t) {
          var e, o, i, a, s, r = !1,
            c = t.$thumb;
          return !(!c || !g(c[0])) && (e = n.fancybox.getTranslate(c), o = parseFloat(c.css("border-top-width") || 0), i = parseFloat(c.css("border-right-width") || 0), a = parseFloat(c.css("border-bottom-width") || 0), s = parseFloat(c.css("border-left-width") || 0), r = {
            top: e.top + o,
            left: e.left + s,
            width: e.width - i - s,
            height: e.height - o - a,
            scaleX: 1,
            scaleY: 1
          }, e.width > 0 && e.height > 0 && r)
        },
        complete: function () {
          var t, e = this,
            o = e.current,
            i = {};
          !e.isMoved() && o.isLoaded && (o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), e.preload("inline"), p(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(e.slides, function (t, o) {
            o.pos >= e.currPos - 1 && o.pos <= e.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove())
          }), e.slides = i), e.isAnimating = !1, e.updateCursor(), e.trigger("afterShow"), o.opts.video.autoStart && o.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function () {
            Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen(), e.next()
          }), o.opts.autoFocus && "html" === o.contentType && (t = o.$content.find("input[autofocus]:enabled:visible:first"), t.length ? t.trigger("focus") : e.focus(null, !0)), o.$slide.scrollTop(0).scrollLeft(0))
        },
        preload: function (t) {
          var e, n, o = this;
          o.group.length < 2 || (n = o.slides[o.currPos + 1], e = o.slides[o.currPos - 1], e && e.type === t && o.loadSlide(e), n && n.type === t && o.loadSlide(n))
        },
        focus: function (t, o) {
          var i, a, s = this,
            r = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
          s.isClosing || (i = !t && s.current && s.current.isComplete ? s.current.$slide.find("*:visible" + (o ? ":not(.fancybox-close-small)" : "")) : s.$refs.container.find("*:visible"), i = i.filter(r).filter(function () {
            return "hidden" !== n(this).css("visibility") && !n(this).hasClass("disabled")
          }), i.length ? (a = i.index(e.activeElement), t && t.shiftKey ? (a < 0 || 0 == a) && (t.preventDefault(), i.eq(i.length - 1).trigger("focus")) : (a < 0 || a == i.length - 1) && (t && t.preventDefault(), i.eq(0).trigger("focus"))) : s.$refs.container.trigger("focus"))
        },
        activate: function () {
          var t = this;
          n(".fancybox-container").each(function () {
            var e = n(this).data("FancyBox");
            e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), e.isVisible = !1)
          }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents()
        },
        close: function (t, e) {
          var o, i, a, s, r, c, l, u = this,
            f = u.current,
            h = function () {
              u.cleanUp(t)
            };
          return !u.isClosing && (u.isClosing = !0, !1 === u.trigger("beforeClose", t) ? (u.isClosing = !1, d(function () {
            u.update()
          }), !1) : (u.removeEvents(), a = f.$content, o = f.opts.animationEffect, i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0, f.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), !0 !== t ? n.fancybox.stop(f.$slide) : o = !1, f.$slide.siblings().trigger("onReset").remove(), i && u.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", i + "ms"), u.hideLoading(f), u.hideControls(!0), u.updateCursor(), "zoom" !== o || a && i && "image" === f.type && !u.isMoved() && !f.hasError && (l = u.getThumbPos(f)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(a), s = n.fancybox.getTranslate(a), c = {
              top: s.top,
              left: s.left,
              scaleX: s.width / l.width,
              scaleY: s.height / l.height,
              width: l.width,
              height: l.height
            }, r = f.opts.zoomOpacity,
            "auto" == r && (r = Math.abs(f.width / f.height - l.width / l.height) > .1), r && (l.opacity = 0), n.fancybox.setTranslate(a, c), p(a), n.fancybox.animate(a, l, i, h), !0) : (o && i ? n.fancybox.animate(f.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + o, i, h) : !0 === t ? setTimeout(h, i) : h(), !0)))
        },
        cleanUp: function (e) {
          var o, i, a, s = this,
            r = s.current.opts.$orig;
          s.current.$slide.trigger("onReset"), s.$refs.container.empty().remove(), s.trigger("afterClose", e), s.current.opts.backFocus && (r && r.length && r.is(":visible") || (r = s.$trigger), r && r.length && (i = t.scrollX, a = t.scrollY, r.trigger("focus"), n("html, body").scrollTop(a).scrollLeft(i))), s.current = null, o = n.fancybox.getInstance(), o ? o.activate() : (n("body").removeClass("fancybox-active compensate-for-scrollbar"), n("#fancybox-style-noscroll").remove())
        },
        trigger: function (t, e) {
          var o, i = Array.prototype.slice.call(arguments, 1),
            a = this,
            s = e && e.opts ? e : a.current;
          if (s ? i.unshift(s) : s = a, i.unshift(a), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)), !1 === o) return o;
          "afterClose" !== t && a.$refs ? a.$refs.container.trigger(t + ".fb", i) : r.trigger(t + ".fb", i)
        },
        updateControls: function () {
          var t = this,
            o = t.current,
            i = o.index,
            a = t.$refs.container,
            s = t.$refs.caption,
            r = o.opts.caption;
          o.$slide.trigger("refresh"), r && r.length ? (t.$caption = s, s.children().eq(0).html(r)) : t.$caption = null, t.hasHiddenControls || t.isIdle || t.showControls(), a.find("[data-fancybox-count]").html(t.group.length), a.find("[data-fancybox-index]").html(i + 1), a.find("[data-fancybox-prev]").prop("disabled", !o.opts.loop && i <= 0), a.find("[data-fancybox-next]").prop("disabled", !o.opts.loop && i >= t.group.length - 1), "image" === o.type ? a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", o.opts.image.src || o.src).show() : o.opts.toolbar && a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), n(e.activeElement).is(":hidden,[disabled]") && t.$refs.container.trigger("focus")
        },
        hideControls: function (t) {
          var e = this,
            n = ["infobar", "toolbar", "nav"];
          !t && e.current.opts.preventCaptionOverlap || n.push("caption"), this.$refs.container.removeClass(n.map(function (t) {
            return "fancybox-show-" + t
          }).join(" ")), this.hasHiddenControls = !0
        },
        showControls: function () {
          var t = this,
            e = t.current ? t.current.opts : t.opts,
            n = t.$refs.container;
          t.hasHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-caption", !!t.$caption).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal)
        },
        toggleControls: function () {
          this.hasHiddenControls ? this.showControls() : this.hideControls()
        }
      }), n.fancybox = {
        version: "3.5.7",
        defaults: a,
        getInstance: function (t) {
          var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
            o = Array.prototype.slice.call(arguments, 1);
          return e instanceof b && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e)
        },
        open: function (t, e, n) {
          return new b(t, e, n)
        },
        close: function (t) {
          var e = this.getInstance();
          e && (e.close(), !0 === t && this.close(t))
        },
        destroy: function () {
          this.close(!0), r.add("body").off("click.fb-start", "**")
        },
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        use3d: function () {
          var n = e.createElement("div");
          return t.getComputedStyle && t.getComputedStyle(n) && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
        }(),
        getTranslate: function (t) {
          var e;
          return !(!t || !t.length) && (e = t[0].getBoundingClientRect(), {
            top: e.top || 0,
            left: e.left || 0,
            width: e.width,
            height: e.height,
            opacity: parseFloat(t.css("opacity"))
          })
        },
        setTranslate: function (t, e) {
          var n = "",
            o = {};
          if (t && e) return void 0 === e.left && void 0 === e.top || (n = (void 0 === e.left ? t.position().left : e.left) + "px, " + (void 0 === e.top ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), void 0 !== e.scaleX && void 0 !== e.scaleY ? n += " scale(" + e.scaleX + ", " + e.scaleY + ")" : void 0 !== e.scaleX && (n += " scaleX(" + e.scaleX + ")"), n.length && (o.transform = n), void 0 !== e.opacity && (o.opacity = e.opacity), void 0 !== e.width && (o.width = e.width), void 0 !== e.height && (o.height = e.height), t.css(o)
        },
        animate: function (t, e, o, i, a) {
          var s, r = this;
          n.isFunction(o) && (i = o, o = null), r.stop(t), s = r.getTranslate(t), t.on(f, function (c) {
            (!c || !c.originalEvent || t.is(c.originalEvent.target) && "z-index" != c.originalEvent.propertyName) && (r.stop(t), n.isNumeric(o) && t.css("transition-duration", ""), n.isPlainObject(e) ? void 0 !== e.scaleX && void 0 !== e.scaleY && r.setTranslate(t, {
              top: e.top,
              left: e.left,
              width: s.width * e.scaleX,
              height: s.height * e.scaleY,
              scaleX: 1,
              scaleY: 1
            }) : !0 !== a && t.removeClass(e), n.isFunction(i) && i(c))
          }), n.isNumeric(o) && t.css("transition-duration", o + "ms"), n.isPlainObject(e) ? (void 0 !== e.scaleX && void 0 !== e.scaleY && (delete e.width, delete e.height, t.parent().hasClass("fancybox-slide--image") && t.parent().addClass("fancybox-is-scaling")), n.fancybox.setTranslate(t, e)) : t.addClass(e), t.data("timer", setTimeout(function () {
            t.trigger(f)
          }, o + 33))
        },
        stop: function (t, e) {
          t && t.length && (clearTimeout(t.data("timer")), e && t.trigger(f), t.off(f).css("transition-duration", ""), t.parent().removeClass("fancybox-is-scaling"))
        }
      }, n.fn.fancybox = function (t) {
        var e;
        return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
          options: t
        }, i) : this.off("click.fb-start").on("click.fb-start", {
          items: this,
          options: t
        }, i), this
      }, r.on("click.fb-start", "[data-fancybox]", i), r.on("click.fb-start", "[data-fancybox-trigger]", function (t) {
        n('[data-fancybox="' + n(this).attr("data-fancybox-trigger") + '"]').eq(n(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
          $trigger: n(this)
        })
      }),
      function () {
        var t = null;
        r.on("mousedown mouseup focus blur", ".fancybox-button", function (e) {
          switch (e.type) {
            case "mousedown":
              t = n(this);
              break;
            case "mouseup":
              t = null;
              break;
            case "focusin":
              n(".fancybox-button").removeClass("fancybox-focus"), n(this).is(t) || n(this).is("[disabled]") || n(this).addClass("fancybox-focus");
              break;
            case "focusout":
              n(".fancybox-button").removeClass("fancybox-focus")
          }
        })
      }()
  }
}(window, document, jQuery),
function (t) {
  "use strict";
  var e = {
      youtube: {
        matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
        params: {
          autoplay: 1,
          autohide: 1,
          fs: 1,
          rel: 0,
          hd: 1,
          wmode: "transparent",
          enablejsapi: 1,
          html5: 1
        },
        paramPlace: 8,
        type: "iframe",
        url: "https://www.youtube-nocookie.com/embed/$4",
        thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
      },
      vimeo: {
        matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
        params: {
          autoplay: 1,
          hd: 1,
          show_title: 1,
          show_byline: 1,
          show_portrait: 0,
          fullscreen: 1
        },
        paramPlace: 3,
        type: "iframe",
        url: "//player.vimeo.com/video/$2"
      },
      instagram: {
        matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
        type: "image",
        url: "//$1/p/$2/media/?size=l"
      },
      gmap_place: {
        matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
        type: "iframe",
        url: function (t) {
          return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
        }
      },
      gmap_search: {
        matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
        type: "iframe",
        url: function (t) {
          return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
        }
      }
    },
    n = function (e, n, o) {
      if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function (t, n) {
        e = e.replace("$" + t, n || "")
      }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e
    };
  t(document).on("objectNeedsType.fb", function (o, i, a) {
    var s, r, c, l, d, u, f, p = a.src || "",
      h = !1;
    s = t.extend(!0, {}, e, a.opts.media), t.each(s, function (e, o) {
      if (c = p.match(o.matcher)) {
        if (h = o.type, f = e, u = {}, o.paramPlace && c[o.paramPlace]) {
          d = c[o.paramPlace], "?" == d[0] && (d = d.substring(1)), d = d.split("&");
          for (var i = 0; i < d.length; ++i) {
            var s = d[i].split("=", 2);
            2 == s.length && (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
          }
        }
        return l = t.extend(!0, {}, o.params, a.opts[e], u), p = "function" === t.type(o.url) ? o.url.call(this, c, l, a) : n(o.url, c, l), r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, a) : n(o.thumb, c), "youtube" === e ? p = p.replace(/&t=((\d+)m)?(\d+)s/, function (t, e, n, o) {
          return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
        }) : "vimeo" === e && (p = p.replace("&%23", "#")), !1
      }
    }), h ? (a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = r), "iframe" === h && (a.opts = t.extend(!0, a.opts, {
      iframe: {
        preload: !1,
        attr: {
          scrolling: "no"
        }
      }
    })), t.extend(a, {
      type: h,
      src: p,
      origSrc: a.src,
      contentSource: f,
      contentType: "image" === h ? "image" : "gmap_place" == f || "gmap_search" == f ? "map" : "video"
    })) : p && (a.type = a.opts.defaultType)
  });
  var o = {
    youtube: {
      src: "https://www.youtube.com/iframe_api",
      class: "YT",
      loading: !1,
      loaded: !1
    },
    vimeo: {
      src: "https://player.vimeo.com/api/player.js",
      class: "Vimeo",
      loading: !1,
      loaded: !1
    },
    load: function (t) {
      var e, n = this;
      if (this[t].loaded) return void setTimeout(function () {
        n.done(t)
      });
      this[t].loading || (this[t].loading = !0, e = document.createElement("script"), e.type = "text/javascript", e.src = this[t].src, "youtube" === t ? window.onYouTubeIframeAPIReady = function () {
        n[t].loaded = !0, n.done(t)
      } : e.onload = function () {
        n[t].loaded = !0, n.done(t)
      }, document.body.appendChild(e))
    },
    done: function (e) {
      var n, o, i;
      "youtube" === e && delete window.onYouTubeIframeAPIReady, (n = t.fancybox.getInstance()) && (o = n.current.$content.find("iframe"), "youtube" === e && void 0 !== YT && YT ? i = new YT.Player(o.attr("id"), {
        events: {
          onStateChange: function (t) {
            0 == t.data && n.next()
          }
        }
      }) : "vimeo" === e && void 0 !== Vimeo && Vimeo && (i = new Vimeo.Player(o), i.on("ended", function () {
        n.next()
      })))
    }
  };
  t(document).on({
    "afterShow.fb": function (t, e, n) {
      e.group.length > 1 && ("youtube" === n.contentSource || "vimeo" === n.contentSource) && o.load(n.contentSource)
    }
  })
}(jQuery),
function (t, e, n) {
  "use strict";
  var o = function () {
      return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function (e) {
        return t.setTimeout(e, 1e3 / 60)
      }
    }(),
    i = function () {
      return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function (e) {
        t.clearTimeout(e)
      }
    }(),
    a = function (e) {
      var n = [];
      e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
      for (var o in e) e[o].pageX ? n.push({
        x: e[o].pageX,
        y: e[o].pageY
      }) : e[o].clientX && n.push({
        x: e[o].clientX,
        y: e[o].clientY
      });
      return n
    },
    s = function (t, e, n) {
      return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
    },
    r = function (t) {
      if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || n.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
      for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
        if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
      return !1
    },
    c = function (e) {
      var n = t.getComputedStyle(e)["overflow-y"],
        o = t.getComputedStyle(e)["overflow-x"],
        i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
        a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
      return i || a
    },
    l = function (t) {
      for (var e = !1;;) {
        if (e = c(t.get(0))) break;
        if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
      }
      return e
    },
    d = function (t) {
      var e = this;
      e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
    };
  d.prototype.destroy = function () {
    var t = this;
    t.$container.off(".fb.touch"), n(e).off(".fb.touch"), t.requestId && (i(t.requestId), t.requestId = null), t.tapped && (clearTimeout(t.tapped), t.tapped = null)
  }, d.prototype.ontouchstart = function (o) {
    var i = this,
      c = n(o.target),
      d = i.instance,
      u = d.current,
      f = u.$slide,
      p = u.$content,
      h = "touchstart" == o.type;
    if (h && i.$container.off("mousedown.fb.touch"), (!o.originalEvent || 2 != o.originalEvent.button) && f.length && c.length && !r(c) && !r(c.parent()) && (c.is("img") || !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left))) {
      if (!u || d.isAnimating || u.$slide.hasClass("fancybox-animated")) return o.stopPropagation(), void o.preventDefault();
      i.realPoints = i.startPoints = a(o), i.startPoints.length && (u.touch && o.stopPropagation(), i.startEvent = o, i.canTap = !0, i.$target = c, i.$content = p, i.opts = u.opts.touch, i.isPanning = !1, i.isSwiping = !1, i.isZooming = !1, i.isScrolling = !1, i.canPan = d.canPan(), i.startTime = (new Date).getTime(), i.distanceX = i.distanceY = i.distance = 0, i.canvasWidth = Math.round(f[0].clientWidth), i.canvasHeight = Math.round(f[0].clientHeight), i.contentLastPos = null, i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
        top: 0,
        left: 0
      }, i.sliderStartPos = n.fancybox.getTranslate(f), i.stagePos = n.fancybox.getTranslate(d.$refs.stage), i.sliderStartPos.top -= i.stagePos.top, i.sliderStartPos.left -= i.stagePos.left, i.contentStartPos.top -= i.stagePos.top, i.contentStartPos.left -= i.stagePos.left, n(e).off(".fb.touch").on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")), n.fancybox.isMobile && e.addEventListener("scroll", i.onscroll, !0), ((i.opts || i.canPan) && (c.is(i.$stage) || i.$stage.find(c).length) || (c.is(".fancybox-image") && o.preventDefault(), n.fancybox.isMobile && c.parents(".fancybox-caption").length)) && (i.isScrollable = l(c) || l(c.parent()), n.fancybox.isMobile && i.isScrollable || o.preventDefault(), (1 === i.startPoints.length || u.hasError) && (i.canPan ? (n.fancybox.stop(i.$content), i.isPanning = !0) : i.isSwiping = !0, i.$container.addClass("fancybox-is-grabbing")), 2 === i.startPoints.length && "image" === u.type && (u.isLoaded || u.$ghost) && (i.canTap = !1, i.isSwiping = !1, i.isPanning = !1, i.isZooming = !0, n.fancybox.stop(i.$content), i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(), i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(), i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width, i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height, i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1]))))
    }
  }, d.prototype.onscroll = function (t) {
    var n = this;
    n.isScrolling = !0, e.removeEventListener("scroll", n.onscroll, !0)
  }, d.prototype.ontouchmove = function (t) {
    var e = this;
    return void 0 !== t.originalEvent.buttons && 0 === t.originalEvent.buttons ? void e.ontouchend(t) : e.isScrolling ? void(e.canTap = !1) : (e.newPoints = a(t), void((e.opts || e.canPan) && e.newPoints.length && e.newPoints.length && (e.isSwiping && !0 === e.isSwiping || t.preventDefault(), e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
  }, d.prototype.onSwipe = function (e) {
    var a, s = this,
      r = s.instance,
      c = s.isSwiping,
      l = s.sliderStartPos.left || 0;
    if (!0 !== c) "x" == c && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? l += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? l -= Math.pow(-s.distanceX, .8) : l += s.distanceX), s.sliderLastPos = {
      top: "x" == c ? 0 : s.sliderStartPos.top + s.distanceY,
      left: l
    }, s.requestId && (i(s.requestId), s.requestId = null), s.requestId = o(function () {
      s.sliderLastPos && (n.each(s.instance.slides, function (t, e) {
        var o = e.pos - s.instance.currPos;
        n.fancybox.setTranslate(e.$slide, {
          top: s.sliderLastPos.top,
          left: s.sliderLastPos.left + o * s.canvasWidth + o * e.opts.gutter
        })
      }), s.$container.addClass("fancybox-is-sliding"))
    });
    else if (Math.abs(s.distance) > 10) {
      if (s.canTap = !1, r.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : r.isDragging || !1 === s.opts.vertical || "auto" === s.opts.vertical && n(t).width() > 800 ? s.isSwiping = "x" : (a = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = a > 45 && a < 135 ? "y" : "x"), "y" === s.isSwiping && n.fancybox.isMobile && s.isScrollable) return void(s.isScrolling = !0);
      r.isDragging = s.isSwiping, s.startPoints = s.newPoints, n.each(r.slides, function (t, e) {
        var o, i;
        n.fancybox.stop(e.$slide), o = n.fancybox.getTranslate(e.$slide), i = n.fancybox.getTranslate(r.$refs.stage), e.$slide.css({
          transform: "",
          opacity: "",
          "transition-duration": ""
        }).removeClass("fancybox-animated").removeClass(function (t, e) {
          return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
        }), e.pos === r.current.pos && (s.sliderStartPos.top = o.top - i.top, s.sliderStartPos.left = o.left - i.left), n.fancybox.setTranslate(e.$slide, {
          top: o.top - i.top,
          left: o.left - i.left
        })
      }), r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop()
    }
  }, d.prototype.onPan = function () {
    var t = this;
    if (s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5)) return void(t.startPoints = t.newPoints);
    t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && i(t.requestId), t.requestId = o(function () {
      n.fancybox.setTranslate(t.$content, t.contentLastPos)
    })
  }, d.prototype.limitMovement = function () {
    var t, e, n, o, i, a, s = this,
      r = s.canvasWidth,
      c = s.canvasHeight,
      l = s.distanceX,
      d = s.distanceY,
      u = s.contentStartPos,
      f = u.left,
      p = u.top,
      h = u.width,
      g = u.height;
    return i = h > r ? f + l : f, a = p + d, t = Math.max(0, .5 * r - .5 * h), e = Math.max(0, .5 * c - .5 * g), n = Math.min(r - h, .5 * r - .5 * h), o = Math.min(c - g, .5 * c - .5 * g), l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, .8) || 0), l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, .8) || 0), d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, .8) || 0), d < 0 && a < o && (a = o + 1 - Math.pow(o - p - d, .8) || 0), {
      top: a,
      left: i
    }
  }, d.prototype.limitPosition = function (t, e, n, o) {
    var i = this,
      a = i.canvasWidth,
      s = i.canvasHeight;
    return n > a ? (t = t > 0 ? 0 : t, t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), {
      top: e,
      left: t
    }
  }, d.prototype.onZoom = function () {
    var e = this,
      a = e.contentStartPos,
      r = a.width,
      c = a.height,
      l = a.left,
      d = a.top,
      u = s(e.newPoints[0], e.newPoints[1]),
      f = u / e.startDistanceBetweenFingers,
      p = Math.floor(r * f),
      h = Math.floor(c * f),
      g = (r - p) * e.percentageOfImageAtPinchPointX,
      b = (c - h) * e.percentageOfImageAtPinchPointY,
      m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
      v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
      y = m - e.centerPointStartX,
      x = v - e.centerPointStartY,
      w = l + (g + y),
      $ = d + (b + x),
      S = {
        top: $,
        left: w,
        scaleX: f,
        scaleY: f
      };
    e.canTap = !1, e.newWidth = p, e.newHeight = h, e.contentLastPos = S, e.requestId && i(e.requestId), e.requestId = o(function () {
      n.fancybox.setTranslate(e.$content, e.contentLastPos)
    })
  }, d.prototype.ontouchend = function (t) {
    var o = this,
      s = o.isSwiping,
      r = o.isPanning,
      c = o.isZooming,
      l = o.isScrolling;
    if (o.endPoints = a(t), o.dMs = Math.max((new Date).getTime() - o.startTime, 1), o.$container.removeClass("fancybox-is-grabbing"), n(e).off(".fb.touch"), e.removeEventListener("scroll", o.onscroll, !0), o.requestId && (i(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.isScrolling = !1, o.instance.isDragging = !1, o.canTap) return o.onTap(t);
    o.speed = 100, o.velocityX = o.distanceX / o.dMs * .5, o.velocityY = o.distanceY / o.dMs * .5, r ? o.endPanning() : c ? o.endZooming() : o.endSwiping(s, l)
  }, d.prototype.endSwiping = function (t, e) {
    var o = this,
      i = !1,
      a = o.instance.group.length,
      s = Math.abs(o.distanceX),
      r = "x" == t && a > 1 && (o.dMs > 130 && s > 10 || s > 50);
    o.sliderLastPos = null, "y" == t && !e && Math.abs(o.distanceY) > 50 ? (n.fancybox.animate(o.instance.current.$slide, {
      top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
      opacity: 0
    }, 200), i = o.instance.close(!0, 250)) : r && o.distanceX > 0 ? i = o.instance.previous(300) : r && o.distanceX < 0 && (i = o.instance.next(300)), !1 !== i || "x" != t && "y" != t || o.instance.centerSlide(200), o.$container.removeClass("fancybox-is-sliding")
  }, d.prototype.endPanning = function () {
    var t, e, o, i = this;
    i.contentLastPos && (!1 === i.opts.momentum || i.dMs > 350 ? (t = i.contentLastPos.left, e = i.contentLastPos.top) : (t = i.contentLastPos.left + 500 * i.velocityX, e = i.contentLastPos.top + 500 * i.velocityY), o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height), o.width = i.contentStartPos.width, o.height = i.contentStartPos.height, n.fancybox.animate(i.$content, o, 366))
  }, d.prototype.endZooming = function () {
    var t, e, o, i, a = this,
      s = a.instance.current,
      r = a.newWidth,
      c = a.newHeight;
    a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, i = {
      top: e,
      left: t,
      width: r,
      height: c,
      scaleX: 1,
      scaleY: 1
    }, n.fancybox.setTranslate(a.$content, i), r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c), n.fancybox.animate(a.$content, o, 150)))
  }, d.prototype.onTap = function (e) {
    var o, i = this,
      s = n(e.target),
      r = i.instance,
      c = r.current,
      l = e && a(e) || i.startPoints,
      d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
      u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
      f = function (t) {
        var o = c.opts[t];
        if (n.isFunction(o) && (o = o.apply(r, [c, e])), o) switch (o) {
          case "close":
            r.close(i.startEvent);
            break;
          case "toggleControls":
            r.toggleControls();
            break;
          case "next":
            r.next();
            break;
          case "nextOrClose":
            r.group.length > 1 ? r.next() : r.close(i.startEvent);
            break;
          case "zoom":
            "image" == c.type && (c.isLoaded || c.$ghost) && (r.canPan() ? r.scaleToFit() : r.isScaledDown() ? r.scaleToActual(d, u) : r.group.length < 2 && r.close(i.startEvent))
        }
      };
    if ((!e.originalEvent || 2 != e.originalEvent.button) && (s.is("img") || !(d > s[0].clientWidth + s.offset().left))) {
      if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) o = "Outside";
      else if (s.is(".fancybox-slide")) o = "Slide";
      else {
        if (!r.current.$content || !r.current.$content.find(s).addBack().filter(s).length) return;
        o = "Content"
      }
      if (i.tapped) {
        if (clearTimeout(i.tapped), i.tapped = null, Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50) return this;
        f("dblclick" + o)
      } else i.tapX = d, i.tapY = u, c.opts["dblclick" + o] && c.opts["dblclick" + o] !== c.opts["click" + o] ? i.tapped = setTimeout(function () {
        i.tapped = null, r.isAnimating || f("click" + o)
      }, 500) : f("click" + o);
      return this
    }
  }, n(e).on("onActivate.fb", function (t, e) {
    e && !e.Guestures && (e.Guestures = new d(e))
  }).on("beforeClose.fb", function (t, e) {
    e && e.Guestures && e.Guestures.destroy()
  })
}(window, document, jQuery),
function (t, e) {
  "use strict";
  e.extend(!0, e.fancybox.defaults, {
    btnTpl: {
      slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
    },
    slideShow: {
      autoStart: !1,
      speed: 3e3,
      progress: !0
    }
  });
  var n = function (t) {
    this.instance = t, this.init()
  };
  e.extend(n.prototype, {
    timer: null,
    isActive: !1,
    $button: null,
    init: function () {
      var t = this,
        n = t.instance,
        o = n.group[n.currIndex].opts.slideShow;
      t.$button = n.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
        t.toggle()
      }), n.group.length < 2 || !o ? t.$button.hide() : o.progress && (t.$progress = e('<div class="fancybox-progress"></div>').appendTo(n.$refs.inner))
    },
    set: function (t) {
      var n = this,
        o = n.instance,
        i = o.current;
      i && (!0 === t || i.opts.loop || o.currIndex < o.group.length - 1) ? n.isActive && "video" !== i.contentType && (n.$progress && e.fancybox.animate(n.$progress.show(), {
        scaleX: 1
      }, i.opts.slideShow.speed), n.timer = setTimeout(function () {
        o.current.opts.loop || o.current.index != o.group.length - 1 ? o.next() : o.jumpTo(0)
      }, i.opts.slideShow.speed)) : (n.stop(), o.idleSecondsCounter = 0, o.showControls())
    },
    clear: function () {
      var t = this;
      clearTimeout(t.timer), t.timer = null, t.$progress && t.$progress.removeAttr("style").hide()
    },
    start: function () {
      var t = this,
        e = t.instance.current;
      e && (t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.isActive = !0, e.isComplete && t.set(!0), t.instance.trigger("onSlideShowChange", !0))
    },
    stop: function () {
      var t = this,
        e = t.instance.current;
      t.clear(), t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1, t.instance.trigger("onSlideShowChange", !1), t.$progress && t.$progress.removeAttr("style").hide()
    },
    toggle: function () {
      var t = this;
      t.isActive ? t.stop() : t.start()
    }
  }), e(t).on({
    "onInit.fb": function (t, e) {
      e && !e.SlideShow && (e.SlideShow = new n(e))
    },
    "beforeShow.fb": function (t, e, n, o) {
      var i = e && e.SlideShow;
      o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear()
    },
    "afterShow.fb": function (t, e, n) {
      var o = e && e.SlideShow;
      o && o.isActive && o.set()
    },
    "afterKeydown.fb": function (n, o, i, a, s) {
      var r = o && o.SlideShow;
      !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(), r.toggle())
    },
    "beforeClose.fb onDeactivate.fb": function (t, e) {
      var n = e && e.SlideShow;
      n && n.stop()
    }
  }), e(t).on("visibilitychange", function () {
    var n = e.fancybox.getInstance(),
      o = n && n.SlideShow;
    o && o.isActive && (t.hidden ? o.clear() : o.set())
  })
}(document, jQuery),
function (t, e) {
  "use strict";
  var n = function () {
    for (var e = [
        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
      ], n = {}, o = 0; o < e.length; o++) {
      var i = e[o];
      if (i && i[1] in t) {
        for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a];
        return n
      }
    }
    return !1
  }();
  if (n) {
    var o = {
      request: function (e) {
        e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
      },
      exit: function () {
        t[n.exitFullscreen]()
      },
      toggle: function (e) {
        e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
      },
      isFullscreen: function () {
        return Boolean(t[n.fullscreenElement])
      },
      enabled: function () {
        return Boolean(t[n.fullscreenEnabled])
      }
    };
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
      },
      fullScreen: {
        autoStart: !1
      }
    }), e(t).on(n.fullscreenchange, function () {
      var t = o.isFullscreen(),
        n = e.fancybox.getInstance();
      n && (n.current && "image" === n.current.type && n.isAnimating && (n.isAnimating = !1, n.update(!0, !0, 0), n.isComplete || n.complete()), n.trigger("onFullscreenChange", t), n.$refs.container.toggleClass("fancybox-is-fullscreen", t), n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !t).toggleClass("fancybox-button--fsexit", t))
    })
  }
  e(t).on({
    "onInit.fb": function (t, e) {
      var i;
      if (!n) return void e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
      e && e.group[e.currIndex].opts.fullScreen ? (i = e.$refs.container, i.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) {
        t.stopPropagation(), t.preventDefault(), o.toggle()
      }), e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && o.request(), e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
    },
    "afterKeydown.fb": function (t, e, n, o, i) {
      e && e.FullScreen && 70 === i && (o.preventDefault(), e.FullScreen.toggle())
    },
    "beforeClose.fb": function (t, e) {
      e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && o.exit()
    }
  })
}(document, jQuery),
function (t, e) {
  "use strict";
  var n = "fancybox-thumbs";
  e.fancybox.defaults = e.extend(!0, {
    btnTpl: {
      thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
    },
    thumbs: {
      autoStart: !1,
      hideOnClose: !0,
      parentEl: ".fancybox-container",
      axis: "y"
    }
  }, e.fancybox.defaults);
  var o = function (t) {
    this.init(t)
  };
  e.extend(o.prototype, {
    $button: null,
    $grid: null,
    $list: null,
    isVisible: !1,
    isActive: !1,
    init: function (t) {
      var e = this,
        n = t.group,
        o = 0;
      e.instance = t, e.opts = n[t.currIndex].opts.thumbs, t.Thumbs = e, e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]");
      for (var i = 0, a = n.length; i < a && (n[i].thumb && o++, !(o > 1)); i++);
      o > 1 && e.opts ? (e.$button.removeAttr("style").on("click", function () {
        e.toggle()
      }), e.isActive = !0) : e.$button.hide()
    },
    create: function () {
      var t, o = this,
        i = o.instance,
        a = o.opts.parentEl,
        s = [];
      o.$grid || (o.$grid = e('<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)), o.$grid.on("click", "a", function () {
        i.jumpTo(e(this).attr("data-index"))
      })), o.$list || (o.$list = e('<div class="' + n + '__list">').appendTo(o.$grid)), e.each(i.group, function (e, n) {
        t = n.thumb, t || "image" !== n.type || (t = n.src), s.push('<a href="javascript:;" tabindex="0" data-index="' + e + '"' + (t && t.length ? ' style="background-image:url(' + t + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
      }), o.$list[0].innerHTML = s.join(""), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right"), 10) + i.group.length * o.$list.children().eq(0).outerWidth(!0))
    },
    focus: function (t) {
      var e, n, o = this,
        i = o.$list,
        a = o.$grid;
      o.instance.current && (e = i.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + o.instance.current.index + '"]').addClass("fancybox-thumbs-active"), n = e.position(), "y" === o.opts.axis && (n.top < 0 || n.top > i.height() - e.outerHeight()) ? i.stop().animate({
        scrollTop: i.scrollTop() + n.top
      }, t) : "x" === o.opts.axis && (n.left < a.scrollLeft() || n.left > a.scrollLeft() + (a.width() - e.outerWidth())) && i.parent().stop().animate({
        scrollLeft: n.left
      }, t))
    },
    update: function () {
      var t = this;
      t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), t.isVisible ? (t.$grid || t.create(), t.instance.trigger("onThumbsShow"), t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"), t.instance.update()
    },
    hide: function () {
      this.isVisible = !1, this.update()
    },
    show: function () {
      this.isVisible = !0, this.update()
    },
    toggle: function () {
      this.isVisible = !this.isVisible, this.update()
    }
  }), e(t).on({
    "onInit.fb": function (t, e) {
      var n;
      e && !e.Thumbs && (n = new o(e), n.isActive && !0 === n.opts.autoStart && n.show())
    },
    "beforeShow.fb": function (t, e, n, o) {
      var i = e && e.Thumbs;
      i && i.isVisible && i.focus(o ? 0 : 250)
    },
    "afterKeydown.fb": function (t, e, n, o, i) {
      var a = e && e.Thumbs;
      a && a.isActive && 71 === i && (o.preventDefault(), a.toggle())
    },
    "beforeClose.fb": function (t, e) {
      var n = e && e.Thumbs;
      n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide()
    }
  })
}(document, jQuery),
function (t, e) {
  "use strict";

  function n(t) {
    var e = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    return String(t).replace(/[&<>"'`=\/]/g, function (t) {
      return e[t]
    })
  }
  e.extend(!0, e.fancybox.defaults, {
    btnTpl: {
      share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
    },
    share: {
      url: function (t, e) {
        return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
      },
      tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
    }
  }), e(t).on("click", "[data-fancybox-share]", function () {
    var t, o, i = e.fancybox.getInstance(),
      a = i.current || null;
    a && ("function" === e.type(a.opts.share.url) && (t = a.opts.share.url.apply(a, [i, a])), o = a.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === a.type ? encodeURIComponent(a.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""), e.fancybox.open({
      src: i.translate(i, o),
      type: "html",
      opts: {
        touch: !1,
        animationEffect: !1,
        afterLoad: function (t, e) {
          i.$refs.container.one("beforeClose.fb", function () {
            t.close(null, 0)
          }), e.$content.find(".fancybox-share__button").click(function () {
            return window.open(this.href, "Share", "width=550, height=450"), !1
          })
        },
        mobile: {
          autoFocus: !1
        }
      }
    }))
  })
}(document, jQuery),
function (t, e, n) {
  "use strict";

  function o() {
    var e = t.location.hash.substr(1),
      n = e.split("-"),
      o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1,
      i = n.join("-");
    return {
      hash: e,
      index: o < 1 ? 1 : o,
      gallery: i
    }
  }

  function i(t) {
    "" !== t.gallery && n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1).focus().trigger("click.fb-start")
  }

  function a(t) {
    var e, n;
    return !!t && (e = t.current ? t.current.opts : t.opts, "" !== (n = e.hash || (e.$orig ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger") : "")) && n)
  }
  n.escapeSelector || (n.escapeSelector = function (t) {
    return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function (t, e) {
      return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
    })
  }), n(function () {
    !1 !== n.fancybox.defaults.hash && (n(e).on({
      "onInit.fb": function (t, e) {
        var n, i;
        !1 !== e.group[e.currIndex].opts.hash && (n = o(), (i = a(e)) && n.gallery && i == n.gallery && (e.currIndex = n.index - 1))
      },
      "beforeShow.fb": function (n, o, i, s) {
        var r;
        i && !1 !== i.opts.hash && (r = a(o)) && (o.currentHash = r + (o.group.length > 1 ? "-" + (i.index + 1) : ""), t.location.hash !== "#" + o.currentHash && (s && !o.origHash && (o.origHash = t.location.hash), o.hashTimer && clearTimeout(o.hashTimer), o.hashTimer = setTimeout(function () {
          "replaceState" in t.history ? (t.history[s ? "pushState" : "replaceState"]({}, e.title, t.location.pathname + t.location.search + "#" + o.currentHash), s && (o.hasCreatedHistory = !0)) : t.location.hash = o.currentHash, o.hashTimer = null
        }, 300)))
      },
      "beforeClose.fb": function (n, o, i) {
        i && !1 !== i.opts.hash && (clearTimeout(o.hashTimer), o.currentHash && o.hasCreatedHistory ? t.history.back() : o.currentHash && ("replaceState" in t.history ? t.history.replaceState({}, e.title, t.location.pathname + t.location.search + (o.origHash || "")) : t.location.hash = o.origHash), o.currentHash = null)
      }
    }), n(t).on("hashchange.fb", function () {
      var t = o(),
        e = null;
      n.each(n(".fancybox-container").get().reverse(), function (t, o) {
        var i = n(o).data("FancyBox");
        if (i && i.currentHash) return e = i, !1
      }), e ? e.currentHash === t.gallery + "-" + t.index || 1 === t.index && e.currentHash == t.gallery || (e.currentHash = null, e.close()) : "" !== t.gallery && i(t)
    }), setTimeout(function () {
      n.fancybox.getInstance() || i(o())
    }, 50))
  })
}(window, document, jQuery),
function (t, e) {
  "use strict";
  var n = (new Date).getTime();
  e(t).on({
    "onInit.fb": function (t, e, o) {
      e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (t) {
        var o = e.current,
          i = (new Date).getTime();
        e.group.length < 2 || !1 === o.opts.wheel || "auto" === o.opts.wheel && "image" !== o.type || (t.preventDefault(), t.stopPropagation(), o.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, i - n < 250 || (n = i, e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
      })
    }
  })
}(document, jQuery);
/*
    jQuery Masked Input Plugin
*/
! function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a) {
  var b, c = navigator.userAgent,
    d = /iphone/i.test(c),
    e = /chrome/i.test(c),
    f = /android/i.test(c);
  a.mask = {
    definitions: {
      9: "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    },
    autoclear: !0,
    dataName: "rawMaskFn",
    placeholder: "_"
  }, a.fn.extend({
    caret: function (a, b) {
      var c;
      if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
        this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
      })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
        begin: a,
        end: b
      })
    },
    unmask: function () {
      return this.trigger("unmask")
    },
    mask: function (c, g) {
      var h, i, j, k, l, m, n, o;
      if (!c && this.length > 0) {
        h = a(this[0]);
        var p = h.data(a.mask.dataName);
        return p ? p() : void 0
      }
      return g = a.extend({
        autoclear: a.mask.autoclear,
        placeholder: a.mask.placeholder,
        completed: null
      }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
        "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null)
      }), this.trigger("unmask").each(function () {
        function h() {
          if (g.completed) {
            for (var a = l; m >= a; a++)
              if (j[a] && C[a] === p(a)) return;
            g.completed.call(B)
          }
        }

        function p(a) {
          return g.placeholder.charAt(a < g.placeholder.length ? a : 0)
        }

        function q(a) {
          for (; ++a < n && !j[a];);
          return a
        }

        function r(a) {
          for (; --a >= 0 && !j[a];);
          return a
        }

        function s(a, b) {
          var c, d;
          if (!(0 > a)) {
            for (c = a, d = q(b); n > c; c++)
              if (j[c]) {
                if (!(n > d && j[c].test(C[d]))) break;
                C[c] = C[d], C[d] = p(d), d = q(d)
              } z(), B.caret(Math.max(l, a))
          }
        }

        function t(a) {
          var b, c, d, e;
          for (b = a, c = p(a); n > b; b++)
            if (j[b]) {
              if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
              c = e
            }
        }

        function u() {
          var a = B.val(),
            b = B.caret();
          if (o && o.length && o.length > a.length) {
            for (A(!0); b.begin > 0 && !j[b.begin - 1];) b.begin--;
            if (0 === b.begin)
              for (; b.begin < l && !j[b.begin];) b.begin++;
            B.caret(b.begin, b.begin)
          } else {
            for (A(!0); b.begin < n && !j[b.begin];) b.begin++;
            B.caret(b.begin, b.begin)
          }
          h()
        }

        function v() {
          A(), B.val() != E && B.change()
        }

        function w(a) {
          if (!B.prop("readonly")) {
            var b, c, e, f = a.which || a.keyCode;
            o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault())
          }
        }

        function x(b) {
          if (!B.prop("readonly")) {
            var c, d, e, g = b.which || b.keyCode,
              i = B.caret();
            if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
              if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                if (t(c), C[c] = d, z(), e = q(c), f) {
                  var k = function () {
                    a.proxy(a.fn.caret, B, e)()
                  };
                  setTimeout(k, 0)
                } else B.caret(e);
                i.begin <= m && h()
              }
              b.preventDefault()
            }
          }
        }

        function y(a, b) {
          var c;
          for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c))
        }

        function z() {
          B.val(C.join(""))
        }

        function A(a) {
          var b, c, d, e = B.val(),
            f = -1;
          for (b = 0, d = 0; n > b; b++)
            if (j[b]) {
              for (C[b] = p(b); d++ < e.length;)
                if (c = e.charAt(d - 1), j[b].test(c)) {
                  C[b] = c, f = b;
                  break
                } if (d > e.length) {
                y(b + 1, n);
                break
              }
            } else C[b] === e.charAt(d) && d++, k > b && (f = b);
          return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l
        }
        var B = a(this),
          C = a.map(c.split(""), function (a, b) {
            return "?" != a ? i[a] ? p(b) : a : void 0
          }),
          D = C.join(""),
          E = B.val();
        B.data(a.mask.dataName, function () {
          return a.map(C, function (a, b) {
            return j[b] && a != p(b) ? a : null
          }).join("")
        }), B.one("unmask", function () {
          B.off(".mask").removeData(a.mask.dataName)
        }).on("focus.mask", function () {
          if (!B.prop("readonly")) {
            clearTimeout(b);
            var a;
            E = B.val(), a = A(), b = setTimeout(function () {
              B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a))
            }, 10)
          }
        }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
          B.prop("readonly") || setTimeout(function () {
            var a = A(!0);
            B.caret(a), h()
          }, 0)
        }), e && f && B.off("input.mask").on("input.mask", u), A()
      })
    }
  })
});
/**
Query CSS Customizable Scrollbar
*/
! function (l, e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e(l.jQuery)
}(this, function (l) {
  "use strict";

  function e(e) {
    if (t.webkit && !e) return {
      height: 0,
      width: 0
    };
    if (!t.data.outer) {
      var o = {
        border: "none",
        "box-sizing": "content-box",
        height: "200px",
        margin: "0",
        padding: "0",
        width: "200px"
      };
      t.data.inner = l("<div>").css(l.extend({}, o)), t.data.outer = l("<div>").css(l.extend({
        left: "-1000px",
        overflow: "scroll",
        position: "absolute",
        top: "-1000px"
      }, o)).append(t.data.inner).appendTo("body")
    }
    return t.data.outer.scrollLeft(1e3).scrollTop(1e3), {
      height: Math.ceil(t.data.outer.offset().top - t.data.inner.offset().top || 0),
      width: Math.ceil(t.data.outer.offset().left - t.data.inner.offset().left || 0)
    }
  }

  function o() {
    var l = e(!0);
    return !(l.height || l.width)
  }

  function s(l) {
    var e = l.originalEvent;
    return e.axis && e.axis === e.HORIZONTAL_AXIS ? !1 : e.wheelDeltaX ? !1 : !0
  }
  var r = !1,
    t = {
      data: {
        index: 0,
        name: "scrollbar"
      },
      macosx: /mac/i.test(navigator.platform),
      mobile: /android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
      overlay: null,
      scroll: null,
      scrolls: [],
      webkit: /webkit/i.test(navigator.userAgent) && !/edge\/\d+/i.test(navigator.userAgent)
    };
  t.scrolls.add = function (l) {
    this.remove(l).push(l)
  }, t.scrolls.remove = function (e) {
    for (; l.inArray(e, this) >= 0;) this.splice(l.inArray(e, this), 1);
    return this
  };
  var i = {
      autoScrollSize: !0,
      autoUpdate: !0,
      debug: !1,
      disableBodyScroll: !1,
      duration: 200,
      ignoreMobile: !1,
      ignoreOverlay: !1,
      scrollStep: 30,
      showArrows: !1,
      stepScrolling: !0,
      scrollx: null,
      scrolly: null,
      onDestroy: null,
      onInit: null,
      onScroll: null,
      onUpdate: null
    },
    n = function (s) {
      t.scroll || (t.overlay = o(), t.scroll = e(), a(), l(window).resize(function () {
        var l = !1;
        if (t.scroll && (t.scroll.height || t.scroll.width)) {
          var o = e();
          (o.height !== t.scroll.height || o.width !== t.scroll.width) && (t.scroll = o, l = !0)
        }
        a(l)
      })), this.container = s, this.namespace = ".scrollbar_" + t.data.index++, this.options = l.extend({}, i, window.jQueryScrollbarOptions || {}), this.scrollTo = null, this.scrollx = {}, this.scrolly = {}, s.data(t.data.name, this), t.scrolls.add(this)
    };
  n.prototype = {
    destroy: function () {
      if (this.wrapper) {
        this.container.removeData(t.data.name), t.scrolls.remove(this);
        var e = this.container.scrollLeft(),
          o = this.container.scrollTop();
        this.container.insertBefore(this.wrapper).css({
          height: "",
          margin: "",
          "max-height": ""
        }).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(e).scrollTop(o), this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace), this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace), this.wrapper.remove(), l(document).add("body").off(this.namespace), l.isFunction(this.options.onDestroy) && this.options.onDestroy.apply(this, [this.container])
      }
    },
    init: function (e) {
      var o = this,
        r = this.container,
        i = this.containerWrapper || r,
        n = this.namespace,
        c = l.extend(this.options, e || {}),
        a = {
          x: this.scrollx,
          y: this.scrolly
        },
        d = this.wrapper,
        h = {
          scrollLeft: r.scrollLeft(),
          scrollTop: r.scrollTop()
        };
      if (t.mobile && c.ignoreMobile || t.overlay && c.ignoreOverlay || t.macosx && !t.webkit) return !1;
      if (d) i.css({
        height: "auto",
        "margin-bottom": -1 * t.scroll.height + "px",
        "margin-right": -1 * t.scroll.width + "px",
        "max-height": ""
      });
      else {
        if (this.wrapper = d = l("<div>").addClass("scroll-wrapper").addClass(r.attr("class")).css("position", "absolute" == r.css("position") ? "absolute" : "relative").insertBefore(r).append(r), r.is("textarea") && (this.containerWrapper = i = l("<div>").insertBefore(r).append(r), d.addClass("scroll-textarea")), i.addClass("scroll-content").css({
            height: "auto",
            "margin-bottom": -1 * t.scroll.height + "px",
            "margin-right": -1 * t.scroll.width + "px",
            "max-height": ""
          }), r.on("scroll" + n, function (e) {
            l.isFunction(c.onScroll) && c.onScroll.call(o, {
              maxScroll: a.y.maxScrollOffset,
              scroll: r.scrollTop(),
              size: a.y.size,
              visible: a.y.visible
            }, {
              maxScroll: a.x.maxScrollOffset,
              scroll: r.scrollLeft(),
              size: a.x.size,
              visible: a.x.visible
            }), a.x.isVisible && a.x.scroll.bar.css("left", r.scrollLeft() * a.x.kx + "px"), a.y.isVisible && a.y.scroll.bar.css("top", r.scrollTop() * a.y.kx + "px")
          }), d.on("scroll" + n, function () {
            d.scrollTop(0).scrollLeft(0)
          }), c.disableBodyScroll) {
          var p = function (l) {
            s(l) ? a.y.isVisible && a.y.mousewheel(l) : a.x.isVisible && a.x.mousewheel(l)
          };
          d.on("MozMousePixelScroll" + n, p), d.on("mousewheel" + n, p), t.mobile && d.on("touchstart" + n, function (e) {
            var o = e.originalEvent.touches && e.originalEvent.touches[0] || e,
              s = {
                pageX: o.pageX,
                pageY: o.pageY
              },
              t = {
                left: r.scrollLeft(),
                top: r.scrollTop()
              };
            l(document).on("touchmove" + n, function (l) {
              var e = l.originalEvent.targetTouches && l.originalEvent.targetTouches[0] || l;
              r.scrollLeft(t.left + s.pageX - e.pageX), r.scrollTop(t.top + s.pageY - e.pageY), l.preventDefault()
            }), l(document).on("touchend" + n, function () {
              l(document).off(n)
            })
          })
        }
        l.isFunction(c.onInit) && c.onInit.apply(this, [r])
      }
      l.each(a, function (e, t) {
        var i = null,
          d = 1,
          h = "x" === e ? "scrollLeft" : "scrollTop",
          p = c.scrollStep,
          u = function () {
            var l = r[h]();
            r[h](l + p), 1 == d && l + p >= f && (l = r[h]()), -1 == d && f >= l + p && (l = r[h]()), r[h]() == l && i && i()
          },
          f = 0;
        t.scroll || (t.scroll = o._getScroll(c["scroll" + e]).addClass("scroll-" + e), c.showArrows && t.scroll.addClass("scroll-element_arrows_visible"), t.mousewheel = function (l) {
          if (!t.isVisible || "x" === e && s(l)) return !0;
          if ("y" === e && !s(l)) return a.x.mousewheel(l), !0;
          var i = -1 * l.originalEvent.wheelDelta || l.originalEvent.detail,
            n = t.size - t.visible - t.offset;
          return (i > 0 && n > f || 0 > i && f > 0) && (f += i, 0 > f && (f = 0), f > n && (f = n), o.scrollTo = o.scrollTo || {}, o.scrollTo[h] = f, setTimeout(function () {
            o.scrollTo && (r.stop().animate(o.scrollTo, 240, "linear", function () {
              f = r[h]()
            }), o.scrollTo = null)
          }, 1)), l.preventDefault(), !1
        }, t.scroll.on("MozMousePixelScroll" + n, t.mousewheel).on("mousewheel" + n, t.mousewheel).on("mouseenter" + n, function () {
          f = r[h]()
        }), t.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown" + n, function (s) {
          if (1 != s.which) return !0;
          d = 1;
          var n = {
              eventOffset: s["x" === e ? "pageX" : "pageY"],
              maxScrollValue: t.size - t.visible - t.offset,
              scrollbarOffset: t.scroll.bar.offset()["x" === e ? "left" : "top"],
              scrollbarSize: t.scroll.bar["x" === e ? "outerWidth" : "outerHeight"]()
            },
            a = 0,
            v = 0;
          return l(this).hasClass("scroll-arrow") ? (d = l(this).hasClass("scroll-arrow_more") ? 1 : -1, p = c.scrollStep * d, f = d > 0 ? n.maxScrollValue : 0) : (d = n.eventOffset > n.scrollbarOffset + n.scrollbarSize ? 1 : n.eventOffset < n.scrollbarOffset ? -1 : 0, p = Math.round(.75 * t.visible) * d, f = n.eventOffset - n.scrollbarOffset - (c.stepScrolling ? 1 == d ? n.scrollbarSize : 0 : Math.round(n.scrollbarSize / 2)), f = r[h]() + f / t.kx), o.scrollTo = o.scrollTo || {}, o.scrollTo[h] = c.stepScrolling ? r[h]() + p : f, c.stepScrolling && (i = function () {
            f = r[h](), clearInterval(v), clearTimeout(a), a = 0, v = 0
          }, a = setTimeout(function () {
            v = setInterval(u, 40)
          }, c.duration + 100)), setTimeout(function () {
            o.scrollTo && (r.animate(o.scrollTo, c.duration), o.scrollTo = null)
          }, 1), o._handleMouseDown(i, s)
        }), t.scroll.bar.on("mousedown" + n, function (s) {
          if (1 != s.which) return !0;
          var i = s["x" === e ? "pageX" : "pageY"],
            c = r[h]();
          return t.scroll.addClass("scroll-draggable"), l(document).on("mousemove" + n, function (l) {
            var o = parseInt((l["x" === e ? "pageX" : "pageY"] - i) / t.kx, 10);
            r[h](c + o)
          }), o._handleMouseDown(function () {
            t.scroll.removeClass("scroll-draggable"), f = r[h]()
          }, s)
        }))
      }), l.each(a, function (l, e) {
        var o = "scroll-scroll" + l + "_visible",
          s = "x" == l ? a.y : a.x;
        e.scroll.removeClass(o), s.scroll.removeClass(o), i.removeClass(o)
      }), l.each(a, function (e, o) {
        l.extend(o, "x" == e ? {
          offset: parseInt(r.css("left"), 10) || 0,
          size: r.prop("scrollWidth"),
          visible: d.width()
        } : {
          offset: parseInt(r.css("top"), 10) || 0,
          size: r.prop("scrollHeight"),
          visible: d.height()
        })
      }), this._updateScroll("x", this.scrollx), this._updateScroll("y", this.scrolly), l.isFunction(c.onUpdate) && c.onUpdate.apply(this, [r]), l.each(a, function (l, e) {
        var o = "x" === l ? "left" : "top",
          s = "x" === l ? "outerWidth" : "outerHeight",
          t = "x" === l ? "width" : "height",
          i = parseInt(r.css(o), 10) || 0,
          n = e.size,
          a = e.visible + i,
          d = e.scroll.size[s]() + (parseInt(e.scroll.size.css(o), 10) || 0);
        c.autoScrollSize && (e.scrollbarSize = parseInt(d * a / n, 10), e.scroll.bar.css(t, e.scrollbarSize + "px")), e.scrollbarSize = e.scroll.bar[s](), e.kx = (d - e.scrollbarSize) / (n - a) || 1, e.maxScrollOffset = n - a
      }), r.scrollLeft(h.scrollLeft).scrollTop(h.scrollTop).trigger("scroll")
    },
    _getScroll: function (e) {
      var o = {
        advanced: ['<div class="scroll-element">', '<div class="scroll-element_corner"></div>', '<div class="scroll-arrow scroll-arrow_less"></div>', '<div class="scroll-arrow scroll-arrow_more"></div>', '<div class="scroll-element_outer">', '<div class="scroll-element_size"></div>', '<div class="scroll-element_inner-wrapper">', '<div class="scroll-element_inner scroll-element_track">', '<div class="scroll-element_inner-bottom"></div>', "</div>", "</div>", '<div class="scroll-bar">', '<div class="scroll-bar_body">', '<div class="scroll-bar_body-inner"></div>', "</div>", '<div class="scroll-bar_bottom"></div>', '<div class="scroll-bar_center"></div>', "</div>", "</div>", "</div>"].join(""),
        simple: ['<div class="scroll-element">', '<div class="scroll-element_outer">', '<div class="scroll-element_size"></div>', '<div class="scroll-element_track"></div>', '<div class="scroll-bar"></div>', "</div>", "</div>"].join("")
      };
      return o[e] && (e = o[e]), e || (e = o.simple), e = "string" == typeof e ? l(e).appendTo(this.wrapper) : l(e), l.extend(e, {
        bar: e.find(".scroll-bar"),
        size: e.find(".scroll-element_size"),
        track: e.find(".scroll-element_track")
      }), e
    },
    _handleMouseDown: function (e, o) {
      var s = this.namespace;
      return l(document).on("blur" + s, function () {
        l(document).add("body").off(s), e && e()
      }), l(document).on("dragstart" + s, function (l) {
        return l.preventDefault(), !1
      }), l(document).on("mouseup" + s, function () {
        l(document).add("body").off(s), e && e()
      }), l("body").on("selectstart" + s, function (l) {
        return l.preventDefault(), !1
      }), o && o.preventDefault(), !1
    },
    _updateScroll: function (e, o) {
      var s = this.container,
        r = this.containerWrapper || s,
        i = "scroll-scroll" + e + "_visible",
        n = "x" === e ? this.scrolly : this.scrollx,
        c = parseInt(this.container.css("x" === e ? "left" : "top"), 10) || 0,
        a = this.wrapper,
        d = o.size,
        h = o.visible + c;
      o.isVisible = d - h > 1, o.isVisible ? (o.scroll.addClass(i), n.scroll.addClass(i), r.addClass(i)) : (o.scroll.removeClass(i), n.scroll.removeClass(i), r.removeClass(i)), "y" === e && (s.is("textarea") || h > d ? r.css({
        height: h + t.scroll.height + "px",
        "max-height": "none"
      }) : r.css({
        "max-height": h + t.scroll.height + "px"
      })), (o.size != s.prop("scrollWidth") || n.size != s.prop("scrollHeight") || o.visible != a.width() || n.visible != a.height() || o.offset != (parseInt(s.css("left"), 10) || 0) || n.offset != (parseInt(s.css("top"), 10) || 0)) && (l.extend(this.scrollx, {
        offset: parseInt(s.css("left"), 10) || 0,
        size: s.prop("scrollWidth"),
        visible: a.width()
      }), l.extend(this.scrolly, {
        offset: parseInt(s.css("top"), 10) || 0,
        size: this.container.prop("scrollHeight"),
        visible: a.height()
      }), this._updateScroll("x" === e ? "y" : "x", n))
    }
  };
  var c = n;
  l.fn.scrollbar = function (e, o) {
    return "string" != typeof e && (o = e, e = "init"), "undefined" == typeof o && (o = []), l.isArray(o) || (o = [o]), this.not("body, .scroll-wrapper").each(function () {
      var s = l(this),
        r = s.data(t.data.name);
      (r || "init" === e) && (r || (r = new c(s)), r[e] && r[e].apply(r, o))
    }), this
  }, l.fn.scrollbar.options = i;
  var a = function () {
    var l = 0,
      e = 0;
    return function (o) {
      var s, i, n, c, d, h, p;
      for (s = 0; s < t.scrolls.length; s++) c = t.scrolls[s], i = c.container, n = c.options, d = c.wrapper, h = c.scrollx, p = c.scrolly, (o || n.autoUpdate && d && d.is(":visible") && (i.prop("scrollWidth") != h.size || i.prop("scrollHeight") != p.size || d.width() != h.visible || d.height() != p.visible)) && (c.init(), n.debug && (window.console && console.log({
        scrollHeight: i.prop("scrollHeight") + ":" + c.scrolly.size,
        scrollWidth: i.prop("scrollWidth") + ":" + c.scrollx.size,
        visibleHeight: d.height() + ":" + c.scrolly.visible,
        visibleWidth: d.width() + ":" + c.scrollx.visible
      }, !0), e++));
      r && e > 10 ? (window.console && console.log("Scroll updates exceed 10"), a = function () {}) : (clearTimeout(l), l = setTimeout(a, 300))
    }
  }();
  window.angular && ! function (l) {
    l.module("jQueryScrollbar", []).provider("jQueryScrollbar", function () {
      var e = i;
      return {
        setOptions: function (o) {
          l.extend(e, o)
        },
        $get: function () {
          return {
            options: l.copy(e)
          }
        }
      }
    }).directive("jqueryScrollbar", ["jQueryScrollbar", "$parse", function (l, e) {
      return {
        restrict: "AC",
        link: function (o, s, r) {
          var t = e(r.jqueryScrollbar),
            i = t(o);
          s.scrollbar(i || l.options).on("$destroy", function () {
            s.scrollbar("destroy")
          })
        }
      }
    }])
  }(window.angular)
});
/* International Telephone Input v17.0.0*/

/*
 * International Telephone Input v17.0.13
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

! function (a) {
  "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], function (b) {
    a(b)
  }) : a(jQuery)
}(function (a, b) {
  "use strict";

  function c(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
  }

  function d(a, b) {
    for (var c = 0; c < b.length; c++) {
      var d = b[c];
      d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
    }
  }

  function e(a, b, c) {
    return b && d(a.prototype, b), c && d(a, c), a
  }
  for (var f = [
      ["Afghanistan (‫افغانستان‬‎)", "af", "93"],
      ["Albania (Shqipëri)", "al", "355"],
      ["Algeria (‫الجزائر‬‎)", "dz", "213"],
      ["American Samoa", "as", "1", 5, ["684"]],
      ["Andorra", "ad", "376"],
      ["Angola", "ao", "244"],
      ["Anguilla", "ai", "1", 6, ["264"]],
      ["Antigua and Barbuda", "ag", "1", 7, ["268"]],
      ["Argentina", "ar", "54"],
      ["Armenia (Հայաստան)", "am", "374"],
      ["Aruba", "aw", "297"],
      ["Ascension Island", "ac", "247"],
      ["Australia", "au", "61", 0],
      ["Austria (Österreich)", "at", "43"],
      ["Azerbaijan (Azərbaycan)", "az", "994"],
      ["Bahamas", "bs", "1", 8, ["242"]],
      ["Bahrain (‫البحرين‬‎)", "bh", "973"],
      ["Bangladesh (বাংলাদেশ)", "bd", "880"],
      ["Barbados", "bb", "1", 9, ["246"]],
      ["Belarus (Беларусь)", "by", "375"],
      ["Belgium (België)", "be", "32"],
      ["Belize", "bz", "501"],
      ["Benin (Bénin)", "bj", "229"],
      ["Bermuda", "bm", "1", 10, ["441"]],
      ["Bhutan (འབྲུག)", "bt", "975"],
      ["Bolivia", "bo", "591"],
      ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"],
      ["Botswana", "bw", "267"],
      ["Brazil (Brasil)", "br", "55"],
      ["British Indian Ocean Territory", "io", "246"],
      ["British Virgin Islands", "vg", "1", 11, ["284"]],
      ["Brunei", "bn", "673"],
      ["Bulgaria (България)", "bg", "359"],
      ["Burkina Faso", "bf", "226"],
      ["Burundi (Uburundi)", "bi", "257"],
      ["Cambodia (កម្ពុជា)", "kh", "855"],
      ["Cameroon (Cameroun)", "cm", "237"],
      ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]],
      ["Cape Verde (Kabu Verdi)", "cv", "238"],
      ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]],
      ["Cayman Islands", "ky", "1", 12, ["345"]],
      ["Central African Republic (République centrafricaine)", "cf", "236"],
      ["Chad (Tchad)", "td", "235"],
      ["Chile", "cl", "56"],
      ["China (中国)", "cn", "86"],
      ["Christmas Island", "cx", "61", 2, ["89164"]],
      ["Cocos (Keeling) Islands", "cc", "61", 1, ["89162"]],
      ["Colombia", "co", "57"],
      ["Comoros (‫جزر القمر‬‎)", "km", "269"],
      ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
      ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
      ["Cook Islands", "ck", "682"],
      ["Costa Rica", "cr", "506"],
      ["Côte d’Ivoire", "ci", "225"],
      ["Croatia (Hrvatska)", "hr", "385"],
      ["Cuba", "cu", "53"],
      ["Curaçao", "cw", "599", 0],
      ["Cyprus (Κύπρος)", "cy", "357"],
      ["Czech Republic (Česká republika)", "cz", "420"],
      ["Denmark (Danmark)", "dk", "45"],
      ["Djibouti", "dj", "253"],
      ["Dominica", "dm", "1", 13, ["767"]],
      ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]],
      ["Ecuador", "ec", "593"],
      ["Egypt (‫مصر‬‎)", "eg", "20"],
      ["El Salvador", "sv", "503"],
      ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
      ["Eritrea", "er", "291"],
      ["Estonia (Eesti)", "ee", "372"],
      ["Eswatini", "sz", "268"],
      ["Ethiopia", "et", "251"],
      ["Falkland Islands (Islas Malvinas)", "fk", "500"],
      ["Faroe Islands (Føroyar)", "fo", "298"],
      ["Fiji", "fj", "679"],
      ["Finland (Suomi)", "fi", "358", 0],
      ["France", "fr", "33"],
      ["French Guiana (Guyane française)", "gf", "594"],
      ["French Polynesia (Polynésie française)", "pf", "689"],
      ["Gabon", "ga", "241"],
      ["Gambia", "gm", "220"],
      ["Georgia (საქართველო)", "ge", "995"],
      ["Germany (Deutschland)", "de", "49"],
      ["Ghana (Gaana)", "gh", "233"],
      ["Gibraltar", "gi", "350"],
      ["Greece (Ελλάδα)", "gr", "30"],
      ["Greenland (Kalaallit Nunaat)", "gl", "299"],
      ["Grenada", "gd", "1", 14, ["473"]],
      ["Guadeloupe", "gp", "590", 0],
      ["Guam", "gu", "1", 15, ["671"]],
      ["Guatemala", "gt", "502"],
      ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]],
      ["Guinea (Guinée)", "gn", "224"],
      ["Guinea-Bissau (Guiné Bissau)", "gw", "245"],
      ["Guyana", "gy", "592"],
      ["Haiti", "ht", "509"],
      ["Honduras", "hn", "504"],
      ["Hong Kong (香港)", "hk", "852"],
      ["Hungary (Magyarország)", "hu", "36"],
      ["Iceland (Ísland)", "is", "354"],
      ["India (भारत)", "in", "91"],
      ["Indonesia", "id", "62"],
      ["Iran (‫ایران‬‎)", "ir", "98"],
      ["Iraq (‫العراق‬‎)", "iq", "964"],
      ["Ireland", "ie", "353"],
      ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]],
      ["Israel (‫ישראל‬‎)", "il", "972"],
      ["Italy (Italia)", "it", "39", 0],
      ["Jamaica", "jm", "1", 4, ["876", "658"]],
      ["Japan (日本)", "jp", "81"],
      ["Jersey", "je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"]],
      ["Jordan (‫الأردن‬‎)", "jo", "962"],
      ["Kazakhstan (Казахстан)", "kz", "7", 1, ["33", "7"]],
      ["Kenya", "ke", "254"],
      ["Kiribati", "ki", "686"],
      ["Kosovo", "xk", "383"],
      ["Kuwait (‫الكويت‬‎)", "kw", "965"],
      ["Kyrgyzstan (Кыргызстан)", "kg", "996"],
      ["Laos (ລາວ)", "la", "856"],
      ["Latvia (Latvija)", "lv", "371"],
      ["Lebanon (‫لبنان‬‎)", "lb", "961"],
      ["Lesotho", "ls", "266"],
      ["Liberia", "lr", "231"],
      ["Libya (‫ليبيا‬‎)", "ly", "218"],
      ["Liechtenstein", "li", "423"],
      ["Lithuania (Lietuva)", "lt", "370"],
      ["Luxembourg", "lu", "352"],
      ["Macau (澳門)", "mo", "853"],
      ["Macedonia (FYROM) (Македонија)", "mk", "389"],
      ["Madagascar (Madagasikara)", "mg", "261"],
      ["Malawi", "mw", "265"],
      ["Malaysia", "my", "60"],
      ["Maldives", "mv", "960"],
      ["Mali", "ml", "223"],
      ["Malta", "mt", "356"],
      ["Marshall Islands", "mh", "692"],
      ["Martinique", "mq", "596"],
      ["Mauritania (‫موريتانيا‬‎)", "mr", "222"],
      ["Mauritius (Moris)", "mu", "230"],
      ["Mayotte", "yt", "262", 1, ["269", "639"]],
      ["Mexico (México)", "mx", "52"],
      ["Micronesia", "fm", "691"],
      ["Moldova (Republica Moldova)", "md", "373"],
      ["Monaco", "mc", "377"],
      ["Mongolia (Монгол)", "mn", "976"],
      ["Montenegro (Crna Gora)", "me", "382"],
      ["Montserrat", "ms", "1", 16, ["664"]],
      ["Morocco (‫المغرب‬‎)", "ma", "212", 0],
      ["Mozambique (Moçambique)", "mz", "258"],
      ["Myanmar (Burma) (မြန်မာ)", "mm", "95"],
      ["Namibia (Namibië)", "na", "264"],
      ["Nauru", "nr", "674"],
      ["Nepal (नेपाल)", "np", "977"],
      ["Netherlands (Nederland)", "nl", "31"],
      ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"],
      ["New Zealand", "nz", "64"],
      ["Nicaragua", "ni", "505"],
      ["Niger (Nijar)", "ne", "227"],
      ["Nigeria", "ng", "234"],
      ["Niue", "nu", "683"],
      ["Norfolk Island", "nf", "672"],
      ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"],
      ["Northern Mariana Islands", "mp", "1", 17, ["670"]],
      ["Norway (Norge)", "no", "47", 0],
      ["Oman (‫عُمان‬‎)", "om", "968"],
      ["Pakistan (‫پاکستان‬‎)", "pk", "92"],
      ["Palau", "pw", "680"],
      ["Palestine (‫فلسطين‬‎)", "ps", "970"],
      ["Panama (Panamá)", "pa", "507"],
      ["Papua New Guinea", "pg", "675"],
      ["Paraguay", "py", "595"],
      ["Peru (Perú)", "pe", "51"],
      ["Philippines", "ph", "63"],
      ["Poland (Polska)", "pl", "48"],
      ["Portugal", "pt", "351"],
      ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
      ["Qatar (‫قطر‬‎)", "qa", "974"],
      ["Réunion (La Réunion)", "re", "262", 0],
      ["Romania (România)", "ro", "40"],
      ["Russia (Россия)", "ru", "7", 0],
      ["Rwanda", "rw", "250"],
      ["Saint Barthélemy", "bl", "590", 1],
      ["Saint Helena", "sh", "290"],
      ["Saint Kitts and Nevis", "kn", "1", 18, ["869"]],
      ["Saint Lucia", "lc", "1", 19, ["758"]],
      ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2],
      ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
      ["Saint Vincent and the Grenadines", "vc", "1", 20, ["784"]],
      ["Samoa", "ws", "685"],
      ["San Marino", "sm", "378"],
      ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"],
      ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"],
      ["Senegal (Sénégal)", "sn", "221"],
      ["Serbia (Србија)", "rs", "381"],
      ["Seychelles", "sc", "248"],
      ["Sierra Leone", "sl", "232"],
      ["Singapore", "sg", "65"],
      ["Sint Maarten", "sx", "1", 21, ["721"]],
      ["Slovakia (Slovensko)", "sk", "421"],
      ["Slovenia (Slovenija)", "si", "386"],
      ["Solomon Islands", "sb", "677"],
      ["Somalia (Soomaaliya)", "so", "252"],
      ["South Africa", "za", "27"],
      ["South Korea (대한민국)", "kr", "82"],
      ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"],
      ["Spain (España)", "es", "34"],
      ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"],
      ["Sudan (‫السودان‬‎)", "sd", "249"],
      ["Suriname", "sr", "597"],
      ["Svalbard and Jan Mayen", "sj", "47", 1, ["79"]],
      ["Sweden (Sverige)", "se", "46"],
      ["Switzerland (Schweiz)", "ch", "41"],
      ["Syria (‫سوريا‬‎)", "sy", "963"],
      ["Taiwan (台灣)", "tw", "886"],
      ["Tajikistan", "tj", "992"],
      ["Tanzania", "tz", "255"],
      ["Thailand (ไทย)", "th", "66"],
      ["Timor-Leste", "tl", "670"],
      ["Togo", "tg", "228"],
      ["Tokelau", "tk", "690"],
      ["Tonga", "to", "676"],
      ["Trinidad and Tobago", "tt", "1", 22, ["868"]],
      ["Tunisia (‫تونس‬‎)", "tn", "216"],
      ["Turkey (Türkiye)", "tr", "90"],
      ["Turkmenistan", "tm", "993"],
      ["Turks and Caicos Islands", "tc", "1", 23, ["649"]],
      ["Tuvalu", "tv", "688"],
      ["U.S. Virgin Islands", "vi", "1", 24, ["340"]],
      ["Uganda", "ug", "256"],
      ["Ukraine (Україна)", "ua", "380"],
      ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"],
      ["United Kingdom", "gb", "44", 0],
      ["United States", "us", "1", 0],
      ["Uruguay", "uy", "598"],
      ["Uzbekistan (Oʻzbekiston)", "uz", "998"],
      ["Vanuatu", "vu", "678"],
      ["Vatican City (Città del Vaticano)", "va", "39", 1, ["06698"]],
      ["Venezuela", "ve", "58"],
      ["Vietnam (Việt Nam)", "vn", "84"],
      ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"],
      ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, ["5288", "5289"]],
      ["Yemen (‫اليمن‬‎)", "ye", "967"],
      ["Zambia", "zm", "260"],
      ["Zimbabwe", "zw", "263"],
      ["Åland Islands", "ax", "358", 1, ["18"]]
    ], g = 0; g < f.length; g++) {
    var h = f[g];
    f[g] = {
      name: h[0],
      iso2: h[1],
      dialCode: h[2],
      priority: h[3] || 0,
      areaCodes: h[4] || null
    }
  }
  var i = {
    getInstance: function (a) {
      var b = a.getAttribute("data-intl-tel-input-id");
      return window.intlTelInputGlobals.instances[b]
    },
    instances: {},
    documentReady: function () {
      return "complete" === document.readyState
    }
  };
  "object" == typeof window && (window.intlTelInputGlobals = i);
  var j = 0,
    k = {
      allowDropdown: !0,
      autoHideDialCode: !0,
      autoPlaceholder: "polite",
      customContainer: "",
      customPlaceholder: null,
      dropdownContainer: null,
      excludeCountries: [],
      formatOnDisplay: !0,
      geoIpLookup: null,
      hiddenInput: "",
      initialCountry: "",
      localizedCountries: null,
      nationalMode: !0,
      onlyCountries: [],
      placeholderNumberType: "MOBILE",
      preferredCountries: ["us", "gb"],
      separateDialCode: !1,
      utilsScript: ""
    },
    l = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"],
    m = function (a, b) {
      for (var c = Object.keys(a), d = 0; d < c.length; d++) b(c[d], a[c[d]])
    },
    n = function (a) {
      m(window.intlTelInputGlobals.instances, function (b) {
        window.intlTelInputGlobals.instances[b][a]()
      })
    },
    o = function () {
      function a(b, d) {
        var e = this;
        c(this, a), this.id = j++, this.a = b, this.b = null, this.c = null;
        var f = d || {};
        this.d = {}, m(k, function (a, b) {
          e.d[a] = f.hasOwnProperty(a) ? f[a] : b
        }), this.e = Boolean(b.getAttribute("placeholder"))
      }
      return e(a, [{
        key: "_init",
        value: function () {
          var a = this;
          if (this.d.nationalMode && (this.d.autoHideDialCode = !1), this.d.separateDialCode && (this.d.autoHideDialCode = this.d.nationalMode = !1), this.g = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), this.g && (document.body.classList.add("iti-mobile"), this.d.dropdownContainer || (this.d.dropdownContainer = document.body)), "undefined" != typeof Promise) {
            var b = new Promise(function (b, c) {
                a.h = b, a.i = c
              }),
              c = new Promise(function (b, c) {
                a.i0 = b, a.i1 = c
              });
            this.promise = Promise.all([b, c])
          } else this.h = this.i = function () {}, this.i0 = this.i1 = function () {};
          this.s = {}, this._b(), this._f(), this._h(), this._i(), this._i3()
        }
      }, {
        key: "_b",
        value: function () {
          this._d(), this._d2(), this._e(), this.d.localizedCountries && this._d0(), (this.d.onlyCountries.length || this.d.localizedCountries) && this.p.sort(this._d1)
        }
      }, {
        key: "_c",
        value: function (a, c, d) {
          c.length > this.countryCodeMaxLen && (this.countryCodeMaxLen = c.length), this.q.hasOwnProperty(c) || (this.q[c] = []);
          for (var e = 0; e < this.q[c].length; e++)
            if (this.q[c][e] === a) return;
          var f = d !== b ? d : this.q[c].length;
          this.q[c][f] = a
        }
      }, {
        key: "_d",
        value: function () {
          if (this.d.onlyCountries.length) {
            var a = this.d.onlyCountries.map(function (a) {
              return a.toLowerCase()
            });
            this.p = f.filter(function (b) {
              return a.indexOf(b.iso2) > -1
            })
          } else if (this.d.excludeCountries.length) {
            var b = this.d.excludeCountries.map(function (a) {
              return a.toLowerCase()
            });
            this.p = f.filter(function (a) {
              return -1 === b.indexOf(a.iso2)
            })
          } else this.p = f
        }
      }, {
        key: "_d0",
        value: function () {
          for (var a = 0; a < this.p.length; a++) {
            var b = this.p[a].iso2.toLowerCase();
            this.d.localizedCountries.hasOwnProperty(b) && (this.p[a].name = this.d.localizedCountries[b])
          }
        }
      }, {
        key: "_d1",
        value: function (a, b) {
          return a.name.localeCompare(b.name)
        }
      }, {
        key: "_d2",
        value: function () {
          this.countryCodeMaxLen = 0, this.dialCodes = {}, this.q = {};
          for (var a = 0; a < this.p.length; a++) {
            var b = this.p[a];
            this.dialCodes[b.dialCode] || (this.dialCodes[b.dialCode] = !0), this._c(b.iso2, b.dialCode, b.priority)
          }
          for (var c = 0; c < this.p.length; c++) {
            var d = this.p[c];
            if (d.areaCodes)
              for (var e = this.q[d.dialCode][0], f = 0; f < d.areaCodes.length; f++) {
                for (var g = d.areaCodes[f], h = 1; h < g.length; h++) {
                  var i = d.dialCode + g.substr(0, h);
                  this._c(e, i), this._c(d.iso2, i)
                }
                this._c(d.iso2, d.dialCode + g)
              }
          }
        }
      }, {
        key: "_e",
        value: function () {
          this.preferredCountries = [];
          for (var a = 0; a < this.d.preferredCountries.length; a++) {
            var b = this.d.preferredCountries[a].toLowerCase(),
              c = this._y(b, !1, !0);
            c && this.preferredCountries.push(c)
          }
        }
      }, {
        key: "_e2",
        value: function (a, b, c) {
          var d = document.createElement(a);
          return b && m(b, function (a, b) {
            return d.setAttribute(a, b)
          }), c && c.appendChild(d), d
        }
      }, {
        key: "_f",
        value: function () {
          this.a.hasAttribute("autocomplete") || this.a.form && this.a.form.hasAttribute("autocomplete") || this.a.setAttribute("autocomplete", "off");
          var a = "iti";
          this.d.allowDropdown && (a += " iti--allow-dropdown"), this.d.separateDialCode && (a += " iti--separate-dial-code"), this.d.customContainer && (a += " ", a += this.d.customContainer);
          var b = this._e2("div", {
            "class": a
          });
          if (this.a.parentNode.insertBefore(b, this.a), this.k = this._e2("div", {
              "class": "iti__flag-container"
            }, b), b.appendChild(this.a), this.selectedFlag = this._e2("div", {
              "class": "iti__selected-flag",
              role: "combobox",
              "aria-controls": "iti-".concat(this.id, "__country-listbox"),
              "aria-owns": "iti-".concat(this.id, "__country-listbox"),
              "aria-expanded": "false"
            }, this.k), this.l = this._e2("div", {
              "class": "iti__flag"
            }, this.selectedFlag), this.d.separateDialCode && (this.t = this._e2("div", {
              "class": "iti__selected-dial-code"
            }, this.selectedFlag)), this.d.allowDropdown && (this.selectedFlag.setAttribute("tabindex", "0"), this.u = this._e2("div", {
              "class": "iti__arrow"
            }, this.selectedFlag), this.m = this._e2("ul", {
              "class": "iti__country-list iti__hide",
              id: "iti-".concat(this.id, "__country-listbox"),
              role: "listbox",
              "aria-label": "List of countries"
            }), this.preferredCountries.length && (this._g(this.preferredCountries, "iti__preferred", !0), this._e2("li", {
              "class": "iti__divider",
              role: "separator",
              "aria-disabled": "true"
            }, this.m)), this._g(this.p, "iti__standard"), this.d.dropdownContainer ? (this.dropdown = this._e2("div", {
              "class": "iti iti--container"
            }), this.dropdown.appendChild(this.m)) : this.k.appendChild(this.m)), this.d.hiddenInput) {
            var c = this.d.hiddenInput,
              d = this.a.getAttribute("name");
            if (d) {
              var e = d.lastIndexOf("["); - 1 !== e && (c = "".concat(d.substr(0, e), "[").concat(c, "]"))
            }
            this.hiddenInput = this._e2("input", {
              type: "hidden",
              name: c
            }), b.appendChild(this.hiddenInput)
          }
        }
      }, {
        key: "_g",
        value: function (a, b, c) {
          for (var d = "", e = 0; e < a.length; e++) {
            var f = a[e],
              g = c ? "-preferred" : "";
            d += "<li class='iti__country ".concat(b, "' tabIndex='-1' id='iti-").concat(this.id, "__item-").concat(f.iso2).concat(g, "' role='option' data-dial-code='").concat(f.dialCode, "' data-country-code='").concat(f.iso2, "' aria-selected='false'>"), d += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(f.iso2, "'></div></div>"), d += "<span class='iti__country-name'>".concat(f.name, "</span>"), d += "<span class='iti__dial-code'>+".concat(f.dialCode, "</span>"), d += "</li>"
          }
          this.m.insertAdjacentHTML("beforeend", d)
        }
      }, {
        key: "_h",
        value: function () {
          var a = this.a.getAttribute("value"),
            b = this.a.value,
            c = a && "+" === a.charAt(0) && (!b || "+" !== b.charAt(0)),
            d = c ? a : b,
            e = this._5(d),
            f = this._w(d),
            g = this.d,
            h = g.initialCountry,
            i = g.nationalMode,
            j = g.autoHideDialCode,
            k = g.separateDialCode;
          e && !f ? this._v(d) : "auto" !== h && (h ? this._z(h.toLowerCase()) : e && f ? this._z("us") : (this.j = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.p[0].iso2, d || this._z(this.j)), d || i || j || k || (this.a.value = "+".concat(this.s.dialCode))), d && this._u(d)
        }
      }, {
        key: "_i",
        value: function () {
          this._j(), this.d.autoHideDialCode && this._l(), this.d.allowDropdown && this._i2(), this.hiddenInput && this._i0()
        }
      }, {
        key: "_i0",
        value: function () {
          var a = this;
          this._a14 = function () {
            a.hiddenInput.value = a.getNumber()
          }, this.a.form && this.a.form.addEventListener("submit", this._a14)
        }
      }, {
        key: "_i1",
        value: function () {
          for (var a = this.a; a && "LABEL" !== a.tagName;) a = a.parentNode;
          return a
        }
      }, {
        key: "_i2",
        value: function () {
          var a = this;
          this._a9 = function (b) {
            a.m.classList.contains("iti__hide") ? a.a.focus() : b.preventDefault()
          };
          var b = this._i1();
          b && b.addEventListener("click", this._a9), this._a10 = function () {
            !a.m.classList.contains("iti__hide") || a.a.disabled || a.a.readOnly || a._n()
          }, this.selectedFlag.addEventListener("click", this._a10), this._a11 = function (b) {
            a.m.classList.contains("iti__hide") && -1 !== ["ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter"].indexOf(b.key) && (b.preventDefault(), b.stopPropagation(), a._n()), "Tab" === b.key && a._2()
          }, this.k.addEventListener("keydown", this._a11)
        }
      }, {
        key: "_i3",
        value: function () {
          var a = this;
          this.d.utilsScript && !window.intlTelInputUtils ? window.intlTelInputGlobals.documentReady() ? window.intlTelInputGlobals.loadUtils(this.d.utilsScript) : window.addEventListener("load", function () {
            window.intlTelInputGlobals.loadUtils(a.d.utilsScript)
          }) : this.i0(), "auto" === this.d.initialCountry ? this._i4() : this.h()
        }
      }, {
        key: "_i4",
        value: function () {
          window.intlTelInputGlobals.autoCountry ? this.handleAutoCountry() : window.intlTelInputGlobals.startedLoadingAutoCountry || (window.intlTelInputGlobals.startedLoadingAutoCountry = !0, "function" == typeof this.d.geoIpLookup && this.d.geoIpLookup(function (a) {
            window.intlTelInputGlobals.autoCountry = a.toLowerCase(), setTimeout(function () {
              return n("handleAutoCountry")
            })
          }, function () {
            return n("rejectAutoCountryPromise")
          }))
        }
      }, {
        key: "_j",
        value: function () {
          var a = this;
          this._a12 = function () {
            a._v(a.a.value) && a._m2CountryChange()
          }, this.a.addEventListener("keyup", this._a12), this._a13 = function () {
            setTimeout(a._a12)
          }, this.a.addEventListener("cut", this._a13), this.a.addEventListener("paste", this._a13)
        }
      }, {
        key: "_j2",
        value: function (a) {
          var b = this.a.getAttribute("maxlength");
          return b && a.length > b ? a.substr(0, b) : a
        }
      }, {
        key: "_l",
        value: function () {
          var a = this;
          this._a8 = function () {
            a._l2()
          }, this.a.form && this.a.form.addEventListener("submit", this._a8), this.a.addEventListener("blur", this._a8)
        }
      }, {
        key: "_l2",
        value: function () {
          if ("+" === this.a.value.charAt(0)) {
            var a = this._m(this.a.value);
            a && this.s.dialCode !== a || (this.a.value = "")
          }
        }
      }, {
        key: "_m",
        value: function (a) {
          return a.replace(/\D/g, "")
        }
      }, {
        key: "_m2",
        value: function (a) {
          var b = document.createEvent("Event");
          b.initEvent(a, !0, !0), this.a.dispatchEvent(b)
        }
      }, {
        key: "_n",
        value: function () {
          this.m.classList.remove("iti__hide"), this.selectedFlag.setAttribute("aria-expanded", "true"), this._o(), this.b && (this._x(this.b, !1), this._3(this.b, !0)), this._p(), this.u.classList.add("iti__arrow--up"), this._m2("open:countrydropdown")
        }
      }, {
        key: "_n2",
        value: function (a, b, c) {
          c && !a.classList.contains(b) ? a.classList.add(b) : !c && a.classList.contains(b) && a.classList.remove(b)
        }
      }, {
        key: "_o",
        value: function () {
          var a = this;
          if (this.d.dropdownContainer && this.d.dropdownContainer.appendChild(this.dropdown), !this.g) {
            var b = this.a.getBoundingClientRect(),
              c = window.pageYOffset || document.documentElement.scrollTop,
              d = b.top + c,
              e = this.m.offsetHeight,
              f = d + this.a.offsetHeight + e < c + window.innerHeight,
              g = d - e > c;
            if (this._n2(this.m, "iti__country-list--dropup", !f && g), this.d.dropdownContainer) {
              var h = !f && g ? 0 : this.a.offsetHeight;
              this.dropdown.style.top = "".concat(d + h, "px"), this.dropdown.style.left = "".concat(b.left + document.body.scrollLeft, "px"), this._a4 = function () {
                return a._2()
              }, window.addEventListener("scroll", this._a4)
            }
          }
        }
      }, {
        key: "_o2",
        value: function (a) {
          for (var b = a; b && b !== this.m && !b.classList.contains("iti__country");) b = b.parentNode;
          return b === this.m ? null : b
        }
      }, {
        key: "_p",
        value: function () {
          var a = this;
          this._a0 = function (b) {
            var c = a._o2(b.target);
            c && a._x(c, !1)
          }, this.m.addEventListener("mouseover", this._a0), this._a1 = function (b) {
            var c = a._o2(b.target);
            c && a._1(c)
          }, this.m.addEventListener("click", this._a1);
          var b = !0;
          this._a2 = function () {
            b || a._2(), b = !1
          }, document.documentElement.addEventListener("click", this._a2);
          var c = "",
            d = null;
          this._a3 = function (b) {
            b.preventDefault(), "ArrowUp" === b.key || "Up" === b.key || "ArrowDown" === b.key || "Down" === b.key ? a._q(b.key) : "Enter" === b.key ? a._r() : "Escape" === b.key ? a._2() : /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(b.key) && (d && clearTimeout(d), c += b.key.toLowerCase(), a._s(c), d = setTimeout(function () {
              c = ""
            }, 1e3))
          }, document.addEventListener("keydown", this._a3)
        }
      }, {
        key: "_q",
        value: function (a) {
          var b = "ArrowUp" === a || "Up" === a ? this.c.previousElementSibling : this.c.nextElementSibling;
          b && (b.classList.contains("iti__divider") && (b = "ArrowUp" === a || "Up" === a ? b.previousElementSibling : b.nextElementSibling), this._x(b, !0))
        }
      }, {
        key: "_r",
        value: function () {
          this.c && this._1(this.c)
        }
      }, {
        key: "_s",
        value: function (a) {
          for (var b = 0; b < this.p.length; b++)
            if (this._t(this.p[b].name, a)) {
              var c = this.m.querySelector("#iti-".concat(this.id, "__item-").concat(this.p[b].iso2));
              this._x(c, !1), this._3(c, !0);
              break
            }
        }
      }, {
        key: "_t",
        value: function (a, b) {
          return a.substr(0, b.length).toLowerCase() === b
        }
      }, {
        key: "_u",
        value: function (a) {
          var b = a;
          if (this.d.formatOnDisplay && window.intlTelInputUtils && this.s) {
            var c = !this.d.separateDialCode && (this.d.nationalMode || "+" !== b.charAt(0)),
              d = intlTelInputUtils.numberFormat,
              e = d.NATIONAL,
              f = d.INTERNATIONAL,
              g = c ? e : f;
            b = intlTelInputUtils.formatNumber(b, this.s.iso2, g)
          }
          b = this._7(b), this.a.value = b
        }
      }, {
        key: "_v",
        value: function (a) {
          var b = a,
            c = this.s.dialCode,
            d = "1" === c;
          b && this.d.nationalMode && d && "+" !== b.charAt(0) && ("1" !== b.charAt(0) && (b = "1".concat(b)), b = "+".concat(b)), this.d.separateDialCode && c && "+" !== b.charAt(0) && (b = "+".concat(c).concat(b));
          var e = this._5(b, !0),
            f = this._m(b),
            g = null;
          if (e) {
            var h = this.q[this._m(e)],
              i = -1 !== h.indexOf(this.s.iso2) && f.length <= e.length - 1;
            if (!("1" === c && this._w(f)) && !i)
              for (var j = 0; j < h.length; j++)
                if (h[j]) {
                  g = h[j];
                  break
                }
          } else "+" === b.charAt(0) && f.length ? g = "" : b && "+" !== b || (g = this.j);
          return null !== g && this._z(g)
        }
      }, {
        key: "_w",
        value: function (a) {
          var b = this._m(a);
          if ("1" === b.charAt(0)) {
            var c = b.substr(1, 3);
            return -1 !== l.indexOf(c)
          }
          return !1
        }
      }, {
        key: "_x",
        value: function (a, b) {
          var c = this.c;
          c && c.classList.remove("iti__highlight"), this.c = a, this.c.classList.add("iti__highlight"), b && this.c.focus()
        }
      }, {
        key: "_y",
        value: function (a, b, c) {
          for (var d = b ? f : this.p, e = 0; e < d.length; e++)
            if (d[e].iso2 === a) return d[e];
          if (c) return null;
          throw new Error("No country data for '".concat(a, "'"))
        }
      }, {
        key: "_z",
        value: function (a) {
          var b = this.s.iso2 ? this.s : {};
          this.s = a ? this._y(a, !1, !1) : {}, this.s.iso2 && (this.j = this.s.iso2), this.l.setAttribute("class", "iti__flag iti__".concat(a));
          var c = a ? "".concat(this.s.name, ": +").concat(this.s.dialCode) : "Unknown";
          if (this.selectedFlag.setAttribute("title", c), this.d.separateDialCode) {
            var d = this.s.dialCode ? "+".concat(this.s.dialCode) : "";
            this.t.innerHTML = d;
            var e = this.selectedFlag.offsetWidth || this._z2();
            this.a.style.paddingLeft = "".concat(e + 6, "px")
          }
          if (this._0(), this.d.allowDropdown) {
            var f = this.b;
            if (f && (f.classList.remove("iti__active"), f.setAttribute("aria-selected", "false")), a) {
              var g = this.m.querySelector("#iti-".concat(this.id, "__item-").concat(a, "-preferred")) || this.m.querySelector("#iti-".concat(this.id, "__item-").concat(a));
              g.setAttribute("aria-selected", "true"), g.classList.add("iti__active"), this.b = g, this.selectedFlag.setAttribute("aria-activedescendant", g.getAttribute("id"))
            }
          }
          return b.iso2 !== a
        }
      }, {
        key: "_z2",
        value: function () {
          var a = this.a.parentNode.cloneNode();
          a.style.visibility = "hidden", document.body.appendChild(a);
          var b = this.k.cloneNode();
          a.appendChild(b);
          var c = this.selectedFlag.cloneNode(!0);
          b.appendChild(c);
          var d = c.offsetWidth;
          return a.parentNode.removeChild(a), d
        }
      }, {
        key: "_0",
        value: function () {
          var a = "aggressive" === this.d.autoPlaceholder || !this.e && "polite" === this.d.autoPlaceholder;
          if (window.intlTelInputUtils && a) {
            var b = intlTelInputUtils.numberType[this.d.placeholderNumberType],
              c = this.s.iso2 ? intlTelInputUtils.getExampleNumber(this.s.iso2, this.d.nationalMode, b) : "";
            c = this._7(c), "function" == typeof this.d.customPlaceholder && (c = this.d.customPlaceholder(c, this.s)), this.a.setAttribute("placeholder", c)
          }
        }
      }, {
        key: "_1",
        value: function (a) {
          var b = this._z(a.getAttribute("data-country-code"));
          this._2(), this._4(a.getAttribute("data-dial-code"), !0), this.a.focus();
          var c = this.a.value.length;
          this.a.setSelectionRange(c, c), b && this._m2CountryChange()
        }
      }, {
        key: "_2",
        value: function () {
          this.m.classList.add("iti__hide"), this.selectedFlag.setAttribute("aria-expanded", "false"), this.u.classList.remove("iti__arrow--up"), document.removeEventListener("keydown", this._a3), document.documentElement.removeEventListener("click", this._a2), this.m.removeEventListener("mouseover", this._a0), this.m.removeEventListener("click", this._a1), this.d.dropdownContainer && (this.g || window.removeEventListener("scroll", this._a4), this.dropdown.parentNode && this.dropdown.parentNode.removeChild(this.dropdown)), this._m2("close:countrydropdown")
        }
      }, {
        key: "_3",
        value: function (a, b) {
          var c = this.m,
            d = window.pageYOffset || document.documentElement.scrollTop,
            e = c.offsetHeight,
            f = c.getBoundingClientRect().top + d,
            g = f + e,
            h = a.offsetHeight,
            i = a.getBoundingClientRect().top + d,
            j = i + h,
            k = i - f + c.scrollTop,
            l = e / 2 - h / 2;
          if (i < f) b && (k -= l), c.scrollTop = k;
          else if (j > g) {
            b && (k += l);
            var m = e - h;
            c.scrollTop = k - m
          }
        }
      }, {
        key: "_4",
        value: function (a, b) {
          var c, d = this.a.value,
            e = "+".concat(a);
          if ("+" === d.charAt(0)) {
            var f = this._5(d);
            c = f ? d.replace(f, e) : e
          } else {
            if (this.d.nationalMode || this.d.separateDialCode) return;
            if (d) c = e + d;
            else {
              if (!b && this.d.autoHideDialCode) return;
              c = e
            }
          }
          this.a.value = c
        }
      }, {
        key: "_5",
        value: function (a, b) {
          var c = "";
          if ("+" === a.charAt(0))
            for (var d = "", e = 0; e < a.length; e++) {
              var f = a.charAt(e);
              if (!isNaN(parseInt(f, 10))) {
                if (d += f, b) this.q[d] && (c = a.substr(0, e + 1));
                else if (this.dialCodes[d]) {
                  c = a.substr(0, e + 1);
                  break
                }
                if (d.length === this.countryCodeMaxLen) break
              }
            }
          return c
        }
      }, {
        key: "_6",
        value: function () {
          var a = this.a.value.trim(),
            b = this.s.dialCode,
            c = this._m(a);
          return (this.d.separateDialCode && "+" !== a.charAt(0) && b && c ? "+".concat(b) : "") + a
        }
      }, {
        key: "_7",
        value: function (a) {
          var b = a;
          if (this.d.separateDialCode) {
            var c = this._5(b);
            if (c) {
              c = "+".concat(this.s.dialCode);
              var d = " " === b[c.length] || "-" === b[c.length] ? c.length + 1 : c.length;
              b = b.substr(d)
            }
          }
          return this._j2(b)
        }
      }, {
        key: "_m2CountryChange",
        value: function () {
          this._m2("countrychange")
        }
      }, {
        key: "handleAutoCountry",
        value: function () {
          "auto" === this.d.initialCountry && (this.j = window.intlTelInputGlobals.autoCountry, this.a.value || this.setCountry(this.j), this.h())
        }
      }, {
        key: "handleUtils",
        value: function () {
          window.intlTelInputUtils && (this.a.value && this._u(this.a.value), this._0()), this.i0()
        }
      }, {
        key: "destroy",
        value: function () {
          var a = this.a.form;
          if (this.d.allowDropdown) {
            this._2(), this.selectedFlag.removeEventListener("click", this._a10), this.k.removeEventListener("keydown", this._a11);
            var b = this._i1();
            b && b.removeEventListener("click", this._a9)
          }
          this.hiddenInput && a && a.removeEventListener("submit", this._a14), this.d.autoHideDialCode && (a && a.removeEventListener("submit", this._a8), this.a.removeEventListener("blur", this._a8)), this.a.removeEventListener("keyup", this._a12), this.a.removeEventListener("cut", this._a13), this.a.removeEventListener("paste", this._a13), this.a.removeAttribute("data-intl-tel-input-id");
          var c = this.a.parentNode;
          c.parentNode.insertBefore(this.a, c), c.parentNode.removeChild(c), delete window.intlTelInputGlobals.instances[this.id]
        }
      }, {
        key: "getExtension",
        value: function () {
          return window.intlTelInputUtils ? intlTelInputUtils.getExtension(this._6(), this.s.iso2) : ""
        }
      }, {
        key: "getNumber",
        value: function (a) {
          if (window.intlTelInputUtils) {
            var b = this.s.iso2;
            return intlTelInputUtils.formatNumber(this._6(), b, a)
          }
          return ""
        }
      }, {
        key: "getNumberType",
        value: function () {
          return window.intlTelInputUtils ? intlTelInputUtils.getNumberType(this._6(), this.s.iso2) : -99
        }
      }, {
        key: "getSelectedCountryData",
        value: function () {
          return this.s
        }
      }, {
        key: "getValidationError",
        value: function () {
          if (window.intlTelInputUtils) {
            var a = this.s.iso2;
            return intlTelInputUtils.getValidationError(this._6(), a)
          }
          return -99
        }
      }, {
        key: "isValidNumber",
        value: function () {
          var a = this._6().trim(),
            b = this.d.nationalMode ? this.s.iso2 : "";
          return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(a, b) : null
        }
      }, {
        key: "setCountry",
        value: function (a) {
          var b = a.toLowerCase();
          this.l.classList.contains("iti__".concat(b)) || (this._z(b), this._4(this.s.dialCode, !1), this._m2CountryChange())
        }
      }, {
        key: "setNumber",
        value: function (a) {
          var b = this._v(a);
          this._u(a), b && this._m2CountryChange()
        }
      }, {
        key: "setPlaceholderNumberType",
        value: function (a) {
          this.d.placeholderNumberType = a, this._0()
        }
      }]), a
    }();
  i.getCountryData = function () {
    return f
  };
  var p = function (a, b, c) {
    var d = document.createElement("script");
    d.onload = function () {
      n("handleUtils"), b && b()
    }, d.onerror = function () {
      n("rejectUtilsScriptPromise"), c && c()
    }, d.className = "iti-load-utils", d.async = !0, d.src = a, document.body.appendChild(d)
  };
  i.loadUtils = function (a) {
    if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
      if (window.intlTelInputGlobals.startedLoadingUtilsScript = !0, "undefined" != typeof Promise) return new Promise(function (b, c) {
        return p(a, b, c)
      });
      p(a)
    }
    return null
  }, i.defaults = k, i.version = "17.0.13";
  a.fn.intlTelInput = function (c) {
    var d = arguments;
    if (c === b || "object" == typeof c) return this.each(function () {
      if (!a.data(this, "plugin_intlTelInput")) {
        var b = new o(this, c);
        b._init(), window.intlTelInputGlobals.instances[b.id] = b, a.data(this, "plugin_intlTelInput", b)
      }
    });
    if ("string" == typeof c && "_" !== c[0]) {
      var e;
      return this.each(function () {
        var b = a.data(this, "plugin_intlTelInput");
        b instanceof o && "function" == typeof b[c] && (e = b[c].apply(b, Array.prototype.slice.call(d, 1))), "destroy" === c && a.data(this, "plugin_intlTelInput", null)
      }), e !== b ? e : this
    }
  }
});


$(document).ready(function () {

  $("input[type=tel],input.phone").mask("99 999-99-99");
  var input = $("input[type=tel],input.phone").intlTelInput({
    autoPlaceholder: "aggressive",
    geoIpLookup: function (success, failure) {
      $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
        var countryCode = (resp && resp.country) ? resp.country : "us";
        success(countryCode);
      });
    },
    initialCountry: "ua",
    preferredCountries: ["ua", "ru", "by", "pl", "it", "gb", "us", "il", "ca", "fr", "ge", "ae"],
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.min.js",
    separateDialCode: true,
    nationalMode: false
  });
  $("input[type=tel],input.phone").on("close:countrydropdown", function (e, countryData) {
    $(this).val('');
    $(this).mask($(this).attr('placeholder').replace(/[0-9]/g, "9"));
    var kode = $(this).parents("form").find(".iti__selected-dial-code").text();
    $(this).parents("form").find(".data_kod").attr("value", kode);
  });



  $(".fancy").fancybox();
  $('.scrollbar-dynamic').scrollbar();
  $('.scrollb').scrollbar();

  $("select, input[type=checkbox]").styler();

  $('.m_1_slick').slick({
    arrows: false, // Стрелки
    slidesToShow: 1, // Количество слайдов, которые показываются сразу
    focusOnSelect: true, // Фокус на елемент при клике
    autoplay: true, // Автоматическое переключение
    autoplaySpeed: 3000, // Время на показ слайда до переключения на следующий
    dots: false, // Точки
    fade: true, // Эффект затухания вместо перелистывания
    infinite: true, // Бесконечность слайдов
    initialSlide: 0, // Номер с которого откроется слайдер
    pauseOnHover: true, // Пауза при наведении на слайдер
    pauseOnDotsHover: false, // Пауза при наведение на точки
    rows: 1, // Количество строк
    cssEase: "easy", // Вид анимации, для непрерывного слайдера linear  
    responsive: [{
        breakpoint: 992,
        settings: {

        }
      },
      {
        breakpoint: 600,
        settings: {

        }
      },
    ]
  });
  /*Методы слика для стрелок*/
  $(".m_1 .slick-next").on("click", function () {
    $(".m_1_slick").slick("slickNext");

  });
  $(".m_1 .slick-prev").on("click", function () {
    $(".m_1_slick").slick("slickPrev");
  });
  $('.m_1_slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    nowSlide = slick.currentSlide + 1;
    allSlides = slick.slideCount;

  });

  if ($(this).scrollTop() > 50) {
    $("header").addClass('fixed');
  }
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("header").addClass('fixed');
    } else {
      $("header").removeClass('fixed');
    }
  });

  $("li.menu-item-has-children").append("<p class='menu_arrow'></p>");

  if ($(window).width() < 1100) {
    $(".header_menu").on("click", ".menu_arrow", function () {
      if ($(this).parent("li.menu-item-has-children").hasClass("active")) {
        $(this).parent("li.menu-item-has-children").removeClass("active");
      } else {
        $(this).parent("li.menu-item-has-children").addClass("active");
      }
    });
    $(".header_menu").children(".nav_main").children(".menu-item").children("a").on("click", function () {
      if ($(this).parent("li").hasClass('menu-item-has-children')) {
        if ($(this).parent("li.menu-item-has-children").hasClass('active')) {
          $(this).parent("li.menu-item-has-children").removeClass("active");
        } else {
          $(".header_menu li.menu-item-has-children").removeClass("active");
          $(this).parent("li.menu-item-has-children").addClass("active");
        }
        return false;
      }
    });
  }


  /*Мобильный гамбургер*/
  $(".hamburger").click(function () {
    $(".hamburger").toggleClass('is-active');
    $(".mobile_nav").toggleClass('active');
    $("header").toggleClass('active');
  });
  $(".main_menu ul li a").click(function () {
    $(".hamburger").removeClass('is-active');
    $(".mobile_nav").removeClass('active');
    $("header").removeClass('active');
  });

  var lazyLoadInstance = new LazyLoad({
    elements_selector: " .lazy "
    // ... больше пользовательских настроек? 
  });




  /*if($(window).width() > 600) {
     $('.m_2_slick').slick({
      arrows: true,                    // Стрелки
      slidesToShow: 4,                  // Количество слайдов, которые показываются сразу
      focusOnSelect: true,              // Фокус на елемент при клике
      autoplay: false,                   // Автоматическое переключение
      autoplaySpeed: 3000,              // Время на показ слайда до переключения на следующий
      dots: false,                      // Точки
      fade: false,                      // Эффект затухания вместо перелистывания
      infinite: false,                   // Бесконечность слайдов
      initialSlide: 0,                  // Номер с которого откроется слайдер
      pauseOnHover: true,               // Пауза при наведении на слайдер
      pauseOnDotsHover: false,          // Пауза при наведение на точки
      rows: 1,                          // Количество строк
      responsive: [                     
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        }
      },
      ]
    });
  }*/


  $(".remodal-close").click(function () {
    var active_attr = $(this).siblings(".remodal_viddeo_wrapper").children("iframe").attr("src");
    $(this).siblings(".remodal_viddeo_wrapper").children("iframe").attr("src", active_attr);
  });
  $(".remodal-wrapper").mouseup(function (e) {
    var active_attr = $(this).children(".remodal_video ").children(".remodal_viddeo_wrapper").children("iframe").attr("src");
    var div = $(".remodal_video"); // тут указываем ID элемента
    if (!div.is(e.target) &&
      div.has(e.target).length === 0) {
      $(this).children(".remodal_video ").children(".remodal_viddeo_wrapper").children("iframe").attr("src", active_attr);
    }
  });



  if ($(window).width() > 600) {
    $('.m_4_slick').slick({
      arrows: true, // Стрелки
      slidesToShow: 4, // Количество слайдов, которые показываются сразу
      focusOnSelect: true, // Фокус на елемент при клике
      autoplay: false, // Автоматическое переключение
      autoplaySpeed: 3000, // Время на показ слайда до переключения на следующий
      dots: false, // Точки
      fade: false, // Эффект затухания вместо перелистывания
      infinite: false, // Бесконечность слайдов
      initialSlide: 0, // Номер с которого откроется слайдер
      pauseOnHover: true, // Пауза при наведении на слайдер
      pauseOnDotsHover: false, // Пауза при наведение на точки
      responsive: [{
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });
  }

  if ($(window).width() > 600) {
    $('.m_5_slick').slick({
      arrows: true, // Стрелки
      slidesToShow: 3, // Количество слайдов, которые показываются сразу
      focusOnSelect: true, // Фокус на елемент при клике
      autoplay: false, // Автоматическое переключение
      autoplaySpeed: 3000, // Время на показ слайда до переключения на следующий
      dots: false, // Точки
      fade: false, // Эффект затухания вместо перелистывания
      infinite: false,
      adaptiveHeight: true, // Бесконечность слайдов
      initialSlide: 0, // Номер с которого откроется слайдер
      pauseOnHover: true, // Пауза при наведении на слайдер
      pauseOnDotsHover: false, // Пауза при наведение на точки
      responsive: [{
          breakpoint: 1100,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });
  }

  if ($(window).width() > 600) {
    $('.m_5_slick_sidebar').slick({
      arrows: true, // Стрелки
      slidesToShow: 1, // Количество слайдов, которые показываются сразу
      focusOnSelect: true, // Фокус на елемент при клике
      autoplay: false, // Автоматическое переключение
      autoplaySpeed: 3000, // Время на показ слайда до переключения на следующий
      dots: false, // Точки
      fade: false, // Эффект затухания вместо перелистывания
      infinite: false, // Бесконечность слайдов
      initialSlide: 0, // Номер с которого откроется слайдер
      pauseOnHover: true, // Пауза при наведении на слайдер
      pauseOnDotsHover: false, // Пауза при наведение на точки
    });
  }

  if ($(window).width() > 600) {
    $('.m_7_slick').slick({
      arrows: true, // Стрелки
      slidesToShow: 2, // Количество слайдов, которые показываются сразу
      focusOnSelect: true, // Фокус на елемент при клике
      autoplay: false, // Автоматическое переключение
      autoplaySpeed: 3000, // Время на показ слайда до переключения на следующий
      dots: false, // Точки
      fade: false, // Эффект затухания вместо перелистывания
      infinite: false, // Бесконечность слайдов
      initialSlide: 0, // Номер с которого откроется слайдер
      pauseOnHover: true, // Пауза при наведении на слайдер
      pauseOnDotsHover: false, // Пауза при наведение на точки
      responsive: [{
          breakpoint: 1100,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });
  }

  if ($(window).width() > 600) {
    $('.b_2_galery_slick').slick({
      arrows: true, // Стрелки
      slidesToShow: 1, // Количество слайдов, которые показываются сразу
      focusOnSelect: true, // Фокус на елемент при клике
      autoplay: false, // Автоматическое переключение
      autoplaySpeed: 3000, // Время на показ слайда до переключения на следующий
      dots: false, // Точки
      fade: false, // Эффект затухания вместо перелистывания
      infinite: false, // Бесконечность слайдов
      initialSlide: 0, // Номер с которого откроется слайдер
      pauseOnHover: true, // Пауза при наведении на слайдер
      pauseOnDotsHover: false, // Пауза при наведение на точки
    });
  }

  if ($(window).width() > 600) {
    $('.pr_2_slick').slick({
      arrows: true, // Стрелки
      slidesToShow: 4, // Количество слайдов, которые показываются сразу
      focusOnSelect: true, // Фокус на елемент при клике
      autoplay: false, // Автоматическое переключение
      autoplaySpeed: 3000, // Время на показ слайда до переключения на следующий
      dots: false, // Точки
      fade: false, // Эффект затухания вместо перелистывания
      infinite: false, // Бесконечность слайдов
      initialSlide: 0, // Номер с которого откроется слайдер
      pauseOnHover: true, // Пауза при наведении на слайдер
      pauseOnDotsHover: false, // Пауза при наведение на точки
      responsive: [{
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });
  }






  /*   if($(window).width() < 992) {
       $('.prepods_1_slider_mob .predods_1_wrapper').slick({
        arrows: true,                    // Стрелки
        slidesToShow: 4,                  // Количество слайдов, которые показываются сразу
        focusOnSelect: true,              // Фокус на елемент при клике
        autoplay: false,                   // Автоматическое переключение
        autoplaySpeed: 3000,              // Время на показ слайда до переключения на следующий
        dots: false,                      // Точки
        fade: false,                      // Эффект затухания вместо перелистывания
        infinite: true,                   // Бесконечность слайдов
        initialSlide: 0,                  // Номер с которого откроется слайдер
        pauseOnHover: true,               // Пауза при наведении на слайдер
        pauseOnDotsHover: false,          // Пауза при наведение на точки
        responsive: [                     
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          }
        },
        ]
      });
     }*/


  if ($(window).width() < 992 && $(window).width() > 600) {
    $('.prepods_1_slick .predods_1_wrapper').slick({
      arrows: true, // Стрелки
      slidesToShow: 4, // Количество слайдов, которые показываются сразу
      focusOnSelect: true, // Фокус на елемент при клике
      autoplay: false, // Автоматическое переключение
      autoplaySpeed: 3000, // Время на показ слайда до переключения на следующий
      dots: false, // Точки
      fade: false, // Эффект затухания вместо перелистывания
      infinite: false, // Бесконечность слайдов
      initialSlide: 0, // Номер с которого откроется слайдер
      pauseOnHover: true, // Пауза при наведении на слайдер
      pauseOnDotsHover: false, // Пауза при наведение на точки
      responsive: [{
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });
  }

  $(".remodal_oplata_top_or_no").on("click", "label", function () {
    if ($(this).find("input").is(':checked')) {
      var price = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok").data("price-top");
      var price_abon = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_abonement").data("price-top");
    } else {
      var price = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok").data("price");
      var price_abon = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_abonement").data("price");
    }

    var data_6_ot_4 = $(this).parents(".remodal_oplata").find(".remodal_oplata_6paket_ot_4_zanytiy").data("ok");
    count_product = $(this).parents(".remodal_oplata").find(".count_for_way_for_pay").val();
    var count_product = count_product.trim(count_product);
    if (data_6_ot_4 == 1 && count_product > 3) {
      var price = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok").data("price-top");
    }

    var data_ok = $(this).parents(".remodal_oplata").find(".remodal_oplata_minus_10").data("ok");
    var adres = $(this).parents(".remodal_oplata").find(".form_for_sbor_dannix_na_oplaty select").val();
    adres = Number(adres);
    if (adres == 3 && data_ok != 1) {
      price = price * 0.9;
      price = price.toFixed();
      console.log(price);
      price_abon = price_abon * 0.9;
      price_abon = price_abon.toFixed();
      console.log(price_abon);
    }


    $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok p strong").text(price);
    $(this).parents(".remodal_oplata").find(".remodal_oplata_price_abonement p strong").text(price_abon);
  });


  $(".adres_for_way_for_pay  select").on("change", function () {
    if ($(this).parents(".remodal_oplata").find(".remodal_oplata_top_or_no").find("input").is(':checked')) {
      var price = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok").data("price-top");
      var price_abon = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_abonement").data("price-top");
    } else {
      var price = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok").data("price");
      var price_abon = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_abonement").data("price");
    }

    var data_6_ot_4 = $(this).parents(".remodal_oplata").find(".remodal_oplata_6paket_ot_4_zanytiy").data("ok");
    count_product = $(this).parents(".remodal_oplata").find(".count_for_way_for_pay").val();
    var count_product = count_product.trim(count_product);
    if (data_6_ot_4 == 1 && count_product > 3) {
      var price = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok").data("price-top");
    }

    var data_ok = $(this).parents(".remodal_oplata").find(".remodal_oplata_minus_10").data("ok");
    var adres = $(this).parents(".remodal_oplata").find(".form_for_sbor_dannix_na_oplaty select").val();
    adres = Number(adres);
    if (adres == 3 && data_ok != 1) {
      price = price * 0.9;
      price = price.toFixed();
      console.log(price);
      price_abon = price_abon * 0.9;
      price_abon = price_abon.toFixed();
      console.log(price_abon);
    }

    $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok p strong").text(price);
    $(this).parents(".remodal_oplata").find(".remodal_oplata_price_abonement p strong").text(price_abon);
  });


  /*Только для 6 играет роль изменение количества*/
  $(".count_for_way_for_pay ").on("input", function () {
    var data_6_ot_4 = $(this).parents(".remodal_oplata").find(".remodal_oplata_6paket_ot_4_zanytiy").data("ok");
    if (data_6_ot_4 == 1) {
      if ($(this).parents(".remodal_oplata").find(".remodal_oplata_top_or_no").find("input").is(':checked')) {
        var price = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok").data("price-top");
        var price_abon = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_abonement").data("price-top");
      } else {
        var price = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok").data("price");
        var price_abon = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_abonement").data("price");
      }

      count_product = $(this).parents(".remodal_oplata").find(".count_for_way_for_pay").val();
      var count_product = count_product.trim(count_product);
      if (data_6_ot_4 == 1 && count_product > 3) {
        var price = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok").data("price-top");
      }

      var data_ok = $(this).parents(".remodal_oplata").find(".remodal_oplata_minus_10").data("ok");
      var adres = $(this).parents(".remodal_oplata").find(".form_for_sbor_dannix_na_oplaty select").val();
      adres = Number(adres);
      if (adres == 3 && data_ok != 1) {
        price = price * 0.9;
        price = price.toFixed();
        price_abon = price_abon * 0.9;
        price_abon = price_abon.toFixed();
      }

      $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok p strong").text(price);
      $(this).parents(".remodal_oplata").find(".remodal_oplata_price_abonement p strong").text(price_abon);
    }
  });
  /*Только для 6 играет роль изменение количества*/





  $(".button_for_send_way_for_pay").on("click", function () {
    var name_student = $(this).parents(".remodal_oplata").find(".remodal_oplata_fio input").val();
    if (name_student == "" || name_student.length <= 3) {
      $(this).parents(".remodal_oplata").find(".remodal_oplata_fio input").addClass("error_input");
    } else {
      $(this).parents(".remodal_oplata").find(".remodal_oplata_fio input").removeClass("error_input");
      var name_student = name_student.trim(name_student);

      var adres = $(this).parents(".remodal_oplata").find(".form_for_sbor_dannix_na_oplaty select").val();
      adres = Number(adres);

      name_product = $(this).parents(".remodal_oplata").find(".remodal_oplata_name p").text();
      var name_product = name_product.trim(name_product);


      if ($(this).parents(".remodal_oplata").find(".remodal_oplata_top_or_no input").is(':checked')) {
        var price_product = $(this).parents(".remodal_oplata").find(".remodal_price_for_data").data("price-top");
        name_product = name_product + " (топ преподователь) ";
      } else {
        var price_product = $(this).parents(".remodal_oplata").find(".remodal_price_for_data").data("price");
      }
      console.log(price_product);


      count_product = $(this).parents(".remodal_oplata").find(".count_for_way_for_pay").val();
      var count_product = count_product.trim(count_product);

      var lang = $(this).parents(".remodal_oplata").find(".form_for_sbor_dannix_na_oplaty").data("lang");

      console.log(name_student);

      var data_6_ot_4 = $(this).parents(".remodal_oplata").find(".remodal_oplata_6paket_ot_4_zanytiy").data("ok");
      if (data_6_ot_4 == 1 && count_product > 3) {
        price_product = $(this).parents(".remodal_oplata").find(".remodal_oplata_price_urok").data("price-top");
      }

      var data_ok = $(this).parents(".remodal_oplata").find(".remodal_oplata_minus_10").data("ok");
      if (adres == 3 && data_ok != 1) {
        price_product = price_product * 0.9;
        price_product = price_product.toFixed();
        name_product = name_product + " (онлайн) ";

      }
      if (adres == 2 || adres == 3) {
        schet_people = "uriy";
      } else {
        schet_people = "dmitriy";
      }
      var data = {
        type: "POST",
        action: 'my_action',
        name_product: name_product,
        price_product: price_product,
        count_product: count_product,
        schet_people: schet_people,
        name_student: name_student,
        lang: lang,
      };
      jQuery.post(myajax.url, data, function (result) {
        if (result === "") {
          $(".form_send_way_for_pay_wrapper").html("результата нет");
        } else {
          $(".form_send_way_for_pay_wrapper").html(result);
          console.log("ajax отработал");


          /*Отправка запроса на вайфорпей*/
          $("body").find(".js_click_oplata_uriy").trigger('click');
          console.log("клик отработал");

        }
      });
    }
    return false;
  });




  $(".js-price-but-open").on("click", function () {
    $(this).parents(".pr_2_buts_more").addClass('active');
    $(".pr_2_slick").addClass('active');
    return false;
  });
  $(".js-price-but-hidden").on("click", function () {
    $(this).parents(".pr_2_buts_more").removeClass('active');
    $(".pr_2_slick").removeClass('active');
    return false;
  });



  $(".js-predmet-but-open").on("click", function () {
    $(this).parents(".pr_2_buts_more").addClass('active');
    $(".m_2_slick").addClass('active');
    return false;
  });
  $(".js-predmet-but-hidden").on("click", function () {
    $(this).parents(".pr_2_buts_more").removeClass('active');
    $(".m_2_slick").removeClass('active');
    return false;
  });


  $(".js-prepod-but-open").on("click", function () {
    $(this).parents(".pr_2_buts_more").addClass('active');
    $(".m_4_slick").addClass('active');
    return false;
  });
  $(".js-prepod-but-hidden").on("click", function () {
    $(this).parents(".pr_2_buts_more").removeClass('active');
    $(".m_4_slick").removeClass('active');
    return false;
  });


  $(".js-testemon-but-open").on("click", function () {
    $(this).parents(".pr_2_buts_more").addClass('active');
    $(".m_5_slick").addClass('active');
    return false;
  });
  $(".js-testemon-but-hidden").on("click", function () {
    $(this).parents(".pr_2_buts_more").removeClass('active');
    $(".m_5_slick").removeClass('active');
    return false;
  });
  /*
  Маска для номера телефона

  $("#m_8_phone").mask("+38 (099) 999-99-99");
  */

  /*    
      Contact form 7 - успешная отправка

        $(document).ready(function(){ 
          $('.wpcf7').on( 'wpcf7mailsent ', function( event ) { 
            var inst = $('[data-remodal-id=remodal_thanks]').remodal(); // Обращаемся к всплывашке, чтобы открыть ответ меняем remodal_id на свой
                    inst.open();      
          });
        });*/

  /*
  	Плавный скрол

  	$("body a").click(function() {
        $("html, body").animate({
           scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
           duration: 500,
           easing: "swing"
        });
        return false;
  	});
  	*/

  /*
  Слик слайдер

  $('.s_4_slider_2').slick({
    arrows: false,                    // Стрелки
    asNavFor: ".s_4_slider_1",        // Связки 2 слайдеров для thumbnail
    slidesToShow: 3,                  // Количество слайдов, которые показываются сразу
    focusOnSelect: true,              // Фокус на елемент при клике
    autoplay: true,                   // Автоматическое переключение
    autoplaySpeed: 3000,              // Время на показ слайда до переключения на следующий
    dots: false,                      // Точки
    fade: false,                      // Эффект затухания вместо перелистывания
    infinite: true,                   // Бесконечность слайдов
    initialSlide: 0,                  // Номер с которого откроется слайдер
    pauseOnHover: true,               // Пауза при наведении на слайдер
    pauseOnDotsHover: false,          // Пауза при наведение на точки
    rows: 1,                          // Количество строк
    centerMod: true,                  // Центровать слайд
    centerPadding: '50px',            // Отсупы от центрального слайда
    draggable: true,                  // перелистывание слайдов, перетаскиванием слайда мышью
    speed: 300,                       // Скорость анимации перелистывания
    vertical: false,                  // Переключение на вертикальный тип слайдера
    cssEase: "easy",                  // Вид анимации, для непрерывного слайдера linear  
    responsive: [                     
      {
        breakpoint: 992,
          settings: {

        }
      },
      {
        breakpoint: 600,
          settings: {

        }
      },
    ]
  });
  */


  /*
	Валидация - отправка формы ajax

	$("form#idForm").validate({
        rules: {
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
        },
        messages: {
            name: {
                required: "Это поле обязательно для ввода",
            },
            email: {
                required: "Это поле обязательно для ввода",
                email: "Вы ввели некоректный email",
            },
        },
        submitHandler: function () {
            var formData2 =  $('form#idForm').serialize(); // Выбираем нашу форм, посылание на тег form
            $.ajax({
              url: '/wp-admin/admin-ajax.php', 
              type: 'POST',
              data: formData2 + '&action=my_form_action',  // У каждой формы свой action, который пишется после =
              success: function() {
                $("form#idForm input[type=text]").val(""); // Чистим формы после того как клиент отправил данные нам на почту
                var inst = $('[data-remodal-id=remodal_id]').remodal(); // Обращаемся к всплывашке, чтобы открыть ответ меняем remodal_id на свой
                  inst.open();                                               // remodal открытие
                },
              error: function() {
                alert('Error');
              }
            });
            return false;
        }
   });
   */

});