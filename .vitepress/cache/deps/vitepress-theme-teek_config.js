import {
  createLogger,
  normalizePath$3,
  require_assert,
  require_buffer,
  require_child_process,
  require_crypto,
  require_http,
  require_https,
  require_main,
  require_module,
  require_net,
  require_node_assert,
  require_node_buffer,
  require_node_child_process,
  require_node_crypto,
  require_node_dns,
  require_node_events,
  require_node_net,
  require_node_readline,
  require_node_stream,
  require_node_string_decoder,
  require_node_util,
  require_node_v8,
  require_node_worker_threads,
  require_node_zlib,
  require_querystring,
  require_tls,
  require_tty,
  require_zlib
} from "./chunk-XXG6CE5L.js";
import {
  require_events,
  require_node_os,
  require_os,
  require_stream,
  require_util
} from "./chunk-GN57YAIH.js";
import {
  require_node_fs,
  require_node_perf_hooks,
  require_promises
} from "./chunk-25XZWAUM.js";
import {
  require_node_http
} from "./chunk-MM644HQJ.js";
import {
  require_node_https
} from "./chunk-NZWVDDZC.js";
import {
  require_node_module,
  require_node_url
} from "./chunk-J74MCUS5.js";
import {
  require_node_path
} from "./chunk-OYZR2EBP.js";
import {
  require_picocolors_browser
} from "./chunk-KBSHL3RM.js";
import {
  require_url
} from "./chunk-NLSDCWQO.js";
import {
  require_fs
} from "./chunk-QZAH7VNE.js";
import {
  require_path
} from "./chunk-LXBZCEIU.js";
import {
  LayoutMode,
  SpotlightStyle,
  ThemeColorName,
  container_plugin,
  createCardContainer,
  createContainersThenUse,
  filterPosts,
  formatDate,
  getGroupCards,
  getGroupPosts,
  getSortPostsByDate,
  getSortPostsByDateAndSticky,
  groupByYear,
  groupByYearMonth,
  isStringNumber,
  jsYaml,
  withBase
} from "./chunk-FF7TZM6C.js";
import {
  __commonJS,
  __publicField,
  __require,
  __toESM
} from "./chunk-SNAQBZPT.js";

// node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "node_modules/kind-of/index.js"(exports2, module2) {
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (val === void 0) return "undefined";
      if (val === null) return "null";
      var type2 = typeof val;
      if (type2 === "boolean") return "boolean";
      if (type2 === "string") return "string";
      if (type2 === "number") return "number";
      if (type2 === "symbol") return "symbol";
      if (type2 === "function") {
        return isGeneratorFn(val) ? "generatorfunction" : "function";
      }
      if (isArray(val)) return "array";
      if (isBuffer(val)) return "buffer";
      if (isArguments(val)) return "arguments";
      if (isDate(val)) return "date";
      if (isError(val)) return "error";
      if (isRegexp(val)) return "regexp";
      switch (ctorName(val)) {
        case "Symbol":
          return "symbol";
        case "Promise":
          return "promise";
        case "WeakMap":
          return "weakmap";
        case "WeakSet":
          return "weakset";
        case "Map":
          return "map";
        case "Set":
          return "set";
        case "Int8Array":
          return "int8array";
        case "Uint8Array":
          return "uint8array";
        case "Uint8ClampedArray":
          return "uint8clampedarray";
        case "Int16Array":
          return "int16array";
        case "Uint16Array":
          return "uint16array";
        case "Int32Array":
          return "int32array";
        case "Uint32Array":
          return "uint32array";
        case "Float32Array":
          return "float32array";
        case "Float64Array":
          return "float64array";
      }
      if (isGeneratorObj(val)) {
        return "generator";
      }
      type2 = toString.call(val);
      switch (type2) {
        case "[object Object]":
          return "object";
        case "[object Map Iterator]":
          return "mapiterator";
        case "[object Set Iterator]":
          return "setiterator";
        case "[object String Iterator]":
          return "stringiterator";
        case "[object Array Iterator]":
          return "arrayiterator";
      }
      return type2.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    function ctorName(val) {
      return typeof val.constructor === "function" ? val.constructor.name : null;
    }
    function isArray(val) {
      if (Array.isArray) return Array.isArray(val);
      return val instanceof Array;
    }
    function isError(val) {
      return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
    }
    function isDate(val) {
      if (val instanceof Date) return true;
      return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
    }
    function isRegexp(val) {
      if (val instanceof RegExp) return true;
      return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
    }
    function isGeneratorFn(name, val) {
      return ctorName(name) === "GeneratorFunction";
    }
    function isGeneratorObj(val) {
      return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
    }
    function isArguments(val) {
      try {
        if (typeof val.length === "number" && typeof val.callee === "function") {
          return true;
        }
      } catch (err) {
        if (err.message.indexOf("callee") !== -1) {
          return true;
        }
      }
      return false;
    }
    function isBuffer(val) {
      if (val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/is-extendable/index.js
var require_is_extendable = __commonJS({
  "node_modules/is-extendable/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isExtendable(val) {
      return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
    };
  }
});

// node_modules/extend-shallow/index.js
var require_extend_shallow = __commonJS({
  "node_modules/extend-shallow/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_is_extendable();
    module2.exports = function extend(o) {
      if (!isObject(o)) {
        o = {};
      }
      var len = arguments.length;
      for (var i2 = 1; i2 < len; i2++) {
        var obj = arguments[i2];
        if (isObject(obj)) {
          assign(o, obj);
        }
      }
      return o;
    };
    function assign(a, b2) {
      for (var key in b2) {
        if (hasOwn(b2, key)) {
          a[key] = b2[key];
        }
      }
    }
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// node_modules/section-matter/index.js
var require_section_matter = __commonJS({
  "node_modules/section-matter/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var extend = require_extend_shallow();
    module2.exports = function(input, options2) {
      if (typeof options2 === "function") {
        options2 = { parse: options2 };
      }
      var file = toObject(input);
      var defaults = { section_delimiter: "---", parse: identity };
      var opts = extend({}, defaults, options2);
      var delim = opts.section_delimiter;
      var lines = file.content.split(/\r?\n/);
      var sections = null;
      var section = createSection();
      var content = [];
      var stack = [];
      function initSections(val) {
        file.content = val;
        sections = [];
        content = [];
      }
      function closeSection(val) {
        if (stack.length) {
          section.key = getKey(stack[0], delim);
          section.content = val;
          opts.parse(section, sections);
          sections.push(section);
          section = createSection();
          content = [];
          stack = [];
        }
      }
      for (var i2 = 0; i2 < lines.length; i2++) {
        var line = lines[i2];
        var len = stack.length;
        var ln = line.trim();
        if (isDelimiter(ln, delim)) {
          if (ln.length === 3 && i2 !== 0) {
            if (len === 0 || len === 2) {
              content.push(line);
              continue;
            }
            stack.push(ln);
            section.data = content.join("\n");
            content = [];
            continue;
          }
          if (sections === null) {
            initSections(content.join("\n"));
          }
          if (len === 2) {
            closeSection(content.join("\n"));
          }
          stack.push(ln);
          continue;
        }
        content.push(line);
      }
      if (sections === null) {
        initSections(content.join("\n"));
      } else {
        closeSection(content.join("\n"));
      }
      file.sections = sections;
      return file;
    };
    function isDelimiter(line, delim) {
      if (line.slice(0, delim.length) !== delim) {
        return false;
      }
      if (line.charAt(delim.length + 1) === delim.slice(-1)) {
        return false;
      }
      return true;
    }
    function toObject(input) {
      if (typeOf(input) !== "object") {
        input = { content: input };
      }
      if (typeof input.content !== "string" && !isBuffer(input.content)) {
        throw new TypeError("expected a buffer or string");
      }
      input.content = input.content.toString();
      input.sections = [];
      return input;
    }
    function getKey(val, delim) {
      return val ? val.slice(delim.length).trim() : "";
    }
    function createSection() {
      return { key: "", data: "", content: "" };
    }
    function identity(val) {
      return val;
    }
    function isBuffer(val) {
      if (val && val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js
var require_common = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
    "use strict";
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence)) return sequence;
      else if (isNothing(sequence)) return [];
      return [sequence];
    }
    function extend(target, source) {
      var index, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
    "use strict";
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString(compact) {
      var result = this.name + ": ";
      result += this.reason || "(unknown reason)";
      if (!compact && this.mark) {
        result += " " + this.mark.toString();
      }
      return result;
    };
    module2.exports = YAMLException;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }
    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;
      if (!this.buffer) return null;
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = "";
      start = this.position;
      while (start > 0 && "\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = " ... ";
          start += 5;
          break;
        }
      }
      tail = "";
      end = this.position;
      while (end < this.buffer.length && "\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = " ... ";
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
    };
    Mark.prototype.toString = function toString(compact) {
      var snippet, where = "";
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ":\n" + snippet;
        }
      }
      return where;
    };
    module2.exports = Mark;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
    "use strict";
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map) {
      var result = {};
      if (map !== null) {
        Object.keys(map).forEach(function(style) {
          map[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag, options2) {
      options2 = options2 || {};
      Object.keys(options2).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
      this.tag = tag;
      this.kind = options2["kind"] || null;
      this.resolve = options2["resolve"] || function() {
        return true;
      };
      this.construct = options2["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options2["instanceOf"] || null;
      this.predicate = options2["predicate"] || null;
      this.represent = options2["represent"] || null;
      this.defaultStyle = options2["defaultStyle"] || null;
      this.styleAliases = compileStyleAliases(options2["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    module2.exports = Type;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name, result) {
      var exclude = [];
      schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
      });
      schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude.push(previousIndex);
          }
        });
        result.push(currentType);
      });
      return result.filter(function(type2, index) {
        return exclude.indexOf(index) === -1;
      });
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;
      function collectType(type2) {
        result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
      }
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function(type2) {
        if (type2.loadKind && type2.loadKind !== "scalar") {
          throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
      });
      this.compiledImplicit = compileList(this, "implicit", []);
      this.compiledExplicit = compileList(this, "explicit", []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
      var schemas, types;
      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types = arguments[0];
          break;
        case 2:
          schemas = arguments[0];
          types = arguments[1];
          break;
        default:
          throw new YAMLException("Wrong number of arguments for Schema.create function");
      }
      schemas = common.toArray(schemas);
      types = common.toArray(types);
      if (!schemas.every(function(schema) {
        return schema instanceof Schema;
      })) {
        throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
      }
      if (!types.every(function(type2) {
        return type2 instanceof Type;
      })) {
        throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      return new Schema({
        include: schemas,
        explicit: types
      });
    };
    module2.exports = Schema;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      explicit: [
        require_str(),
        require_seq(),
        require_map()
      ]
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null) return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null) return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    function isHexCode(c) {
      return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
    }
    function isOctCode(c) {
      return 48 <= c && c <= 55;
    }
    function isDecCode(c) {
      return 48 <= c && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null) return false;
      var max = data.length, index = 0, hasDigits = false, ch;
      if (!max) return false;
      ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max) return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (ch !== "0" && ch !== "1") return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (!isHexCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_") continue;
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "_") return false;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch === ":") break;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_") return false;
      if (ch !== ":") return true;
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0") return 0;
      if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }
      if (value.indexOf(":") !== -1) {
        value.split(":").forEach(function(v2) {
          digits.unshift(parseInt(v2, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d2) {
          value += d2 * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        /* eslint-disable max-len */
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null) return false;
      if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign, base, digits;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      digits = [];
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      } else if (value.indexOf(":") >= 0) {
        value.split(":").forEach(function(v2) {
          digits.unshift(parseFloat(v2, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d2) {
          value += d2 * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_failsafe()
      ],
      implicit: [
        require_null(),
        require_bool(),
        require_int(),
        require_float()
      ]
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_json()
      ]
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null) return false;
      if (YAML_DATE_REGEXP.exec(data) !== null) return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null) throw new Error("Date resolve error");
      year = +match[1];
      month = +match[2] - 1;
      day = +match[3];
      if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match[4];
      minute = +match[5];
      second = +match[6];
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match[9] === "-") delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta) date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
    "use strict";
    var NodeBuffer;
    try {
      _require = __require;
      NodeBuffer = _require("buffer").Buffer;
    } catch (__) {
    }
    var _require;
    var Type = require_type();
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null) return false;
      var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
        if (code > 64) continue;
        if (code < 0) return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      if (NodeBuffer) {
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map[bits >> 18 & 63];
          result += map[bits >> 12 & 63];
          result += map[bits >> 6 & 63];
          result += map[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map[bits >> 18 & 63];
        result += map[bits >> 12 & 63];
        result += map[bits >> 6 & 63];
        result += map[bits & 63];
      } else if (tail === 2) {
        result += map[bits >> 10 & 63];
        result += map[bits >> 4 & 63];
        result += map[bits << 2 & 63];
        result += map[64];
      } else if (tail === 1) {
        result += map[bits >> 2 & 63];
        result += map[bits << 4 & 63];
        result += map[64];
        result += map[64];
      }
      return result;
    }
    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null) return true;
      var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]") return false;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey) pairHasKey = true;
            else return false;
          }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _toString = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null) return true;
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString.call(pair) !== "[object Object]") return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null) return [];
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null) return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null) return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_core()
      ],
      implicit: [
        require_timestamp(),
        require_merge()
      ],
      explicit: [
        require_binary(),
        require_omap(),
        require_pairs(),
        require_set()
      ]
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptUndefined() {
      return true;
    }
    function constructJavascriptUndefined() {
      return void 0;
    }
    function representJavascriptUndefined() {
      return "";
    }
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
      kind: "scalar",
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptRegExp(data) {
      if (data === null) return false;
      if (data.length === 0) return false;
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        if (modifiers.length > 3) return false;
        if (regexp[regexp.length - modifiers.length - 1] !== "/") return false;
      }
      return true;
    }
    function constructJavascriptRegExp(data) {
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }
      return new RegExp(regexp, modifiers);
    }
    function representJavascriptRegExp(object) {
      var result = "/" + object.source + "/";
      if (object.global) result += "g";
      if (object.multiline) result += "m";
      if (object.ignoreCase) result += "i";
      return result;
    }
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
      kind: "scalar",
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
    "use strict";
    var esprima;
    try {
      _require = __require;
      esprima = _require("esprima");
    } catch (_2) {
      if (typeof window !== "undefined") esprima = window.esprima;
    }
    var _require;
    var Type = require_type();
    function resolveJavascriptFunction(data) {
      if (data === null) return false;
      try {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    function constructJavascriptFunction(data) {
      var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
      if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
        throw new Error("Failed to resolve function");
      }
      ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
      });
      body = ast.body[0].expression.body.range;
      if (ast.body[0].expression.body.type === "BlockStatement") {
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      return new Function(params, "return " + source.slice(body[0], body[1]));
    }
    function representJavascriptFunction(object) {
      return object.toString();
    }
    function isFunction(object) {
      return Object.prototype.toString.call(object) === "[object Function]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/function", {
      kind: "scalar",
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction,
      represent: representJavascriptFunction
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = Schema.DEFAULT = new Schema({
      include: [
        require_default_safe()
      ],
      explicit: [
        require_undefined(),
        require_regexp(),
        require_function()
      ]
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Mark = require_mark();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c) {
      return c === 10 || c === 13;
    }
    function is_WHITE_SPACE(c) {
      return c === 9 || c === 32;
    }
    function is_WS_OR_EOL(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function is_FLOW_INDICATOR(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      var lc;
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      lc = c | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "" : c === 95 ? " " : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode(
        (c - 65536 >> 10) + 55296,
        (c - 65536 & 1023) + 56320
      );
    }
    function setProperty(object, key, value) {
      if (key === "__proto__") {
        Object.defineProperty(object, key, {
          configurable: true,
          enumerable: true,
          writable: true,
          value
        });
      } else {
        object[key] = value;
      }
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (i2 = 0; i2 < 256; i2++) {
      simpleEscapeCheck[i2] = simpleEscapeSequence(i2) ? 1 : 0;
      simpleEscapeMap[i2] = simpleEscapeSequence(i2);
    }
    var i2;
    function State(input, options2) {
      this.input = input;
      this.filename = options2["filename"] || null;
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.onWarning = options2["onWarning"] || null;
      this.legacy = options2["legacy"] || false;
      this.json = options2["json"] || false;
      this.listener = options2["listener"] || null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.documents = [];
    }
    function generateError(state, message) {
      return new YAMLException(
        message,
        new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
      );
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      sourceKeys = Object.keys(source);
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
          setProperty(destination, key, source[key]);
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        setProperty(_result, keyNode, valueNode);
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        _pos = state.position;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else {
          break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33) return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38) return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42) return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type2, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
          if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
          }
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type2 = state.implicitTypes[typeIndex];
            if (type2.resolve(state.result)) {
              state.result = type2.construct(state.result);
              state.tag = type2.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type2 = state.typeMap[state.kind || "fallback"][state.tag];
          if (state.result !== null && type2.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
          }
          if (!type2.resolve(state.result)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
          } else {
            state.result = type2.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch)) break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options2) {
      input = String(input);
      options2 = options2 || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State(input, options2);
      var nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options2) {
      if (iterator !== null && typeof iterator === "object" && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      var documents = loadDocuments(input, options2);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (var index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
    function load(input, options2) {
      var documents = loadDocuments(input, options2);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException("expected a single document in the stream, but found more");
    }
    function safeLoadAll(input, iterator, options2) {
      if (typeof iterator === "object" && iterator !== null && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    function safeLoad(input, options2) {
      return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load;
    module2.exports.safeLoadAll = safeLoadAll;
    module2.exports.safeLoad = safeLoad;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    function compileStyleMap(schema, map) {
      var result, keys, index, length, tag, style, type2;
      if (map === null) return {};
      result = {};
      keys = Object.keys(map);
      for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type2 = schema.compiledTypeMap["fallback"][tag];
        if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
          style = type2.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    function State(options2) {
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.indent = Math.max(1, options2["indent"] || 2);
      this.noArrayIndent = options2["noArrayIndent"] || false;
      this.skipInvalid = options2["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options2["flowLevel"]) ? -1 : options2["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options2["styles"] || null);
      this.sortKeys = options2["sortKeys"] || false;
      this.lineWidth = options2["lineWidth"] || 80;
      this.noRefs = options2["noRefs"] || false;
      this.noCompatMode = options2["noCompatMode"] || false;
      this.condenseFlow = options2["condenseFlow"] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str2) {
      var index, length, type2;
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type2 = state.implicitTypes[index];
        if (type2.resolve(str2)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
    }
    function isNsChar(c) {
      return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    }
    function isPlainSafe(c, prev) {
      return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
    }
    function isPlainSafeFirst(c) {
      return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
      var i2;
      var char, prev_char;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
      if (singleLineOnly) {
        for (i2 = 0; i2 < string.length; i2++) {
          char = string.charCodeAt(i2);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i2 > 0 ? string.charCodeAt(i2 - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
      } else {
        for (i2 = 0; i2 < string.length; i2++) {
          char = string.charCodeAt(i2);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
              i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i2;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i2 > 0 ? string.charCodeAt(i2 - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i2 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    function writeScalar(state, string, level, iskey) {
      state.dump = function() {
        if (string.length === 0) {
          return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
          return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      }();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      }();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match;
      while (match = lineRe.exec(string)) {
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ") return line;
      var breakRe = / [^ ]/g;
      var match;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match = breakRe.exec(line)) {
        next = match.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char, nextChar;
      var escapeSeq;
      for (var i2 = 0; i2 < string.length; i2++) {
        char = string.charCodeAt(i2);
        if (char >= 55296 && char <= 56319) {
          nextChar = string.charCodeAt(i2 + 1);
          if (nextChar >= 56320 && nextChar <= 57343) {
            result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
            i2++;
            continue;
          }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i2] : escapeSeq || encodeHex(char);
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level, object[index], false, false)) {
          if (index !== 0) _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level + 1, object[index], true, true)) {
          if (!compact || index !== 0) {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (index !== 0) pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (!compact || index !== 0) {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type2, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type2 = typeList[index];
        if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
          state.tag = explicit ? type2.tag : "?";
          if (type2.represent) {
            style = state.styleMap[type2.tag] || type2.defaultStyle;
            if (_toString.call(type2.represent) === "[object Function]") {
              _result = type2.represent(object, style);
            } else if (_hasOwnProperty.call(type2.represent, style)) {
              _result = type2.represent[style](object, style);
            } else {
              throw new YAMLException("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block, compact, iskey) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type2 = _toString.call(state.dump);
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type2 === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type2 === "[object Array]") {
          var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
          if (block && state.dump.length !== 0) {
            writeBlockSequence(state, arrayLevel, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, arrayLevel, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type2 === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey);
          }
        } else {
          if (state.skipInvalid) return false;
          throw new YAMLException("unacceptable kind of an object to dump " + type2);
        }
        if (state.tag !== null && state.tag !== "?") {
          state.dump = "!<" + state.tag + "> " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index, length;
      if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options2) {
      options2 = options2 || {};
      var state = new State(options2);
      if (!state.noRefs) getDuplicateReferences(input, state);
      if (writeNode(state, 0, input, true, true)) return state.dump + "\n";
      return "";
    }
    function safeDump(input, options2) {
      return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.dump = dump;
    module2.exports.safeDump = safeDump;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
    "use strict";
    var loader = require_loader();
    var dumper = require_dumper();
    function deprecated(name) {
      return function() {
        throw new Error("Function " + name + " is deprecated and cannot be used.");
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json();
    module2.exports.CORE_SCHEMA = require_core();
    module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.safeLoad = loader.safeLoad;
    module2.exports.safeLoadAll = loader.safeLoadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.safeDump = dumper.safeDump;
    module2.exports.YAMLException = require_exception();
    module2.exports.MINIMAL_SCHEMA = require_failsafe();
    module2.exports.SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_SCHEMA = require_default_full();
    module2.exports.scan = deprecated("scan");
    module2.exports.parse = deprecated("parse");
    module2.exports.compose = deprecated("compose");
    module2.exports.addConstructor = deprecated("addConstructor");
  }
});

// node_modules/gray-matter/node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/index.js"(exports2, module2) {
    "use strict";
    var yaml2 = require_js_yaml();
    module2.exports = yaml2;
  }
});

// node_modules/gray-matter/lib/engines.js
var require_engines = __commonJS({
  "node_modules/gray-matter/lib/engines.js"(exports, module) {
    "use strict";
    var yaml = require_js_yaml2();
    var engines = exports = module.exports;
    engines.yaml = {
      parse: yaml.safeLoad.bind(yaml),
      stringify: yaml.safeDump.bind(yaml)
    };
    engines.json = {
      parse: JSON.parse.bind(JSON),
      stringify: function(obj, options2) {
        const opts = Object.assign({ replacer: null, space: 2 }, options2);
        return JSON.stringify(obj, opts.replacer, opts.space);
      }
    };
    engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          if (wrap !== false) {
            str = "(function() {\nreturn " + str.trim() + ";\n}());";
          }
          return eval(str) || {};
        } catch (err) {
          if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
            return parse(str, options, false);
          }
          throw new SyntaxError(err);
        }
      },
      stringify: function() {
        throw new Error("stringifying JavaScript is not supported");
      }
    };
  }
});

// node_modules/strip-bom-string/index.js
var require_strip_bom_string = __commonJS({
  "node_modules/strip-bom-string/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str2) {
      if (typeof str2 === "string" && str2.charAt(0) === "\uFEFF") {
        return str2.slice(1);
      }
      return str2;
    };
  }
});

// node_modules/gray-matter/lib/utils.js
var require_utils = __commonJS({
  "node_modules/gray-matter/lib/utils.js"(exports2) {
    "use strict";
    var stripBom = require_strip_bom_string();
    var typeOf = require_kind_of();
    exports2.define = function(obj, key, val) {
      Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
      });
    };
    exports2.isBuffer = function(val) {
      return typeOf(val) === "buffer";
    };
    exports2.isObject = function(val) {
      return typeOf(val) === "object";
    };
    exports2.toBuffer = function(input) {
      return typeof input === "string" ? Buffer.from(input) : input;
    };
    exports2.toString = function(input) {
      if (exports2.isBuffer(input)) return stripBom(String(input));
      if (typeof input !== "string") {
        throw new TypeError("expected input to be a string or buffer");
      }
      return stripBom(input);
    };
    exports2.arrayify = function(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    exports2.startsWith = function(str2, substr, len) {
      if (typeof len !== "number") len = substr.length;
      return str2.slice(0, len) === substr;
    };
  }
});

// node_modules/gray-matter/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/gray-matter/lib/defaults.js"(exports2, module2) {
    "use strict";
    var engines2 = require_engines();
    var utils = require_utils();
    module2.exports = function(options2) {
      const opts = Object.assign({}, options2);
      opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
      if (opts.delimiters.length === 1) {
        opts.delimiters.push(opts.delimiters[0]);
      }
      opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
      opts.engines = Object.assign({}, engines2, opts.parsers, opts.engines);
      return opts;
    };
  }
});

// node_modules/gray-matter/lib/engine.js
var require_engine = __commonJS({
  "node_modules/gray-matter/lib/engine.js"(exports2, module2) {
    "use strict";
    module2.exports = function(name, options2) {
      let engine = options2.engines[name] || options2.engines[aliase(name)];
      if (typeof engine === "undefined") {
        throw new Error('gray-matter engine "' + name + '" is not registered');
      }
      if (typeof engine === "function") {
        engine = { parse: engine };
      }
      return engine;
    };
    function aliase(name) {
      switch (name.toLowerCase()) {
        case "js":
        case "javascript":
          return "javascript";
        case "coffee":
        case "coffeescript":
        case "cson":
          return "coffee";
        case "yaml":
        case "yml":
          return "yaml";
        default: {
          return name;
        }
      }
    }
  }
});

// node_modules/gray-matter/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/gray-matter/lib/stringify.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(file, data, options2) {
      if (data == null && options2 == null) {
        switch (typeOf(file)) {
          case "object":
            data = file.data;
            options2 = {};
            break;
          case "string":
            return file;
          default: {
            throw new TypeError("expected file to be a string or object");
          }
        }
      }
      const str2 = file.content;
      const opts = defaults(options2);
      if (data == null) {
        if (!opts.data) return file;
        data = opts.data;
      }
      const language = file.language || opts.language;
      const engine = getEngine(language, opts);
      if (typeof engine.stringify !== "function") {
        throw new TypeError('expected "' + language + '.stringify" to be a function');
      }
      data = Object.assign({}, file.data, data);
      const open = opts.delimiters[0];
      const close = opts.delimiters[1];
      const matter7 = engine.stringify(data, options2).trim();
      let buf = "";
      if (matter7 !== "{}") {
        buf = newline(open) + newline(matter7) + newline(close);
      }
      if (typeof file.excerpt === "string" && file.excerpt !== "") {
        if (str2.indexOf(file.excerpt.trim()) === -1) {
          buf += newline(file.excerpt) + newline(close);
        }
      }
      return buf + newline(str2);
    };
    function newline(str2) {
      return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
    }
  }
});

// node_modules/gray-matter/lib/excerpt.js
var require_excerpt = __commonJS({
  "node_modules/gray-matter/lib/excerpt.js"(exports2, module2) {
    "use strict";
    var defaults = require_defaults();
    module2.exports = function(file, options2) {
      const opts = defaults(options2);
      if (file.data == null) {
        file.data = {};
      }
      if (typeof opts.excerpt === "function") {
        return opts.excerpt(file, opts);
      }
      const sep2 = file.data.excerpt_separator || opts.excerpt_separator;
      if (sep2 == null && (opts.excerpt === false || opts.excerpt == null)) {
        return file;
      }
      const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep2 || opts.delimiters[0];
      const idx = file.content.indexOf(delimiter);
      if (idx !== -1) {
        file.excerpt = file.content.slice(0, idx);
      }
      return file;
    };
  }
});

// node_modules/gray-matter/lib/to-file.js
var require_to_file = __commonJS({
  "node_modules/gray-matter/lib/to-file.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var stringify = require_stringify();
    var utils = require_utils();
    module2.exports = function(file) {
      if (typeOf(file) !== "object") {
        file = { content: file };
      }
      if (typeOf(file.data) !== "object") {
        file.data = {};
      }
      if (file.contents && file.content == null) {
        file.content = file.contents;
      }
      utils.define(file, "orig", utils.toBuffer(file.content));
      utils.define(file, "language", file.language || "");
      utils.define(file, "matter", file.matter || "");
      utils.define(file, "stringify", function(data, options2) {
        if (options2 && options2.language) {
          file.language = options2.language;
        }
        return stringify(file, data, options2);
      });
      file.content = utils.toString(file.content);
      file.isEmpty = false;
      file.excerpt = "";
      return file;
    };
  }
});

// node_modules/gray-matter/lib/parse.js
var require_parse = __commonJS({
  "node_modules/gray-matter/lib/parse.js"(exports2, module2) {
    "use strict";
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(language, str2, options2) {
      const opts = defaults(options2);
      const engine = getEngine(language, opts);
      if (typeof engine.parse !== "function") {
        throw new TypeError('expected "' + language + '.parse" to be a function');
      }
      return engine.parse(str2, opts);
    };
  }
});

// node_modules/gray-matter/index.js
var require_gray_matter = __commonJS({
  "node_modules/gray-matter/index.js"(exports2, module2) {
    "use strict";
    var fs = require_fs();
    var sections = require_section_matter();
    var defaults = require_defaults();
    var stringify = require_stringify();
    var excerpt = require_excerpt();
    var engines2 = require_engines();
    var toFile = require_to_file();
    var parse2 = require_parse();
    var utils = require_utils();
    function matter7(input, options2) {
      if (input === "") {
        return { data: {}, content: input, excerpt: "", orig: input };
      }
      let file = toFile(input);
      const cached = matter7.cache[file.content];
      if (!options2) {
        if (cached) {
          file = Object.assign({}, cached);
          file.orig = cached.orig;
          return file;
        }
        matter7.cache[file.content] = file;
      }
      return parseMatter(file, options2);
    }
    function parseMatter(file, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      const close = "\n" + opts.delimiters[1];
      let str2 = file.content;
      if (opts.language) {
        file.language = opts.language;
      }
      const openLen = open.length;
      if (!utils.startsWith(str2, open, openLen)) {
        excerpt(file, opts);
        return file;
      }
      if (str2.charAt(openLen) === open.slice(-1)) {
        return file;
      }
      str2 = str2.slice(openLen);
      const len = str2.length;
      const language = matter7.language(str2, opts);
      if (language.name) {
        file.language = language.name;
        str2 = str2.slice(language.raw.length);
      }
      let closeIndex = str2.indexOf(close);
      if (closeIndex === -1) {
        closeIndex = len;
      }
      file.matter = str2.slice(0, closeIndex);
      const block = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
      if (block === "") {
        file.isEmpty = true;
        file.empty = file.content;
        file.data = {};
      } else {
        file.data = parse2(file.language, file.matter, opts);
      }
      if (closeIndex === len) {
        file.content = "";
      } else {
        file.content = str2.slice(closeIndex + close.length);
        if (file.content[0] === "\r") {
          file.content = file.content.slice(1);
        }
        if (file.content[0] === "\n") {
          file.content = file.content.slice(1);
        }
      }
      excerpt(file, opts);
      if (opts.sections === true || typeof opts.section === "function") {
        sections(file, opts.section);
      }
      return file;
    }
    matter7.engines = engines2;
    matter7.stringify = function(file, data, options2) {
      if (typeof file === "string") file = matter7(file, options2);
      return stringify(file, data, options2);
    };
    matter7.read = function(filepath, options2) {
      const str2 = fs.readFileSync(filepath, "utf8");
      const file = matter7(str2, options2);
      file.path = filepath;
      return file;
    };
    matter7.test = function(str2, options2) {
      return utils.startsWith(str2, defaults(options2).delimiters[0]);
    };
    matter7.language = function(str2, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      if (matter7.test(str2)) {
        str2 = str2.slice(open.length);
      }
      const language = str2.slice(0, str2.search(/\r?\n/));
      return {
        raw: language,
        name: language ? language.trim() : ""
      };
    };
    matter7.cache = {};
    matter7.clearCache = function() {
      matter7.cache = {};
    };
    module2.exports = matter7;
  }
});

// node_modules/tinyglobby/node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "node_modules/tinyglobby/node_modules/picomatch/lib/constants.js"(exports2, module2) {
    "use strict";
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var SEP = "/";
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
      SEP
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
      SEP: "\\"
    };
    var POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars2) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars2.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/tinyglobby/node_modules/picomatch/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/tinyglobby/node_modules/picomatch/lib/utils.js"(exports2) {
    "use strict";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports2.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports2.hasRegexChars = (str2) => REGEX_SPECIAL_CHARS.test(str2);
    exports2.isRegexChar = (str2) => str2.length === 1 && exports2.hasRegexChars(str2);
    exports2.escapeRegex = (str2) => str2.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports2.toPosixSlashes = (str2) => str2.replace(REGEX_BACKSLASH, "/");
    exports2.isWindows = () => {
      if (typeof navigator !== "undefined" && navigator.platform) {
        const platform = navigator.platform.toLowerCase();
        return platform === "win32" || platform === "windows";
      }
      if (typeof process !== "undefined" && process.platform) {
        return process.platform === "win32";
      }
      return false;
    };
    exports2.removeBackslashes = (str2) => {
      return str2.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports2.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports2.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports2.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports2.wrapOutput = (input, state = {}, options2 = {}) => {
      const prepend = options2.contains ? "" : "^";
      const append = options2.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
    exports2.basename = (path2, { windows } = {}) => {
      const segs = path2.split(windows ? /[\\/]/ : "/");
      const last = segs[segs.length - 1];
      if (last === "") {
        return segs[segs.length - 2];
      }
      return last;
    };
  }
});

