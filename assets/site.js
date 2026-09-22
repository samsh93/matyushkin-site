(function(){
  const menuBtn=document.getElementById('menuBtn');
  const siteNav=document.getElementById('siteNav');
  if(menuBtn&&siteNav){
    menuBtn.addEventListener('click',function(){
      const open=siteNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded',String(open));
      menuBtn.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
    });
    siteNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',function(){
      siteNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded','false');
      menuBtn.setAttribute('aria-label','Открыть меню');
    }));
  }
  document.querySelectorAll('[data-product]').forEach(function(link){
    link.addEventListener('click',function(){
      const value=link.getAttribute('data-product');
      const select=document.querySelector('select[name="product"]');
      if(select&&value){
        const option=Array.from(select.options).find(o=>o.textContent===value);
        if(option) select.value=value;
      }
    });
  });
  const form=document.getElementById('orderForm');
  const status=document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const fd=new FormData(form);
      const name=String(fd.get('name')||'').trim();
      const phone=String(fd.get('phone')||'').trim();
      const product=String(fd.get('product')||'Не определился(лась)');
      const message=String(fd.get('message')||'').trim();
      if(!name||!phone||!fd.get('consent')){
        status.textContent='Заполните имя, телефон и подтвердите согласие.';
        return;
      }
      const text=[
        'Здравствуйте! Хочу оформить заказ у Пасеки Матюшкиных.',
        'Имя: '+name,
        'Телефон: '+phone,
        'Продукт: '+product,
        message?'Комментарий: '+message:''
      ].filter(Boolean).join('\n');
      const url='https://wa.me/79617004555?text='+encodeURIComponent(text);
      status.textContent='Открываем WhatsApp с готовым сообщением…';
      const win=window.open(url,'_blank','noopener');
      if(!win){
        status.textContent='Браузер заблокировал новое окно. Нажмите на зелёную кнопку WhatsApp внизу страницы.';
        return;
      }
      setTimeout(function(){
        status.textContent='Сообщение подготовлено в WhatsApp. Нажмите «Отправить» там, чтобы завершить заявку.';
      },700);
    });
  }
  const toTop=document.getElementById('toTop');
  const updateTop=function(){if(toTop) toTop.classList.toggle('show',window.scrollY>500)};
  window.addEventListener('scroll',updateTop,{passive:true});
  updateTop();
  if(toTop) toTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
})();