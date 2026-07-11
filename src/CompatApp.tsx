import { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";

import Resume from "./content/compat.mdx";

/**
 * 인쇄/PDF 한 페이지 출력을 노린 압축본 — App.tsx와 같은 resume.mdx를 쓰되
 * 간격 스케일만 절반 이하로 조인다. 테마 토글 없이 항상 라이트로 렌더링해
 * 인쇄 결과가 화면과 일치하게 유지한다.
 */
const components: MDXComponents = {
  a: (props) => (
    <a
      {...props}
      className="text-primary font-medium underline underline-offset-2"
    />
  ),
  h1: (props) => <h1 {...props} className="mb-1! text-2xl!" />,
  h2: (props) => <h2 {...props} className="mt-4! mb-1! text-lg!" />,
  h3: (props) => <h3 {...props} className="mt-3! mb-0.5! text-base!" />,
  h4: (props) => <h4 {...props} className="mt-2! mb-0.5! text-sm!" />,
  p: (props) => <p {...props} className="my-0!" />,
  ul: (props) => <ul {...props} className="my-0.5! pl-5!" />,
  li: (props) => <li {...props} className="my-0! pl-0!" />,
  blockquote: (props) => <blockquote {...props} className="my-1! pl-3!" />,
};

export default function CompatApp() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <MDXProvider components={components}>
        <main className="prose prose-sm mx-auto max-w-4xl px-6 py-6 text-[12px]! leading-snug [&_h2+*]:mt-0! [&_h3+*]:mt-0! [&_h4+*]:mt-0! [&_section]:mt-1!">
          <Resume />
        </main>
      </MDXProvider>
    </div>
  );
}
