/* ====== PARCEIROS E CATEGORIAS: edite aqui ======
   Categoria sem empresa aparece como "em breve" na página de serviços.
   plano: "premium" (cartão grande no topo dos Serviços + faixa do topo)
          "destaque" (primeiro na categoria + faixa do topo)
          "parceiro" (na categoria)
   Para mudar de plano, troque só o campo "plano". */
var CATEGORIAS = [
  {id:"construcao", nome:"Construção e reforma", icone:"capacete"},
  {id:"veiculos", nome:"Veículos", icone:"carro"},
  {id:"seguros", nome:"Seguros", icone:"escudo"},
  {id:"bebidas", nome:"Bebidas", icone:"caneca"},
  {id:"agropecuaria", nome:"Agropecuária e insumos", icone:"broto"},
  {id:"maquinas", nome:"Máquinas e implementos", icone:"trator"},
  {id:"rurais", nome:"Serviços rurais", icone:"cerca"}
];
var PARCEIROS = [
  {id:"dourado", nome:"Comercial Dourado", cat:"construcao", plano:"parceiro", fundador:true,
   seg:"Materiais de construção", resumo:"Materiais de construção em São Carlos: elétrica, hidráulica, ferramentas e utilidades.",
   servicos:["Elétrica","Hidráulica","Ferramentas","Utilidades"],
   logo:"img/parceiros/logo-comercial-dourado.jpg", cheio:true, tom:"#b23a2e",
   foto:"https://images.unsplash.com/photo-1581783898377-1c85bf937427?fm=jpg&q=80&w=1400&auto=format&fit=crop", fotoAlt:"Ferramentas de construção",
   whats:"5516996286301", whatsTxt:"(16) 99628-6301", tel:"+551633611579", telTxt:"(16) 3361-1579", insta:"comercialdourado_"},
  {id:"pallone", nome:"Pallone Motors", cat:"veiculos", plano:"parceiro", fundador:true, desde:1980,
   seg:"Venda de veículos", resumo:"Loja de veículos em São Carlos, vendendo carros desde 1980.",
   servicos:["Venda de veículos"],
   logo:"img/parceiros/logo-pallone-motors.jpg", cheio:true, tom:"#2b2b2b",
   foto:"https://images.unsplash.com/photo-1761738217531-44a249d1dc87?fm=jpg&q=80&w=1400&auto=format&fit=crop", fotoAlt:"Carro à venda em showroom",
   whats:"5516996125200", whatsTxt:"(16) 99612-5200", insta:"pallonemotors"},
  {id:"lb", nome:"L.B. Seguros", cat:"seguros", plano:"parceiro", fundador:true,
   seg:"Administradora e corretora de seguros", resumo:"L.B. Administradora e Corretora de Seguros, em São Carlos. Atendimento com Paola C. Diniz.",
   servicos:["Corretagem de seguros","Administração de seguros"],
   logo:"img/parceiros/logo-lb-seguros.jpg", tom:"#1f2b3a",
   foto:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?fm=jpg&q=80&w=1400&auto=format&fit=crop", fotoAlt:"Assinatura de documento",
   whats:"5516996165701", whatsTxt:"(16) 99616-5701 · Paola", tel:"+551633727200", telTxt:"(16) 3372-7200", email:"paola@lbcorretoradeseguros.com.br"},
  {id:"tc", nome:"TC Construtora", cat:"construcao", plano:"parceiro", fundador:true,
   seg:"Construindo sonhos, realizando futuros", resumo:"Construtora de São Carlos. “Construindo sonhos, realizando futuros.”",
   servicos:["Construção"],
   logo:"img/parceiros/logo-tc-construtora.jpg", tom:"#8a6a3a",
   foto:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?fm=jpg&q=80&w=1400&auto=format&fit=crop", fotoAlt:"Obra em construção",
   whats:"5516991946536", whatsTxt:"(16) 99194-6536", insta:"tcconstrutora.sc"},
  {id:"lampa", nome:"Bar do Lampa", cat:"bebidas", plano:"parceiro", fundador:true, desde:2004,
   seg:"Cervejaria e depósito de bebidas", resumo:"Cervejaria Bar do Lampa, em São Carlos desde 2004.",
   servicos:["Cervejaria","Depósito de bebidas"],
   logo:"img/parceiros/logo-bar-do-lampa.png", tom:"#a0791f",
   foto:"https://images.unsplash.com/photo-1535958636474-b021ee887b13?fm=jpg&q=80&w=1400&auto=format&fit=crop", fotoAlt:"Copos de cerveja gelada",
   whats:"5516991787430", whatsTxt:"(16) 99178-7430", insta:"bardolampa"}
];
