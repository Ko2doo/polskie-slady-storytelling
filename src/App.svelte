<script lang="ts">
  import { i18n } from "@/services/i18n";
  import { localeCode } from "./locales";

  import { createUIContext, POPUP_GROUP } from "@/services/UIController.svelte";

  // Icons
  import MaximizeIcon from "$assets/icons/ui/Maximize.svg?raw";
  import MinimizeIcon from "$assets/icons/ui/Minimize.svg?raw";
  import LocalesIcon from "$assets/icons/ui/Global.svg?raw";
  import LockIcon from "$assets/icons/ui/Lock.svg?raw";
  import SettingsIcon from "$assets/icons/ui/Settings.svg?raw";
  import SettingsDownIcon from "$assets/icons/ui/SettingsBold.svg?raw";

  import Popup from "$libs/components/Popup.svelte";
  import Menu from "$libs/components/Menu.svelte";
  import SubmenuItem from "./lib/components/SubmenuItem.svelte";
  import Button from "$libs/components/Button.svelte";

  import BodyOverlay from "./lib/components/BodyOverlay.svelte";
  import Lockscreen from "./stories/Lockscreen.svelte";
  import Hero from "./stories/slides/Hero.svelte";
  import History from "./stories/slides/History.svelte";
  import PSTApp from "./stories/slides/PSTApp.svelte";

  const ui = createUIContext();
  const POPUP_ID = "settings";
  const SUBMENU_GROUP = "settings.locales";

  let triggerEl: HTMLButtonElement | undefined = $state();

  // Language
  let currentLocale: string = $state("");
  const locales = Object.entries(localeCode);

  const languageSwitcher = (code: string): void => {
    $i18n.changeLanguage(code);
    ui.closeAll();
  };

  $effect(() => {
    locales.forEach(([code, label]) => {
      if (code === $i18n.language) currentLocale = label;
    });
  });

  // Zen mode (F11 fullscreen mode)
  let zenModeState: boolean = $state(false);

  const zenModeToggler = (): void => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      zenModeState = true;
    } else {
      document.exitFullscreen();
      zenModeState = false;
    }
  };
</script>

<BodyOverlay />

<main class="container">
  <Button
    bind:ref={triggerEl}
    onclick={() => ui.toggle(POPUP_ID, POPUP_GROUP)}
    data-btn-settings={ui.isOpen(POPUP_ID) ? "opened" : ""}
  >
    {#snippet icon()}
      <span class="icon-wrapper" class:icon-wrapper--active={ui.isOpen(POPUP_ID)}>
        {@html ui.isOpen(POPUP_ID) ? SettingsDownIcon : SettingsIcon}
      </span>
    {/snippet}
  </Button>

  <div class="viewport">
    <!-- <Lockscreen /> -->
    <!-- <Hero /> -->
    <!-- <History /> -->
    <PSTApp />
  </div>
</main>

<Popup id={POPUP_ID} anchor={triggerEl} placement="bottom" offset={16}>
  <Button
    className="menu-item"
    label={$i18n.t(zenModeState ? "ui.popup.zenModeOff" : "ui.popup.zenModeOnn")}
    onclick={zenModeToggler}
  >
    {#snippet icon()}
      {@html zenModeState ? MinimizeIcon : MaximizeIcon}
    {/snippet}
  </Button>

  <Menu id="settings.translations" group={SUBMENU_GROUP} label={$i18n.t("ui.popup.translations")}>
    {#snippet icon()}
      {@html LocalesIcon}
    {/snippet}

    {#each locales as [code, label]}
      <SubmenuItem value={code} {label} onclick={() => languageSwitcher(code)} />
    {/each}
  </Menu>

  <Button className="menu-item" label={$i18n.t("ui.popup.lock")}>
    {#snippet icon()}
      {@html LockIcon}
    {/snippet}
  </Button>
</Popup>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .container {
    @include container;
  }

  .viewport {
    @include viewport;
  }

  .icon-wrapper {
    display: inline-flex;
    transition: transform 0.4s ease;
  }

  .icon-wrapper--active {
    transform: rotate(22deg);
  }

  :global(.button[data-btn-settings]) {
    position: absolute;
    left: 8%;
    bottom: 4%;

    width: clamp(rem(30), 4vw, rem(48));
    height: clamp(rem(30), 4vw, rem(48));

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border: rem(1) solid var(--secondary-bg);

    @include z-index-xl;

    @media (min-width: rem(830)) {
      left: 1.3%;
      bottom: var(--size-l);
    }
  }

  :global(.button[data-btn-settings="opened"]) {
    background-color: var(--general-bg);
  }
</style>
