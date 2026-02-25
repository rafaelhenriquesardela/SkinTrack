import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignupPayload, signup } from '../api/authApi';
import { Concern, RoutinePreference, SkinType } from '../types';
import { useAuth } from '../hooks/useAuth';

const skinTypeOptions: { label: string; value: SkinType }[] = [
  { label: 'Oleosa', value: 'oleosa' },
  { label: 'Seca', value: 'seca' },
  { label: 'Mista', value: 'mista' },
  { label: 'Normal', value: 'normal' }
];

const concernOptions: { label: string; value: Concern }[] = [
  { label: 'Acne', value: 'acne' },
  { label: 'Manchas', value: 'manchas' },
  { label: 'Hidratação', value: 'hidratacao' },
  { label: 'Ressecamento', value: 'ressecamento' }
];

const routineOptions: { label: string; value: RoutinePreference }[] = [
  { label: 'Completa (manhã/noite)', value: 'completa' },
  { label: 'Só noite', value: 'so-noite' },
  { label: 'Minimalista', value: 'minimalista' }
];

const SignupQuiz = () => {
  const [step, setStep] = useState(1);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm<SignupPayload>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      skinType: 'oleosa',
      age: 25,
      concerns: ['acne'],
      routinePreference: 'completa'
    }
  });

  const concerns = watch('concerns') || [];
  const progress = useMemo(() => (step / 3) * 100, [step]);

  const nextStep = async () => {
    const fields =
      step === 1
        ? (['name', 'email', 'password'] as const)
        : (['skinType', 'age', 'concerns'] as const);
    const isValid = await trigger(fields as any);
    if (isValid) setStep((value) => Math.min(3, value + 1));
  };

  const toggleConcern = (value: Concern) => {
    const exists = concerns.includes(value);
    const next = exists ? concerns.filter((item) => item !== value) : [...concerns, value];
    setValue('concerns', next, { shouldValidate: true });
  };

  const onSubmit = async (data: SignupPayload) => {
    setApiError('');
    try {
      const response = await signup(data);
      setSession(response.token, response.user);
      navigate('/dashboard');
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Erro ao criar conta.');
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-3xl font-semibold text-zinc-100">Cadastro + Quiz</h1>
        <p className="mt-2 text-sm text-zinc-400">Etapa {step} de 3</p>

        <div className="mt-4 h-2 w-full rounded-full bg-zinc-800">
          <div className="h-2 rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>

        {step === 1 && (
          <div className="mt-8 grid gap-4">
            <input
              {...register('name', { required: true, minLength: 2 })}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-accent"
              placeholder="Nome"
            />
            {errors.name && <p className="text-xs text-rose-400">Informe um nome válido.</p>}

            <input
              type="email"
              {...register('email', { required: true })}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-accent"
              placeholder="Email"
            />
            {errors.email && <p className="text-xs text-rose-400">Informe um email válido.</p>}

            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-accent"
              placeholder="Senha"
            />
            {errors.password && <p className="text-xs text-rose-400">Mínimo de 6 caracteres.</p>}
          </div>
        )}

        {step === 2 && (
          <div className="mt-8 grid gap-5">
            <div>
              <p className="mb-2 text-sm text-zinc-300">Tipo de pele</p>
              <div className="grid grid-cols-2 gap-2">
                {skinTypeOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => setValue('skinType', option.value, { shouldValidate: true })}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      watch('skinType') === option.value
                        ? 'border-accent bg-violet-500/20 text-violet-200'
                        : 'border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <input type="hidden" {...register('skinType', { required: true })} />
            </div>

            <div>
              <p className="mb-2 text-sm text-zinc-300">Idade</p>
              <input
                type="number"
                min={10}
                max={100}
                {...register('age', { required: true, min: 10, max: 100, valueAsNumber: true })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-accent"
              />
              {errors.age && <p className="text-xs text-rose-400">Informe uma idade entre 10 e 100.</p>}
            </div>

            <div>
              <p className="mb-2 text-sm text-zinc-300">Preocupações</p>
              <div className="grid grid-cols-2 gap-2">
                {concernOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleConcern(option.value)}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      concerns.includes(option.value)
                        ? 'border-accent bg-violet-500/20 text-violet-200'
                        : 'border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {concerns.length === 0 && <p className="mt-2 text-xs text-rose-400">Escolha pelo menos uma preocupação.</p>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-8 space-y-3">
            <p className="text-sm text-zinc-300">Escolha seu estilo de rotina</p>
            {routineOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setValue('routinePreference', option.value, { shouldValidate: true })}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm ${
                  watch('routinePreference') === option.value
                    ? 'border-accent bg-violet-500/20 text-violet-200'
                    : 'border-zinc-700 text-zinc-300'
                }`}
              >
                {option.label}
              </button>
            ))}
            <input type="hidden" {...register('routinePreference', { required: true })} />
          </div>
        )}

        {apiError && <p className="mt-4 text-sm text-rose-400">{apiError}</p>}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((value) => Math.max(1, value - 1))}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 disabled:opacity-40"
            disabled={step === 1 || isSubmitting}
          >
            Voltar
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={isSubmitting}
              className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              {isSubmitting ? 'Criando...' : 'Finalizar e gerar rotina'}
            </button>
          )}
        </div>
      </form>
    </main>
  );
};

export default SignupQuiz;
