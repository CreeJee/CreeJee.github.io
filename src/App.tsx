import { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Expand, Shrink } from "lucide-react";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import Resume from "./content/resume.mdx";
import CompatResume from "./content/compat.mdx";

/**
 * prose 기본 마진이 이력서처럼 짧은 문단·목록 중심 문서에는 과해서,
 * 요소별 간격을 여기서 일괄 제어한다.
 *
 * `!`(important)가 필수: prose 셀렉터(`.prose :where(p)`)와 유틸리티는
 * specificity가 같아 CSS 출력 순서로 승부가 갈리는데, Tailwind v4는
 * `my-*`(margin-block)를 prose보다 앞에 정렬해 오버라이드가 무효화된다.
 *
 * 간격 스케일 - 제목 위는 넉넉히, 제목 아래는 바짝 붙인다:
 *   h2 40/12 -> h3 28/8 -> h4 20/6, 본문(p 8 · ul 6 · li 4 · blockquote 10)
 */
const components: MDXComponents = {
  a: (props) => (
    <a
      {...props}
      target="_blank"
      rel="noreferrer"
      className="text-primary font-medium underline underline-offset-4 hover:opacity-80"
    />
  ),
  h2: (props) => <h2 {...props} className="mt-10! mb-3!" />,
  h3: (props) => <h3 {...props} className="mt-7! mb-2!" />,
  h4: (props) => <h4 {...props} className="mt-5! mb-1.5!" />,
  p: (props) => <p {...props} className="mbe-0.5" />,
  ul: (props) => <ul {...props} className="my-1!" />,
  li: (props) => <li {...props} className="my-0!" />,
  blockquote: (props) => <blockquote {...props} className="my-2.5" />,
};

function ViewToggle() {
  const [view, setView] = useViewMode();
  const isCompat = view === "compat";
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isCompat ? "전체 이력서 보기" : "압축본 보기"}
      // null이면 nuqs가 ?view=를 URL에서 지워 기본 뷰로 돌아간다
      onClick={() => setView(isCompat ? null : "compat")}
    >
      {isCompat ? (
        <Expand className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Shrink className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}

export default function App() {
  const [view] = useViewMode();
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="bg-background text-foreground min-h-screen">
        <header className="fixed top-4 right-4 z-10 flex gap-2 print:hidden">
          <ViewToggle />
          <ModeToggle />
        </header>
        <MDXProvider components={components}>
          {/* 제목 바로 다음 요소는 mt를 죽여, 제목의 mb만이 제목-아이템 간격을 결정하게 한다 */}
          <main className="prose prose-sm md:prose-base dark:prose-invert mx-auto max-w-4xl px-6 py-12 [&_h2+*]:mt-0! [&_h3+*]:mt-0! [&_h4+*]:mt-0!">
            {view === "compat" ? <CompatResume /> : <Resume />}
          </main>
        </MDXProvider>
      </div>
    </ThemeProvider>
  );
}

const useViewMode = () => {
  return useQueryState(
    "view",
    parseAsStringLiteral(["default", "compat"]).withDefault("default"),
  );
};
