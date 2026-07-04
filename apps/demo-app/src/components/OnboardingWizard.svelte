<script>
  import { Popup, Navbar, Block, Button, Page } from "konsta/svelte";
  import { fly } from "svelte/transition";

  import { errorToast } from "@/store/ui/errorToast";

  import { createToggle } from "@/lib/state/createToggler.svelte";
  import LangSwitcher from "./LangSwitcher.svelte";
  import DarkModeToggler from "./DarkModeToggler.svelte";

  import TranslateIcon from "@/lib/icons/TranslateIcon.svelte";
  import PaletteIcon from "@/lib/icons/PaletteIcon.svelte";
  import GPSIcon from "@/lib/icons/GPSIcon.svelte";
  import { createLogger, IS_DEBUG } from "@/utils/debugMode";

  let { i18n, appState, makeCompleted } = $props();

  const onboardingLogger = createLogger("WelcomeDialog");

  // Toggler
  const welcomeDialogToggler = createToggle();

  let activeStep = $state(1);

  const TOTAL_STEPS = 2;

  $effect(() => {
    if ($appState === true) welcomeDialogToggler.set(true);
    if ($appState === false) welcomeDialogToggler.set(false);
  });

  async function completeOnboarding() {
    try {
      await makeCompleted();
      welcomeDialogToggler.set(false);
      IS_DEBUG && onboardingLogger.log("Onboarding completed");
    } catch (error) {
      IS_DEBUG && onboardingLogger.error("Failed to complete onboarding:", error);

      errorToast.error("Failed to save settings. Please try again.", {
        scope: "WelcomeDialog",
      });
    }
  }

  function nextStep() {
    if (activeStep < TOTAL_STEPS) {
      activeStep++;
    }
  }

  function prevStep() {
    if (activeStep > 1) {
      activeStep--;
    }
  }
</script>

<article class="onboarding-wizard-wrapper" in:fly={{ duration: 540, y: -20, delay: 300 }}>
  <Popup backdrop={true} opened={welcomeDialogToggler.value} class="welcome-popup">
    <Page class="flex flex-col">
      <!-- prettier-ignore -->
      <Navbar
      title={activeStep === 1
        ? $i18n.t("ui:dialog:onboarding:step1Title")
        : $i18n.t("ui:dialog:onboarding:step2Title")}

      subtitle={`
        ${$i18n.t("ui:dialog:onboarding:step")}
        ${activeStep}
        ${$i18n.t("ui:dialog:onboarding:stepOf")}
        ${TOTAL_STEPS}
      `}>
    </Navbar>

      <Block inset class="onboarding-wizard-content mt-auto mb-auto px-4">
        {#if activeStep === 1}
          <div class="mt-6 space-y-4" in:fly={{ duration: 120, x: 20 }}>
            <div class="text-center space-y-2">
              <h3 class="text-lg font-semibold">
                {$i18n.t("ui:dialog:onboarding:welcomeDialog")}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {$i18n.t("ui:dialog:onboarding:welcomeDialogSubtitle")}
              </p>
            </div>

            <div class="mt-8 space-y-4">
              <div class="flex items-center justify-between">
                <span class="flex text-[18px]">
                  <TranslateIcon className="size-5 mr-2" />
                  {$i18n.t("ui:dialog:onboarding:step1Locales")}
                </span>
                <div class="size-fit">
                  <LangSwitcher {i18n} raised={true} rounded={true} />
                </div>
              </div>

              <div class="flex flex-col">
                <p class="flex items-center text-[18px]">
                  <PaletteIcon className="size-5 mr-2" />
                  {$i18n.t("ui:dialog:onboarding:step1Appearance")}
                </p>
                <DarkModeToggler {i18n} inset={true} nested={true} />
              </div>
            </div>

            <div class="flex gap-2 justify-end pt-2">
              <Button inline rounded raised onClick={nextStep}>
                {$i18n.t("ui:buttons:continue")}
              </Button>
            </div>
          </div>
        {/if}

        {#if activeStep === 2}
          <div class="space-y-4" in:fly={{ duration: 120, x: 20 }}>
            <div class="text-center space-y-2">
              <h3 class="text-lg font-semibold">{$i18n.t("ui:dialog:onboarding:step2Info")}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {$i18n.t("ui:dialog:onboarding:step2Msg")}
              </p>
            </div>

            <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
              <p class="text-xs text-blue-800 dark:text-blue-200">
                {$i18n.t("ui:dialog:onboarding:step2Warning")}
              </p>
            </div>

            <div class="flex gap-2 justify-between pt-2">
              <Button inline rounded onClick={prevStep}>
                {$i18n.t("ui:buttons:back")}
              </Button>

              <div class="flex gap-2">
                <Button inline rounded onClick={completeOnboarding}>
                  {$i18n.t("ui:buttons:skip")}
                </Button>
              </div>
            </div>
          </div>
        {/if}
      </Block>
    </Page>
  </Popup>
</article>
