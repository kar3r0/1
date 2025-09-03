import React, { useRef, useEffect } from 'react';

// Color palette for different categories of elements and tools
const ELEMENT_COLORS = {
  ALKALI_METAL: '#ff8c8c',        // Light Red
  ALKALINE_EARTH_METAL: '#ffdead', // Navajo White
  LANTHANIDE: '#ffbfff',          // Light Magenta
  ACTINIDE: '#ff99cc',            // Hot Pink
  TRANSITION_METAL: '#a0e0e0',    // Light Cyan
  POST_TRANSITION_METAL: '#cccccc', // Light Grey
  METALLOID: '#cccc99',           // Khaki
  REACTIVE_NONMETAL: '#a0ffa0',    // Light Green
  NOBLE_GAS: '#c0ffff',           // Light Blue
  BARBER: '#ffffff',              // White for high contrast
  UNKNOWN: '#f0f0f0',             // Default
};

// Mapping from element symbol to its category
const ELEMENT_CATEGORY_MAP: { [key: string]: keyof typeof ELEMENT_COLORS } = {
  // Reactive Nonmetals
  'H': 'REACTIVE_NONMETAL', 'C': 'REACTIVE_NONMETAL', 'N': 'REACTIVE_NONMETAL', 'O': 'REACTIVE_NONMETAL',
  'F': 'REACTIVE_NONMETAL', 'P': 'REACTIVE_NONMETAL', 'S': 'REACTIVE_NONMETAL', 'Cl': 'REACTIVE_NONMETAL',
  'Se': 'REACTIVE_NONMETAL', 'Br': 'REACTIVE_NONMETAL', 'I': 'REACTIVE_NONMETAL', 'At': 'REACTIVE_NONMETAL',
  // Alkali Metals
  'Li': 'ALKALI_METAL', 'Na': 'ALKALI_METAL', 'K': 'ALKALI_METAL', 'Rb': 'ALKALI_METAL', 'Cs': 'ALKALI_METAL', 'Fr': 'ALKALI_METAL',
  // Alkaline Earth Metals
  'Be': 'ALKALINE_EARTH_METAL', 'Mg': 'ALKALINE_EARTH_METAL', 'Ca': 'ALKALINE_EARTH_METAL',
  'Sr': 'ALKALINE_EARTH_METAL', 'Ba': 'ALKALINE_EARTH_METAL', 'Ra': 'ALKALINE_EARTH_METAL',
  // Lanthanides
  'La': 'LANTHANIDE', 'Ce': 'LANTHANIDE', 'Pr': 'LANTHANIDE', 'Nd': 'LANTHANIDE', 'Pm': 'LANTHANIDE', 'Sm': 'LANTHANIDE',
  'Eu': 'LANTHANIDE', 'Gd': 'LANTHANIDE', 'Tb': 'LANTHANIDE', 'Dy': 'LANTHANIDE', 'Ho': 'LANTHANIDE', 'Er': 'LANTHANIDE',
  'Tm': 'LANTHANIDE', 'Yb': 'LANTHANIDE', 'Lu': 'LANTHANIDE',
  // Actinides
  'Ac': 'ACTINIDE', 'Th': 'ACTINIDE', 'Pa': 'ACTINIDE', 'U': 'ACTINIDE', 'Np': 'ACTINIDE', 'Pu': 'ACTINIDE',
  'Am': 'ACTINIDE', 'Cm': 'ACTINIDE', 'Bk': 'ACTINIDE', 'Cf': 'ACTINIDE', 'Es': 'ACTINIDE', 'Fm': 'ACTINIDE',
  'Md': 'ACTINIDE', 'No': 'ACTINIDE', 'Lr': 'ACTINIDE',
  // Transition Metals
  'Sc': 'TRANSITION_METAL', 'Ti': 'TRANSITION_METAL', 'V': 'TRANSITION_METAL', 'Cr': 'TRANSITION_METAL',
  'Mn': 'TRANSITION_METAL', 'Fe': 'TRANSITION_METAL', 'Co': 'TRANSITION_METAL', 'Ni': 'TRANSITION_METAL',
  'Cu': 'TRANSITION_METAL', 'Zn': 'TRANSITION_METAL', 'Y': 'TRANSITION_METAL', 'Zr': 'TRANSITION_METAL',
  'Nb': 'TRANSITION_METAL', 'Mo': 'TRANSITION_METAL', 'Tc': 'TRANSITION_METAL', 'Ru': 'TRANSITION_METAL',
  'Rh': 'TRANSITION_METAL', 'Pd': 'TRANSITION_METAL', 'Ag': 'TRANSITION_METAL', 'Cd': 'TRANSITION_METAL',
  'Hf': 'TRANSITION_METAL', 'Ta': 'TRANSITION_METAL', 'W': 'TRANSITION_METAL', 'Re': 'TRANSITION_METAL',
  'Os': 'TRANSITION_METAL', 'Ir': 'TRANSITION_METAL', 'Pt': 'TRANSITION_METAL', 'Au': 'TRANSITION_METAL',
  'Hg': 'TRANSITION_METAL',
  // Post-Transition Metals
  'Al': 'POST_TRANSITION_METAL', 'Ga': 'POST_TRANSITION_METAL', 'In': 'POST_TRANSITION_METAL', 'Sn': 'POST_TRANSITION_METAL',
  'Tl': 'POST_TRANSITION_METAL', 'Pb': 'POST_TRANSITION_METAL', 'Bi': 'POST_TRANSITION_METAL', 'Po': 'POST_TRANSITION_METAL',
  // Metalloids
  'B': 'METALLOID', 'Si': 'METALLOID', 'Ge': 'METALLOID', 'As': 'METALLOID', 'Sb': 'METALLOID', 'Te': 'METALLOID',
  // Noble Gases
  'He': 'NOBLE_GAS', 'Ne': 'NOBLE_GAS', 'Ar': 'NOBLE_GAS', 'Kr': 'NOBLE_GAS', 'Xe': 'NOBLE_GAS', 'Rn': 'NOBLE_GAS',
};

