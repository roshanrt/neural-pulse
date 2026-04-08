"use client";

import { useEffect, useState } from "react";

type HeroSceneComponent = React.ComponentType;

export default function HeroSceneClient() {
  const [HeroScene, setHeroScene] = useState<HeroSceneComponent | null>(null);

  useEffect(() => {
    let isMounted = true;

    import("./HeroScene")
      .then((module) => {
        if (isMounted) {
          setHeroScene(() => module.default);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHeroScene(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!HeroScene) {
    return <div className="three-canvas" aria-hidden="true" />;
  }

  return <HeroScene />;
}