function startExperience(mood) {
  const moodEntity = document.getElementById('mood-object');
  const arContainer = document.getElementById('ar-container');
  moodEntity.setAttribute('visible', 'true');

  // Remove all previous content
  while (moodEntity.firstChild) {
    moodEntity.removeChild(moodEntity.firstChild);
  }

  // Apply CSS filter
  arContainer.className = 'filtered-' + mood;

  // Sky tint sphere
  const filterColor = getMoodColor(mood);
  const sky = document.createElement('a-sphere');
  sky.setAttribute('radius', '5');
  sky.setAttribute('color', filterColor);
  sky.setAttribute('opacity', '0.2');
  sky.setAttribute('side', 'back');
  moodEntity.appendChild(sky);

  // Central animated object
  const center = document.createElement('a-box');
  center.setAttribute('color', filterColor);
  center.setAttribute('position', '0 1 -1');
  center.setAttribute('depth', '0.3');
  center.setAttribute('height', '0.3');
  center.setAttribute('width', '0.3');
  center.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 6000');
  moodEntity.appendChild(center);

  // Floating particles
  const numParticles = 16;
  for (let i = 0; i < numParticles; i++) {
    const angle = (i / numParticles) * Math.PI * 2;
    const radius = 1.5 + Math.random() * 0.5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = 0.5 + Math.random();

    const particle = document.createElement('a-sphere');
    particle.setAttribute('radius', '0.1');
    particle.setAttribute('color', filterColor);
    particle.setAttribute('position', `${x} ${y} ${z}`);
    const floatDuration = 1500 + Math.random() * 1500;
    particle.setAttribute('animation', `property: position; dir: alternate; dur: ${floatDuration}; to: ${x} ${y + 0.3} ${z}; loop: true`);
    moodEntity.appendChild(particle);
  }

  document.getElementById('mood-select').style.display = 'none';
}

function getMoodColor(mood) {
  const moodColors = {
    calm: '#4FC3F7',
    angry: '#E53935',
    inspired: '#FFD600',
    numb: '#999999',
    grateful: '#FFB74D',
    peaceful: '#B39DDB',
    joyful: '#FFEE58',
    hopeful: '#81C784',
    curious: '#4DD0E1',
    loving: '#F06292',
    empowered: '#7986CB',
    playful: '#FF8A65'
  };
  return moodColors[mood] || '#FFFFFF';
}
