# Security Audit Notes

Last local check:

```bash
npm audit --omit=dev
npm audit
```

Findings:

- The root web package is now isolated from Expo, React Native and NativeWind. Vercel installs the web app only.
- The root production audit is reduced to two moderate advisories from `next` bundling `postcss <8.5.10`.
- `npm audit fix --force` is not acceptable here because npm proposes a breaking/incorrect Next.js path. Wait for an upstream Next.js patch or upgrade deliberately after testing.
- The Expo mobile shell lives in `apps/mobile` and typechecks independently.
- The mobile production audit currently reports four moderate advisories from Expo's Metro/PostCSS chain. Do not run `npm audit fix --force` because npm proposes a breaking Expo downgrade path.

Recommended next hardening step:

1. Keep the web and mobile dependency trees separate: Vercel should use the root package, Expo should use `apps/mobile`.
2. Upgrade Expo/RN only inside `apps/mobile` and verify with Expo's compatibility matrix.
3. Add Vercel Firewall rules for `/api/search` and `/api/track-click`.
4. Replace the in-memory rate limiter with Redis or Vercel Runtime Cache.
5. Add Supabase admin-role checks before enabling admin mutations.