// node_modules/tinyglobby/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/tinyglobby/node_modules/picomatch/lib/scan.js"(exports2, module2) {
    "use strict";
    var utils = require_utils2();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options2) => {
      const opts = options2 || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str2 = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str2.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str2.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str2;
      let prefix = "";
      let glob2 = "";
      if (start > 0) {
        prefix = str2.slice(0, start);
        str2 = str2.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str2.slice(0, lastIndex);
        glob2 = str2.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob2 = str2;
      } else {
        base = str2;
      }
      if (base && base !== "" && base !== "/" && base !== str2) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob2) glob2 = utils.removeBackslashes(glob2);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob: glob2,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i2 = slashes[idx];
          const value = input.slice(n, i2);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i2;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// node_modules/tinyglobby/node_modules/picomatch/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/tinyglobby/node_modules/picomatch/lib/parse.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils2();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options2) => {
      if (typeof options2.expandRange === "function") {
        return options2.expandRange(...args, options2);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v2) => utils.escapeRegex(v2)).join("..");
      }
      return value;
    };
    var syntaxError = (type2, char) => {
      return `Missing ${type2}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse2 = (input, options2) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options2 };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const PLATFORM_CHARS = constants.globChars(opts.windows);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type2) => {
        state[type2]++;
        stack.push(type2);
      };
      const decrement = (type2) => {
        state[type2]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.output = (prev.output || prev.value) + tok.value;
          prev.value += tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type2, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type: type2, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse2(rest, { ...options2, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m2, esc, chars2, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m2;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars2.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars2.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m2 : `\\${m2}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m2) => {
              return m2.length % 2 === 0 ? "\\\\" : m2 ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options2);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix3 = POSIX_REGEX_SOURCE[rest2];
                if (posix3) {
                  prev.value = pre + posix3;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i2 = arr.length - 1; i2 >= 0; i2--) {
              tokens.pop();
              if (arr[i2].type === "brace") {
                break;
              }
              if (arr[i2].type !== "dots") {
                range.unshift(arr[i2].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse2.fastpaths = (input, options2) => {
      const opts = { ...options2 };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(opts.windows);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str2) => {
        switch (str2) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str2);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse2;
  }
});

// node_modules/tinyglobby/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/tinyglobby/node_modules/picomatch/lib/picomatch.js"(exports2, module2) {
    "use strict";
    var scan = require_scan();
    var parse2 = require_parse2();
    var utils = require_utils2();
    var constants = require_constants();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch2 = (glob2, options2, returnState = false) => {
      if (Array.isArray(glob2)) {
        const fns = glob2.map((input) => picomatch2(input, options2, returnState));
        const arrayMatcher = (str2) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str2);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob2) && glob2.tokens && glob2.input;
      if (glob2 === "" || typeof glob2 !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options2 || {};
      const posix3 = opts.windows;
      const regex = isState ? picomatch2.compileRe(glob2, options2) : picomatch2.makeRe(glob2, options2, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options2, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch2(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch2.test(input, regex, options2, { glob: glob2, posix: posix3 });
        const result = { glob: glob2, state, regex, posix: posix3, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch2.test = (input, regex, options2, { glob: glob2, posix: posix3 } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options2 || {};
      const format = opts.format || (posix3 ? utils.toPosixSlashes : null);
      let match = input === glob2;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob2;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch2.matchBase(input, regex, options2, posix3);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch2.matchBase = (input, glob2, options2) => {
      const regex = glob2 instanceof RegExp ? glob2 : picomatch2.makeRe(glob2, options2);
      return regex.test(utils.basename(input));
    };
    picomatch2.isMatch = (str2, patterns, options2) => picomatch2(patterns, options2)(str2);
    picomatch2.parse = (pattern, options2) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch2.parse(p, options2));
      return parse2(pattern, { ...options2, fastpaths: false });
    };
    picomatch2.scan = (input, options2) => scan(input, options2);
    picomatch2.compileRe = (state, options2, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options2 || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch2.toRegex(source, options2);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch2.makeRe = (input, options2 = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options2.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse2.fastpaths(input, options2);
      }
      if (!parsed.output) {
        parsed = parse2(input, options2);
      }
      return picomatch2.compileRe(parsed, options2, returnOutput, returnState);
    };
    picomatch2.toRegex = (source, options2) => {
      try {
        const opts = options2 || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options2 && options2.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch2.constants = constants;
    module2.exports = picomatch2;
  }
});

// node_modules/tinyglobby/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/tinyglobby/node_modules/picomatch/index.js"(exports2, module2) {
    "use strict";
    var pico = require_picomatch();
    var utils = require_utils2();
    function picomatch2(glob2, options2, returnState = false) {
      if (options2 && (options2.windows === null || options2.windows === void 0)) {
        options2 = { ...options2, windows: utils.isWindows() };
      }
      return pico(glob2, options2, returnState);
    }
    Object.assign(picomatch2, pico);
    module2.exports = picomatch2;
  }
});

// node_modules/vitepress-theme-teek/es/markdown/plugins/todo.mjs
var todoUncheck = "[ ] ";
var todoCheck = "[x] ";
var todoPlugin = (md) => {
  md.renderer.rules.list_item_open = (tokens, idx, options2, _2, self) => {
    for (let i2 = idx + 1; i2 < tokens.length; i2++) {
      const token = tokens[i2];
      if (token.type === "list_item_close") break;
      const content = token.content;
      if ((content == null ? void 0 : content.startsWith(todoUncheck)) || (content == null ? void 0 : content.startsWith(todoCheck))) {
        const isChecked = content.startsWith(todoCheck);
        const checkbox = `<input class="todo-checkbox" type="checkbox" ${isChecked ? "checked" : ""} disabled />`;
        token.content = content.slice(4);
        if (token.children) token.children[0].content = token.children[0].content.slice(4);
        return `<li class="todo">${checkbox}`;
      }
    }
    return self.renderToken(tokens, idx, options2);
  };
};

// node_modules/vitepress-theme-teek/es/markdown/plugins/container.mjs
var containerPlugin = (md, containerLabel) => {
  const markdownContainer = [
    { type: "center", useTitle: false, className: `tk-center-container` },
    { type: "right", useTitle: false, className: `tk-right-container` },
    { type: "note", useTitle: true, defaultTitle: (containerLabel == null ? void 0 : containerLabel.noteLabel) || "NOTE", className: `custom-block` }
  ];
  createContainersThenUse(md, markdownContainer);
};

// node_modules/vitepress-theme-teek/es/markdown/plugins/shareCard.mjs
var rootClass = "share-card";
var shareCardPlugin = (md) => {
  const siteConfig = globalThis.VITEPRESS_CONFIG;
  const { base = "/" } = siteConfig.userConfig;
  createCardContainer(md, {
    type: "shareCard",
    className: `container ${rootClass}-container`,
    htmlRender: (props, info5) => renderShareCard(props, info5, base),
    afterHtmlRender: (props, _2, tokens, idx) => {
      if (props.config.showCode !== true) {
        tokens[idx].type = "";
        tokens[idx].tag = "";
        tokens[idx].hidden = true;
      }
    }
  });
};
var renderShareCard = (shareCard, info5, base) => {
  const { data = [], config = {} } = shareCard;
  if (!data.length) return "";
  const { cardNum = "auto", cardGap = 20, target = "_blank" } = config;
  const cardNumValue = info5 || cardNum + "";
  let num = 4;
  if (cardNumValue && isStringNumber(cardNumValue)) {
    const value = Number(cardNumValue);
    if (value >= 1 && value <= 4) num = value;
  }
  const index = cardNumValue === "auto" ? "auto" : num;
  return `
    <div
        class="${rootClass} index-${index}"
        style="--row-gap: ${cardGap}px; --column-gap: ${cardGap}px; --column-min-width: calc(100% / ${num} - ${cardGap * (num - 1)}px);"
    >
      ${data.map(
    (card) => `
            <${card.link ? "a" : "span"}
              href="${withBase(base, card.link)}" target=${target}
              class="${rootClass}__item ${num ? `row-${num}` : ""}"
              style="--item-bg-color: ${card.bgColor || "var(--vp-c-gray-1)"}; --item-text-color: ${card.textColor || "var(--vp-c-text-1)"};"
             >
              ${card.avatar ? `<div class="${rootClass}__item__img skeleton-image">
                      <img src="${withBase(base, card.avatar)}" alt="${card.name}" class="no-preview" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')">
                     </div>` : ""}
              <div class="${rootClass}__item__content">
                <p class="name">${card.name}</p>
                <p class="desc">${card.desc}</p>
              </div>
            </${card.link ? "a" : "span"}>
          `
  ).join("")}
    </div>
  `;
};

