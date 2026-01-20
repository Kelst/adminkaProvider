# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Development (with hot reload)
yarn dev

# Production build
yarn build

# Run production server
yarn serve

# Generate TypeScript types from Payload config
yarn generate:types

# Generate GraphQL schema
yarn generate:graphQLSchema

# Docker development
docker-compose up
```

Development server runs on port 5300. Admin panel at `/admin`.

## Architecture Overview

This is a **PayloadCMS-based admin panel** for managing multiple ISP (Internet Service Provider) cabinets. It serves as a headless CMS backend for providers: Intelekt, Opensvit, Opticom, Veles.

### Multi-Tenant Provider System

All content collections use a `provider` field to filter data by ISP. This single CMS instance serves all providers through provider-specific queries.

Key configuration: `src/payload.config.ts` - defines collections, custom endpoints, and server settings.

### Collections (src/collections/)

**Content Management:**
- `News.ts`, `FAQ.ts` - Provider-specific content with public read access
- `PageConfig.ts` - Per-provider settings (logos, videos, feature flags, phone numbers)
- `Media.ts` - Images/videos/PDFs with auto-thumbnails (400x300, 768x1024)
- `BinaryFiles.ts` - APK/EXE app distributions with platform auto-detection

**Security & Logging:**
- `LoginLog.ts` - Comprehensive audit logs with IP tracking and login history array
- `LoginTracking.ts` - Successful login records
- `Passwords.ts` - Failed attempt tracking with lockout delays
- `TokenCollection.ts` - Auth tokens storage

**User Interactions:**
- `Feedback.ts` - User reviews (public create via API, read-only in admin)
- `TaskFromUser.ts` - Support requests
- `PaymentLogsCollection.ts` - Payment transaction logs (immutable)

### Custom REST Endpoints

Defined inline in `src/payload.config.ts`:
- `GET /api/payments-by-provider?provider=X` - Active payments for provider
- `GET /api/news-by-provider?provider=X` - News articles sorted by date
- `GET /api/get-image-page-url?type=X` - Provider logos, video URL, PDF contract, Telegram ID

### Role-Based Access

Roles: `admin`, `editor`, `user`, `guest`. Access control defined per-collection in `access` property using role checks like:
```typescript
access: {
  read: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor'
}
```

### Server Entry Point

`src/server.ts` - Express server with:
- CORS configured for all origins
- Security headers for cross-origin resource sharing
- Root `/` redirects to `/admin`

## Environment Variables

Required in `.env`:
- `DATABASE_URI` - MongoDB connection string
- `PAYLOAD_SECRET` - Encryption key for auth

Production URL configured as `https://cabinet-host.biz.ua` in payload.config.ts.
