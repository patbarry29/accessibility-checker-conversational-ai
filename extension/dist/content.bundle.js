(()=>{"use strict";var e={424:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,i){function r(e){try{c(o.next(e))}catch(e){i(e)}}function l(e){try{c(o.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,l)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.sendAndReceiveMessage=t.captureResponse=t.simulateInput=void 0;const s=n(283),i=n(84);function r(e){const t=document.querySelector('input[type="text"], textarea'),n=document.querySelector('div[contenteditable="true"]');n?((0,s.setSentMessage)(e),n.innerHTML=e,n.focus(),l(n)):t?((0,s.setSentMessage)(e),t.focus(),t.value=e,l(t)):console.error("Input field or rich text editor not found.")}function l(e){const t=new Event("input",{bubbles:!0});e.dispatchEvent(t);const n=new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:"Enter",code:"Enter",keyCode:13});e.dispatchEvent(n)}function c(e,t=2e4){return o(this,void 0,void 0,(function*(){const n=Date.now(),r=window.location.href,l=new URL(r).origin,c=i.ChatPlatformSelectors[l];if(!c)throw new Error("Invalid website specified");const u=Array.from(document.querySelectorAll(c));let d="";const a=()=>o(this,void 0,void 0,(function*(){var o;const i=Date.now(),r=Array.from(document.querySelectorAll(c)).filter((e=>{var t;return!(null===(t=e.textContent)||void 0===t?void 0:t.includes((0,s.getSentMessage)()))&&!u.includes(e)}));if(r.length>0){const t=(null===(o=r[r.length-1].textContent)||void 0===o?void 0:o.trim())||"";t.length>d.length?(d=t,yield new Promise((e=>setTimeout(e,1e3))),yield a()):(console.log("Final response:",d),d&&(s.responses[e]=d))}else i-n<t?(yield new Promise((e=>setTimeout(e,1e3))),yield a()):console.error("Response not found within the max wait time.")}));return yield new Promise((e=>setTimeout(e,2e3))),yield a(),{message:e,response:d}}))}t.simulateInput=r,t.captureResponse=c,t.sendAndReceiveMessage=function(e){return o(this,void 0,void 0,(function*(){return r(e),yield c(e)}))}},283:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(s,i){function r(e){try{c(o.next(e))}catch(e){i(e)}}function l(e){try{c(o.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,l)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.setSentMessage=t.getSentMessage=t.responses=void 0;const s=n(424),i=n(311);t.responses={};let r="";t.getSentMessage=function(){return r},t.setSentMessage=function(e){r=e},chrome.runtime.onMessage.addListener(((e,t,n)=>o(void 0,void 0,void 0,(function*(){if("typeMessages"===e.action){let t=[];for(let n=0;n<e.messages.length;n++){const o=e.messages[n],i=yield(0,s.sendAndReceiveMessage)(o);t.push(i),n<e.messages.length-1&&(yield new Promise((e=>setTimeout(e,2e3))))}console.log(t),n({status:"Messages typed and responses received",responses:t})}else"startSelection"===e.action?i.elementSelector.startSelection():console.error("Unknown action:",e.action)}))))},311:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.elementSelector=t.startSelection=void 0;const o=n(771);let s=!1,i=null,r=[],l=null;function c(){s=!0,l=document.createElement("div"),l.style.position="fixed",l.style.pointerEvents="none",l.style.zIndex="9999",l.style.border="2px solid red",l.style.backgroundColor="rgba(0, 0, 0, 0.3)",document.body.appendChild(l),document.body.style.setProperty("cursor","crosshair","important"),document.addEventListener("mousemove",u),document.addEventListener("click",d),(0,o.showMessage)("Click on a part of the chatbot. You may need to click multiple times to identify the entire chatbot.")}function u(e){if(s&&l){const t=document.elementFromPoint(e.clientX,e.clientY);t&&t!==i&&function(e){if(i=e,l){const t=e.getBoundingClientRect();l.style.left=`${t.left}px`,l.style.top=`${t.top}px`,l.style.width=`${t.width}px`,l.style.height=`${t.height}px`}}(t)}}function d(e){if(s){e.preventDefault(),e.stopPropagation();const t=e.target;if(t){r.push(t);let e=function(e){const t=e.getBoundingClientRect();let n=e.parentElement;for(;n;){const e=n.getBoundingClientRect();if(e.width>1.5*t.width&&e.height>1.5*t.height){const e=n.querySelector('input[type="text"]'),t=n.querySelector(".messages, .chat-messages");if(e&&t)return n}n=n.parentElement}return null}(t)||function(e){let t=e;for(;t&&t!==document.body;){const e=!!t.querySelector('input[type="text"]'),n=!!t.querySelector(".messages, .chat-messages"),o=!!t.querySelector('button[type="submit"], .send-button');if(e&&n&&o)return t;t=t.parentElement}return null}(t)||function(e){let t=e;for(;t&&t!==document.body;){const e=(t.className+" "+t.id).toLowerCase();if(e.includes("chat")||e.includes("bot")||e.includes("message")){const e=!!t.querySelector('input[type="text"]'),n=!!t.querySelector(".messages, .chat-messages");if(e&&n)return t}t=t.parentElement}return null}(t);e?f(e):r.length>=3?(e=function(){if(r.length<2)return null;let e=r[0];for(let t=1;t<r.length;t++)e=a(e,r[t]);return e}(),e?f(e):(0,o.showMessage)("Couldn't identify chatbot element. Please try clicking on different parts of the chatbot.")):(0,o.showMessage)(`Element selected. Please click on ${3-r.length} more part(s) of the chatbot.`)}}}function a(e,t){const n=m(e),o=m(t);for(const e of n)if(o.includes(e))return e;return document.body}function m(e){const t=[];let n=e;for(;n&&n!==document.body;)t.push(n),n=n.parentElement;return t}function f(e){const t=e.outerHTML;console.log(e),function(e){const t=e.getBoundingClientRect(),n=document.createElement("div");n.style.position="fixed",n.style.pointerEvents="none",n.style.zIndex="10000",n.style.left=`${t.left}px`,n.style.top=`${t.top}px`,n.style.width=`${t.width}px`,n.style.height=`${t.height}px`,n.style.backgroundColor="rgba(0, 255, 0, 0.5)",n.style.transition="opacity 0.5s ease-in-out",n.style.opacity="1",document.body.appendChild(n),setTimeout((()=>{n.style.opacity="0",setTimeout((()=>{document.body.removeChild(n)}),500)}),500)}(e),chrome.runtime.sendMessage({action:"storeHTML",html:t},(()=>{(0,o.showMessage)("Chatbot element identified and HTML stored!")})),p()}function p(){s=!1,document.body.style.removeProperty("cursor"),document.removeEventListener("mousemove",u),document.removeEventListener("click",d),l&&(document.body.removeChild(l),l=null),i=null,r=[]}t.startSelection=c,t.elementSelector={startSelection:c,resetSelection:p}},771:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.showMessage=void 0,t.showMessage=function(e){const t=document.createElement("div");t.style.position="fixed",t.style.top="10px",t.style.left="50%",t.style.transform="translateX(-50%)",t.style.backgroundColor="rgba(0, 0, 0, 0.7)",t.style.color="white",t.style.padding="10px",t.style.borderRadius="5px",t.style.zIndex="10000",t.textContent=e,document.body.appendChild(t),setTimeout((()=>{document.body.removeChild(t)}),3e3)}},84:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ChatPlatformSelectors=void 0,t.ChatPlatformSelectors={"https://chatgpt.com":"div.agent-turn","https://claude.ai":"div.font-claude-message","https://gemini.google.com":"message-content.model-response-text"}}},t={};!function n(o){var s=t[o];if(void 0!==s)return s.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}(283)})();