// node_modules/vitepress-theme-teek/es/markdown/plugins/imgCard.mjs
var rootClass2 = "img-card";
var imgCardPlugin = (md) => {
  const siteConfig = globalThis.VITEPRESS_CONFIG;
  const { base = "/" } = siteConfig.userConfig;
  createCardContainer(md, {
    type: "imgCard",
    className: `container ${rootClass2}-container`,
    htmlRender: (props, info5) => renderImgCard(props, info5, base),
    afterHtmlRender: (props, _2, tokens, idx) => {
      if (props.config.showCode !== true) {
        tokens[idx].type = "";
        tokens[idx].tag = "";
        tokens[idx].hidden = true;
      }
    }
  });
};
var renderImgCard = (imgCard, info5, base) => {
  const { data = [], config = {} } = imgCard;
  if (!data.length) return "";
  const {
    cardNum = "auto",
    cardGap = 20,
    lineClamp = 2,
    target = "_blank",
    objectFit = "cover",
    imgHeight = "auto"
  } = config;
  const cardNumValue = info5 || cardNum + "";
  let num = 4;
  if (cardNumValue && isStringNumber(cardNumValue)) {
    const value = Number(cardNumValue);
    if (value >= 1 && value <= 4) num = value;
  }
  const index = cardNumValue === "auto" ? "auto" : num;
  return `
    <div
      class="${rootClass2} index-${index}"
      style="--row-gap: ${cardGap}px; --column-gap: ${cardGap}px; --column-min-width: calc(100% / ${num} - ${cardGap * (num - 1)}px);"
    >
      ${data.map(
    (card) => `
            <${card.link ? "a" : "span"}
              href="${withBase(base, card.link)}"
              target="${target}"
              class="${rootClass2}__item ${num ? `row-${num}` : ""}"
              style="--img-height: ${imgHeight}; --img-object-fit: ${objectFit}; --desc-line-clamp: ${lineClamp}"
            >
              <div class="${rootClass2}__item__img skeleton-image">
                <img src="${withBase(base, card.img)}" class="no-preview" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')">
              </div>
              <div class="${rootClass2}__item__info">
                  <p class="name">${card.name}</p>
                  ${card.desc ? `<p class="desc">${card.desc}</p>` : ""}
              </div>
              ${card.avatar || card.author ? `<div class="${rootClass2}__item__footer">
                      ${card.avatar ? `<img src="${withBase(base, card.avatar)}">` : ""}
                      ${card.author ? `<span>${card.author}</span>` : ""}
                    </div>` : ""}
            </${card.link ? "a" : "span"}>
          `
  ).join("")}
    </div>
  `;
};

// node_modules/vitepress-theme-teek/es/markdown/plugins/navCard.mjs
var rootClass3 = "nav-card";
var navCardPlugin = (md) => {
  const siteConfig = globalThis.VITEPRESS_CONFIG;
  const { base = "/" } = siteConfig.userConfig;
  createCardContainer(md, {
    type: "navCard",
    className: `container ${rootClass3}-container`,
    htmlRender: (props, info5) => getNavCardHtml(props, info5, base),
    afterHtmlRender: (props, _2, tokens, idx) => {
      if (props.config.showCode !== true) {
        tokens[idx].type = "";
        tokens[idx].tag = "";
        tokens[idx].hidden = true;
      }
    }
  });
};
var getNavCardHtml = (navCard, info5, base) => {
  const { data = [], config = {} } = navCard;
  if (!data.length) return "";
  const { cardNum = "auto", cardGap = 20, lineClamp = 2, target = "_blank" } = config;
  const cardNumValue = info5 || cardNum + "";
  let num = 4;
  if (cardNumValue && isStringNumber(cardNumValue)) {
    const value = Number(cardNumValue);
    if (value >= 1 && value <= 4) num = value;
  }
  const index = cardNumValue === "auto" ? "auto" : num;
  return `
    <div
      class="${rootClass3} index-${index}"
      style="--row-gap: ${cardGap}px; --column-gap: ${cardGap}px; --column-min-width: calc(100% / ${num} - ${cardGap * (num - 1)}px);"
    >
      ${data.map(
    (card) => `
            <${card.link ? "a" : "span"}
              href="${card.link}" target="${target}"
              class="${rootClass3}__item ${num ? `row-${num}` : ""}"
              style="--desc-line-clamp: ${lineClamp}"
            >
              <div class="${rootClass3}__item__info">
                  ${card.img ? `<div class="${rootClass3}__item__img skeleton-image">
                          <img src="${withBase(base, card.img)}" class="no-preview" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')">
                         </div>` : ""}
                <span class="name">${card.name}</span>
              </div>

              <p class="desc">${card.desc}</p>
              ${card.badge ? `<span class="VPBadge ${card.badgeType || "info"} badge">${card.badge}</span>` : ""}
            </${card.link ? "a" : "span"}>
        `
  ).join("")}
      </div>`;
};

// node_modules/vitepress-theme-teek/es/markdown/plugins/demo.mjs
var import_fs = __toESM(require_fs(), 1);
var import_path = __toESM(require_path(), 1);
var demoPlugin = (md, option = {}) => {
  const siteConfig = globalThis.VITEPRESS_CONFIG;
  const srcDir = siteConfig.srcDir;
  const path2 = "examples";
  const demoPath = (0, import_path.join)(srcDir, path2);
  const options2 = {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const desc = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        let description = desc && desc.length > 1 ? desc[1].trim() : "";
        const effect = description.startsWith("effect");
        if (effect) description = description.replace("effect", "").trim();
        const sourceFileToken = tokens[idx + 2];
        const yamlToken = tokens[idx + 1];
        const { sourceFile, effectPath, sourceFileExtension } = getDemoFile(sourceFileToken, yamlToken);
        let source = "";
        if (sourceFile) source = (0, import_fs.readFileSync)((0, import_path.resolve)(demoPath, sourceFile), "utf-8");
        if (!source) throw new Error(`Incorrect source file path: ${sourceFile}`);
        return `<TkDemoCode effect="${effect}" source="${encodeURIComponent(
          md.render(`\`\`\` ${sourceFileExtension}
${source}
\`\`\``)
        )}" path="${import_path.posix.join(path2, effectPath)}" raw-source="${encodeURIComponent(
          source
        )}" description="${encodeURIComponent(md.render(description))}" options="${encodeURIComponent(JSON.stringify(option))}">`;
      } else return "</TkDemoCode>";
    }
  };
  md.use(container_plugin, "demo", options2);
};
var getDemoFile = (sourceFileToken, yamlToken) => {
  var _a;
  let sourceFile = "";
  let effectPath = "";
  if (["yaml", "yml"].includes(yamlToken.info)) {
    const yamlContent = jsYaml.load(yamlToken.content.trim());
    effectPath = yamlContent.effect || yamlContent.file || "";
    sourceFile = yamlContent.file || yamlContent.effect || "";
  } else {
    sourceFile = ((_a = sourceFileToken.children) == null ? void 0 : _a[0].content) ?? "";
    effectPath = sourceFile;
  }
  sourceFile = sourceFile ? sourceFile.includes(".") ? sourceFile : `${sourceFile.replace(/.vue$/, "")}.vue` : "";
  effectPath = effectPath ? `${effectPath.replace(/.vue$/, "")}.vue` : "";
  const sourceFileExtension = sourceFile.includes(".") ? sourceFile.split(".").pop() : "vue";
  return { sourceFile, effectPath, sourceFileExtension };
};

// node_modules/vitepress-theme-teek/es/markdown/plugins/video.mjs
var type = "video";
var videoPlugin = (md) => {
  md.use(container_plugin, type, {});
  md.renderer.rules[`container_${type}_open`] = (tokens, idx) => {
    const containerToken = tokens[idx];
    const info5 = containerToken.info.trim().slice(type.length).trim();
    const contentToken = tokens[idx + 2];
    const content = contentToken.content.trim() || "";
    const video = info5 ? videoMap[info5] : { src: () => content, title: "Custom video player" };
    contentToken.type = "";
    contentToken.tag = "";
    contentToken.hidden = true;
    return `<div class="${`${type}-container`}">
      <iframe
        class="video-iframe"
        loading="lazy"
        src="${video.src(content)}"
        title="${video.title}"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
        allowfullscreen="true"
      />
    `;
  };
};
var videoMap = {
  bilibili: {
    src: (id) => `https://player.bilibili.com/player.html?bvid=${id}&autoplay=0`,
    title: "Bilibili video player"
  },
  tencent: {
    src: (id) => `https://v.qq.com/txp/iframe/player.html?vid=${id}`,
    title: "Tencent Video player"
  },
  youku: {
    src: (id) => `https://player.youku.com/embed/${id}`,
    title: "Youku video player"
  },
  youtube: {
    src: (id) => `https://www.youtube-nocookie.com/embed/${id}`,
    title: "YouTube video player"
  },
  vimeo: {
    src: (id) => `https://player.vimeo.com/video/${id}`,
    title: "Vimeo video player"
  },
  xigua: {
    src: (id) => `https://www.ixigua.com/iframe/${id}`,
    title: "XiGua video player"
  }
};

// node_modules/vitepress-plugin-sidebar-resolve/dist/index.mjs
var import_node_path2 = __toESM(require_node_path(), 1);
var import_node_fs2 = __toESM(require_node_fs(), 1);
var import_gray_matter = __toESM(require_gray_matter(), 1);

// node_modules/vite/dist/node/index.js
var import_esbuild = __toESM(require_main());
var import_node_fs = __toESM(require_node_fs());

// node_modules/vite/dist/node/runtime.js
var SOURCEMAPPING_URL = "sourceMa";
SOURCEMAPPING_URL += "ppingURL";
var isWindows = typeof process < "u" && process.platform === "win32";
var AsyncFunction = (async function() {
}).constructor;
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i2 = 0; i2 < chars.length; i2++) {
  const c = chars.charCodeAt(i2);
  intToChar[i2] = c, charToInt[c] = i2;
}
var VITE_RUNTIME_SOURCEMAPPING_REGEXP = new RegExp(
  `//# ${SOURCEMAPPING_URL}=data:application/json;base64,(.+)`
);
var retrieveFileHandlers = /* @__PURE__ */ new Set();
var retrieveSourceMapHandlers = /* @__PURE__ */ new Set();
var createExecHandlers = (handlers) => (...args) => {
  for (const handler of handlers) {
    const result = handler(...args);
    if (result) return result;
  }
  return null;
};
var retrieveFileFromHandlers = createExecHandlers(retrieveFileHandlers);
var retrieveSourceMapFromHandlers = createExecHandlers(
  retrieveSourceMapHandlers
);
var originalPrepare = Error.prepareStackTrace;

// node_modules/vite/dist/node/index.js
var import_promises = __toESM(require_promises());
var import_node_path = __toESM(require_node_path());
var import_node_url = __toESM(require_node_url());
var import_node_util = __toESM(require_node_util());
var import_node_perf_hooks = __toESM(require_node_perf_hooks());
var import_node_module = __toESM(require_node_module());
var import_node_crypto = __toESM(require_node_crypto());
var import_tty = __toESM(require_tty());
var import_path2 = __toESM(require_path());
var import_fs2 = __toESM(require_fs());
var import_node_events = __toESM(require_node_events());
var import_node_stream = __toESM(require_node_stream());
var import_node_string_decoder = __toESM(require_node_string_decoder());
var import_node_child_process = __toESM(require_node_child_process());
var import_node_http = __toESM(require_node_http());
var import_node_https = __toESM(require_node_https());
var import_util = __toESM(require_util());
var import_net = __toESM(require_net());
var import_events = __toESM(require_events());
var import_url = __toESM(require_url());
var import_http = __toESM(require_http());
var import_stream = __toESM(require_stream());
var import_os = __toESM(require_os());
var import_child_process = __toESM(require_child_process());
var import_node_os = __toESM(require_node_os());
var import_node_dns = __toESM(require_node_dns());
var import_crypto = __toESM(require_crypto());
var import_module = __toESM(require_module());
var import_node_assert = __toESM(require_node_assert());
var import_node_v8 = __toESM(require_node_v8());
var import_node_worker_threads = __toESM(require_node_worker_threads());
var import_node_buffer = __toESM(require_node_buffer());
var import_querystring = __toESM(require_querystring());
var import_node_readline = __toESM(require_node_readline());
var import_zlib = __toESM(require_zlib());
var import_buffer = __toESM(require_buffer());
var import_https = __toESM(require_https());
var import_tls = __toESM(require_tls());
var import_node_net = __toESM(require_node_net());
var import_assert = __toESM(require_assert());
var import_node_zlib = __toESM(require_node_zlib());

