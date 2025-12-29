'use client';

import Spline from '@splinetool/react-spline';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplineBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    // User provided correct .splinecode URL
    const sceneUrl = "https://prod.spline.design/Zd6UMse6chgocFEE/scene.splinecode";

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 w-full h-full pointer-events-auto"
        >
            <Spline
                scene={sceneUrl}
                className="w-full h-full"
            />
            {/* 
        Overlay for better text readability.
      */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none" />
        </div>
    );
}
