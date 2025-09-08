import { defineConfig } from 'vite';

export default defineConfig({
  // Desactiva la ofuscación de nombres de clases y funciones en el build final.
  // Esto es muy útil para la depuración y para evitar problemas con los modelos de TF.js.
  // Algunos modelos se basan en nombres de clases y funciones específicos, y la ofuscación
  // podría romper su funcionalidad.
  build: {
    minify: false,
  },
  
  // Opcional: Si el `build` con `minify: false` genera un archivo de salida demasiado grande,
  // puedes usar esta opción para dividir el código en fragmentos más pequeños.
  // Esto puede mejorar el tiempo de carga inicial de la aplicación.
  // Es una buena práctica para proyectos grandes.
  // build: {
  //  rollupOptions: {
  //    output: {
  //      manualChunks(id) {
  //        if (id.includes('node_modules')) {
  //          return id.toString().split('node_modules/')[1].split('/')[0].toString();
  //        }
  //      }
  //    }
  //  }
  // },

  // Opcional: Configuración del servidor de desarrollo.
  // Aquí puedes definir el puerto, si quieres abrir el navegador
  // automáticamente al iniciar, etc.
  server: {
    port: 3000,
    open: true,
  }
});