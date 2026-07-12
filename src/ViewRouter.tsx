import { parseAsStringLiteral, useQueryState } from "nuqs";

import App from "./App";
import CompatApp from "./CompatApp";

const VIEWS = ["default", "compat"] as const;

/**
 * `?view=` 쿼리 파라미터로 뷰를 전환한다 — nuqs가 URL을 단일 소스로 관리해
 * 새로고침 없이도 뷰가 바뀌고, 링크 공유만으로 같은 뷰가 열린다.
 *   /             → 기본 이력서
 *   /?view=compat → 인쇄용 압축본
 */
export default function ViewRouter() {
  const [view] = useQueryState(
    "view",
    parseAsStringLiteral(VIEWS).withDefault("default"),
  );

  return view === "compat" ? <CompatApp /> : <App />;
}
