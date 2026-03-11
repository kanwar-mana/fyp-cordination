# Veyatia Python Backend — Full Architecture Audit Report

> **Deployment Platform:** Render.com (PaaS) — **Docker is NOT used**

**Prepared by:** Senior Backend Engineer (Code Auditor)
**Date:** March 2026
**Project:** `veyatia-python-1117-v1`
**Scope:** Complete file-by-file production-readiness audit

---

## How to Read This Report

| Symbol | Meaning |
|--------|---------|
| ✅ | Keep as-is, production-ready |
| ⚠️ | Keep but needs improvement |
| 🔴 | Must fix before deployment |
| 🗑️ | Remove entirely (do not deploy) |

**Severity Levels:**
- **CRITICAL** — Can crash the app, expose data, or cause security breach
- **HIGH** — Degrades correctness, reliability, or security significantly
- **MEDIUM** — Technical debt affecting maintainability or performance
- **LOW** — Minor inconsistency or style issue

---

# SECTION 1 — Root Level Files

## [.env](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env) 🔴 CRITICAL SECURITY ISSUE

| | |
|---|---|
| **Purpose** | Stores all environment variables (API keys, DB passwords, secrets) for local development |
| **Remove from server?** | 🔴 **YES — DELETE FROM GIT HISTORY IMMEDIATELY** |
| **Remove from Git?** | 🔴 **YES — MUST BE PURGED FROM ALL COMMIT HISTORY** |

**Issues Found:**
| Severity | Issue |
|----------|-------|
| CRITICAL | Live `TELNYX_API_KEY` committed — anyone can make calls billed to your account |
| CRITICAL | Live `OPENAI_API_KEY` committed — anyone can run GPT-4o queries at your expense |
| CRITICAL | Live `ELEVENLABS_API_KEY` committed — anyone can use TTS at your expense |
| CRITICAL | Live `DEEPGRAM_API_KEY` committed — anyone can use ASR at your expense |
| CRITICAL | `SUPABASE_DB_URL` with plaintext password — direct database access exposed |
| CRITICAL | `SUPABASE_SERVICE_ROLE_KEY` — bypasses all Supabase Row Level Security |
| CRITICAL | `ADMIN_BEARER_TOKEN` — grants full admin API access |
| CRITICAL | `FRONTEND_WS_JWT_SECRET` — allows forging WebSocket authentication tokens |

**How This Harms the Backend:** Any person who accesses the Git repository (or was ever given a copy of the code) has full credentials to: make unlimited phone calls at your cost, read/delete all patient/student data in the database, generate unlimited AI translations and voice audio, and impersonate any user or admin.

**Fix:**
1. **Immediately revoke and regenerate** all 8 keys listed above at each provider dashboard
2. Add [.env](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env) to [.gitignore](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.gitignore)
3. Run `git filter-branch` or BFG Repo Cleaner to purge [.env](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env) from all commit history
4. Create `.env.example` with placeholder values only

---

## [.env.bak](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env.bak) 🗑️

| | |
|---|---|
| **Purpose** | Accidental backup copy of [.env](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env) |
| **Remove?** | 🔴 Delete from disk and Git history — contains identical live secrets |

---

## [.gitignore](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.gitignore) ⚠️

| | |
|---|---|
| **Purpose** | Tells Git which files/folders to never track |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue |
|----------|-------|
| CRITICAL | [.env](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env) is NOT listed — allows secrets to be committed (this is why [.env](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env) was committed) |
| HIGH | `venv/` is NOT listed — virtual environment can be accidentally committed |
| MEDIUM | `*.wav`, `*.ulaw`, `*.b64` not listed — large binary test files can pollute the repo |
| MEDIUM | [test_results.log](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_results.log) not listed — local test logs committed |

**Fix:** Add: [.env](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env), [.env.bak](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env.bak), `venv/`, `*.wav`, `*.ulaw`, `*.b64`, [test_results.log](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_results.log), [dependency_version_report.json](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/dependency_version_report.json), `htmlcov/`, `.coverage`

---

## [.dockerignore](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.dockerignore) 🗑️ NOT NEEDED

| | |
|---|---|
| **Purpose** | Tells Docker which files to exclude from image builds |
| **Remove?** | 🔴 **Yes — not applicable since client is not using Docker** |

---

## [Dockerfile](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/Dockerfile) 🗑️ NOT NEEDED

| | |
|---|---|
| **Purpose** | Defines a Docker container build for the application |
| **Remove?** | 🔴 **Yes — client is not using Docker for deployment** |
| **Remove from Git?** | ⚠️ Can archive, but serves no active purpose |

**Note:** The app is deployed directly on Render.com (or a similar PaaS) using [requirements.txt](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/requirements.txt) and [start_server.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/start_server.sh). Docker is not part of the deployment pipeline.

---

## [docker-compose.yml](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/docker-compose.yml) 🗑️ NOT NEEDED

| | |
|---|---|
| **Purpose** | Spins up the API + Redis together for local Docker-based development |
| **Remove?** | 🔴 **Yes — not used since client is not using Docker** |

**Note:** Local development uses [start_server.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/start_server.sh) with a system Redis instead.

---

## [requirements.txt](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/requirements.txt) ⚠️

