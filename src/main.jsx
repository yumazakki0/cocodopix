import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Menu,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import "./styles.css";

const prices = [
  { send: 10, receive: 20, tag: "Iniciante", note: "pra testar a fé" },
  { send: 50, receive: 100, tag: "Popular", note: "o mais vendido" },
  { send: 150, receive: 300, tag: "Corajoso", note: "nível de confiança alta" },
  { send: 500, receive: 1000, tag: "Delírio", note: "ponto de não retorno" },
  { send: 1500, receive: 3000, tag: "Agressivo", note: "sem filtro" },
  { send: 5000, receive: 10000, tag: "Lenda", note: "meme com status" },
];

const loadingLines = [
  "Inicializando a máquina de multiplicação financeira...",
  "Ativando protocolo de confiança máxima...",
  "Lendo a psicologia do urubu...",
  "Validando se o valor ainda parece aceitável...",
  "Executando matemática com entusiasmo...",
  "Conectando a energia da fama e do caos...",
  "Tudo pronto. Só falta a coragem coletiva.",
];

function money(n) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function FlyingVulture({ index }) {
  const paths = [
    { top: "8%", duration: 18, delay: -3, size: 70, rotate: -9 },
    { top: "32%", duration: 24, delay: -12, size: 52, rotate: 8 },
    { top: "58%", duration: 20, delay: -7, size: 88, rotate: -5 },
    { top: "82%", duration: 26, delay: -15, size: 42, rotate: 10 },
  ];

  const p = paths[index % paths.length];

  return (
    <motion.div
      className="vulture"
      style={{ top: p.top, fontSize: p.size, rotate: p.rotate }}
      animate={{ x: ["-18vw", "122vw"], y: [0, -20, 8, -12, 0] }}
      transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
    >
      🦅
    </motion.div>
  );
}

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onDone, 400);
          return 100;
        }
        return Math.min(100, p + Math.floor(Math.random() * 8) + 2);
      });
    }, 140);
    return () => clearInterval(timer);
  }, [onDone]);

  useEffect(() => {
    const timer = setInterval(() => setLine((v) => (v + 1) % loadingLines.length), 520);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div className="loading" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="loading-noise" />
      <div className="loading-card">
        <div className="loading-bird">🦅</div>
        <div className="eyebrow">URUBU SYSTEMS // ONLINE</div>
        <h1>
          URUBU<span>DO PIX</span>
        </h1>
        <p className="loading-line">&gt; {loadingLines[line]}</p>
        <div className="progress-wrap">
          <div className="progress">
            <motion.div className="progress-fill" animate={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>
        <small>Inicializando a economia brasileira com estilo e pouca vergonha.</small>
      </div>
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const fakePix = "urubu-do-pix-parodia-000000000000000";

  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 61) % 100}%`,
        delay: `${(i % 7) * 0.45}s`,
      })),
    []
  );

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(fakePix);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <LoadingScreen onDone={() => setLoading(false)} />
      </AnimatePresence>
    );
  }

  return (
    <div className="app">
      <div className="grid-bg" />
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      {stars.map((s, i) => (
        <i key={i} className="star" style={s} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <FlyingVulture key={i} index={i} />
      ))}

      <nav>
        <div className="brand">
          <span className="brand-icon">🦅</span>
          <span>
            URUBU<span className="gold">DO PIX</span>
          </span>
        </div>

        <div className={`nav-links ${menu ? "open" : ""}`}>
          <a href="#como">Como funciona</a>
          <a href="#precos">Planos</a>
          <a href="#faq">FAQ</a>
        </div>

        <button className="menu-btn" onClick={() => setMenu((value) => !value)}>
          {menu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="status">
              <span /> SISTEMA OPERACIONAL // 100% SUSPEITO
            </div>

            <h1>
              MANDE PIX.<br />
              <em>RECEBA O DOBRO.</em>
            </h1>

            <p className="hero-text">
              A tecnologia financeira que ninguém pediu, mas que o povo do meme ainda decidiu
              testar com muito orgulho e bem pouca lógica.
            </p>

            <div className="hero-actions">
              <a href="#precos" className="primary-btn">
                VER PLANOS <ArrowRight size={18} />
              </a>
              <a href="#como" className="secondary-btn">
                ENTENDER A LOUCURA
              </a>
            </div>

            <div className="trust">
              <span>
                <Check size={15} /> 100% fictício
              </span>
              <span>
                <Check size={15} /> 0% banco de dados
              </span>
              <span>
                <Check size={15} /> 100% urubu
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="visual-card main-card">
              <span className="mini-label">lucro estimado</span>
              <strong>R$ 2.000</strong>
              <small>em 24 horas</small>
            </div>

            <motion.div
              className="big-bird"
              animate={{ y: [0, -16, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              🦅
            </motion.div>

            <div className="visual-card floating-card left-card">
              <TrendingUp size={16} />
              <span>+100% de fé</span>
            </div>

            <div className="visual-card floating-card right-card">
              <Sparkles size={16} />
              <span>meme level max</span>
            </div>
          </div>
        </section>

        <section className="ticker">
          <span>PIX × 2</span>
          <b>✦</b>
          <span>RISCO ZERO*</span>
          <b>✦</b>
          <span>TECNOLOGIA AVANÇADA*</span>
          <b>✦</b>
          <span>URUBUS CERTIFICADOS*</span>
        </section>

        <section id="como" className="section">
          <div className="section-heading">
            <span className="number">01</span>
            <div>
              <p className="eyebrow">O PROCESSO</p>
              <h2>COMO FUNCIONA?</h2>
            </div>
          </div>

          <div className="steps">
            {[
              [
                "01",
                "Escolha o valor",
                "Selecione quanto você quer transformar em teoria financeira e empolgação.",
              ],
              [
                "02",
                "Confie no urubu",
                "Ele observa, acena e faz parecer que tudo foi planejado desde o início.",
              ],
              [
                "03",
                "Matemática acontece",
                "2 × 2 = 4. Ou quase isso. A fé é o melhor algoritmo do mercado.",
              ],
            ].map(([n, t, d]) => (
              <div className="step" key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="precos" className="section prices-section">
          <div className="section-heading">
            <span className="number">02</span>
            <div>
              <p className="eyebrow">CARDÁPIO FINANCEIRO</p>
              <h2>ESCOLHA SEU NÍVEL DE FÉ</h2>
            </div>
          </div>

          <div className="price-grid">
            {prices.map((p, i) => (
              <motion.button
                className={`price-card ${i === 1 ? "popular" : ""}`}
                key={`${p.tag}-${p.send}`}
                whileHover={{ y: -8 }}
                onClick={() => setSelected(p)}
              >
                {i === 1 && <div className="popular-tag">MAIS SUSPEITO</div>}
                <span className="price-tag">{p.tag}</span>
                <div className="send">{money(p.send)}</div>
                <div className="arrow">↓</div>
                <div className="receive">{money(p.receive)}</div>
                <div className="card-note">{p.note}</div>
                <span className="multiply">× 2</span>
              </motion.button>
            ))}
          </div>

          <p className="disclaimer">
            *Todos os valores, retornos, urubus e resultados são fictícios. Isso é uma paródia.
          </p>
        </section>

        <section className="pix-panel">
          <div>
            <p className="eyebrow">ÁREA PIX</p>
            <h2>SEU PIX ESTÁ AQUI.</h2>
            <p>Não está mesmo. Mas visualmente ficou bem melhor.</p>
          </div>

          <button className="copy-btn" onClick={copyPix}>
            {copied ? (
              <>
                <Check size={18} /> COPIADO
              </>
            ) : (
              <>
                <Copy size={18} /> COPIAR CHAVE FICTÍCIA
              </>
            )}
          </button>
        </section>

        <section id="faq" className="section faq">
          <div className="section-heading">
            <span className="number">03</span>
            <div>
              <p className="eyebrow">LETRINHAS QUE NINGUÉM LÊ</p>
              <h2>FAQ</h2>
            </div>
          </div>

          <div className="faq-grid">
            <div>
              <ShieldAlert />
              <h3>Isso é real?</h3>
              <p>Não. É uma paródia visual. O site não armazena, recebe ou processa pagamentos.</p>
            </div>
            <div>
              <Wallet />
              <h3>Tem backend?</h3>
              <p>Existe um carregamento fake, mas o projeto é 100% estático e pronto para Vercel.</p>
            </div>
            <div>
              <span className="faq-emoji">🦅</span>
              <h3>Por que um urubu?</h3>
              <p>Porque a águia já estava ocupada com branding corporativo e a fama de ser chique.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand">
          <span className="brand-icon">🦅</span> URUBU<span className="gold">DO PIX</span>
        </div>
        <p>PARÓDIA • SEM BANCO • SEM PIX REAL • COM URUBUS</p>
        <span>© 2026 URUBU SYSTEMS</span>
      </footer>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.9, y: 28 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close" onClick={() => setSelected(null)}>
                <X />
              </button>
              <div className="modal-bird">🦅</div>
              <p className="eyebrow">SIMULAÇÃO DE PEDIDO</p>
              <h2>
                {money(selected.send)} → {money(selected.receive)}
              </h2>
              <p>O urubu analisou seu pedido e concluiu que isso seria financeiramente absurdo.</p>

              <div className="fake-terminal">
                <span>&gt; pedido recebido</span>
                <span>&gt; analisando perfil do investidor...</span>
                <span>
                  &gt; retorno: <b>100% FICTÍCIO</b>
                </span>
              </div>

              <button className="primary-btn full" onClick={() => setSelected(null)}>
                ENTENDI, URUBU <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
