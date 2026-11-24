type PhotoAdjustment = {
  zoom?: number;
  x?: number;
  y?: number;
};

function ajustarFoto(name: string, { zoom, x, y }: PhotoAdjustment = {}) {
  const selector = `.photo--${CSS.escape(name)}`;
  const photo = document.querySelector<HTMLElement>(selector);

  if (!photo) {
    console.warn('Foto não encontrada. Use o nome do arquivo sem .jpg.');
    return;
  }

  const settings = [
    { property: '--photo-zoom', value: zoom, unit: '' },
    { property: '--photo-x', value: x, unit: 'px' },
    { property: '--photo-y', value: y, unit: 'px' },
  ];
  if (settings.some(({ value }) => value !== undefined && !Number.isFinite(value)) ||
      (zoom !== undefined && zoom <= 0)) {
    console.warn('Use números para x e y e um zoom maior que zero.');
    return;
  }

  const suffix = window.matchMedia('(max-width: 1024px)').matches ? '-mobile' : '';
  for (const { property, value, unit } of settings) {
    if (value !== undefined) photo.style.setProperty(property + suffix, `${value}${unit}`);
  }

  const declarations = Array.from(photo.style)
    .filter(property => property.startsWith('--photo-'))
    .map(property => `  ${property}: ${photo.style.getPropertyValue(property)};`);
  if (declarations.length) {
    console.log(`${selector} {\n${declarations.join('\n')}\n}`);
  }
}

export function installPhotoPreview() {
  const previewWindow: Window & { ajustarFoto?: typeof ajustarFoto } = window;
  previewWindow.ajustarFoto = ajustarFoto;
  return () => {
    delete previewWindow.ajustarFoto;
  };
}
