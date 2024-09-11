import{_ as s,c as a,o as i,a3 as n}from"./chunks/framework.CjTfVxLl.js";const e="/Li6Daily/assets/image.BkbSdRil.png",b=JSON.parse('{"title":"Go Package","description":"","frontmatter":{},"headers":[],"relativePath":"Golang/Package管理.md","filePath":"Golang/Package管理.md"}'),l={name:"Golang/Package管理.md"},t=n(`<h1 id="go-package" tabindex="-1">Go Package <a class="header-anchor" href="#go-package" aria-label="Permalink to &quot;Go Package&quot;">​</a></h1><h2 id="迁移、备份包到其他环境" tabindex="-1">迁移、备份包到其他环境 <a class="header-anchor" href="#迁移、备份包到其他环境" aria-label="Permalink to &quot;迁移、备份包到其他环境&quot;">​</a></h2><p>位置：<code>/root/go/pkg</code></p><h2 id="区分包和独立应用程序" tabindex="-1">区分包和独立应用程序 <a class="header-anchor" href="#区分包和独立应用程序" aria-label="Permalink to &quot;区分包和独立应用程序&quot;">​</a></h2><p>独立应用程序使用 main 包。 包（库）使用不同的名称<br> main 包指示程序将生成独立的可执行程序</p><h2 id="使用go-mod-管理依赖" tabindex="-1">使用go.mod 管理依赖 <a class="header-anchor" href="#使用go-mod-管理依赖" aria-label="Permalink to &quot;使用go.mod 管理依赖&quot;">​</a></h2><ol><li>初始化模块</li></ol><p><code>go mod init example.com/module_name</code></p><ol start="2"><li>更新依赖管理文件go.mod</li></ol><p><code>go mod tidy</code></p><ol start="3"><li>更新所有依赖</li></ol><p><code>go get -u ./...</code></p><ol start="4"><li>更新到指定版本</li></ol><p><code>go get github.com/example/package@v1.2.3</code></p><h2 id="发布package" tabindex="-1">发布Package <a class="header-anchor" href="#发布package" aria-label="Permalink to &quot;发布Package&quot;">​</a></h2><ol><li>在github创建仓库，权限选择默认，仓库名可以设置为包名</li><li>拉取仓库并初始化</li></ol><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mod init github.com</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Aliuyanfeng</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">testpackage</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="3"><li>编写代码<code>test.go</code></li></ol><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">package</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> testpackage</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Hello returns a greeting.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Hello</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello Everyone !&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Glass returns a useful phrase for world travelers.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Glass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	// See http://www.oocities.org/nodotus/hbglass.html.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;I can eat glass and it doesn&#39;t hurt me.&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Go returns a Go proverb.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Go</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Don&#39;t communicate by sharing memory, share memory by communicating.&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Opt returns an optimization truth.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Opt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	// Wisdom from ken.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;If a program is too slow, it must have a loop.&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><ol start="4"><li>推送代码 打tag版本 用于管理被引入的版本</li></ol><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git tag </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">a v0.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">m </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;publish package&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">git push origin v0.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="5"><li>引入和使用包.</li></ol><p><code>import github.com/Aliuyanfeng/testpackage</code></p><h2 id="离线依赖" tabindex="-1">离线依赖 <a class="header-anchor" href="#离线依赖" aria-label="Permalink to &quot;离线依赖&quot;">​</a></h2><p>离线场景下开发编译, 执行命令可在项目根目录生成<code>vendor</code>目录，如果本地存在了vendor，在 go build 编译时优先级最高会在该目录找依赖库，其次是在 mod cache在找依赖库.<br> 执行命令<code>go mod vendor</code>，可在项目根目录下看到生成的<code>vendor</code>目录 <img src="`+e+'" alt="alt text" loading="lazy"></p>',25),p=[t];function h(r,k,o,d,c,g){return i(),a("div",null,p)}const m=s(l,[["render",h]]);export{b as __pageData,m as default};
