# CatBreeds — Ionic 8 + Angular 20 + Capacitor 7

App móvil que consume **The Cat API** para listar razas, buscarlas y ver su detalle, usando componentes nativos de **Ionic** (standalone) y **Angular Signals**.

## Demo
- **Android APK**: https://drive.google.com/file/d/19Jh4e0BmZ7ZPoASf4rNfpfVeOe2P2Z0z/view?usp=sharing


## Tech Stack
- **Ionic** 8 (standalone components)
- **Angular** 20 (standalone + signals)
- **Capacitor** 7 (Android/iOS)
- **HttpClient** + **interceptor** para `x-api-key`
- **SCSS** con convención **BEM**

## Características
- Lista paginada con **Infinite Scroll** y **buscador**
- Detalle con tarjetas de información de raza de gato
- **Componentes Ionic nativos** (Searchbar, Tabs, List, etc.)

## Requisitos
- Node 18+ / 20+
- npm 9+ / 10+
- Android Studio (para Android) / Xcode (para iOS)
- Cuenta de GitHub (repo público)

## Configuración
### Instalar Ionic si no está instalado:

```bash
npm i -g @ionic/cli
```

## Configuración del proyecto
```bash
git clone https://github.com/1Jessie9/catbreeds-angular-20.git
```
```bash
cd catbreeds-angular-20
```
```bash
npm i
```

---

## Configurar API key de The Cat API  
Cree/edite estos archivos:
*(Aquí ya no va bash, solo código TypeScript)*

### `src/environments/environment.ts`
```ts
export const environment = {
  production: false,
  catApiBase: "https://api.thecatapi.com/v1",
  catApiKey: "TU_API_KEY_AQUI"
};
```

### `src/environments/environment.ts`
```ts
export const environment = {
  production: true,
  catApiBase: "https://api.thecatapi.com/v1",
  catApiKey: "TU_API_KEY_AQUI"
};
```

## Ejecutar en modo desarrollo (web)
```bash
ionic serve
```

## Ejecutar en modo desarrollo (web)
```bash
ionic build
```

## Sincronizar con Capacitor
```bash
npx cap sync
```

## Ejecutar en Android
```bash
npx cap open android
```