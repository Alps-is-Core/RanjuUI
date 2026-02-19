/* ============================================================
   RanjuUI — Interactive Component Logic
   Version: 1.0.0 | License: MIT | Author: alps
   ============================================================ */
(function () {
  'use strict';

  /* ----- Helpers ----- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function on(el, evt, sel, fn) {
    if (typeof sel === 'function') { fn = sel; sel = null; }
    el.addEventListener(evt, function (e) {
      if (!sel) return fn.call(el, e);
      var t = e.target.closest(sel);
      if (t && el.contains(t)) fn.call(t, e);
    });
  }
  function toggle(el, attr, forceOpen) {
    var open = forceOpen !== undefined ? forceOpen : el.getAttribute(attr) !== 'open';
    el.setAttribute(attr, open ? 'open' : 'closed');
    return open;
  }

  /* =====================
     THEME
     ===================== */
  var Ranju = window.Ranju = {};

  Ranju.theme = {
    current: function () {
      return document.documentElement.getAttribute('data-theme') || 'light';
    },
    set: function (t) {
      document.documentElement.setAttribute('data-theme', t);
      try { localStorage.setItem('ranju-theme', t); } catch (e) {}
    },
    toggle: function () {
      this.set(this.current() === 'dark' ? 'light' : 'dark');
    },
    init: function () {
      try {
        var saved = localStorage.getItem('ranju-theme');
        if (saved) { this.set(saved); return; }
      } catch (e) {}
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.set('dark');
      }
    }
  };

  /* =====================
     ACCORDION
     ===================== */
  function initAccordion() {
    on(document, 'click', '.accordion-trigger', function () {
      var item = this.closest('.accordion-item');
      if (!item) return;
      var accordion = item.closest('.accordion');
      var isOpen = item.getAttribute('data-state') === 'open';

      if (accordion && !accordion.hasAttribute('data-multiple')) {
        $$('.accordion-item', accordion).forEach(function (i) {
          i.setAttribute('data-state', 'closed');
        });
      }
      item.setAttribute('data-state', isOpen ? 'closed' : 'open');
    });
  }

  /* =====================
     ALERT DISMISS
     ===================== */
  function initAlert() {
    on(document, 'click', '.alert-close', function () {
      var alert = this.closest('.alert');
      if (alert) {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-4px)';
        alert.style.transition = 'opacity .2s, transform .2s';
        setTimeout(function () { alert.remove(); }, 200);
      }
    });
  }

  /* =====================
     COLLAPSIBLE
     ===================== */
  function initCollapsible() {
    on(document, 'click', '.collapsible-trigger', function () {
      var col = this.closest('.collapsible');
      if (col) toggle(col, 'data-state');
    });
  }

  /* =====================
     DIALOG / SHEET / DRAWER
     ===================== */
  function openDialog(id) {
    var overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.setAttribute('data-state', 'open');
    document.body.style.overflow = 'hidden';
    var sheet = overlay.nextElementSibling;
    if (sheet && (sheet.classList.contains('sheet') || sheet.classList.contains('drawer'))) {
      sheet.setAttribute('data-state', 'open');
    }
    var first = $('[autofocus], input, button:not(.dialog-close)', overlay);
    if (first) setTimeout(function () { first.focus(); }, 100);
  }

  function closeDialog(id) {
    var overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.setAttribute('data-state', 'closed');
    document.body.style.overflow = '';
    var sheet = overlay.nextElementSibling;
    if (sheet && (sheet.classList.contains('sheet') || sheet.classList.contains('drawer'))) {
      sheet.setAttribute('data-state', 'closed');
    }
  }

  Ranju.dialog = { open: openDialog, close: closeDialog };

  function initDialog() {
    on(document, 'click', '[data-dialog-open]', function (e) {
      e.preventDefault();
      openDialog(this.getAttribute('data-dialog-open'));
    });
    on(document, 'click', '[data-dialog-close]', function (e) {
      e.preventDefault();
      var overlay = this.closest('.dialog-overlay');
      if (overlay) closeDialog(overlay.id);
    });
    on(document, 'click', '.dialog-overlay', function (e) {
      if (e.target === this) closeDialog(this.id);
    });
    on(document, 'keydown', function (e) {
      if (e.key === 'Escape') {
        var open = $$('.dialog-overlay[data-state="open"]');
        if (open.length) closeDialog(open[open.length - 1].id);
        var cmd = $('.command-overlay[data-state="open"]');
        if (cmd) cmd.setAttribute('data-state', 'closed');
      }
    });
  }

  /* =====================
     DROPDOWN
     ===================== */
  function initDropdown() {
    on(document, 'click', '[data-dropdown-trigger]', function (e) {
      e.stopPropagation();
      var dd = this.closest('.dropdown');
      if (!dd) return;
      var isOpen = dd.getAttribute('data-state') === 'open';
      closeAllDropdowns();
      if (!isOpen) dd.setAttribute('data-state', 'open');
    });
    on(document, 'click', function () { closeAllDropdowns(); });
    on(document, 'click', '.dropdown-item', function () { closeAllDropdowns(); });
  }

  function closeAllDropdowns() {
    $$('.dropdown[data-state="open"]').forEach(function (d) {
      d.setAttribute('data-state', 'closed');
    });
  }

  /* =====================
     CONTEXT MENU
     ===================== */
  function initContextMenu() {
    on(document, 'contextmenu', '[data-context-menu]', function (e) {
      e.preventDefault();
      $$('.context-menu[data-state="open"]').forEach(function (m) {
        m.setAttribute('data-state', 'closed');
      });
      var id = this.getAttribute('data-context-menu');
      var menu = document.getElementById(id);
      if (!menu) return;
      menu.style.left = e.clientX + 'px';
      menu.style.top = e.clientY + 'px';
      menu.setAttribute('data-state', 'open');
    });
    on(document, 'click', function () {
      $$('.context-menu[data-state="open"]').forEach(function (m) {
        m.setAttribute('data-state', 'closed');
      });
    });
  }

  /* =====================
     TABS
     ===================== */
  function initTabs() {
    on(document, 'click', '.tabs-trigger', function () {
      var tabsRoot = this.closest('.tabs');
      if (!tabsRoot) return;
      var target = this.getAttribute('data-tab');

      $$('.tabs-trigger', tabsRoot).forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      $$('.tab-panel', tabsRoot).forEach(function (p) {
        p.classList.remove('active');
      });
      var panel = tabsRoot.querySelector('[data-tab-panel="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  }

  /* =====================
     TOAST SYSTEM
     ===================== */
  var toastDefaults = { duration: 4000, position: 'bottom-right' };

  function getContainer(pos) {
    var existing = $('.toast-container.' + pos);
    if (existing) return existing;
    var c = document.createElement('div');
    c.className = 'toast-container ' + pos;
    document.body.appendChild(c);
    return c;
  }

  Ranju.toast = function (opts) {
    if (typeof opts === 'string') opts = { title: opts };
    opts = Object.assign({}, toastDefaults, opts);

    var container = getContainer(opts.position);
    var toast = document.createElement('div');
    toast.className = 'toast' + (opts.variant ? ' toast-' + opts.variant : '');

    var iconSvg = '';
    if (opts.variant === 'success') iconSvg = '<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>';
    else if (opts.variant === 'destructive') iconSvg = '<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>';
    else if (opts.variant === 'warning') iconSvg = '<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>';

    toast.innerHTML =
      iconSvg +
      '<div class="toast-content">' +
        (opts.title ? '<div class="toast-title">' + opts.title + '</div>' : '') +
        (opts.description ? '<div class="toast-description">' + opts.description + '</div>' : '') +
      '</div>' +
      '<button class="toast-close" aria-label="Close">&times;</button>';

    container.appendChild(toast);

    var closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function () { removeToast(toast); });

    if (opts.duration > 0) {
      setTimeout(function () { removeToast(toast); }, opts.duration);
    }
    return toast;
  };

  function removeToast(t) {
    if (t._removing) return;
    t._removing = true;
    t.classList.add('toast-leaving');
    setTimeout(function () { t.remove(); }, 200);
  }

  /* =====================
     TOOLTIP (JS enhanced)
     ===================== */
  function initTooltip() {
    $$('[data-tooltip]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        var text = this.getAttribute('data-tooltip');
        if (!text || this._tip) return;
        var tip = document.createElement('div');
        tip.className = 'tooltip-content';
        tip.style.opacity = '1';
        tip.style.pointerEvents = 'none';
        tip.style.position = 'absolute';
        tip.textContent = text;
        this.style.position = 'relative';
        this.appendChild(tip);
        this._tip = tip;
      });
      el.addEventListener('mouseleave', function () {
        if (this._tip) { this._tip.remove(); this._tip = null; }
      });
    });
  }

  /* =====================
     POPOVER
     ===================== */
  function initPopover() {
    on(document, 'click', '[data-popover-trigger]', function (e) {
      e.stopPropagation();
      var pop = this.closest('.popover');
      if (!pop) return;
      toggle(pop, 'data-state');
    });
    on(document, 'click', function (e) {
      $$('.popover[data-state="open"]').forEach(function (p) {
        if (!p.contains(e.target)) p.setAttribute('data-state', 'closed');
      });
    });
  }

  /* =====================
     COMBOBOX
     ===================== */
  function initCombobox() {
    on(document, 'focusin', '.combobox-input', function () {
      var cb = this.closest('.combobox');
      if (cb) cb.setAttribute('data-state', 'open');
    });

    on(document, 'input', '.combobox-input', function () {
      var cb = this.closest('.combobox');
      if (!cb) return;
      var val = this.value.toLowerCase();
      $$('.combobox-option', cb).forEach(function (opt) {
        var text = opt.textContent.toLowerCase();
        opt.style.display = text.includes(val) ? '' : 'none';
      });
    });

    on(document, 'click', '.combobox-option', function () {
      var cb = this.closest('.combobox');
      if (!cb) return;
      var inp = $('.combobox-input', cb);
      if (inp) inp.value = this.textContent.trim();
      $$('.combobox-option', cb).forEach(function (o) { o.removeAttribute('data-selected'); });
      this.setAttribute('data-selected', '');
      cb.setAttribute('data-state', 'closed');
    });

    on(document, 'click', function (e) {
      $$('.combobox[data-state="open"]').forEach(function (cb) {
        if (!cb.contains(e.target)) cb.setAttribute('data-state', 'closed');
      });
    });
  }

  /* =====================
     COMMAND PALETTE
     ===================== */
  Ranju.command = {
    open: function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.setAttribute('data-state', 'open');
        var inp = $('.command-input', el);
        if (inp) setTimeout(function () { inp.focus(); }, 100);
      }
    },
    close: function (id) {
      var el = document.getElementById(id);
      if (el) el.setAttribute('data-state', 'closed');
    }
  };

  function initCommand() {
    on(document, 'click', '.command-overlay', function (e) {
      if (e.target === this) this.setAttribute('data-state', 'closed');
    });

    on(document, 'input', '.command-input', function () {
      var overlay = this.closest('.command-overlay');
      if (!overlay) return;
      var val = this.value.toLowerCase();
      $$('.command-item', overlay).forEach(function (item) {
        var text = item.textContent.toLowerCase();
        item.style.display = text.includes(val) ? '' : 'none';
      });
      $$('.command-group-label', overlay).forEach(function (lbl) {
        var group = lbl.parentElement;
        var visible = $$('.command-item', group).some(function (i) {
          return i.style.display !== 'none';
        });
        lbl.style.display = visible ? '' : 'none';
      });
    });

    on(document, 'keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        var cmd = $('.command-overlay');
        if (cmd) {
          var isOpen = cmd.getAttribute('data-state') === 'open';
          cmd.setAttribute('data-state', isOpen ? 'closed' : 'open');
          if (!isOpen) {
            var inp = $('.command-input', cmd);
            if (inp) setTimeout(function () { inp.focus(); }, 100);
          }
        }
      }
    });
  }

  /* =====================
     CAROUSEL
     ===================== */
  function initCarousel() {
    $$('.carousel').forEach(function (carousel) {
      var track = $('.carousel-track', carousel);
      var slides = $$('.carousel-slide', carousel);
      var dots = $$('.carousel-dot', carousel);
      var idx = 0;

      function goTo(i) {
        idx = Math.max(0, Math.min(i, slides.length - 1));
        track.style.transform = 'translateX(-' + (idx * 100) + '%)';
        dots.forEach(function (d, j) { d.classList.toggle('active', j === idx); });
      }

      var prev = $('.carousel-prev', carousel);
      var next = $('.carousel-next', carousel);
      if (prev) prev.addEventListener('click', function () { goTo(idx - 1); });
      if (next) next.addEventListener('click', function () { goTo(idx + 1); });
      dots.forEach(function (dot, j) {
        dot.addEventListener('click', function () { goTo(j); });
      });

      if (dots.length) dots[0].classList.add('active');

      if (carousel.hasAttribute('data-autoplay')) {
        var ms = parseInt(carousel.getAttribute('data-autoplay')) || 5000;
        setInterval(function () { goTo((idx + 1) % slides.length); }, ms);
      }
    });
  }

  /* =====================
     DATA TABLE SORT
     ===================== */
  function initDataTable() {
    on(document, 'click', 'th[data-sortable]', function () {
      var table = this.closest('table');
      if (!table) return;
      var colIdx = Array.from(this.parentElement.children).indexOf(this);
      var tbody = table.querySelector('tbody') || table;
      var rows = Array.from(tbody.querySelectorAll('tr'));
      var dir = this.getAttribute('data-sort') === 'asc' ? 'desc' : 'asc';

      $$('th[data-sortable]', table).forEach(function (h) { h.removeAttribute('data-sort'); });
      this.setAttribute('data-sort', dir);

      rows.sort(function (a, b) {
        var cellA = (a.children[colIdx] || {}).textContent || '';
        var cellB = (b.children[colIdx] || {}).textContent || '';
        var numA = parseFloat(cellA);
        var numB = parseFloat(cellB);
        if (!isNaN(numA) && !isNaN(numB)) {
          return dir === 'asc' ? numA - numB : numB - numA;
        }
        return dir === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
      });

      rows.forEach(function (r) { tbody.appendChild(r); });
    });
  }

  /* =====================
     CALENDAR
     ===================== */
  Ranju.calendar = function (el, opts) {
    opts = opts || {};
    var today = new Date();
    var month = today.getMonth();
    var year = today.getFullYear();
    var selected = null;
    var days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    function render() {
      var first = new Date(year, month, 1);
      var last = new Date(year, month + 1, 0);
      var startDay = first.getDay();
      var monthName = first.toLocaleString('default', { month: 'long', year: 'numeric' });

      var html = '<div class="calendar-header">' +
        '<button class="calendar-nav" data-cal-prev>&#8249;</button>' +
        '<span class="calendar-title">' + monthName + '</span>' +
        '<button class="calendar-nav" data-cal-next>&#8250;</button>' +
        '</div><div class="calendar-grid">';

      days.forEach(function (d) { html += '<div class="calendar-day-header">' + d + '</div>'; });

      var prevLast = new Date(year, month, 0).getDate();
      for (var i = startDay - 1; i >= 0; i--) {
        html += '<div class="calendar-day other-month">' + (prevLast - i) + '</div>';
      }
      for (var d = 1; d <= last.getDate(); d++) {
        var cls = 'calendar-day';
        if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) cls += ' today';
        if (selected && d === selected.getDate() && month === selected.getMonth() && year === selected.getFullYear()) cls += ' selected';
        html += '<div class="' + cls + '" data-day="' + d + '">' + d + '</div>';
      }
      var rem = 42 - (startDay + last.getDate());
      for (var i = 1; i <= rem; i++) {
        html += '<div class="calendar-day other-month">' + i + '</div>';
      }
      html += '</div>';
      el.innerHTML = html;

      el.querySelector('[data-cal-prev]').addEventListener('click', function () {
        month--; if (month < 0) { month = 11; year--; } render();
      });
      el.querySelector('[data-cal-next]').addEventListener('click', function () {
        month++; if (month > 11) { month = 0; year++; } render();
      });
      $$('.calendar-day:not(.other-month)', el).forEach(function (dayEl) {
        dayEl.addEventListener('click', function () {
          selected = new Date(year, month, parseInt(this.getAttribute('data-day')));
          render();
          if (opts.onSelect) opts.onSelect(selected);
        });
      });
    }
    render();
  };

  /* =====================
     SIDEBAR TOGGLE
     ===================== */
  function initSidebar() {
    on(document, 'click', '[data-sidebar-toggle]', function () {
      var id = this.getAttribute('data-sidebar-toggle');
      var sidebar = document.getElementById(id) || $('.sidebar');
      if (sidebar) sidebar.classList.toggle('sidebar-collapsed');
    });
  }

  /* =====================
     RESIZABLE
     ===================== */
  function initResizable() {
    $$('.resizable-handle').forEach(function (handle) {
      var dragging = false;
      var prev, startX, startY, startW, startH;

      handle.addEventListener('mousedown', function (e) {
        dragging = true;
        prev = handle.previousElementSibling;
        startX = e.clientX;
        startY = e.clientY;
        var rect = prev.getBoundingClientRect();
        startW = rect.width;
        startH = rect.height;
        document.body.style.cursor = handle.closest('.resizable-vertical') ? 'row-resize' : 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
      });

      document.addEventListener('mousemove', function (e) {
        if (!dragging) return;
        if (handle.closest('.resizable-vertical')) {
          prev.style.height = (startH + (e.clientY - startY)) + 'px';
          prev.style.flex = 'none';
        } else {
          prev.style.width = (startW + (e.clientX - startX)) + 'px';
          prev.style.flex = 'none';
        }
      });

      document.addEventListener('mouseup', function () {
        if (dragging) {
          dragging = false;
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
        }
      });
    });
  }

  /* =====================
     TOGGLE
     ===================== */
  function initToggle() {
    on(document, 'click', '.toggle', function () {
      var pressed = this.getAttribute('aria-pressed') === 'true';
      this.setAttribute('aria-pressed', !pressed);
      this.classList.toggle('active');

      var group = this.closest('.toggle-group');
      if (group && !group.hasAttribute('data-multiple')) {
        $$('.toggle', group).forEach(function (t) {
          if (t !== this) {
            t.setAttribute('aria-pressed', 'false');
            t.classList.remove('active');
          }
        }.bind(this));
      }
    });
  }

  /* =====================
     INITIALIZE
     ===================== */
  function init() {
    Ranju.theme.init();
    initAccordion();
    initAlert();
    initCollapsible();
    initDialog();
    initDropdown();
    initContextMenu();
    initTabs();
    initTooltip();
    initPopover();
    initCombobox();
    initCommand();
    initCarousel();
    initDataTable();
    initSidebar();
    initResizable();
    initToggle();

    $$('.calendar').forEach(function (el) {
      if (!el.hasAttribute('data-manual')) Ranju.calendar(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
