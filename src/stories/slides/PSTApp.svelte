<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "@/services/gsap";
  import { i18n } from "@/services/i18n";

  import Card from "$components/Card.svelte";

  import AndroidIcon from "$assets/icons/brand-android.svg?raw";
  import AppleIcon from "$assets/icons/brand-apple.svg?raw";
  import FreeIcon from "$assets/icons/creative-commons-nc.svg?raw";
  import NoDataIcon from "$assets/icons/mobiledata-off.svg?raw";
  import LicensyIcon from "$assets/icons/license.svg?raw";
  import AnimatedCircle from "@/components/AnimatedCircle.svelte";

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1400px)", () => {
      const tl = gsap.timeline();

      tl.from("#figure", {
        drawSVG: "0%",
        duration: 3,
        ease: "power1.ionOut",
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  });
</script>

<section class="pstaapp">
  <div class="heading">
    <h1 class="heading__title">polskie Ślady taszkent</h1>
    <p class="heading__slogan">{$i18n.t("text.app.slogan")}</p>

    <AnimatedCircle strokeColor="var(--gray-bg)" bodyId="figure" class="animation-figure" />
  </div>

  <div class="content">
    <Card class="card">
      <header class="card-header">
        {@html AndroidIcon}
        {@html AppleIcon}
      </header>

      <p class="card-description">
        {$i18n.t("text.app.platform")}
      </p>
    </Card>

    <Card class="card">
      <header class="card-header">
        {@html FreeIcon}
      </header>

      <p class="card-description">
        {$i18n.t("text.app.free")}
      </p>
    </Card>

    <Card class="card">
      <header class="card-header">
        {@html NoDataIcon}
      </header>

      <p class="card-description">
        {$i18n.t("text.app.nodata")}
      </p>
    </Card>

    <Card class="card">
      <header class="card-header">
        {@html LicensyIcon}
      </header>

      <p class="card-description">
        {$i18n.t("text.app.licensy")}
      </p>
    </Card>
  </div>
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .pstaapp {
    @include size(12);
    @include flex-row;

    & {
      align-content: space-around;

      height: 100%;
      padding: var(--size-xl) var(--size-xl);
    }
  }

  .heading {
    @include size(12);

    & {
      position: relative;
      z-index: 4;
    }
  }

  :global(.animation-figure) {
    position: absolute;
    top: rem(-130);
    left: 0;
    right: 0;

    width: 100%;
    height: rem(336);

    z-index: -1;

    transform: rotateZ(5deg);
  }

  .content {
    @include flex-row;

    & {
      width: 100%;
    }
  }

  :global(.card) {
    @include col;
    @include col-size(12);

    & {
      align-items: center;
      text-align: center;

      margin-left: auto;
      margin-right: auto;
      margin-bottom: var(--grid-system-offset-oneside);

      &:not(:first-child) {
        margin-left: auto;
      }
    }

    @media (min-width: rem(960)) {
      @include col-size(6);

      & {
        margin-right: 0;
      }

      &:not(:nth-child(2)) {
        margin-left: 0;
      }

      &:not(:first-child) {
        margin-left: var(--grid-system-offset-oneside);
      }

      &:last-child {
        margin-left: var(--grid-system-offset-oneside);
      }
    }

    @media (min-width: rem(1200)) {
      @include col-size(3);

      & {
        margin-bottom: 0;
      }
    }
  }

  .card-description {
    font-size: var(--f-size-m);
    font-weight: 400;
    line-height: 1.2;

    text-transform: uppercase;

    display: block;
    color: var(--text-color);
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
