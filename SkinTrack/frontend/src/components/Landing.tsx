import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Quiz Inteligente',
    description: 'Entenda seu perfil de pele e receba recomendações adaptadas em minutos.'
  },
  {
    title: 'Rotina Personalizada',
    description: 'Manhã e noite organizadas em passos claros para facilitar sua consistência.'
  },
  {
    title: 'Atualização Rápida',
    description: 'Re-gere sua rotina sempre que sua pele ou objetivo mudarem.'
  }
];

const Landing = () => {
  return (
    <main className="min-h-screen bg-zinc-950">
      <section className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-20">
        <div className="space-y-5 text-center">
          <p className="text-sm uppercase tracking-widest text-accent">SkinTrack</p>
          <h1 className="text-4xl font-semibold text-zinc-100 md:text-6xl">SkinTrack - Sua rotina perfeita</h1>
          <p className="mx-auto max-w-2xl text-zinc-400">
            Descubra uma rotina de skincare personalizada com base no seu tipo de pele, idade e principais preocupações.
          </p>
          <Link
            to="/signup"
            className="inline-flex rounded-lg bg-accent px-6 py-3 font-medium text-white transition hover:bg-violet-500"
          >
            Faça Quiz Gratuito
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-lg font-semibold text-zinc-100">{service.title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Landing;
