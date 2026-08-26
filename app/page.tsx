"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const whatsapp =
  "https://wa.me/5519998381326?text=Oi%2C%20Espa%C3%A7o%20Serrano!%20Quero%20agendar%20uma%20aula%20experimental.";
const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const sports = {
  futevolei: {
    eyebrow: "PÉ NA BOLA. CORAÇÃO NA AREIA.",
    title: "Futevôlei",
    body: "Do primeiro domínio ao shark perfeito. Aulas niveladas, treino técnico e uma comunidade que vibra a cada ponto.",
    index: "01",
  },
  beach: {
    eyebrow: "RAQUETE NA MÃO. JOGO LÁ EM CIMA.",
    title: "Beach Tennis",
    body: "Aulas para quem está começando e para quem quer competir. Técnica, intensidade e diversão em cada troca.",
    index: "02",
  },
};

export default function Home() {
  const [sport, setSport] = useState<keyof typeof sports>("futevolei");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const current = sports[sport];

  const grains = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        left: `${(index * 37) % 100}%`,
        top: `${(index * 61) % 100}%`,
        delay: `${(index % 7) * -0.7}s`,
        size: `${2 + (index % 4)}px`,
      })),
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1850);
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPastHero(y > window.innerHeight * 0.72);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${max > 0 ? y / max : 0})`;
      }
      document.documentElement.style.setProperty("--scroll", `${y}`);
    };

    const onPointer = (event: PointerEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursorRef.current.style.setProperty("--ball-rotation", `${(event.clientX + event.clientY) * 0.16}deg`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 },
    );

    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const area = document.querySelector<HTMLElement>(".sand-playground");
    if (!area || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = 0;
    const throwSand = (event: PointerEvent) => {
      const now = performance.now();
      if (now - last < 42) return;
      last = now;
      const rect = area.getBoundingClientRect();
      const grain = document.createElement("i");
      const size = 3 + Math.random() * 7;
      grain.className = "live-grain";
      grain.style.left = `${event.clientX - rect.left}px`;
      grain.style.top = `${event.clientY - rect.top}px`;
      grain.style.width = `${size}px`;
      grain.style.height = `${size}px`;
      area.appendChild(grain);
      grain.animate(
        [
          { transform: "translate3d(0,0,0) scale(1)", opacity: 0.85 },
          {
            transform: `translate3d(${(Math.random() - 0.5) * 90}px, ${-25 - Math.random() * 75}px, 0) scale(.1)`,
            opacity: 0,
          },
        ],
        { duration: 700 + Math.random() * 450, easing: "cubic-bezier(.16,1,.3,1)" },
      ).onfinish = () => grain.remove();
    };
    area.addEventListener("pointermove", throwSand);
    return () => area.removeEventListener("pointermove", throwSand);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBookingOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main>
      <div className={`preloader ${loaded ? "preloader--done" : ""}`} aria-hidden="true">
        <span>AREIA</span><span>ENERGIA</span><span>ENCONTROS</span><b>SERRANO.</b>
      </div>

      <div className="cursor-ball" ref={cursorRef} aria-hidden="true">
        <span><img src={assetPath("/mikasa-ft5-cursor.png")} alt="" /></span>
      </div>
      <div className="page-progress" aria-hidden="true"><i ref={progressRef} /></div>

      <header className={`court-nav ${pastHero ? "court-nav--visible" : ""}`}>
        <a className="wordmark" href="#inicio" aria-label="Espaço Serrano — início">
          <small>ESPAÇO</small><strong>SERRANO</strong>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#arena">O ESPAÇO</a>
          <a href="#aulas">AULAS</a>
          <a href="#serrano">O SERRANO</a>
          <a href="#estrutura">ESTRUTURA</a>
          <a href="#contato">CONTATO</a>
        </nav>
        <button className="nav-cta" onClick={() => setBookingOpen(true)}>SUA QUADRA <span>↗</span></button>
      </header>

      <section className="hero" id="inicio" aria-label="Viva o jogo no Espaço Serrano">
        <img
          src={assetPath("/serrano-hero-clean.png")}
          alt="Jogador de futevôlei executando um ataque sobre a rede ao pôr do sol no Espaço Serrano"
          className="hero-poster"
        />
        <div className="hero-art" aria-hidden="true">
          <i className="hero-green-field" />
          <i className="hero-slash" />
          <i className="hero-orbit hero-orbit--one" />
          <i className="hero-orbit hero-orbit--two" />
          <i className="hero-wave hero-wave--cream" />
          <i className="hero-wave hero-wave--lime" />
          <i className="hero-grain" />
        </div>
        <div className="hero-desktop-ui">
          <a className="hero-brand" href="#inicio" aria-label="Espaço Serrano — início">
            <small>ESPAÇO</small><strong>SERRANO</strong>
          </a>
          <nav className="hero-menu" aria-label="Navegação da abertura">
            <a href="#arena">O ESPAÇO</a>
            <a href="#aulas">AULAS</a>
            <a href="#galeria">GALERIA</a>
            <a href="#contato">CONTATO</a>
          </nav>
          <button className="hero-court" type="button" onClick={() => setBookingOpen(true)} aria-label="Reservar sua quadra">
            <span>SUA<br />QUADRA</span>
          </button>
          <div className="hero-copy">
            <p className="hero-kicker">ESPORTE <i /> ENERGIA <i /> ENCONTROS</p>
            <h1 className="hero-title"><span>VIVA</span><em>o jogo.</em></h1>
            <p className="hero-tagline">Sua melhor versão<br />começa na areia.</p>
            <button className="hero-play" type="button" onClick={() => setBookingOpen(true)}>QUERO JOGAR <span>↗</span></button>
          </div>
        </div>
        <div className="hero-mobile-copy">
          <span>ESPORTE • ENERGIA • ENCONTROS</span>
          <h1>VIVA <em>o jogo.</em></h1>
          <p>Sua melhor versão começa na areia.</p>
          <button onClick={() => setBookingOpen(true)}>QUERO JOGAR</button>
        </div>
        <a href="#arena" className="scroll-cue" aria-label="Conheça o espaço">
          <span>DESCER PRA AREIA</span><i>↓</i>
        </a>
      </section>

      <section className="intro sand-playground" id="arena">
        <div className="grain-cloud" aria-hidden="true">
          {grains.map((grain, index) => (
            <i key={index} style={{ left: grain.left, top: grain.top, animationDelay: grain.delay, width: grain.size, height: grain.size }} />
          ))}
        </div>
        <div className="intro-kicker" data-reveal>
          <span>VINHEDO — SP</span><span>23°01&apos;S / 46°58&apos;W</span>
        </div>
        <h2 data-reveal>
          NÃO É SÓ<br />UMA QUADRA.<br /><em>É ONDE O JOGO VIRA ENCONTRO.</em>
        </h2>
        <div className="intro-bottom" data-reveal>
          <p>
            Três quadras de areia, aulas para todos os níveis e uma energia que continua
            depois do último ponto. Aqui, treino sério e ambiente familiar jogam no mesmo time.
          </p>
          <div className="stamp"><span>DESDE A PRIMEIRA BOLA</span><strong>100%</strong><small>PÉ NA AREIA</small></div>
        </div>
      </section>

      <div className="net-break" aria-hidden="true">
        <div className="net-grid" /><span>ENTRE NA QUADRA • ENTRE NA QUADRA • ENTRE NA QUADRA •</span>
      </div>

      <section className="sports" id="aulas">
        <div className="sports-copy" data-reveal>
          <div className="section-label"><span>02</span> ESCOLHA SEU JOGO</div>
          <p className="sport-eyebrow">{current.eyebrow}</p>
          <div className="sport-heading">
            <span>{current.index}</span><h2>{current.title}</h2>
          </div>
          <p className="sport-body">{current.body}</p>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="text-link">CONHECER AS AULAS <span>↗</span></a>
        </div>

        <div className={`sport-stage sport-stage--${sport} is-visible`}>
          <div className="sport-image">
            <img
              key={sport}
              src={assetPath(sport === "beach" ? "/serrano-beach-tennis.png" : "/serrano-futevolei-wide.png")}
              alt={sport === "beach" ? "Atletas jogando beach tennis na quadra de areia do Espaço Serrano" : "Atleta de futevôlei atacando junto à rede do Espaço Serrano"}
            />
          </div>
          <div className="court-lines" aria-hidden="true"><i /><i /><i /></div>
          <div className="sport-switch" role="tablist" aria-label="Modalidades">
            <button role="tab" aria-selected={sport === "futevolei"} onClick={() => setSport("futevolei")}>FUTEVÔLEI <span>01</span></button>
            <button role="tab" aria-selected={sport === "beach"} onClick={() => setSport("beach")}>BEACH TENNIS <span>02</span></button>
          </div>
          <div className="floating-ball" aria-hidden="true"><i /></div>
        </div>
      </section>

      <section className="numbers" aria-label="Números e diferenciais do Espaço Serrano">
        <div className="numbers-track">
          <article data-reveal><strong>03</strong><span>QUADRAS<br />DE AREIA</span></article>
          <article data-reveal><strong>06+</strong><span>ANOS NAS<br />AULAS KIDS</span></article>
          <article data-reveal><strong>02</strong><span>MODALIDADES<br />UMA TRIBO</span></article>
          <article data-reveal><strong>∞</strong><span>VONTADE<br />DE JOGAR</span></article>
        </div>
      </section>

      <section className="manifesto" id="galeria">
        <div className="manifesto-photo" data-reveal>
          <img src={assetPath("/serrano-futevolei-wide.png")} alt="Atleta de futevôlei jogando ao pôr do sol no Espaço Serrano" />
          <div className="photo-caption"><span>LUZ DE FIM DE TARDE</span><span>QUADRA 01</span></div>
        </div>
        <div className="manifesto-copy" data-reveal>
          <div className="section-label"><span>03</span> O JEITO SERRANO</div>
          <p>Você chega para treinar.</p>
          <p>Fica pela <em>energia.</em></p>
          <p>Volta pelas <em>pessoas.</em></p>
          <div className="manifesto-note">
            <i />
            <span>Uma arena segura e familiar, feita para quem quer começar, evoluir ou competir de verdade.</span>
          </div>
        </div>
      </section>

      <section className="founder" id="serrano">
        <div className="founder-ghost" aria-hidden="true">O SERRANO</div>
        <div className="founder-head" data-reveal>
          <div className="section-label section-label--light"><span>04</span> QUEM COMEÇOU TUDO</div>
          <h2>ANTES DE SER UM ESPAÇO,<br /><em>SERRANO É UMA PESSOA.</em></h2>
        </div>

        <div className="founder-stage">
          <figure className="founder-portrait" data-reveal>
            <img src={assetPath("/o-serrano-portrait.png")} alt="Serrano, fundador do Espaço Serrano Sports" />
            <figcaption><span>FUNDADOR</span><span>TREINADOR</span><span>MENTOR</span></figcaption>
          </figure>

          <article className="founder-story" data-reveal>
            <div className="founder-mini" aria-hidden="true">
              <img src={assetPath("/o-serrano-portrait.png")} alt="" />
            </div>
            <span>O FUNDADOR</span>
            <h3>O SERRANO.</h3>
            <p>
              A pessoa por trás da arena, do método e da energia que conecta atletas de
              todos os níveis. Uma visão de treino que une técnica, corpo e mentalidade.
            </p>
            <blockquote>“O sucesso do outro<br />não diminui o seu.”</blockquote>
          </article>

          <figure className="founder-archive" data-reveal>
            <img src={assetPath("/o-serrano-social.png")} alt="Arquivo de momentos, treinos e mensagens compartilhadas pelo Serrano" />
            <figcaption><span>ARQUIVO SERRANO</span><span>MENTALIDADE • TÉCNICA • COMUNIDADE</span></figcaption>
          </figure>
        </div>

        <div className="founder-belief" data-reveal>
          <span>01</span>
          <p>Ensinar o movimento.<br /><em>Construir a confiança.</em><br />Formar uma comunidade.</p>
          <i>↗</i>
        </div>
        <div className="founder-marquee" aria-hidden="true">
          <span>O CORPO FALA • O JOGO ENSINA • A COMUNIDADE FORTALECE • </span>
        </div>
      </section>

      <section className="experience" id="estrutura">
        <div className="experience-head" data-reveal>
          <div className="section-label section-label--light"><span>05</span> ALÉM DA REDE</div>
          <h2>TUDO PRA VOCÊ<br /><em>VIVER O DIA.</em></h2>
        </div>
        <div className="experience-grid">
          <article className="bento bento--wide" data-reveal>
            <span className="bento-number">01</span><div className="icon-shower" aria-hidden="true" /><h3>VESTIÁRIO<br />COMPLETO</h3><p>Chegue, jogue e siga o dia.</p>
          </article>
          <article className="bento bento--lime" data-reveal>
            <span className="bento-number">02</span><div className="icon-cup" aria-hidden="true" /><h3>LANCHONETE</h3><p>O pós-jogo também é parte da experiência.</p>
          </article>
          <article className="bento bento--photo" data-reveal>
            <img src={assetPath("/serrano-beach-tennis.png")} alt="Atletas jogando beach tennis no Espaço Serrano" /><span>BEACH<br />TENNIS</span>
          </article>
          <article className="bento" data-reveal>
            <span className="bento-number">03</span><div className="icon-parking" aria-hidden="true">P</div><h3>ESTACIONAMENTO<br />PRÓPRIO</h3><p>Mais tempo em quadra, menos preocupação.</p>
          </article>
          <article className="bento bento--wide bento--cream" data-reveal>
            <span className="bento-number">04</span><div className="recovery-orbit" aria-hidden="true"><i /><i /></div><h3>RECUPERAÇÃO<br />ESPORTIVA</h3><p>Fisioterapia e massoterapia dentro do seu ecossistema de treino.</p>
          </article>
        </div>
      </section>

      <section className="day-use">
        <div className="day-use-top" data-reveal>
          <span>DAY USE DE FUTEVÔLEI</span><span>SEM DESCULPA. É SÓ CHEGAR.</span>
        </div>
        <div className="schedule" data-reveal>
          <div><span>SEXTA</span><strong>14—19H</strong></div>
          <i />
          <div><span>SÁBADO + DOMINGO</span><strong>09—14H</strong></div>
        </div>
        <a href={whatsapp} target="_blank" rel="noreferrer" className="round-cta" aria-label="Chamar o Espaço Serrano no WhatsApp">
          <span>PARTIU<br />SERRANO</span><i>↗</i>
        </a>
      </section>

      <section className="cup" aria-label="Serrano Cup e eventos">
        <div className="cup-orbit" aria-hidden="true"><span>SERRANO CUP • TORNEIO • COMUNIDADE • </span></div>
        <div className="cup-copy" data-reveal>
          <span>JOGO VALENDO.<br />TORCIDA JUNTO.</span>
          <h2>SERRANO<br /><em>CUP</em></h2>
          <p>Torneios, eventos e dias que continuam na memória muito depois do match point.</p>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="light-button">QUERO SABER DO PRÓXIMO <span>↗</span></a>
        </div>
        <div className="cup-ball" aria-hidden="true"><i /><i /><i /></div>
      </section>

      <section className="contact" id="contato">
        <div className="contact-copy" data-reveal>
          <span>O PRÓXIMO PONTO É SEU.</span>
          <h2>BORA PRA<br /><em>AREIA?</em></h2>
          <p>Agende uma aula experimental, conheça o espaço ou reúna sua turma.</p>
          <button onClick={() => setBookingOpen(true)}>QUERO JOGAR <span>↗</span></button>
        </div>
        <a className="address-card" href="https://maps.google.com/?q=Rua+dos+Servidores+P%C3%BAblicos+185+Vinhedo+SP" target="_blank" rel="noreferrer" data-reveal>
          <span>ONDE A GENTE JOGA</span>
          <strong>RUA DOS SERVIDORES PÚBLICOS, 185</strong>
          <p>SÃO JOAQUIM — VINHEDO, SP</p>
          <i>ABRIR NO MAPA ↗</i>
          <div className="map-lines" aria-hidden="true"><b /><b /><b /><b /></div>
        </a>
      </section>

      <footer>
        <div className="footer-mark"><small>ESPAÇO</small><strong>SERRANO</strong><em>SPORTS</em></div>
        <div className="footer-links">
          <a href="https://www.instagram.com/espacoserranosports/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
          <a href={whatsapp} target="_blank" rel="noreferrer">WHATSAPP ↗</a>
          <a href="https://espacoserranosports.com.br/" target="_blank" rel="noreferrer">SITE OFICIAL ↗</a>
        </div>
        <p>ESPORTE • ENERGIA • ENCONTROS</p>
      </footer>

      {bookingOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setBookingOpen(false)}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Fechar">×</button>
            <span>VAMOS PRA AREIA</span>
            <h2 id="booking-title">QUAL É<br />O SEU JOGO?</h2>
            <p>Escolha uma modalidade e fale direto com a equipe Serrano.</p>
            <a href={whatsapp.replace("aula%20experimental", "aula%20experimental%20de%20futev%C3%B4lei")} target="_blank" rel="noreferrer">FUTEVÔLEI <b>↗</b></a>
            <a href={whatsapp.replace("aula%20experimental", "aula%20experimental%20de%20beach%20tennis")} target="_blank" rel="noreferrer">BEACH TENNIS <b>↗</b></a>
            <small>Resposta pelo WhatsApp • (19) 99838-1326</small>
          </div>
        </div>
      )}
    </main>
  );
}
