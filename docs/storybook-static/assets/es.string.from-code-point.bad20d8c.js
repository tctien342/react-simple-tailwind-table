import{_ as i,f as v,o as d}from"./iframe.e6e32e6b.js";var f=i,s=v,g=d,m=RangeError,e=String.fromCharCode,n=String.fromCodePoint,u=s([].join),C=!!n&&n.length!=1;f({target:"String",stat:!0,arity:1,forced:C},{fromCodePoint:function(h){for(var t=[],a=arguments.length,o=0,r;a>o;){if(r=+arguments[o++],g(r,1114111)!==r)throw m(r+" is not a valid code point");t[o]=r<65536?e(r):e(((r-=65536)>>10)+55296,r%1024+56320)}return u(t,"")}});
//# sourceMappingURL=es.string.from-code-point.bad20d8c.js.map
