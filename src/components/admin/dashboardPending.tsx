import { Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function SummaryWidget() {
  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 bg-yellow-100 rounded-lg shadow-xl border border-blue-300">
      <Smile className="text-blue-600 w-10 h-10 mb-2" />

      <h2 className="text-lg font-semibold text-blue-700">Resumen de la Prueba</h2>

      {/* Animación sutil en el mensaje */}
      <motion.p
        className="text-2xl font-bold text-blue-500 mt-2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ¡Seguir creciendo! 🚀
      </motion.p>
    </div>
  );
}
