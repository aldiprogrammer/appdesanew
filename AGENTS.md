# AGENTS.md — appdesanew

## Stack
- **Laravel 13** backend, **Inertia v2** glue, **React 18** frontend, **Vite 8** build
- **Tailwind 3** + **DaisyUI 4** — both loaded via CDN in `resources/views/app.blade.php` (NOT via Vite bundler, despite `tailwind.config.js` + `postcss.config.js` existing)
- **Pest 4** for PHP tests, **Laravel Pint** for PHP formatting, **ESLint 8** + **Prettier** for JS

## Key commands
| Command | What it does |
|---|---|
| `composer dev` | Concurrently runs `artisan serve`, `queue:listen`, `pail` (live logs), and `npm run dev` |
| `npm run dev` | Vite dev server (hot module replacement) |
| `npm run build` | Vite production build |
| `npm run lint` | ESLint on `resources/js` |
| `composer test` | `artisan config:clear` then `artisan test` (Pest) |
| `php artisan test --filter=TestName` | Single Pest test |

## Architecture
- **Two UX sections** — admin CRUD (`routes/web.php` lines 41-88) and public pages (lines 90-104)
- **Admin controllers** in `App\Http\Controllers\admin\` — all return `redirect()->back()->with('success', ...)` after mutations
- **Public controllers** in `App\Http\Controllers\app\`
- **Models** in `App\Models\` (11 models: Berita, Dusun, Gallery, Jabatan, Kepaladusun, KontakLayanan, Pegawai, Penduduk, ProfilDesa, Umkm, User)
- **Inertia pages** in `resources/js/Pages/Admin/` and `resources/js/Pages/App/`
- **Layouts**: `AdminLayout.jsx`, `AuthenticatedLayout.jsx`, `GuestLayout.jsx`

## Frontend quirks
- **JS alias**: `@/` → `resources/js/` (configured in `jsconfig.json`)
- **CDN-loaded deps** (not npm): jQuery, DataTables, Font Awesome 6, Leaflet CSS, SweetAlert2 — all declared in `resources/views/app.blade.php`
- **npm deps** for Leaflet (JS) and SweetAlert2 also exist in `package.json` — but the CDN versions are what render in the app
- `.npmrc` sets `ignore-scripts=true` — lifecycle scripts never run on `npm install`

## Testing (Pest)
- Feature tests use `RefreshDatabase` trait (configured in `tests/Pest.php`)
- Test DB: SQLite `:memory:` (set in `phpunit.xml`)
- Base test class: `Tests\TestCase`
- Tests live in `tests/Feature/` and `tests/Unit/`

## Database
- **Dev**: MySQL `db_desanew` (`.env` config)
- **Test**: SQLite `:memory:` (overridden in `phpunit.xml`)
- Session, cache, and queue all backed by database

## Route conventions
- Admin CRUD follows pattern: `GET /admin/{resource}` (index), `POST` (store), `PUT /admin/{resource}/{id}` (update), `DELETE /admin/{resource}/{id}` (delete)
- Public routes: `/desa` (home), `/berita`, `/berita/{id}`, `/struktur`, `/profildesa`
- Auth routes are scaffolded by Laravel Breeze in `routes/auth.php`

## PHP style notes
- Several controllers declare methods without visibility (`function index()` instead of `public function index()`)
- Admin controllers use `compact()` to pass vars to `Inertia::render()`