| | |
|---|---|
| **Purpose** | Lists all Python package dependencies with version pins |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue |
|----------|-------|
| HIGH | `pytest` and `pytest-asyncio` are in production deps — test frameworks installed on production server (unnecessary, wastes space, adds risk) |
| MEDIUM | [markdown](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/docs_routes.py#175-280) library missing — needed by [docs_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/docs_routes.py) for the `/docs/guide` page |
| LOW | `urllib3<2.0.0` pin may conflict with newer `httpx` |

**Fix:** Create `requirements-dev.txt` for pytest, move test deps there. Add `markdown>=3.5.0` to [requirements.txt](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/requirements.txt).

---

## [alembic.ini](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/alembic.ini) ✅

| | |
|---|---|
| **Purpose** | Configuration file for Alembic database migration tool |
| **Remove?** | ❌ Keep |
| **Issues** | None — standard clean configuration. DB URL is set dynamically at runtime, not hardcoded here. |

---

## [Makefile](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/Makefile) ✅

| | |
|---|---|
| **Purpose** | Developer task runner — lint, tests, security checks, staging smoke tests, production deploy |
| **Remove?** | ❌ Keep |
| **Issues** | None — excellent professional tooling. `make t0` runs lint + typecheck + unit tests in one command. |

---

## [pytest.ini](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/pytest.ini) ✅

| | |
|---|---|
| **Purpose** | Pytest configuration — test discovery paths, async mode, warning filters, markers |
| **Remove?** | ❌ Keep |
| **Issues** | None — clean configuration. |

---

## [README.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/README.md) ✅ Keep | [PUBLIC_API.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/PUBLIC_API.md) ✅ Keep

Both are documentation files. [PUBLIC_API.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/PUBLIC_API.md) is the frontend integration contract — important to keep.

---

## [start_server.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/start_server.sh) ✅

| | |
|---|---|
| **Purpose** | Local development server startup script — activates venv, checks Redis, starts uvicorn |
| **Remove?** | ❌ Keep in Git. Not deployed to server (Render/Docker handles startup). |
| **Issues** | Uses no `--workers` flag — fine for local dev only. |

---

## [remove_statement_timeout.sql](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/remove_statement_timeout.sql) ✅ Keep — Ops SQL script for database configuration.

---

## [run_all_tests.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/run_all_tests.sh) ✅ Keep — CI test runner.

---

## [sample.wav](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/sample.wav) / [sample.ulaw](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/sample.ulaw) / [sample.b64](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/sample.b64) 🗑️

| | |
|---|---|
| **Purpose** | Audio test files used in development for streaming tests |
| **Remove from server?** | 🔴 Yes — 650 KB of binary files with no runtime value |
| **Remove from Git?** | ⚠️ Keep in Git for developer reference |

---

## [test_results.log](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_results.log) 🗑️ Delete — local test output, 27 KB of internal error details.

## [dependency_version_report.json](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/dependency_version_report.json) 🗑️ Remove from server — generated report, no runtime value.

## [current-versions-20260101.txt](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/current-versions-20260101.txt) 🗑️ Remove from server — generated snapshot file.

## [.DS_Store](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.DS_Store) 🗑️ Delete — macOS system file, should never be in any repository.

---

## Root-Level Test Scripts (15 files) 🗑️

[test_admin_endpoints.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_admin_endpoints.sh), [test_all_scenarios.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_all_scenarios.sh), [test_api_endpoints.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_api_endpoints.sh), `test_bilingual_bridge_*.sh`, `test_budget_*.py`, [test_call_with_profile.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_call_with_profile.sh), [test_commands.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_commands.sh), [test_fixes.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_fixes.sh), `test_telnyx_sdk_*.sh`, [test_voicemail_curl.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_voicemail_curl.sh), [validate_test_scripts.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/validate_test_scripts.sh), [verify_refactoring.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/verify_refactoring.sh), [verify_summary_quick.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/verify_summary_quick.sh), [verify_webhook_setup.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/verify_webhook_setup.py)

| | |
|---|---|
| **Purpose** | Manual developer test scripts — should live in `scripts/` not root |
| **Remove from server?** | 🔴 Yes |
| **Remove from Git?** | Move to `scripts/` folder |

---

## ~250 Root-Level Markdown Files 🗑️

All files matching: `BRIDGE_*.md`, `LOG_ANALYSIS_*.md`, `PHASE*.md`, `IMPLEMENTATION_*.md`, `INVESTIGATION_*.md`, `TEST_*.md`, `BATCH*.md`, `BACKEND_*.md`, etc.

| | |
|---|---|
| **Purpose** | Developer journal — planning docs, bug analyses, test logs, incident reports created during development |
| **Remove from server?** | 🔴 Yes — zero runtime value |
| **Security risk?** | Yes — [SECURITY_NOTES.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/SECURITY_NOTES.md), [AUDIT_REPORT.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/AUDIT_REPORT.md), [ROOT_CAUSE_ANALYSIS.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/ROOT_CAUSE_ANALYSIS.md) describe internal vulnerabilities |
| **Remove from Git?** | Move to `_archive/` folder |

**Notable security-sensitive files to archive privately:** [SECURITY_NOTES.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/SECURITY_NOTES.md), [AUDIT_REPORT.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/AUDIT_REPORT.md), [QUALITY_GAUNTLET.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/QUALITY_GAUNTLET.md), [SYSTEMATIC_REMEDIATION_PLAN.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/SYSTEMATIC_REMEDIATION_PLAN.md)

---

# SECTION 2 — `.github/`

## [.github/workflows/check-type-drift.yml](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.github/workflows/check-type-drift.yml) 🗑️

| | |
|---|---|
| **Purpose** | GitHub Actions workflow that checks if Python Pydantic models match TypeScript frontend types |
| **Remove?** | 🔴 Yes — frontend is a separate project. This workflow runs on every push, always fails or is irrelevant. |
| **Issues** | References [scripts/check_type_drift.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/check_type_drift.sh) which compares against a frontend that doesn't exist in this repo |

---

# SECTION 3 — `.pytest_cache/` and `.venv/`

## `.pytest_cache/` 🗑️
Auto-generated by pytest. Must be in [.gitignore](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.gitignore). No business value in Git or on server.

## `.venv/` 🗑️
Local Python virtual environment. Must NEVER be committed or deployed. Add to [.gitignore](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.gitignore). Production uses a fresh environment built from [requirements.txt](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/requirements.txt).

---

# SECTION 4 — `alembic/`

## [alembic/env.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/alembic/env.py) ✅

| | |
|---|---|
| **Purpose** | Alembic migration environment — configures the DB connection for running schema migrations |
| **Remove?** | ❌ Keep |
| **Issues** | None — solid configuration, reads DB URL from settings correctly |

## [alembic/script.py.mako](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/alembic/script.py.mako) ✅

| | |
|---|---|
| **Purpose** | Template for auto-generating new migration files |
| **Remove?** | ❌ Keep — standard Alembic template |

## [alembic/versions/001_initial_schema.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/alembic/versions/001_initial_schema.py) ✅

| | |
|---|---|
| **Purpose** | First database migration — creates all initial tables |
| **Remove?** | ❌ Keep — deleting migration files corrupts database version tracking |
| **Issues** | None found |

---

# SECTION 5 — [app/](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/task_tracking.py#44-62) (Top-Level Files)

## [app/__init__.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/__init__.py) ✅
Empty package marker. Standard Python. No issues.

## [app/dependencies.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/dependencies.py) ⚠️

| | |
|---|---|
| **Purpose** | FastAPI [get_tenant_id()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/dependencies.py#7-23) dependency — extracts tenant from request state for use in route handlers |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| HIGH | Silent fallback to default tenant when header missing | A request with no `X-Tenant-ID` silently processes under `00000000-...` instead of being rejected — could mix tenant data | Change fallback to raise `HTTP 400 Bad Request` in production |

## [app/main.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/main.py) 🔴

| | |
|---|---|
| **Purpose** | Application entry point — creates FastAPI app, registers all routers, adds middleware, defines root/health endpoints |
| **Remove?** | ❌ Keep (cannot remove — it IS the application) |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| CRITICAL | `debug_routes` and `lab_routes` registered with NO environment guard | Exposes raw call state and test console to anyone in production | Wrap in `if os.getenv("APP_ENV") not in {"prod","production"}:` |
| HIGH | Duplicate `/health` endpoint (also exists in [health_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/health_routes.py)) | Endpoint drift — the two health checks can report different statuses | Remove the one from [main.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/main.py), use only [health_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/health_routes.py) |
| MEDIUM | `reload=True` in `__main__` uvicorn block | If ever used directly in production, enables file-watcher overhead | Change to `reload=os.getenv("APP_ENV") not in {"prod","production"}` |
| LOW | `_app_instance = None` on line 31 is an orphaned variable never used | Confuses developers about where the real instance lives | Remove the line |

---

# SECTION 6 — `app/core/`

## [app/core/__init__.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/core/__init__.py) ✅
Docstring-only package marker. No issues.

## [app/core/config.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/core/config.py) ⚠️

| | |
|---|---|
| **Purpose** | Central [Settings](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/core/config.py#17-499) class — loads all 80+ environment variables with type validation and defaults |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| HIGH | `BUDGET_MAX_USD_PER_DAY` defined twice (line 131 = $10, line 253 = $5) | Budget limit is ambiguous — may use wrong value silently causing overspend | Remove duplicate; keep one definition |
| MEDIUM | [tts_voice_map()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/core/config.py#454-457) is a method but all other JSON parsers are `@property` | Callers must use [()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/database.py#643-651) for this one only — silent bugs if forgotten | Add `@property` decorator |
| MEDIUM | No startup validator warning when `ADMIN_BEARER_TOKEN` is `None` | Admin endpoints return 500 instead of giving clear startup warning | Add `model_validator` that logs warning if None in production |

## [app/core/lifespan.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/core/lifespan.py) ⚠️

| | |
|---|---|
| **Purpose** | Application startup/shutdown lifecycle — runs migrations, initializes DB pools, HTTP clients, warmup tasks, and scheduler |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| HIGH | Alembic migration uses SQLAlchemy (different driver from rest of app which uses psycopg) | If SQLAlchemy connection fails, app starts with an outdated schema — data corruption risk | Add explicit startup failure if migration check fails in production |
| MEDIUM | Migration failure is non-fatal (just logs warning and continues) | App runs with wrong schema — INSERT/SELECT failures at runtime | Change to `raise RuntimeError` in production environment |
| LOW | `create_task(translation_service.warm(...))` uses raw asyncio, not [create_safe_task()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/task_tracking.py#13-70) | Unhandled warmup exceptions log as untracked background warnings | Swap to [create_safe_task()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/task_tracking.py#13-70) |

## [app/core/middleware.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/core/middleware.py) ⚠️

| | |
|---|---|
| **Purpose** | Configures CORS, tenant resolution, and bot deny-list middleware |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | `allow_methods=["*"]` and `allow_headers=["*"]` — overly permissive CORS | Any origin can send any HTTP method/header — increases attack surface | Restrict to `["GET","POST","OPTIONS"]` and `["Content-Type","Authorization","X-Tenant-ID"]` |
| LOW | Bot deny pattern `".log"` could block URL paths containing [.log](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/test_results.log) | Very unlikely but a valid path like `/call-dialogue/log` would return 404 | Use anchored patterns or regex instead of substring match |

---

# SECTION 7 — `app/middleware/`

## [app/middleware/__init__.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/middleware/__init__.py) ✅
4-line package marker. No issues.

## [app/middleware/auth_middleware.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/middleware/auth_middleware.py) ✅

| | |
|---|---|
| **Purpose** | [require_admin()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/middleware/auth_middleware.py#11-72) FastAPI dependency — validates `Authorization: Bearer` token for admin routes |
| **Remove?** | ❌ Keep |
| **Issues** | None — correct security pattern: fails closed (500) if unconfigured, 401 if missing, 403 if wrong |

## [app/middleware/tenant_middleware.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/middleware/tenant_middleware.py) ⚠️

| | |
|---|---|
| **Purpose** | Resolves tenant from `X-Tenant-ID` or `X-Tenant-Slug` header on every request |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | Every request without a header calls `TenantService.get_default_tenant_id()` — a DB query | Health checks, webhooks, favicon — all trigger DB calls unnecessarily | Cache the default tenant UUID at startup |
| MEDIUM | No validation that `X-Tenant-ID` is a valid UUID format | Any string is accepted as tenant ID — invalid IDs cause DB query failures downstream | Add UUID format validation with a regex before accepting |

---

# SECTION 8 — `app/maintenance/`

## [app/maintenance/scheduler.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/maintenance/scheduler.py) ✅

| | |
|---|---|
| **Purpose** | APScheduler background job manager — runs daily TTS cleanup at 2am UTC |
| **Remove?** | ❌ Keep |
| **Issues** | None — clean implementation with enable/disable flag |

## [app/maintenance/tts_cleanup.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/maintenance/tts_cleanup.py) ✅

| | |
|---|---|
| **Purpose** | Deletes old TTS audio files from Supabase storage based on retention policy |
| **Remove?** | ❌ Keep |
| **Issues** | None — supports dry-run mode, retention days config, keeps recent files per call |

---

# SECTION 9 — `app/models/`

## [app/models/schemas.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/models/schemas.py) ✅

| | |
|---|---|
| **Purpose** | Core Pydantic models: [LegProfile](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/models/common.py#19-37), [CallSession](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/call_manager.py#10-20), [TenantConfig](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/admin_routes.py#43-58), `CallType` |
| **Remove?** | ❌ Keep |
| **Issues** | None — clean schema definitions |

---

# SECTION 10 — `app/repositories/` (11 files)

## [app/repositories/__init__.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/__init__.py) ✅
Package marker only.

## [app/repositories/call_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/call_repo.py) ⚠️

| | |
|---|---|
| **Purpose** | Stores and retrieves call records (start, status updates, metadata) |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| HIGH | Dynamic f-string used to build SQL `ORDER BY` clause from caller-provided field name | Potential SQL injection if unsanitized field name reaches this function | Validate field name against a whitelist of allowed column names |

## [app/repositories/contact_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/contact_repo.py) 🔴

| | |
|---|---|
| **Purpose** | Creates and retrieves contact + phone number records per tenant |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| CRITICAL | [get_or_create_by_phone](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/contact_service.py#16-45) does SELECT then INSERT without atomicity | Two concurrent calls for the same phone number both see "not found" and both INSERT — one fails with duplicate key error, crashing the call creation | Replace with single `INSERT ... ON CONFLICT DO NOTHING RETURNING *` |

## [app/repositories/language_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/language_repo.py) 🔴

| | |
|---|---|
| **Purpose** | Gets/sets the selected language for UI language preferences |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| CRITICAL | [set_language_selection](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/language_repo.py#10-60) runs UPDATE then SELECT as two separate queries | If the process crashes between the two queries, the DB is left in inconsistent state | Wrap both in a single database transaction |

## [app/repositories/transcription_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/transcription_repo.py) 🔴

| | |
|---|---|
| **Purpose** | Stores call transcripts and updates call metadata (JSONB column) |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| CRITICAL | [update_call_meta](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/transcription_repo.py#88-148) reads JSONB, merges in Python, then writes back — without row lock | Two concurrent metadata updates can overwrite each other (last write wins) — data loss | Use PostgreSQL `jsonb_set` or `||` operator with row-level lock |

## [app/repositories/call_pair_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/call_pair_repo.py) ⚠️

| | |
|---|---|
| **Purpose** | Manages two-leg bridge call pairs |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | [get_peer_call_id](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/call_pair_repo.py#131-152) makes 2 DB queries instead of 1 | Doubles DB round trips on every bridge event | Rewrite as a single query checking both `leg_a_call_id` and `leg_b_call_id` |

## [app/repositories/tenant_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/tenant_repo.py) ✅
Clean tenant lookup. No issues.

## [app/repositories/billing_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/billing_repo.py) ✅
Uses `ON CONFLICT DO UPDATE` for budget tracking — atomic and correct.

## [app/repositories/summary_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/summary_repo.py) ✅
Uses `ON CONFLICT DO UPDATE` for summaries — idempotent and correct.

## [app/repositories/tenant_config_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/tenant_config_repo.py) ✅
Clean upsert logic with proper conflict handling.

## [app/repositories/voicemail_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/voicemail_repo.py) ⚠️

| | |
|---|---|
| **Purpose** | Inserts and retrieves voicemail transcript records |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| LOW | [datetime](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/admin_routes.py#321-329) imported twice in the file | Dead import — minor code quality issue | Remove duplicate import |

---

# SECTION 11 — `app/routes/` (20 files)

## [app/routes/__init__.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/__init__.py) ✅ Empty package marker.

## [app/routes/lab_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/lab_routes.py) 🔴

| | |
|---|---|
| **Purpose** | Developer test console — HTML page that can trigger API calls directly from browser |
| **Remove?** | 🔴 **REMOVE from production or add auth immediately** |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| CRITICAL | No authentication — anyone who finds the URL can use the test console | Full access to call creation, bridge, and admin actions without any token | Either delete the file entirely OR guard with [require_admin](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/middleware/auth_middleware.py#11-72) dependency |

## [app/routes/debug_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/debug_routes.py) 🔴

| | |
|---|---|
| **Purpose** | Debug endpoints exposing raw session state, call metadata, and internal counters |
| **Remove?** | 🔴 **REMOVE from production routing** |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| CRITICAL | No authentication — exposes call_id, session data, tenant info to any caller | Information disclosure — attacker can enumerate all active calls and session state | Delete or guard behind [require_admin](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/middleware/auth_middleware.py#11-72) + env check |

## [app/routes/hc_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/hc_routes.py) ⚠️ *(Fixed)*

| | |
|---|---|
| **Purpose** | Healthcare WebSocket route — real-time transcript/translation streaming for clinical calls |
| **Remove?** | ❌ Keep |
| **Fixed issues** | Dead code with undefined variables removed (was present, would crash at runtime if reached) |

## [app/routes/webhook_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/webhook_routes.py) ⚠️ *(Fixed)*

| | |
|---|---|
| **Purpose** | Receives Telnyx events (call.answered, call.hangup, etc.) and routes them to handlers |
| **Remove?** | ❌ Keep |
| **Fixed issues** | `NameError` on `event_type` in `JSONDecodeError` handler — fixed |

**Remaining Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| HIGH | HMAC webhook signature verification is the fallback (Ed25519 is preferred) | If attacker knows HMAC key, they can forge webhooks | Ensure `REQUIRE_WEBHOOK_SIGNATURE=true` in production |

## [app/routes/call_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/call_routes.py) ⚠️ *(Partially Fixed)*

| | |
|---|---|
| **Purpose** | Main call creation endpoint `POST /call/` — the most critical route in the system |
| **Remove?** | ❌ Keep |
| **Fixed issues** | Removed duplicate `CallEscalateRequest/Response` model definitions |

**Remaining Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | File is 800+ lines — too large for a single route file | Hard to maintain, test, and review | Split into `call_create_routes.py`, `call_status_routes.py`, `call_control_routes.py` |

## [app/routes/status_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/status_routes.py) ⚠️ *(Fixed)*

| | |
|---|---|
| **Purpose** | `GET /status` — exposes metrics, SLO alerts, and system health details |
| **Remove?** | ❌ Keep |
| **Fixed issues** | Removed duplicate router definition and duplicate counter keys |

**Remaining Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| HIGH | `/status` endpoint exposes internal metrics (latency, error rates, call counts) with no authentication | Competitor or attacker can monitor your system load and find optimal attack windows | Add [require_admin](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/middleware/auth_middleware.py#11-72) dependency |

## [app/routes/voicemail_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/voicemail_routes.py) ✅ *(Fixed)*
Duplicate route registration removed. No remaining issues.

## [app/routes/docs_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/docs_routes.py) ✅ *(Fixed)*
[markdown](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/docs_routes.py#175-280) dependency issue resolved. No remaining issues.

## [app/routes/admin_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/admin_routes.py) ⚠️

| | |
|---|---|
| **Purpose** | Admin endpoints for listing calls, viewing summaries, managing pairs |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| HIGH | [list_calls](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/admin_routes.py#60-147) makes N+1 DB queries — 1 query per call to fetch metadata | On 100 active calls = 101 DB queries per admin page load — can overwhelm the DB | Rewrite with a single JOIN query |
| MEDIUM | HTML test page lacks CSRF protection | Cross-site request forgery possible if admin is logged in | Add CSRF token or restrict to non-browser API clients only |

## [app/routes/admin_cleanup_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/admin_cleanup_routes.py) ⚠️

| | |
|---|---|
| **Purpose** | Admin-triggered cleanup of old TTS files |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | Handler is synchronous — blocks the async event loop during cleanup | All other requests are frozen while cleanup runs | Add `async def` and use `await asyncio.to_thread()` for blocking operations |

## [app/routes/observer_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/observer_routes.py) ⚠️

| | |
|---|---|
| **Purpose** | WebSocket route for clinician/teacher observers watching live call transcripts |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | Uses `threading.Thread` for JSON parsing — unnecessary thread overhead in async code | Wastes thread pool resources for a trivial JSON parse | Remove thread wrapper, parse JSON directly with `try/except` |

## [app/routes/bridge_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/bridge_routes.py) ✅
Two-leg bridge API. Clean implementation.

## [app/routes/stream_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/stream_routes.py) ✅
WebSocket stream lifecycle. Clean implementation.

## [app/routes/health_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/health_routes.py) ✅
Detailed health checks for DB, Redis, Telnyx, translation. Clean.

## [app/routes/privacy_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/privacy_routes.py) ✅
HIPAA/FERPA compliance layer — consent recording, soft delete, purge. Clean.

## [app/routes/contact_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/contact_routes.py) ✅
Contact CRUD. Clean.

## [app/routes/preference_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/preference_routes.py) ✅
Language preference CRUD. Clean.

## [app/routes/edu_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/edu_routes.py) ✅ / [app/routes/cs_routes.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/cs_routes.py) ✅
Education and customer support WebSocket wrappers. Clean.

---

# SECTION 12 — `app/schemas/`

## [app/schemas/hc.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/schemas/hc.py) ⚠️

| | |
|---|---|
| **Purpose** | Defines all WebSocket/HTTP API request and response schemas for all industry verticals |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | `speaker` field typed as `Literal["provider", "patient"]` — healthcare terminology only | Education calls use `teacher`/`student`, CS uses `agent`/`customer` — type mismatch causes validation errors for other verticals | Change to [str](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/exceptions.py#33-37) or `Union[Literal[...], str]` |

## [app/schemas/observer_events.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/schemas/observer_events.py) ✅
7 well-typed observer event schemas. No issues.

---

# SECTION 13 — `app/services/` (Key Files)

## [app/services/database.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/database.py) ⚠️

| | |
|---|---|
| **Purpose** | DB connection pool manager using psycopg3 + psycopg_pool. Handles connection lifecycle, retries, TCP keepalives |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| HIGH | ~400 lines of old DDL migration strings still in file (never executed — but confuse developers) | Future developers may think these DDL strings run automatically and make conflicting changes | Remove all DDL string constants, keep only data-seeding logic |
| MEDIUM | Single reconnect retry with no backoff | A 5-second network blip will fail all retries immediately | Add 2-3 retries with exponential backoff |

## [app/services/call_manager.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/call_manager.py) 🔴

| | |
|---|---|
| **Purpose** | In-memory [CallManager](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/call_manager.py#25-189) — tracks active calls, manages streaming/frontend WebSocket locks |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| CRITICAL | Class is named [CallSession](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/call_manager.py#10-20) — same name as the unrelated dataclass in [sessions.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/runtime/sessions.py) | Developers will use the wrong class, causing silent logic errors | Rename to `CallRecord` |
| HIGH | Entirely in-memory — WebSocket locks don't survive to other pods | In multi-pod deployment, a webhook on Pod B can't see the call lock set by Pod A | Migrate socket locks to Redis |

## [app/services/privacy_service.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/privacy_service.py) 🔴

| | |
|---|---|
| **Purpose** | HIPAA/FERPA data lifecycle — consent recording, soft delete, hard purge |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| CRITICAL | [soft_delete()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/privacy_service.py#137-244) and [purge()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/privacy_service.py#245-354) run multiple DB statements without a transaction | If process crashes mid-delete, data is partially deleted — audit trail may be written but records not deleted | Wrap all statements in a single `BEGIN`/`COMMIT` transaction |

## [app/services/tenant_rate_limiter.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/tenant_rate_limiter.py) 🔴

| | |
|---|---|
| **Purpose** | Token-bucket rate limiter per tenant (healthcare: 0.5 RPS, education: 0.2 RPS, etc.) |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| CRITICAL | Entirely in-memory — each pod has its own limiter | In multi-pod deployment, rate limits are multiplied by pod count (3 pods = 3× the intended rate) | Replace with Redis-backed atomic counter using `INCR` + `EXPIRE` |

## [app/services/budget_router.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/budget_router.py) ⚠️

| | |
|---|---|
| **Purpose** | Enforces daily and per-call spending limits for AI services (translation, TTS) |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| HIGH | Budget limits are global — not per-tenant | One high-usage tenant can exhaust the daily budget for all other tenants | Move `BUDGET_MAX_USD_PER_DAY` into [tenant_configs](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/repositories/tenant_config_repo.py#90-120) table for per-tenant limits |

## [app/services/nuance_service.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/nuance_service.py) ⚠️

| | |
|---|---|
| **Purpose** | Uses OpenAI to detect idioms, cultural references, and generate teach-back prompts |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| HIGH | Uses synchronous OpenAI SDK wrapped in `asyncio.to_thread()` | Each nuance call occupies a thread-pool thread for 0.5–3 seconds — high call volume saturates thread pool | Migrate to async OpenAI client |

## [app/services/contact_service.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/contact_service.py) ✅
Auto-learn language preferences. Best-effort with proper guards. No issues.

## [app/services/tenant_config_service.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/tenant_config_service.py) ✅
Validates allowed context types and language pairs per tenant. Clean.

## [app/services/metrics.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/metrics.py) ✅
In-process metrics. Works for single-pod. No issues.

## [app/services/idempotency.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/idempotency.py) ✅
Uses Redis `SET NX` — atomic, no race conditions.

## [app/services/tts_cache.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/tts_cache.py) ✅
Redis-backed TTS cache with lock coalescing. Clean.

## [app/services/slo_alerts.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/slo_alerts.py) ⚠️

| | |
|---|---|
| **Purpose** | Evaluates metrics against SLO thresholds, exposes alerts on `/status` |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | No external alerting — SLO breaches only visible by polling `/status` | If no one is watching, SLO breaches go unnoticed indefinitely | Integrate with Slack/PagerDuty webhook for critical alerts |

---

# SECTION 14 — `app/utils/` (17 files)

## [app/utils/phone.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/phone.py) ⚠️

| | |
|---|---|
| **Purpose** | Normalizes phone numbers for consistent DB storage |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | Strips non-digits only — no E.164 validation or country code checking | Invalid phone numbers like `"abc123"` become `"123"` with no error — stored silently | Add `phonenumbers` library for proper E.164 validation |

## [app/utils/exceptions.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/exceptions.py) ✅
Professional exception hierarchy with `retryable` flags and `retry_after` support. No issues.

## [app/utils/ws_auth.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/ws_auth.py) ✅
JWT token generation and validation for WebSocket auth. Correct scope binding.

## [app/utils/logging_filters.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/logging_filters.py) ✅
PHI/PII redaction in log output. Best-effort, correctly scoped.

## [app/utils/logging_utils.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/logging_utils.py) ✅
Recursive sensitive-key redaction for structured logging. Clean.

## [app/utils/frontend_broadcast.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/frontend_broadcast.py) ⚠️

| | |
|---|---|
| **Purpose** | Sends transcript/translation/status events to the frontend WebSocket |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | Calls `nuance_service.analyze()` on every medium/high-risk transcript — adds 0.5–3s latency to event delivery | Transcript events arrive delayed to the frontend — poor real-time experience | Move nuance analysis to a separate background task |

## [app/utils/chunking.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/chunking.py) ⚠️

| | |
|---|---|
| **Purpose** | Splits text into TTS-sized chunks respecting sentence boundaries |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| LOW | Off-by-one bug in hard-wrap fallback (line 213) | Text may be cut mid-word in very rare edge cases | Fix index calculation in hard-wrap loop |

## [app/utils/dedupe.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/dedupe.py) ✅ / [app/utils/language.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/language.py) ✅ / [app/utils/streaming.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/streaming.py) ✅
All clean. Minor [language.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/language.py) note: two sets of supported languages could drift — unify into one.

## [app/utils/task_tracking.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/task_tracking.py) ✅
[create_safe_task()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/task_tracking.py#13-70) wrapper with error logging. Clean implementation.

## [app/utils/observer_broadcast.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/utils/observer_broadcast.py) ✅
Observer event emit with proper error isolation. Clean.

---

# SECTION 15 — `app/runtime/`

## [app/runtime/sessions.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/runtime/sessions.py) ⚠️

| | |
|---|---|
| **Purpose** | Full per-call in-memory session state (70+ fields, Redis serialization, task management) |
| **Remove?** | ❌ Keep |

**Issues:**
| Severity | Issue | Harm | Fix |
|----------|-------|------|-----|
| MEDIUM | [is_alive()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/runtime/sessions.py#489-495) (sync) reads local in-memory cache — bypasses Redis when `ENABLE_REDIS_SESSIONS=True` | Returns stale "alive" status for sessions migrated to Redis-only — wrong call state decisions | Fix [is_alive()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/runtime/sessions.py#489-495) to call [is_alive_async()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/runtime/sessions.py#497-503) or remove the sync version |
| MEDIUM | Settings-enabled check duplicated in 3 functions ([get_session](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/runtime/sessions.py#301-343), [create_session](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/runtime/sessions.py#345-417), [end_session](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/runtime/sessions.py#419-487)) | Code drift risk — if logic changes in one place not all three are updated | Extract into a shared `_redis_enabled()` helper |

---

# SECTION 16 — `docs/`

## `docs/` (all subdirectories) ✅ Keep on Server

| Folder | Purpose | Remove? |
|--------|---------|---------|
| `docs/api/` | API contracts (BRIDGE.md, CALLS.md, etc.) | ❌ Keep |
| `docs/compliance/` | HIPAA/FERPA policies, PHI vendor checklist | ❌ Keep (needed for compliance audits) |
| `docs/ops/` | Runbooks, deploy guides, SLO testing | ❌ Keep |
| `docs/testing/` | Test sequence docs | ❌ Keep |
| Root [.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/README.md) files in docs | WebSocket guides, observer pattern docs | ❌ Keep — app serves these via `/docs/guide` |

> ⚠️ The backend serves `docs/` files dynamically. **Do not delete this folder.**

---

# SECTION 17 — `examples/`

## `examples/` 🗑️ Remove from Server

| File | Purpose | Keep in Git? |
|------|---------|--------------|
| [basic_usage.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/examples/basic_usage.py) | Python API usage example | ✅ Git only |
| [webhook_simulator.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/examples/webhook_simulator.py) | Simulates Telnyx webhook payloads | ✅ Git only |
| [minimal-hc-client.ts](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/examples/minimal-hc-client.ts) | TypeScript WS client example | ✅ Git only |
| [minimal-hc-client-usage.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/examples/minimal-hc-client-usage.md) | TypeScript usage guide | ✅ Git only |
| [add_context_type_example.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/examples/add_context_type_example.py) | Context type example | ✅ Git only |

**Risk:** [webhook_simulator.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/examples/webhook_simulator.py) can trigger real call logic with fake events if run on the server.

---

# SECTION 18 — [frontend/](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/hc_routes.py#20-75)

## [frontend/](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/hc_routes.py#20-75) 🗑️ Delete Entirely

| | |
|---|---|
| **Purpose** | Leftover auto-generated TypeScript type stubs from frontend type-sync CI workflow |
| **Remove from server?** | 🔴 Yes |
| **Remove from Git?** | 🔴 Yes — frontend is a separate project. This folder has no purpose. |

---

# SECTION 19 — `manual/`

## `manual/` 🗑️ Remove from Server

| File | Purpose | Keep in Git? |
|------|---------|--------------|
| [manual_real_call.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/manual/manual_real_call.py) | Makes real Telnyx calls during dev | ✅ Git only |
| [manual_hc_stream.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/manual/manual_hc_stream.py) | Tests healthcare WebSocket locally | ✅ Git only |
| [manual_language_router.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/manual/manual_language_router.py) (38 KB) | Tests language router locally | ✅ Git only |
| All others | Developer test scripts | ✅ Git only |

**Risk:** Running these on a production server would make real calls charged to the Telnyx account.

---

# SECTION 20 — `scripts/`

| File | Keep on Server? | Purpose |
|------|----------------|---------|
| [prod_deploy.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/prod_deploy.sh) | ✅ Yes | Deployment automation |
| [pre_deploy_check.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/pre_deploy_check.sh) | ✅ Yes | Pre-launch validation |
| [quick_health_check.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/quick_health_check.sh) | ✅ Yes | Ops health checks |
| [smoke_test.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/smoke_test.sh) | ✅ Yes | Post-deploy validation |
| [purge_expired_data.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/purge_expired_data.py) | ✅ Yes | HIPAA data retention |
| [migrate_tenant_configs.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/migrate_tenant_configs.py) | ✅ Yes | DB migration helper |
| [check_env_alignment.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/check_env_alignment.py) | ✅ Yes | Config validation |
| [security_audit.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/security_audit.sh) | ✅ Yes | Security scanning |
| [data_invariants.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/data_invariants.py) | ✅ Yes | DB integrity checks |
| [staging_smoke.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/staging_smoke.py) | ✅ Yes | Staging test suite |
| [verify_render_env.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/verify_render_env.sh) | ✅ Yes | Render.com validation |
| [check_type_drift.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/check_type_drift.sh) | 🗑️ Remove | Frontend is separate |
| [run_stream_test.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/run_stream_test.py) | 🗑️ Remove | Dev streaming test |
| [security_gauntlet.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/security_gauntlet.py) | ⚠️ Git only | Security test tool |
| [find_api_veyatia_references.sh](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/scripts/find_api_veyatia_references.sh) | 🗑️ Remove | grep helper, no value |

---

# SECTION 21 — `security_reports/`

## [security_reports/security_summary_20260101_221334.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/security_reports/security_summary_20260101_221334.md) 🗑️

| | |
|---|---|
| **Purpose** | Dated security audit report describing known vulnerabilities |
| **Remove from server?** | 🔴 Yes — security reports must never be on the production server |
| **Remove from Git?** | Move to private internal documentation only |

**Risk:** If the file path is guessed, an attacker can read a full list of your known security weaknesses.

---

# SECTION 22 — `tests/`

## `tests/` (56 test files) 🗑️ Remove from Server

| | |
|---|---|
| **Purpose** | Full pytest test suite — unit tests, integration tests, and real-API tests |
| **Remove from server?** | 🔴 Yes — no runtime value |
| **Remove from Git?** | ❌ Keep — run in CI pipeline only |

**Risk Files:**
| File | Risk |
|------|------|
| [test_real_api_keys.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/tests/test_real_api_keys.py) | Calls real Telnyx/OpenAI APIs — costs money if run in production |
| [manual_phase0_verification.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/tests/manual_phase0_verification.py) | Makes real API calls against live endpoints |

---

# SECTION 23 — `venv/`

## `venv/` 🗑️ Delete Entirely

| | |
|---|---|
| **Purpose** | Local Python virtual environment |
| **Remove?** | 🔴 Delete from disk AND add to [.gitignore](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.gitignore) |
| **Issue** | This is your local Python installation — deploying it would break on any other machine |

Production environments (Render, Docker) build their own clean environment from [requirements.txt](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/requirements.txt) automatically.

---

# SECTION 24 — Budget Estimate

## Analysis Work (Completed)

| Task | Hours | Rate | Cost |
|------|-------|------|------|
| Initial codebase exploration & structure mapping | 3 hrs | $100/hr | $300 |
| Deep audit: repositories layer (11 files, race conditions, SQL injection) | 4 hrs | $100/hr | $400 |
| Deep audit: routes layer (20 files, security, bugs, duplicates) | 5 hrs | $100/hr | $500 |
| Deep audit: services layer (36 files) | 6 hrs | $100/hr | $600 |
| Deep audit: utils, schemas, runtime layers (20 files) | 3 hrs | $100/hr | $300 |
| Deep audit: core, middleware, main.py | 2 hrs | $100/hr | $200 |
| Deep audit: all non-app folders & root files | 3 hrs | $100/hr | $300 |
| Report writing & documentation | 4 hrs | $100/hr | $400 |
| **Total Analysis Cost** | **30 hrs** | | **$3,000** |

---

## Remediation Work (To Be Done)

### 🔴 Critical Fixes (Must do before launch)

| Fix | Est. Hours | Cost |
|-----|-----------|------|
| Rotate all API keys & remove [.env](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env) from Git history | 2 hrs | $200 |
| Guard `lab_routes` + `debug_routes` with auth/env check | 1 hr | $100 |
| Fix race condition in [contact_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/tests/test_contact_repo.py) | 2 hrs | $200 |
| Fix race condition in [transcription_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/tests/test_transcription_repo.py) (JSONB merge) | 2 hrs | $200 |
| Fix non-atomic language selection in [language_repo.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/tests/test_language_repo.py) | 1 hr | $100 |
| Wrap `privacy_service` soft_delete/purge in transactions | 2 hrs | $200 |
| Replace in-memory `tenant_rate_limiter` with Redis | 4 hrs | $400 |
| Rename [CallSession](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/call_manager.py#10-20) → `CallRecord` in [call_manager.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/call_manager.py) | 1 hr | $100 |
| Remove duplicate DDL strings from [database.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/services/database.py) | 1 hr | $100 |
| Fix duplicate `BUDGET_MAX_USD_PER_DAY` in [config.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/core/config.py) | 0.5 hr | $50 |
| **Critical Total** | **16.5 hrs** | **$1,650** |

### ⚠️ High Priority Fixes

| Fix | Est. Hours | Cost |
|-----|-----------|------|
| Add auth to `/status` metrics endpoint | 1 hr | $100 |
| Fix CORS to restrict methods/headers | 0.5 hr | $50 |
| Fix tenant middleware to validate UUID + cache default | 2 hrs | $200 |
| Fix N+1 query in `admin_routes.py list_calls` | 3 hrs | $300 |
| Move pytest deps to `requirements-dev.txt` | 0.5 hr | $50 |
| Add [markdown](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/docs_routes.py#175-280) to [requirements.txt](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/requirements.txt) | 0.5 hr | $50 |
| Fix [tts_voice_map()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/core/config.py#454-457) to be `@property` | 0.5 hr | $50 |
| Fix migration non-fatal error in [lifespan.py](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/core/lifespan.py) | 1 hr | $100 |
| Fix duplicate `/health` endpoints | 0.5 hr | $50 |
| **High Priority Total** | **9.5 hrs** | **$950** |

### ⚠️ Medium Priority Fixes

| Fix | Est. Hours | Cost |
|-----|-----------|------|
| Add `phonenumbers` lib for phone validation | 2 hrs | $200 |
| Move nuance analysis to background task | 3 hrs | $300 |
| Fix admin cleanup async handler | 1 hr | $100 |
| Fix observer route threading overhead | 1 hr | $100 |
| Add per-tenant budget limits | 4 hrs | $400 |
| Fix SLO alerts to use external notifications | 3 hrs | $300 |
| Fix [is_alive()](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/runtime/sessions.py#489-495) Redis stale cache issue | 1 hr | $100 |
| Clean up 250 root [.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/README.md) files | 1 hr | $100 |
| Add `phonenumbers` E.164 validation | 2 hrs | $200 |
| **Medium Priority Total** | **18 hrs** | **$1,800** |

### Repository Cleanup

| Task | Est. Hours | Cost |
|------|-----------|------|
| Update [.gitignore](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.gitignore) properly | 0.5 hr | $50 |
| Delete [frontend/](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/app/routes/hc_routes.py#20-75), `venv/` from repo | 0.5 hr | $50 |
| Move root test scripts to `scripts/` | 1 hr | $100 |
| Move 250 [.md](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/README.md) files to `_archive/` | 1 hr | $100 |
| **Cleanup Total** | **3 hrs** | **$300** |

---

## Grand Total Budget Summary

| Category | Hours | Cost |
|----------|-------|------|
| **Code Audit & Analysis (Done)** | 30 hrs | **$3,000** |
| **Critical Fixes** | 16.5 hrs | **$1,650** |
| **High Priority Fixes** | 9.5 hrs | **$950** |
| **Medium Priority Fixes** | 18 hrs | **$1,800** |
| **Cleanup & Housekeeping** | 3 hrs | **$300** |
| **TOTAL** | **77 hrs** | **$7,700** |

> **Note:** Rates above are at $100/hour for a senior Python backend engineer. Market rates range from $85–$150/hour. All estimates assume clean code handoffs with no unexpected dependencies.

---

## Deployment Readiness: NOT READY ❌

**Blockers before going live:**
1. 🔴 API keys in [.env](file:///d:/work/Fiverr%20Client/veyatia/veyatia-python-1117-v1/.env) — must be rotated NOW
2. 🔴 `lab_routes` and `debug_routes` — must be auth-gated
3. 🔴 3 race conditions in repositories — can cause data corruption
4. 🔴 Privacy purge has no transaction — partial deletes possible
5. 🔴 In-memory rate limiter breaks at scale

**Estimated time to production-ready:** 3–4 weeks of focused development.
