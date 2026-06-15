<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { appState } from "@/core/state/appState.svelte";
  import { buildTimeline } from "@/core/animation/buildTimeline";

  import type { SlideController } from "@/core/controller/slideController.svelte";
  import { showSlide, hideSlide } from "@/core/transitions/visibility";

  type Props = {
    index: number;
  };

  let { index }: Props = $props();

  const controller = getContext<SlideController>("sceneController");
  let el: HTMLElement;
  let timeline = $state<GSAPTimeline | undefined>();

  // Created iframe
  let mounted = $state(false);

  // http://10.137.190.193:5050/
  const src = import.meta.env.DEV ? "http://192.168.1.10:5050/#/" : "./demo/index.html#/";

  onMount(() => {
    timeline = buildTimeline(el);

    const isInitial = index === controller?.current;
    const api = { el, timeline };

    isInitial ? showSlide(api) : hideSlide(api);

    controller?.register(index, api);

    if (isInitial) {
      mounted = true;
      timeline.restart();
    }
  });

  // Reactive waiting current slide.
  $effect(() => {
    if (appState.currentSlide === index) {
      mounted = true;
    }
  });
</script>

<section class="demo" bind:this={el}>
  <div class="wrapper">
    <article class="smartphone">
      <span class="kamera"></span>
      {#if mounted}
        <iframe class="smartphone__iframe" title="Demo" {src} frameborder="0" loading="lazy"></iframe>
      {/if}
      <span class="navigate"></span>
    </article>
  </div>
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .wrapper {
    @include size(12);
    @include flex-column;

    & {
      align-items: center;
      justify-content: center;
    }
  }

  .demo {
    @include scene-rule;
    // @include scene-advanced;
  }

  .smartphone {
    position: relative;
    z-index: 2;

    width: rem(390);
    aspect-ratio: 9 / 19.5;
    height: rem(740);

    border-radius: var(--b-radius-xl);
    border: rem(10) solid var(--general-bg);

    &__iframe {
      width: 100%;
      height: 100%;

      border: 0;
      border-radius: var(--b-radius-xl);
    }

    .kamera {
      position: absolute;
      top: rem(8);

      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: "";
        display: block;

        width: rem(80);
        height: rem(16);

        background-color: color-mix(in oklab, var(--dark-bg) 33%, #010101);
        border-radius: var(--b-radius-l);
      }
    }

    .navigate {
      position: absolute;
      bottom: rem(3.3333);

      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: "";
        display: block;

        width: rem(160);
        height: rem(6);

        background-color: color-mix(in oklab, var(--general-bg) 20%, var(--secondary-bg));
        border-radius: var(--b-radius-l);
      }
    }
  }
</style>
