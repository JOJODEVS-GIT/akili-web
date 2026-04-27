/**
 * Sparkline — Mini graph SVG inline pour les StatCards.
 * Responsive : prend la largeur du container parent via viewBox + preserveAspectRatio.
 */
import { motion } from 'framer-motion';

export function Sparkline({ data = [], color = 'currentColor', height = 32, className = '' }) {
  if (!data.length) return null;

  const width = 120; // logical viewBox width (responsive via CSS)
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const path = data
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const fillPath = `${path} L ${(data.length - 1) * stepX},${height} L 0,${height} Z`;

  const lastX = (data.length - 1) * stepX;
  const lastY = height - ((data[data.length - 1] - min) / range) * height;

  const safeId = `spark-${color.replace('#', '')}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`w-full max-w-[120px] h-[28px] overflow-visible ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id={safeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        d={fillPath}
        fill={`url(#${safeId})`}
      />

      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        cx={lastX}
        cy={lastY}
        r="3.5"
        fill={color}
      />
      <motion.circle
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
        cx={lastX}
        cy={lastY}
        r="3.5"
        fill={color}
      />
    </svg>
  );
}
