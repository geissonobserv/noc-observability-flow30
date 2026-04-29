import { useState, useEffect, useRef, useCallback } from 'react';
import {
  BarChart3, Telescope, Monitor, Shield, Wrench, GraduationCap, Map,
  ExternalLink, Menu, X, ChevronDown, Star, Award, Cpu, Brain,
  Search, Users, MapPin, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tool {
  id: number;
  name: string;
  icon_letter: string;
  icon_color: string;
  description: string;
  category: string;
  tool_type: string;
  tags: string;
  url: string;
}

interface Course {
  id: number;
  name: string;
  emoji: string;
  description: string;
  source: string;
  course_type: string;
  url: string;
}

const CATEGORIES = [
  { key: 'all', label: 'Todas', icon: '🔥' },
  { key: 'metrics', label: 'Métricas', icon: '📊' },
  { key: 'logs', label: 'Logs', icon: '📋' },
  { key: 'traces', label: 'Traces', icon: '🔗' },
  { key: 'apm', label: 'APM', icon: '⚡' },
  { key: 'network', label: 'Rede', icon: '🌐' },
  { key: 'alerting', label: 'Alertas', icon: '🚨' },
];

function ToolCard({ tool }: { tool: Tool }) {
  const tags = tool.tags ? tool.tags.split(',').map(t => t.trim()) : [];
  const badgeClass = tool.tool_type === 'Open Source'
    ? 'bg-gradient-to-br from-emerald-500 to-emerald-700'
    : 'bg-gradient-to-br from-cyan-500 to-cyan-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all group"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
          style={{ backgroundColor: tool.icon_color + '33', color: tool.icon_color }}
        >
          {tool.icon_letter}
        </div>
        <div>
          <h4 className="font-bold">{tool.name}</h4>
          <span className={`${badgeClass} px-2 py-0.5 rounded text-[10px] font-bold`}>
            {tool.tool_type}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-3">{tool.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] bg-white/10 px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group-hover:underline"
      >
        Acessar ferramenta <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </motion.div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const isFree = course.course_type === 'FREE';
  const badgeClass = isFree
    ? 'bg-gradient-to-br from-emerald-500 to-emerald-700'
    : 'bg-gradient-to-br from-cyan-500 to-cyan-700';
  const linkColor = isFree ? 'text-emerald-400 hover:text-emerald-300' : 'text-cyan-400 hover:text-cyan-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{course.emoji}</span>
        <span className={`${badgeClass} px-2 py-0.5 rounded text-[10px] font-bold`}>
          {course.course_type}
        </span>
      </div>
      <h4 className={`font-bold text-lg mb-2 transition-colors ${isFree ? 'group-hover:text-emerald-400' : 'group-hover:text-cyan-400'}`}>
        {course.name}
      </h4>
      <p className="text-sm text-gray-400 mb-3">{course.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{course.source}</span>
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors group-hover:underline ${linkColor}`}
        >
          Acessar curso <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

function Navbar({ activeSection, onSearch }: { activeSection: string; onSearch: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { href: '#inicio', label: 'Início' },
    { href: '#conceitos', label: 'Conceitos' },
    { href: '#noc', label: 'O que é NOC' },
    { href: '#requisitos', label: 'Requisitos' },
    { href: '#ferramentas', label: 'Ferramentas' },
    { href: '#cursos', label: 'Cursos' },
    { href: '#roadmap', label: 'Roadmap' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{ background: 'linear-gradient(90deg, rgba(0,87,184,0.12) 0%, rgba(10,10,10,0.97) 30%, rgba(10,10,10,0.99) 100%)', backdropFilter: 'blur(24px)' }}>
      {/* Animated scan line at top */}
      <div className="h-[2px] w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0057B8]/60 to-transparent" style={{ animation: 'scanline 4s ease-in-out infinite' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-5">
            {/* Logo with pulse indicator */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-40" />
              </div>
              <span
                className="text-[#0057B8] text-3xl font-black tracking-tighter"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', textShadow: '0 0 20px rgba(0,87,184,0.4)' }}
              >
                NOC <span className="text-white">FLOW</span>
              </span>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-px h-7 bg-gradient-to-b from-transparent via-[#0057B8]/40 to-transparent" />
            {/* Nav links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map(l => {
                const isActive = activeSection === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`relative px-3 py-1.5 rounded-md text-[11px] tracking-[0.15em] font-bold transition-all duration-300 ${
                      isActive
                        ? 'text-[#0057B8] bg-[#0057B8]/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {l.label.toUpperCase()}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1 right-1 h-[2px] rounded-full bg-[#0057B8]"
                        style={{ boxShadow: '0 0 8px rgba(0,87,184,0.6)' }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onSearch}
              className="text-gray-500 hover:text-[#0057B8] transition-all duration-300 p-2 rounded-lg hover:bg-[#0057B8]/10 border border-transparent hover:border-[#0057B8]/20"
              title="Buscar (Ctrl+K)"
            >
              <Search size={18} />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-400 hover:text-white transition-colors p-2">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      {/* Bottom border glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#0057B8]/25 to-transparent" />
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'linear-gradient(180deg, rgba(0,87,184,0.08) 0%, rgba(10,10,10,0.99) 100%)' }}
          >
            <div className="px-4 py-3 space-y-1 border-t border-[#0057B8]/15">
              {links.map(l => {
                const isActive = activeSection === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-xs tracking-[0.15em] font-bold transition-all duration-200 ${
                      isActive
                        ? 'text-[#0057B8] bg-[#0057B8]/10 border-l-2 border-[#0057B8]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                    }`}
                  >
                    {l.label.toUpperCase()}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 via-40% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="bg-gradient-to-br from-[#0057B8] to-[#003F88] px-3 py-1 rounded text-xs font-bold tracking-wider uppercase">
              Guia Completo 2026
            </span>
            <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 px-3 py-1 rounded text-xs font-bold tracking-wider uppercase">
              Open Source
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#0057B8]/20 max-w-md" style={{ boxShadow: '0 0 60px rgba(0,87,184,0.15)' }}>
              <img
                src="/noc-team.jpg"
                alt="Equipe NOC de Observabilidade"
                className="w-full h-auto object-cover"
                style={{ animation: 'heroFloat 6s ease-in-out infinite' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-bold tracking-[0.2em] uppercase">NOC Live</span>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-300 mb-4 font-light leading-relaxed"
          >
            Seu guia definitivo para{' '}
            <span className="text-[#0057B8] font-semibold">Monitoramento</span> e{' '}
            <span className="text-emerald-400 font-semibold">Observabilidade</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 mb-8 max-w-2xl text-base leading-relaxed"
          >
            Tudo que você precisa saber para entrar e se destacar na área de monitoramento de infraestrutura.
            De conceitos fundamentais às ferramentas mais utilizadas no mercado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#conceitos"
              className="bg-[#0057B8] hover:bg-[#003F88] text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
              style={{ boxShadow: '0 0 20px rgba(0,87,184,0.4)' }}
            >
              ▶ Explorar Guia
            </a>
            <a
              href="#ferramentas"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 border border-white/20 flex items-center gap-2"
            >
              🛠 Ver Ferramentas
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#e50914]">25+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Ferramentas</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">30+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Cursos</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-violet-400">30+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Tópicos</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>
    </section>
  );
}

function ConceitosSection() {
  return (
    <section id="conceitos" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="bg-gradient-to-br from-[#0057B8] to-[#003F88] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">
            Fundamentos
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            <span className="text-[#0057B8]">Conceitos</span> <span className="text-white">Fundamentais</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Entenda os pilares que sustentam o mundo de monitoramento e observabilidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Monitoramento */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#e50914]/10 to-transparent rounded-xl p-8 border border-white/5 hover:border-[#e50914]/30 transition-all"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#e50914]/20 text-[#e50914] flex items-center justify-center text-2xl">
                <BarChart3 />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Monitoramento</h3>
                <span className="bg-gradient-to-br from-[#0057B8] to-[#003F88] px-2 py-0.5 rounded text-[10px] font-bold">
                  ESSENCIAL
                </span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              O <strong className="text-[#e50914]">monitoramento</strong> é a prática de coletar, analisar e exibir
              métricas de sistemas e infraestrutura para garantir que tudo esteja funcionando conforme o esperado.
              Ele responde à pergunta: <em className="text-white">"O sistema está funcionando?"</em>
            </p>
            <div className="space-y-3">
              {[
                'Coleta de métricas pré-definidas (CPU, memória, disco)',
                'Alertas baseados em thresholds limiares',
                'Dashboards em tempo real',
                'Detecção proativa de problemas conhecidos',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="text-[#e50914]">▸</span> {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Observabilidade */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-500/10 to-transparent rounded-xl p-8 border border-white/5 hover:border-emerald-500/30 transition-all"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl">
                <Telescope />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Observabilidade</h3>
                <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">
                  AVANÇADO
                </span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              A <strong className="text-emerald-400">observabilidade</strong> é a capacidade de entender o estado
              interno de um sistema a partir de seus outputs externos. Ela responde à pergunta:{' '}
              <em className="text-white">"Por que o sistema está falhando?"</em>
            </p>
            <div className="space-y-3">
              {[
                'Os três pilares: Métricas, Logs e Traces',
                'Investigação de problemas desconhecidos',
                'Análise de causa raiz (RCA)',
                'Dados de alta cardinalidade',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="text-emerald-400">▸</span> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Comparison Section */}
        <div className="relative">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e50914]/50" />
              <span className="text-3xl">⚔️</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-400/50" />
            </div>
            <h3
              className="text-3xl sm:text-4xl font-black"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
            >
              <span className="text-[#e50914]">MONITORAMENTO</span>
              <span className="text-gray-500 mx-3 text-2xl">vs</span>
              <span className="text-emerald-400">OBSERVABILIDADE</span>
            </h3>
            <p className="text-gray-500 text-sm mt-2">Entenda a diferença entre as duas abordagens</p>
          </div>

          {/* VS Cards */}
          <div className="grid md:grid-cols-2 gap-0 md:gap-0 relative">
            {/* Center divider */}
            <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 w-px z-10" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)' }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
                <span className="text-xs font-black text-gray-400 tracking-widest">VS</span>
              </div>
            </div>

            {/* Monitoramento Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-l-2xl p-6 sm:p-8 border border-[#e50914]/15 bg-gradient-to-br from-[#e50914]/10 via-[#e50914]/[0.04] to-transparent"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-[#e50914]/20 flex items-center justify-center">
                  <BarChart3 size={20} className="text-[#e50914]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#e50914]">MONITORAMENTO</h4>
                  <p className="text-[10px] text-[#e50914]/80 tracking-widest uppercase">Reativo & Proativo</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: '❓', label: 'PERGUNTA', value: '"Está funcionando?"', glow: false },
                  { icon: '🎯', label: 'ABORDAGEM', value: 'Reativa / Proativa', glow: false },
                  { icon: '📊', label: 'DADOS', value: 'Métricas pré-definidas', glow: false },
                  { icon: '🔍', label: 'PROBLEMAS', value: 'Conhecidos', glow: false },
                  { icon: '⚡', label: 'COMPLEXIDADE', value: 'Moderada', glow: false },
                ].map((item, i) => (
                  <div key={item.label} className="group">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs">{item.icon}</span>
                      <span className="text-[10px] font-bold text-[#e50914]/50 tracking-[0.2em]">{item.label}</span>
                    </div>
                    <div className="pl-6 py-2 px-4 rounded-lg bg-[#e50914]/5 border border-[#e50914]/10 group-hover:border-[#e50914]/25 transition-colors">
                      <span className="text-sm text-gray-200 font-medium">{item.value}</span>
                    </div>
                    {i < 4 && <div className="ml-8 mt-3 h-px bg-gradient-to-r from-[#e50914]/10 to-transparent" />}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Observabilidade Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-r-2xl p-6 sm:p-8 border border-emerald-400/10 bg-gradient-to-bl from-emerald-400/5 via-emerald-400/[0.02] to-transparent"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-emerald-400/15 flex items-center justify-center">
                  <Telescope size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-400">OBSERVABILIDADE</h4>
                  <p className="text-[10px] text-emerald-400/60 tracking-widest uppercase">Exploratória & Investigativa</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: '💡', label: 'PERGUNTA', value: '"Por que falhou?"' },
                  { icon: '🔬', label: 'ABORDAGEM', value: 'Exploratória / Investigativa' },
                  { icon: '📈', label: 'DADOS', value: 'Métricas, Logs, Traces' },
                  { icon: '🌐', label: 'PROBLEMAS', value: 'Conhecidos e desconhecidos' },
                  { icon: '🔥', label: 'COMPLEXIDADE', value: 'Alta' },
                ].map((item, i) => (
                  <div key={item.label} className="group">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs">{item.icon}</span>
                      <span className="text-[10px] font-bold text-emerald-400/50 tracking-[0.2em]">{item.label}</span>
                    </div>
                    <div className="pl-6 py-2 px-4 rounded-lg bg-emerald-400/5 border border-emerald-400/10 group-hover:border-emerald-400/25 transition-colors">
                      <span className="text-sm text-gray-200 font-medium">{item.value}</span>
                    </div>
                    {i < 4 && <div className="ml-8 mt-3 h-px bg-gradient-to-r from-emerald-400/10 to-transparent" />}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom summary bar */}
          <div className="mt-6 grid grid-cols-2 gap-0 rounded-xl overflow-hidden border border-white/5">
            <div className="p-4 bg-[#e50914]/5 text-center border-r border-white/5">
              <p className="text-[10px] text-[#e50914]/60 tracking-[0.2em] font-bold mb-1">RESUMO</p>
              <p className="text-sm text-gray-300">Responde <strong className="text-[#e50914]">"O QUE"</strong> está acontecendo</p>
            </div>
            <div className="p-4 bg-emerald-400/5 text-center">
              <p className="text-[10px] text-emerald-400/60 tracking-[0.2em] font-bold mb-1">RESUMO</p>
              <p className="text-sm text-gray-300">Responde <strong className="text-emerald-400">"POR QUE"</strong> está acontecendo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NOCSection() {
  return (
    <section id="noc" className="py-20 bg-gradient-to-b from-[#0a0a0a] via-[#1a0505] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-6xl mb-4 block">🖥️</span>
          <h2
            className="text-4xl sm:text-6xl font-black mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            <span className="text-[#0057B8]">O que é</span> <span className="text-white">NOC?</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Network Operations Center — O coração do monitoramento
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              O <strong className="text-[#e50914]">NOC (Network Operations Center)</strong> ou Centro de Operações de
              Rede é uma área dedicada dentro de uma organização responsável por monitorar, gerenciar e manter a
              infraestrutura de TI e redes de forma contínua 24/7.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              É o local onde equipes especializadas utilizam ferramentas de monitoramento para garantir a
              disponibilidade, performance e segurança de todos os sistemas, redes e serviços da organização.
              Funciona como uma <em className="text-white">"torre de controle"</em> da infraestrutura tecnológica.
            </p>

            <div className="space-y-4">
              {[
                { icon: '🎯', title: 'Missão do NOC', desc: 'Garantir a máxima disponibilidade dos serviços, detectar e resolver incidentes antes que impactem os usuários finais.', color: '#0057B8', stat: '99.9%', statLabel: 'Uptime' },
                { icon: '⚡', title: 'Operação 24/7', desc: 'Funciona em turnos ininterruptos, com equipe escalonada por níveis (N1, N2, N3) para atendimento e resolução de incidentes.', color: '#f59e0b', stat: '24/7', statLabel: 'Cobertura' },
                { icon: '🔔', title: 'Gestão de Incidentes', desc: 'Recebe, classifica, prioriza e encaminha alertas e incidentes, seguindo SLAs definidos pela organização.', color: '#10b981', stat: '<5min', statLabel: 'MTTA' },
              ].map(item => (
                <div key={item.title} className="group relative rounded-xl p-5 border transition-all duration-300 hover:scale-[1.02]" style={{ background: `linear-gradient(135deg, ${item.color}10, ${item.color}04, transparent)`, borderColor: item.color + '20' }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl border" style={{ backgroundColor: item.color + '15', borderColor: item.color + '25' }}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="flex-shrink-0 text-right hidden sm:block">
                      <div className="text-xl font-black" style={{ color: item.color }}>{item.stat}</div>
                      <div className="text-[10px] text-gray-500 tracking-widest uppercase">{item.statLabel}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3
              className="text-2xl sm:text-3xl font-black mb-8 text-center"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
            >
              <span className="text-[#0057B8]">NÍVEIS</span> <span className="text-white">DE SUPORTE NOC</span>
            </h3>
            <div className="space-y-3">
              {[
                {
                  level: 'N3',
                  levelFull: 'NÍVEL 3',
                  title: 'Engenheiro Sênior / Arquiteto',
                  sub: 'Especialista',
                  desc: 'Resolve problemas complexos, faz mudanças arquiteturais, cria automações avançadas e define padrões.',
                  color: '#e50914',
                  bgFrom: 'rgba(229,9,20,0.12)',
                  bgTo: 'rgba(229,9,20,0.02)',
                  icon: '🏗️',
                  skills: ['Arquitetura', 'Automação', 'Padrões'],
                },
                {
                  level: 'N2',
                  levelFull: 'NÍVEL 2',
                  title: 'Analista de Monitoramento',
                  sub: 'Analista',
                  desc: 'Investiga alertas escalados do N1, faz troubleshooting avançado, aplica correções e configura ferramentas.',
                  color: '#f59e0b',
                  bgFrom: 'rgba(245,158,11,0.10)',
                  bgTo: 'rgba(245,158,11,0.02)',
                  icon: '🔍',
                  skills: ['Troubleshooting', 'Correções', 'Configuração'],
                },
                {
                  level: 'N1',
                  levelFull: 'NÍVEL 1',
                  title: 'Operador de NOC',
                  sub: 'Operador',
                  desc: 'Monitora dashboards, tria alertas, abre tickets, segue runbooks e escala incidentes quando necessário.',
                  color: '#10b981',
                  bgFrom: 'rgba(16,185,129,0.10)',
                  bgTo: 'rgba(16,185,129,0.02)',
                  icon: '📡',
                  skills: ['Dashboards', 'Runbooks', 'Escalonamento'],
                },
              ].map(n => (
                <motion.div
                  key={n.level}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group rounded-xl p-5 border transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: `linear-gradient(135deg, ${n.bgFrom}, ${n.bgTo}, transparent)`,
                    borderColor: n.color + '20',
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Level badge */}
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center border"
                      style={{ backgroundColor: n.color + '15', borderColor: n.color + '30' }}
                    >
                      <span className="text-lg font-black" style={{ color: n.color }}>{n.level}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 rounded" style={{ backgroundColor: n.color + '20', color: n.color }}>
                          {n.levelFull}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: n.color }}>{n.sub}</span>
                      </div>
                      <h4 className="font-bold text-lg text-white mb-1.5">{n.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed mb-3">{n.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {n.skills.map(s => (
                          <span key={s} className="text-[10px] font-semibold px-2.5 py-1 rounded-md border" style={{ borderColor: n.color + '25', color: n.color + 'cc', backgroundColor: n.color + '08' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Icon */}
                    <div className="flex-shrink-0 text-2xl opacity-40 group-hover:opacity-70 transition-opacity hidden sm:block">
                      {n.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Escalation flow indicator */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <span className="text-emerald-400 font-bold">N1</span>
              <span className="text-gray-600">→</span>
              <span className="text-amber-400 font-bold">N2</span>
              <span className="text-gray-600">→</span>
              <span className="text-[#e50914] font-bold">N3</span>
              <span className="text-gray-600 ml-2">|</span>
              <span className="text-gray-500 ml-2 tracking-wider uppercase">Fluxo de escalonamento</span>
            </div>
          </div>
        </div>

        {/* NOC Activities */}
        <div className="bg-white/5 rounded-xl p-6 sm:p-8">
          <h3
            className="text-2xl sm:text-3xl font-black mb-10 text-center"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            <span className="text-[#0057B8]">PRINCIPAIS</span> <span className="text-white">ATIVIDADES DO NOC</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📡', title: 'Monitoramento 24/7', desc: 'Vigilância contínua de toda infraestrutura e serviços', color: '#0057B8', status: 'LIVE' },
              { icon: '🚨', title: 'Gestão de Alertas', desc: 'Triagem, classificação e encaminhamento de alertas', color: '#e50914', status: 'ACTIVE' },
              { icon: '🔧', title: 'Troubleshooting', desc: 'Diagnóstico e resolução de problemas de rede e sistemas', color: '#f59e0b', status: 'READY' },
              { icon: '📝', title: 'Documentação', desc: 'Criação de runbooks, relatórios e procedimentos operacionais', color: '#8b5cf6', status: 'DOCS' },
              { icon: '🔄', title: 'Mudanças', desc: 'Execução e acompanhamento de mudanças planejadas', color: '#06b6d4', status: 'CHANGE' },
              { icon: '📊', title: 'Relatórios', desc: 'Geração de relatórios de disponibilidade e performance', color: '#10b981', status: 'DATA' },
              { icon: '🤖', title: 'Automação', desc: 'Criação de scripts e automações para tarefas repetitivas', color: '#ec4899', status: 'AUTO' },
              { icon: '🛡️', title: 'Segurança', desc: 'Detecção de anomalias e eventos de segurança na rede', color: '#6366f1', status: 'SHIELD' },
            ].map(item => (
              <div key={item.title} className="group relative rounded-xl p-5 border transition-all duration-300 hover:scale-[1.03] hover:border-opacity-50" style={{ background: `linear-gradient(160deg, ${item.color}0A, transparent)`, borderColor: item.color + '18' }}>
                {/* Status indicator dot */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                  <span className="text-[9px] font-bold tracking-widest" style={{ color: item.color + '80' }}>{item.status}</span>
                </div>
                {/* Icon */}
                <div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-3 border" style={{ backgroundColor: item.color + '12', borderColor: item.color + '20' }}>
                  {item.icon}
                </div>
                {/* Content */}
                <h4 className="font-bold text-sm text-white mb-1.5">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                {/* Bottom accent line */}
                <div className="mt-3 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${item.color}60, transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RequisitosSection() {
  return (
    <section id="requisitos" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">
            Carreira
          </span>
          <h2
            className="text-4xl sm:text-6xl font-black mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            <span className="text-emerald-400">Requisitos</span> <span className="text-white">para atuar na área</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            O que você precisa para entrar no mercado de monitoramento e observabilidade
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Hard Skills */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl p-7 border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <div className="w-9 h-9 rounded-lg bg-[#0057B8]/10 flex items-center justify-center border border-[#0057B8]/15">
                <Cpu size={18} className="text-[#0057B8]" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white">HARD SKILLS</h3>
                <p className="text-[10px] text-gray-500 tracking-wider">Competências técnicas</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {[
                { label: 'Conhecimento em redes (TCP/IP, DNS, HTTP, SNMP)', tag: 'REDE' },
                { label: 'Sistemas operacionais Linux e Windows Server', tag: 'SO' },
                { label: 'Protocolos de monitoramento (SNMP, WMI, ICMP)', tag: 'PROTOCOLO' },
                { label: 'Scripting (Bash, Python, PowerShell)', tag: 'SCRIPT' },
                { label: 'SQL e bancos de dados', tag: 'DB' },
                { label: 'Docker, Kubernetes e cloud (AWS, Azure, GCP)', tag: 'CLOUD' },
                { label: 'Git e controle de versão', tag: 'DEVOPS' },
              ].map(item => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-gray-300 group/item">
                  <span className="text-[#0057B8] text-[10px] font-bold bg-[#0057B8]/10 px-1.5 py-0.5 rounded tracking-wider flex-shrink-0 min-w-[76px] text-center">{item.tag}</span>
                  <span className="group-hover/item:text-white transition-colors">{item.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Soft Skills */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-xl p-7 border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <div className="w-9 h-9 rounded-lg bg-violet-400/10 flex items-center justify-center border border-violet-400/15">
                <Brain size={18} className="text-violet-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white">SOFT SKILLS</h3>
                <p className="text-[10px] text-gray-500 tracking-wider">Competências comportamentais</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {[
                { label: 'Capacidade analítica e resolução de problemas', tag: 'ANÁLISE' },
                { label: 'Comunicação clara e objetiva', tag: 'COMUNICAÇÃO' },
                { label: 'Trabalhar sob pressão e em turnos', tag: 'RESILIÊNCIA' },
                { label: 'Trabalhar em equipe colaborativamente', tag: 'EQUIPE' },
                { label: 'Atenção aos detalhes', tag: 'DETALHE' },
                { label: 'Proatividade e autonomia', tag: 'PROATIVO' },
                { label: 'Inglês técnico para leitura de documentação', tag: 'INGLÊS' },
              ].map(item => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-gray-300 group/item">
                  <span className="text-violet-400 text-[10px] font-bold bg-violet-400/10 px-1.5 py-0.5 rounded tracking-wider flex-shrink-0 min-w-[76px] text-center">{item.tag}</span>
                  <span className="group-hover/item:text-white transition-colors">{item.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Certificações */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-xl p-7 border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center border border-amber-400/15">
                <Award size={18} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white">CERTIFICAÇÕES</h3>
                <p className="text-[10px] text-gray-500 tracking-wider">Credenciais valorizadas</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {[
                { label: 'CCNA (Cisco Certified Network Associate)', tag: 'CISCO' },
                { label: 'CompTIA Network+ / Security+', tag: 'COMPTIA' },
                { label: 'AWS/Azure/GCP Cloud Foundations', tag: 'CLOUD' },
                { label: 'ITIL Foundation (Gestão de Serviços)', tag: 'ITIL' },
                { label: 'CKA (Certified Kubernetes Administrator)', tag: 'CNCF' },
                { label: 'Grafana Certified Associate', tag: 'GRAFANA' },
                { label: 'LPIC-1 / RHCSA (Linux)', tag: 'LINUX' },
              ].map(item => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-gray-300 group/item">
                  <span className="text-amber-400 text-[10px] font-bold bg-amber-400/10 px-1.5 py-0.5 rounded tracking-wider flex-shrink-0 min-w-[76px] text-center">{item.tag}</span>
                  <span className="group-hover/item:text-white transition-colors">{item.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Career Path */}
        <div className="mt-16 bg-gradient-to-r from-[#e50914]/10 via-violet-500/10 to-emerald-500/10 rounded-xl p-8 sm:p-12">
          <h3
            className="text-2xl sm:text-3xl font-black text-center mb-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            <span className="text-[#0057B8]">TRILHA</span> <span className="text-white">DE CARREIRA</span>
          </h3>
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-0">
            {[
              { level: 'N1', levelFull: 'NÍVEL 1', color: '#e50914', title: 'Operador NOC', time: '0-2 anos', icon: '📡', skills: 'Dashboards, Runbooks, Alertas' },
              { level: 'N2', levelFull: 'NÍVEL 2', color: '#f59e0b', title: 'Analista', time: '2-4 anos', icon: '🔍', skills: 'Troubleshooting, Correções, Config' },
              { level: 'N3', levelFull: 'NÍVEL 3', color: '#10b981', title: 'Engenheiro', time: '4-6 anos', icon: '⚙️', skills: 'Automação, Arquitetura, Padrões' },
              { level: 'SR', levelFull: 'SÊNIOR', color: '#8b5cf6', title: 'SRE / Architect', time: '6+ anos', icon: '🏗️', skills: 'Estratégia, SLOs, Chaos Eng' },
            ].map((item, i) => (
              <div key={item.level} className="flex items-center gap-0 flex-1">
                <div className="group relative rounded-xl p-5 border flex-1 min-w-[180px] transition-all duration-300 hover:scale-[1.03]" style={{ background: `linear-gradient(160deg, ${item.color}0D, ${item.color}03, transparent)`, borderColor: item.color + '18' }}>
                  {/* Level badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black border" style={{ backgroundColor: item.color + '15', borderColor: item.color + '25', color: item.color }}>
                        {item.level}
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.15em]" style={{ color: item.color + '90' }}>{item.levelFull}</span>
                    </div>
                    <span className="text-lg opacity-50 group-hover:opacity-80 transition-opacity">{item.icon}</span>
                  </div>
                  {/* Title */}
                  <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
                  {/* Time */}
                  <div className="text-xs font-semibold mb-3" style={{ color: item.color }}>{item.time}</div>
                  {/* Skills */}
                  <p className="text-[11px] text-gray-500 leading-relaxed">{item.skills}</p>
                  {/* Progress bar */}
                  <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(i + 1) * 25}%`, background: `linear-gradient(90deg, ${item.color}90, ${item.color}40)` }} />
                  </div>
                </div>
                {/* Arrow connector */}
                {i < 3 && (
                  <div className="flex-shrink-0 px-1 hidden md:flex items-center">
                    <div className="w-6 h-px" style={{ background: `linear-gradient(90deg, ${item.color}40, ${['#e50914','#f59e0b','#10b981','#8b5cf6'][i+1]}40)` }} />
                    <svg width="8" height="10" viewBox="0 0 8 10" className="opacity-40"><path d="M0 0L8 5L0 10Z" fill="currentColor" style={{ color: ['#e50914','#f59e0b','#10b981','#8b5cf6'][i+1] }} /></svg>
                  </div>
                )}
                {i < 3 && (
                  <div className="flex-shrink-0 py-2 flex md:hidden items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" className="opacity-40"><path d="M0 0L5 8L10 0Z" fill="currentColor" style={{ color: ['#e50914','#f59e0b','#10b981','#8b5cf6'][i+1] }} /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FerramentasSection({ tools }: { tools: Tool[] }) {
  const [filter, setFilter] = useState('all');

  const filteredTools = filter === 'all'
    ? tools
    : tools.filter(t => t.category.toLowerCase().includes(filter));

  return (
    <section id="ferramentas" className="py-20 bg-gradient-to-b from-[#0a0a0a] via-[#050a05] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="bg-gradient-to-br from-amber-500 to-amber-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">
            Stack
          </span>
          <h2
            className="text-4xl sm:text-6xl font-black mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            <span className="text-amber-400">Ferramentas</span> <span className="text-white">do Mercado</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            As principais ferramentas utilizadas em monitoramento e observabilidade hoje
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.key
                  ? 'bg-amber-500 text-black scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:-translate-y-0.5'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Wrench className="mx-auto mb-3" size={40} />
            <p>Carregando ferramentas...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CursosSection({ courses }: { courses: Course[] }) {
  const freeCourses = courses.filter(c => c.course_type === 'FREE');
  const paidCourses = courses.filter(c => c.course_type === 'PAGO');

  return (
    <section id="cursos" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="bg-gradient-to-br from-cyan-500 to-cyan-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">
            Aprenda
          </span>
          <h2
            className="text-4xl sm:text-6xl font-black mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            <span className="text-cyan-400">Cursos</span> <span className="text-white">& Recursos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cursos gratuitos, open source e pagos para iniciar ou se aperfeiçoar
          </p>
        </div>

        {/* Free Courses */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 px-3 py-1 rounded text-xs">GRATUITOS</span>
            <span>Cursos Open Source & Gratuitos</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Paid Courses */}
        <div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="bg-gradient-to-br from-cyan-500 to-cyan-700 px-3 py-1 rounded text-xs">COMERCIAL</span>
            <span>Cursos Pagos & Certificações</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  const phases = [
    {
      color: '#e50914',
      badge: 'FASE 1 — Fundamentos',
      badgeClass: 'bg-gradient-to-br from-[#0057B8] to-[#003F88]',
      title: 'Base Sólida',
      items: [
        'Fundamentos de redes (TCP/IP, DNS, HTTP, SSL/TLS)',
        'Linux básico (comandos, permissões, serviços)',
        'Windows Server básico',
        'Conceitos de virtualização e cloud',
        'O que é monitoramento e por que importa?',
      ],
    },
    {
      color: '#f59e0b',
      badge: 'FASE 2 — Ferramentas',
      badgeClass: 'bg-gradient-to-br from-amber-500 to-amber-700',
      title: 'Primeiras Ferramentas',
      items: [
        'Instalar e configurar Zabbix ou Nagios',
        'Criar dashboards no Grafana',
        'Instalar Prometheus com Node Exporter',
        'Configurar Alertmanager para notificações',
        'Entender SNMP, WMI e agentes',
      ],
    },
    {
      color: '#10b981',
      badge: 'FASE 3 — Automação',
      badgeClass: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
      title: 'Scripting & Automação',
      items: [
        'Bash scripting para automação de tarefas',
        'Python para scripts de monitoring',
        'Ansible para configuração de agentes',
        'Git para versionar configurações (IaC)',
        'Criar runbooks e playbooks',
      ],
    },
    {
      color: '#06b6d4',
      badge: 'FASE 4 — Cloud & Containers',
      badgeClass: 'bg-gradient-to-br from-cyan-500 to-cyan-700',
      title: 'Cloud-Native Monitoring',
      items: [
        'Docker e containerização',
        'Kubernetes e seu ecossistema',
        'Cloud Provider monitoring (AWS CloudWatch, Azure Monitor)',
        'Service Mesh (Istio) observabilidade',
      ],
    },
    {
      color: '#8b5cf6',
      badge: 'FASE 5 — Observabilidade',
      badgeClass: 'bg-gradient-to-br from-violet-500 to-violet-700',
      title: 'Full-Stack Observability',
      items: [
        'Os 3 pilares: Métricas, Logs, Traces',
        'OpenTelemetry e instrumentação',
        'Distributed Tracing (Jaeger, Tempo)',
        'APM (Application Performance Monitoring)',
        'SRE practices (SLIs, SLOs, SLAs, Error Budgets)',
        'Chaos Engineering e resilience testing',
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a15] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-5xl mb-4 block">🗺️</span>
          <h2
            className="text-4xl sm:text-6xl font-black mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            <span className="text-violet-400">Roadmap</span> <span className="text-white">de Estudos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Siga esta trilha para se tornar um profissional completo em monitoramento e observabilidade
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {phases.map((phase, i) => (
            <div
              key={phase.badge}
              className={`relative pl-12 ${i < phases.length - 1 ? 'pb-12' : ''} border-l-2`}
              style={{ borderColor: phase.color }}
            >
              <div
                className="absolute left-[-9px] top-0 w-4 h-4 rounded-full ring-4"
                style={{ backgroundColor: phase.color, boxShadow: `0 0 0 4px ${phase.color}33` }}
              />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-xl p-6"
              >
                <span className={`${phase.badgeClass} px-3 py-1 rounded text-xs font-bold inline-block mb-3`}>
                  {phase.badge}
                </span>
                <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {phase.items.map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span style={{ color: phase.color }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularidadeSection() {
  const bars = [
    { name: 'Prometheus + Grafana', pct: 95, color: 'from-[#e50914] to-[#f59e0b]' },
    { name: 'ELK Stack / OpenSearch', pct: 85, color: 'from-[#f59e0b] to-[#fbbf24]' },
    { name: 'Zabbix', pct: 80, color: 'from-[#10b981] to-[#34d399]' },
    { name: 'Datadog', pct: 75, color: 'from-[#632CA6] to-[#7c3aed]' },
    { name: 'New Relic', pct: 65, color: 'from-[#34B541] to-[#4ade80]' },
    { name: 'Nagios', pct: 60, color: 'from-[#5C9C5C] to-[#86efac]' },
    { name: 'Splunk', pct: 55, color: 'from-[#E96200] to-[#fb923c]' },
    { name: 'OpenTelemetry + Jaeger', pct: 45, color: 'from-[#60D0ED] to-[#7dd3fc]' },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-black mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            <span className="text-[#e50914]">Popularidade</span> <span className="text-white">das Ferramentas</span>
          </h2>
          <p className="text-gray-400">Baseado em adoção no mercado e presença em vagas de emprego</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {bars.map(bar => (
            <div key={bar.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{bar.name}</span>
                <span className="text-sm text-gray-400">{bar.pct}%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${bar.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlossarioSection() {
  const terms = [
    { term: 'SLA', color: '#e50914', desc: 'Service Level Agreement — Acordo formal de nível de serviço com o cliente.' },
    { term: 'SLO', color: '#e50914', desc: 'Service Level Objective — Meta interna de desempenho do serviço.' },
    { term: 'SLI', color: '#e50914', desc: 'Service Level Indicator — Métrica real que mede o nível do serviço.' },
    { term: 'MTTR', color: '#f59e0b', desc: 'Mean Time To Recovery — Tempo médio para recuperação de um incidente.' },
    { term: 'MTBF', color: '#f59e0b', desc: 'Mean Time Between Failures — Tempo médio entre falhas do sistema.' },
    { term: 'MTTA', color: '#f59e0b', desc: 'Mean Time To Acknowledge — Tempo médio para reconhecer um alerta.' },
    { term: 'RCA', color: '#10b981', desc: 'Root Cause Analysis — Análise de causa raiz de um problema.' },
    { term: 'Runbook', color: '#10b981', desc: 'Documento com procedimentos passo-a-passo para resolver incidentes comuns.' },
    { term: 'SRE', color: '#8b5cf6', desc: 'Site Reliability Engineering — Disciplina que aplica engenharia de software a operações.' },
    { term: 'Error Budget', color: '#8b5cf6', desc: 'Orçamento de erro — Quanto de indisponibilidade é aceitável (100% - SLO).' },
    { term: 'APM', color: '#06b6d4', desc: 'Application Performance Monitoring — Monitoramento de performance de aplicações.' },
    { term: 'IaC', color: '#06b6d4', desc: 'Infrastructure as Code — Gerenciar infraestrutura através de código e versionamento.' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] via-[#100a0a] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-black mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
          >
            <span className="text-[#e50914]">Glossário</span> <span className="text-white">Essencial</span>
          </h2>
          <p className="text-gray-400">Termos que todo profissional de monitoramento deve conhecer</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {terms.map(t => (
            <div key={t.term} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
              <h4 className="font-bold mb-1" style={{ color: t.color }}>{t.term}</h4>
              <p className="text-xs text-gray-400">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="text-[#0057B8] text-4xl font-black tracking-tighter"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
        >
          NOC <span className="text-white">Flow</span>
        </span>
        <p className="text-gray-500 mt-4 text-sm max-w-xl mx-auto">
          Seu guia completo para monitoramento e observabilidade. Feito com 💜 para a comunidade: de tecnologia brasileira.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
          {['Início', 'Conceitos', 'NOC', 'Requisitos', 'Ferramentas', 'Cursos', 'Roadmap'].map(l => (
            <a key={l} href={`#${l === 'Início' ? 'inicio' : l === 'NOC' ? 'noc' : l.toLowerCase()}`} className="hover:text-[#e50914] transition-colors">
              {l}
            </a>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-gray-600 text-xs">© 2026 NOC Flow. Todos os direitos reservados. Projeto educacional open source.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Search Overlay ─── */
function SearchOverlay({ open, onClose, tools, courses }: { open: boolean; onClose: () => void; tools: Tool[]; courses: Course[] }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery('');
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const q = query.toLowerCase().trim();
  const filteredTools = q ? tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q) ||
    (t.tags && t.tags.toLowerCase().includes(q))
  ) : [];
  const filteredCourses = q ? courses.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.source.toLowerCase().includes(q)
  ) : [];
  const hasResults = filteredTools.length > 0 || filteredCourses.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="bg-[#1a1a1a] rounded-2xl w-full max-w-2xl border border-white/10 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search className="text-gray-400" size={20} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar ferramentas, cursos, categorias..."
                className="flex-1 bg-transparent text-white text-lg outline-none placeholder-gray-500"
              />
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-sm border border-white/10 rounded px-2 py-0.5">ESC</button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {q && !hasResults && (
                <p className="text-gray-500 text-center py-8">Nenhum resultado para "{query}"</p>
              )}
              {filteredTools.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Wrench size={14} /> Ferramentas ({filteredTools.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredTools.map(t => (
                      <a
                        key={t.id}
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                          style={{ backgroundColor: t.icon_color + '33', color: t.icon_color }}>
                          {t.icon_letter}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium group-hover:text-amber-400 transition-colors">{t.name}</div>
                          <div className="text-xs text-gray-500 truncate">{t.description}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {filteredCourses.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <GraduationCap size={14} /> Cursos ({filteredCourses.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredCourses.map(c => (
                      <a
                        key={c.id}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <span className="text-2xl">{c.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium group-hover:text-cyan-400 transition-colors">{c.name}</div>
                          <div className="text-xs text-gray-500 truncate">{c.description}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${c.course_type === 'FREE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                          {c.course_type}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!q && (
              <div className="p-6 text-center text-gray-500 text-sm">
                Digite para buscar entre ferramentas e cursos
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Live Visitors Widget ─── */
interface Visitor {
  id: number;
  session_id: string;
  city: string;
  region: string;
  country: string;
  last_seen: string;
}

function LiveVisitorsWidget() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [myLocation, setMyLocation] = useState('');

  const heartbeat = useCallback(async () => {
    try {
      let sid = sessionStorage.getItem('nocflow_sid');
      if (!sid) {
        sid = 'sid_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem('nocflow_sid', sid);
      }
      await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sid }),
      });
    } catch {}
  }, []);

  const fetchVisitors = useCallback(async () => {
    try {
      const res = await fetch('/api/visitors');
      const data = await res.json();
      setVisitors(data);
      const mySid = sessionStorage.getItem('nocflow_sid');
      const me = data.find((v: Visitor) => v.session_id === mySid);
      if (me) {
        const parts = [me.city, me.region, me.country].filter(Boolean);
        setMyLocation(parts.join(', '));
      }
    } catch {}
  }, []);

  useEffect(() => {
    heartbeat();
    fetchVisitors();
    const hbInterval = setInterval(heartbeat, 30000);
    const fetchInterval = setInterval(fetchVisitors, 15000);
    return () => {
      clearInterval(hbInterval);
      clearInterval(fetchInterval);
    };
  }, [heartbeat, fetchVisitors]);

  const count = visitors.length;
  // Group by country
  const byCountry = visitors.reduce<Record<string, number>>((acc, v) => {
    const c = v.country || 'Desconhecido';
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 bg-[#1a1a1a]/95 backdrop-blur-xl rounded-xl border border-white/10 w-72 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold">Visitantes Online</span>
              </div>
              <span className="text-emerald-400 font-bold text-lg">{count}</span>
            </div>

            {myLocation && (
              <div className="px-4 py-2 bg-emerald-500/5 border-b border-white/5 flex items-center gap-2 text-xs">
                <MapPin size={12} className="text-emerald-400" />
                <span className="text-emerald-300">Você: {myLocation}</span>
              </div>
            )}

            <div className="px-4 py-3 max-h-48 overflow-y-auto">
              <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Por País</h5>
              {Object.entries(byCountry).sort((a, b) => b[1] - a[1]).map(([country, num]) => (
                <div key={country} className="flex items-center justify-between py-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Globe size={12} className="text-gray-500" />
                    <span className="text-gray-300">{country}</span>
                  </div>
                  <span className="text-gray-500 text-xs font-medium">{num}</span>
                </div>
              ))}
              {Object.keys(byCountry).length === 0 && (
                <p className="text-gray-600 text-xs">Carregando...</p>
              )}
            </div>

            <div className="px-4 py-2 border-t border-white/5">
              <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Últimas Conexões</h5>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {visitors.slice(0, 8).map(v => (
                  <div key={v.session_id} className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                    <span>{[v.city, v.region, v.country].filter(Boolean).join(', ') || 'Desconhecido'}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2.5 flex items-center gap-2 hover:border-emerald-500/30 transition-all group shadow-lg"
      >
        <div className="relative">
          <Users size={18} className="text-emerald-400" />
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
        </div>
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {count} online
        </span>
      </button>
    </div>
  );
}

export default function App() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toolsRes, coursesRes] = await Promise.all([
          fetch('/api/tools'),
          fetch('/api/courses'),
        ]);
        const toolsData = await toolsRes.json();
        const coursesData = await coursesRes.json();
        setTools(toolsData);
        setCourses(coursesData);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Ctrl+K shortcut for search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'conceitos', 'noc', 'requisitos', 'ferramentas', 'cursos', 'roadmap'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar activeSection={activeSection} onSearch={() => setSearchOpen(true)} />
      <HeroSection />
      <ConceitosSection />
      <NOCSection />
      <RequisitosSection />
      <FerramentasSection tools={tools} />
      <CursosSection courses={courses} />
      <RoadmapSection />
      <PopularidadeSection />
      <GlossarioSection />
      <Footer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} tools={tools} courses={courses} />
      <LiveVisitorsWidget />
    </div>
  );
}
