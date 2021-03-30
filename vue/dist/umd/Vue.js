(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 使用defineProperty重新定义属性
      this.walk(value);
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]); // Vue.util.defineReactive
        });
      }
    }]);

    return Observer;
  }(); // 监听当前变量的重要执行者


  function defineReactive(data, key, value) {
    // data可能是多层，递归调用，给每个对象添加get set
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        console.log('用户获取到值');
        return value;
      },
      set: function set(newValue) {
        console.log('用户设置了值', data, key, value);
        if (newValue === value) return;
        observe(newValue); // 如果用户将值改为对象继续监控

        value = newValue;
      }
    });
  }

  function observe(data) {
    // typeof null 也是object
    // 不是对象的判断
    if (_typeof(data) !== 'object' || data === null) {
      return;
    }

    return new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    var data = vm.$options.data; // call改变this指向

    vm._data = data = typeof data == 'function' ? data.call(vm) : data;
    observe(data);
  }

  function initMixin(Vue) {
    // 原型上不能使用箭头函数
    Vue.prototype._init = function (options) {
      var vm = this; // 用户可以通过实例访问Vue属性

      vm.$options = options; // 初始化状态（将数据做一个初始化的劫持 当我改变数据时，应该更新视图）
      // vue组件中状态 data props watch computed

      initState(vm); // 核心特性响应式原理
      // vue只是参考MVVM的框架 https://cn.vuejs.org/v2/guide/instance.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-Vue-%E5%AE%9E%E4%BE%8B
      // 数据变化视图更新，视图变化数据会受影响（MVVM）不能跳过数据去更新视图，$refs可以修改dom不是纯粹的mvvm
      // 
    };
  }

  function Vue(options) {
    this._init(options); // 入口方法，做初始化操作

  } // 写成插件,对原型扩展


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