const barberSymbols = ['💈', '✂️', '🪒'];
const chemicalElements = Object.keys(ELEMENT_CATEGORY_MAP);
const allSymbols = [...barberSymbols, ...chemicalElements];

// Define a type for our falling symbols
interface Droplet {
  x: number;
  y: number;
  symbol: string;
  color: string;
  speed: number;
  fontSize: number;
}

const getRandomSymbol = () => {
  const symbol = allSymbols[Math.floor(Math.random() * allSymbols.length)];
  let color = ELEMENT_COLORS.UNKNOWN;
  if (barberSymbols.includes(symbol)) {
    color = ELEMENT_COLORS.BARBER;
  } else {
    const category = ELEMENT_CATEGORY_MAP[symbol];
    if (category) {
      color = ELEMENT_COLORS[category];
    }
  }
  return { symbol, color };
};


export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let droplets: Droplet[] = [];

    const setup = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        const FONT_BASE_SIZE = 28; // Larger font size
        const FONT_SIZE_VARIATION = 12; // Variation in font size
        const MIN_SPEED = 0.32; // Increased by 60%
        const MAX_SPEED = 1.6;  // Increased by 60%

        const dropletCount = Math.floor((canvas.width / FONT_BASE_SIZE) * 0.8); // Fewer, larger symbols
        droplets = []; // Clear existing droplets on resize

        for (let i = 0; i < dropletCount; i++) {
          const { symbol, color } = getRandomSymbol();
          droplets.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height, // Start above the screen
            symbol: symbol,
            color: color,
            speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
            fontSize: FONT_BASE_SIZE + Math.random() * FONT_SIZE_VARIATION,
          });
        }
    };

    const draw = () => {
        // Reduced alpha for slightly longer trails, making the background more vivid
        ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const drop of droplets) {
            ctx.fillStyle = drop.color;
            ctx.font = `bold ${drop.fontSize}px monospace`;
            ctx.fillText(drop.symbol, drop.x, drop.y);
            
            // Move the droplet down
            drop.y += drop.speed;

            // Reset droplet when it goes off screen
            if (drop.y > canvas.height + drop.fontSize) {
                drop.y = 0 - drop.fontSize; // Reset to just above the screen
                drop.x = Math.random() * canvas.width; // New horizontal position
                
                // Get new random properties
                const { symbol, color } = getRandomSymbol();
                drop.symbol = symbol;
                drop.color = color;
            }
        }
        animationFrameId = window.requestAnimationFrame(draw);
    };

    const handleResize = () => {
        window.cancelAnimationFrame(animationFrameId);
        setup();
        draw();
    };

    setup();
    draw();
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Removed blur filter for a clearer look
  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};
