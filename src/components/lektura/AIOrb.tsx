import { motion } from "framer-motion";

export function AIOrb({ size = 120 }: { size?: number }) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-70"
        style={{
          background:
            "radial-gradient(circle, #B8A8FF 0%, #6C63FF 40%, transparent 70%)",
        }}
      />
      {/* Inner orb */}
      <motion.div
        className="absolute inset-[15%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #ffffff 0%, #B8A8FF 25%, #6C63FF 60%, #4D8DFF 100%)",
          boxShadow:
            "inset 0 0 30px rgba(255,255,255,0.4), 0 0 40px rgba(108,99,255,0.6)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {/* Highlight */}
      <div
        className="absolute rounded-full bg-white/80 blur-sm"
        style={{
          width: size * 0.18,
          height: size * 0.18,
          top: size * 0.22,
          left: size * 0.28,
        }}
      />
      {/* Orbit ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ borderTopColor: "rgba(184,168,255,0.7)" }}
      />
    </motion.div>
  );
}
