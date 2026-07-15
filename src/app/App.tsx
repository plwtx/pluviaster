import { useTranslation } from "react-i18next";
import { Languages, Moon, Sun } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useTheme } from "@/shared/hooks/useTheme";

function App() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const nextLanguage = i18n.resolvedLanguage === "en" ? "ja" : "en";

  return (
    <div className="font-outfit bg-bg text-tx flex h-dvh w-full flex-col items-center justify-center gap-2 font-extralight">
      <h1 className="text-3xl tracking-wide">(˶ᵔ ᵕ ᵔ˶)</h1>
      <h2>Everything is working as expected.</h2>
      <p className="text-tx-2 italic">{t("Pluwia ad Astra")}</p>
      <div className="mt-4 flex items-center gap-3">
        <Button intent="secondary" size="xs" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </Button>
        <Button
          intent="secondary"
          size="xs"
          onClick={() => i18n.changeLanguage(nextLanguage)}
        >
          <Languages className="mr-2 size-4" />
          {nextLanguage === "ja" ? "日本語" : "English"}
        </Button>
      </div>
      <p className="text-tx-3 mt-4">Happy coding !</p>
    </div>
  );
}

export default App;
