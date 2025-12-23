const icons = ref({});
let loaded = false;

export function useIcons() {
  async function loadIcons() {
    if (loaded) return;
    const iconModules = import.meta.glob("@/components/icons/*-icon.vue");
    const loadedIcons = {};

    for (const path in iconModules) {
      const module = await iconModules[path]();
      const componentName = path.split("/").pop().replace(".vue", "");
      loadedIcons[componentName] = module.default;
    }

    icons.value = markRaw(loadedIcons);
    loaded = true;
  }

  return { icons, loadIcons };
}
