(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,a){e.exports=a(48)},38:function(e,t,a){},46:function(e,t,a){},48:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),l=a(21),i=a.n(l),r=(a(38),a(2)),c=a(3),o=a(5),u=a(4),h=a(6),m=a(1),p=a(51),d=a(28),b=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).canvas=n.a.createRef(),a.image=n.a.createRef(),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.canvas.current.getContext("2d");this.props.draw(e),this.image.current.src=this.canvas.current.toDataURL()}},{key:"render",value:function(){var e=this.props,t=(e.draw,Object(d.a)(e,["draw"]));return n.a.createElement("div",{className:"CanvasContainer"},n.a.createElement("canvas",Object.assign({ref:this.canvas,className:"Hide"},t)),n.a.createElement("img",{ref:this.image,alt:this.props.title,style:{width:this.props.width,height:this.props.height}}))}}]),t}(n.a.Component),f=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).server=e.server||"",a.crossDomain=!1,a.fetch=a.fetch.bind(Object(m.a)(Object(m.a)(a))),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"fetch",value:function(e){function t(t,a,s){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e,t,a){var s={};this.crossDomain&&(s={crossDomain:!0,headers:{"Content-Type":"application/json"}}),fetch(this.server+e,s).then(function(e){return e.json()}).then(function(e){t(e)},function(e){a?a(e):console.log(e)})})}]),t}(n.a.Component),g=function(e){function t(e,a){var s;return Object(r.a)(this,t),(s=Object(o.a)(this,Object(u.a)(t).call(this,e,a))).state={guesses:0},s}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("guess",function(t){return e.setState({guesses:t.detail.count})})}},{key:"render",value:function(){var e=this,t=this.props.lines.map(function(t,a){return n.a.createElement("span",{className:"line"+(a<=e.state.guesses?" shown":""),key:a},t)});return n.a.createElement("div",{className:"PhraseContainer"},t)}}]),t}(n.a.Component),v=Object(p.a)()(g),y=a(7);function k(e){return getComputedStyle(document.body).getPropertyValue(e)}function S(){return window.matchMedia("(any-hover: none)").matches}function O(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function j(e,t){localStorage.setItem(e,JSON.stringify(t))}function E(e,t){var a=localStorage.getItem(e);try{a=JSON.parse(a)}catch(s){}return null===a&&(a=t),a}var N,w=a(50),C=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={style:E("shareStyle","text"),shareName:a.baseShareName(),options:!1},a.options=n.a.createRef(),a.scoreImage=n.a.createRef(),a.toggleOptions=a.toggleOptions.bind(Object(m.a)(Object(m.a)(a))),a.shareScore=a.shareScore.bind(Object(m.a)(Object(m.a)(a))),a.getScore=a.getScore.bind(Object(m.a)(Object(m.a)(a))),a.makeScore=a.makeScore.bind(Object(m.a)(Object(m.a)(a))),a.makeScoreImage=a.makeScoreImage.bind(Object(m.a)(Object(m.a)(a))),a.makeScoreDescription=a.makeScoreDescription.bind(Object(m.a)(Object(m.a)(a))),a.alertShare=a.alertShare.bind(Object(m.a)(Object(m.a)(a))),a.setTextStyle=a.setTextStyle.bind(Object(m.a)(Object(m.a)(a))),a.setSpoilerStyle=a.setSpoilerStyle.bind(Object(m.a)(Object(m.a)(a))),a.setImageStyle=a.setImageStyle.bind(Object(m.a)(Object(m.a)(a))),a.setStyle=a.setStyle.bind(Object(m.a)(Object(m.a)(a))),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"baseShareName",value:function(){var e=this.props.t;return e("image"===E("shareStyle","text")?"buttons.copyAlt":"buttons.share")}},{key:"toggleOptions",value:function(){this.setState(function(e){return{options:!e.options}})}},{key:"alertShare",value:function(e){var t=this;this.setState({shareName:e}),setTimeout(function(){return t.setState({shareName:t.baseShareName()})},3e3)}},{key:"getScore",value:function(){return E("scores")[this.props.puzzle.order]}},{key:"makeScoreImage",value:function(){var e=this.getScore(),t="Bookle #".concat(this.props.puzzle.order,": ").concat(e,"/6"),a=this.props.puzzle.lines[0],s=this.props.guesses;return n.a.createElement(b,{draw:function(e){var n,l=30;e.fillStyle=k("--bg-color"),e.fillRect(0,0,e.canvas.width,e.canvas.height),e.fillStyle=k("--text-color"),e.font="25px",e.fillText(t,10,l),l+=30,e.font="25px",function(e,t,a){for(var s=e.canvas.width-a,n=t.split(" "),l=[],i=n[0],r=1;r<n.length;r++){var c=n[r];e.measureText(i+" "+c).width<s?i+=" "+c:(l.push(i),i=c)}return l.push(i),l}(e,a,20).forEach(function(t,a){e.fillText(t,20,l),l+=20});var i=(n={},Object(y.a)(n,!0,k("--correct-color")),Object(y.a)(n,!1,k("--guess-bg-color")),n);e.strokeStyle=k("--text-color");var r=20;s.forEach(function(t,a){e.fillStyle=i[t.hint.author],e.fillRect(r,l,30,30),t.hint.book?(e.font="18px mono",e.fillStyle=i[!0],e.fillRect(r,l,30,30),e.translate(r+15,l+15),function(e,t){e.lineWidth=4;var a=t/2;e.beginPath(),e.moveTo(-a,0),e.lineTo(-2,a-2),e.lineTo(a,-a),e.stroke()}(e,20)):(e.fillStyle=k("--arrow-color"),e.fillRect(r,l,30,30),e.fillStyle=k("--text-color"),e.translate(r+15,l+15),-1==t.hint.year&&e.scale(1,-1),function(e,t){var a=t/2;e.beginPath(),e.moveTo(0,-a),e.lineTo(-a,0),e.lineTo(-a/2,0),e.lineTo(-a/2,a),e.lineTo(a/2,a),e.lineTo(a/2,0),e.lineTo(a,0),e.closePath(),e.fill()}(e,20)),e.setTransform(1,0,0,1,0,0),r+=35}),l+=40,e.fillStyle=k("--text-color"),e.font="20px",e.fillText(document.URL,10,l+20)},width:226,height:40*s.length+70+30+10,title:this.makeScoreDescription()})}},{key:"makeScoreDescription",value:function(){var e=this.props.t,t=[e("share.alt.title",{num:this.props.puzzle.order})];t.push(this.props.puzzle.lines[0]);var a=this.getScore();return this.props.success?t.push(e("share.alt.score",{count:a})):t.push(e("share.alt.miss")),this.props.guesses.forEach(function(a,s){var n,l=e("share.alt.guessTitle",{num:s+1});a.hint.book?l+=e("share.alt.guessRight"):(l+=e("share.alt.author",{context:a.hint.author?"right":"wrong"})+", ",l+=e("share.alt.year",{context:(n={},Object(y.a)(n,-1,"early"),Object(y.a)(n,0,"right"),Object(y.a)(n,1,"late"),n)[a.hint.year]}));t.push(l)}),t.push(e("share.alt.link",{url:document.URL})),t.join("\n")}},{key:"makeScore",value:function(){var e,t=this.state.style,a=this.getScore(),s="#Bookle #".concat(this.props.puzzle.order,": ").concat(a,"/6\n  ").concat(this.props.puzzle.lines[0]);if("image"===t)return this.makeScoreImage();var n=(e={},Object(y.a)(e,-1,"\u2b07\ufe0f\ufe0f"),Object(y.a)(e,0,"\u2705"),Object(y.a)(e,1,"\u2b06\ufe0f"),e),l=window.matchMedia("(prefers-color-scheme: light)").matches?"\u2b1c":"\u2b1b",i=[];"spoiler"===t?i=this.props.guesses.map(function(e){if(e.hint.book)return"\ud83d\udfe9"+n[0];var t=[];return e.hint.author?t.push("\ud83d\udfe7"):t.push(l),t.push(n[e.hint.year]+" "),t.push(" ||`"+e.book+"`||"),t.join("")}):i=["\ud83d\udcd6 "+this.props.guesses.map(function(e){return e.hint.book?"\ud83d\udfe9"+n[0]:(e.hint.author?"\ud83d\udfe7":l)+n[e.hint.year]}).join(" ")];return i.splice(0,0,s),i.push(document.URL),i.join("\n")}},{key:"shareScore",value:function(){var e=this,t=this.makeScore();"image"===this.state.style&&(t=this.makeScoreDescription()),S()&&"image"!==this.state.style&&navigator.share?navigator.share({title:"Bookle",text:t}).then(function(t){return e.alertShare("Shared")}):navigator.clipboard?navigator.clipboard.writeText(t).then(function(t){return e.alertShare("Copied")}):alert("Could not copy to clipboard, copy manually here:\n\n"+t)}},{key:"setStyle",value:function(e){j("shareStyle",e),this.setState({style:e,shareName:this.baseShareName()})}},{key:"setTextStyle",value:function(){this.setStyle("text")}},{key:"setSpoilerStyle",value:function(){this.setStyle("spoiler")}},{key:"setImageStyle",value:function(){this.setStyle("image")}},{key:"componentDidUpdate",value:function(e,t,a){var s=0,n=0;this.state.options&&(s=Math.max(this.options.current.children[0].scrollHeight+10,this.options.current.children[1].scrollHeight)+"px",n=1),this.options.current.style="height: "+s+"; opacity: "+n+";",this.scoreImage.current&&(s=0,n=0,this.state.options||(s=this.scoreImage.current.scrollHeight+"px",n=1),this.scoreImage.current.style="height: "+s+"; opacity: "+n+";")}},{key:"render",value:function(){var e=this.props.t,t="Guess Share";this.props.success||(t+=" Fail");var a="",s="";"image"===this.state.style&&(a=e("share.instructions",{context:S()?"tap":"click"}),s=n.a.createElement("div",{className:"ScoreImage Foldable",ref:this.scoreImage},this.makeScoreImage()));var l=this.makeScore();return"image"!==this.state.style&&(l=n.a.createElement("pre",{role:"image","aria-label":e("share.description")},l)),n.a.createElement("div",{className:"ShareBox"},n.a.createElement("button",{tabIndex:"0",autoFocus:!0,className:t,onClick:this.shareScore},this.state.shareName),n.a.createElement("div",{className:"ShareData Foldable",ref:this.options,"aria-hidden":this.state.options?"false":"true",style:{height:0,opacity:0},"aria-live":"polite"},n.a.createElement("div",{className:"ShareOptions","aria-label":e("share.styleChoice")},n.a.createElement("button",{className:"ShareOption"+("text"===this.state.style?" Selected":""),onClick:this.setTextStyle},e("share.textStyle")),n.a.createElement("button",{className:"ShareOption"+("spoiler"===this.state.style?" Selected":""),onClick:this.setSpoilerStyle},e("share.spoilerStyle")),n.a.createElement("button",{className:"ShareOption"+("image"===this.state.style?" Selected":""),onClick:this.setImageStyle},e("share.imageStyle"))),n.a.createElement("div",{className:"ShareContent","aria-live":"polite"},a,l)),s,n.a.createElement("button",{className:"ToggleShareOptions",onClick:this.toggleOptions},n.a.createElement(w.a,{i18nKey:"share.options"},"Share",n.a.createElement("br",null),"Options")))}}]),t}(n.a.Component),x=Object(p.a)()(C),z=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).books=[],a.state={value:"",selected:0},a.handleKeypress=a.handleKeypress.bind(Object(m.a)(Object(m.a)(a))),a.handleChange=a.handleChange.bind(Object(m.a)(Object(m.a)(a))),a.handleSelect=a.handleSelect.bind(Object(m.a)(Object(m.a)(a))),a.selectBook=a.selectBook.bind(Object(m.a)(Object(m.a)(a))),a.handleBlur=a.handleBlur.bind(Object(m.a)(Object(m.a)(a))),a.loadBooks=a.loadBooks.bind(Object(m.a)(Object(m.a)(a))),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"handleKeypress",value:function(e){var t=this.state.selected,a=this.filteredBooks(),s=a.length;if("ArrowDown"===e.code?(null===t?t=s-1:t-=1,t<0&&(t=null)):"ArrowUp"===e.code&&(null===t?t=0:t+=1,t>=s&&(t=null)),"Enter"===e.code)if(null===t)t=0;else{var n=a[t];this.selectBook(n)}this.setState({selected:t})}},{key:"handleChange",value:function(e){this.guessId=null,this.setState({value:e.target.value,selected:null}),this.props.onSelect()}},{key:"handleSelect",value:function(e){this.selectBook({id:e.target.value,title:e.target.textContent})}},{key:"handleBlur",value:function(e){}},{key:"selectBook",value:function(e){e&&(this.guessId=e.id,this.setState({value:e.title}),this.props.onSelect(e))}},{key:"filteredBooks",value:function(){var e=O,t=e(this.state.value).split(" ").map(function(e){return new RegExp("\\b"+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi")});return this.books.filter(function(a){return t.reduce(function(t,s){return t&&(e(a.title).match(s)||e(a.author).match(s))},!0)})}},{key:"render",value:function(){var e="",t=null;if(!this.guessId&&this.state.value){var a=this,s=this.filteredBooks().map(function(e,s){var l="Book";return s===a.state.selected&&(l+=" Selected",t=e),n.a.createElement("li",{className:l,key:e.id,value:e.id,role:"option",onClick:a.handleSelect,id:"book-"+e.id},e.title," (",e.author,")")});e=n.a.createElement("ul",{className:"BookList",id:"books","aria-label":"books",role:"listbox"},s)}var l=this.props.t;return n.a.createElement("div",{className:"LookupWrapper"},n.a.createElement("label",{className:"Hidden",htmlFor:"guess-lookup"},l("lookup.description")),n.a.createElement("input",{id:"guess-lookup",type:"text",className:"Guess Lookup",autoFocus:!0,role:"combobox",placeholder:l("lookup.prompt"),value:this.state.value,"aria-controls":"Books","aria-autocomplete":"list","aria-expanded":e?"true":"false","aria-activedescendant":t?"Book-"+t.id:"none",onBlur:this.handleBlur,onChange:this.handleChange,onKeyDown:this.handleKeypress}),e)}},{key:"componentWillUnmount",value:function(){this.books=[]}},{key:"loadBooks",value:function(){var e=this;this.fetch("/books.json",function(t){e.books=t})}},{key:"componentDidMount",value:function(){this.loadBooks()}}]),t}(f),T=Object(p.a)()(z),I=(N={},Object(y.a)(N,-1,"fa-arrow-down"),Object(y.a)(N,1,"fa-arrow-up"),Object(y.a)(N,0,"fa-check"),Object(y.a)(N,!0,"fa-check"),Object(y.a)(N,!1,"fa-xmark"),N),B=function(e){function t(e,a){var s;Object(r.a)(this,t);var n=!1,l=!1,i=[];if((s=Object(o.a)(this,Object(u.a)(t).call(this,e,a))).props.puzzle){var c=E("guess"+s.props.puzzle.order);Array.isArray(c)&&((n=(l=(i=c)[i.length-1].success)||i.length>=6)?s.dispatchGuess(6):s.dispatchGuess(i.length))}return s.state={guess:null,guesses:i,guessing:!1,done:n,success:l},s.onSelect=s.onSelect.bind(Object(m.a)(Object(m.a)(s))),s.handleKey=s.handleKey.bind(Object(m.a)(Object(m.a)(s))),s.makeGuess=s.makeGuess.bind(Object(m.a)(Object(m.a)(s))),s}return Object(h.a)(t,e),Object(c.a)(t,[{key:"onSelect",value:function(e){this.setState({guess:e,done:!!e&&e.success})}},{key:"handleKey",value:function(e){this.state.guess&&"Enter"===e.code&&e.target.classList.contains("Lookup")&&(this.makeGuess(),e.preventDefault())}},{key:"dispatchGuess",value:function(e){var t=new CustomEvent("guess",{detail:{count:e}});document.dispatchEvent(t)}},{key:"makeGuess",value:function(){var e=this;if(!this.state.guessing){var t=new URLSearchParams({book:this.state.guess.id,puzzle:this.props.puzzle.id}).toString();this.setState({guessing:!0}),this.fetch("/guess.json?"+t,function(t){var a=e.state.guesses;a.push(t);var s=t.success||a.length>=6;if(e.setState({guesses:a,guessing:!1,done:s,success:t.success,guess:null,sid:t.sid,mapGuess:null}),s?e.dispatchGuess(6):e.dispatchGuess(a.length),e.props.puzzle.order&&(j("guess"+e.props.puzzle.order,e.state.guesses),s)){var n,l=E("scores")||{};n=t.success?a.length:"X",l[e.props.puzzle.order]=n,j("scores",l)}},function(t){e.setState({guessing:!1})})}}},{key:"render",value:function(){var e=this,t=this.props.t,a=[0,1,2,3,4,5].map(function(t){return e.state.guesses[t]||!1}).map(function(e,a){var s;return e?n.a.createElement("li",{className:"Guess Hints",key:a},n.a.createElement("div",{className:"author hint"},e.author,n.a.createElement("i",{className:"icon fa-solid ".concat(I[e.hint.author])})),n.a.createElement("div",{className:"bookTitle hint"},e.book,n.a.createElement("i",{className:"icon fa-solid ".concat(I[e.hint.book])})),n.a.createElement("div",{className:"year hint",title:t("guess.yearHint",{context:(s={},Object(y.a)(s,-1,"early"),Object(y.a)(s,0,"right"),Object(y.a)(s,1,"late"),s)[e.hint.year]})},e.year,n.a.createElement("i",{className:"icon fa-solid ".concat(I[e.hint.year])}))):n.a.createElement("li",{className:"Guess Empty",key:a})}),s="",l="";return this.state.done?l=n.a.createElement(x,{success:this.state.success,guesses:this.state.guesses,puzzle:this.props.puzzle}):(s=n.a.createElement(T,{onSelect:this.onSelect,key:this.state.guesses.length}),l=n.a.createElement("button",{tabIndex:"0",className:"MakeGuess Guess",onClick:this.makeGuess,disabled:this.state.guessing||!this.state.guess},t("buttons.guess"))),n.a.createElement("div",{className:"GuessWrapper"},n.a.createElement("ul",{className:"Guesses"},a),n.a.createElement("div",{className:"LookupSection",onKeyDown:this.handleKey},s,l))}}]),t}(f),L=(n.a.Component,Object(p.a)()(B)),D=(a(46),function(e){function t(e,a){var s;return Object(r.a)(this,t),(s=Object(o.a)(this,Object(u.a)(t).call(this,e,a))).state={on:!1},s.close=s.close.bind(Object(m.a)(Object(m.a)(s))),s.onClick=s.onClick.bind(Object(m.a)(Object(m.a)(s))),s.contents=s.contents.bind(Object(m.a)(Object(m.a)(s))),s}return Object(h.a)(t,e),Object(c.a)(t,[{key:"getTitle",value:function(){return"Modal"}},{key:"close",value:function(e){this.props.onClose(e)}},{key:"onClick",value:function(e){(function e(t,a){return!!t.classList.contains(a)||!!t.parentElement&&e(t.parentElement,a)}(e.target,"Close")||e.target.classList.contains("Overlay"))&&this.close()}},{key:"render",value:function(){var e=this.props.t||function(e){return e},t=this.state.on?1:0,a=this.state.on?"100vh":0;return n.a.createElement("div",{className:"Overlay",onClick:this.onClick,style:{opacity:t,height:a},"aria-hidden":this.state.on?"false":"true","aria-live":"polite"},n.a.createElement("div",{className:"ModalContainer"},n.a.createElement("h1",null,this.getTitle()),n.a.createElement("hr",null),this.contents(),n.a.createElement("a",{className:"Close Icon"},n.a.createElement("span",{className:"Description"},e("buttons.close")),n.a.createElement("i",{className:"fa-solid fa-circle-xmark"}))))}},{key:"contents",value:function(){}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{on:e.on}}}]),t}(n.a.Component)),G=function(e){function t(){return Object(r.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"getTitle",value:function(){return this.props.t("titles.info")}},{key:"contents",value:function(){var e=this.props.t;return n.a.createElement("div",{className:"InfoContent"},n.a.createElement("p",null,e("info.credit")),n.a.createElement("p",null,n.a.createElement("a",{href:"https://github.com/sealgair/bookle",target:"_new"},n.a.createElement("i",{className:"fa-brands fa-github Icon"}),e("info.code"))),n.a.createElement("p",null,n.a.createElement("a",{href:"https://twitter.com/ChaseCaster",target:"_new"},n.a.createElement("i",{className:"fa-brands fa-twitter Icon"}),e("info.tweet"))),n.a.createElement("p",null,n.a.createElement("a",{rel:"me",href:"https://weirder.earth/@chase",target:"_new"},n.a.createElement("i",{className:"fa-brands fa-mastodon Icon"}),e("info.toot"))),n.a.createElement("p",null,e("info.bugs")),n.a.createElement("hr",null),n.a.createElement("p",{className:"links"},n.a.createElement("div",{className:"title"},e("info.links")),n.a.createElement("a",{href:"https://lingule.xyz",target:"_blank"},"Lingule")," ",n.a.createElement("div",{className:"description"},e("info.lingule"))))}}]),t}(D),M=Object(p.a)()(G),R=function(e){function t(){return Object(r.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.t,t=this.props.i18n,a="";this.props.romanization&&(a=n.a.createElement("div",{id:"romanization",className:"ToolTip Side",title:e("tips.romanization")},this.props.romanization));var s=this.props.vertical?"vertical":"";return n.a.createElement("div",{className:"WordContainer"},n.a.createElement("span",{id:"word",className:"ToolTip Side ".concat(s),title:e("tips.word")},this.props.word),a,n.a.createElement("span",{id:"ipa",className:"ToolTip Side",title:e("tips.ipa")},this.props.ipa),n.a.createElement("span",{id:"meaning",className:"ToolTip Side",title:e("tips.meaning")},this.props.meaning[t.resolvedLanguage]||this.props.meaning.en))}}]),t}(n.a.Component),H=(Object(p.a)()(R),function(e){function t(){return Object(r.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"getTitle",value:function(){return this.props.t("titles.how-to")}},{key:"contents",value:function(){var e=this.props.t;return n.a.createElement("div",null,n.a.createElement("p",null,e("howto.intro")),n.a.createElement("p",null,e("howto.afterGuess")),n.a.createElement("p",null,e("howto.example.phrase"),n.a.createElement("div",{className:"PhraseContainer"},n.a.createElement("span",{className:"line shown"},"It was the best of times, it was the worst of times,")),e("howto.example.guess"),n.a.createElement("div",{className:"GuessWrapper"},n.a.createElement("ul",{className:"Guesses"},n.a.createElement("li",{className:"Guess Hints"},n.a.createElement("div",{className:"author hint"},"Charles Dickens",n.a.createElement("i",{className:"icon fa-solid fa-check"})),n.a.createElement("div",{className:"bookTitle hint"},"Oliver Twist",n.a.createElement("i",{className:"icon fa-solid fa-xmark"})),n.a.createElement("div",{className:"year hint"},"1873",n.a.createElement("i",{className:"icon fa-solid fa-arrow-up"}))))),e("howto.example.explain")))}}]),t}(D)),F=Object(p.a)()(H),K={en:{endonym:"English"},es:{endonym:"Espa\xf1ol"},fr:{endonym:"Fran\xe7ais"}},P=function(e){function t(e,a){var s;return Object(r.a)(this,t),(s=Object(o.a)(this,Object(u.a)(t).call(this,e,a))).state={share:E("shareStyle","text")},s.changeShareStyle=s.changeShareStyle.bind(Object(m.a)(Object(m.a)(s))),s}return Object(h.a)(t,e),Object(c.a)(t,[{key:"getTitle",value:function(){return this.props.t("titles.settings")}},{key:"changeShareStyle",value:function(e){var t=e.target.value;j("shareStyle",t),this.setState({share:t})}},{key:"contents",value:function(){var e=this.props.t,t=this.props.i18n,a=[],s=a&&a.length<6&&0===a.filter(function(e){return e.hint.language}).length||!a,l=Object.keys(K).map(function(e){return n.a.createElement("li",{key:e},n.a.createElement("label",null,n.a.createElement("input",{type:"radio",name:"language",value:e,checked:t.resolvedLanguage===e,onChange:function(a){a.target.checked&&t.changeLanguage(e)}}),K[e].endonym))});return n.a.createElement("div",null,n.a.createElement("fieldset",null,n.a.createElement("legend",null,e("settings.sharing")),n.a.createElement("span",null,s?"":e("settings.shareHint")),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("label",null,n.a.createElement("input",{type:"radio",name:"style",value:"text",onChange:this.changeShareStyle,disabled:!s,checked:"text"===this.state.share}),e("settings.shareText"))),n.a.createElement("li",null,n.a.createElement("label",null,n.a.createElement("input",{type:"radio",name:"style",value:"spoiler",onChange:this.changeShareStyle,disabled:!s,checked:"spoiler"===this.state.share}),e("settings.shareSpoilers"))),n.a.createElement("li",null,n.a.createElement("label",null,n.a.createElement("input",{type:"radio",name:"style",value:"image",onChange:this.changeShareStyle,disabled:!s,checked:"image"===this.state.share}),e("settings.shareImage"))))),n.a.createElement("br",null),n.a.createElement("fieldset",null,n.a.createElement("legend",null,e("settings.language")),n.a.createElement("ul",null,l),n.a.createElement("p",null,e("settings.languageDisclaimer")),n.a.createElement("p",null,e("settings.languageExplanation"))))}}]),t}(D),U=Object(p.a)()(P),W=function(e){function t(e,a){var s;Object(r.a)(this,t),s=Object(o.a)(this,Object(u.a)(t).call(this,e,a));var n=E("scores")||{};s.games=Object.keys(n).length,s.wins=0,s.maxScore=0,s.scores={};var l=Object(m.a)(Object(m.a)(s));return s.cStreak=0,s.mStreak=0,Object.values(n).forEach(function(e,t){var a="X"!==e;a&&(e=parseInt(e));var s=l.scores[e]||0;l.scores[e]=s+1,l.maxScore=Math.max(l.maxScore,l.scores[e]),a&&(l.wins+=1),"X"===e?l.cStreak=0:l.cStreak+=1,l.mStreak=Math.max(l.cStreak,l.mStreak)}),s.onClick=s.onClick.bind(Object(m.a)(Object(m.a)(s))),s}return Object(h.a)(t,e),Object(c.a)(t,[{key:"getTitle",value:function(){return this.props.t("titles.stats")}},{key:"contents",value:function(){var e=this,t=this.props.t,a=n.a.createElement("h4",null,t("stats.empty"));if(Object.keys(this.scores).length>0){var s=[1,2,3,4,5,6].map(function(t){return e.scores[t]||0}).map(function(a,s){return n.a.createElement("li",{style:{width:a/e.maxScore*100+"%"},key:s,"aria-label":t("stats.graphLabelA",{count:a})+t("stats.graphLabelB",{count:s+1})},n.a.createElement("div",{className:"GraphLabel","aria-hidden":"true"},a))});a=n.a.createElement("ol",{className:"Distribution","aria-label":t("stats.distribution")},s)}return n.a.createElement("div",null,n.a.createElement("div",{className:"StatsList"},n.a.createElement("div",{className:"StatBox"},n.a.createElement("span",{className:"Stat"},this.games),n.a.createElement("span",{className:"StatLabel"},t("stats.games"))),n.a.createElement("div",{className:"StatBox"},n.a.createElement("span",{className:"Stat"},this.wins),n.a.createElement("span",{className:"StatLabel"},t("stats.wins"))),n.a.createElement("div",{className:"StatBox"},n.a.createElement("span",{className:"Stat"},this.cStreak),n.a.createElement("span",{className:"StatLabel"},t("stats.thisStreak"))),n.a.createElement("div",{className:"StatBox"},n.a.createElement("span",{className:"Stat"},this.mStreak),n.a.createElement("span",{className:"StatLabel"},t("stats.maxStreak")))),n.a.createElement("h2",null,t("stats.distribution")),n.a.createElement("hr",null),a)}}]),t}(D),A=Object(p.a)()(W),J=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={puzzle:{lines:["Welcome to Bookle!"]},modal:null},a.openInfo=a.openInfo.bind(Object(m.a)(Object(m.a)(a))),a.openHelp=a.openHelp.bind(Object(m.a)(Object(m.a)(a))),a.openSettings=a.openSettings.bind(Object(m.a)(Object(m.a)(a))),a.openStats=a.openStats.bind(Object(m.a)(Object(m.a)(a))),a.closeModal=a.closeModal.bind(Object(m.a)(Object(m.a)(a))),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"openInfo",value:function(){this.setState({modal:"info"})}},{key:"openHelp",value:function(){this.setState({modal:"help"})}},{key:"openSettings",value:function(){this.setState({modal:"settings"})}},{key:"openStats",value:function(){this.setState({modal:"stats"})}},{key:"closeModal",value:function(){this.setState({modal:null})}},{key:"render",value:function(){var e=this.props.t;return n.a.createElement("div",{className:"Container"},"",n.a.createElement("div",{className:"MainColumn","aria-hidden":this.state.modal?"true":"false"},n.a.createElement("div",{className:"Buffer"}),n.a.createElement("div",{className:"ContentWrapper"},n.a.createElement("header",{className:"Header"},n.a.createElement("span",{className:"IconSet Left"},n.a.createElement("a",{className:"Help Icon TipBelow",title:e("titles.how-to"),onClick:this.openHelp},n.a.createElement("i",{className:"fa-solid fa-circle-question"})),n.a.createElement("a",{className:"Info Icon TipBelow",title:e("titles.credits"),onClick:this.openInfo},n.a.createElement("i",{className:"fa-solid fa-circle-info"}))),n.a.createElement("h1",null,"Bookle"),n.a.createElement("span",{className:"IconSet Right"},n.a.createElement("a",{className:"Settings Icon TipBelow",title:e("titles.settings"),onClick:this.openSettings},n.a.createElement("i",{className:"fa-solid fa-gear"})),n.a.createElement("a",{className:"Stats Icon TipBelow",title:e("titles.score"),onClick:this.openStats},n.a.createElement("i",{className:"fa-solid fa-square-poll-horizontal"})))),n.a.createElement(v,{lines:this.state.puzzle.lines}),n.a.createElement("div",{className:"Body"},n.a.createElement(L,{puzzle:this.state.puzzle,key:this.state.puzzle.order})))),n.a.createElement(M,{on:"info"===this.state.modal,onClose:this.closeModal}),n.a.createElement(F,{on:"help"===this.state.modal,onClose:this.closeModal}),n.a.createElement(U,{on:"settings"===this.state.modal,word:this.state.word,onClose:this.closeModal}),n.a.createElement(A,{on:"stats"===this.state.modal,onClose:this.closeModal}))}},{key:"componentDidMount",value:function(){var e=this;this.fetch("/today.json?tz="+(new Date).getTimezoneOffset(),function(t){e.setState({puzzle:t})})}}]),t}(f),_=Object(p.a)()(J),X=function(e){e&&e instanceof Function&&a.e(1).then(a.bind(null,49)).then(function(t){var a=t.getCLS,s=t.getFID,n=t.getFCP,l=t.getLCP,i=t.getTTFB;a(e),s(e),n(e),l(e),i(e)})},q=a(20),V=a(18),$=a(25),Q=a(26);q.a.use(Q.a).use($.a).use(V.e).init({debug:!0,fallbackLng:"en",interpolation:{escapeValue:!1}});q.a;i.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(_,null))),X()}},[[29,3,2]]]);
//# sourceMappingURL=main.1353bb7d.chunk.js.map