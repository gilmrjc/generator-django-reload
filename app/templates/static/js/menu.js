(function (document, window) {
  'use strict';
  
  var Menu = function (opts) {
    var nav,
      navToggle,
      htmlEl = document.documentElement,
      isMobile,
      navOpen;

    var Menu = function (opts) {
      
      var i;

      this.options = {
        open: function(){},
        close: function(){}
      };

      for (i in opts) {
        this.options[i] = opts[i];
      }
      
      if (document.getElementById('main-menu')) {
        this.wrapper = document.getElementById('main-menu');
      } else {
        throw new Error('The menu element doesn\'t exist');
      }

      this.nav = this.wrapper.getElementsByTagName('nav')[0];
      nav = this.nav;

      this._init(this);
    };

    Menu.prototype = {
      toggle: function () {
        if (!navOpen) {
          this.open();
        } else {
          this.close();
        }
      },

      open: function () {
        if (!navOpen) {
          nav.classList.remove('closed');
          nav.classList.add('opened');
          htmlEl.classList.add('js-menu-active');
          navToggle.classList.add('active');
          nav.style.position = 'relative';
          nav.setAttribute('aria-hidden', 'false');
          navOpen = true;
          this.options.open();
        }
      },

      close: function () {
        if (navOpen) {
          nav.classList.add('closed');
          nav.classList.remove('opened');
          htmlEl.classList.remove('js-menu-active');
          navToggle.classList.remove('active');
          nav.setAttribute('aria-hidden', 'true');

          nav.style.position = 'absolute';

          navOpen = false;
          this.options.close();
        }
      },

      resize: function () {
        if (window.getComputedStyle(navToggle, null).getPropertyValue('display') !== 'none') {
          
          isMobile = true;
          navToggle.setAttribute('aria-hidden', 'false');
          if ('closed' in nav.classList) {
            navToggle.setAttribute('aria-hidden', 'true');
            nav.style.position = 'absolute';
          }
        } else {
          isMobile = false;
          navToggle.setAttribute('aria-hidden', 'true');
          nav.setAttribute('aria-hidden', 'false');
          nav.style.position = 'relative';
        }
      },

      handleEvent: function (e) {
        var evt = e || window.event;

        switch (evt.type) {
        case 'touchstart':
          this._onTouchStart(evt);
          break;
        case 'touchmove':
          this._onTouchMove(evt);
          break;
        case 'touchend':
        case 'mouseup':
          this._onTouchEnd(evt);
          break;
        case 'click':
          this._preventDefault(evt);
          break;
        case 'keyup':
          this._onKeyUp(evt);
          break;
        case 'focus':
        case 'resize':
          this.resize(evt);
          break;
        }
      },

      _init: function () {

        this.nav.classList.add('closed');
        navOpen = false;

        this._createToggle();
        this.resize();

        window.addEventListener('resize', this, false);
        window.addEventListener('focus', this, false);
        document.body.addEventListener('touchmove', this, false);
        navToggle.addEventListener('touchstart', this, false);
        navToggle.addEventListener('touchend', this, false);
        navToggle.addEventListener('mouseup', this, false);
        navToggle.addEventListener('keyup', this, false);
        navToggle.addEventListener('click', this, false);
      },

      _createToggle: function () {
        if (document.getElementById('menu-toggle')) {
          var toggle = document.getElementById('menu-toggle');
        } else {
          throw new Error('There isn\'t a toggle button');
        }

        navToggle = toggle;
      },

      _preventDefault: function (e) {
        e.preventDefault();
        e.stopPropagation();
      },

      _onTouchStart: function (e) {
        this._preventDefault(e);
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.touchHasMoved = false;

        navToggle.removeEventListener('mouseup', this, false);
      },

      _onTouchMove: function (e) {
        if (Math.abs(e.touches[0].clientX - this.startX) > 10 || Math.abs(e.touches[0].clientY - this.startY > 0)) {
          this.touchHasMoved = true;
        }
      },
      
      _onTouchEnd: function (e) {
        this._preventDefault(e);
        if(!isMobile){
          return;
        }

        if (!this.touchHasMoved) {
          if (e.type === 'touchend') {
            this.toggle();
            return;
          } else {
            var evt = e || window.event;

            if (!(evt.which === 3 || evt.button === 2)) {
              this.toggle();
            }
          }
        }

        this.touchHasMoved = false;
      },

      _onKeyUp: function (e) {
        var evt = e || window.event;
        if (evt.keyCode === 13) {
          this.toggle();
        }
      }
    };

    return new Menu(opts);

  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Menu;
  } else {
    window.menu = Menu;
  }

}(document, window, 0));
