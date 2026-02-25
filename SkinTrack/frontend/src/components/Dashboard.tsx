import { useState } from 'react';
import { regenerateRoutine } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, setSession, token, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user || !token) return null;

  const morning = user.routine.find((item) => item.momento === 'manhã');
  const night = user.routine.find((item) => item.momento === 'noite');

  const handleRegenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const updatedUser = await regenerateRoutine(user.skinProfile);
      setSession(token, updatedUser);
    } catch (apiError: any) {
      setError(apiError?.response?.data?.message || 'Não foi possível atualizar a rotina.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold text-zinc-100">Olá {user.name}!</h1>
          <button onClick={logout} className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200">
            Logout
          </button>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Seu perfil</p>
          <p className="mt-2 text-zinc-200">
            Pele {user.skinProfile.skinType} · {user.skinProfile.age} anos · Rotina {user.skinProfile.routinePreference}
          </p>
          <p className="mt-1 text-sm text-zinc-400">Focos: {user.skinProfile.concerns.join(', ')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold text-zinc-100">Rotina da manhã</h2>
            {!morning ? (
              <p className="mt-4 text-sm text-zinc-500">Sem passos para este período.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {morning.produtos.map((product) => (
                  <li key={product} className="rounded-lg border border-zinc-800 p-3 text-sm text-zinc-300">
                    {product}
                  </li>
                ))}
              </ul>
            )}
          </article>

          <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold text-zinc-100">Rotina da noite</h2>
            {!night ? (
              <p className="mt-4 text-sm text-zinc-500">Sem passos para este período.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {night.produtos.map((product) => (
                  <li key={product} className="rounded-lg border border-zinc-800 p-3 text-sm text-zinc-300">
                    {product}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRegenerate}
            disabled={loading}
            className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {loading ? 'Re-gerando...' : 'Re-gerar rotina'}
          </button>
          {error && <span className="text-sm text-rose-400">{error}</span>}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
