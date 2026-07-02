# Polskie Ślady Taszkent — Storytelling

A companion presentation app built to showcase [Polskie Ślady Taszkent](https://github.com/Ko2doo/polskie-slady-taszkent)
on a large-format 4K interactive display during a live public presentation at the
**Polish Cultural Center "Świetlica Polska"** in Tashkent (June 2026).

The event was covered by [Polonijna Agencja Informacyjna](https://pai.media.pl/pai_wiadomosci.php?id=44227) [facebook](https://www.facebook.com/100072381157661/posts/1055541836868512/),
a Polish diaspora press agency.

## What it does

Instead of just demoing the main app on a phone, this project turns the presentation itself into an
interactive exhibit: a scroll/step-driven storytelling layer built with GSAP walks the audience through
the app's story — from the original paper walking-tour guide to the idea of a GPS-based digital app — and
at the right moment hands off to a live, fully working instance of the app itself, embedded and interactive
on the big screen.

## How it's built

npm workspaces monorepo with two independent Svelte 5 apps:

- **`apps/demo-app`** — a lightweight instance of Polskie Ślady Taszkent (map, locales, data), built
  standalone and served inside the presentation
- **`apps/storytelling`** — the GSAP-driven narrative layer (i18next for multilingual delivery) that
  embeds `demo-app` via iframe and paces the story to match the live talk

The two apps build independently; `scripts/copy-demo.mjs` then copies the compiled `demo-app` output into
`storytelling`'s build so the whole thing ships as a single static deploy artifact.

## Stack

Svelte 5 · Vite · GSAP · TypeScript · i18next · npm workspaces

## Photos

_Photos from the live presentation to be added._
