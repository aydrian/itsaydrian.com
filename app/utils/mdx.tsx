import { LRUCache } from "lru-cache";
import * as mdxBundler from "mdx-bundler/client";
import React from "react";
export { getMDXComponent } from "mdx-bundler/client";

function getMdxComponent(code: string) {
  const Component = mdxBundler.getMDXComponent(code);
  // function KCDMdxComponent({
  //   components,
  //   ...rest
  // }: Parameters<typeof Component>["0"]) {
  //   return (
  //     // @ts-expect-error the types are wrong here
  //     <Component components={{ ...mdxComponents, ...components }} {...rest} />
  //   );
  // }
  // return KCDMdxComponent;
  return Component;
}

// This exists so we don't have to call new Function for the given code
// for every request for a given blog post/mdx file.
const mdxComponentCache = new LRUCache<
  string,
  ReturnType<typeof getMdxComponent>
>({
  max: 1000
});

export function useMdxComponent(code: string) {
  return React.useMemo(() => {
    if (mdxComponentCache.has(code)) {
      return mdxComponentCache.get(code)!;
    }
    const component = getMdxComponent(code);
    mdxComponentCache.set(code, component);
    return component;
  }, [code]);
}