// node_modules/vitepress-plugin-sidebar-resolve/dist/index.mjs
var import_picocolors = __toESM(require_picocolors_browser(), 1);
var import_fs3 = __toESM(require_fs(), 1);
var import_path3 = __toESM(require_path(), 1);
var getTitleFromMarkdown = (mdContent) => {
  const lines = mdContent.trimStart().split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith("# ")) {
      return line.substring(2).trim();
    }
  }
  return void 0;
};
var isIllegalIndex = (index) => {
  return isNaN(index) || index < 0;
};
var isSome = (arr, name) => {
  return arr.some((item) => item === name || item instanceof RegExp && item.test(name));
};
var version2 = "1.2.1";
var logger = createLogger("info", {
  prefix: `[vitepress-plugin-sidebar-resolve v${version2}]`
});
var info = (message, level = "green", option = { timestamp: true }) => {
  logger.info(import_picocolors.default[level](message), option);
};
var warn = (message, level = "yellow", option = { timestamp: true }) => {
  logger.warn(import_picocolors.default[level](message), option);
};
var warnOnce = (message, level = "yellow", option = { timestamp: true }) => {
  logger.info(import_picocolors.default[level](message), option);
};
var error = (message, level = "red", option = { timestamp: true }) => {
  logger.error(import_picocolors.default[level](message), option);
};
var logger$1 = {
  info,
  warn,
  warnOnce,
  error
};
var resolveFileName = (filename, filePath, separator = ".") => {
  if (!(0, import_fs3.existsSync)(filePath)) return { index: "", title: filename, type: "", name: filename };
  const stat = (0, import_fs3.statSync)(filePath);
  if (separator !== "." && isExtraSeparator(filename, separator)) {
    return parseExtraSeparator(filename, stat.isDirectory(), separator);
  }
  if (filename.includes(".")) {
    return parseDotSeparator(filename, stat.isDirectory());
  }
  return { index: "", title: filename, type: "", name: filename };
};
var parseDotSeparator = (filename, isDirectory) => {
  const parts = filename.split(".");
  if (parts.length === 2) {
    const index = parts[0] === "index" ? "0" : parts[0];
    const title = isDirectory ? parts[1] : parts[0];
    const type2 = isDirectory ? "" : parts[1];
    const name = parts[0];
    return { index, title, type: type2, name };
  } else {
    const firstDotIndex = filename.indexOf(".");
    const lastDotIndex = filename.lastIndexOf(".");
    const index = filename.substring(0, firstDotIndex);
    const title = filename.substring(firstDotIndex + 1, lastDotIndex);
    const type2 = isDirectory ? "" : filename.substring(lastDotIndex + 1);
    const name = isDirectory ? filename : filename.substring(0, lastDotIndex);
    return { index, title, type: type2, name };
  }
};
var isExtraSeparator = (filename, separator) => {
  if (!filename.includes(separator)) return false;
  const parts = filename.split(separator, 2);
  if (!/^\d+$/.test(parts[0])) return false;
  return true;
};
var parseExtraSeparator = (filename, isDirectory, separator) => {
  const firstSeparatorIndex = filename.indexOf(separator);
  const lastDotIndex = filename.lastIndexOf(".");
  const index = filename.substring(0, firstSeparatorIndex);
  const title = isDirectory ? filename.substring(firstSeparatorIndex + 1) : filename.substring(firstSeparatorIndex + 1, lastDotIndex);
  const type2 = isDirectory ? "" : filename.substring(lastDotIndex + 1);
  const name = isDirectory ? filename : filename.substring(0, lastDotIndex);
  return { index, title, type: type2, name };
};
var getInfoFromMarkdownDir = (root, dirOrFilename) => {
  const state = {
    title: void 0,
    sort: void 0,
    prefix: "",
    suffix: ""
  };
  const filePaths = [
    (0, import_path3.join)(root, dirOrFilename, "index.md"),
    (0, import_path3.join)(root, dirOrFilename, "index.MD"),
    (0, import_path3.join)(root, dirOrFilename, dirOrFilename + ".md")
  ];
  for (const filePath of filePaths) {
    if (!(0, import_fs3.existsSync)(filePath)) continue;
    const content = (0, import_fs3.readFileSync)(filePath, "utf-8");
    const { data: { title, sidebarSort, sidebarPrefix, sidebarSuffix } = {}, content: mdContent } = (0, import_gray_matter.default)(content, {});
    const t = title || getTitleFromMarkdown(mdContent);
    if (!state.title) state.title = t;
    if (!state.sort) state.sort = sidebarSort;
    if (!state.prefix) state.prefix = sidebarPrefix;
    if (!state.suffix) state.suffix = sidebarSuffix;
  }
  return state;
};
var DEFAULT_IGNORE_DIR = ["node_modules", "dist", ".vitepress", "public"];
var createFilePathSidebar = (option = {}, prefix = "/") => {
  const {
    path: path2,
    ignoreList = [],
    scannerRootMd = true,
    collapsed,
    titleFormMd = false,
    initItems = true,
    initItemsText = false,
    sidebarResolved,
    ignoreWarn = false,
    indexSeparator,
    prefixTransform,
    suffixTransform,
    type: type2 = "object",
    rootTitle = "Root"
  } = option;
  const isSidebarObject = type2 === "object";
  if (!path2) return isSidebarObject ? {} : [];
  prefix = prefix.replace(/\/$/, "") + "/";
  const sidebarObj = {};
  const sidebarArray = [];
  const key = prefix === "/" ? prefix : `/${prefix}`;
  if (scannerRootMd) {
    const rootSidebarItems = createSidebarItems$1(path2, { ...option, ignoreIndexMd: true }, key, scannerRootMd);
    if (rootSidebarItems == null ? void 0 : rootSidebarItems.length) {
      if (isSidebarObject) sidebarObj[key] = rootSidebarItems;
      else sidebarArray.push({ text: rootTitle, items: rootSidebarItems });
    }
  }
  const dirPaths = readDirPaths(path2, ignoreList);
  dirPaths.forEach((dirPath) => {
    const fileName = (0, import_node_path2.basename)(dirPath);
    const sidebarItems = createSidebarItems$1(dirPath, option, `${key}${fileName}/`);
    if (!ignoreWarn && !sidebarItems.length) {
      return logger$1.warn(`该目录 '${dirPath}' 内部没有任何文件或文件序号出错，将忽略生成对应侧边栏`);
    }
    const { name, title } = resolveFileName(fileName, dirPath, indexSeparator);
    const info5 = getInfoFromMarkdownDir(dirPath, fileName);
    const mdTitle = titleFormMd ? info5.title : "";
    const sidebarPrefix = (info5.prefix && ((prefixTransform == null ? void 0 : prefixTransform(info5.prefix)) ?? info5.prefix)) ?? "";
    const sidebarSuffix = (info5.suffix && ((suffixTransform == null ? void 0 : suffixTransform(info5.suffix)) ?? info5.suffix)) ?? "";
    const text = sidebarPrefix + (mdTitle || title) + sidebarSuffix;
    const sidebarItem = {
      text,
      collapsed: typeof collapsed === "function" ? collapsed(prefix + name, text) : collapsed,
      items: sidebarItems
    };
    if (isSidebarObject) {
      sidebarObj[`${key}${fileName}/`] = initItems ? [{ ...sidebarItem, text: initItemsText ? text : "" }] : sidebarItems;
    } else sidebarArray.push(sidebarItem);
  });
  const finalSidebar = isSidebarObject ? sidebarObj : sidebarArray;
  return (sidebarResolved == null ? void 0 : sidebarResolved(finalSidebar)) ?? finalSidebar;
};
var readDirPaths = (sourceDir, ignoreList = []) => {
  const dirPaths = [];
  if (!(0, import_node_fs2.existsSync)(sourceDir)) return dirPaths;
  const ignoreListAll = [...DEFAULT_IGNORE_DIR, ...ignoreList];
  const dirOrFilenames = (0, import_node_fs2.readdirSync)(sourceDir);
  dirOrFilenames.forEach((dirOrFilename) => {
    const secondDirPath = (0, import_node_path2.resolve)(sourceDir, dirOrFilename);
    if (!(0, import_node_fs2.existsSync)(secondDirPath)) return;
    if (!isSome(ignoreListAll, dirOrFilename) && (0, import_node_fs2.statSync)(secondDirPath).isDirectory()) {
      dirPaths.push(secondDirPath);
    }
  });
  return dirPaths;
};
var createSidebarItems$1 = (root, option, prefix = "/", onlyScannerRootMd = false) => {
  const {
    collapsed,
    ignoreList = [],
    ignoreIndexMd = false,
    fileIndexPrefix = false,
    sidebarItemsResolved,
    beforeCreateSidebarItems,
    titleFormMd = false,
    ignoreWarn = false,
    sort = true,
    defaultSortNum = 9999,
    sortNumFromFileName = false,
    indexSeparator,
    prefixTransform,
    suffixTransform
  } = option;
  const ignoreListAll = [...DEFAULT_IGNORE_DIR, ...ignoreList];
  let sidebarItems = [];
  const sidebarItemsNoIndex = [];
  let dirOrFilenames = (0, import_node_fs2.readdirSync)(root);
  dirOrFilenames = (beforeCreateSidebarItems == null ? void 0 : beforeCreateSidebarItems(dirOrFilenames)) ?? dirOrFilenames;
  dirOrFilenames.forEach((dirOrFilename) => {
    if (isSome(ignoreListAll, dirOrFilename)) return [];
    const filePath = (0, import_node_path2.resolve)(root, dirOrFilename);
    if (!(0, import_node_fs2.existsSync)(filePath)) return;
    const { index: indexStr, title, type: type2, name } = resolveFileName(dirOrFilename, filePath, indexSeparator);
    const index = parseInt(indexStr, 10);
    if (!ignoreWarn && fileIndexPrefix && isIllegalIndex(index)) {
      logger$1.warn(`该文件 '${filePath}' 序号出错，请填写正确的序号`);
      return [];
    }
    if (!ignoreWarn && sidebarItems[index]) logger$1.warn(`该文件 '${filePath}' 的序号在同一级别中重复出现，将会被覆盖`);
    if (!onlyScannerRootMd && (0, import_node_fs2.statSync)(filePath).isDirectory()) {
      const info5 = getInfoFromMarkdownDir(root, dirOrFilename);
      const mdTitle = titleFormMd ? info5.title : "";
      const sidebarPrefix = (info5.prefix && ((prefixTransform == null ? void 0 : prefixTransform(info5.prefix)) ?? info5.prefix)) ?? "";
      const sidebarSuffix = (info5.suffix && ((suffixTransform == null ? void 0 : suffixTransform(info5.suffix)) ?? info5.suffix)) ?? "";
      const text = sidebarPrefix + (mdTitle || title) + sidebarSuffix;
      const childSidebarItems = createSidebarItems$1(filePath, option, `${prefix}${dirOrFilename}/`);
      let sidebarItem = {
        text,
        collapsed: typeof collapsed === "function" ? collapsed(prefix + name, text) : collapsed,
        items: childSidebarItems
      };
      if (sort) {
        sidebarItem = {
          ...sidebarItem,
          // 对子侧边栏进行排序
          items: childSidebarItems.sort((a, b2) => (a.sort || defaultSortNum) - (b2.sort || defaultSortNum)).map((item) => {
            delete item.sort;
            return item;
          }),
          sort: sortNumFromFileName ? index : info5.sort
        };
      }
      if (isIllegalIndex(index)) sidebarItemsNoIndex.push(sidebarItem);
      else sidebarItems[index] = sidebarItem;
    } else {
      if (onlyScannerRootMd && dirOrFilename === "index.md") return [];
      if (ignoreIndexMd && ["index.md", "index.MD"].includes(dirOrFilename)) return [];
      if (!["md", "MD"].includes(type2)) {
        if (!ignoreWarn && !onlyScannerRootMd) logger$1.warn(`该文件 '${filePath}' 非 .md 格式文件，不支持该文件类型`);
        return [];
      }
      const content = (0, import_node_fs2.readFileSync)(filePath, "utf-8");
      const {
        data: { title: frontmatterTitle, sidebar = true, sidebarSort, sidebarPrefix, sidebarSuffix } = {},
        content: mdContent
      } = (0, import_gray_matter.default)(content, {});
      if (!sidebar) return [];
      const mdTitle = titleFormMd ? getTitleFromMarkdown(mdContent) : "";
      const finalSidebarPrefix = (sidebarPrefix && ((prefixTransform == null ? void 0 : prefixTransform(sidebarPrefix)) ?? sidebarPrefix)) ?? "";
      const finalSidebarSuffix = (sidebarSuffix && ((suffixTransform == null ? void 0 : suffixTransform(sidebarSuffix)) ?? sidebarSuffix)) ?? "";
      const text = finalSidebarPrefix + (frontmatterTitle || mdTitle || title) + finalSidebarSuffix;
      let sidebarItem = {
        text,
        collapsed: typeof collapsed === "function" ? collapsed(prefix + name, text) : collapsed,
        link: prefix + name
      };
      if (sort) sidebarItem = { ...sidebarItem, sort: sortNumFromFileName ? index : sidebarSort };
      if (isIllegalIndex(index)) sidebarItemsNoIndex.push(sidebarItem);
      else sidebarItems[index] = sidebarItem;
    }
  });
  sidebarItems = [...sidebarItems, ...sidebarItemsNoIndex].filter(Boolean);
  if (sort) {
    sidebarItems = sidebarItems.sort((a, b2) => (a.sort || defaultSortNum) - (b2.sort || defaultSortNum)).map((item) => {
      delete item.sort;
      return item;
    });
  }
  return (sidebarItemsResolved == null ? void 0 : sidebarItemsResolved(sidebarItems)) ?? sidebarItems;
};
function createRewritesSidebar(rewrites = {}, option = {}, prefix = "/") {
  const {
    path: path2,
    ignoreList = [],
    scannerRootMd = true,
    collapsed,
    titleFormMd = false,
    initItems = true,
    initItemsText = false,
    sidebarResolved,
    ignoreWarn = false,
    checkRewritesPrefix = false,
    indexSeparator,
    prefixTransform,
    suffixTransform,
    type: type2 = "object",
    rootTitle = "Root"
  } = option;
  const isSidebarObject = type2 === "object";
  if (!path2) return isSidebarObject ? {} : [];
  prefix = prefix.replace(/\/$/, "") + "/";
  const dirStructure = buildDirectoryStructure(rewrites);
  const sidebarObj = {};
  const sidebarArray = [];
  if (scannerRootMd) {
    const key = prefix === "/" ? prefix : `/${prefix}`;
    const rootSidebarItems = createSidebarItems(
      dirStructure,
      path2,
      { ...option, ignoreIndexMd: true },
      key,
      scannerRootMd
    );
    if (rootSidebarItems.length > 0) {
      if (isSidebarObject) sidebarObj[key] = rootSidebarItems;
      else sidebarArray.push({ text: rootTitle, items: rootSidebarItems });
    }
  }
  Object.entries(dirStructure).forEach(([dirName, dirOrFileInfo]) => {
    if (typeof dirOrFileInfo === "string") return;
    const dirPath = `${prefix}${dirName}/`;
    const dirRelativePath = (0, import_node_path2.join)(path2, dirPath);
    if (!(0, import_node_fs2.existsSync)(dirRelativePath)) return;
    if (!isSome(ignoreList, dirName) && !(0, import_node_fs2.statSync)(dirRelativePath).isDirectory()) return;
    const key = Object.keys(rewrites).find((item) => item.startsWith(dirName));
    if (!key) return;
    !ignoreWarn && checkRewritesPrefix && validateRewritesPrefix(rewrites, dirName, ignoreList);
    const sidebarItems = createSidebarItems(dirOrFileInfo, dirRelativePath, option, dirPath);
    if (!ignoreWarn && sidebarItems.length === 0) {
      return logger$1.warn(`该目录 '${dirName}' 内部没有任何文件或文件序号出错，将忽略生成对应侧边栏`);
    }
    const { name, title } = resolveFileName(dirName, dirRelativePath, indexSeparator);
    const info5 = getInfoFromMarkdownDir(path2, dirName);
    const mdTitle = titleFormMd ? info5.title : "";
    const sidebarPrefix = (info5.prefix && ((prefixTransform == null ? void 0 : prefixTransform(info5.prefix)) ?? info5.prefix)) ?? "";
    const sidebarSuffix = (info5.suffix && ((suffixTransform == null ? void 0 : suffixTransform(info5.suffix)) ?? info5.suffix)) ?? "";
    const text = sidebarPrefix + (mdTitle || title) + sidebarSuffix;
    const sidebarItem = {
      text,
      collapsed: typeof collapsed === "function" ? collapsed(prefix + name, text) : collapsed,
      items: sidebarItems
    };
    if (isSidebarObject) {
      const path22 = rewrites[key].split("/")[0];
      sidebarObj[`/${path22}/`] = initItems ? [{ ...sidebarItem, text: initItemsText ? text : "" }] : sidebarItems;
    } else sidebarArray.push(sidebarItem);
  });
  const finalSidebar = isSidebarObject ? sidebarObj : sidebarArray;
  return (sidebarResolved == null ? void 0 : sidebarResolved(finalSidebar)) ?? finalSidebar;
}
var createSidebarItems = (structure, root, option, prefix = "/", onlyScannerRootMd = false) => {
  const {
    collapsed,
    ignoreList = [],
    ignoreIndexMd = false,
    fileIndexPrefix = false,
    sidebarItemsResolved,
    beforeCreateSidebarItems,
    titleFormMd = false,
    ignoreWarn = false,
    sort = true,
    defaultSortNum = 9999,
    sortNumFromFileName = false,
    indexSeparator,
    prefixTransform,
    suffixTransform
  } = option;
  const ignoreListAll = [...ignoreList];
  let sidebarItems = [];
  const sidebarItemsNoIndex = [];
  const entries = Object.entries((beforeCreateSidebarItems == null ? void 0 : beforeCreateSidebarItems(structure)) || structure);
  entries.forEach(([dirOrFilename, dirOrFileInfo]) => {
    if (isSome(ignoreListAll, dirOrFilename)) return;
    const filePath = (0, import_node_path2.join)(root, dirOrFilename);
    if (!(0, import_node_fs2.existsSync)(filePath)) return;
    const { index: indexStr, title, type: type2, name } = resolveFileName(dirOrFilename, filePath, indexSeparator);
    const index = parseInt(indexStr, 10);
    if (!ignoreWarn && fileIndexPrefix && isIllegalIndex(index)) {
      logger$1.warn(`该文件 '${dirOrFilename}' 序号出错，请填写正确的序号`);
      return;
    }
    if (!onlyScannerRootMd && (0, import_node_fs2.statSync)(filePath).isDirectory() && typeof dirOrFileInfo === "object") {
      const info5 = getInfoFromMarkdownDir(root, dirOrFilename);
      const mdTitle = titleFormMd ? info5.title : "";
      const sidebarPrefix = (info5.prefix && ((prefixTransform == null ? void 0 : prefixTransform(info5.prefix)) ?? info5.prefix)) ?? "";
      const sidebarSuffix = (info5.suffix && ((suffixTransform == null ? void 0 : suffixTransform(info5.suffix)) ?? info5.suffix)) ?? "";
      const text = sidebarPrefix + (mdTitle || title) + sidebarSuffix;
      const childSidebarItems = createSidebarItems(dirOrFileInfo, filePath, option, `${prefix}${dirOrFilename}/`);
      let sidebarItem = {
        text,
        collapsed: typeof collapsed === "function" ? collapsed(prefix + name, text) : collapsed,
        items: childSidebarItems
      };
      if (sort) {
        sidebarItem = {
          ...sidebarItem,
          // 对子侧边栏进行排序
          items: childSidebarItems.sort((a, b2) => (a.sort || defaultSortNum) - (b2.sort || defaultSortNum)).map((item) => {
            delete item.sort;
            return item;
          }),
          sort: sortNumFromFileName ? index : info5.sort
        };
      }
      if (isIllegalIndex(index)) sidebarItemsNoIndex.push(sidebarItem);
      else sidebarItems[index] = sidebarItem;
    } else {
      if (onlyScannerRootMd && dirOrFilename === "index.md") return [];
      if (ignoreIndexMd && ["index.md", "index.MD"].includes(dirOrFilename)) return [];
      if (!["md", "MD"].includes(type2)) {
        if (!ignoreWarn && !onlyScannerRootMd) logger$1.warn(`该文件 '${filePath}' 非 .md 格式文件，不支持该文件类型`);
        return [];
      }
      const content = (0, import_node_fs2.readFileSync)(filePath, "utf-8");
      const {
        data: { title: frontmatterTitle, sidebar = true, sidebarSort, sidebarPrefix, sidebarSuffix } = {},
        content: mdContent
      } = (0, import_gray_matter.default)(content, {});
      if (!sidebar) return [];
      const mdTitle = titleFormMd ? getTitleFromMarkdown(mdContent) : "";
      const finalSidebarPrefix = (sidebarPrefix && ((prefixTransform == null ? void 0 : prefixTransform(sidebarPrefix)) ?? sidebarPrefix)) ?? "";
      const finalSidebarSuffix = (sidebarSuffix && ((suffixTransform == null ? void 0 : suffixTransform(sidebarSuffix)) ?? sidebarSuffix)) ?? "";
      const text = finalSidebarPrefix + (frontmatterTitle || mdTitle || title) + finalSidebarSuffix;
      let sidebarItem = {
        text,
        collapsed: typeof collapsed === "function" ? collapsed(prefix + name, text) : collapsed,
        link: `/${dirOrFileInfo}`
        // 此时是 rewrites 的文件路径
      };
      if (sort) sidebarItem = { ...sidebarItem, sort: sortNumFromFileName ? index : sidebarSort };
      if (isIllegalIndex(index)) sidebarItemsNoIndex.push(sidebarItem);
      else sidebarItems[index] = sidebarItem;
    }
  });
  sidebarItems = [...sidebarItems.filter(Boolean), ...sidebarItemsNoIndex];
  if (sort) {
    sidebarItems = sidebarItems.sort((a, b2) => (a.sort || defaultSortNum) - (b2.sort || defaultSortNum)).map((item) => {
      delete item.sort;
      return item;
    });
  }
  return (sidebarItemsResolved == null ? void 0 : sidebarItemsResolved(sidebarItems)) ?? sidebarItems;
};
var buildDirectoryStructure = (rewrites) => {
  const structure = {};
  Object.entries(rewrites).forEach(([key, value]) => {
    const parts = key.split("/");
    let currentLevel = structure;
    for (let i2 = 0; i2 < parts.length; i2++) {
      const part = parts[i2];
      const isLast = i2 === parts.length - 1;
      if (isLast) currentLevel[part] = value;
      else {
        if (!currentLevel[part]) currentLevel[part] = {};
        currentLevel = currentLevel[part];
      }
    }
  });
  return structure;
};
var validateRewritesPrefix = (rewrites, keyPrefix, ignoreList = []) => {
  const filteredEntries = Object.entries(rewrites).filter(([key, value]) => {
    if (!key.startsWith(keyPrefix)) return false;
    const isInIgnoreList = isSome(ignoreList, key);
    if (isInIgnoreList) return false;
    return value.includes("/");
  });
  if (filteredEntries.length === 0) return;
  const valuePrefixes = filteredEntries.map(([key, value]) => {
    const firstSegment = value.split("/")[0];
    return { key, value, prefix: firstSegment };
  });
  const basePrefix = valuePrefixes[0].prefix;
  const inconsistentEntries = valuePrefixes.filter((item) => item.prefix !== basePrefix);
  if (inconsistentEntries.length > 0) {
    console.warn(
      `检测到 '${keyPrefix}' 路径下的部分文件 Rewrites 前缀不一致，要求的基准前缀 '/${basePrefix}'，不一致的文件如下:`
    );
    inconsistentEntries.forEach((item) => console.warn(`  ${item.key}`));
  }
};
function VitePluginVitePressSidebarResolve(option = {}) {
  let isExecute = false;
  return {
    name: "vite-plugin-vitepress-sidebar-resolve",
    configureServer({ watcher, restart }) {
      if (!option.restart) return;
      watcher.add("*.md");
      watcher.on("add", async (path2) => {
        if (!path2.endsWith(".md")) return;
        await restart();
      }).on("unlink", async (path2) => {
        if (!path2.endsWith(".md")) return;
        await restart();
      });
    },
    config(config) {
      if (isExecute) return;
      isExecute = true;
      const {
        site: { themeConfig = {}, locales = {} },
        srcDir,
        rewrites: rewritesObj
      } = config.vitepress;
      const { path: path2, ignoreList, localeRootDir, type: type2 = "object", resolveRule = "filePath" } = option;
      const baseDir = path2 ? (0, import_node_path2.join)(srcDir, path2) : srcDir;
      const rewrites = rewritesObj.map || {};
      const rewritesLength = Object.keys(rewrites).length;
      const isFilePathRule = resolveRule === "filePath" || resolveRule === "rewrites" && !rewritesLength;
      const isRewritesRule = resolveRule === "rewrites" && rewritesLength;
      const localesKeys = Object.keys(locales).filter((key) => key !== "root");
      if (isFilePathRule) {
        if (!localesKeys.length) {
          return setSideBar(themeConfig, createFilePathSidebar({ ...option, path: baseDir }), type2);
        }
        localesKeys.forEach((localesKey) => {
          const sidebar = createFilePathSidebar({ ...option, path: `${baseDir}/${localesKey}` }, localesKey);
          setSideBar(locales[localesKey].themeConfig, sidebar, type2);
        });
        const rootDir = localeRootDir ? `/${localeRootDir}` : "";
        const rootSideBar = createFilePathSidebar({
          ...option,
          path: `${baseDir}${rootDir}`,
          ignoreList: [...ignoreList || [], ...localesKeys]
        });
        setSideBar(locales["root"].themeConfig, rootSideBar, type2);
      } else if (isRewritesRule) {
        if (!localesKeys.length) {
          return setSideBar(themeConfig, createRewritesSidebar(rewrites, { ...option, path: baseDir }), type2);
        }
        localesKeys.forEach((localesKey) => {
          const sidebar = createRewritesSidebar(rewrites, { ...option, path: `${baseDir}/${localesKey}` }, localesKey);
          setSideBar(locales[localesKey].themeConfig, sidebar, type2);
        });
        const rootDir = localeRootDir ? `/${localeRootDir}` : "";
        const rootSideBar = createRewritesSidebar(rewrites, {
          ...option,
          path: `${baseDir}${rootDir}`,
          ignoreList: [...ignoreList || [], ...localesKeys]
        });
        setSideBar(locales["root"].themeConfig, rootSideBar, type2);
      }
    }
  };
}
var setSideBar = (themeConfig, sidebar, type2) => {
  themeConfig = themeConfig || {};
  if (type2 === "object") {
    themeConfig.sidebar = {
      ...sidebar,
      ...Array.isArray(themeConfig.sidebar) ? logger$1.warn("自定义 Sidebar 必须是对象形式") : themeConfig.sidebar
    };
  } else {
    themeConfig.sidebar = [
      ...sidebar,
      ...Object.prototype.toString.call(themeConfig.sidebar) === "[object Object]" ? logger$1.warn("自定义 Sidebar 必须是数组形式") : themeConfig.sidebar || []
    ];
  }
  logger$1.info("Injected Sidebar Data Successfully. 注入侧边栏数据成功!");
};

