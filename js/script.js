
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cursor.style.left=mx-4+'px'; cursor.style.top=my-4+'px';
  });
  (function loop(){ rx+=(mx-rx)*0.1; ry+=(my-ry)*0.1; ring.style.left=rx-18+'px'; ring.style.top=ry-18+'px'; requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button,.project-card,.service-card,.tool-pill,.stat').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('big'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('big'));
  });
  window.addEventListener('scroll',()=>{ document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>20); });
  const obs=new IntersectionObserver(e=>{ e.forEach(x=>{ if(x.isIntersecting) x.target.classList.add('visible'); }); },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  const skillObs=new IntersectionObserver(e=>{ e.forEach(x=>{ if(x.isIntersecting){ x.target.querySelectorAll('.skill-fill').forEach((b,i)=>{ const p=parseFloat(b.dataset.pct); setTimeout(()=>{ b.style.transform=`scaleX(${p})`; },i*120); }); } }); },{threshold:0.3});
  const sb=document.getElementById('skillBars'); if(sb) skillObs.observe(sb);


  
const form = document.getElementById("form");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Loading State
    result.innerHTML = `
        <div class="msg loading">
            <span class="loader"></span>
            Sending your message...
        </div>
    `;

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    const formData = new FormData(form);

    try {

        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {

            result.innerHTML = `
                <div class="msg success">
                    <div class="icon">✓</div>
                    <div>
                        <h3>Message Delivered</h3>
                        <p>Thank you for contacting us.</p>
                    </div>
                </div>
            `;

            form.reset();

        } else {

            result.innerHTML = `
                <div class="msg error">
                    <div class="icon">✕</div>
                    <div>
                        <h3>Submission Failed</h3>
                        <p>Please try again later.</p>
                    </div>
                </div>
            `;
        }

    } catch (error) {

        result.innerHTML = `
            <div class="msg error">
                <div class="icon">✕</div>
                <div>
                    <h3>Network Error</h3>
                    <p>Unable to connect to server.</p>
                </div>
            </div>
        `;
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Message";
});

