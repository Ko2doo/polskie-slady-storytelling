<script lang="ts">
  import AnimatedRoad from "@/components/AnimatedRoad.svelte";
  import { i18n } from "@/services/i18n";
</script>

<section class="offline-nav">
  <AnimatedRoad />

  <div class="heading">
    <h1 class="heading__title">{$i18n.t("text.offlineNav.title")}</h1>
    <p class="heading__slogan">{$i18n.t("text.offlineNav.slogan")}</p>
  </div>
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .offline-nav {
    @include size(12);
    @include flex-column;

    & {
      position: relative;

      height: 100%;
      padding: var(--size-xl) var(--size-xl);

      @include z-index-xs;

      &::before {
        content: "";

        display: inline-block;

        position: absolute;
        left: rem(-10);
        right: rem(-10);
        top: rem(-10);
        bottom: rem(-10);
        // left: 0;
        // right: 0;
        // top: 0;
        // bottom: 0;

        background-image: linear-gradient(rgba(43, 43, 43, 0.7), rgba(43, 43, 43, 0.7)),
          url("$assets/images/bg-screenshotv2.webp");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;

        border-radius: var(--b-radius-s);
        opacity: 0.9;

        @include z-index-negative;
      }
    }
  }

  .heading {
    @include size(12);

    & {
      text-align: center;

      margin-top: rem(92);
      margin-inline: auto;
      position: relative;
      z-index: 4;

      @media (min-width: rem(960)) {
        @include size(8);
      }
    }
  }

  .heading__title {
    @include heading(center, --f-size-xxl, --text-color);

    & {
      text-shadow: var(--general-shadow-rule);
    }
  }

  .heading__slogan {
    @include slogan(center, --f-size-l, --text-color);

    & {
      margin-top: var(--size-s);
      text-shadow: var(--general-shadow-rule);
    }
  }
</style>
