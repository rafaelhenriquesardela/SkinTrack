const generateRoutine = ({ skinType, age, routinePreference, concerns }) => {
  if (skinType === 'oleosa' && age < 25 && routinePreference === 'completa') {
    return [
      {
        momento: 'manhã',
        produtos: ['Gel limpiador', 'Niacinamida 10%', 'Hidratante oil-free']
      },
      {
        momento: 'noite',
        produtos: ['Ácido salicílico 2%', 'Retinol 0.3%', 'Hidratante']
      }
    ];
  }

  if (skinType === 'seca' && routinePreference === 'minimalista') {
    return [
      {
        momento: 'manhã',
        produtos: ['Cleanser hidratante', 'Hidratante com ceramidas', 'Protetor solar FPS 50']
      },
      {
        momento: 'noite',
        produtos: ['Cleanser suave', 'Sérum de ácido hialurônico', 'Creme reparador']
      }
    ];
  }

  if (routinePreference === 'so-noite') {
    return [
      {
        momento: 'noite',
        produtos: concerns.includes('acne')
          ? ['Gel de limpeza', 'Ácido salicílico 2%', 'Hidratante leve']
          : ['Gel de limpeza', 'Niacinamida 5%', 'Hidratante calmante']
      }
    ];
  }

  return [
    {
      momento: 'manhã',
      produtos: ['Limpeza facial', 'Vitamina C', 'Hidratante', 'Protetor solar']
    },
    {
      momento: 'noite',
      produtos: concerns.includes('manchas')
        ? ['Limpeza facial', 'Ácido tranexâmico', 'Retinol 0.2%', 'Hidratante']
        : ['Limpeza facial', 'Niacinamida', 'Hidratante reparador']
    }
  ];
};

module.exports = {
  generateRoutine
};
