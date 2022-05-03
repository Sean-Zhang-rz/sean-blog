"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeorm = require("typeorm");

require("reflect-metadata");

var _User = require("./entity/User");

var _Post = require("./entity/Post");

var _Comment = require("./entity/Comment");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var manager, user, post, comment;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manager = connection.manager;
            user = new _User.User();
            user.username = 'sean';
            user.passwordDigest = '123xxx456';
            _context.next = 6;
            return manager.save(user);

          case 6:
            post = new _Post.Post();
            post.title = 'Post1';
            post.content = '我的第一篇博客';
            post.author = user;
            _context.next = 12;
            return manager.save(post);

          case 12:
            comment = new _Comment.Comment();
            comment.user = user;
            comment.post = post;
            comment.content = '点赞';
            _context.next = 18;
            return manager.save(comment);

          case 18:
            connection.close();

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});