// node_modules/vitepress-plugin-permalink/dist/shared/vitepress-plugin-permalink.BxeX3prR.mjs
var import_node_fs3 = __toESM(require_node_fs(), 1);
var import_node_path3 = __toESM(require_node_path(), 1);
var import_gray_matter2 = __toESM(require_gray_matter(), 1);
var import_picocolors2 = __toESM(require_picocolors_browser(), 1);
var DEFAULT_IGNORE_DIR2 = ["node_modules", "dist", ".vitepress", "public"];
var permalinks = {};
var createPermalinks = (option = {}, cleanUrls = false) => {
  const { path: path2, ignoreList = [] } = option;
  if (!path2) return {};
  const dirPaths = readDirPaths2(path2, ignoreList);
  scannerMdFile(path2, option, "", cleanUrls, true);
  dirPaths.forEach((dirPath) => scannerMdFile(dirPath, option, (0, import_node_path3.basename)(dirPath), cleanUrls));
  return permalinks;
};
var readDirPaths2 = (sourceDir, ignoreList = []) => {
  const dirPaths = [];
  const ignoreListAll = [...DEFAULT_IGNORE_DIR2, ...ignoreList];
  const secondDirNames = (0, import_node_fs3.readdirSync)(sourceDir);
  secondDirNames.forEach((secondDirName) => {
    const secondDirPath = (0, import_node_path3.resolve)(sourceDir, secondDirName);
    if (!isSome2(ignoreListAll, secondDirName) && (0, import_node_fs3.statSync)(secondDirPath).isDirectory()) {
      dirPaths.push(secondDirPath);
    }
  });
  return dirPaths;
};
var scannerMdFile = (root, option, prefix = "", cleanUrls = false, onlyScannerRootMd = false) => {
  const { ignoreList = [] } = option;
  const ignoreListAll = [...DEFAULT_IGNORE_DIR2, ...ignoreList];
  const secondDirOrFilenames = (0, import_node_fs3.readdirSync)(root);
  secondDirOrFilenames.forEach((dirOrFilename) => {
    if (isSome2(ignoreListAll, dirOrFilename)) return;
    const filePath = (0, import_node_path3.resolve)(root, dirOrFilename);
    if (!onlyScannerRootMd && (0, import_node_fs3.statSync)(filePath).isDirectory()) {
      scannerMdFile(filePath, option, `${prefix}/${dirOrFilename}`, cleanUrls);
    } else {
      if (!isMarkdownFile(dirOrFilename)) return;
      const content = (0, import_node_fs3.readFileSync)(filePath, "utf-8");
      const { data: { permalink = "" } = {} } = (0, import_gray_matter2.default)(content, {});
      if (permalink) {
        const filename = (0, import_node_path3.basename)(dirOrFilename, (0, import_node_path3.extname)(dirOrFilename));
        const finalPermalink = standardLink(permalink);
        permalinks[`${prefix ? `${prefix}/` : ""}${filename}`] = cleanUrls ? finalPermalink : `${finalPermalink}.html`;
      }
    }
  });
};
var isMarkdownFile = (filePath) => {
  return filePath.includes("md") || filePath.includes("MD");
};
var isSome2 = (arr, name) => {
  return arr.some((item) => item === name || item instanceof RegExp && item.test(name));
};
var standardLink = (permalink = "") => {
  let finalPermalink = permalink;
  if (!finalPermalink.startsWith("/")) finalPermalink = "/" + finalPermalink;
  if (finalPermalink.endsWith("/")) finalPermalink = finalPermalink.replace(/\/$/, "");
  return finalPermalink;
};
var version3 = "1.2.1";
var logger2 = createLogger("info", {
  prefix: `[vitepress-plugin-permalink v${version3}]`
});
var info2 = (message, level = "green", option = { timestamp: true }) => {
  logger2.info(import_picocolors2.default[level](message), option);
};
var warn2 = (message, level = "yellow", option = { timestamp: true }) => {
  logger2.warn(import_picocolors2.default[level](message), option);
};
var warnOnce2 = (message, level = "yellow", option = { timestamp: true }) => {
  logger2.info(import_picocolors2.default[level](message), option);
};
var error2 = (message, level = "red", option = { timestamp: true }) => {
  logger2.error(import_picocolors2.default[level](message), option);
};
var logger$12 = {
  info: info2,
  warn: warn2,
  warnOnce: warnOnce2,
  error: error2
};
var createRewrites = (options2 = {}) => {
  const { path: path2, srcDir = ".", locales = {} } = options2;
  const baseDir = path2 ? (0, import_node_path3.join)(srcDir, path2) : srcDir;
  const permalinks2 = createPermalinks({ ...options2, path: baseDir }, true);
  const normalizedPermalinks = {};
  for (const [key, value] of Object.entries(permalinks2)) {
    const normalizedKey = key + ".md";
    const normalizedValue = value.replace(/^\//, "").replace(/\.[^/.]+$/, "") + ".md";
    normalizedPermalinks[normalizedKey] = normalizedValue;
  }
  const pathToPermalink = {};
  const permalinkToPath = {};
  const localesKeys = Object.keys(locales || {});
  for (const [key, value] of Object.entries(normalizedPermalinks)) {
    const newValue = getLocalePermalink(localesKeys, key, value);
    if (permalinkToPath[newValue]) {
      logger$12.warn(`永久链接 '${newValue}' 已存在，其对应的 '${permalinkToPath[newValue]}' 将会被 '${key}' 覆盖`);
    }
    pathToPermalink[key] = newValue;
    permalinkToPath[newValue] = key;
  }
  logger$12.info("Injected Permalinks Rewrites Data Successfully. 注入永久链接 Rewrites 数据成功!");
  return { __create__: "vitepress-plugin-permalink", ...pathToPermalink };
};
var getLocalePermalink = (localesKeys = [], path2 = "", permalink = "") => {
  const localesKey = localesKeys.filter((key) => key !== "root").find((key) => path2.startsWith(key));
  if (localesKey) return `/${localesKey}${permalink.startsWith("/") ? permalink : `/${permalink}`}`;
  return permalink;
};

// node_modules/vitepress-plugin-permalink/dist/index.mjs
var import_node_path4 = __toESM(require_node_path(), 1);
var import_node_fs4 = __toESM(require_node_fs(), 1);
var import_node_url2 = __toESM(require_node_url(), 1);
var import_gray_matter3 = __toESM(require_gray_matter(), 1);
var import_picocolors3 = __toESM(require_picocolors_browser(), 1);
function VitePluginVitePressPermalink(option = {}) {
  return [VitePluginVitePressAutoPermalink(option), VitePluginVitePressUsePermalink(option)];
}
function VitePluginVitePressAutoPermalink(option = {}) {
  let isExecute = false;
  let vitepressConfig = {};
  return {
    name: "vite-plugin-vitepress-auto-permalink",
    config(config) {
      var _a, _b;
      if (isExecute) return;
      isExecute = true;
      const {
        site: { themeConfig, cleanUrls, locales },
        srcDir,
        rewrites,
        userConfig
      } = config.vitepress;
      vitepressConfig = config.vitepress;
      if (((_a = userConfig == null ? void 0 : userConfig.rewrites) == null ? void 0 : _a.__create__) === "vitepress-plugin-permalink") return;
      const baseDir = option.path ? (0, import_node_path4.join)(srcDir, option.path) : srcDir;
      const permalinks2 = createPermalinks({ ...option, path: baseDir }, cleanUrls);
      const pathToPermalink = {};
      const permalinkToPath = {};
      const localesKeys = Object.keys(locales || {});
      for (const [key, value] of Object.entries(permalinks2)) {
        const rewriteFilePath = ((_b = rewrites.map[`${key}.md`]) == null ? void 0 : _b.replace(/\.md/, "")) || key;
        const newValue = getLocalePermalink(localesKeys, key, value);
        if (permalinkToPath[newValue]) {
          logger$12.warn(`永久链接 '${newValue}' 已存在，其对应的 '${permalinkToPath[newValue]}' 将会被 '${key}' 覆盖`);
        }
        pathToPermalink[rewriteFilePath] = newValue;
        permalinkToPath[newValue] = rewriteFilePath;
      }
      themeConfig.permalinks = { map: pathToPermalink, inv: permalinkToPath };
      logger$12.info("Injected Permalinks Data Successfully. 注入永久链接数据成功!");
      if (!localesKeys.length) {
        return setActiveMatchWhenUsePermalink({
          nav: themeConfig.nav,
          permalinkToPath,
          rewrites,
          cleanUrls
        });
      }
      localesKeys.forEach((localeKey) => {
        var _a2;
        setActiveMatchWhenUsePermalink({
          nav: (_a2 = locales[localeKey].themeConfig) == null ? void 0 : _a2.nav,
          permalinkToPath,
          rewrites,
          cleanUrls
        });
      });
    },
    // 仅限 dev 环境生效
    configureServer(server) {
      const {
        site: {
          base,
          themeConfig: { permalinks: permalinks2 }
        },
        rewrites
      } = vitepressConfig;
      if (!permalinks2) return;
      server.middlewares.use((req, _res, next) => {
        var _a;
        if (req.url && req.url.includes(".md")) {
          const reqUrl = decodeURI(req.url).replace(/[?#].*$/, "").replace(/\.md$/, "").slice(base.length);
          const path2 = "/" + reqUrl.replace(/^\//, "");
          const filePath = permalinks2.inv[path2] || permalinks2.inv[`${path2}.html`];
          const realFilePath = ((_a = rewrites.inv[`${filePath}.md`]) == null ? void 0 : _a.replace(/\.md/, "")) || filePath;
          if (realFilePath) req.url = req.url.replace(encodeURI(reqUrl), encodeURI(realFilePath));
        }
        next();
      });
    }
  };
}
var setActiveMatchWhenUsePermalink = (option, parentNav) => {
  const { nav = [], permalinkToPath, rewrites = {}, cleanUrls = false } = option;
  if (!nav.length) return;
  nav.forEach((item) => {
    var _a, _b;
    if (item.link === "/" || item.activeMatch) return;
    const link = standardLink(item.link);
    const path2 = permalinkToPath[cleanUrls ? link : `${link.replace(/\.html/, "")}.html`];
    if (path2) {
      const finalPath = ((_a = rewrites.map[`${path2}.md`]) == null ? void 0 : _a.replace(/\.md/, "")) || path2;
      item.activeMatch = finalPath;
      if (parentNav) parentNav.activeMatch = finalPath.slice(0, finalPath.lastIndexOf("/"));
    }
    if ((_b = item.items) == null ? void 0 : _b.length) {
      setActiveMatchWhenUsePermalink({ nav: item.items, permalinkToPath, rewrites, cleanUrls }, item);
    }
  });
};
var isESM = () => {
  return typeof __filename === "undefined" || typeof __dirname === "undefined";
};
var getDirname = () => {
  return isESM() ? (0, import_node_path4.dirname)((0, import_node_url2.fileURLToPath)(import.meta.url)) : __dirname;
};
function VitePluginVitePressUsePermalink(option = {}) {
  const usePermalinkFile = `usePermalink`;
  const aliasUsePermalinkFile = `${getDirname()}/${usePermalinkFile}`;
  const NotFoundDelayComponentName = "NotFoundDelay";
  const NotFoundDelayComponentFile = `${NotFoundDelayComponentName}.vue`;
  const aliasNotFoundDelayComponentFile = `${getDirname()}/components/${NotFoundDelayComponentFile}`;
  const virtualModuleId = "virtual:not-found-option";
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;
  let disabledPlugin = false;
  return {
    name: "vite-plugin-vitepress-use-permalink",
    config(config) {
      var _a;
      const { userConfig } = config.vitepress;
      if (((_a = userConfig == null ? void 0 : userConfig.rewrites) == null ? void 0 : _a.__create__) === "vitepress-plugin-permalink") disabledPlugin = true;
      else {
        return {
          resolve: {
            alias: {
              [`./${usePermalinkFile}`]: aliasUsePermalinkFile,
              [`./${NotFoundDelayComponentFile}`]: aliasNotFoundDelayComponentFile
            }
          }
        };
      }
    },
    resolveId(id) {
      if (disabledPlugin) return;
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (disabledPlugin) return;
      if (id === resolvedVirtualModuleId) return `export default ${JSON.stringify(option)}`;
      if (id.endsWith("vitepress/dist/client/theme-default/Layout.vue")) {
        const code = (0, import_node_fs4.readFileSync)(id, "utf-8");
        const slotName = "not-found";
        const notFoundSlotPosition = `<slot name="${slotName}" />`;
        const setupPosition = '<script setup lang="ts">';
        return code.replace(
          notFoundSlotPosition,
          `<${NotFoundDelayComponentName}><template #${slotName}>${notFoundSlotPosition}</template></${NotFoundDelayComponentName}>`
        ).replace(
          setupPosition,
          `${setupPosition}
import ${usePermalinkFile} from './${usePermalinkFile}'
import ${NotFoundDelayComponentName} from './${NotFoundDelayComponentFile}'`
        ).replace("<\/script>", `${usePermalinkFile}().startWatch() <\/script>`);
      }
    }
  };
}

// node_modules/vitepress-plugin-md-h1/dist/index.mjs
var import_node_fs5 = __toESM(require_node_fs(), 1);
var import_node_path5 = __toESM(require_node_path(), 1);
var import_gray_matter4 = __toESM(require_gray_matter(), 1);
var import_node_os2 = __toESM(require_node_os(), 1);
function VitePluginVitePressMdH1(option = {}) {
  return {
    name: "vite-plugin-vitepress-md-h1",
    load: (id) => {
      if (!id.endsWith(".md") || !(0, import_node_fs5.existsSync)(id)) return;
      const { ignoreList = [], beforeInject } = option;
      if (isSome3(ignoreList, id)) return;
      const content = (0, import_node_fs5.readFileSync)(id, "utf-8");
      const { data: frontmatter = {}, content: mdContent } = (0, import_gray_matter4.default)(content, {});
      if (frontmatter.autoTitle === void 0 && ![void 0, "doc"].includes(frontmatter.layout)) return;
      if (frontmatter.autoTitle === false) return;
      if (mdContent.trimStart().split(/\r?\n/)[0].startsWith("# ")) return;
      let title = frontmatter.title || getMdFileTitle((0, import_node_path5.basename)(id)) || "";
      if (beforeInject && typeof beforeInject === "function") {
        const result = beforeInject(frontmatter, id, title);
        if (result === false) return;
        if (typeof result === "string") title = result;
      }
      const newTwoLine = import_node_os2.EOL + import_node_os2.EOL;
      if (content.trimStart().startsWith("---")) {
        return content.replace(/^(\s*---[\s\S]*?---)/, `$1${newTwoLine}# ${title}${newTwoLine}`);
      }
      return `# ${title}${newTwoLine}${content}`;
    }
  };
}
var getMdFileTitle = (filename) => {
  let title = "";
  const fileNameArr = filename.split(".");
  if (fileNameArr.length === 2) title = fileNameArr[0];
  else {
    const firstDotIndex = filename.indexOf(".");
    const lastDotIndex = filename.lastIndexOf(".");
    title = filename.substring(firstDotIndex + 1, lastDotIndex);
  }
  return title;
};
var isSome3 = (arr, name) => {
  return arr.some(
    (item) => typeof item === "string" && name.includes(item) || item instanceof RegExp && item.test(name)
  );
};

// node_modules/vitepress-plugin-catalogue/dist/index.mjs
var import_node_fs6 = __toESM(require_node_fs(), 1);
var import_node_path6 = __toESM(require_node_path(), 1);
var import_gray_matter5 = __toESM(require_gray_matter(), 1);
var import_picocolors4 = __toESM(require_picocolors_browser(), 1);
var getTitleFromMarkdown2 = (mdContent) => {
  const lines = mdContent.trimStart().split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith("# ")) {
      return line.substring(2).trim();
    }
  }
  return void 0;
};
var isIllegalIndex2 = (index) => {
  return isNaN(index) || index < 0;
};
var isMarkdownFile2 = (filePath) => {
  return filePath.includes("md") || filePath.includes("MD");
};
var isSome4 = (arr, name) => {
  return arr.some((item) => item === name || item instanceof RegExp && item.test(name));
};
var removeMarkdownExt = (filePath) => {
  if (!filePath) return "";
  return filePath.replace(/\.md$/, "");
};
var DEFAULT_IGNORE_DIR3 = ["node_modules", "dist", ".vitepress", "public"];
var catalogueInfo = [];
var createCatalogues = (option = {}, vitepressConfig = {}) => {
  const { path: path2 = "", ignoreList = [] } = option;
  if (!path2) return [];
  const dirPaths = readDirPaths3(path2, ignoreList);
  dirPaths.forEach((dirPath) => scannerMdFile2(dirPath, option, (0, import_node_path6.basename)(dirPath), vitepressConfig));
  return catalogueInfo;
};
var readDirPaths3 = (sourceDir, ignoreList = []) => {
  const ignoreListAll = [...DEFAULT_IGNORE_DIR3, ...ignoreList];
  const dirPaths = [];
  const dirOrFilenames = (0, import_node_fs6.readdirSync)(sourceDir);
  dirOrFilenames.forEach((dirOrFilename) => {
    const secondDirPath = (0, import_node_path6.resolve)(sourceDir, dirOrFilename);
    if (!isSome4(ignoreListAll, dirOrFilename) && (0, import_node_fs6.statSync)(secondDirPath).isDirectory()) {
      dirPaths.push(secondDirPath);
    }
  });
  return dirPaths;
};
var scannerMdFile2 = (root, option, prefix = "", vitepressConfig = {}) => {
  const { path: srcDir = "", ignoreList = [] } = option;
  const ignoreListAll = [...DEFAULT_IGNORE_DIR3, ...ignoreList];
  const dirOrFilenames = (0, import_node_fs6.readdirSync)(root);
  dirOrFilenames.forEach((dirOrFilename) => {
    if (isSome4(ignoreListAll, dirOrFilename)) return [];
    const filePath = (0, import_node_path6.resolve)(root, dirOrFilename);
    if ((0, import_node_fs6.statSync)(filePath).isDirectory()) {
      scannerMdFile2(filePath, option, `${prefix}/${dirOrFilename}`, vitepressConfig);
    } else {
      if (!isMarkdownFile2(dirOrFilename)) return;
      const content = (0, import_node_fs6.readFileSync)(filePath, "utf-8");
      const { data: { catalogue, path: path2 = "" } = {} } = (0, import_gray_matter5.default)(content, {});
      if (catalogue && path2) {
        const filename = (0, import_node_path6.basename)(dirOrFilename, (0, import_node_path6.extname)(dirOrFilename));
        catalogueInfo.push({
          filePath: `${prefix}/${filename}`,
          path: path2,
          catalogues: createCatalogueList((0, import_node_path6.join)(srcDir, path2), option, `/${path2}/`, vitepressConfig)
        });
      }
    }
  });
};
var createCatalogueList = (root, option, prefix = "/", vitepressConfig = {}) => {
  if (!(0, import_node_fs6.existsSync)(root)) {
    console.warn(`'${root}' 路径不存在，将忽略该目录页的生成`);
    return [];
  }
  const { ignoreIndexMd = false, titleFormMd = false, indexSeparator, catalogueItemResolved } = option;
  const catalogueItemList = [];
  const catalogueItemListNoIndex = [];
  const dirOrFilenames = (0, import_node_fs6.readdirSync)(root);
  dirOrFilenames.forEach((dirOrFilename) => {
    const fileAbsolutePath = (0, import_node_path6.resolve)(root, dirOrFilename);
    const { index: indexStr, title, name } = resolveFileName2(dirOrFilename, fileAbsolutePath, indexSeparator);
    const index = parseInt(indexStr, 10);
    if ((0, import_node_fs6.statSync)(fileAbsolutePath).isDirectory()) {
      const mdTitle = titleFormMd ? tryGetMarkdownTitle(root, dirOrFilename) : "";
      const catalogueItem = {
        title: mdTitle || title,
        children: createCatalogueList(fileAbsolutePath, option, `${prefix}${dirOrFilename}/`, vitepressConfig),
        frontmatter: {}
      };
      if (isIllegalIndex2(index)) catalogueItemListNoIndex.push(catalogueItem);
      else catalogueItemList[index] = catalogueItem;
    } else {
      if (!isMarkdownFile2(dirOrFilename)) return [];
      if (ignoreIndexMd && ["index.md", "index.MD"].includes(dirOrFilename)) return [];
      const content = (0, import_node_fs6.readFileSync)(fileAbsolutePath, "utf-8");
      const { data: frontmatter = {}, content: mdContent } = (0, import_gray_matter5.default)(content, {});
      const { title: frontmatterTitle, catalogue, inCatalogue = true } = frontmatter;
      if (catalogue || !inCatalogue) return [];
      const mdTitle = titleFormMd ? getTitleFromMarkdown2(mdContent) : "";
      const finalTitle = frontmatterTitle || mdTitle || title;
      const filePath = prefix + name;
      const { rewrites = {}, cleanUrls } = vitepressConfig;
      const catalogueItem = {
        title: finalTitle,
        url: "/" + (removeMarkdownExt(rewrites[`${filePath.replace(/^\//, "")}.md`]) || filePath).replace(/^\//, "") + (cleanUrls ? "" : ".html"),
        frontmatter
      };
      if (isIllegalIndex2(index)) catalogueItemListNoIndex.push(catalogueItem);
      else catalogueItemList[index] = catalogueItem;
    }
  });
  const data = [...catalogueItemList, ...catalogueItemListNoIndex].filter(Boolean);
  return (catalogueItemResolved == null ? void 0 : catalogueItemResolved(data)) ?? data;
};
var tryGetMarkdownTitle = (root, dirOrFilename) => {
  const filePaths = [
    (0, import_node_path6.join)(root, dirOrFilename, "index.md"),
    (0, import_node_path6.join)(root, dirOrFilename, "index.MD"),
    (0, import_node_path6.join)(root, dirOrFilename, dirOrFilename + ".md")
  ];
  for (const filePath of filePaths) {
    if (!(0, import_node_fs6.existsSync)(filePath)) continue;
    const content = (0, import_node_fs6.readFileSync)(filePath, "utf-8");
    const { data: { title } = {}, content: mdContent } = (0, import_gray_matter5.default)(content, {});
    const t = title || getTitleFromMarkdown2(mdContent);
    if (t) return t;
  }
  return "";
};
var resolveFileName2 = (filename, filePath, separator = ".") => {
  const stat = (0, import_node_fs6.statSync)(filePath);
  if (separator !== "." && isExtraSeparator2(filename, separator)) {
    return parseExtraSeparator2(filename, stat.isDirectory(), separator);
  }
  if (filename.includes(".")) {
    return parseDotSeparator2(filename, stat.isDirectory());
  }
  return { index: "", title: filename, type: "", name: filename };
};
var parseDotSeparator2 = (filename, isDirectory) => {
  const parts = filename.split(".");
  if (parts.length === 2) {
    const index = parts[0] === "index" ? "0" : parts[0];
    const title = isDirectory ? parts[1] : parts[0];
    const type2 = isDirectory ? "" : parts[1];
    const name = parts[0];
    return { index, title, type: type2, name };
  } else {
    const firstDotIndex = filename.indexOf(".");
    const lastDotIndex = filename.lastIndexOf(".");
    const index = filename.substring(0, firstDotIndex);
    const title = filename.substring(firstDotIndex + 1, lastDotIndex);
    const type2 = isDirectory ? "" : filename.substring(lastDotIndex + 1);
    const name = isDirectory ? filename : filename.substring(0, lastDotIndex);
    return { index, title, type: type2, name };
  }
};
var isExtraSeparator2 = (filename, separator) => {
  if (!filename.includes(separator)) return false;
  const parts = filename.split(separator, 2);
  if (!/^\d+$/.test(parts[0])) return false;
  return true;
};
var parseExtraSeparator2 = (filename, isDirectory, separator) => {
  const firstSeparatorIndex = filename.indexOf(separator);
  const lastDotIndex = filename.lastIndexOf(".");
  const index = filename.substring(0, firstSeparatorIndex);
  const title = isDirectory ? filename.substring(firstSeparatorIndex + 1) : filename.substring(firstSeparatorIndex + 1, lastDotIndex);
  const type2 = isDirectory ? "" : filename.substring(lastDotIndex + 1);
  const name = isDirectory ? filename : filename.substring(0, lastDotIndex);
  return { index, title, type: type2, name };
};
var version4 = "1.1.2";
var logger3 = createLogger("info", {
  prefix: `[vitepress-plugin-catalogue v${version4}]`
});
var info3 = (message, level = "green", option = { timestamp: true }) => {
  logger3.info(import_picocolors4.default[level](message), option);
};
var warn3 = (message, level = "yellow", option = { timestamp: true }) => {
  logger3.warn(import_picocolors4.default[level](message), option);
};
var warnOnce3 = (message, level = "yellow", option = { timestamp: true }) => {
  logger3.info(import_picocolors4.default[level](message), option);
};
var error3 = (message, level = "red", option = { timestamp: true }) => {
  logger3.error(import_picocolors4.default[level](message), option);
};
var logger$13 = {
  info: info3,
  warn: warn3,
  warnOnce: warnOnce3,
  error: error3
};
function VitePluginVitePressCatalogue(option = {}) {
  let isExecute = false;
  return {
    name: "vite-plugin-vitepress-catalogue",
    config(config) {
      if (isExecute) return;
      isExecute = true;
      const {
        site: { themeConfig },
        srcDir,
        rewrites,
        cleanUrls
      } = config.vitepress;
      const baseDir = option.path ? (0, import_node_path6.join)(srcDir, option.path) : srcDir;
      const catalogues = createCatalogues({ ...option, path: baseDir }, { rewrites: rewrites.map, cleanUrls });
      const finalCatalogues = { arr: catalogues, map: {}, inv: {} };
      catalogues.forEach((item) => {
        const { filePath, path: path2, catalogues: catalogues2 = [] } = item;
        const url = "/" + (removeMarkdownExt(rewrites.map[`${filePath}.md`]) || filePath).replace(/^\//, "") + (cleanUrls ? "" : ".html");
        finalCatalogues.map[filePath] = { url, path: path2, catalogues: catalogues2 };
        finalCatalogues.inv[path2] = { url, filePath, catalogues: catalogues2 };
      });
      themeConfig.catalogues = finalCatalogues;
      logger$13.info("Injected Catalogues Data Successfully. 注入目录页数据成功!");
    }
  };
}

// node_modules/vitepress-plugin-doc-analysis/dist/index.mjs
var import_node_path7 = __toESM(require_node_path(), 1);
var import_node_fs7 = __toESM(require_node_fs(), 1);
var import_gray_matter6 = __toESM(require_gray_matter(), 1);
var import_child_process2 = __toESM(require_child_process(), 1);
var import_picocolors5 = __toESM(require_picocolors_browser(), 1);
var DEFAULT_IGNORE_DIR4 = ["node_modules", "dist", ".vitepress", "public"];
var readFileList = (option = {}, prefix = "") => {
  const { path: path2 } = option;
  if (!path2) return [];
  prefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
  prefix = prefix.replace(/^\//, "");
  return readFileList$1(path2, option, [], prefix);
};
function readFileList$1(root, option, fileList = [], prefix = "") {
  const { path: path2 = "", ignoreList = [], ignoreIndexMd } = option;
  const ignoreListAll = [...DEFAULT_IGNORE_DIR4, ...ignoreList];
  const secondDirOrFilenames = (0, import_node_fs7.readdirSync)(root);
  secondDirOrFilenames.forEach((dirOrFilename) => {
    if (isSome5(ignoreListAll, dirOrFilename)) return;
    const filePath = (0, import_node_path7.resolve)(root, dirOrFilename);
    if ((0, import_node_fs7.statSync)(filePath).isDirectory()) {
      readFileList$1(filePath, option, fileList, prefix);
    } else {
      if (!isMarkdownFile3(dirOrFilename)) return [];
      if (ignoreIndexMd && ["index.md", "index.MD"].includes(dirOrFilename)) return [];
      if (filePath === (0, import_node_path7.resolve)(path2, "index.md")) return [];
      const content = (0, import_node_fs7.readFileSync)(filePath, "utf-8");
      const { data: { layout, docAnalysis } = {} } = (0, import_gray_matter6.default)(content, {});
      if (layout === "home" || docAnalysis === false) return [];
      const workingDir = (0, import_node_path7.resolve)(path2);
      const absoluteFilePath = (0, import_node_path7.resolve)(filePath);
      const relativePath = (0, import_node_path7.relative)(workingDir, absoluteFilePath).replace(/\\/g, "/");
      const type2 = (0, import_node_path7.extname)(dirOrFilename);
      if (type2 === ".md") fileList.push({ filePath, relativePath: prefix + relativePath });
    }
  });
  return fileList;
}
var isMarkdownFile3 = (filePath) => {
  return filePath.includes("md") || filePath.includes("MD");
};
var isSome5 = (arr, name) => {
  return arr.some((item) => item === name || item instanceof RegExp && item.test(name));
};
function getTotalFileWords(filePathList) {
  let wordCount = 0;
  filePathList.forEach((item) => {
    const fileContent = (0, import_node_fs7.readFileSync)(item, "utf8");
    const { content } = (0, import_gray_matter6.default)(fileContent, {});
    const len = getCounter(content);
    wordCount += len[0] + len[1];
  });
  return wordCount;
}
function getEachFileWords(fileList, cn = 300, en = 160) {
  const filePathListWords = [];
  fileList.forEach((item) => {
    const fileContent = (0, import_node_fs7.readFileSync)(item.filePath, "utf8");
    const { data, content } = (0, import_gray_matter6.default)(fileContent, {});
    const len = getCounter(content);
    const readingTime = getReadTime(len, cn, en);
    let wordCount = 0;
    wordCount = len[0] + len[1];
    filePathListWords.push({ fileInfo: item, wordCount, readingTime, frontmatter: data });
  });
  return filePathListWords;
}
function getReadTime(len, cn = 300, en = 160) {
  const readingTime = len[0] / cn + len[1] / en;
  if (readingTime > 60 && readingTime < 60 * 24) {
    const hour = Math.trunc(readingTime / 60);
    const minute = Math.trunc(readingTime - hour * 60);
    if (minute === 0) return hour + "h";
    return hour + "h" + minute + "m";
  } else if (readingTime > 60 * 24) {
    const day = Math.trunc(readingTime / (60 * 24));
    const hour = Math.trunc((readingTime - day * 24 * 60) / 60);
    if (hour === 0) return day + "d";
    return day + "d" + hour + "h";
  }
  return (readingTime < 1 ? "1" : Math.trunc(readingTime * 10) / 10) + "m";
}
function getCounter(content) {
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
  const en = (content.replace(/[\u4E00-\u9FA5]/g, "").match(
    /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g
  ) || []).length;
  return [cn, en];
}
function getLastUpdateTime(fileList) {
  const updateTime = [];
  fileList.forEach((item) => {
    updateTime.push((0, import_node_fs7.statSync)(item).mtime.toLocaleString());
  });
  return updateTime.sort((a, b2) => getTimeNum(b2) - getTimeNum(a))[0];
}
function getTimeNum(dateStr) {
  let date = new Date(dateStr);
  if (date === "Invalid Date" && dateStr) date = new Date(dateStr.replace(/-/g, "/"));
  return date.getTime();
}
function getGitLastCommitTime() {
  return new Promise((resolve7) => {
    (0, import_child_process2.exec)('git log -1 --format=%cd --date=format:"%Y-%m-%d %H:%M:%S"', (error5, stdout, stderr) => {
      if (error5 || stderr) return resolve7(0);
      resolve7(stdout.trim());
    });
  });
}
var version5 = "1.0.13";
var logger4 = createLogger("info", {
  prefix: `[vitepress-plugin-doc-analysis v${version5}]`
});
var info4 = (message, level = "green", option = { timestamp: true }) => {
  logger4.info(import_picocolors5.default[level](message), option);
};
var warn4 = (message, level = "yellow", option = { timestamp: true }) => {
  logger4.warn(import_picocolors5.default[level](message), option);
};
var warnOnce4 = (message, level = "yellow", option = { timestamp: true }) => {
  logger4.info(import_picocolors5.default[level](message), option);
};
var error4 = (message, level = "red", option = { timestamp: true }) => {
  logger4.error(import_picocolors5.default[level](message), option);
};
var logger$14 = {
  info: info4,
  warn: warn4,
  warnOnce: warnOnce4,
  error: error4
};
function VitePluginVitePressDocAnalysis(option = {}) {
  let isExecute = false;
  return {
    name: "vitepress-plugin-doc-analysis",
    config(config) {
      if (isExecute) return;
      isExecute = true;
      const {
        site: { themeConfig = {}, locales = {} },
        srcDir
      } = config.vitepress;
      const baseDir = option.path ? (0, import_node_path7.join)(srcDir, option.path) : srcDir;
      const newOption = { ...option, path: baseDir };
      const localesKeys = Object.keys(locales).filter((key) => key !== "root");
      if (!localesKeys.length) return doDocAnalysisThenSet(themeConfig, readFileList(newOption), newOption);
      localesKeys.forEach((localesKey) => {
        const fileList = readFileList({ ...newOption, path: `${baseDir}/${localesKey}` }, localesKey);
        doDocAnalysisThenSet(locales[localesKey].themeConfig, fileList, newOption);
      });
      const rootFileList = readFileList({
        ...newOption,
        ignoreList: [...newOption.ignoreList || [], ...localesKeys]
      });
      doDocAnalysisThenSet(locales["root"].themeConfig, rootFileList, newOption);
    }
  };
}
var doDocAnalysisThenSet = async (themeConfig, fileList, option) => {
  const filePathList = fileList.map((item) => item.filePath);
  const { transformFile } = option;
  const newFileList = fileList.map((file) => {
    if (transformFile) file = { ...transformFile(file), ...file };
    return file;
  });
  const totalFileWords = getTotalFileWords(filePathList);
  const eachFileWords = getEachFileWords(newFileList, option.cn, option.en);
  const lastCommitTime = await getGitLastCommitTime() || getLastUpdateTime(filePathList);
  themeConfig = themeConfig || {};
  themeConfig.docAnalysisInfo = {
    fileList: newFileList,
    totalFileWords,
    eachFileWords,
    lastCommitTime
  };
  logger$14.info("Injected DocAnalysisInfo Data Successfully. 注入文档分析数据成功!");
};

// node_modules/vitepress-plugin-file-content-loader/dist/index.mjs
var import_node_fs8 = __toESM(require_node_fs(), 1);
var import_gray_matter7 = __toESM(require_gray_matter(), 1);

// node_modules/tinyglobby/dist/index.mjs
var import_fs4 = __toESM(require_fs(), 1);
var import_path5 = __toESM(require_path(), 1);
var import_url2 = __toESM(require_url(), 1);

// node_modules/tinyglobby/node_modules/fdir/dist/index.mjs
var import_module2 = __toESM(require_module(), 1);
var import_path4 = __toESM(require_path(), 1);
var nativeFs = __toESM(require_fs(), 1);
var __require2 = (0, import_module2.createRequire)(import.meta.url);
function cleanPath(path2) {
  let normalized = (0, import_path4.normalize)(path2);
  if (normalized.length > 1 && normalized[normalized.length - 1] === import_path4.sep) normalized = normalized.substring(0, normalized.length - 1);
  return normalized;
}
var SLASHES_REGEX = /[\\/]/g;
function convertSlashes(path2, separator) {
  return path2.replace(SLASHES_REGEX, separator);
}
var WINDOWS_ROOT_DIR_REGEX = /^[a-z]:[\\/]$/i;
function isRootDirectory(path2) {
  return path2 === "/" || WINDOWS_ROOT_DIR_REGEX.test(path2);
}
function normalizePath(path2, options2) {
  const { resolvePaths, normalizePath: normalizePath$1, pathSeparator } = options2;
  const pathNeedsCleaning = process.platform === "win32" && path2.includes("/") || path2.startsWith(".");
  if (resolvePaths) path2 = (0, import_path4.resolve)(path2);
  if (normalizePath$1 || pathNeedsCleaning) path2 = cleanPath(path2);
  if (path2 === ".") return "";
  const needsSeperator = path2[path2.length - 1] !== pathSeparator;
  return convertSlashes(needsSeperator ? path2 + pathSeparator : path2, pathSeparator);
}
function joinPathWithBasePath(filename, directoryPath) {
  return directoryPath + filename;
}
function joinPathWithRelativePath(root, options2) {
  return function(filename, directoryPath) {
    const sameRoot = directoryPath.startsWith(root);
    if (sameRoot) return directoryPath.slice(root.length) + filename;
    else return convertSlashes((0, import_path4.relative)(root, directoryPath), options2.pathSeparator) + options2.pathSeparator + filename;
  };
}
function joinPath(filename) {
  return filename;
}
function joinDirectoryPath(filename, directoryPath, separator) {
  return directoryPath + filename + separator;
}
function build$7(root, options2) {
  const { relativePaths, includeBasePath } = options2;
  return relativePaths && root ? joinPathWithRelativePath(root, options2) : includeBasePath ? joinPathWithBasePath : joinPath;
}
function pushDirectoryWithRelativePath(root) {
  return function(directoryPath, paths) {
    paths.push(directoryPath.substring(root.length) || ".");
  };
}
function pushDirectoryFilterWithRelativePath(root) {
  return function(directoryPath, paths, filters) {
    const relativePath = directoryPath.substring(root.length) || ".";
    if (filters.every((filter) => filter(relativePath, true))) paths.push(relativePath);
  };
}
var pushDirectory = (directoryPath, paths) => {
  paths.push(directoryPath || ".");
};
var pushDirectoryFilter = (directoryPath, paths, filters) => {
  const path2 = directoryPath || ".";
  if (filters.every((filter) => filter(path2, true))) paths.push(path2);
};
var empty$2 = () => {
};
function build$6(root, options2) {
  const { includeDirs, filters, relativePaths } = options2;
  if (!includeDirs) return empty$2;
  if (relativePaths) return filters && filters.length ? pushDirectoryFilterWithRelativePath(root) : pushDirectoryWithRelativePath(root);
  return filters && filters.length ? pushDirectoryFilter : pushDirectory;
}
var pushFileFilterAndCount = (filename, _paths, counts, filters) => {
  if (filters.every((filter) => filter(filename, false))) counts.files++;
};
var pushFileFilter = (filename, paths, _counts, filters) => {
  if (filters.every((filter) => filter(filename, false))) paths.push(filename);
};
var pushFileCount = (_filename, _paths, counts, _filters) => {
  counts.files++;
};
var pushFile = (filename, paths) => {
  paths.push(filename);
};
var empty$1 = () => {
};
function build$5(options2) {
  const { excludeFiles, filters, onlyCounts } = options2;
  if (excludeFiles) return empty$1;
  if (filters && filters.length) return onlyCounts ? pushFileFilterAndCount : pushFileFilter;
  else if (onlyCounts) return pushFileCount;
  else return pushFile;
}
var getArray = (paths) => {
  return paths;
};
var getArrayGroup = () => {
  return [""].slice(0, 0);
};
function build$4(options2) {
  return options2.group ? getArrayGroup : getArray;
}
var groupFiles = (groups, directory, files) => {
  groups.push({
    directory,
    files,
    dir: directory
  });
};
var empty = () => {
};
function build$3(options2) {
  return options2.group ? groupFiles : empty;
}
var resolveSymlinksAsync = function(path2, state, callback$1) {
  const { queue, fs, options: { suppressErrors } } = state;
  queue.enqueue();
  fs.realpath(path2, (error5, resolvedPath) => {
    if (error5) return queue.dequeue(suppressErrors ? null : error5, state);
    fs.stat(resolvedPath, (error$1, stat) => {
      if (error$1) return queue.dequeue(suppressErrors ? null : error$1, state);
      if (stat.isDirectory() && isRecursive(path2, resolvedPath, state)) return queue.dequeue(null, state);
      callback$1(stat, resolvedPath);
      queue.dequeue(null, state);
    });
  });
};
var resolveSymlinks = function(path2, state, callback$1) {
  const { queue, fs, options: { suppressErrors } } = state;
  queue.enqueue();
  try {
    const resolvedPath = fs.realpathSync(path2);
    const stat = fs.statSync(resolvedPath);
    if (stat.isDirectory() && isRecursive(path2, resolvedPath, state)) return;
    callback$1(stat, resolvedPath);
  } catch (e) {
    if (!suppressErrors) throw e;
  }
};
function build$2(options2, isSynchronous) {
  if (!options2.resolveSymlinks || options2.excludeSymlinks) return null;
  return isSynchronous ? resolveSymlinks : resolveSymlinksAsync;
}
function isRecursive(path2, resolved, state) {
  if (state.options.useRealPaths) return isRecursiveUsingRealPaths(resolved, state);
  let parent = (0, import_path4.dirname)(path2);
  let depth = 1;
  while (parent !== state.root && depth < 2) {
    const resolvedPath = state.symlinks.get(parent);
    const isSameRoot = !!resolvedPath && (resolvedPath === resolved || resolvedPath.startsWith(resolved) || resolved.startsWith(resolvedPath));
    if (isSameRoot) depth++;
    else parent = (0, import_path4.dirname)(parent);
  }
  state.symlinks.set(path2, resolved);
  return depth > 1;
}
function isRecursiveUsingRealPaths(resolved, state) {
  return state.visited.includes(resolved + state.options.pathSeparator);
}
var onlyCountsSync = (state) => {
  return state.counts;
};
var groupsSync = (state) => {
  return state.groups;
};
var defaultSync = (state) => {
  return state.paths;
};
var limitFilesSync = (state) => {
  return state.paths.slice(0, state.options.maxFiles);
};
var onlyCountsAsync = (state, error5, callback$1) => {
  report(error5, callback$1, state.counts, state.options.suppressErrors);
  return null;
};
var defaultAsync = (state, error5, callback$1) => {
  report(error5, callback$1, state.paths, state.options.suppressErrors);
  return null;
};
var limitFilesAsync = (state, error5, callback$1) => {
  report(error5, callback$1, state.paths.slice(0, state.options.maxFiles), state.options.suppressErrors);
  return null;
};
var groupsAsync = (state, error5, callback$1) => {
  report(error5, callback$1, state.groups, state.options.suppressErrors);
  return null;
};
function report(error5, callback$1, output, suppressErrors) {
  if (error5 && !suppressErrors) callback$1(error5, output);
  else callback$1(null, output);
}
function build$1(options2, isSynchronous) {
  const { onlyCounts, group, maxFiles } = options2;
  if (onlyCounts) return isSynchronous ? onlyCountsSync : onlyCountsAsync;
  else if (group) return isSynchronous ? groupsSync : groupsAsync;
  else if (maxFiles) return isSynchronous ? limitFilesSync : limitFilesAsync;
  else return isSynchronous ? defaultSync : defaultAsync;
}
var readdirOpts = { withFileTypes: true };
var walkAsync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
  state.queue.enqueue();
  if (currentDepth < 0) return state.queue.dequeue(null, state);
  const { fs } = state;
  state.visited.push(crawlPath);
  state.counts.directories++;
  fs.readdir(crawlPath || ".", readdirOpts, (error5, entries = []) => {
    callback$1(entries, directoryPath, currentDepth);
    state.queue.dequeue(state.options.suppressErrors ? null : error5, state);
  });
};
var walkSync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
  const { fs } = state;
  if (currentDepth < 0) return;
  state.visited.push(crawlPath);
  state.counts.directories++;
  let entries = [];
  try {
    entries = fs.readdirSync(crawlPath || ".", readdirOpts);
  } catch (e) {
    if (!state.options.suppressErrors) throw e;
  }
  callback$1(entries, directoryPath, currentDepth);
};
function build2(isSynchronous) {
  return isSynchronous ? walkSync : walkAsync;
}
var Queue = class {
  constructor(onQueueEmpty) {
    __publicField(this, "count", 0);
    this.onQueueEmpty = onQueueEmpty;
  }
  enqueue() {
    this.count++;
    return this.count;
  }
  dequeue(error5, output) {
    if (this.onQueueEmpty && (--this.count <= 0 || error5)) {
      this.onQueueEmpty(error5, output);
      if (error5) {
        output.controller.abort();
        this.onQueueEmpty = void 0;
      }
    }
  }
};
var Counter = class {
  constructor() {
    __publicField(this, "_files", 0);
    __publicField(this, "_directories", 0);
  }
  set files(num) {
    this._files = num;
  }
  get files() {
    return this._files;
  }
  set directories(num) {
    this._directories = num;
  }
  get directories() {
    return this._directories;
  }
  /**
  * @deprecated use `directories` instead
  */
  /* c8 ignore next 3 */
  get dirs() {
    return this._directories;
  }
};
var Aborter = class {
  constructor() {
    __publicField(this, "aborted", false);
  }
  abort() {
    this.aborted = true;
  }
};
var Walker = class {
  constructor(root, options2, callback$1) {
    __publicField(this, "root");
    __publicField(this, "isSynchronous");
    __publicField(this, "state");
    __publicField(this, "joinPath");
    __publicField(this, "pushDirectory");
    __publicField(this, "pushFile");
    __publicField(this, "getArray");
    __publicField(this, "groupFiles");
    __publicField(this, "resolveSymlink");
    __publicField(this, "walkDirectory");
    __publicField(this, "callbackInvoker");
    __publicField(this, "walk", (entries, directoryPath, depth) => {
      const { paths, options: { filters, resolveSymlinks: resolveSymlinks$1, excludeSymlinks, exclude, maxFiles, signal, useRealPaths, pathSeparator }, controller } = this.state;
      if (controller.aborted || signal && signal.aborted || maxFiles && paths.length > maxFiles) return;
      const files = this.getArray(this.state.paths);
      for (let i2 = 0; i2 < entries.length; ++i2) {
        const entry = entries[i2];
        if (entry.isFile() || entry.isSymbolicLink() && !resolveSymlinks$1 && !excludeSymlinks) {
          const filename = this.joinPath(entry.name, directoryPath);
          this.pushFile(filename, files, this.state.counts, filters);
        } else if (entry.isDirectory()) {
          let path2 = joinDirectoryPath(entry.name, directoryPath, this.state.options.pathSeparator);
          if (exclude && exclude(entry.name, path2)) continue;
          this.pushDirectory(path2, paths, filters);
          this.walkDirectory(this.state, path2, path2, depth - 1, this.walk);
        } else if (this.resolveSymlink && entry.isSymbolicLink()) {
          let path2 = joinPathWithBasePath(entry.name, directoryPath);
          this.resolveSymlink(path2, this.state, (stat, resolvedPath) => {
            if (stat.isDirectory()) {
              resolvedPath = normalizePath(resolvedPath, this.state.options);
              if (exclude && exclude(entry.name, useRealPaths ? resolvedPath : path2 + pathSeparator)) return;
              this.walkDirectory(this.state, resolvedPath, useRealPaths ? resolvedPath : path2 + pathSeparator, depth - 1, this.walk);
            } else {
              resolvedPath = useRealPaths ? resolvedPath : path2;
              const filename = (0, import_path4.basename)(resolvedPath);
              const directoryPath$1 = normalizePath((0, import_path4.dirname)(resolvedPath), this.state.options);
              resolvedPath = this.joinPath(filename, directoryPath$1);
              this.pushFile(resolvedPath, files, this.state.counts, filters);
            }
          });
        }
      }
      this.groupFiles(this.state.groups, directoryPath, files);
    });
    this.isSynchronous = !callback$1;
    this.callbackInvoker = build$1(options2, this.isSynchronous);
    this.root = normalizePath(root, options2);
    this.state = {
      root: isRootDirectory(this.root) ? this.root : this.root.slice(0, -1),
      paths: [""].slice(0, 0),
      groups: [],
      counts: new Counter(),
      options: options2,
      queue: new Queue((error5, state) => this.callbackInvoker(state, error5, callback$1)),
      symlinks: /* @__PURE__ */ new Map(),
      visited: [""].slice(0, 0),
      controller: new Aborter(),
      fs: options2.fs || nativeFs
    };
    this.joinPath = build$7(this.root, options2);
    this.pushDirectory = build$6(this.root, options2);
    this.pushFile = build$5(options2);
    this.getArray = build$4(options2);
    this.groupFiles = build$3(options2);
    this.resolveSymlink = build$2(options2, this.isSynchronous);
    this.walkDirectory = build2(this.isSynchronous);
  }
  start() {
    this.pushDirectory(this.root, this.state.paths, this.state.options.filters);
    this.walkDirectory(this.state, this.root, this.root, this.state.options.maxDepth, this.walk);
    return this.isSynchronous ? this.callbackInvoker(this.state, null) : null;
  }
};
function promise(root, options2) {
  return new Promise((resolve$1, reject) => {
    callback(root, options2, (err, output) => {
      if (err) return reject(err);
      resolve$1(output);
    });
  });
}
function callback(root, options2, callback$1) {
  let walker = new Walker(root, options2, callback$1);
  walker.start();
}
function sync(root, options2) {
  const walker = new Walker(root, options2);
  return walker.start();
}
var APIBuilder = class {
  constructor(root, options2) {
    this.root = root;
    this.options = options2;
  }
  withPromise() {
    return promise(this.root, this.options);
  }
  withCallback(cb) {
    callback(this.root, this.options, cb);
  }
  sync() {
    return sync(this.root, this.options);
  }
};
var pm = null;
try {
  __require2.resolve("picomatch");
  pm = __require2("picomatch");
} catch {
}
var Builder = class {
  constructor(options2) {
    __publicField(this, "globCache", {});
    __publicField(this, "options", {
      maxDepth: Infinity,
      suppressErrors: true,
      pathSeparator: import_path4.sep,
      filters: []
    });
    __publicField(this, "globFunction");
    this.options = {
      ...this.options,
      ...options2
    };
    this.globFunction = this.options.globFunction;
  }
  group() {
    this.options.group = true;
    return this;
  }
  withPathSeparator(separator) {
    this.options.pathSeparator = separator;
    return this;
  }
  withBasePath() {
    this.options.includeBasePath = true;
    return this;
  }
  withRelativePaths() {
    this.options.relativePaths = true;
    return this;
  }
  withDirs() {
    this.options.includeDirs = true;
    return this;
  }
  withMaxDepth(depth) {
    this.options.maxDepth = depth;
    return this;
  }
  withMaxFiles(limit) {
    this.options.maxFiles = limit;
    return this;
  }
  withFullPaths() {
    this.options.resolvePaths = true;
    this.options.includeBasePath = true;
    return this;
  }
  withErrors() {
    this.options.suppressErrors = false;
    return this;
  }
  withSymlinks({ resolvePaths = true } = {}) {
    this.options.resolveSymlinks = true;
    this.options.useRealPaths = resolvePaths;
    return this.withFullPaths();
  }
  withAbortSignal(signal) {
    this.options.signal = signal;
    return this;
  }
  normalize() {
    this.options.normalizePath = true;
    return this;
  }
  filter(predicate) {
    this.options.filters.push(predicate);
    return this;
  }
  onlyDirs() {
    this.options.excludeFiles = true;
    this.options.includeDirs = true;
    return this;
  }
  exclude(predicate) {
    this.options.exclude = predicate;
    return this;
  }
  onlyCounts() {
    this.options.onlyCounts = true;
    return this;
  }
  crawl(root) {
    return new APIBuilder(root || ".", this.options);
  }
  withGlobFunction(fn) {
    this.globFunction = fn;
    return this;
  }
  /**
  * @deprecated Pass options using the constructor instead:
  * ```ts
  * new fdir(options).crawl("/path/to/root");
  * ```
  * This method will be removed in v7.0
  */
  /* c8 ignore next 4 */
  crawlWithOptions(root, options2) {
    this.options = {
      ...this.options,
      ...options2
    };
    return new APIBuilder(root || ".", this.options);
  }
  glob(...patterns) {
    if (this.globFunction) return this.globWithOptions(patterns);
    return this.globWithOptions(patterns, ...[{ dot: true }]);
  }
  globWithOptions(patterns, ...options2) {
    const globFn = this.globFunction || pm;
    if (!globFn) throw new Error("Please specify a glob function to use glob matching.");
    var isMatch = this.globCache[patterns.join("\0")];
    if (!isMatch) {
      isMatch = globFn(patterns, ...options2);
      this.globCache[patterns.join("\0")] = isMatch;
    }
    this.options.filters.push((path2) => isMatch(path2));
    return this;
  }
};

// node_modules/tinyglobby/dist/index.mjs
var import_picomatch = __toESM(require_picomatch2(), 1);
var isReadonlyArray = Array.isArray;
var isWin = process.platform === "win32";
var ONLY_PARENT_DIRECTORIES = /^(\/?\.\.)+$/;
function getPartialMatcher(patterns, options2 = {}) {
  const patternsCount = patterns.length;
  const patternsParts = Array(patternsCount);
  const matchers = Array(patternsCount);
  const globstarEnabled = !options2.noglobstar;
  for (let i2 = 0; i2 < patternsCount; i2++) {
    const parts = splitPattern(patterns[i2]);
    patternsParts[i2] = parts;
    const partsCount = parts.length;
    const partMatchers = Array(partsCount);
    for (let j = 0; j < partsCount; j++) partMatchers[j] = (0, import_picomatch.default)(parts[j], options2);
    matchers[i2] = partMatchers;
  }
  return (input) => {
    const inputParts = input.split("/");
    if (inputParts[0] === ".." && ONLY_PARENT_DIRECTORIES.test(input)) return true;
    for (let i2 = 0; i2 < patterns.length; i2++) {
      const patternParts = patternsParts[i2];
      const matcher = matchers[i2];
      const inputPatternCount = inputParts.length;
      const minParts = Math.min(inputPatternCount, patternParts.length);
      let j = 0;
      while (j < minParts) {
        const part = patternParts[j];
        if (part.includes("/")) return true;
        const match = matcher[j](inputParts[j]);
        if (!match) break;
        if (globstarEnabled && part === "**") return true;
        j++;
      }
      if (j === inputPatternCount) return true;
    }
    return false;
  };
}
var WIN32_ROOT_DIR = /^[A-Z]:\/$/i;
var isRoot = isWin ? (p) => WIN32_ROOT_DIR.test(p) : (p) => p === "/";
function buildFormat(cwd, root, absolute) {
  if (cwd === root || root.startsWith(`${cwd}/`)) {
    if (absolute) {
      const start = isRoot(cwd) ? cwd.length : cwd.length + 1;
      return (p, isDir) => p.slice(start, isDir ? -1 : void 0) || ".";
    }
    const prefix = root.slice(cwd.length + 1);
    if (prefix) return (p, isDir) => {
      if (p === ".") return prefix;
      const result = `${prefix}/${p}`;
      return isDir ? result.slice(0, -1) : result;
    };
    return (p, isDir) => isDir && p !== "." ? p.slice(0, -1) : p;
  }
  if (absolute) return (p) => import_path5.posix.relative(cwd, p) || ".";
  return (p) => import_path5.posix.relative(cwd, `${root}/${p}`) || ".";
}
function buildRelative(cwd, root) {
  if (root.startsWith(`${cwd}/`)) {
    const prefix = root.slice(cwd.length + 1);
    return (p) => `${prefix}/${p}`;
  }
  return (p) => {
    const result = import_path5.posix.relative(cwd, `${root}/${p}`);
    if (p.endsWith("/") && result !== "") return `${result}/`;
    return result || ".";
  };
}
var splitPatternOptions = { parts: true };
function splitPattern(path$1) {
  var _result$parts;
  const result = import_picomatch.default.scan(path$1, splitPatternOptions);
  return ((_result$parts = result.parts) === null || _result$parts === void 0 ? void 0 : _result$parts.length) ? result.parts : [path$1];
}
var POSIX_UNESCAPED_GLOB_SYMBOLS = new RegExp("(?<!\\\\)([()[\\]{}*?|]|^!|[!+@](?=\\()|\\\\(?![()[\\]{}!*+?@|]))", "g");
var WIN32_UNESCAPED_GLOB_SYMBOLS = new RegExp("(?<!\\\\)([()[\\]{}]|^!|[!+@](?=\\())", "g");
var escapePosixPath = (path$1) => path$1.replace(POSIX_UNESCAPED_GLOB_SYMBOLS, "\\$&");
var escapeWin32Path = (path$1) => path$1.replace(WIN32_UNESCAPED_GLOB_SYMBOLS, "\\$&");
var escapePath = isWin ? escapeWin32Path : escapePosixPath;
function isDynamicPattern(pattern, options2) {
  if ((options2 === null || options2 === void 0 ? void 0 : options2.caseSensitiveMatch) === false) return true;
  const scan = import_picomatch.default.scan(pattern);
  return scan.isGlob || scan.negated;
}
function log(...tasks) {
  console.log(`[tinyglobby ${(/* @__PURE__ */ new Date()).toLocaleTimeString("es")}]`, ...tasks);
}
var PARENT_DIRECTORY = /^(\/?\.\.)+/;
var ESCAPING_BACKSLASHES = /\\(?=[()[\]{}!*+?@|])/g;
var BACKSLASHES = /\\/g;
function normalizePattern(pattern, expandDirectories, cwd, props, isIgnore) {
  let result = pattern;
  if (pattern.endsWith("/")) result = pattern.slice(0, -1);
  if (!result.endsWith("*") && expandDirectories) result += "/**";
  const escapedCwd = escapePath(cwd);
  if (import_path5.default.isAbsolute(result.replace(ESCAPING_BACKSLASHES, ""))) result = import_path5.posix.relative(escapedCwd, result);
  else result = import_path5.posix.normalize(result);
  const parentDirectoryMatch = PARENT_DIRECTORY.exec(result);
  const parts = splitPattern(result);
  if (parentDirectoryMatch === null || parentDirectoryMatch === void 0 ? void 0 : parentDirectoryMatch[0]) {
    const n = (parentDirectoryMatch[0].length + 1) / 3;
    let i2 = 0;
    const cwdParts = escapedCwd.split("/");
    while (i2 < n && parts[i2 + n] === cwdParts[cwdParts.length + i2 - n]) {
      result = result.slice(0, (n - i2 - 1) * 3) + result.slice((n - i2) * 3 + parts[i2 + n].length + 1) || ".";
      i2++;
    }
    const potentialRoot = import_path5.posix.join(cwd, parentDirectoryMatch[0].slice(i2 * 3));
    if (!potentialRoot.startsWith(".") && props.root.length > potentialRoot.length) {
      props.root = potentialRoot;
      props.depthOffset = -n + i2;
    }
  }
  if (!isIgnore && props.depthOffset >= 0) {
    var _props$commonPath;
    (_props$commonPath = props.commonPath) !== null && _props$commonPath !== void 0 || (props.commonPath = parts);
    const newCommonPath = [];
    const length = Math.min(props.commonPath.length, parts.length);
    for (let i2 = 0; i2 < length; i2++) {
      const part = parts[i2];
      if (part === "**" && !parts[i2 + 1]) {
        newCommonPath.pop();
        break;
      }
      if (part !== props.commonPath[i2] || isDynamicPattern(part) || i2 === parts.length - 1) break;
      newCommonPath.push(part);
    }
    props.depthOffset = newCommonPath.length;
    props.commonPath = newCommonPath;
    props.root = newCommonPath.length > 0 ? import_path5.posix.join(cwd, ...newCommonPath) : cwd;
  }
  return result;
}
function processPatterns({ patterns = ["**/*"], ignore = [], expandDirectories = true }, cwd, props) {
  if (typeof patterns === "string") patterns = [patterns];
  if (typeof ignore === "string") ignore = [ignore];
  const matchPatterns = [];
  const ignorePatterns = [];
  for (const pattern of ignore) {
    if (!pattern) continue;
    if (pattern[0] !== "!" || pattern[1] === "(") ignorePatterns.push(normalizePattern(pattern, expandDirectories, cwd, props, true));
  }
  for (const pattern of patterns) {
    if (!pattern) continue;
    if (pattern[0] !== "!" || pattern[1] === "(") matchPatterns.push(normalizePattern(pattern, expandDirectories, cwd, props, false));
    else if (pattern[1] !== "!" || pattern[2] === "(") ignorePatterns.push(normalizePattern(pattern.slice(1), expandDirectories, cwd, props, true));
  }
  return {
    match: matchPatterns,
    ignore: ignorePatterns
  };
}
function formatPaths(paths, relative3) {
  for (let i2 = paths.length - 1; i2 >= 0; i2--) {
    const path$1 = paths[i2];
    paths[i2] = relative3(path$1);
  }
  return paths;
}
function normalizeCwd(cwd) {
  if (!cwd) return process.cwd().replace(BACKSLASHES, "/");
  if (cwd instanceof URL) return (0, import_url2.fileURLToPath)(cwd).replace(BACKSLASHES, "/");
  return import_path5.default.resolve(cwd).replace(BACKSLASHES, "/");
}
function getCrawler(patterns, inputOptions = {}) {
  const options2 = process.env.TINYGLOBBY_DEBUG ? {
    ...inputOptions,
    debug: true
  } : inputOptions;
  const cwd = normalizeCwd(options2.cwd);
  if (options2.debug) log("globbing with:", {
    patterns,
    options: options2,
    cwd
  });
  if (Array.isArray(patterns) && patterns.length === 0) return [{
    sync: () => [],
    withPromise: async () => []
  }, false];
  const props = {
    root: cwd,
    commonPath: null,
    depthOffset: 0
  };
  const processed = processPatterns({
    ...options2,
    patterns
  }, cwd, props);
  if (options2.debug) log("internal processing patterns:", processed);
  const matchOptions = {
    dot: options2.dot,
    nobrace: options2.braceExpansion === false,
    nocase: options2.caseSensitiveMatch === false,
    noextglob: options2.extglob === false,
    noglobstar: options2.globstar === false,
    posix: true
  };
  const matcher = (0, import_picomatch.default)(processed.match, {
    ...matchOptions,
    ignore: processed.ignore
  });
  const ignore = (0, import_picomatch.default)(processed.ignore, matchOptions);
  const partialMatcher = getPartialMatcher(processed.match, matchOptions);
  const format = buildFormat(cwd, props.root, options2.absolute);
  const formatExclude = options2.absolute ? format : buildFormat(cwd, props.root, true);
  const fdirOptions = {
    filters: [options2.debug ? (p, isDirectory) => {
      const path$1 = format(p, isDirectory);
      const matches = matcher(path$1);
      if (matches) log(`matched ${path$1}`);
      return matches;
    } : (p, isDirectory) => matcher(format(p, isDirectory))],
    exclude: options2.debug ? (_2, p) => {
      const relativePath = formatExclude(p, true);
      const skipped = relativePath !== "." && !partialMatcher(relativePath) || ignore(relativePath);
      if (skipped) log(`skipped ${p}`);
      else log(`crawling ${p}`);
      return skipped;
    } : (_2, p) => {
      const relativePath = formatExclude(p, true);
      return relativePath !== "." && !partialMatcher(relativePath) || ignore(relativePath);
    },
    fs: options2.fs ? {
      readdir: options2.fs.readdir || import_fs4.default.readdir,
      readdirSync: options2.fs.readdirSync || import_fs4.default.readdirSync,
      realpath: options2.fs.realpath || import_fs4.default.realpath,
      realpathSync: options2.fs.realpathSync || import_fs4.default.realpathSync,
      stat: options2.fs.stat || import_fs4.default.stat,
      statSync: options2.fs.statSync || import_fs4.default.statSync
    } : void 0,
    pathSeparator: "/",
    relativePaths: true,
    resolveSymlinks: true,
    signal: options2.signal
  };
  if (options2.deep !== void 0) fdirOptions.maxDepth = Math.round(options2.deep - props.depthOffset);
  if (options2.absolute) {
    fdirOptions.relativePaths = false;
    fdirOptions.resolvePaths = true;
    fdirOptions.includeBasePath = true;
  }
  if (options2.followSymbolicLinks === false) {
    fdirOptions.resolveSymlinks = false;
    fdirOptions.excludeSymlinks = true;
  }
  if (options2.onlyDirectories) {
    fdirOptions.excludeFiles = true;
    fdirOptions.includeDirs = true;
  } else if (options2.onlyFiles === false) fdirOptions.includeDirs = true;
  props.root = props.root.replace(BACKSLASHES, "");
  const root = props.root;
  if (options2.debug) log("internal properties:", props);
  const relative3 = cwd !== root && !options2.absolute && buildRelative(cwd, props.root);
  return [new Builder(fdirOptions).crawl(root), relative3];
}
async function glob(patternsOrOptions, options2) {
  if (patternsOrOptions && (options2 === null || options2 === void 0 ? void 0 : options2.patterns)) throw new Error("Cannot pass patterns as both an argument and an option");
  const isModern = isReadonlyArray(patternsOrOptions) || typeof patternsOrOptions === "string";
  const opts = isModern ? options2 : patternsOrOptions;
  const patterns = isModern ? patternsOrOptions : patternsOrOptions.patterns;
  const [crawler, relative3] = getCrawler(patterns, opts);
  if (!relative3) return crawler.withPromise();
  return formatPaths(await crawler.withPromise(), relative3);
}

// node_modules/vitepress-plugin-file-content-loader/dist/index.mjs
var import_node_path8 = __toESM(require_node_path(), 1);
var import_picocolors6 = __toESM(require_picocolors_browser(), 1);
import { createMarkdownRenderer as T } from "vitepress";
var G = "1.0.13";
var i = createLogger("info", { prefix: `[vitepress-plugin-file-content-loader v${G}]` });
var K = (e, r = "green", t = { timestamp: true }) => {
  i.info(import_picocolors6.default[r](e), t);
};
var M = (e, r = "yellow", t = { timestamp: true }) => {
  i.warn(import_picocolors6.default[r](e), t);
};
var N = (e, r = "yellow", t = { timestamp: true }) => {
  i.info(import_picocolors6.default[r](e), t);
};
var V = (e, r = "red", t = { timestamp: true }) => {
  i.error(import_picocolors6.default[r](e), t);
};
var q = { info: K, warn: M, warnOnce: N, error: V };
function H(e) {
  let r = false;
  return { name: "vite-plugin-vitepress-file-content-loader", async config(t) {
    if (r) return;
    r = true;
    let { pattern: o } = e;
    if (!o) return;
    const { includeSrc: D = false, render: _2 = false, excerpt: a, transformData: d2, transformRaw: u, globOptions: g, themeConfigKey: m2 = "contentLoader" } = e, { site: { themeConfig: E2 = {}, base: R2 }, srcDir: c, cleanUrls: w, markdown: C2, rewrites: F } = t.vitepress;
    typeof o == "string" && (o = [o]), o = o.map((n) => normalizePath$3((0, import_node_path8.join)(c, n)));
    const L2 = (await glob(o, { expandDirectories: false, ...g, ignore: ["**/node_modules/**", "**/dist/**", ...(g == null ? void 0 : g.ignore) || []] })).sort(), h = await T(c, C2, R2, i), l = [];
    for (const n of L2) {
      if (!n.endsWith(".md")) continue;
      const p = (0, import_node_fs8.readFileSync)(n, "utf-8"), { data: O, excerpt: x2 } = (0, import_gray_matter7.default)(p, typeof a == "string" ? { excerpt_separator: a } : { excerpt: a }), f = normalizePath$3((0, import_node_path8.relative)(c, n)).replace(/(^|\/)index\.md$/, "$1"), b2 = "/" + f.replace(/\.md$/, w ? "" : ".html"), k2 = "/" + (F.map[f] || f).replace(/\.md$/, w ? "" : ".html"), A2 = _2 ? h.render(p) : void 0, I2 = a && (x2 == null ? void 0 : x2.endsWith(`
`)) ? h.render(x2) : void 0, y = { src: D ? p : void 0, html: A2, frontmatter: O, excerpt: I2, relativePath: b2, url: k2 };
      l.push(d2 ? await d2(y) : y);
    }
    E2[m2] = u ? await u(l) : l;
    const v2 = m2.charAt(0).toUpperCase() + m2.slice(1);
    q.info(`Injected ${v2} Data Successfully. 注入 ${v2} 数据成功!`);
  } };
}

// node_modules/vitepress-plugin-auto-frontmatter/dist/index.mjs
var import_node_path9 = __toESM(require_node_path(), 1);
var import_gray_matter8 = __toESM(require_gray_matter(), 1);
var import_node_fs9 = __toESM(require_node_fs(), 1);
var import_picocolors7 = __toESM(require_picocolors_browser(), 1);
var H2 = (e, r = "yyyy-MM-dd hh:mm:ss") => {
  if (!e) return "";
  const t = new Date(e), n = t.getFullYear(), o = String(t.getMonth() + 1).padStart(2, "0"), s2 = String(t.getDate()).padStart(2, "0"), l = String(t.getHours()).padStart(2, "0"), i2 = String(t.getMinutes()).padStart(2, "0"), p = String(t.getSeconds()).padStart(2, "0");
  return r.replace("yyyy", n.toString()).replace("MM", o).replace("dd", s2).replace("hh", l).replace("mm", i2).replace("ss", p);
};
var L = "1.0.13";
var m = createLogger("info", { prefix: `[vitepress-plugin-auto-frontmatter v${L}]` });
var R = (e, r = "green", t = { timestamp: true }) => {
  m.info(import_picocolors7.default[r](e), t);
};
var W2 = (e, r = "yellow", t = { timestamp: true }) => {
  m.warn(import_picocolors7.default[r](e), t);
};
var Y = (e, r = "yellow", t = { timestamp: true }) => {
  m.info(import_picocolors7.default[r](e), t);
};
var _ = (e, r = "red", t = { timestamp: true }) => {
  m.error(import_picocolors7.default[r](e), t);
};
var q2 = { info: R, warn: W2, warnOnce: Y, error: _ };
function B(e = {}) {
  let r = false;
  return { name: "vitepress-plugin-auto-frontmatter", async config(t) {
    if (r) return;
    r = true;
    let { pattern: n } = e;
    if (!n) return;
    const { globOptions: o } = e, { srcDir: s2 } = t.vitepress;
    typeof n == "string" && (n = [n]), n = n.map((i2) => normalizePath$3((0, import_node_path9.join)(s2, i2)));
    const l = await glob(n, { expandDirectories: false, ...o, absolute: true, ignore: ["**/node_modules/**", "**/dist/**", ...(o == null ? void 0 : o.ignore) || []] });
    C(l, e, s2);
  } };
}
var C = (e, r, t) => {
  const { include: n, exclude: o, transform: s2, recoverTransform: l = false } = r;
  for (const i2 of e) {
    if (!i2.endsWith(".md")) continue;
    const p = (0, import_node_fs9.readFileSync)(i2, "utf-8"), { data: c, content: O } = (0, import_gray_matter8.default)(p);
    if (c.layout === "home" || c.layout === false || !v(c, { exclude: o, include: n })) continue;
    let a = { ...c }, g = false;
    const y = (0, import_node_fs9.statSync)(i2), w = { title: x((0, import_node_path9.basename)(i2)), date: y.birthtime || y.atime };
    for (const [u, j] of Object.entries(w)) c[u] === void 0 && (a = { [u]: j, ...a }, g = true);
    const h = s2 == null ? void 0 : s2(a, M2(t, i2));
    if (!g && !h) continue;
    const f = h || a;
    if (f.date = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(a.date) ? a.date : H2(a.date, "yyyy-MM-dd hh:mm:ss"), !l && Object.keys(f).every((u) => c[u] !== void 0)) continue;
    const F = Object.keys(f).length ? import_gray_matter8.default.stringify("", f).replace(/'/g, "").replace(/(?:\r?\n)$/, "") : "";
    (0, import_node_fs9.writeFileSync)(i2, `${F}${O}`), q2.info(`'${i2}' has been successfully written to frontmatter. (成功写入 frontmatter)`);
  }
};
var v = (e, { exclude: r, include: t }) => {
  if (t && !Object.keys(e).length) return false;
  if (r || t) {
    for (const [n, o] of Object.entries(e)) if ((r == null ? void 0 : r[n]) === o || (t == null ? void 0 : t[n]) !== o) return false;
  }
  return true;
};
var x = (e) => {
  let r = "";
  const t = e.split(".");
  if (t.length === 2) r = t[0];
  else {
    const n = e.indexOf("."), o = e.lastIndexOf(".");
    r = e.substring(n + 1, o);
  }
  return r;
};
var M2 = (e, r) => {
  const t = (0, import_node_path9.resolve)(e), n = (0, import_node_path9.resolve)(r), o = (0, import_node_path9.relative)(t, n).replace(/\\/g, "/");
  return { filePath: r, relativePath: o };
};

// node_modules/vitepress-theme-teek/es/config/autoFrontmatter/permalink.mjs
var import_crypto2 = __toESM(require_crypto(), 1);
var replacePlaceholder = (placeholderStr, path2) => {
  let result = placeholderStr.replace(/\$UUID(\d*)/gi, (_2, numStr) => {
    const length = numStr ? parseInt(numStr, 10) : 6;
    return createRandomUuid(length);
  });
  result = result.replace(/\$PATH(\d*)/gi, (_2, numStr) => {
    let length = 6;
    if (numStr) {
      const parsed = parseInt(numStr, 10);
      length = Math.max(6, Math.min(parsed, 10));
    }
    const firstSegment = getFirstPathSegment(path2).replace(/^\d+[.\-_]/, "");
    const hasChinese = /[\u4e00-\u9fa5]/.test(firstSegment);
    return hasChinese ? getHashByFirstPath(firstSegment, length) : firstSegment;
  });
  return result;
};
var createRandomUuid = (length = 6) => {
  return (Math.random() + Math.random()).toString(16).slice(2, length + 2);
};
var getFirstPathSegment = (path2) => {
  const segments = path2.split("/").filter((segment) => segment.trim());
  return segments.length ? segments[0] : "";
};
var getHashByFirstPath = (path2, length) => {
  const hash = import_crypto2.default.createHash("sha256").update(path2, "utf8").digest("hex");
  return hash.slice(0, Math.min(length, hash.length));
};
var cleanPathSpaces = (path2) => {
  const segments = path2.split("/");
  const validSegments = segments.filter((segment) => segment.trim());
  return validSegments.length ? `/${validSegments.join("/")}` : "";
};

// node_modules/vitepress-theme-teek/es/config/autoFrontmatter/addFrontmatter.mjs
var createSimplePermalink = (permalinkPrefix = "") => {
  let finalPermalinkPrefix = permalinkPrefix;
  if (!finalPermalinkPrefix.startsWith("/")) finalPermalinkPrefix = "/" + finalPermalinkPrefix;
  if (!finalPermalinkPrefix.endsWith("/")) finalPermalinkPrefix = finalPermalinkPrefix + "/";
  return { permalink: `${finalPermalinkPrefix}${createRandomUuid(6)}` };
};
var createComplexPermalink = (permalink, fileInfo, permalinkRules) => {
  if (!permalinkRules.length) return {};
  const specialFolderName = "*";
  for (const permalinkRule of permalinkRules) {
    const { folderName, rule = "/$path/$uuid6", removeLevel = 0 } = permalinkRule;
    if (!fileInfo.relativePath.startsWith(folderName) && folderName !== specialFolderName) continue;
    let originalPermalink = permalink || "";
    let normalizedRule = "";
    const finalRule = cleanPathSpaces(rule);
    if (finalRule) {
      normalizedRule = replacePlaceholder(finalRule, fileInfo.relativePath);
      normalizedRule = normalizedRule.startsWith("/") ? normalizedRule : `/${normalizedRule}`;
      const targetFirstSegment = getFirstPathSegment(normalizedRule);
      const currentFirstSegment = getFirstPathSegment(originalPermalink);
      if (currentFirstSegment === targetFirstSegment) continue;
    }
    if (removeLevel > 0) {
      const parts = originalPermalink.split("/").filter((part) => part);
      const actualRemoveLevel = Math.min(removeLevel, parts.length);
      const remainingParts = parts.slice(actualRemoveLevel);
      originalPermalink = remainingParts.length ? `/${remainingParts.join("/")}/` : "";
    }
    const newPermalink = `${normalizedRule}${originalPermalink}`;
    return { permalink: newPermalink };
  }
};
var createCategory = (fileInfo, ignore = []) => {
  const siteConfig = globalThis.VITEPRESS_CONFIG;
  const { locales = {} } = siteConfig.userConfig;
  const relativePathArr = fileInfo.relativePath.split("/");
  const categories = [];
  relativePathArr.forEach((item, index) => {
    var _a;
    const filename = ((_a = item.replace(/^\d+\./, "").split(".")) == null ? void 0 : _a[0]) || "";
    if (index !== relativePathArr.length - 1 && !locales[filename] && !ignore.includes(filename))
      categories.push(filename);
  });
  return { categories: categories.length ? categories : [""] };
};
var createCoverImg = (coverList) => {
  return { coverImg: coverList[Math.floor(Math.random() * coverList.length)] };
};

// node_modules/vitepress-theme-teek/es/config/post/index.mjs
var import_node_path10 = __toESM(require_node_path(), 1);
var import_node_fs10 = __toESM(require_node_fs(), 1);
var import_gray_matter9 = __toESM(require_gray_matter(), 1);
var transformData = (data) => {
  const siteConfig = globalThis.VITEPRESS_CONFIG;
  const { themeConfig } = siteConfig.userConfig;
  const { frontmatter, url, relativePath, excerpt } = data;
  if (frontmatter.date) frontmatter.date = formatDate(frontmatter.date);
  return {
    url,
    relativePath,
    frontmatter,
    author: frontmatter.author || themeConfig.author,
    title: getTitle(data),
    date: getDate(data, siteConfig.srcDir),
    excerpt,
    capture: getCaptureText(data)
  };
};
var transformRaw = (posts) => {
  const siteConfig = globalThis.VITEPRESS_CONFIG;
  const { locales = {} } = siteConfig.userConfig;
  const postsData = resolvePosts(posts);
  const localesKeys = Object.keys(locales);
  if (!localesKeys.length) return postsData;
  const postsLocale = {};
  localesKeys.filter((localesKey) => localesKey !== "root").forEach((localesKey) => {
    const localePosts = posts.filter((post) => post.relativePath.startsWith(`/${localesKey}`));
    postsLocale[localesKey] = resolvePosts(localePosts);
  });
  const rootPosts = posts.filter(
    (post) => !localesKeys.some((localesKey) => post.relativePath.startsWith(`/${localesKey}`))
  );
  postsLocale["root"] = resolvePosts(rootPosts);
  return { ...postsData, locales: postsLocale };
};
var resolvePosts = (posts) => {
  const originPosts = filterPosts(posts);
  const sortPostsByDateAndSticky = getSortPostsByDateAndSticky(originPosts);
  const sortPostsByDate = getSortPostsByDate(originPosts);
  const groupPostsByYear = groupByYear(sortPostsByDate);
  const groupPostsByYearMonth = groupByYearMonth(sortPostsByDate);
  const groupPosts = getGroupPosts(sortPostsByDateAndSticky);
  const groupCards = getGroupCards(groupPosts);
  return {
    allPosts: posts,
    originPosts,
    sortPostsByDateAndSticky,
    sortPostsByDate,
    groupPostsByYear,
    groupPostsByYearMonth,
    groupPosts,
    groupCards
  };
};
function getTitle(post) {
  if (post.frontmatter.title) return post.frontmatter.title;
  const { content = "" } = (0, import_gray_matter9.default)(post.src || "", {});
  const splitName = (0, import_node_path10.basename)(post.relativePath).split(".");
  const name = splitName.length > 1 ? splitName[1] : splitName[0];
  return getTitleFromMarkdown(content) || name || "";
}
function getDate(post, srcDir) {
  const { frontmatter, relativePath } = post;
  if (frontmatter.date) return frontmatter.date;
  const filePath = (0, import_node_path10.join)(
    srcDir,
    `${relativePath.endsWith("/") ? `${relativePath}/index` : relativePath.replace(/\.html$/, "")}.md`
  );
  const stat = (0, import_node_fs10.statSync)(filePath);
  return formatDate(stat.birthtime || stat.atime);
}
var getCaptureText = (post, count = 300) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  const { content = "" } = (0, import_gray_matter9.default)(post.src || "", {});
  return (_n = (_m = (_l = (_k = (_j = (_i = (_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = content == null ? void 0 : content.replace(/^#+\s+.*/, "")) == null ? void 0 : _a.replace(/#/g, "")) == null ? void 0 : _b.replace(/!\[.*?\]\(.*?\)/g, "")) == null ? void 0 : _c.replace(/\[(.*?)\]\(.*?\)/g, "$1")) == null ? void 0 : _d.replace(/\*\*(.*?)\*\*/g, "$1")) == null ? void 0 : _e.replace(/\[\[TOC\]\]/g, "")) == null ? void 0 : _f.replace(/:::.*?(\n|$)/g, "")) == null ? void 0 : _g.replace(/<!-- more -->/g, "")) == null ? void 0 : _h.split("\n")) == null ? void 0 : _i.filter((v2) => !!v2)) == null ? void 0 : _j.join("\n")) == null ? void 0 : _k.replace(/>(.*)/, "")) == null ? void 0 : _l.replace(/</g, "&lt;").replace(/>/g, "&gt;")) == null ? void 0 : _m.trim()) == null ? void 0 : _n.slice(0, count);
};

// node_modules/vitepress-theme-teek/es/config/vitePlugins.mjs
var registerPluginAndGet = (vitePlugins = {}, teekTheme = true) => {
  const plugins = [];
  const ignoreDir = {
    autoFrontmatter: ["**/@pages/**", "**/.scripts/**"],
    sidebar: ["@pages", "@fragment", "examples", ".scripts"],
    mdH1: ["@pages", ".scripts"],
    docAnalysis: ["@pages", /目录页/, ".scripts"],
    fileContentLoader: ["**/components/**", "**/.vitepress/**", "**/public/**", "**/*目录页*/**", "**/.scripts/**"]
  };
  plugins.push(...registerLoosePlugins(vitePlugins, ignoreDir));
  if (teekTheme !== false) plugins.push(...registerTightPlugins(vitePlugins, ignoreDir));
  return plugins;
};
var registerLoosePlugins = (vitePlugins, ignoreDir) => {
  const plugins = [];
  const {
    sidebar = true,
    sidebarOption = {},
    permalink = true,
    permalinkOption = {},
    mdH1 = true,
    mdH1Option = {},
    docAnalysis = true,
    docAnalysisOption = {},
    autoFrontmatter = false,
    autoFrontmatterOption = {}
  } = vitePlugins || {};
  if (autoFrontmatter) {
    const {
      pattern,
      globOptions = {},
      transform,
      categories = true,
      permalink: permalink2 = true,
      coverImg = false,
      forceCoverImg = false,
      coverImgList = [],
      permalinkType = sidebarOption.resolveRule === "rewrites" ? "rules" : "simple",
      permalinkPrefix = "pages",
      permalinkRules = []
    } = autoFrontmatterOption;
    if (!pattern) autoFrontmatterOption.pattern = "**/*.md";
    autoFrontmatterOption.globOptions = {
      ...autoFrontmatterOption.globOptions,
      ignore: [...ignoreDir.autoFrontmatter, ...globOptions.ignore || []]
    };
    autoFrontmatterOption.transform = (frontmatter, fileInfo) => {
      var _a;
      let transformResult = {};
      if (permalink2 && !((_a = frontmatter.permalink) == null ? void 0 : _a.trim())) {
        const permalinkObj = permalinkType === "simple" || !fileInfo.relativePath.includes("/") ? createSimplePermalink(permalinkPrefix) : createComplexPermalink(frontmatter.permalink, fileInfo, permalinkRules);
        transformResult = { ...transformResult, ...permalinkObj };
      }
      if (categories && !frontmatter.categories) {
        transformResult = { ...transformResult, ...createCategory(fileInfo, ["@fragment"]) };
      }
      if (coverImg && coverImgList.length) {
        if (!frontmatter.coverImg) {
          transformResult = { ...transformResult, ...createCoverImg(coverImgList) };
        } else if (frontmatter.coverImg && forceCoverImg) {
          transformResult = { ...transformResult, ...createCoverImg(coverImgList) };
        }
      }
      transformResult = (transform == null ? void 0 : transform({ ...frontmatter, ...transformResult }, fileInfo)) || transformResult;
      return Object.keys(transformResult).length ? { ...frontmatter, ...transformResult } : void 0;
    };
    plugins.push(B(autoFrontmatterOption));
  }
  if (sidebar) {
    sidebarOption.ignoreList = [...(sidebarOption == null ? void 0 : sidebarOption.ignoreList) || [], ...ignoreDir.sidebar];
    plugins.push(VitePluginVitePressSidebarResolve(sidebarOption));
  }
  if (permalink) {
    plugins.push(...VitePluginVitePressPermalink(permalinkOption));
  }
  if (mdH1) {
    const selfBeforeInject = mdH1Option.beforeInject;
    mdH1Option.beforeInject = (frontmatter, id, title) => {
      if (["cataloguePage", "TkCataloguePage"].includes(frontmatter.layout) || frontmatter.catalogue) return false;
      if (["archivesPage", "TkArchivesPage"].includes(frontmatter.layout) || frontmatter.archivesPage) return false;
      if (frontmatter.titleTag) {
        return `${title} <TkTitleTag size="large">${frontmatter.titleTag}</TkTitleTag>`;
      }
      return selfBeforeInject == null ? void 0 : selfBeforeInject(frontmatter, id, title);
    };
    mdH1Option.ignoreList = [...(mdH1Option == null ? void 0 : mdH1Option.ignoreList) || [], ...ignoreDir.mdH1];
    plugins.push(VitePluginVitePressMdH1(mdH1Option));
  }
  if (docAnalysis) {
    docAnalysisOption.ignoreList = [...(docAnalysisOption == null ? void 0 : docAnalysisOption.ignoreList) || [], ...ignoreDir.docAnalysis];
    plugins.push(VitePluginVitePressDocAnalysis(docAnalysisOption));
  }
  return plugins;
};
var registerTightPlugins = (vitePlugins, ignoreDir) => {
  const plugins = [];
  const { catalogueOption = {}, fileContentLoaderIgnore = [] } = vitePlugins || {};
  plugins.push(VitePluginVitePressCatalogue(catalogueOption));
  const fileContentLoaderOptions = {
    pattern: ["**/*.md"],
    // 指定摘录格式
    excerpt: "<!-- more -->",
    includeSrc: true,
    transformData,
    transformRaw,
    themeConfigKey: "posts",
    globOptions: {
      ignore: [...ignoreDir.fileContentLoader, ...fileContentLoaderIgnore]
    }
  };
  plugins.push(H(fileContentLoaderOptions));
  return plugins;
};

// node_modules/vitepress-theme-teek/es/config/index.mjs
var defineTeekConfig = (config = {}) => {
  var _a, _b;
  const { vitePlugins, markdown = {}, ...teekConfig } = config;
  const plugins = registerPluginAndGet(vitePlugins, teekConfig.teekTheme);
  const head = [];
  if (((_b = (_a = teekConfig.docAnalysis) == null ? void 0 : _a.statistics) == null ? void 0 : _b.provider) === "busuanzi") {
    head.push(["meta", { name: "referrer", content: "no-referrer-when-downgrade" }]);
  }
  return {
    // 使用永久链接插件需要忽略死链提醒
    ignoreDeadLinks: true,
    metaChunk: true,
    head,
    vite: {
      plugins,
      ssr: { noExternal: ["vitepress-theme-teek"] },
      // 解决项目启动后终端打印 Scss 的废弃警告：The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
      css: { preprocessorOptions: { scss: { api: "modern" } } }
    },
    markdown: {
      config: (md) => {
        var _a2;
        [todoPlugin, shareCardPlugin, imgCardPlugin, navCardPlugin, videoPlugin].forEach((plugin) => md.use(plugin));
        const { container = {}, demo, config: config2 } = markdown;
        if (!(demo == null ? void 0 : demo.disabled)) md.use(demoPlugin, demo).use(containerPlugin, container.label);
        createContainersThenUse(md, ((_a2 = container.config) == null ? void 0 : _a2.call(container)) || []);
        config2 == null ? void 0 : config2(md);
      }
    },
    themeConfig: teekConfig
  };
};
export {
  LayoutMode,
  SpotlightStyle,
  ThemeColorName,
  createRewrites,
  defineTeekConfig
};
/*! Bundled license information:

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

strip-bom-string/index.js:
  (*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=vitepress-theme-teek_config.js.map
