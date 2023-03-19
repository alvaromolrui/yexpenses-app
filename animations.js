export function modalEntranceKeyframes() {
  return [
    { transform: 'translateY(100px)', opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 }
  ];
}

export function modalExitKeyframes() {
  return [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: 'translateY(100px)', opacity: 0 }
  ];
}

export function backgroundModalEntranceKeyframes() {
  return [
    { opacity: 0 },
    { opacity: 1 }
  ];
}

export function backgroundModalExitKeyframes() {
  return [
    { opacity: 1 },
    { opacity: 0 }
  ];
}

export function itemEntranceKeyframes() {
  return [
    { height: '97px' },
    { height: '124px' }
  ];
}

export function itemExitKeyframes() {
  return [
    { height: '124px' },
    { height: '97px' }
  ];
}

export function addItemKeyframes() {
  return [
    { height: '0px', opacity: 0, padding: '0px' },
    { height: '124px', opacity: 1, padding: '20px' }
  ];
}

export function removeItemKeyframes() {
  return [
    { height: '124px', opacity: 1, padding: '20px' },
    { height: '0px', opacity: 0, padding: '0px' }
  ];
}

export function addItemButtonEntranceKeyframes() {
  return [
    { height: '93px', opacity: 1 },
    { height: '0px', opacity: 0 }
  ];
}

export function addItemButtonExitKeyframes() {
  return [
    { height: '0px', opacity: 0 },
    { height: '93px', opacity: 1 }
  ];
}

export function baseAnimationOptions() {
  return { 
    duration: 200, 
    easing: "cubic-bezier(0.2,0.5,0.3,1)", 
    iterations: 1, 
    fill: "forwards" 
  };
}