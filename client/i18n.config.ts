import en from "./locales/en";
import es from "./locales/es";
import fr from "./locales/fr";
import de from "./locales/de";
import ru from "./locales/ru";
import fi from "./locales/fi";
import pcm from "./locales/pcm";
import ko from "./locales/ko";
import ar from "./locales/ar";
import cs from "./locales/cs";
import fa from "./locales/fa";
import vi from "./locales/vi";

export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en,
    es,
    fr,
    de,
    ru,
    fi,
    pcm,
    ko,
    ar,
    cs,
    fa,
    vi
  },
}));
