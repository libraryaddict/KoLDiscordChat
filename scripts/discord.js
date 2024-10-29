/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  DiscordChat: () => (/* binding */ DiscordChat),
  main: () => (/* binding */ main)
});

;// external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
;// ./src/commands/discordAdd.ts
function _classCallCheck(a, n) {if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");}function _defineProperties(e, r) {for (var t = 0; t < r.length; t++) {var o = r[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);}}function _createClass(e, r, t) {return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;}function _toPropertyKey(t) {var i = _toPrimitive(t, "string");return "symbol" == typeof i ? i : i + "";}function _toPrimitive(t, r) {if ("object" != typeof t || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != typeof i) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}



var DiscordAdd = /*#__PURE__*/function () {function DiscordAdd() {_classCallCheck(this, DiscordAdd);}return _createClass(DiscordAdd, [{ key: "getHelp", value:
    function getHelp() {
      return [
      "Syntax: add <name> <type> <webhook url?>",
      "<name> should be 'default' to make this the default link, or an unused name",
      "<type> should be 'dm' or 'webhook'. DM will require you to DM the discord bot. Webhook requires a webhook url for a channel integration on discord, this requires some ownership in that channel.",
      "<webhook url> is the url if the type 'webhook' was used"];

    } }, { key: "getName", value:

    function getName() {
      return "add";
    } }, { key: "shouldLinkExist", value:

    function shouldLinkExist() {
      return "unused";
    } }, { key: "getMinArgs", value:

    function getMinArgs() {
      return 3;
    } }, { key: "run", value:

    function run(chat, args) {
      if (args.length > 3) {
        (0,external_kolmafia_namespaceObject.print)("Too many args", "red");

        return;
      }

      if (!["dm", "webhook"].includes(args[1])) {
        (0,external_kolmafia_namespaceObject.print)("Unrecognized link type " + args[1], "red");

        return;
      }

      if (args.length != (args[1] == "dm" ? 2 : 3)) {
        (0,external_kolmafia_namespaceObject.print)(
          "Expected " + (
          args[1] == "dm" ? 2 : 3) +
          " args but received " +
          args.length,
          "red"
        );

        return;
      }

      if (chat.getLink(args[0]) != null) {
        (0,external_kolmafia_namespaceObject.print)("The link " + args[0] + " already exists", "red");

        return;
      }

      if (
      args[1] == "webhook" &&
      !args[2].startsWith("https://discord.com/api/webhooks"))
      {
        (0,external_kolmafia_namespaceObject.print)(
          "Invalid webhook url provided, did not start with https://discord.com/api/webhooks",
          "red"
        );

        return;
      }

      var result = chat.getKmailAndWait(
        "add " +
        args[0] +
        " " +
        args[1] + (
        args[1] == "webhook" ? " " + args[2] : "")
      );

      if (!result.startsWith("Success!")) {
        (0,external_kolmafia_namespaceObject.print)("Failure! " + result, "red");

        return;
      }

      chat.links.push({
        name: args[0],
        target: args[1],
        data: args[1] == "dm" ? "???" : args[2]
      });

      chat.saveLinks();

      var code = result.match(/Just send the code '(.+)' to the/);

      if (code != null) {
        (0,external_kolmafia_namespaceObject.printHtml)("<font color='green'>Success! Send the code <font color='purple'>".concat(
          code[1], "</font> to the Discord Bot to finish this process. Run 'update' if you changed your mind to bring the script back in sync. You'll probably need to share a discord server, join via https://discord.gg/wz53wvZKkV - you can leave afterwards!</font>")
        );
      } else {
        (0,external_kolmafia_namespaceObject.print)(result, "green");
      }
    } }]);}();
;// ./src/commands/discordDelete.ts
function discordDelete_classCallCheck(a, n) {if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");}function discordDelete_defineProperties(e, r) {for (var t = 0; t < r.length; t++) {var o = r[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, discordDelete_toPropertyKey(o.key), o);}}function discordDelete_createClass(e, r, t) {return r && discordDelete_defineProperties(e.prototype, r), t && discordDelete_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;}function discordDelete_toPropertyKey(t) {var i = discordDelete_toPrimitive(t, "string");return "symbol" == typeof i ? i : i + "";}function discordDelete_toPrimitive(t, r) {if ("object" != typeof t || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != typeof i) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}



var DiscordDelete = /*#__PURE__*/function () {function DiscordDelete() {discordDelete_classCallCheck(this, DiscordDelete);}return discordDelete_createClass(DiscordDelete, [{ key: "getHelp", value:
    function getHelp() {
      return ["Syntax: delete <name>", "Delete an existing link"];
    } }, { key: "getName", value:

    function getName() {
      return "delete";
    } }, { key: "shouldLinkExist", value:

    function shouldLinkExist() {
      return "exist";
    } }, { key: "getMinArgs", value:

    function getMinArgs() {
      return 1;
    } }, { key: "run", value:

    function run(chat, args) {
      if (args.length > 1) {
        (0,external_kolmafia_namespaceObject.print)("Too many args", "red");

        return;
      }

      var result = chat.getKmailAndWait("delete " + args[0]);

      if (!result.startsWith("Success!")) {
        (0,external_kolmafia_namespaceObject.print)("Failure! " + result, "red");
        (0,external_kolmafia_namespaceObject.print)(
          "Use 'update' to refresh the links this script knows about.",
          "gray"
        );

        return;
      }

      chat.links = chat.links.filter(
        (l) => l.name.toLowerCase() != args[0].toLowerCase()
      );
      chat.saveLinks();
      (0,external_kolmafia_namespaceObject.print)(result, "green");
    } }]);}();
;// ./src/commands/discordList.ts
function _slicedToArray(r, e) {return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(r, a) {if (r) {if ("string" == typeof r) return _arrayLikeToArray(r, a);var t = {}.toString.call(r).slice(8, -1);return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;}}function _arrayLikeToArray(r, a) {(null == a || a > r.length) && (a = r.length);for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];return n;}function _iterableToArrayLimit(r, l) {var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];if (null != t) {var e,n,i,u,a = [],f = !0,o = !1;try {if (i = (t = t.call(r)).next, 0 === l) {if (Object(t) !== t) return;f = !1;} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);} catch (r) {o = !0, n = r;} finally {try {if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;} finally {if (o) throw n;}}return a;}}function _arrayWithHoles(r) {if (Array.isArray(r)) return r;}function discordList_classCallCheck(a, n) {if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");}function discordList_defineProperties(e, r) {for (var t = 0; t < r.length; t++) {var o = r[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, discordList_toPropertyKey(o.key), o);}}function discordList_createClass(e, r, t) {return r && discordList_defineProperties(e.prototype, r), t && discordList_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;}function discordList_toPropertyKey(t) {var i = discordList_toPrimitive(t, "string");return "symbol" == typeof i ? i : i + "";}function discordList_toPrimitive(t, r) {if ("object" != typeof t || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != typeof i) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}



var DiscordList = /*#__PURE__*/function () {function DiscordList() {discordList_classCallCheck(this, DiscordList);}return discordList_createClass(DiscordList, [{ key: "getHelp", value:
    function getHelp() {
      return ["Syntax: list", "List the links that have been setup"];
    } }, { key: "getName", value:

    function getName() {
      return "list";
    } }, { key: "shouldLinkExist", value:

    function shouldLinkExist() {
      return null;
    } }, { key: "getMinArgs", value:

    function getMinArgs() {
      return 0;
    } }, { key: "run", value:

    function run(chat, args) {
      if (chat.links.length == 0) {
        (0,external_kolmafia_namespaceObject.print)("You do not have any links active", "red");

        return;
      }

      chat.links.forEach((l) => {
        var data = [
        ["Link", l.name],
        ["Type", l.target],
        ["Data", l.data],
        ["Displayname", l.displayname],
        ["Avatar", l.avatar]];


        (0,external_kolmafia_namespaceObject.printHtml)(
          data.
          filter((l) => l[1] != null).
          map(
            (_ref) => {var _ref2 = _slicedToArray(_ref, 2),name = _ref2[0],d = _ref2[1];return "<font color='purple'>".concat(
                name, ":</font> <font color='").concat(
                name != "Link" ? "blue" : "green", "'>").concat(
                d, "</font>");}
          ).
          join("<br>&nbsp;&nbsp;- ")
        );
      });
    } }]);}();
;// ./src/commands/discordRename.ts
function discordRename_classCallCheck(a, n) {if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");}function discordRename_defineProperties(e, r) {for (var t = 0; t < r.length; t++) {var o = r[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, discordRename_toPropertyKey(o.key), o);}}function discordRename_createClass(e, r, t) {return r && discordRename_defineProperties(e.prototype, r), t && discordRename_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;}function discordRename_toPropertyKey(t) {var i = discordRename_toPrimitive(t, "string");return "symbol" == typeof i ? i : i + "";}function discordRename_toPrimitive(t, r) {if ("object" != typeof t || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != typeof i) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}



var DiscordRename = /*#__PURE__*/function () {function DiscordRename() {discordRename_classCallCheck(this, DiscordRename);}return discordRename_createClass(DiscordRename, [{ key: "getHelp", value:
    function getHelp() {
      return [
      "Syntax: rename <name> <new name>",
      "Renames an existing link to a new name"];

    } }, { key: "getName", value:

    function getName() {
      return "rename";
    } }, { key: "shouldLinkExist", value:

    function shouldLinkExist() {
      return "exist";
    } }, { key: "getMinArgs", value:

    function getMinArgs() {
      return 2;
    } }, { key: "run", value:

    function run(chat, args) {
      if (args.length > 2) {
        (0,external_kolmafia_namespaceObject.print)("Too many args provided", "red");

        return;
      }

      if (chat.getLink(args[1]) != null) {
        (0,external_kolmafia_namespaceObject.print)("The link '" + args[1] + "' already exists", "red");

        return;
      }

      var result = chat.getKmailAndWait("edit " + args[0] + " name " + args[1]);

      if (!result.startsWith("Success!")) {
        (0,external_kolmafia_namespaceObject.print)("Failure! " + result, "red");

        return;
      }

      var link = chat.getLink(args[0]);
      link.name = args[1];
      chat.saveLinks();
      (0,external_kolmafia_namespaceObject.print)(result, "green");
    } }]);}();
;// ./src/commands/discordUpdate.ts
function _createForOfIteratorHelper(r, e) {var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];if (!t) {if (Array.isArray(r) || (t = discordUpdate_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {t && (r = t);var _n = 0,F = function F() {};return { s: F, n: function n() {return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };}, e: function e(r) {throw r;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var o,a = !0,u = !1;return { s: function s() {t = t.call(r);}, n: function n() {var r = t.next();return a = r.done, r;}, e: function e(r) {u = !0, o = r;}, f: function f() {try {a || null == t.return || t.return();} finally {if (u) throw o;}} };}function discordUpdate_unsupportedIterableToArray(r, a) {if (r) {if ("string" == typeof r) return discordUpdate_arrayLikeToArray(r, a);var t = {}.toString.call(r).slice(8, -1);return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? discordUpdate_arrayLikeToArray(r, a) : void 0;}}function discordUpdate_arrayLikeToArray(r, a) {(null == a || a > r.length) && (a = r.length);for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];return n;}function discordUpdate_classCallCheck(a, n) {if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");}function discordUpdate_defineProperties(e, r) {for (var t = 0; t < r.length; t++) {var o = r[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, discordUpdate_toPropertyKey(o.key), o);}}function discordUpdate_createClass(e, r, t) {return r && discordUpdate_defineProperties(e.prototype, r), t && discordUpdate_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;}function discordUpdate_toPropertyKey(t) {var i = discordUpdate_toPrimitive(t, "string");return "symbol" == typeof i ? i : i + "";}function discordUpdate_toPrimitive(t, r) {if ("object" != typeof t || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != typeof i) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}



var DiscordUpdate = /*#__PURE__*/function () {function DiscordUpdate() {discordUpdate_classCallCheck(this, DiscordUpdate);}return discordUpdate_createClass(DiscordUpdate, [{ key: "getHelp", value:
    function getHelp() {
      return ["Syntax: update", "Updates the links known to this script"];
    } }, { key: "getName", value:

    function getName() {
      return "update";
    } }, { key: "shouldLinkExist", value:

    function shouldLinkExist() {
      return null;
    } }, { key: "getMinArgs", value:

    function getMinArgs() {
      return 0;
    } }, { key: "run", value:

    function run(chat, args) {
      var result = chat.getKmailAndWait("list");

      chat.links = [];

      if (!result.startsWith("You do not have any")) {var _iterator = _createForOfIteratorHelper(
            result.split(/[\r\n]+/)),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var line = _step.value;
            var match = line.match(
              /^Link: (.+), connected via '(.+)' with data '([^']+)'(?: and displayname '([^']+)')?(?: and avatar '([^']+)')?$/
            );

            if (match == null) {
              (0,external_kolmafia_namespaceObject.print)(
                "Found invalid text '" + line + "' when trying to parse link",
                "red"
              );
              continue;
            }

            chat.links.push({
              name: match[1],
              target: match[2],
              data: match[3] ? match[3] : null,
              displayname: match[4] ? match[4] : null,
              avatar: match[5] ? match[5] : null
            });
          }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
      }

      chat.saveLinks();

      (0,external_kolmafia_namespaceObject.print)("Links Updated. You have " + chat.links.length + " active", "green");
    } }]);}();
;// ./src/commands/discordWebhook.ts
function discordWebhook_classCallCheck(a, n) {if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");}function discordWebhook_defineProperties(e, r) {for (var t = 0; t < r.length; t++) {var o = r[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, discordWebhook_toPropertyKey(o.key), o);}}function discordWebhook_createClass(e, r, t) {return r && discordWebhook_defineProperties(e.prototype, r), t && discordWebhook_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;}function discordWebhook_toPropertyKey(t) {var i = discordWebhook_toPrimitive(t, "string");return "symbol" == typeof i ? i : i + "";}function discordWebhook_toPrimitive(t, r) {if ("object" != typeof t || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != typeof i) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}



var DiscordWebhook = /*#__PURE__*/function () {function DiscordWebhook() {discordWebhook_classCallCheck(this, DiscordWebhook);}return discordWebhook_createClass(DiscordWebhook, [{ key: "getHelp", value:
    function getHelp() {
      return [
      "Syntax: webhook <link> <new url>",
      "Changes the webhook used in an existing link"];

    } }, { key: "getName", value:

    function getName() {
      return "webhook";
    } }, { key: "shouldLinkExist", value:

    function shouldLinkExist() {
      return "exist";
    } }, { key: "getMinArgs", value:

    function getMinArgs() {
      return 2;
    } }, { key: "run", value:

    function run(chat, args) {
      if (args.length > 2) {
        (0,external_kolmafia_namespaceObject.print)("Too many args provided", "red");

        return;
      }

      var link = chat.getLink(args[0]);

      if (link.target != "webhook") {
        (0,external_kolmafia_namespaceObject.print)("Needs to be a link of type webhook", "red");

        return;
      }

      var result = chat.getKmailAndWait(
        "edit " + args[0] + " target " + args[1]
      );

      if (!result.startsWith("Success!")) {
        (0,external_kolmafia_namespaceObject.print)("Failure! " + result, "red");

        return;
      }

      link.data = args[1];
      chat.saveLinks();
      (0,external_kolmafia_namespaceObject.print)(result, "green");
    } }]);}();
;// ./src/api/DiscordMessage.ts










var targetPlayer = "DiscordChat";

function sendDiscord(message) {
  var toJoin = [];

  // If message type is not string
  if (!(typeof message == "string")) {
    if (message.color != null) {
      toJoin.push("Color: " + message.color);
    }

    if (message.id != null) {
      toJoin.push("ID: " + message.id);
    }

    if (message.title != null) {
      toJoin.push("Title: " + message.title);
    }

    if (message.edit != null) {
      toJoin.push("Edit: " + message.edit);
    }

    toJoin.push("Status: " + message.message);
  } else if (!message.match(/(^| )Status: (.+)/)) {
    (0,external_kolmafia_namespaceObject.print)(
      "Tried to send invalid string for the webhook integration with " +
      targetPlayer +
      ": " +
      message,
      "red"
    );

    return;
  }

  var toSend = toJoin.length > 0 ? toJoin.join(" ") : message;

  if ((0,external_kolmafia_namespaceObject.entityEncode)(toSend).length >= 190) {
    // Send via kmail, it is too big
    (0,external_kolmafia_namespaceObject.visitUrl)(
      "sendmessage.php?pwd=&action=send&towho=" +
      targetPlayer +
      "&message=" +
      (0,external_kolmafia_namespaceObject.entityEncode)(toSend) +
      "&savecopy=on&sendmeat=0"
    );
  } else {
    (0,external_kolmafia_namespaceObject.chatPrivate)(targetPlayer, toSend);
  }
}
;// ./src/commands/discordAvatar.ts
function discordAvatar_classCallCheck(a, n) {if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");}function discordAvatar_defineProperties(e, r) {for (var t = 0; t < r.length; t++) {var o = r[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, discordAvatar_toPropertyKey(o.key), o);}}function discordAvatar_createClass(e, r, t) {return r && discordAvatar_defineProperties(e.prototype, r), t && discordAvatar_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;}function discordAvatar_toPropertyKey(t) {var i = discordAvatar_toPrimitive(t, "string");return "symbol" == typeof i ? i : i + "";}function discordAvatar_toPrimitive(t, r) {if ("object" != typeof t || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != typeof i) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}



var DiscordAvatar = /*#__PURE__*/function () {function DiscordAvatar() {discordAvatar_classCallCheck(this, DiscordAvatar);}return discordAvatar_createClass(DiscordAvatar, [{ key: "getHelp", value:
    function getHelp() {
      return [
      "Syntax: avatar <link name> <new url>",
      "Changes the avatar used in an existing webhook link"];

    } }, { key: "getName", value:

    function getName() {
      return "avatar";
    } }, { key: "shouldLinkExist", value:

    function shouldLinkExist() {
      return "exist";
    } }, { key: "getMinArgs", value:

    function getMinArgs() {
      return 1;
    } }, { key: "run", value:

    function run(chat, args) {var _args$, _args$2;
      if (args.length > 2) {
        (0,external_kolmafia_namespaceObject.print)("Too many args provided", "red");

        return;
      }

      var link = chat.getLink(args[0]);

      if (link.target != "webhook") {
        (0,external_kolmafia_namespaceObject.print)("Needs to be a link of type webhook", "red");

        return;
      }

      var result = chat.getKmailAndWait(
        "edit " + link.name + " avatar " + ((_args$ = args[1]) !== null && _args$ !== void 0 ? _args$ : "")
      );

      if (!result.startsWith("Success!")) {
        (0,external_kolmafia_namespaceObject.print)("Failure! " + result, "red");

        return;
      }

      link.avatar = (_args$2 = args[1]) !== null && _args$2 !== void 0 ? _args$2 : null;
      chat.saveLinks();
      (0,external_kolmafia_namespaceObject.print)(result, "green");
    } }]);}();
;// ./src/commands/discordDisplayname.ts
function discordDisplayname_classCallCheck(a, n) {if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");}function discordDisplayname_defineProperties(e, r) {for (var t = 0; t < r.length; t++) {var o = r[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, discordDisplayname_toPropertyKey(o.key), o);}}function discordDisplayname_createClass(e, r, t) {return r && discordDisplayname_defineProperties(e.prototype, r), t && discordDisplayname_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;}function discordDisplayname_toPropertyKey(t) {var i = discordDisplayname_toPrimitive(t, "string");return "symbol" == typeof i ? i : i + "";}function discordDisplayname_toPrimitive(t, r) {if ("object" != typeof t || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != typeof i) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}



var DiscordDisplayname = /*#__PURE__*/function () {function DiscordDisplayname() {discordDisplayname_classCallCheck(this, DiscordDisplayname);}return discordDisplayname_createClass(DiscordDisplayname, [{ key: "getHelp", value:
    function getHelp() {
      return [
      "Syntax: displayname <link name> <new url>",
      "Changes the displayname used in an existing webhook link"];

    } }, { key: "getName", value:

    function getName() {
      return "displayname";
    } }, { key: "shouldLinkExist", value:

    function shouldLinkExist() {
      return "exist";
    } }, { key: "getMinArgs", value:

    function getMinArgs() {
      return 1;
    } }, { key: "run", value:

    function run(chat, args) {var _args$, _args$2;
      if (args.length > 2) {
        (0,external_kolmafia_namespaceObject.print)("Too many args provided", "red");

        return;
      }

      var link = chat.getLink(args[0]);

      if (link.target != "webhook") {
        (0,external_kolmafia_namespaceObject.print)("Needs to be a link of type webhook", "red");

        return;
      }

      var result = chat.getKmailAndWait(
        "edit " + args[0] + " displayname " + ((_args$ = args[1]) !== null && _args$ !== void 0 ? _args$ : "")
      );

      if (!result.startsWith("Success!")) {
        (0,external_kolmafia_namespaceObject.print)("Failure! " + result, "red");

        return;
      }

      link.displayname = (_args$2 = args[1]) !== null && _args$2 !== void 0 ? _args$2 : null;
      chat.saveLinks();
      (0,external_kolmafia_namespaceObject.print)(result, "green");
    } }]);}();
;// ./src/DiscordChat.ts
function DiscordChat_createForOfIteratorHelper(r, e) {var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];if (!t) {if (Array.isArray(r) || (t = DiscordChat_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {t && (r = t);var _n = 0,F = function F() {};return { s: F, n: function n() {return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };}, e: function e(r) {throw r;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var o,a = !0,u = !1;return { s: function s() {t = t.call(r);}, n: function n() {var r = t.next();return a = r.done, r;}, e: function e(r) {u = !0, o = r;}, f: function f() {try {a || null == t.return || t.return();} finally {if (u) throw o;}} };}function DiscordChat_unsupportedIterableToArray(r, a) {if (r) {if ("string" == typeof r) return DiscordChat_arrayLikeToArray(r, a);var t = {}.toString.call(r).slice(8, -1);return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? DiscordChat_arrayLikeToArray(r, a) : void 0;}}function DiscordChat_arrayLikeToArray(r, a) {(null == a || a > r.length) && (a = r.length);for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];return n;}function DiscordChat_classCallCheck(a, n) {if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");}function DiscordChat_defineProperties(e, r) {for (var t = 0; t < r.length; t++) {var o = r[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, DiscordChat_toPropertyKey(o.key), o);}}function DiscordChat_createClass(e, r, t) {return r && DiscordChat_defineProperties(e.prototype, r), t && DiscordChat_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;}function _defineProperty(e, r, t) {return (r = DiscordChat_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;}function DiscordChat_toPropertyKey(t) {var i = DiscordChat_toPrimitive(t, "string");return "symbol" == typeof i ? i : i + "";}function DiscordChat_toPrimitive(t, r) {if ("object" != typeof t || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != typeof i) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}





























var DiscordChat_targetPlayer = "DiscordChat";

var DiscordChat = /*#__PURE__*/function () {



  function DiscordChat() {DiscordChat_classCallCheck(this, DiscordChat);_defineProperty(this, "links", []);_defineProperty(this, "commands", void 0);
    this.loadLinks();
    this.commands = [
    new DiscordAdd(),
    new DiscordDelete(),
    new DiscordList(),
    new DiscordRename(),
    new DiscordUpdate(),
    new DiscordWebhook(),
    new DiscordAvatar(),
    new DiscordDisplayname()];

  }return DiscordChat_createClass(DiscordChat, [{ key: "handleCommand", value:

    function handleCommand(command) {
      var split = command.split(" ");
      var action = split[0].toLowerCase();

      if (action == "help") {
        (0,external_kolmafia_namespaceObject.print)(
          "If you do not wish for the kmails to be deleted, set `deleteDiscordKmails` to false",
          "gray"
        );

        for (var a = 0; a < this.commands.length; a++) {
          var _command = this.commands[a];
          var lines = _command.getHelp();

          (0,external_kolmafia_namespaceObject.printHtml)(
            (a == 0 ? "" : "<br>") +
            "<font color='purple'>Command: </font>" +
            _command.getName()
          );

          for (var i = 0; i < lines.length; i++) {
            (0,external_kolmafia_namespaceObject.printHtml)(
              "&nbsp;&nbsp;" +
              "<font color=" + (
              i != 0 ? "gray" : "blue") +
              ">" +
              (0,external_kolmafia_namespaceObject.entityEncode)(lines[i]) +
              "</font>"
            );
          }
        }

        return;
      } else {var _iterator = DiscordChat_createForOfIteratorHelper(
            this.commands),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _command2 = _step.value;
            if (action != _command2.getName()) {
              continue;
            }

            if (
            _command2.shouldLinkExist() == "exist" && (
            split.length == 1 || this.getLink(split[1]) == null))
            {
              if (split.length > 1) {
                (0,external_kolmafia_namespaceObject.print)("That link name does not exist", "red");
              } else {
                (0,external_kolmafia_namespaceObject.print)("Please provide a name of an existing link", "red");
              }

              (0,external_kolmafia_namespaceObject.print)(
                "Use 'update' to refresh the links this script knows about.",
                "gray"
              );

              return;
            } else if (
            _command2.shouldLinkExist() == "unused" && (
            split.length == 1 || this.getLink(split[1]) != null))
            {
              if (split.length > 1) {
                (0,external_kolmafia_namespaceObject.print)("The name '" + split[1] + "' is already in use", "red");
              } else {
                (0,external_kolmafia_namespaceObject.print)("Please provide an unused link name", "red");
              }

              (0,external_kolmafia_namespaceObject.print)(
                "Use 'update' to refresh the links this script knows about.",
                "gray"
              );

              return;
            }

            if (_command2.getMinArgs() >= split.length) {
              (0,external_kolmafia_namespaceObject.print)("Not enough arguments were provided for this command", "red");
              (0,external_kolmafia_namespaceObject.print)(_command2.getHelp()[0], "blue");

              return;
            }

            _command2.run(this, split.slice(1));

            return;
          }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
      }

      (0,external_kolmafia_namespaceObject.print)("I did not understand that, try 'help'", "red");
    } }, { key: "getLink", value:

    function getLink(name) {
      return this.links.find((l) => l.name.toLowerCase() == name.toLowerCase());
    } }, { key: "saveLinks", value:

    function saveLinks() {
      (0,external_kolmafia_namespaceObject.bufferToFile)(JSON.stringify(this.links).toString(), "discord_links.txt");
    } }, { key: "loadLinks", value:

    function loadLinks() {
      var buffer = (0,external_kolmafia_namespaceObject.fileToBuffer)("discord_links.txt");

      if (!buffer.startsWith("[")) {
        return;
      }

      this.links = JSON.parse(buffer);
    } }, { key: "getKmailAndWait", value:

    function getKmailAndWait(message) {
      var kmails = this.getKmails();
      var toBeatId = kmails.length > 0 ? parseInt(kmails[0].id) : 0;

      (0,external_kolmafia_namespaceObject.chatPrivate)(DiscordChat_targetPlayer, "kmail." + message);

      for (var i = 0; i < 5; i++) {
        (0,external_kolmafia_namespaceObject.waitq)(1);

        var _kmails = this.getKmails();

        var newKmail = _kmails.find(
          (k) =>
          k.fromname.toLowerCase() == DiscordChat_targetPlayer.toLowerCase() &&
          parseInt(k.id) > toBeatId
        );

        if (newKmail == null) {
          continue;
        }

        this.deleteBotKmails(newKmail, _kmails);

        return newKmail.message;
      }

      // Failed to get kmail
      throw "Failed to contact and receive a kmail " + DiscordChat_targetPlayer;
    } }, { key: "deleteBotKmails", value:

    function deleteBotKmails(latestKmail, kmails) {
      if ((0,external_kolmafia_namespaceObject.getProperty)("deleteDiscordKmails") == "false") {
        return;
      }

      kmails = kmails.filter(
        (k) => k.fromname.toLowerCase() == DiscordChat_targetPlayer.toLowerCase()
      );

      if (kmails.length == 0) {
        return;
      }

      // Only do the last kmail
      kmails = [latestKmail];

      (0,external_kolmafia_namespaceObject.visitUrl)(
        "messages.php?the_action=delete&box=Inbox&pwd&" +
        kmails.map((k) => "sel" + k.id + "=on").join("&")
      );
    } }, { key: "getKmails", value:

    function getKmails() {
      var buffer = (0,external_kolmafia_namespaceObject.visitUrl)("api.php?pwd&what=kmail&for=DiscordChatApi");

      return JSON.parse(buffer);
    } }]);}();


function main() {var command = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "help";
  if (command.match(/(^| )Status: (.+)/)) {
    sendDiscord(command);
  } else {
    new DiscordChat().handleCommand(command);
  }
}
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;