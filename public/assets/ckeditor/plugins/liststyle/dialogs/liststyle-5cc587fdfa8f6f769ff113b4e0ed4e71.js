/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
!function(){function e(e,t){var a;try{a=e.getSelection().getRanges()[0]}catch(i){return null}return a.shrink(CKEDITOR.SHRINK_TEXT),e.elementPath(a.getCommonAncestor()).contains(t,1)}function t(t,n){var o=t.lang.liststyle;if("bulletedListStyle"==n)return{title:o.bulletedTitle,minWidth:300,minHeight:50,contents:[{id:"info",accessKey:"I",elements:[{type:"select",label:o.type,id:"type",align:"center",style:"width:150px",items:[[o.notset,""],[o.circle,"circle"],[o.disc,"disc"],[o.square,"square"]],setup:function(e){this.setValue(e.getStyle("list-style-type")||i[e.getAttribute("type")]||e.getAttribute("type")||"")},commit:function(e){var t=this.getValue();t?e.setStyle("list-style-type",t):e.removeStyle("list-style-type")}}]}],onShow:function(){var t=this.getParentEditor();(t=e(t,"ul"))&&this.setupContent(t)},onOk:function(){var t=this.getParentEditor();(t=e(t,"ul"))&&this.commitContent(t)}};if("numberedListStyle"==n){var r=[[o.notset,""],[o.lowerRoman,"lower-roman"],[o.upperRoman,"upper-roman"],[o.lowerAlpha,"lower-alpha"],[o.upperAlpha,"upper-alpha"],[o.decimal,"decimal"]];return(!CKEDITOR.env.ie||7<CKEDITOR.env.version)&&r.concat([[o.armenian,"armenian"],[o.decimalLeadingZero,"decimal-leading-zero"],[o.georgian,"georgian"],[o.lowerGreek,"lower-greek"]]),{title:o.numberedTitle,minWidth:300,minHeight:50,contents:[{id:"info",accessKey:"I",elements:[{type:"hbox",widths:["25%","75%"],children:[{label:o.start,type:"text",id:"start",validate:CKEDITOR.dialog.validate.integer(o.validateStartNumber),setup:function(e){this.setValue(e.getFirst(a).getAttribute("value")||e.getAttribute("start")||1)},commit:function(e){var t=e.getFirst(a),i=t.getAttribute("value")||e.getAttribute("start")||1;e.getFirst(a).removeAttribute("value");var n=parseInt(this.getValue(),10);for(isNaN(n)?e.removeAttribute("start"):e.setAttribute("start",n),e=t,t=i,n=isNaN(n)?1:n;(e=e.getNext(a))&&t++;)e.getAttribute("value")==t&&e.setAttribute("value",n+t-i)}},{type:"select",label:o.type,id:"type",style:"width: 100%;",items:r,setup:function(e){this.setValue(e.getStyle("list-style-type")||i[e.getAttribute("type")]||e.getAttribute("type")||"")},commit:function(e){var t=this.getValue();t?e.setStyle("list-style-type",t):e.removeStyle("list-style-type")}}]}]}],onShow:function(){var t=this.getParentEditor();(t=e(t,"ol"))&&this.setupContent(t)},onOk:function(){var t=this.getParentEditor();(t=e(t,"ol"))&&this.commitContent(t)}}}}var a=function(e){return e.type==CKEDITOR.NODE_ELEMENT&&e.is("li")},i={a:"lower-alpha",A:"upper-alpha",i:"lower-roman",I:"upper-roman",1:"decimal",disc:"disc",circle:"circle",square:"square"};CKEDITOR.dialog.add("numberedListStyle",function(e){return t(e,"numberedListStyle")}),CKEDITOR.dialog.add("bulletedListStyle",function(e){return t(e,"bulletedListStyle")})}();