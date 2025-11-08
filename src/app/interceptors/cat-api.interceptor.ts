import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

export const catApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.catApiBase)) {
    req = req.clone({ setHeaders: { 'x-api-key': environment.catApiKey } });
  }
  return next(req);
};