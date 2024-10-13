function a(s, t = !1) {
	let e = s.touches[0];
	return { x: t ? e.pageX : e.clientX, y: t ? e.pageY : e.clientY };
}
function _(s, t, e) {
	for (let o = 0; o < e.length; o++) {
		let n = e[o];
		s[n] = t[n];
	}
}
function f(s, t, e) {
	let o = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'],
		n = ['pageX', 'pageY', 'clientX', 'clientY', 'screenX', 'screenY', 'offsetX', 'offsetY'],
		i = new Event(s, { bubbles: !0, cancelable: !0 }),
		h = t.touches[0];
	return (i.button = 0), (i.which = i.buttons = 1), _(i, t, o), _(i, h, n), E(i, e), i;
}
function E(s, t) {
	let e = t.getBoundingClientRect();
	s.offsetX === void 0 && ((s.offsetX = s.clientX - e.x), (s.offsetY = s.clientY - e.y)),
		s.layerX === void 0 && ((s.layerX = s.pageX - e.left), (s.layerY = s.pageY - e.top));
}
function c(s, t) {
	if ((D(t), s instanceof HTMLCanvasElement)) {
		let e = t;
		(e.width = s.width), (e.height = s.height), e.getContext('2d').drawImage(s, 0, 0);
	}
	y(s, t), (t.style.pointerEvents = 'none');
	for (let e = 0; e < s.children.length; e++) c(s.children[e], t.children[e]);
}
function y(s, t) {
	let e = getComputedStyle(s);
	for (let o of e) o.includes('transition') || (t.style[o] = e[o]);
	Object.keys(t.dataset).forEach((o) => delete t.dataset[o]);
}
function D(s) {
	['id', 'class', 'style', 'draggable'].forEach(function (t) {
		s.removeAttribute(t);
	});
}
var r = class {
	_dropEffect;
	_effectAllowed;
	_data;
	_dragDropTouch;
	constructor(t) {
		(this._dropEffect = 'move'),
			(this._effectAllowed = 'all'),
			(this._data = {}),
			(this._dragDropTouch = t);
	}
	get dropEffect() {
		return this._dropEffect;
	}
	set dropEffect(t) {
		this._dropEffect = t;
	}
	get effectAllowed() {
		return this._effectAllowed;
	}
	set effectAllowed(t) {
		this._effectAllowed = t;
	}
	get types() {
		return Object.keys(this._data);
	}
	clearData(t) {
		t !== null ? delete this._data[t.toLowerCase()] : (this._data = {});
	}
	getData(t) {
		let e = t.toLowerCase(),
			o = this._data[e];
		return e === 'text' && o == null && (o = this._data['text/plain']), o;
	}
	setData(t, e) {
		this._data[t.toLowerCase()] = e;
	}
	setDragImage(t, e, o) {
		this._dragDropTouch.setDragImage(t, e, o);
	}
};
var { round: m } = Math,
	b = {
		allowDragScroll: !0,
		contextMenuDelayMS: 900,
		dragImageOpacity: 0.5,
		dragScrollPercentage: 10,
		dragScrollSpeed: 10,
		dragThresholdPixels: 5,
		forceListen: !1,
		isPressHoldMode: !1,
		pressHoldDelayMS: 400,
		pressHoldMargin: 25,
		pressHoldThresholdPixels: 0
	},
	d = class {
		_dragRoot;
		_dropRoot;
		_dragSource;
		_lastTouch;
		_lastTarget;
		_ptDown;
		_isDragEnabled;
		_isDropZone;
		_dataTransfer;
		_img;
		_imgCustom;
		_imgOffset;
		_pressHoldIntervalId;
		configuration;
		constructor(t = document, e = document, o) {
			for (
				this.configuration = { ...b, ...(o || {}) }, this._dragRoot = t, this._dropRoot = e;
				!this._dropRoot.elementFromPoint && this._dropRoot.parentNode;

			)
				this._dropRoot = this._dropRoot.parentNode;
			(this._dragSource = null),
				(this._lastTouch = null),
				(this._lastTarget = null),
				(this._ptDown = null),
				(this._isDragEnabled = !1),
				(this._isDropZone = !1),
				(this._dataTransfer = new r(this)),
				(this._img = null),
				(this._imgCustom = null),
				(this._imgOffset = { x: 0, y: 0 }),
				this.listen();
		}
		listen() {
			if (navigator.maxTouchPoints === 0 && !this.configuration.forceListen) return;
			let t = { passive: !1, capture: !1 };
			this._dragRoot.addEventListener('touchstart', this._touchstart.bind(this), t),
				this._dragRoot.addEventListener('touchmove', this._touchmove.bind(this), t),
				this._dragRoot.addEventListener('touchend', this._touchend.bind(this)),
				this._dragRoot.addEventListener('touchcancel', this._touchend.bind(this));
		}
		setDragImage(t, e, o) {
			(this._imgCustom = t), (this._imgOffset = { x: e, y: o });
		}
		_touchstart(t) {
			if (this._shouldHandle(t)) {
				this._reset();
				let e = this._closestDraggable(t.target);
				e &&
					t.target &&
					!this._dispatchEvent(t, 'mousemove', t.target) &&
					!this._dispatchEvent(t, 'mousedown', t.target) &&
					((this._dragSource = e),
					(this._ptDown = a(t)),
					(this._lastTouch = t),
					setTimeout(() => {
						this._dragSource === e &&
							this._img === null &&
							this._dispatchEvent(t, 'contextmenu', e) &&
							this._reset();
					}, this.configuration.contextMenuDelayMS),
					this.configuration.isPressHoldMode
						? (this._pressHoldIntervalId = setTimeout(() => {
								(this._isDragEnabled = !0), this._touchmove(t);
							}, this.configuration.pressHoldDelayMS))
						: t.isTrusted || (t.target !== this._lastTarget && (this._lastTarget = t.target)));
			}
		}
		_touchmove(t) {
			if (this._shouldCancelPressHoldMove(t)) {
				this._reset();
				return;
			}
			if (this._shouldHandleMove(t) || this._shouldHandlePressHoldMove(t)) {
				let e = this._getTarget(t);
				if (this._dispatchEvent(t, 'mousemove', e)) {
					(this._lastTouch = t), t.preventDefault();
					return;
				}
				if (this._dragSource && !this._img && this._shouldStartDragging(t)) {
					if (this._dispatchEvent(this._lastTouch, 'dragstart', this._dragSource)) {
						this._dragSource = null;
						return;
					}
					this._createImage(t), this._dispatchEvent(t, 'dragenter', e);
				}
				if (
					this._img &&
					this._dragSource &&
					((this._lastTouch = t),
					t.preventDefault(),
					this._dispatchEvent(t, 'drag', this._dragSource),
					e !== this._lastTarget &&
						(this._lastTarget &&
							this._dispatchEvent(this._lastTouch, 'dragleave', this._lastTarget),
						this._dispatchEvent(t, 'dragenter', e),
						(this._lastTarget = e)),
					this._moveImage(t),
					(this._isDropZone = this._dispatchEvent(t, 'dragover', e)),
					this.configuration.allowDragScroll)
				) {
					let o = this._getHotRegionDelta(t);
					globalThis.scrollBy(o.x, o.y);
				}
			}
		}
		_touchend(t) {
			if (!(this._lastTouch && t.target && this._lastTarget)) {
				this._reset();
				return;
			}
			if (this._shouldHandle(t)) {
				if (this._dispatchEvent(this._lastTouch, 'mouseup', t.target)) {
					t.preventDefault();
					return;
				}
				this._img ||
					((this._dragSource = null), this._dispatchEvent(this._lastTouch, 'click', t.target)),
					this._destroyImage(),
					this._dragSource &&
						(t.type.indexOf('cancel') < 0 &&
							this._isDropZone &&
							this._dispatchEvent(this._lastTouch, 'drop', this._lastTarget),
						this._dispatchEvent(this._lastTouch, 'dragend', this._dragSource),
						this._reset());
			}
		}
		_shouldHandle(t) {
			return t && !t.defaultPrevented && t.touches && t.touches.length < 2;
		}
		_shouldHandleMove(t) {
			return !this.configuration.isPressHoldMode && this._shouldHandle(t);
		}
		_shouldHandlePressHoldMove(t) {
			return (
				this.configuration.isPressHoldMode &&
				this._isDragEnabled &&
				t &&
				t.touches &&
				t.touches.length
			);
		}
		_shouldCancelPressHoldMove(t) {
			return (
				this.configuration.isPressHoldMode &&
				!this._isDragEnabled &&
				this._getDelta(t) > this.configuration.pressHoldMargin
			);
		}
		_shouldStartDragging(t) {
			let e = this._getDelta(t);
			return this.configuration.isPressHoldMode
				? e >= this.configuration.pressHoldThresholdPixels
				: e > this.configuration.dragThresholdPixels;
		}
		_reset() {
			this._destroyImage(),
				(this._dragSource = null),
				(this._lastTouch = null),
				(this._lastTarget = null),
				(this._ptDown = null),
				(this._isDragEnabled = !1),
				(this._isDropZone = !1),
				(this._dataTransfer = new r(this)),
				clearTimeout(this._pressHoldIntervalId);
		}
		_getDelta(t) {
			if (!this._ptDown) return 0;
			let { x: e, y: o } = this._ptDown,
				n = a(t);
			return ((n.x - e) ** 2 + (n.y - o) ** 2) ** 0.5;
		}
		_getHotRegionDelta(t) {
			let { clientX: e, clientY: o } = t.touches[0],
				{ innerWidth: n, innerHeight: i } = globalThis,
				{ dragScrollPercentage: h, dragScrollSpeed: l } = this.configuration,
				u = h / 100,
				g = 1 - u,
				v = e < n * u ? -l : e > n * g ? +l : 0,
				T = o < i * u ? -l : o > i * g ? +l : 0;
			return { x: v, y: T };
		}
		_getTarget(t) {
			let e = a(t),
				o = this._dropRoot.elementFromPoint(e.x, e.y);
			for (; o && getComputedStyle(o).pointerEvents == 'none'; ) o = o.parentElement;
			return o;
		}
		_createImage(t) {
			this._img && this._destroyImage();
			let e = this._imgCustom || this._dragSource;
			if (
				((this._img = e.cloneNode(!0)),
				c(e, this._img),
				(this._img.style.top = this._img.style.left = '-9999px'),
				!this._imgCustom)
			) {
				let o = e.getBoundingClientRect(),
					n = a(t);
				(this._imgOffset = { x: n.x - o.left, y: n.y - o.top }),
					(this._img.style.opacity = `${this.configuration.dragImageOpacity}`);
			}
			this._moveImage(t), document.body.appendChild(this._img);
		}
		_destroyImage() {
			this._img && this._img.parentElement && this._img.parentElement.removeChild(this._img),
				(this._img = null),
				(this._imgCustom = null);
		}
		_moveImage(t) {
			requestAnimationFrame(() => {
				if (this._img) {
					let e = a(t, !0),
						o = this._img.style;
					(o.position = 'absolute'),
						(o.pointerEvents = 'none'),
						(o.zIndex = '999999'),
						(o.left = `${m(e.x - this._imgOffset.x)}px`),
						(o.top = `${m(e.y - this._imgOffset.y)}px`);
				}
			});
		}
		_dispatchEvent(t, e, o) {
			if (!(t && o)) return !1;
			let n = f(e, t, o);
			return (n.dataTransfer = this._dataTransfer), o.dispatchEvent(n), n.defaultPrevented;
		}
		_closestDraggable(t) {
			for (let e = t; e !== null; e = e.parentElement) if (e.draggable) return e;
			return null;
		}
	};
function p(s = document, t = document, e) {
	new d(s, t, e);
}
import.meta.url.includes('?autoload')
	? p(document, document, { forceListen: !0 })
	: (globalThis.DragDropTouch = {
			enable: function (s = document, t = document, e) {
				p(s, t, e);
			}
		});
export { p as enableDragDropTouch };
