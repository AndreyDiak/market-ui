interface Func {
   (args: any[]): void;
}

export function debounce<F extends Func>(callback: F, ms: number) {
   let isCooldown = false;

   return function (...args: Parameters<F>) {
      if (isCooldown) return;

      callback(args);

      isCooldown = true;

      setTimeout(() => (isCooldown = false), ms);
   };
}

export function throttle<F extends Func>(callback: F, ms: number) {
   let timer: any = null;

   return function (...args: Parameters<F>) {
      if (timer) {
         return;
      }

      timer = setTimeout(() => {
         callback(args);

         clearTimeout(timer);
         timer = null;
      }, ms);
   };
}
