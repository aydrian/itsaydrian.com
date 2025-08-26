import { ThemeSwitcher } from "~/components/theme-switcher";

export default function IndexPage() {
  return (
    <div className="from-hydro via-angel-feather to-scoville-high dark:from-english-breakfast dark:via-crowberry-blue dark:to-hydro min-h-screen bg-gradient-to-b">
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-foreground text-3xl font-bold">ItsAydrian LLC</h1>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
