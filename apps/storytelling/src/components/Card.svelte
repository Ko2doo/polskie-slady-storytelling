<script lang="ts">
  import type { Snippet } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";

  type Props = SvelteHTMLElements["article"] & {
    children?: Snippet;
    bgColor?: string;
  };

  let { children, bgColor = "var(--dark-bg)", ...restProps }: Props = $props();
</script>

<article data-card="" style:--card-bg-color={bgColor} {...restProps}>
  {@render children?.()}
</article>

<style lang="scss">
  @use "$styles/_helpers.scss" as *;
  @use "$styles/_mixins.scss" as *;

  [data-card] {
    @include flex-column;

    & {
      row-gap: var(--size-l);
      padding: var(--size-s) var(--size-m);

      border-radius: var(--b-radius-xl);
      background-color: var(--card-bg-color);
    }
  }
</style>
