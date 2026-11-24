/* Agro Lampa — script compartilhado pelas páginas.
   Lê CATEGORIAS e PARCEIROS de parceiros.js e monta só o que existir na página. */
(function(){
  var $=function(id){return document.getElementById(id)};
  var reduzido=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PESO={premium:0,destaque:1,parceiro:2};
  var MSG='?text=Ol%C3%A1!%20Vi%20voc%C3%AAs%20no%20site%20do%20Agro%20Lampa.';
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function cat(id){for(var i=0;i<CATEGORIAS.length;i++)if(CATEGORIAS[i].id===id)return CATEGORIAS[i];return{id:id,nome:id,icone:'mais'}}
  function contar(id){return PARCEIROS.filter(function(p){return p.cat===id}).length}
  var ordem=PARCEIROS.slice().sort(function(a,b){return PESO[a.plano]-PESO[b.plano]});

  /* Ícones das categorias: traço escuro, um detalhe verde e uma mancha dourada clara atrás */
  var ICONES={
    capacete:'<path d="M8 30a16 16 0 0 1 32 0"/><path d="M5 30h38v6H5z"/><path class="ac" d="M20 14v8M28 14v8"/>',
    carro:'<path d="M9 30l4-11a3 3 0 0 1 3-2h16a3 3 0 0 1 3 2l4 11"/><rect x="6" y="29" width="36" height="9" rx="2"/><path d="M11 38v4M37 38v4"/><circle class="ac" cx="14" cy="33.5" r="2"/><circle class="ac" cx="34" cy="33.5" r="2"/>',
    escudo:'<path d="M24 6l15 5v10c0 9-6 17-15 21C15 38 9 30 9 21V11z"/><path class="ac" d="M17 24l5 5 9-10"/>',
    caneca:'<path d="M11 14h20v26a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2z"/><path d="M31 19h4a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-4"/><path class="ac" d="M11 14c0-4 3-6 6-6 1-2 4-3 6-2 2-1 5 0 6 2 2 0 3 3 2 6"/><path d="M17 22v14M24 22v14"/>',
    broto:'<path d="M24 42V22"/><path class="ac" d="M24 24c0-8-6-13-14-13 0 8 6 13 14 13zM24 20c0-7 5-12 12-12 0 7-5 12-12 12z"/><path d="M14 42h20"/>',
    trator:'<circle cx="15" cy="33" r="7"/><circle cx="36" cy="36" r="4"/><path d="M15 26V14h12l4 10h6v8"/><path class="ac" d="M21 14v-4M31 24h-8"/>',
    cerca:'<path d="M10 14l3-4 3 4v28h-6zM22 14l3-4 3 4v28h-6zM34 14l3-4 3 4v28h-6z"/><path class="ac" d="M4 22h40M4 32h40"/>',
    casa:'<path d="M7 22L24 8l17 14"/><path d="M11 19v22h26V19"/><path class="ac" d="M20 41V29h8v12"/>',
    talher:'<path d="M15 6v13a4 4 0 0 0 8 0V6M19 6v36"/><path class="ac" d="M33 6c-4 3-5 9-5 14h5v22"/>',
    botijao:'<rect x="11" y="14" width="26" height="28" rx="8"/><path d="M18 14V8h12v6"/><path class="ac" d="M11 26h26"/>',
    caminhao:'<path d="M5 12h24v22H5z"/><path d="M29 20h8l6 7v7H29"/><circle class="ac" cx="13" cy="36" r="3.5"/><circle class="ac" cx="36" cy="36" r="3.5"/>',
    arvore:'<path d="M24 42V26"/><path class="ac" d="M24 6c-8 0-13 6-13 13 0 6 6 9 13 9s13-3 13-9c0-7-5-13-13-13z"/><path d="M16 42h16"/>',
    mais:'<circle class="ac" cx="14" cy="24" r="2.5"/><circle cx="24" cy="24" r="2.5"/><circle class="ac" cx="34" cy="24" r="2.5"/>'
  };
  function icone(nome){return '<svg class="cat-ico" viewBox="0 0 48 48" aria-hidden="true"><circle class="mancha" cx="31" cy="15" r="11"/><g>'+(ICONES[nome]||ICONES.mais)+'</g></svg>'}

  function sigla(p){return p.nome.replace(/^(Imobiliária|Agropecuária|Açougue)\s+/,'').split(/\s+/).filter(function(w){return w.length>2||/^[A-Z0-9]/.test(w)}).slice(0,2).map(function(w){return w[0]}).join('').toUpperCase()}
  function miniLogo(p){return p.logo?'<span class="fl'+(p.cheio?' cheio':'')+'"><img src="'+esc(p.logo)+'" alt=""></span>':'<span class="fl sigla"><span>'+esc(sigla(p))+'</span></span>'}
  function logoBox(p,cls){
    if(!p.logo)return '<div class="'+cls+' sigla" aria-hidden="true"><span>'+esc(sigla(p))+'</span></div>';
    return '<div class="'+cls+(p.cheio?' cheio':'')+'"><img src="'+esc(p.logo)+'" alt="Logo '+esc(p.nome)+'" loading="lazy"></div>';
  }
  function selos(p){var s='';if(p.plano!=='parceiro')s+='<span class="selo ouro">Destaque</span>';if(p.seloTexto)s+='<span class="selo">'+esc(p.seloTexto)+'</span>';else if(p.desde)s+='<span class="selo">Desde '+p.desde+'</span>';else if(p.fundador)s+='<span class="selo">Parceiro fundador</span>';return s?'<div class="selos">'+s+'</div>':''}
  function acoes(p){
    var h;
    if(p.whats)h='<a class="btn btn-folha" href="https://wa.me/'+p.whats+MSG+'" target="_blank" rel="noopener"><svg class="icone"><use href="#i-zap"/></svg>WhatsApp</a>';
    else if(p.tel)h='<a class="btn btn-folha" href="tel:'+p.tel+'"><svg class="icone"><use href="#i-tel"/></svg>Ligar '+esc(p.telTxt)+'</a>';
    else if(p.site)h='<a class="btn btn-folha" href="'+esc(p.site)+'" target="_blank" rel="noopener"><svg class="icone"><use href="#i-seta"/></svg>Pedir orçamento</a>';
    else h='<a class="btn btn-folha" href="https://wa.me/5516991787430?text='+encodeURIComponent('Olá! Quero falar com '+p.nome+'. Vi no site do Agro Lampa.')+'" target="_blank" rel="noopener"><svg class="icone"><use href="#i-zap"/></svg>Pedir contato</a>';
    if(p.insta)h+='<a class="btn btn-linha redondo" href="https://instagram.com/'+esc(p.insta)+'" target="_blank" rel="noopener" aria-label="Instagram de '+esc(p.nome)+'"><svg class="icone"><use href="#i-insta"/></svg></a>';
    return '<div class="p-acoes">'+h+'<a class="btn btn-linha" href="parceiro.html?p='+p.id+'">Ver página<svg class="icone"><use href="#i-seta"/></svg></a></div>';
  }
  function chips(p){return '<ul class="chips">'+p.servicos.map(function(s){return '<li>'+esc(s)+'</li>'}).join('')+'</ul>'}
  function foto(p){return '<div class="p-foto" style="--tom:'+p.tom+'">'+(p.foto?'<img src="'+esc(p.foto)+'" alt="'+esc(p.fotoAlt||'')+'" loading="lazy" onerror="this.remove()">':'')+selos(p)+'</div>'}
  function cartao(p){
    return '<article class="parceiro nivel-'+p.plano+'" data-cat="'+p.cat+'">'+foto(p)+(p.logo?logoBox(p,'p-logo'):'')+
      '<div class="p-corpo"><span class="p-cat">'+esc(cat(p.cat).nome)+'</span><h4><a class="p-nome" href="parceiro.html?p='+p.id+'">'+esc(p.nome)+'</a></h4><p class="p-seg">'+esc(p.seg)+'</p><p class="p-resumo">'+esc(p.resumo)+'</p>'+chips(p)+acoes(p)+'</div></article>';
  }
  function cartaoGrande(p){
    return '<article class="destaque-card">'+foto(p)+'<div class="p-corpo">'+(p.logo?logoBox(p,'p-logo'):'')+
      '<h4><a class="p-nome" href="parceiro.html?p='+p.id+'">'+esc(p.nome)+'</a></h4><p class="p-seg">'+esc(p.resumo)+'</p>'+chips(p)+acoes(p)+'</div></article>';
  }

  /* Faixa de patrocinadores: premium + destaque; enquanto não houver, todos */
  var trilha=$('faixa-trilha');
  if(trilha){
    var faixa=ordem.filter(function(p){return p.plano!=='parceiro'});if(!faixa.length)faixa=ordem.filter(function(p){return p.logo});
    var item=function(p,oculto){return '<a class="faixa-item" href="parceiro.html?p='+p.id+'"'+(oculto?' tabindex="-1" aria-hidden="true"':'')+'>'+miniLogo(p)+'<span><b>'+esc(p.nome)+'</b><small>'+esc(cat(p.cat).nome)+'</small></span></a>'};
    var seq=faixa.slice();while(seq.length<6)seq=seq.concat(faixa);
    trilha.innerHTML=seq.map(function(p,i){return item(p,i>=faixa.length)}).join('')+seq.map(function(p){return item(p,true)}).join('');
  }

  /* Barra de pesquisa no topo (todas as páginas) */
  (function(){
    var topo=document.querySelector('.topo .wrap');if(!topo||!window.PARCEIROS)return;
    var LUPA='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
    var box=document.createElement('div');box.className='busca';
    box.innerHTML='<button class="busca-abrir" type="button" aria-label="Pesquisar" aria-expanded="false">'+LUPA+'</button>'+
      '<div class="busca-campo" role="search"><span class="busca-ico">'+LUPA+'</span>'+
      '<input type="search" id="busca-input" placeholder="Pesquisar empresa ou serviço" autocomplete="off" aria-label="Pesquisar empresa ou serviço" aria-controls="busca-lista" aria-expanded="false">'+
      '<ul class="busca-lista" id="busca-lista" role="listbox" hidden></ul></div>';
    var cta=topo.querySelector('.btn');topo.insertBefore(box,cta);
    var inp=box.querySelector('input'),lista=box.querySelector('.busca-lista'),abrir=box.querySelector('.busca-abrir'),sel=-1,itens=[];
    function norm(t){return String(t||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
    var palavras=function(t){return ' '+norm(t).replace(/[^a-z0-9&]+/g,' ')};
    var base=ordem.map(function(p){return{p:p,txt:palavras([p.nome,p.seg,p.resumo,(p.servicos||[]).join(' '),cat(p.cat).nome].join(' ')),nome:norm(p.nome)}});
    function buscar(q){
      q=norm(q).trim();if(!q)return[];
      var termos=q.split(/\s+/).map(function(t){return t.length>=5?t.slice(0,-1):t}),r=[];
      CATEGORIAS.forEach(function(c){var n=contar(c.id);if(n&&termos.every(function(t){return palavras(c.nome).indexOf(' '+t)>=0}))r.push({tipo:'cat',c:c,n:n,peso:1})});
      base.forEach(function(b){if(termos.every(function(t){return b.txt.indexOf(' '+t)>=0}))r.push({tipo:'p',p:b.p,peso:b.nome.indexOf(q)===0?0:(b.nome.indexOf(q)>=0?1:2)})});
      return r.sort(function(a,b){return a.peso-b.peso}).slice(0,8);
    }
    function desenhar(){
      var q=inp.value;itens=buscar(q);sel=-1;
      if(!q.trim()){lista.hidden=true;inp.setAttribute('aria-expanded','false');return}
      lista.innerHTML=itens.length?itens.map(function(it,i){
        if(it.tipo==='cat')return '<li role="option" id="bo-'+i+'"><a href="servicos.html#'+it.c.id+'"><span class="fl sigla"><span>'+icone(it.c.icone)+'</span></span><span><b>'+esc(it.c.nome)+'</b><small>Categoria · '+it.n+(it.n>1?' empresas':' empresa')+'</small></span></a></li>';
        return '<li role="option" id="bo-'+i+'"><a href="parceiro.html?p='+it.p.id+'">'+miniLogo(it.p)+'<span><b>'+esc(it.p.nome)+'</b><small>'+esc(cat(it.p.cat).nome)+' · '+esc(it.p.seg)+'</small></span></a></li>';
      }).join(''):'<li class="busca-nada">Nada encontrado para “'+esc(q)+'”. <a href="https://wa.me/5516991787430?text='+encodeURIComponent('Olá! Procuro '+q+' em São Carlos.')+'" target="_blank" rel="noopener">Peça uma indicação</a></li>';
      lista.hidden=false;inp.setAttribute('aria-expanded','true');
    }
    function marcar(i){var lis=lista.querySelectorAll('[role=option]');if(!lis.length)return;sel=(i+lis.length)%lis.length;lis.forEach(function(l,k){l.classList.toggle('ativo',k===sel)});inp.setAttribute('aria-activedescendant','bo-'+sel)}
    inp.addEventListener('input',desenhar);
    inp.addEventListener('focus',function(){if(inp.value.trim())desenhar()});
    inp.addEventListener('keydown',function(e){
      if(e.key==='ArrowDown'){e.preventDefault();marcar(sel+1)}
      else if(e.key==='ArrowUp'){e.preventDefault();marcar(sel-1)}
      else if(e.key==='Enter'){var lis=lista.querySelectorAll('[role=option] a');var a=lis[sel>=0?sel:0];if(a){e.preventDefault();location.href=a.getAttribute('href')}}
      else if(e.key==='Escape'){lista.hidden=true;inp.blur();fechar()}
    });
    function fechar(){box.classList.remove('aberta');abrir.setAttribute('aria-expanded','false')}
    abrir.addEventListener('click',function(){var on=!box.classList.contains('aberta');box.classList.toggle('aberta',on);abrir.setAttribute('aria-expanded',on?'true':'false');if(on)setTimeout(function(){inp.focus()},30)});
    document.addEventListener('click',function(e){if(!box.contains(e.target)){lista.hidden=true;fechar()}});
  })();

  /* Abertura em carrossel (página inicial) */
  /* Carrossel: acrescenta um slide para cada parceiro com logo que ainda não tenha foto fixa */
  var abertura=document.querySelector('.abertura');
  if(abertura&&window.PARCEIROS){
    var jaTem={};[].forEach.call(abertura.querySelectorAll('.slide[data-parceiro]'),function(s){jaTem[s.dataset.parceiro]=1});
    var antes=abertura.querySelector('.wrap'),PESO2={premium:0,destaque:1,parceiro:2};
    PARCEIROS.filter(function(p){return p.foto&&!jaTem[p.id]}).sort(function(a,b){return PESO2[a.plano]-PESO2[b.plano]}).forEach(function(p){
      var d=document.createElement('div');d.className='slide';d.dataset.legenda='Parceiro: '+p.nome;d.dataset.parceiro=p.id;
      d.innerHTML='<img src="'+esc(p.foto.replace('w=1400','w=2400'))+'" alt="'+esc(p.fotoAlt||p.nome)+'" loading="lazy" onerror="this.remove()">';
      abertura.insertBefore(d,antes);
    });
  }
  var slides=[].slice.call(document.querySelectorAll('.slide'));
  var pontos=$('pontos');
  if(slides.length>1&&pontos){
    var atual=0,timer;
    pontos.innerHTML=slides.map(function(s,i){return '<button type="button" aria-label="Foto '+(i+1)+' de '+slides.length+'"'+(i===0?' aria-current="true"':'')+'></button>'}).join('');
    var bts=[].slice.call(pontos.children);
    var ir=function(i){slides[atual].classList.remove('ativo');bts[atual].removeAttribute('aria-current');atual=(i+slides.length)%slides.length;slides[atual].classList.add('ativo');bts[atual].setAttribute('aria-current','true');mostrarLegenda()};
    function mostrarLegenda(){
      var sl=slides[atual],t=$('slide-texto'),lg=$('slide-logo'),a=$('slide-legenda');if(!t)return;
      t.textContent=sl.dataset.legenda||'';
      var P=null,id=sl.dataset.parceiro;if(id&&window.PARCEIROS)for(var k=0;k<PARCEIROS.length;k++)if(PARCEIROS[k].id===id)P=PARCEIROS[k];
      if(P){a.setAttribute('href','parceiro.html?p='+P.id)}else a.removeAttribute('href');
      if(P&&P.logo){lg.className='leg-logo'+(P.cheio?' cheio':'');lg.innerHTML='<img src="'+esc(P.logo)+'" alt="Logo '+esc(P.nome)+'">';lg.hidden=false}else{lg.hidden=true;lg.innerHTML=''}
    }
    var tocar=function(){clearInterval(timer);if(!reduzido)timer=setInterval(function(){ir(atual+1)},5500)};
    bts.forEach(function(b,i){b.addEventListener('click',function(){ir(i);tocar()})});
    mostrarLegenda();
    tocar();
  }

  /* Grade de categorias (página inicial) */
  var gcat=$('grade-categorias');
  if(gcat){
    var AGRO=['agropecuaria','maquinas','rurais','transporte'];/* categorias do agro vêm primeiro */
    var pa=function(id){var k=AGRO.indexOf(id);return k<0?99:k};
    var lc=CATEGORIAS.map(function(c,i){return{c:c,n:contar(c.id),i:i}}).sort(function(a,b){return (pa(a.c.id)-pa(b.c.id))||((b.n>0)-(a.n>0))||(a.i-b.i)}).map(function(x){return x.c});
    gcat.innerHTML=lc.map(function(c){var n=contar(c.id);return '<a class="cat-tile" href="servicos.html#'+c.id+'">'+icone(c.icone)+'<b>'+esc(c.nome)+'</b><small>'+(n?n+(n>1?' empresas':' empresa'):'Em breve')+'</small></a>'}).join('')+
      '<a class="cat-tile ver-todos" href="servicos.html">'+icone('mais')+'<b>Ver todos</b><small>'+PARCEIROS.length+' empresas</small></a>';
  }

  /* Página de serviços */
  var lista=$('lista-servicos');
  if(lista){
    var premium=ordem.filter(function(p){return p.plano==='premium'});
    var dest=ordem.filter(function(p){return p.plano==='destaque'});
    var vaga=function(t,txt){return '<div class="vaga"><h4>'+t+'</h4><p>'+txt+'</p><a class="btn btn-ouro" href="sobre.html#anuncie">Ver planos</a></div>'};
    $('bloco-destaque').innerHTML='<div class="titulo-bloco"><h3>Em destaque</h3></div><div class="grade-destaque">'+premium.map(cartaoGrande).join('')+
      (premium.length<2?vaga('Este espaço pode ser da sua empresa.','O plano Premium 360 coloca sua empresa em primeiro lugar nesta página, com cartão grande, vídeos e anúncios.'):'')+'</div>';
    var meio=$('meio-destaque');
    if(meio){
      meio.innerHTML=dest.length?'<div class="grade-cat">'+dest.map(cartao).join('')+'</div>':
        '<div class="banner-meio"><div><h3>Destaque da semana</h3><p>Com o plano Destaque, sua empresa aparece aqui, primeiro na sua categoria e na faixa de patrocinadores do topo.</p></div><a class="btn btn-ouro" href="https://wa.me/5516991787430?text=Ol%C3%A1!%20Quero%20saber%20do%20plano%20Destaque%20do%20Agro%20Lampa." target="_blank" rel="noopener"><svg class="icone"><use href="#i-zap"/></svg>Quero aparecer aqui</a></div>';
    }
    var grade=ordem.filter(function(p){return p.plano==='parceiro'});
    lista.innerHTML='<div class="grade-cat">'+grade.map(cartao).join('')+'</div><div class="vazio" id="vazio" hidden></div>';
    var f='<button class="filtro" type="button" aria-pressed="true" data-filtro="todos">Todos<span>'+PARCEIROS.length+'</span></button>';
    CATEGORIAS.forEach(function(c){var n=contar(c.id);f+='<button class="filtro" type="button" aria-pressed="false" data-filtro="'+c.id+'">'+esc(c.nome)+'<span>'+n+'</span></button>'});
    var filtros=$('filtros');filtros.innerHTML=f;
    var aplicar=function(v){
      if(!filtros.querySelector('[data-filtro="'+v+'"]'))v='todos';
      filtros.querySelectorAll('[data-filtro]').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.filtro===v?'true':'false')});
      var n=0;document.querySelectorAll('#lista-servicos .parceiro,#meio-destaque .parceiro').forEach(function(c){var ok=(v==='todos'||c.dataset.cat===v);c.hidden=!ok;if(ok)n++});
      $('bloco-destaque').hidden=(v!=='todos');
      $('titulo-lista').textContent=(v==='todos'?'Todas as empresas':cat(v).nome);
      $('conta-lista').textContent=n+(n===1?' empresa':' empresas');
      var vz=$('vazio');vz.hidden=n>0;
      if(!n)vz.innerHTML='<h4>Ainda não temos empresas em '+esc(cat(v).nome)+'.</h4><p>Sua empresa atende este segmento? Ela pode ser a primeira.</p><a class="btn btn-ouro" href="https://wa.me/5516991787430?text=Ol%C3%A1!%20Quero%20anunciar%20em%20'+encodeURIComponent(cat(v).nome)+'%20no%20Agro%20Lampa." target="_blank" rel="noopener"><svg class="icone"><use href="#i-zap"/></svg>Quero ser o primeiro</a>';
    };
    filtros.addEventListener('click',function(e){var b=e.target.closest('[data-filtro]');if(!b)return;var v=b.dataset.filtro;history.replaceState(null,'',v==='todos'?location.pathname:'#'+v);aplicar(v)});
    aplicar((location.hash||'#todos').slice(1));
    addEventListener('hashchange',function(){aplicar((location.hash||'#todos').slice(1))});
  }

  /* Logos que sobem na faixa de fotos da página de serviços */
  var fotos=$('trilha-fotos');
  if(fotos){
    var imgs=ordem.filter(function(p){return p.foto}).map(function(p){return '<figure class="foto-item" style="--tom:'+p.tom+'"><img src="'+esc(p.foto)+'" alt="'+esc(p.fotoAlt||'')+'" loading="lazy" onerror="this.remove()"><figcaption>'+miniLogo(p)+esc(p.nome)+'</figcaption></figure>'}).join('');
    fotos.innerHTML=imgs+imgs.replace(/<figure /g,'<figure aria-hidden="true" ');
  }

  /* Fichas dos parceiros */
  var fichas=$('fichas');
  if(fichas){
    fichas.innerHTML=PARCEIROS.map(function(p){
      var c='';
      if(p.whats)c+='<li><svg class="icone"><use href="#i-zap"/></svg><div><a href="https://wa.me/'+p.whats+'" target="_blank" rel="noopener">'+esc(p.whatsTxt)+'</a><small>WhatsApp</small></div></li>';
      if(!p.whats&&!p.tel&&!p.site)c+='<li><svg class="icone"><use href="#i-zap"/></svg><div><a href="https://wa.me/5516991787430?text='+encodeURIComponent('Olá! Quero falar com '+p.nome+'. Vi no site do Agro Lampa.')+'" target="_blank" rel="noopener">Pedir contato pelo Agro Lampa</a><small>Contato direto em breve</small></div></li>';
      if(p.tel)c+='<li><svg class="icone"><use href="#i-tel"/></svg><div><a href="tel:'+p.tel+'">'+esc(p.telTxt)+'</a><small>Telefone</small></div></li>';
      if(p.email)c+='<li><svg class="icone"><use href="#i-mail"/></svg><div><a href="mailto:'+esc(p.email)+'">'+esc(p.email)+'</a><small>E-mail</small></div></li>';
      if(p.insta)c+='<li><svg class="icone"><use href="#i-insta"/></svg><div><a href="https://instagram.com/'+esc(p.insta)+'" target="_blank" rel="noopener">@'+esc(p.insta)+'</a><small>Instagram</small></div></li>';
      return '<dialog class="ficha" id="f-'+p.id+'" aria-labelledby="t-'+p.id+'"><button class="fechar" type="button" data-fechar aria-label="Fechar"><svg class="icone"><use href="#i-x"/></svg></button>'+
        '<div class="ficha-topo">'+logoBox(p,'p-logo')+'<div><h3 id="t-'+p.id+'">'+esc(p.nome)+'</h3><small>'+esc(cat(p.cat).nome)+'</small></div></div>'+
        '<div class="ficha-corpo"><p>'+esc(p.resumo)+'</p>'+chips(p)+'<ul class="contatos">'+c+'</ul></div></dialog>';
    }).join('');
    document.addEventListener('click',function(e){
      var b=e.target.closest('[data-abrir]');
      if(b){var d=$(b.dataset.abrir);if(d&&d.showModal)d.showModal();return}
      var d2=e.target.closest('dialog.ficha');
      if(d2&&(e.target===d2||e.target.closest('[data-fechar]')))d2.close();
    });
  }


  /* ===== Página de cada parceiro: parceiro.html?p=ID ===== */
  var pag=$('pagina-parceiro');
  if(pag){
    var pid=(new URLSearchParams(location.search).get('p')||'').toLowerCase();
    var P=null;PARCEIROS.forEach(function(x){if(x.id===pid)P=x});
    if(!P){
      pag.innerHTML='<div class="wrap pp-vazio"><h1>Empresa não encontrada</h1><p>Veja todas as empresas parceiras na página de serviços.</p><a class="btn btn-folha" href="servicos.html">Ver os serviços</a></div>';
    }else{
      document.title=P.nome+' — Agro Lampa Business';
      var md=document.querySelector('meta[name="description"]');if(md)md.setAttribute('content',P.resumo);
      var C=cat(P.cat);
      var zapLink=P.whats?'https://wa.me/'+P.whats+MSG:null;
      var pedir='https://wa.me/5516991787430?text='+encodeURIComponent('Olá! Quero falar com '+P.nome+'. Vi no site do Agro Lampa.');
      var q=encodeURIComponent(P.nome+', '+(P.endereco||'São Carlos SP'));
      var mapsUrl='https://www.google.com/maps/search/?api=1&query='+q+(P.placeId?'&query_place_id='+P.placeId:'');
      var rotaUrl='https://www.google.com/maps/dir/?api=1&destination='+q+(P.placeId?'&destination_place_id='+P.placeId:'');
      var temMapa=P.endereco&&!P.semMapa;

      var botaoPrincipal=P.whats?'<a class="btn btn-ouro" href="'+zapLink+'" target="_blank" rel="noopener"><svg class="icone"><use href="#i-zap"/></svg>Chamar no WhatsApp</a>':
        P.tel?'<a class="btn btn-ouro" href="tel:'+P.tel+'"><svg class="icone"><use href="#i-tel"/></svg>Ligar '+esc(P.telTxt)+'</a>':
        P.site?'<a class="btn btn-ouro" href="'+esc(P.site)+'" target="_blank" rel="noopener"><svg class="icone"><use href="#i-seta"/></svg>Pedir orçamento</a>':
        '<a class="btn btn-ouro" href="'+pedir+'" target="_blank" rel="noopener"><svg class="icone"><use href="#i-zap"/></svg>Pedir contato</a>';

      var contatos='';
      if(P.whats)contatos+='<li><svg class="icone"><use href="#i-zap"/></svg><div><a href="'+zapLink+'" target="_blank" rel="noopener">'+esc(P.whatsTxt)+'</a><small>WhatsApp</small></div></li>';
      if(P.tel)contatos+='<li><svg class="icone"><use href="#i-tel"/></svg><div><a href="tel:'+P.tel+'">'+esc(P.telTxt)+'</a><small>Telefone</small></div></li>';
      if(P.email)contatos+='<li><svg class="icone"><use href="#i-mail"/></svg><div><a href="mailto:'+esc(P.email)+'">'+esc(P.email)+'</a><small>E-mail</small></div></li>';
      if(P.site)contatos+='<li><svg class="icone"><use href="#i-seta"/></svg><div><a href="'+esc(P.site)+'" target="_blank" rel="noopener">'+esc(P.site.replace(/^https?:\/\//,''))+'</a><small>Site</small></div></li>';
      if(P.insta)contatos+='<li><svg class="icone"><use href="#i-insta"/></svg><div><a href="https://instagram.com/'+esc(P.insta)+'" target="_blank" rel="noopener">@'+esc(P.insta)+'</a><small>Instagram</small></div></li>';
      if(!P.whats&&!P.tel&&!P.site)contatos+='<li><svg class="icone"><use href="#i-zap"/></svg><div><a href="'+pedir+'" target="_blank" rel="noopener">Pedir contato pelo Agro Lampa</a><small>Contato direto em breve</small></div></li>';

      var servicos='<ul class="pp-servicos">'+P.servicos.map(function(x){return '<li><span class="pp-ok"><svg class="icone"><use href="#i-ok"/></svg></span>'+esc(x)+'</li>'}).join('')+'</ul>';

      var galeria=(P.galeria&&P.galeria.length)?'<section class="pp-bloco"><h2>Fotos</h2><div class="pp-galeria">'+P.galeria.map(function(g,i){return '<figure'+(i===0?' class="grande"':'')+'><img src="'+esc(g)+'" alt="Trabalho de '+esc(P.nome)+'" loading="lazy" onerror="this.parentNode.remove()"></figure>'}).join('')+'</div></section>':'';

      var deps=(P.depoimentos||[]);
      var avaliacoes='<section class="pp-bloco" id="avaliacoes"><h2>Avaliações</h2>'+
        (deps.length?'<div class="pp-depos">'+deps.map(function(d){return '<blockquote><p>“'+esc(d.texto)+'”</p><cite>'+esc(d.nome)+'</cite></blockquote>'}).join('')+'</div>':
          '<p class="pp-suave">Ainda não temos depoimentos de clientes publicados aqui.</p>')+
        (P.placeId?'<div class="pp-acoes"><a class="btn btn-linha" href="'+mapsUrl+'" target="_blank" rel="noopener">Ver avaliações no Google<svg class="icone"><use href="#i-seta"/></svg></a><a class="btn btn-linha" href="https://search.google.com/local/writereview?placeid='+P.placeId+'" target="_blank" rel="noopener">Avaliar esta empresa</a></div>':'')+
        '</section>';

      var horario=(P.horario&&P.horario.length)?'<div class="pp-card"><h3>Horário</h3><ul class="pp-horario">'+P.horario.map(function(h){return '<li>'+esc(h)+'</li>'}).join('')+'</ul></div>':'';
      var endereco=P.endereco?'<div class="pp-card"><h3>Endereço</h3><p>'+esc(P.endereco)+'</p>'+(temMapa?'<a class="pp-link" href="'+rotaUrl+'" target="_blank" rel="noopener">Como chegar<svg class="icone"><use href="#i-seta"/></svg></a>':'')+'</div>':'';

      var mapa=temMapa?'<section class="pp-mapa"><div class="wrap"><h2>Localização</h2><div class="pp-mapa-moldura"><iframe title="Mapa: '+esc(P.nome)+'" src="https://www.google.com/maps?q='+q+'&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>'+
        '<div class="pp-mapa-rodape"><p>'+esc(P.endereco)+'</p><a class="btn btn-folha" href="'+rotaUrl+'" target="_blank" rel="noopener">Como chegar</a></div></div></section>':'';

      var outros=ordem.filter(function(x){return x.cat===P.cat&&x.id!==P.id});
      if(outros.length<2)outros=outros.concat(ordem.filter(function(x){return x.cat!==P.cat&&x.id!==P.id}).slice(0,3-outros.length));
      var mais='<section class="pp-mais"><div class="wrap"><div class="titulo-bloco"><h2>Outras empresas parceiras</h2></div><div class="pp-mini">'+
        outros.slice(0,3).map(function(x){return '<a class="pp-mini-card" href="parceiro.html?p='+x.id+'">'+miniLogo(x)+'<span><b>'+esc(x.nome)+'</b><small>'+esc(cat(x.cat).nome)+'</small></span></a>'}).join('')+
        '</div><a class="btn btn-linha" href="servicos.html">Ver todas as empresas<svg class="icone"><use href="#i-seta"/></svg></a></div></section>';

      pag.innerHTML=
        '<section class="pp-topo" style="--tom:'+P.tom+'">'+(P.foto?'<img class="pp-capa" src="'+esc(P.foto)+'" alt="'+esc(P.fotoAlt||'')+'" onerror="this.remove()">':'')+
          '<div class="wrap"><nav class="pp-trilha" aria-label="Você está em"><a href="index.html">Início</a><span>/</span><a href="servicos.html">Serviços</a><span>/</span><a href="servicos.html#'+C.id+'">'+esc(C.nome)+'</a></nav>'+
          '<div class="pp-id">'+logoBox(P,'pp-logo')+'<div><p class="pp-cat">'+esc(C.nome)+(P.seloTexto?' · '+esc(P.seloTexto):P.desde?' · Desde '+P.desde:'')+'</p><h1>'+esc(P.nome)+'</h1><p class="pp-seg">'+esc(P.seg)+'</p>'+
          '<div class="pp-acoes">'+botaoPrincipal+(P.insta?'<a class="btn btn-claro" href="https://instagram.com/'+esc(P.insta)+'" target="_blank" rel="noopener"><svg class="icone"><use href="#i-insta"/></svg>Instagram</a>':'')+(temMapa?'<a class="btn btn-claro" href="'+rotaUrl+'" target="_blank" rel="noopener">Como chegar</a>':'')+'</div></div></div></div></section>'+
        '<div class="wrap pp-grade"><div class="pp-principal">'+
          '<section class="pp-bloco"><h2>Sobre</h2><p class="pp-texto">'+esc(P.resumo)+'</p></section>'+
          '<section class="pp-bloco"><h2>Serviços</h2>'+servicos+'</section>'+galeria+avaliacoes+
        '</div><aside class="pp-lado"><div class="pp-card"><h3>Contato</h3><ul class="contatos">'+contatos+'</ul></div>'+horario+endereco+
          '<div class="pp-card pp-anuncio"><p>Esta empresa é parceira do <strong>Agro Lampa</strong>.</p><a class="pp-link" href="sobre.html#anuncie">Quero minha empresa aqui<svg class="icone"><use href="#i-seta"/></svg></a></div>'+
        '</aside></div>'+mapa+mais;
    }
  }

  /* Como funciona: a etapa no centro da tela troca a imagem */
  var passos=[].slice.call(document.querySelectorAll('.passo'));
  if(passos.length&&'IntersectionObserver' in window){
    var ims=[].slice.call(document.querySelectorAll('.como-midia img'));
    var mcs=[].slice.call(document.querySelectorAll('.como-marcador i'));
    var ativar=function(i){
      passos.forEach(function(p,k){p.classList.toggle('ativo',k===i)});
      ims.forEach(function(m,k){m.classList.toggle('ativa',k===i)});
      mcs.forEach(function(m,k){m.classList.toggle('ativa',k===i)});
    };
    var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)ativar(passos.indexOf(e.target))})},{rootMargin:'-45% 0px -45% 0px'});
    passos.forEach(function(p){obs.observe(p)});
  }
})();
