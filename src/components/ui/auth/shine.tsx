import { motion } from 'framer-motion';

export const Shine = ({startAngle=-10, endAngle}:{startAngle?:number, endAngle?:number}) => {
  return (
    <div className="absolute w-full h-full z-1 select-none">
      <motion.div
        animate={{ rotate: endAngle, opacity: 0.8 }}
        initial={{ rotate: startAngle, opacity: 0.4 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut'
        }}
        style={{
          transformOrigin: 'center'
        }}
      >
        <img
          src="/images/common/effects/shine/white-shine.png"
          className="opacity-60 mix-blend-multiply"
        ></img>
      </motion.div>
    </div>
  );
};
